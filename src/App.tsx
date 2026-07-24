import { useState } from "react";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { EntryList } from "./components/EntryList";
import { AddEntryForm } from "./components/AddEntryForm";
import { SignalHealth } from "./components/SignalHealth";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import Sidebar, { type ViewKey } from "./components/Sidebar";
import OverviewSummary from "./components/OverviewSummary";
import { useEntries } from "./useEntries";
import { useAuth } from "./useAuth";
import { getUrgency } from "./urgency";
import { TRACKABLE_CATEGORIES } from "./types";

function App() {
  const { currentUser, signup, login, logout } = useAuth();
  const { entries, addEntry, updateEntry, deleteEntry, seedDemoData } = useEntries();
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState<ViewKey>("overview");
  const [authView, setAuthView] = useState<"login" | "signup">("signup");

  if (!currentUser) {
    return authView === "login" ? (
      <LoginPage onLogin={login} onSwitchToSignup={() => setAuthView("signup")} />
    ) : (
      <SignupPage onSignup={signup} onSwitchToLogin={() => setAuthView("login")} />
    );
  }

  const allowedTypes =
    currentUser.trackedCategories.length > 0
      ? currentUser.trackedCategories
      : TRACKABLE_CATEGORIES.map((c) => c.key);

  const visibleEntries = entries.filter((e) => allowedTypes.includes(e.type));

  const urgentCount = visibleEntries.filter((e) => {
    if (e.status !== "pending") return false;
    const u = getUrgency(e);
    return u === "overdue" || u === "today" || u === "soon";
  }).length;

  return (
    <div className="min-h-screen">
      <Header urgentCount={urgentCount} username={currentUser.username} onLogout={logout} />

      <main className="mx-auto flex max-w-5xl gap-8 px-6 py-10 sm:px-10">
        <Sidebar selected={view} onSelect={setView} />

        <div className="flex w-full flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            {/* <p className="max-w-md text-sm text-[var(--color-text-dim)]">
              Every portal notifies you about everything. This only shows what you told it matters.
            </p> */}
            <div className="flex shrink-0 gap-2">
              {entries.length === 0 && (
                <button
                  onClick={seedDemoData}
                  className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-medium text-[var(--color-text-dim)] transition hover:border-[var(--color-signal-dim)] hover:text-[var(--color-text)]"
                >
                  Load example
                </button>
              )}
              {/* <button
                onClick={() => setShowForm(true)}
                className="rounded-lg bg-[var(--color-signal)] px-4 py-2 text-sm font-medium text-white transition hover:brightness-95"
              >
                + Add something
              </button> */}
            </div>
          </div>

          {view === "health" && <SignalHealth entries={visibleEntries} />}

          {view === "dashboard" && (
            <Dashboard entries={visibleEntries} onMark={(id, status) => updateEntry(id, { status })} />
          )}

          {view === "all" && <EntryList entries={visibleEntries} onDelete={deleteEntry} />}

          {view === "overview" && <OverviewSummary entries={visibleEntries} />}
        </div>
      </main>

      <footer className="mx-auto max-w-5xl px-6 pb-10 text-center text-xs text-[var(--color-text-dim)] sm:px-10">
        {/* Built for freshers drowning in portal notifications — one signal, no noise. */}
      </footer>

      {showForm && (
        <AddEntryForm
          onAdd={addEntry}
          onClose={() => setShowForm(false)}
          allowedTypes={allowedTypes}
        />
      )}
    </div>
  );
}

export default App;
