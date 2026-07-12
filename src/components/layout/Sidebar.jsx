import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Landmark } from "lucide-react";
import { navItems } from "./navItems";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../auth/AuthContext";

export default function Sidebar() {
  const { user } = useApp();
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 shrink-0 bg-ink text-white/90 min-h-screen sticky top-0">
      <div className="flex items-center gap-2 px-6 py-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brass text-ink">
          <Landmark size={20} aria-hidden="true" />
        </span>
        <span className="font-serif text-lg font-semibold tracking-tight text-white">
          Vaultis Bank
        </span>
      </div>

      <nav aria-label="Primary" className="flex-1 px-3 mt-2 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-brass/15 text-brass"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`
            }>
            <Icon size={18} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brass/20 text-sm font-semibold text-brass">
            {user.initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {user.name}
            </p>
            <p className="truncate text-xs text-white/50">{user.email}</p>
          </div>
          <button
            type="button"
            aria-label="Sign out"
            onClick={handleSignOut}
            className="text-white/50 hover:text-brass transition-colors">
            <LogOut size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
}
