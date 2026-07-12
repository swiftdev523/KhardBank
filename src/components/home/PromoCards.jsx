import { CreditCard, ShieldCheck, Home } from "lucide-react";

const promos = [
  {
    icon: CreditCard,
    title: "Credit Cards",
    teaser:
      "Earn rewards on everyday spending, with no annual fee on our starter card.",
    tone: "ink",
  },
  {
    icon: ShieldCheck,
    title: "Security Center",
    teaser:
      "Real-time alerts, card freezing, and account monitoring — built in, not bolted on.",
    tone: "brass",
  },
  {
    icon: Home,
    title: "Plan for a home",
    teaser:
      "Mortgage calculators and rate tools to help you budget before you shop.",
    tone: "ink",
  },
];

export default function PromoCards() {
  return (
    <section className="bg-paper pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-5">
        {promos.map(({ icon: Icon, title, teaser, tone }) => (
          <div
            key={title}
            className={`rounded-2xl p-6 md:p-7 text-white flex flex-col justify-between min-h-[200px] transition-transform duration-200 hover:-translate-y-0.5 ${
              tone === "brass" ? "bg-brass text-ink" : "bg-ink"
            }`}>
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                tone === "brass"
                  ? "bg-ink/10 text-ink"
                  : "bg-white/10 text-brass"
              }`}>
              <Icon size={20} aria-hidden="true" />
            </span>
            <div className="mt-8">
              <h3 className="font-serif text-xl font-semibold">{title}</h3>
              <p
                className={`text-sm mt-2 ${tone === "brass" ? "text-ink/70" : "text-white/60"}`}>
                {teaser}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
