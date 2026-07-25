# Job Pulse

A focused tracker that shows me only what's urgent in my job search among multiple emails.

## Project Description

While applying for jobs, I'm logged into multiple portals at once—Naukri, Internshala, company sites, and referrals. Every one of them sends frequent notifications, mostly generic job recommendations. Somewhere in that noise, I once missed my own shortlisted Infosys coding assessment because the actual invite got buried under dozens of unrelated updates.

That's the real problem this app solves: not "track my applications" in general, but specifically **stop important, time-sensitive opportunities from getting lost in notification noise.**

## Features

- **Sign Up & Login** – Personalized workspace for each user.
- **Add Job** – Track company, role, source/portal, job type, and deadline.
- **Priority Alerts** – Shows only jobs due today or within the next 3 days, sorted by urgency.
- **Signal Health** – Tracks completed vs. missed deadlines.
- **All Applications** – View and filter all tracked applications by source and status.

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- Browser LocalStorage (for data storage and authentication)

## Installation Steps

Clone the repository:

```bash
git clone https://github.com/keerthana26092004/JobPulse.git
```

Navigate to the project folder:

```bash
cd JobPulse
```

Install dependencies:

```bash
npm install
```


## How to Run Locally

Start the development server:

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:5173
```

To build for production:

```bash
npm run build
npm run preview
```

## Live Website Link

https://jobpulsefresher.netlify.app/
