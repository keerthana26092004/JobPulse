import React from "react";

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
      <div className="mb-2 text-sm font-medium text-[var(--color-text)]">Tracked items (pending)</div>
      <div style={{ height }} className="flex flex-col gap-3">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-3">
            <div className="w-28 text-xs text-[var(--color-text-dim)]">{d.label}</div>
            <div className="flex-1">
              <div className="h-3 rounded bg-[var(--color-noise-dim)]">
                <div
                  className="h-3 rounded bg-[var(--color-signal)]"
                  style={{ width: `${(d.value / max) * 100}%` }}
                />
              </div>
            </div>
            <div className="w-8 text-right text-xs font-medium text-[var(--color-text)]">{d.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BarChart;
