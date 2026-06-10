import { menuUpdatedAt } from "../data/menuData";

export function Header() {
  return (
    <header className="relative grid min-h-[min(86vh,760px)] place-items-center overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,rgba(8,8,8,.58),rgba(15,15,14,.66)_46%,rgba(21,21,20,.96)),radial-gradient(circle_at_50%_34%,rgba(201,155,88,.18),transparent_36%),url('/assets/organica-hero.jpeg')] bg-cover bg-center before:absolute before:left-1/2 before:top-7 before:h-px before:w-[min(82vw,520px)] before:-translate-x-1/2 before:bg-gradient-to-r before:from-transparent before:via-gold/55 before:to-transparent after:absolute after:bottom-7 after:left-1/2 after:h-px after:w-[min(82vw,520px)] after:-translate-x-1/2 after:bg-gradient-to-r after:from-transparent after:via-gold/45 after:to-transparent">
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-14 text-center">
        <img
          src="/assets/organica-logo.png"
          alt="Organica Restaurant"
          className="h-16 w-auto object-contain drop-shadow-[0_18px_50px_rgba(0,0,0,0.7)] transition duration-700"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
        <div className="fallback-logo mt-1">
          <span>ORGANICA</span>
          <small>Restaurant · EST. 2009</small>
        </div>
        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-gold before:mb-5 before:block before:text-[11px] before:font-medium before:tracking-[0.42em] before:text-ink/70 before:content-['2009\\0027DAN_BERİ']">
          QR Menü
        </p>
        <h1 className="mt-5 font-serif text-[clamp(42px,10vw,78px)] font-semibold leading-none text-ink/90 drop-shadow-[0_24px_70px_rgba(0,0,0,0.72)]">
          Otantik Lezzet,
          <span className="mt-2 block text-[0.72em] font-normal italic text-ink/70">
            Zamansız Tat
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-7 text-ink/60">
          Organica'nın premium QR menüsü. Taze malzemeler, rafine sunumlar ve
          İstanbul gecesine yakışan sıcak bir atmosfer.
        </p>
        <p className="mt-5 text-sm text-ink/70">
          Gündüz 10:00 - 14:00 arası kahvaltı servisi
        </p>
        <p className="mt-1 text-xs text-ink/50">
          Menü güncellenme tarihi: {menuUpdatedAt}
        </p>
      </div>
    </header>
  );
}
