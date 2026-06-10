type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="mt-5 block">
      <span className="sr-only">Menüde ara</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="search"
        placeholder="Menüde ara..."
        className="h-13 w-full rounded-[10px] border border-white/10 bg-white/[0.07] px-4 text-base text-ink shadow-soft outline-none transition duration-300 placeholder:text-ink/40 focus:-translate-y-px focus:border-gold/60 focus:bg-white/10 focus:ring-4 focus:ring-gold/15"
      />
    </label>
  );
}
