export function DashboardEmptyState({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-beige-dark bg-white px-8 py-16 text-center">
      <p className="font-heading text-lg text-forest">{title}</p>
      <p className="max-w-sm text-sm text-ink-soft">{body}</p>
    </div>
  );
}
