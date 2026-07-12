import { CheckCircle2 } from "lucide-react";

export default function TransferSuccess({ details, onReset }) {
  return (
    <div className="card p-8 md:p-10 max-w-xl text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
        <CheckCircle2 size={28} aria-hidden="true" />
      </span>
      <h2 className="font-serif text-xl font-semibold text-ink mt-4">
        Transfer complete
      </h2>
      <p className="text-sm text-slate mt-1">
        You sent{" "}
        <span className="mono font-medium text-ink">
          $
          {details.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>{" "}
        to {details.toLabel}.
      </p>
      {details.note ? (
        <p className="text-sm text-slate mt-1">"{details.note}"</p>
      ) : null}

      <button
        type="button"
        onClick={onReset}
        className="mt-6 rounded-lg border border-brass text-brass px-5 py-2.5 text-sm font-semibold hover:bg-brass/10 transition-colors">
        Make another transfer
      </button>
    </div>
  );
}
