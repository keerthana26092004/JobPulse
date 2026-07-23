import { useState } from "react";

export function LoginPage({
  onLogin,
  onSwitchToSignup,
}: {
  onLogin: (email: string, password: string) => { ok: boolean; error?: string };
  onSwitchToSignup: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = onLogin(email, password);
    if (!result.ok) setError(result.error ?? "Something went wrong.");
  }

  return (
    <AuthShell>
      <h1 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-text)]">
        Welcome back
      </h1>
      <p className="mt-1 text-sm text-[var(--color-text-dim)]">
        Pick up where the signal left off.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <Field label="Email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Password">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputClass}
            placeholder="••••••••"
          />
        </Field>

        {error && <p className="text-sm text-[var(--color-danger)]">{error}</p>}

        <button
          type="submit"
          className="mt-2 rounded-lg bg-[var(--color-signal)] px-4 py-2.5 font-medium text-white transition hover:brightness-95"
        >
          Log in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--color-text-dim)]">
        New here?{" "}
        <button
          onClick={onSwitchToSignup}
          className="font-medium text-[var(--color-signal)] hover:underline"
        >
          Create an account
        </button>
      </p>
    </AuthShell>
  );
}

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center gap-2.5">
          <div className="relative flex h-7 w-7 items-center justify-center">
            <span className="pulse-dot absolute h-2 w-2 rounded-full bg-[var(--color-signal)]" />
            <span className="h-2 w-2 rounded-full bg-[var(--color-signal)] opacity-30" />
          </div>
          <span className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-text)]">
            Signal
          </span>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}

export const inputClass =
  "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-signal)] placeholder:text-[var(--color-text-dim)]/60";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-[var(--color-text-dim)]">{label}</span>
      {children}
    </label>
  );
}
