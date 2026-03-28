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

## Plant System

Routiq includes a progression-based plant system.

- `fern` is the base plant
- rarer plants unlock after enough fully grown plants are archived
- each plant has its own hidden growth target
- growth is displayed as 12 visible stages in the UI
- the rendered plant builds incrementally instead of showing the final silhouette from the beginning
- completing a plant triggers a celebration flow and allows the user to choose the next plant

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
