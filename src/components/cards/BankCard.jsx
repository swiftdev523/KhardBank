import { Wifi } from "lucide-react";

function NetworkMark({ network }) {
  if (network === "Mastercard") {
    return (
      <div className="flex items-center" aria-label="Mastercard">
        <span className="h-7 w-7 rounded-full bg-alert/80" />
        <span className="h-7 w-7 rounded-full bg-brass/90 -ml-3" />
      </div>
    );
  }
  return (
    <span
      className="font-serif italic text-xl font-semibold tracking-wide"
      aria-label="Visa">
      VISA
    </span>
  );
}

export default function BankCard({ card, frozen }) {
  const isCredit = card.type === "Credit";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 h-52 flex flex-col justify-between text-white shadow-[0_8px_24px_rgba(11,30,51,0.18)] transition-opacity duration-300 ${
        frozen ? "opacity-60 saturate-50" : ""
      } ${isCredit ? "bg-gradient-to-br from-brass via-[#9c7a48] to-ink" : "bg-gradient-to-br from-ink via-ink-light to-[#0d2540]"}`}>
      <div
        className="absolute -right-8 -bottom-10 h-40 w-40 rounded-full bg-white/10"
        aria-hidden="true"
      />
      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-xs uppercase tracking-wider text-white/70">
            {card.type} card
          </p>
          <p className="font-serif font-semibold text-lg mt-0.5">
            Vaultis Banking
          </p>
        </div>
        <Wifi
          size={22}
          className="text-white/70 rotate-90"
          aria-hidden="true"
        />
      </div>

      <div className="relative">
        <p className="mono text-base md:text-lg tracking-wider whitespace-nowrap">
          {card.maskedNumber}
        </p>
        <div className="flex items-end justify-between mt-4">
          <div>
            <p className="text-[10px] uppercase text-white/60 tracking-wide">
              Card holder
            </p>
            <p className="text-sm font-medium mt-0.5">{card.holder}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-white/60 tracking-wide">
              Expires
            </p>
            <p className="mono text-sm mt-0.5">{card.expiry}</p>
          </div>
          <NetworkMark network={card.network} />
        </div>
      </div>

      {frozen ? (
        <span className="absolute top-4 right-4 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide">
          Frozen
        </span>
      ) : null}
    </div>
  );
}
