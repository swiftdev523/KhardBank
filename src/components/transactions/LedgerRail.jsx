import TransactionRow from "./TransactionRow";
import EmptyState from "../shared/EmptyState";
import { Receipt } from "lucide-react";

export default function LedgerRail({ transactions, accountNames }) {
  if (!transactions.length) {
    return (
      <EmptyState
        icon={Receipt}
        title="No transactions found"
        description="Try adjusting your filters or search terms."
      />
    );
  }

  return (
    <ul className="ledger-rail">
      {transactions.map((t) => (
        <TransactionRow
          key={t.id}
          transaction={t}
          accountName={accountNames?.[t.accountId]}
        />
      ))}
    </ul>
  );
}
