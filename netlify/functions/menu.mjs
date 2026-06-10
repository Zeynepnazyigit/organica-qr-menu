import { getStore } from "@netlify/blobs";

const STORE_NAME = "organica-menu";
const MENU_KEY = "current";

const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

const json = (payload, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: jsonHeaders,
  });

const hasAdminAccess = (request) => {
  const expected = process.env.ADMIN_PASSWORD || "organica2026";
  return request.headers.get("x-admin-password") === expected;
};

const readDefaultMenu = async (request) => {
  const url = new URL("/menu-overrides.json", request.url);
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) return { menuData: null, updatedAt: null };
  const data = await response.json();
  return Array.isArray(data?.menuData) ? data : { menuData: null, updatedAt: null };
};

export default async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: jsonHeaders });
  }

  const store = getStore(STORE_NAME);

  if (request.method === "GET") {
    const saved = await store.get(MENU_KEY, { type: "json" }).catch(() => null);
    if (Array.isArray(saved?.menuData)) return json(saved);
    return json(await readDefaultMenu(request));
  }

  if (request.method === "POST") {
    if (!hasAdminAccess(request)) {
      return json({ ok: false, error: "Yetkisiz kayıt isteği." }, 401);
    }

    const payload = await request.json().catch(() => null);
    if (!Array.isArray(payload?.menuData) || typeof payload?.updatedAt !== "string") {
      return json({ ok: false, error: "Menü formatı geçersiz." }, 400);
    }

    await store.set(MENU_KEY, JSON.stringify(payload), {
      metadata: { updatedAt: payload.updatedAt },
    });
    return json({ ok: true });
  }

  if (request.method === "DELETE") {
    if (!hasAdminAccess(request)) {
      return json({ ok: false, error: "Yetkisiz sıfırlama isteği." }, 401);
    }

    await store.delete(MENU_KEY);
    return json({ ok: true });
  }

  return json({ ok: false, error: "Desteklenmeyen istek." }, 405);
};

export const config = {
  path: "/api/menu",
};
