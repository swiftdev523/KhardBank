import CountUp from "../shared/CountUp";

export default function BalanceHero({ total, accountsCount }) {
  const isNegative = total < 0;

  return (
    <div className="card p-6 md:p-8 bg-ink text-white overflow-hidden relative">
      <div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brass/20 blur-2xl"
        aria-hidden="true"
      />
      <p className="text-sm text-white/60 font-medium relative">
        Total balance across {accountsCount} accounts
      </p>
      <p className="figure text-4xl md:text-5xl font-semibold mt-3 text-white relative animate-count-up">
        {isNegative ? "-" : ""}$
        <CountUp
          value={Math.abs(total)}
          formatter={(n) =>
            n.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }
        />
      </p>
      <p className="text-xs text-white/50 mt-3 relative">Updated moments ago</p>
    </div>
  );
}
