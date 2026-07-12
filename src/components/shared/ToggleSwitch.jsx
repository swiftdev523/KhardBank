export default function ToggleSwitch({
  checked,
  onChange,
  label,
  description,
  id,
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        {label ? (
          <label htmlFor={id} className="text-sm font-medium text-ink">
            {label}
          </label>
        ) : null}
        {description ? (
          <p className="text-xs text-slate mt-0.5">{description}</p>
        ) : null}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
          checked ? "bg-brass" : "bg-slate/25"
        }`}>
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
