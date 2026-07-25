# Job Pulse

A focused tracker that shows me only what's urgent in my job search among multiple emails.

## Why I built this

While applying for jobs, I'm logged into multiple portals at once — Naukri, Internshala, company sites, referrals. Every one of them pushes notifications constantly, mostly generic job recommendations. Somewhere in that noise, I once missed my own shortlisted Infosys coding assessment — the actual invite got buried under dozens of unrelated updates.

That's the real problem this app solves: not "track my applications" in general, but specifically **stop important, time-sensitive things from getting lost in notification noise.**

## What it does

- **Sign up** - This personalizes what you see from day one instead of showing everything by default.
- **Add Job** — Add a job with company, role, source/portal, type, and the exact date-time it's due.
- **Priority Alerts** — a filtered view showing only what's urgent (due today or within the next 3 days), sorted by how soon it's due, so nothing critical gets buried.
- **Performance (Signal Health)** — a running catch-rate score based on what I've resolved on time vs. missed.
- **All Applications** — the full record of everything I'm tracking, filterable by source and status.

## Why manual entry, not auto email-reading

I deliberately chose not to try auto-parsing my inbox for this build. Reading emails automatically to detect deadlines needs OAuth setup, API approval, and reliable text parsing — realistically a multi-week project, not something safe to attempt in a couple of days. Instead, the app leans on one small habit: the moment something time-sensitive lands, I take 15 seconds to log it here myself. It's a more honest trade-off for the timeframe, and it's listed below as something I'd build toward with more time.

## Tech stack

- React + TypeScript
- Tailwind CSS
- Vite
- No backend — data (including login) is stored in the browser's `localStorage`. This was a deliberate MVP scoping decision so the whole flow works end-to-end without needing real infrastructure, not an oversight — a production version would need proper backend auth.

## Running it locally

```bash
git clone "https://github.com/keerthana26092004/JobPulse.git"
npm install
npm run dev
```

Then open the local URL in search engine (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Live site

https://jobpulsefreshers.netlify.app/

## What I'd improve with more time

- A real backend with proper authentication instead of using only local storage.
- Exploring email API integration to auto-fetch application-related details instead of manual entry — the natural next step once I had time to handle the OAuth/parsing complexity properly.
- Browser notifications for items becoming urgent, so I don't have to remember to check the app.
- A way to export tracked deadlines to a calendar.

## AI collaboration

I used Claude ai — for shaping the problem statement, working through design and architecture decisions (like why manual entry over email parsing), and writing/iterating on the actual code. I directed the specific problem choice (based on my own missed-assessment experience), the personalization angle at signup, and the Signal Health scoring idea, and reviewed/adjusted the implementation rather than accepting it as-is.
