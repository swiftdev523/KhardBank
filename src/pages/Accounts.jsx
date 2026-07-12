import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import TopBar from "../components/layout/TopBar";
import PageContainer from "../components/layout/PageContainer";
import AccountListItem from "../components/accounts/AccountListItem";
import { SkeletonCard } from "../components/shared/Skeleton";

export default function Accounts() {
  const { accounts } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <TopBar
        title="Accounts"
        subtitle={`${accounts.length} accounts linked to your profile`}
      />
      <PageContainer className="space-y-4">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          accounts.map((a) => <AccountListItem key={a.id} account={a} />)
        )}
      </PageContainer>
    </>
  );
}
