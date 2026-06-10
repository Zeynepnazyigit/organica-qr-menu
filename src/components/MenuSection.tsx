import type { MenuCategory } from "../data/menuData";
import { MenuItemCard } from "./MenuItemCard";

type MenuSectionProps = {
  category: MenuCategory;
};

export function MenuSection({ category }: MenuSectionProps) {
  return (
    <section id={category.id} className="scroll-mt-20">
      <div className="mb-3">
        <h2 className="inline-flex items-center gap-3 font-serif text-3xl text-olive after:h-px after:w-11 after:bg-gradient-to-r after:from-gold/80 after:to-transparent">
          {category.title}
        </h2>
        {category.subtitle ? (
          <p className="mt-1 text-sm text-muted">
            {category.subtitle}
            {category.subtitleEn ? (
              <span className="block text-xs text-muted/80">
                ({category.subtitleEn})
              </span>
            ) : null}
          </p>
        ) : null}
      </div>
      <div className="space-y-3">
        {category.items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
