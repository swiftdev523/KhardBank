import { Link } from "react-router-dom";
import LedgerRail from "../transactions/LedgerRail";

export default function ActivityPanel({ transactions, accountNames }) {
  const recent = transactions.slice(0, 5);

  return (
    <div className="card p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-serif text-lg font-semibold text-ink">
          Recent Activity
        </h2>
        <Link
          to="/transactions"
          className="text-sm font-medium text-brass hover:underline">
          View all
        </Link>
      </div>
      <LedgerRail transactions={recent} accountNames={accountNames} />
    </div>
  );
}
