import Badge from "../shared/Badge";

function formatDate(dateStr) {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatAmount(amount, type) {
  const formatted = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return type === "credit" ? `+${formatted}` : `-${formatted}`;
}

export default function TransactionRow({ transaction, accountName }) {
  const { date, description, category, amount, type } = transaction;

  return (
    <li className="relative pb-6 last:pb-0">
      <span className="ledger-node" aria-hidden="true" />
      <p className="mono text-[11px] uppercase tracking-wide text-slate mb-1">
        {formatDate(date)}
      </p>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink truncate">{description}</p>
          <div className="mt-1.5 flex items-center gap-2">
            <Badge category={category}>{category}</Badge>
            {accountName ? (
              <span className="text-xs text-slate">{accountName}</span>
            ) : null}
          </div>
        </div>
        <span
          className={`mono text-sm font-medium whitespace-nowrap ${
            type === "credit" ? "text-success" : "text-alert"
          }`}>
          {formatAmount(amount, type)}
        </span>
      </div>
    </li>
  );
}
