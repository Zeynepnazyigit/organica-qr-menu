import { menuUpdatedAt } from "../data/menuData";

const footerItems = [
  {
    title: "Alerjen uyarısı",
    tr: "Gıda alerjiniz var ise siparişinizi verirken servis personeline bildirmenizi rica ederiz.",
    en: "If you have any food allergies, please inform our service staff when placing your order.",
  },
  {
    title: "Özel organizasyon",
    tr: "Toplu yemek, doğum günü ve özel davet menüsü oluşturulmaktadır.",
    en: "Group dining, birthday and private event menus are available.",
  },
  {
    title: "Ev organizasyonları",
    tr: "Evlerinizde gerçekleştireceğiniz toplu organizasyonlar için bizden özel fiyat alabilirsiniz.",
    en: "You can contact us for special pricing for private group events at your home.",
  },
  {
    title: "Menü güncelleme",
    tr: `Menü güncellenme tarihi: ${menuUpdatedAt}`,
    en: `Menu last updated: ${menuUpdatedAt}`,
  },
];

export function FooterInfo() {
  return (
    <footer className="border-t border-olive/10 bg-white/45">
      <div className="mx-auto grid w-full max-w-3xl gap-3 px-4 py-8">
        {footerItems.map((item) => (
          <section
            key={item.title}
            className="rounded-md border border-olive/12 bg-cream/70 p-4"
          >
            <h2 className="text-sm font-semibold text-olive">{item.title}</h2>
            <p className="mt-1 text-sm leading-6 text-ink/78">{item.tr}</p>
            <p className="mt-1 text-xs leading-5 text-muted">({item.en})</p>
          </section>
        ))}
      </div>
    </footer>
  );
}
