# Signal

**A single, quiet place for the job-search moments you can't afford to miss.**

## The problem

When you're hunting for a job as a fresher, you don't apply through one channel — you're on Naukri, Internshala, Freshersworld, referrals, and direct company portals all at once. Every one of them pushes notifications: new job recommendations, generic updates, "companies hiring now."

Somewhere in that flood, the genuinely critical ones — a shortlisted coding assessment, an interview invite, a deadline — arrive looking exactly like the noise around them. It's easy to miss them entirely. That's not hypothetical: it's how a real shortlisted coding assessment got missed.

## The idea

Signal isn't another application tracker. It doesn't try to read your inbox or unify every portal (that's a fragile, over-scoped fix for a 2-day build, and arguably not even the real problem). Instead, it asks for one small habit: **the moment something time-sensitive lands, spend 15 seconds logging it here.**

The app then does the one thing your inbox can't: shows you *only* what's urgent, sorted by how soon it matters, with everything else — pending items with breathing room, done, missed — kept out of the way until you ask for it.

## What it does

- **Signup** — email, password, username, plus a choice of which categories you actually want Signal to track (assessments, interviews, deadlines, referral follow-ups, general follow-ups). This personalizes the app to what matters to *you*, rather than showing every possible category by default.
- **Login** — email + password.
- **Signal Health** — a ring visual showing your on-time catch rate (resolved-on-time vs missed) as your history builds up, so the app gives ongoing feedback instead of being a static list.
- **Dashboard ("Don't miss this")** — pending items due today or within 3 days, sorted by urgency, with overdue items flagged distinctly.
- **Add an entry** — company, role, source/portal, type (limited to the categories you picked at signup), and the date-time that matters.
- **Full list** — every entry you've logged, filterable by source and status, so you also always know which portal an application came through.
- **Mark done / missed** — closes the loop without deleting history, and feeds the Signal Health ring.

All data — including login credentials — is stored in your browser's `localStorage`. There is no backend and no real security here; this is a deliberate MVP scoping decision, not an oversight. It lets the whole flow (signup → personalize → track → resolve) work end-to-end within a 2-day build, while being upfront that a production version would need a real auth backend.

## Tech stack

- React 19 + TypeScript
- Tailwind CSS v4
- Vite
- No backend — `localStorage` persistence

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Design notes

The visual language is built around the app's own thesis: important signals get lost in noise. A calm, light paper background keeps the palette quiet so the signal-amber accent used for urgent items and the Signal Health ring actually reads as meaningful — it's a functional choice tied to the problem, not decoration.

## What I'd add with another week

- A real backend with proper auth (hashed passwords, sessions) instead of the client-only mock used here.
- Parsing pasted email text to auto-suggest an entry (date, company, type) instead of manual entry, while keeping a confirm step so nothing gets added silently.
- Browser/desktop notifications for items becoming urgent, so you don't have to remember to open the app.
- Optional Gmail integration to flag likely-critical emails automatically — explored but out of scope given the API/auth setup time it would need.
- Shareable/exportable view for mentors or placement cells to sanity-check your pipeline.

## AI collaboration

Built in collaboration with Claude — used for problem framing, the signal/noise design direction, component architecture, and code implementation. Product framing, the specific problem choice (validated against a real missed-assessment incident), and final design decisions were reviewed and directed throughout rather than accepted wholesale.
