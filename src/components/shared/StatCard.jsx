export default function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  trendPositive = true,
  className = "",
}) {
  return (
    <div className={`card card-hover p-5 ${className}`}>
      <div className="flex items-start justify-between">
        <span className="text-sm text-slate font-medium">{label}</span>
        {Icon ? (
          <span className="rounded-lg bg-paper p-2 text-brass">
            <Icon size={18} aria-hidden="true" />
          </span>
        ) : null}
      </div>
      <p className="figure text-2xl mt-3 text-ink">{value}</p>
      {trend ? (
        <p
          className={`text-xs mt-2 font-medium ${trendPositive ? "text-success" : "text-alert"}`}>
          {trend}
        </p>
      ) : null}
    </div>
  );
}
