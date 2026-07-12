import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function TransferForm({ onSuccess }) {
  const { accounts, transfer } = useApp();
  const [fromAccountId, setFromAccountId] = useState(accounts[0]?.id || "");
  const [recipientType, setRecipientType] = useState("account");
  const [toAccountId, setToAccountId] = useState("");
  const [payeeName, setPayeeName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const otherAccounts = accounts.filter((a) => a.id !== fromAccountId);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (recipientType === "account" && !toAccountId) {
      setError("Choose a destination account.");
      return;
    }
    if (recipientType === "payee" && !payeeName.trim()) {
      setError("Enter a payee name.");
      return;
    }

    setSubmitting(true);
    const result = transfer({
      fromAccountId,
      toAccountId: recipientType === "account" ? toAccountId : undefined,
      amount,
      note:
        recipientType === "payee"
          ? `${payeeName.trim()}${note ? ` — ${note}` : ""}`
          : note,
    });
    setSubmitting(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    onSuccess({
      fromAccountId,
      toLabel:
        recipientType === "account"
          ? accounts.find((a) => a.id === toAccountId)?.name
          : payeeName,
      amount: Number(amount),
      note,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-6 md:p-8 space-y-5 max-w-xl">
      <div>
        <label htmlFor="fromAccount" className="text-sm font-medium text-ink">
          From account
        </label>
        <select
          id="fromAccount"
          value={fromAccountId}
          onChange={(e) => setFromAccountId(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate/20 bg-white py-2.5 px-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass">
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} ({a.maskedNumber})
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-ink mb-2">Send to</legend>
        <div className="flex gap-4 mb-3">
          <label className="flex items-center gap-2 text-sm text-slate">
            <input
              type="radio"
              name="recipientType"
              value="account"
              checked={recipientType === "account"}
              onChange={() => setRecipientType("account")}
              className="accent-brass"
            />
            My accounts
          </label>
          <label className="flex items-center gap-2 text-sm text-slate">
            <input
              type="radio"
              name="recipientType"
              value="payee"
              checked={recipientType === "payee"}
              onChange={() => setRecipientType("payee")}
              className="accent-brass"
            />
            New payee
          </label>
        </div>

        {recipientType === "account" ? (
          <select
            aria-label="To account"
            value={toAccountId}
            onChange={(e) => setToAccountId(e.target.value)}
            className="w-full rounded-lg border border-slate/20 bg-white py-2.5 px-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass">
            <option value="">Select account</option>
            {otherAccounts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.maskedNumber})
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            aria-label="Payee name"
            value={payeeName}
            onChange={(e) => setPayeeName(e.target.value)}
            placeholder="e.g. Jordan Alden"
            className="w-full rounded-lg border border-slate/20 bg-white py-2.5 px-3 text-sm text-ink placeholder:text-slate/60 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
          />
        )}
      </fieldset>

      <div>
        <label htmlFor="amount" className="text-sm font-medium text-ink">
          Amount
        </label>
        <div className="relative mt-1.5">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate mono">
            $
          </span>
          <input
            id="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-lg border border-slate/20 bg-white py-2.5 pl-7 pr-3 text-sm mono text-ink placeholder:text-slate/60 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
          />
        </div>
      </div>

      <div>
        <label htmlFor="note" className="text-sm font-medium text-ink">
          Note <span className="text-slate font-normal">(optional)</span>
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          placeholder="What's this for?"
          className="mt-1.5 w-full rounded-lg border border-slate/20 bg-white py-2.5 px-3 text-sm text-ink placeholder:text-slate/60 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass resize-none"
        />
      </div>

      {error ? <p className="text-sm text-alert font-medium">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-brass py-3 text-sm font-semibold text-ink hover:bg-brass-light transition-colors disabled:opacity-60">
        {submitting ? "Processing…" : "Send transfer"}
      </button>
    </form>
  );
}
