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
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-5 sm:px-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <span className="pulse-dot absolute h-2.5 w-2.5 rounded-full bg-[var(--color-signal)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-signal)] opacity-30" />
          </div>
          <div>
            <h1 className="font-[var(--font-display)] text-xl font-semibold tracking-tight text-[var(--color-text)]">
              Signal
            </h1>
            <p className="text-xs text-[var(--color-text-dim)]">
              hey {username} — here's what's cutting through
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {urgentCount > 0 && (
            <div className="flex items-center gap-2 rounded-full border border-[var(--color-signal-dim)]/40 bg-[var(--color-signal-soft)] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-signal)]" />
              <span className="font-[var(--font-mono)] text-xs text-[var(--color-signal-dim)]">
                {urgentCount} needs attention
              </span>
            </div>
          )}
          <button
            onClick={onLogout}
            className="text-xs font-medium text-[var(--color-text-dim)] hover:text-[var(--color-text)]"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
