export default function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      {Icon ? (
        <span className="rounded-full bg-paper p-4 text-slate mb-4">
          <Icon size={28} aria-hidden="true" />
        </span>
      ) : null}
      <h3 className="font-serif font-semibold text-ink text-lg">{title}</h3>
      {description ? (
        <p className="text-slate text-sm mt-1 max-w-sm">{description}</p>
      ) : null}
    </div>
  );
}
