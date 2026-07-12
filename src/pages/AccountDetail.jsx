import { useMemo, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import PageContainer from "../components/layout/PageContainer";
import AccountDetailHeader from "../components/accounts/AccountDetailHeader";
import BalanceHistoryChart from "../components/accounts/BalanceHistoryChart";
import TransactionFilters from "../components/transactions/TransactionFilters";
import LedgerRail from "../components/transactions/LedgerRail";

export default function AccountDetail() {
  const { id } = useParams();
  const { accounts, transactions } = useApp();
  const account = accounts.find((a) => a.id === id);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filtered = useMemo(() => {
    if (!account) return [];
    return transactions
      .filter((t) => t.accountId === account.id)
      .filter((t) => category === "all" || t.category === category)
      .filter((t) => !dateFrom || t.date >= dateFrom)
      .filter((t) => !dateTo || t.date <= dateTo)
      .filter(
        (t) =>
          !search || t.description.toLowerCase().includes(search.toLowerCase()),
      );
  }, [transactions, account, category, dateFrom, dateTo, search]);

  if (!account) {
    return <Navigate to="/accounts" replace />;
  }

  return (
    <PageContainer className="pt-6 md:pt-8 space-y-6">
      <AccountDetailHeader account={account} />

      <div className="card p-5 md:p-6">
        <h2 className="font-serif text-lg font-semibold text-ink mb-4">
          Balance History
        </h2>
        <BalanceHistoryChart history={account.history} variant="full" />
      </div>

      <TransactionFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        showAccountFilter={false}
        accounts={[]}
        accountId="all"
        onAccountChange={() => {}}
        dateFrom={dateFrom}
        onDateFromChange={setDateFrom}
        dateTo={dateTo}
        onDateToChange={setDateTo}
      />

      <div className="card p-5 md:p-6">
        <h2 className="font-serif text-lg font-semibold text-ink mb-5">
          Transactions
        </h2>
        <LedgerRail transactions={filtered} />
      </div>
    </PageContainer>
  );
}
