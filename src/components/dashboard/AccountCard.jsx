import { useNavigate } from "react-router-dom";
import { Wallet, PiggyBank, CreditCard } from "lucide-react";

const ICONS = {
  Checking: Wallet,
  Savings: PiggyBank,
  "Credit Card": CreditCard,
};

export default function AccountCard({ account }) {
  const navigate = useNavigate();
  const Icon = ICONS[account.type] || Wallet;
  const isNegative = account.balance < 0;

  return (
    <button
      type="button"
      onClick={() => navigate(`/accounts/${account.id}`)}
      className="card card-hover p-5 text-left w-full">
      <div className="flex items-center justify-between">
        <span className="rounded-lg bg-paper p-2 text-brass">
          <Icon size={18} aria-hidden="true" />
        </span>
        <span className="mono text-xs text-slate">{account.maskedNumber}</span>
      </div>
      <p className="text-sm font-medium text-slate mt-4">{account.name}</p>
      <p
        className={`figure text-2xl mt-1 ${isNegative ? "text-alert" : "text-ink"}`}>
        {isNegative ? "-" : ""}$
        {Math.abs(account.balance).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </button>
  );
}
