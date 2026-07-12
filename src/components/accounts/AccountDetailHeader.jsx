import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AccountDetailHeader({ account }) {
  const navigate = useNavigate();
  const isNegative = account.balance < 0;

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => navigate("/accounts")}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate hover:text-ink mb-4">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to accounts
      </button>

      <div className="card p-6 md:p-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-sm text-slate font-medium">
            {account.type} ·{" "}
            <span className="mono">{account.maskedNumber}</span>
          </p>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-ink mt-1">
            {account.name}
          </h1>
        </div>
        <p
          className={`figure text-3xl md:text-4xl ${isNegative ? "text-alert" : "text-ink"}`}>
          {isNegative ? "-" : ""}$
          {Math.abs(account.balance).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    </div>
  );
}
