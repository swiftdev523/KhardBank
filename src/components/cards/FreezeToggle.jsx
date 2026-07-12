import { Snowflake } from "lucide-react";
import ToggleSwitch from "../shared/ToggleSwitch";

export default function FreezeToggle({ frozen, onToggle, cardId }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-paper px-4 py-3">
      <div className="flex items-center gap-2.5">
        <span
          className={`rounded-lg p-2 ${frozen ? "bg-alert/10 text-alert" : "bg-slate/10 text-slate"}`}>
          <Snowflake size={16} aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-medium text-ink">Freeze card</p>
          <p className="text-xs text-slate">
            {frozen
              ? "Card is frozen — no new purchases."
              : "Instantly lock this card."}
          </p>
        </div>
      </div>
      <ToggleSwitch
        id={`freeze-${cardId}`}
        checked={frozen}
        onChange={onToggle}
      />
    </div>
  );
}
