const CATEGORY_STYLES = {
  Groceries: "bg-success/10 text-success",
  Transport: "bg-slate/10 text-slate",
  Dining: "bg-brass/15 text-brass",
  Bills: "bg-alert/10 text-alert",
  Income: "bg-success/10 text-success",
  Transfer: "bg-ink/10 text-ink",
  Shopping: "bg-brass/15 text-brass",
  Entertainment: "bg-slate/10 text-slate",
  Health: "bg-alert/10 text-alert",
  Subscriptions: "bg-slate/10 text-slate",
};

export default function Badge({ children, category }) {
  const style = CATEGORY_STYLES[category] || "bg-slate/10 text-slate";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}>
      {children}
    </span>
  );
}
