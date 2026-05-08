# Routiq

Routiq is a full-stack habit tracking application built around rituals, milestones, and visual plant growth. Users create habits with motivation and accountability context, log daily progress, grow collectible plants, unlock rarer species, review analytics, and manage reminders inside a themed interface with light and dark modes.

## What The App Does

- Creates habits with structure, not just a title:
  - when the habit should happen
  - motivation
  - blockers
  - accountability person
  - inspiration
  - current goal
  - reward
  - goal window in days
- Logs daily progress with:
  - completion level
  - mood
  - stress
  - notes
- Tracks milestones and rewards:
  - mark a goal complete
  - trigger reward flow
  - set the next goal and reward
  - carry progress forward even if the plant choice changes
- Grows plants visually over time:
  - each habit has a selected plant
  - plants unlock based on how many plants the user has fully grown
  - higher-tier plants take more progress to finish
  - completed plants are archived in the garden
- Schedules reminders:
  - daily habit-time reminders
  - goal-window follow-ups
  - in-app notifications
- Shows a premium visual dashboard:
  - featured living plant model
  - daily logging summary
  - longest vine
  - 7-day rate
  - recent signals and reports
- Provides a full visual experience:
  - custom landing page
  - dark mode and light mode
  - live clock
  - garden archive
  - reports with custom visual charts

## Core Product Areas

### Landing
The landing page introduces the product with the final visual direction used across the app: editorial typography, atmospheric backgrounds, animated layers, and premium card styling.

### Auth
Users can register, sign in, and return to the landing page from both auth screens.

### Habit Registry
Users can:
- add a new habit
- edit an existing habit mid-cycle
- change reminder time
- change goal window
- change current goal and reward
- change the selected plant
- log progress for the day
- complete a milestone and start the next one

### Arboretum
The dashboard includes a larger live plant view that reflects the selected plant for the featured habit and shows its current growth progress.

### Garden
The garden stores previously completed plants and shows unlock progression across the plant catalog.

### Reports
Reports summarize behavior, progress, mood, and activity patterns with custom-styled charts rather than default generic graph styling.

### Oracle AI Companion
The Oracle is a local, stateful reflection companion that integrates with your habit database. It coaches you on routine building, schedules, and bad habit elimination using personalized behavioral analysis.

## Plant System

Routiq includes a progression-based plant system.

- `fern` is the base plant
- rarer plants unlock after enough fully grown plants are archived
- each plant has its own hidden growth target
- growth is displayed as 12 visible stages in the UI
- the rendered plant builds incrementally instead of showing the final silhouette from the beginning
- completing a plant triggers a celebration flow and allows the user to choose the next plant

## The Oracle AI Companion

The **Oracle** is a stateful, local reflection companion designed to act as your behavioral psychologist. It is equipped with **16 specialized behavioral modules** spanning habit stacking, environment design, burnout prevention, scheduling optimization, and custom bad-habit inversion action plans.

### Core Conversation Modules & Triggers

| Module Topic | Trigger Keywords | Focus Area |
| :--- | :--- | :--- |
| **Burnout & Stress** | `burnout`, `stress`, `exhausted`, `overwhelmed` | Analyzes historical stress levels and suggests scaling back goals. |
| **Productivity Timing** | `when`, `time`, `productive`, `peak`, `dip` | Calculates your peak performance and completion days of the week. |
| **Consistency Slips** | `consistency`, `lose consistency`, `struggling` | Focuses on micro-steps and the psychology of failing forward. |
| **Headspace & Moods** | `mood`, `emotion`, `feeling`, `pattern` | Coregulates mood patterns with routine completions. |
| **New Habit Additions** | `add`, `new habit`, `recommend`, `complement` | Recommends new habits to plug gaps (hydration, mindfulness, movement). |
| **Garden Progress** | `plant`, `garden`, `grow`, `seed`, `bloom` | Identifies which plant is closest to blooming with exact progress. |
| **Habit Stacking** | `stack`, `anchor`, `combine`, `link`, `cue` | Teaches cue-anchoring: *"After [Current Habit], I will [New Habit]"*. |
| **The Habit Loop** | `loop`, `craving`, `response`, `reward` | Breaks down routine steps (Cue, Craving, Response, Reward). |
| **Identity-Based Mindsets**| `identity`, `self-image`, `mindset`, `person` | Focuses on becoming the type of person who performs the habit. |
| **Environment Design** | `environment`, `friction`, `easy`, `hard` | Adjusts friction to automate good habits and block bad ones. |
| **Keystone Habits** | `keystone`, `foundational`, `core habit` | Explains high-leverage routines that trigger positive chain reactions. |
| **Motivation vs Discipline**| `motivation`, `discipline`, `willpower`, `lazy` | Replaces fleeting motivation with system-based rules (e.g. 2-Minute Rule). |
| **Streak Neuroscience** | `track`, `view`, `visual`, `calendar`, `streak` | Explains why visual tracking registers as a rewarding victory. |

