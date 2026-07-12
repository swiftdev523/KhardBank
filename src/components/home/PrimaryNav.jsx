import { Landmark } from "lucide-react";

const productLinks = [
  "Checking",
  "Savings",
  "Credit Cards",
  "Loans",
  "Investing",
  "Security Center",
];

export default function PrimaryNav() {
  return (
    <div className="bg-white border-b border-slate/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brass text-ink">
            <Landmark size={20} aria-hidden="true" />
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight text-ink">
            Vaultis Bank
          </span>
        </div>

        <nav
          aria-label="Products"
          className="hidden md:flex items-center gap-6 overflow-x-auto">
          {productLinks.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium text-ink/80 hover:text-ink border-b-2 border-transparent hover:border-brass pb-1 transition-colors whitespace-nowrap">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
