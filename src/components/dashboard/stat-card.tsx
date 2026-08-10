import { Card } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: number;
  sublabel?: string;
}) {
  return (
    <Card className="bg-white">
      <p className="text-xs font-semibold tracking-[0.1em] text-ink-soft uppercase">
        {label}
      </p>
      <p className="mt-2 font-heading text-3xl text-forest">{value}</p>
      {sublabel ? <p className="mt-1 text-xs text-ink-soft">{sublabel}</p> : null}
    </Card>
  );
}
