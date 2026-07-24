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
      <h1 className="font-[var(--font-display)] text-3xl font-bold text-[var(--color-text)]">
        Welcome back!
      </h1>
      {/* <p className="mt-1 text-base text-[var(--color-text-dim)]">
        Pick up where the signal left off.
      </p> */}

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <Field label="Email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
            placeholder="Enter email address"
          />
        </Field>
        <Field label="Password">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputClass}
            placeholder="Enter Password"
          />
        </Field>

        {error && <p className="text-sm text-[var(--color-danger)]">{error}</p>}

        <button
          type="submit"
          className="mt-2 rounded-xl bg-[var(--color-signal)] px-5 py-3 font-medium text-white shadow-md transition hover:brightness-95"
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
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 rounded-3xl md:grid-cols-2">
        {/* <div className="hidden flex-col items-start justify-center gap-4 rounded-3xl p-8 auth-illustration text-left md:flex">
          <div className="relative flex h-12 w-12 items-center justify-center">
            <span className="pulse-dot absolute h-3 w-3 rounded-full bg-[var(--color-signal)]" />
            <span className="h-3 w-3 rounded-full bg-[var(--color-signal)] opacity-30" />
          </div>
          { <h2 className="text-2xl font-semibold text-[var(--color-text)]">Signal</h2>}
          { <p className="text-sm text-[var(--color-text-dim)]">Focus on what matters — we handle the noise.</p> }
        </div> */}
        <div className="hidden overflow-hidden rounded-3xl md:block">
  <img
    src="/photo.jpg"
    alt=""
    className="h-full w-full object-cover"
  />
</div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
}

export const inputClass =
  "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-3 text-base text-[var(--color-text)] outline-none focus:border-[var(--color-signal)] placeholder:text-[var(--color-text-dim)]/60";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-[var(--color-text-dim)]">{label}</span>
      {children}
    </label>
  );
}