---

### Conversational Q&A Examples

The Oracle responds with deeply personalized, rich, and encouraging insights based on your actual data. Here are several real-world conversational examples of questions you can ask and the answers you will receive:

#### 1. Checking Burnout & Stress Signals
> **User**: *"Am I close to burnout?"*
>
> **Oracle**:
> "I notice you've logged high stress (4 or 5) on 4 days this past week.
>
> *Burnout isn't a failure of willpower, it's a signal from your body.* When stress is this high, your consistency naturally drops. I strongly suggest scaling back your habits right now. Can you reduce the difficulty or time commitment of your hardest habit just for the next few days? Showing up for 2 minutes is infinitely better than skipping entirely."

#### 2. Habit Recommendations with Stateful Follow-Ups
> **User**: *"What habit complements my routine?"*
>
> **Oracle**:
> "Looking at your current routine, you might benefit from adding **a hydration habit (like drinking water first thing in the morning)**.
>
> However, only add it if you feel completely confident you can do it on your worst days. Stack it directly onto one of your existing habits so it's easier to remember!"
>
> **User**: *"recommend something else"*
>
> **Oracle**:
> "Certainly! Since we already discussed hydration, another excellent addition would be **a mindfulness habit (like 2 minutes of journaling or breathing)**.
>
> Adding habits sequentially ensures they stick. Try doing this for just a few days before scaling it up!"

#### 3. Breaking Bad Habits: Specific Inversions
> **User**: *"How can I stop doomscrolling on my phone?"*
>
> **Oracle**:
> "To break an unwanted or bad habit, we invert the 4 stages of behavior change:
>
> 1. **Invert the Cue**: Make it *invisible*. (Remove triggers from sight).
> 2. **Invert the Craving**: Make it *unattractive*. (Reframe your mindset; focus on the cost of the habit).
> 3. **Invert the Response**: Make it *difficult*. (Increase friction, e.g. put timers on apps).
> 4. **Invert the Reward**: Make it *unsatisfying*. (Create an accountability metric).
>
> ### Action Plan for Doomscrolling & Screen Addiction:
> - **Make it Invisible**: Charge your phone in another room overnight. Do not touch it for the first 30 minutes after waking up.
> - **Make it Difficult**: Turn your screen to **Grayscale mode**. Removing the bright, dopamine-inducing colors instantly makes apps like Instagram or TikTok incredibly boring.
> - **Make it Unsatisfying**: Set strict app timers, or have a friend set a passcode you don't know for social media access."

#### 4. Conquering Procrastination & Mindset Blockers
> **User**: *"How do I deal with procrastination and laziness?"*
>
> **Oracle**:
> "Procrastination is rarely about time management—it is a way of coping with difficult emotions like anxiety, boredom, or self-doubt associated with a task.
>
> ### Action Plan for Procrastination & Delay:
> - **Make it Easy (The 2-Minute Rule)**: Commit to doing just 2 minutes of the task (e.g. open your study file and write 1 sentence). Starting is 90% of the battle. Once you start, momentum usually takes over.
> - **Make it Obvious**: Lay out your work materials or open your browser tabs the night before so there is zero starting friction.
> - **Make it Satisfying**: Pair the task with an immediate micro-reward, or log your progress visually here on RoutiQ. Every time you show up, you are casting a vote for being a productive person."

## Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Axios
- Recharts
- date-fns
- lucide-react

### Backend
- Node.js
- Express
- PostgreSQL
- pg
- JWT authentication
- bcryptjs
- node-cron

## Project Structure

```text
routiq-dbms-project/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── database/
│   │   ├── init.js
│   │   └── schema.sql
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── index.js
│   └── package.json
├── package.json
└── README.md
```

