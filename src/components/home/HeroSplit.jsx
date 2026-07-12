import SignInCard from "./SignInCard";

export default function HeroSplit() {
  return (
    <section className="relative bg-ink text-white overflow-hidden">
      <div
        className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-brass/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 h-full w-px bg-linear-to-b from-transparent via-brass/40 to-transparent hidden lg:block"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-brass font-medium">
            Est. 2019
          </p>
          <p className="figure text-4xl md:text-5xl font-semibold leading-tight mt-4 max-w-md">
            Enjoy <span className="text-brass">$400</span>
            <br />
            New Vaultis checking customers
          </p>
          <p className="text-white/60 mt-5 max-w-sm">
            Open a Vaultis Everyday Checking account with qualifying activities
            — banking that reads like a ledger, not a dashboard.
          </p>
          <button
            type="button"
            className="mt-6 rounded-lg bg-brass px-5 py-3 text-sm font-semibold text-ink hover:bg-brass-light transition-colors">
            Open an account
          </button>
          <p className="text-xs text-white/40 mt-12">
            © 2026 Vaultis Bank. A demonstration product.
          </p>
        </div>

        <div className="flex lg:justify-end">
          <SignInCard />
        </div>
      </div>
    </section>
  );
}
