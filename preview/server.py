from __future__ import annotations

import json
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parent
OVERRIDES = ROOT / "menu-overrides.json"
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "organica2026")


class OrganicaHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def _send_json(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if urlparse(self.path).path == "/api/menu":
            self._send_json(read_overrides())
            return
        super().do_GET()

    def do_POST(self):
        if urlparse(self.path).path != "/api/menu":
            self.send_error(404)
            return

        try:
            if self.headers.get("x-admin-password") != ADMIN_PASSWORD:
                self._send_json({"ok": False, "error": "Yetkisiz kayıt isteği."}, status=401)
                return
            length = int(self.headers.get("Content-Length", "0"))
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            if not isinstance(payload.get("menuData"), list):
                raise ValueError("menuData must be a list")
            if not isinstance(payload.get("updatedAt"), str):
                raise ValueError("updatedAt must be a string")
            OVERRIDES.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        except Exception as exc:
            self._send_json({"ok": False, "error": str(exc)}, status=400)
            return

        self._send_json({"ok": True})

    def do_DELETE(self):
        if urlparse(self.path).path != "/api/menu":
            self.send_error(404)
            return

        if self.headers.get("x-admin-password") != ADMIN_PASSWORD:
            self._send_json({"ok": False, "error": "Yetkisiz sıfırlama isteği."}, status=401)
            return

        OVERRIDES.write_text(
            json.dumps({"menuData": None, "updatedAt": None}, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        self._send_json({"ok": True})


def read_overrides():
    try:
        data = json.loads(OVERRIDES.read_text(encoding="utf-8"))
        if isinstance(data.get("menuData"), list):
            return data
    except Exception:
        pass
    return {"menuData": None, "updatedAt": None}


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 5173), OrganicaHandler)
    print("Organica server running at http://localhost:5173/")
    server.serve_forever()
