import { NavLink } from "react-router-dom";
import { navItems } from "./navItems";

export default function MobileTabBar() {
  return (
    <nav
      aria-label="Primary"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-ink border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
      <ul className="flex overflow-x-auto no-scrollbar">
        {navItems.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1 min-w-[64px]">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${
                  isActive ? "text-brass" : "text-white/60"
                }`
              }>
              <Icon size={20} aria-hidden="true" />
              <span className="truncate">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
