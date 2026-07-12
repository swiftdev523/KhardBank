import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { useAuth } from "../auth/AuthContext";
import accountsData from "../data/accounts.json";
import transactionsData from "../data/transactions.json";
import cardsData from "../data/cards.json";
import statementsData from "../data/statements.json";

const AppContext = createContext(null);

// Adapt the JSON schema (Section 5) to the shape the UI components expect.
function toInternalAccount(a) {
  return { ...a, history: a.balanceHistory };
}

function toInternalTransaction(t) {
  return { ...t, description: t.merchant };
}

function toInternalCard(c) {
  return { ...c, holder: c.holderName };
}

export function AppProvider({ children }) {
  const { currentUser } = useAuth();

  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      setAccounts([]);
      setTransactions([]);
      setCards([]);
      return;
    }

    const scopedAccounts = accountsData
      .filter((a) => a.userId === currentUser.id)
      .map(toInternalAccount);
    const scopedAccountIds = new Set(scopedAccounts.map((a) => a.id));

    setAccounts(scopedAccounts);
    setTransactions(
      transactionsData
        .filter((t) => scopedAccountIds.has(t.accountId))
        .map(toInternalTransaction),
    );
    setCards(
      cardsData
        .filter((c) => scopedAccountIds.has(c.accountId))
        .map(toInternalCard),
    );
  }, [currentUser]);

  const toggleFreeze = useCallback((cardId) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, frozen: !c.frozen } : c)),
    );
  }, []);

  const transfer = useCallback(
    ({ fromAccountId, toAccountId, amount, note }) => {
      const numericAmount = Math.round(Number(amount) * 100) / 100;

      if (!fromAccountId) {
        return { success: false, error: "Select a source account." };
      }
      if (!numericAmount || numericAmount <= 0) {
        return {
          success: false,
          error: "Enter a valid amount greater than zero.",
        };
      }

      const fromAccount = accounts.find((a) => a.id === fromAccountId);
      if (!fromAccount) {
        return { success: false, error: "Source account not found." };
      }
      if (
        fromAccount.type !== "Credit Card" &&
        fromAccount.balance < numericAmount
      ) {
        return {
          success: false,
          error: "Insufficient funds in the source account.",
        };
      }

      const timestamp = new Date().toISOString().slice(0, 10);

      setAccounts((prev) =>
        prev.map((a) => {
          if (a.id === fromAccountId)
            return { ...a, balance: +(a.balance - numericAmount).toFixed(2) };
          if (a.id === toAccountId)
            return { ...a, balance: +(a.balance + numericAmount).toFixed(2) };
          return a;
        }),
      );

      const description = note?.trim()
        ? `Transfer — ${note.trim()}`
        : "Transfer";

      setTransactions((prev) => [
        {
          id: `txn_${Date.now()}_out`,
          date: timestamp,
          description,
          category: "Transfer",
          amount: numericAmount,
          type: "debit",
          accountId: fromAccountId,
        },
        ...(toAccountId
          ? [
              {
                id: `txn_${Date.now()}_in`,
                date: timestamp,
                description,
                category: "Transfer",
                amount: numericAmount,
                type: "credit",
                accountId: toAccountId,
              },
            ]
          : []),
        ...prev,
      ]);

      return { success: true };
    },
    [accounts],
  );

  const value = useMemo(
    () => ({
      user: currentUser
        ? { ...currentUser, initials: currentUser.avatarInitials }
        : null,
      accounts,
      transactions,
      cards,
      statements: statementsData,
      toggleFreeze,
      transfer,
    }),
    [currentUser, accounts, transactions, cards, toggleFreeze, transfer],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within an AppProvider");
  return ctx;
}
