import { useState } from "react";
import TopBar from "../components/layout/TopBar";
import PageContainer from "../components/layout/PageContainer";
import TransferForm from "../components/transfer/TransferForm";
import TransferSuccess from "../components/transfer/TransferSuccess";

export default function Transfer() {
  const [details, setDetails] = useState(null);

  return (
    <>
      <TopBar
        title="Transfer"
        subtitle="Move money between your accounts or send to someone new"
      />
      <PageContainer>
        {details ? (
          <TransferSuccess details={details} onReset={() => setDetails(null)} />
        ) : (
          <TransferForm onSuccess={setDetails} />
        )}
      </PageContainer>
    </>
  );
}
