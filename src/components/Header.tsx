export function Header({
  urgentCount,
  username,
  onLogout,
}: {
  urgentCount: number;
  username: string;
  onLogout: () => void;
}) {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-6 sm:px-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <span className="pulse-dot absolute h-3 w-3 rounded-full bg-[var(--color-signal)]" />
            <span className="h-3 w-3 rounded-full bg-[var(--color-signal)] opacity-30" />
          </div>
          <div>
            <h1 className="font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-text)]">
              Job Pulse
            </h1>
            <p className="text-sm text-[var(--color-text-dim)]">
              Hey {username} — Welcome Back!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {urgentCount > 0 && (
            <div className="flex items-center gap-2 rounded-full border border-[var(--color-signal-dim)]/40 bg-[var(--color-signal-soft)] px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[var(--color-signal)]" />
              <span className="font-[var(--font-mono)] text-sm text-[var(--color-signal-dim)]">
                {urgentCount} needs attention
              </span>
            </div>
          )}
          <button
  onClick={onLogout}
  className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-dim)] transition hover:border-[var(--color-danger)]/40 hover:bg-[var(--color-danger-soft)] hover:text-[var(--color-danger)]"
>
  Log out
</button>
        </div>
      </div>
    </header>
  );
}
