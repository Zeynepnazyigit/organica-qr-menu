import type { MenuItem } from "../data/menuData";

type MenuItemCardProps = {
  item: MenuItem;
};

const formatPrice = (price?: number, priceText?: string) => {
  if (priceText) {
    return priceText;
  }

  if (typeof price === "number") {
    return `${price} TL`;
  }

  return "Fiyat için servis personeline danışınız";
};

export function MenuItemCard({ item }: MenuItemCardProps) {
  const price = formatPrice(item.price, item.priceText);

  return (
    <article className="group relative overflow-hidden rounded-[11px] border border-white/10 bg-gradient-to-br from-white/[0.075] to-white/[0.035] p-[18px] shadow-soft transition duration-300 before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-gradient-to-b before:from-gold/75 before:to-[#9b4e32]/20 before:opacity-0 before:transition-opacity hover:-translate-y-0.5 hover:border-gold/25 hover:shadow-[0_24px_54px_rgba(0,0,0,0.3)] hover:before:opacity-100">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-serif text-[17px] font-semibold leading-snug text-ink">
            {item.name}
          </h3>
          {item.badges?.length ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.badges.map((badge, index) => (
                <span
                  key={`${badge}-${index}`}
                  className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[11px] font-semibold text-olive"
                >
                  {badge}
                  {item.badgesEn?.[index] ? ` / ${item.badgesEn[index]}` : ""}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        {!item.variants?.length ? (
          <p className="shrink-0 rounded-full bg-gold/10 px-2.5 py-1 text-right text-sm font-bold text-olive-soft">
            {price}
          </p>
        ) : null}
      </div>

      {item.description ? (
        <p className="mt-2 text-sm leading-6 text-ink/70">{item.description}</p>
      ) : null}
      {item.descriptionEn ? (
          <p className="mt-1 text-xs leading-5 text-muted">
          ({item.descriptionEn})
        </p>
      ) : null}

      {item.variants?.length ? (
        <div className="mt-3 divide-y divide-white/10 rounded-md border border-white/10 bg-black/20">
          {item.variants.map((variant) => (
            <div
              key={variant.name}
              className="flex items-center justify-between gap-3 px-3 py-2"
            >
              <div>
                <p className="text-sm font-medium text-ink">{variant.name}</p>
                {variant.nameEn ? (
                  <p className="text-xs text-muted">({variant.nameEn})</p>
                ) : null}
              </div>
              <p className="shrink-0 text-sm font-bold text-olive">
                {formatPrice(variant.price, variant.priceText)}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}
