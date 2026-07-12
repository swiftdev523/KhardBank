import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  Send,
  CreditCard,
  FileText,
  Settings,
} from "lucide-react";

export const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/accounts", label: "Accounts", icon: Wallet },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/transfer", label: "Transfer", icon: Send },
  { to: "/cards", label: "Cards", icon: CreditCard },
  { to: "/statements", label: "Statements", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
];