## Application Routes

### Frontend Routes
- `/` landing page
- `/login` sign in
- `/register` sign up
- `/dashboard` authenticated dashboard
- `/habits` habit registry
- `/habits/new` create ritual
- `/habits/:id/log` log daily progress
- `/reports` analytics and charts
- `/garden` archive and unlocks
- `/settings` preferences and reminder settings

### Backend API Prefix
All backend routes are served under `/api`.

Main route groups:
- `/api/auth`
- `/api/habits`
- `/api/logs`
- `/api/mood`
- `/api/reports`
- `/api/notifications`
- `/api/subtasks`
- `/api/garden`

Health check:
- `GET /api/health`

## Database Model

The PostgreSQL schema includes:

- `users`
  - auth data
  - reminder preferences
  - number of fully grown plants
- `habits`
  - habit metadata
  - motivation/accountability fields
  - reminder time
  - current goal and reward
  - goal window
  - milestone counts
  - selected plant
  - growth progress
- `habit_logs`
  - one log per habit per day
  - completion level
  - mood
  - stress
  - notes
- `mood_logs`
- `weekly_reports`
- `sub_tasks`
- `notifications`
- `garden_plants`

## Prerequisites

- Node.js 18+ recommended
- npm
- PostgreSQL 12+ recommended

## Environment Variables

Create `server/.env` manually with values like:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=habit_tracker
DB_PASSWORD=postgres
DB_PORT=5432
JWT_SECRET=replace-this-with-a-secure-secret
PORT=5600
```

Notes:
- The backend defaults to port `5600`.
- The Vite dev server proxies `/api` to `http://localhost:5600`.
- The backend can auto-increment to another port if `5600` is busy, but the frontend proxy is hardcoded to `5600`, so local development is simplest when the backend stays on `5600`.


## Installation

### 1. Install dependencies

From the repo root:

```bash
npm install
npm run install-all
```

If you prefer manual installation:

```bash
cd server && npm install
cd ../client && npm install
```

### 2. Create the database

Create a PostgreSQL database named `habit_tracker` or change `DB_NAME` to match your database.

Example:

```bash
createdb habit_tracker
```

### 3. Initialize the schema

From the repo root:

```bash
cd server
node -e "require('./database/init').initDatabase().then(() => process.exit(0)).catch(() => process.exit(1))"
```

## Running The App

### Run client and server together

From the repo root:

```bash
npm run dev
```

This starts:
- Express server from `server/`
- Vite client from `client/`

### Run them separately

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd client
npm run dev
```

Default local URLs:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5600`

## Available Scripts

### Root
- `npm run dev` run server and client together
- `npm run server` run only the backend in dev mode
- `npm run client` run only the frontend in dev mode
- `npm run install-all` install root, server, and client dependencies

### Server
- `npm run dev` start backend with nodemon
- `npm run start` start backend with node

### Client
- `npm run dev` start Vite
- `npm run build` create production build
- `npm run preview` preview production build locally

## Frontend Notes

- API calls use a shared Axios instance with `baseURL: '/api'`
- auth state is handled through React context
- theme state is handled through React context
- the UI is designed to support both light and dark themes


## Reminder And Notification Behavior

The server starts the reminder service at boot. It is responsible for checking habits and creating reminder notifications for:

- scheduled habit times
- goal-window follow-ups
- milestone-related prompts


## Visual System

The current app uses:

- custom typography
- animated atmospheric backgrounds
- premium glass/tinted surfaces
- dark and light mode
- consistent plant visuals across selection, growth, garden, and arboretum

## Troubleshooting

### Frontend cannot reach the backend

Check:
- backend is running
- backend is on port `5600`
- `client/vite.config.js` still proxies `/api` to `5600`

### Database connection fails

Check:
- PostgreSQL is running
- `server/.env` values are correct
- the database exists
- the schema has been initialized

### Auth appears broken after changing backend settings

Clear local storage in the browser and sign in again if an old JWT is still present.

## Current Status

This repository contains the implemented UI and feature work for:

- redesigned landing page
- dark/light theme support
- editable habit registry
- plant unlocking and growth progression
- garden archive
- arboretum live model
- reminder-driven habit flow
- analytics and report visuals

## License

No license file is currently included in this repository.
