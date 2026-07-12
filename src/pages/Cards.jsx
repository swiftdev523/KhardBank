import { useApp } from "../context/AppContext";
import TopBar from "../components/layout/TopBar";
import PageContainer from "../components/layout/PageContainer";
import BankCard from "../components/cards/BankCard";
import FreezeToggle from "../components/cards/FreezeToggle";

export default function Cards() {
  const { cards, toggleFreeze } = useApp();

  return (
    <>
      <TopBar title="Cards" subtitle="Manage your debit and credit cards" />
      <PageContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="space-y-4">
            <BankCard card={card} frozen={card.frozen} />
            <FreezeToggle
              frozen={card.frozen}
              onToggle={() => toggleFreeze(card.id)}
              cardId={card.id}
            />
          </div>
        ))}
      </PageContainer>
    </>
  );
}
