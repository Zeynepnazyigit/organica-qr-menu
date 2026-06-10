import type { MenuCategory } from "../data/menuData";
import { useEffect, useState } from "react";

type CategoryNavProps = {
  categories: MenuCategory[];
  disabled?: boolean;
};

export function CategoryNav({ categories, disabled = false }: CategoryNavProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");

  useEffect(() => {
    if (disabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry?.target.id) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-88px 0px -65% 0px",
        threshold: 0.01,
      },
    );

    categories.forEach((category) => {
      const section = document.getElementById(category.id);

      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [categories, disabled]);

  const scrollToCategory = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="sticky top-0 z-20 -mx-4 mt-0 border-y border-white/10 bg-cream/90 px-4 py-3 shadow-[0_14px_34px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            disabled={disabled}
            onClick={() => scrollToCategory(category.id)}
            aria-current={activeId === category.id ? "true" : undefined}
            className="shrink-0 px-2 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink/55 transition duration-300 hover:-translate-y-px hover:text-ink active:scale-[0.98] aria-current:text-ink disabled:cursor-default disabled:opacity-50"
          >
            {category.title}
          </button>
        ))}
      </div>
    </nav>
  );
}
