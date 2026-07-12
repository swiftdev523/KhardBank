import { Link } from "react-router-dom";
import { Wallet, PiggyBank, CreditCard, ChevronRight } from "lucide-react";
import BalanceHistoryChart from "./BalanceHistoryChart";

const ICONS = {
  Checking: Wallet,
  Savings: PiggyBank,
  "Credit Card": CreditCard,
};

export default function AccountListItem({ account }) {
  const Icon = ICONS[account.type] || Wallet;
  const isNegative = account.balance < 0;

  return (
    <Link
      to={`/accounts/${account.id}`}
      className="card card-hover p-5 flex items-center gap-4 md:gap-6">
      <span className="rounded-lg bg-paper p-3 text-brass shrink-0">
        <Icon size={20} aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="font-medium text-ink truncate">{account.name}</p>
        <p className="mono text-xs text-slate mt-1">
          {account.type} · {account.maskedNumber}
        </p>
      </div>

      <div className="hidden sm:block shrink-0">
        <BalanceHistoryChart history={account.history} variant="mini" />
      </div>

      <div className="text-right shrink-0">
        <p
          className={`figure text-lg ${isNegative ? "text-alert" : "text-ink"}`}>
          {isNegative ? "-" : ""}$
          {Math.abs(account.balance).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      <ChevronRight
        size={18}
        className="text-slate shrink-0"
        aria-hidden="true"
      />
    </Link>
  );
}
