import { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Wallet,
  PiggyBank,
  CreditCard,
  Landmark,
  LineChart,
  ShieldCheck,
} from "lucide-react";

const categories = [
  { label: "Checking", icon: Wallet },
  { label: "Savings", icon: PiggyBank },
  { label: "Credit Cards", icon: CreditCard },
  { label: "Loans", icon: Landmark },
  { label: "Investing", icon: LineChart },
  { label: "Security", icon: ShieldCheck },
];

export default function CategoryStrip() {
  const scrollerRef = useRef(null);

  function scrollByAmount(amount) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section className="bg-paper py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-ink text-center">
          Choose what&apos;s right for you
        </h2>

        <div className="relative mt-10 flex items-center gap-3">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollByAmount(-240)}
            className="hidden sm:flex shrink-0 h-9 w-9 items-center justify-center rounded-full border border-slate/20 text-slate hover:text-ink hover:border-ink/30 transition-colors">
            <ChevronLeft size={18} aria-hidden="true" />
          </button>

          <ul
            ref={scrollerRef}
            className="flex-1 flex gap-8 md:gap-10 overflow-x-auto no-scrollbar justify-start md:justify-center py-2">
            {categories.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex flex-col items-center gap-2 shrink-0">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_1px_2px_rgba(11,30,51,0.06),0_8px_24px_rgba(11,30,51,0.06)] text-brass">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-ink">{label}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollByAmount(240)}
            className="hidden sm:flex shrink-0 h-9 w-9 items-center justify-center rounded-full border border-slate/20 text-slate hover:text-ink hover:border-ink/30 transition-colors">
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brass" aria-hidden="true" />
          <span
            className="h-2 w-2 rounded-full bg-slate/25"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
