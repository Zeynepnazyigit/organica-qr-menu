import { useMemo, useState } from "react";
import { CategoryNav } from "./components/CategoryNav";
import { FooterInfo } from "./components/FooterInfo";
import { Header } from "./components/Header";
import { MenuSection } from "./components/MenuSection";
import { SearchBar } from "./components/SearchBar";
import { menuData } from "./data/menuData";

const normalizeText = (value: string) =>
  value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

function App() {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeText(query.trim());

  const visibleCategories = useMemo(() => {
    if (!normalizedQuery) {
      return menuData;
    }

    return menuData
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          const searchable = [
            item.name,
            item.description,
            item.descriptionEn,
            ...(item.badges ?? []),
            ...(item.badgesEn ?? []),
            ...(item.variants?.flatMap((variant) => [
              variant.name,
              variant.nameEn,
              variant.priceText,
            ]) ?? []),
          ]
            .filter(Boolean)
            .join(" ");

          return normalizeText(searchable).includes(normalizedQuery);
        }),
      }))
      .filter((category) => category.items.length > 0);
  }, [normalizedQuery]);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Header />
      <main className="mx-auto w-full max-w-3xl px-4 pb-12">
        <SearchBar value={query} onChange={setQuery} />
        <CategoryNav categories={menuData} disabled={Boolean(normalizedQuery)} />

        {visibleCategories.length > 0 ? (
          <div className="space-y-8 pt-6">
            {visibleCategories.map((category) => (
              <MenuSection key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-md border border-olive/15 bg-white/65 p-6 text-center shadow-soft">
            <p className="font-serif text-xl text-olive">
              Bu aramaya uygun ürün bulunamadı.
            </p>
            <p className="mt-2 text-sm text-muted">
              No menu item matches your search.
            </p>
          </div>
        )}
      </main>
      <FooterInfo />
    </div>
  );
}

export default App;
