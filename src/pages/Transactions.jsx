import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import TopBar from "../components/layout/TopBar";
import PageContainer from "../components/layout/PageContainer";
import TransactionFilters from "../components/transactions/TransactionFilters";
import LedgerRail from "../components/transactions/LedgerRail";

export default function Transactions() {
  const { accounts, transactions } = useApp();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [accountId, setAccountId] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const accountNames = useMemo(
    () => Object.fromEntries(accounts.map((a) => [a.id, a.name])),
    [accounts],
  );

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => category === "all" || t.category === category)
      .filter((t) => accountId === "all" || t.accountId === accountId)
      .filter((t) => !dateFrom || t.date >= dateFrom)
      .filter((t) => !dateTo || t.date <= dateTo)
      .filter(
        (t) =>
          !search || t.description.toLowerCase().includes(search.toLowerCase()),
      );
  }, [transactions, category, accountId, dateFrom, dateTo, search]);

  return (
    <>
      <TopBar
        title="Transactions"
        subtitle={`${filtered.length} of ${transactions.length} transactions`}
      />
      <PageContainer className="space-y-5">
        <TransactionFilters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          accountId={accountId}
          onAccountChange={setAccountId}
          accounts={accounts}
          dateFrom={dateFrom}
          onDateFromChange={setDateFrom}
          dateTo={dateTo}
          onDateToChange={setDateTo}
        />

        <div className="card p-5 md:p-6">
          <LedgerRail transactions={filtered} accountNames={accountNames} />
        </div>
      </PageContainer>
    </>
  );
}
