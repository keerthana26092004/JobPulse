import { useState } from "react";
import type { EntryType } from "../types";
import { TRACKABLE_CATEGORIES } from "../types";
import { AuthShell, Field, inputClass } from "./LoginPage";

export function SignupPage({
  onSignup,
  onSwitchToLogin,
}: {
  onSignup: (
    email: string,
    password: string,
    username: string,
    trackedCategories: EntryType[],
  ) => { ok: boolean; error?: string };
  onSwitchToLogin: () => void;
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [categories, setCategories] = useState<EntryType[]>(
    TRACKABLE_CATEGORIES.map((c) => c.key),
  );
  const [error, setError] = useState("");

  function toggle(key: EntryType) {
    setCategories((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key],
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (categories.length === 0) {
      setError("Pick at least one thing you want to track.");
      return;
    }
    const result = onSignup(email, password, username, categories);
    if (!result.ok) setError(result.error ?? "Something went wrong.");
  }

  return (
    <AuthShell>
      <h1 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-text)]">
        Set up Signal
      </h1>
      <p className="mt-1 text-sm text-[var(--color-text-dim)]">
        Tell it what's worth interrupting you for.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <Field label="Username">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={inputClass}
            placeholder="How Signal should greet you"
          />
        </Field>
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
            minLength={4}
            className={inputClass}
            placeholder="At least 4 characters"
          />
        </Field>

        <div>
          <p className="text-sm font-medium text-[var(--color-text-dim)]">What do you want to track?</p>
          <div className="mt-2 grid gap-2">
            {TRACKABLE_CATEGORIES.map((c) => (
              <label key={c.key} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={categories.includes(c.key)}
                  onChange={() => toggle(c.key)}
                  className="h-4 w-4 rounded border-[var(--color-border)] text-[var(--color-signal)]"
                />
                <div>
                  <div className="text-sm font-medium text-[var(--color-text)]">{c.label}</div>
                  <div className="text-xs text-[var(--color-text-dim)]">{c.hint}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-[var(--color-danger)]">{error}</p>}

        <button
          type="submit"
          className="mt-2 rounded-lg bg-[var(--color-signal)] px-4 py-2.5 font-medium text-white transition hover:brightness-95"
        >
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--color-text-dim)]">
        Already have an account?{" "}
        <button
          onClick={onSwitchToLogin}
          className="font-medium text-[var(--color-signal)] hover:underline"
        >
          Log in
        </button>
      </p>
    </AuthShell>
  );
}
