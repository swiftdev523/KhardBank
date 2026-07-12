import { useApp } from "../../context/AppContext";

export default function TopBar({ title, subtitle }) {
  const { user } = useApp();

  return (
    <header className="flex items-center justify-between gap-4 px-4 md:px-8 py-5 md:py-6">
      <div>
        <h1 className="font-serif text-xl md:text-2xl font-semibold text-ink">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-sm text-slate mt-0.5">{subtitle}</p>
        ) : null}
      </div>
      <div className="hidden sm:flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-sm font-semibold text-ink">
          {user.initials}
        </span>
      </div>
    </header>
  );
}
