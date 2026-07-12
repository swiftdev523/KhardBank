import { Search } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <label className={`relative flex items-center ${className}`}>
      <span className="sr-only">{placeholder}</span>
      <Search
        size={16}
        className="absolute left-3 text-slate"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate/20 bg-white py-2 pl-9 pr-3 text-sm text-ink placeholder:text-slate/70 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
      />
    </label>
  );
}
