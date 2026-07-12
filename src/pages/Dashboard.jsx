import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import TopBar from "../components/layout/TopBar";
import PageContainer from "../components/layout/PageContainer";
import BalanceHero from "../components/dashboard/BalanceHero";
import AccountCard from "../components/dashboard/AccountCard";
import SpendingChart from "../components/dashboard/SpendingChart";
import ActivityPanel from "../components/dashboard/ActivityPanel";
import { SkeletonBlock, SkeletonCard } from "../components/shared/Skeleton";

export default function Dashboard() {
  const { user, accounts, transactions } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  const accountNames = Object.fromEntries(accounts.map((a) => [a.id, a.name]));
  const firstName = user.name.split(" ")[0];

  if (loading) {
    return (
      <>
        <TopBar title="Dashboard" subtitle={`Welcome back, ${firstName}`} />
        <PageContainer className="space-y-6">
          <SkeletonBlock className="h-40 w-full" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <SkeletonBlock className="h-64 w-full" />
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <TopBar title="Dashboard" subtitle={`Welcome back, ${firstName}`} />
      <PageContainer className="space-y-6">
        <BalanceHero total={totalBalance} accountsCount={accounts.length} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {accounts.map((a) => (
            <AccountCard key={a.id} account={a} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="card p-5 md:p-6 lg:col-span-2">
            <h2 className="font-serif text-lg font-semibold text-ink mb-4">
              Spending Breakdown
            </h2>
            <SpendingChart transactions={transactions} />
          </div>
          <div className="lg:col-span-3">
            <ActivityPanel
              transactions={transactions}
              accountNames={accountNames}
            />
          </div>
        </div>
      </PageContainer>
    </>
  );
}
