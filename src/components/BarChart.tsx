export function BarChart({
  data,
  height = 140,
}: {
  data: { label: string; value: number }[];
  height?: number;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="mb-3 text-sm font-medium text-[var(--color-text)]">Tracked items (pending)</div>
      <div style={{ height }} className="flex justify-between gap-3">
        {data.map((d) => (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="text-xs font-medium text-[var(--color-text)]">{d.value}</div>
            <div className="flex w-full flex-1 items-end justify-center rounded bg-[var(--color-noise-dim)]">
              <div
                className="w-full rounded bg-[var(--color-signal)] transition-all"
                style={{ height: `${(d.value / max) * 100}%` }}
              />
            </div>
            <div className="text-xs text-[var(--color-text-dim)]">{d.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BarChart;