# RoutiQ

RoutiQ is a habit and behavior tracking platform that helps users monitor habits, log moods, reflect on their progress, and identify behavioral patterns over time.

The project combines habit tracking, mood analysis, journaling, and AI-assisted reflections in a single application. It was built using React, Node.js, Express, PostgreSQL, and Google Gemini.

## My Contributions

This was a three-person group project focused on building a behavior-tracking platform backed by a PostgreSQL database.

My contributions to the project included:

* Designing the PostgreSQL database schema for users, habits, habit logs, mood entries, and reflection records.
* Creating relationships between tables using primary and foreign keys to maintain data consistency.
* Implementing database initialization and setup scripts for local deployment.
* Structuring the database to support habit tracking, mood logging, journaling, and progress analytics.
* Designing data models for user preferences, completion history, and reflection storage.
* Collaborating with the backend team to ensure the database supported API and application requirements.

---

# 1. Features

RoutiQ provides several tools to help users build and maintain positive habits:

* **Habit Tracking:** Create habits, track progress, and monitor completion history.
* **Growth Visualization:** Represent habit progress through plant-growth inspired visual stages.
* **Mood Tracking:** Log daily mood scores and notes to identify patterns over time.
* **Behavior Analytics:** Compare habits, mood trends, and activity data through visual reports.
* **AI Reflections:** Generate personalized reflections and suggestions using Google Gemini.

---

# 2. Technical Architecture

## 2. Technical Architecture

### 2.1 PostgreSQL Database Schema Specification

The underlying DBMS handles strict relational integrity, supporting cascaded operations and vectorized memory arrays.

```mermaid
erDiagram
    USERS {
        SERIAL id PK "auto-increment primary key"
        VARCHAR username "unique, not null, max 50"
        VARCHAR email "unique, not null, max 100"
        VARCHAR password_hash "not null, bcrypt hash, max 255"
        TIMESTAMP created_at "default: CURRENT_TIMESTAMP"
        TIME reminder_time "default: 09:00:00"
        BOOLEAN reminder_enabled "default: true"
        INTEGER plants_fully_grown "default: 0, denormalized counter"
        TEXT avatar "default: null, base64 profile image"
        VARCHAR coaching_personality "default: analytical, max 30"
        INTEGER friction_threshold "default: 3"
    }

    HABITS {
        SERIAL id PK "auto-increment primary key"
        INTEGER user_id FK "not null, references users(id) ON DELETE CASCADE"
        VARCHAR name "not null, max 100"
        TEXT description "nullable"
        TIMESTAMP created_at "default: CURRENT_TIMESTAMP"
        BOOLEAN is_active "default: true"
        TEXT when_specifically "reflection anchor: when to do it"
        TEXT what_motivating "reflection anchor: motivation"
        TEXT what_hindering "reflection anchor: obstacles"
        TEXT whom_tell "reflection anchor: accountability partner"
        TEXT who_inspires "reflection anchor: role model"
        TEXT milestones "reflection anchor: target milestones"
        TEXT treat_myself "reflection anchor: reward plan"
        INTEGER consecutive_days "default: 0, denormalized streak"
        INTEGER total_completions "default: 0, denormalized count"
        TIMESTAMP last_completed_at "nullable, denormalized"
        TIME habit_time "nullable, scheduled daily time"
        TEXT current_goal "nullable, active goal text"
        TEXT current_reward "nullable, active reward text"
        INTEGER goal_window_days "default: 1, range 1-30"
        TIMESTAMP current_goal_started_at "default: CURRENT_TIMESTAMP"
        TIMESTAMP current_goal_due_at "nullable, computed deadline"
        BOOLEAN current_goal_completed "default: false"
        TIMESTAMP goal_reminder_sent_at "nullable, prevents duplicate reminders"
        INTEGER milestones_achieved "default: 0"
        INTEGER fully_grown_count "default: 0, total plant cycles"
        INTEGER growth_stage "default: 0, current plant progress"
        VARCHAR selected_plant_type "default: fern, max 50"
        TIMESTAMP last_reward_claimed_at "nullable"
        BOOLEAN is_inconsistent "default: false, auto-flagged"
        TEXT continue_reason "nullable, user reflection on inconsistency"
        TEXT failure_analysis "nullable, user reflection on failure"
    }

    HABIT_LOGS {
        SERIAL id PK "auto-increment primary key"
        INTEGER habit_id FK "not null, references habits(id) ON DELETE CASCADE"
        INTEGER user_id FK "not null, references users(id) ON DELETE CASCADE"
        DATE log_date "not null, UNIQUE with habit_id"
        INTEGER completion_percentage "default: 0, CHECK 0-3"
        VARCHAR mood "nullable, max 50"
        INTEGER stress_level "nullable, CHECK 1-5"
        TEXT notes "nullable, daily reflection"
        TIMESTAMP created_at "default: CURRENT_TIMESTAMP"
    }

    MOOD_LOGS {
        SERIAL id PK "auto-increment primary key"
        INTEGER user_id FK "not null, references users(id) ON DELETE CASCADE"
        DATE log_date "not null, UNIQUE with user_id"
        VARCHAR mood "not null, max 50"
        INTEGER stress_level "nullable, CHECK 1-5"
        TEXT notes "nullable, mood reflection"
        TIMESTAMP created_at "default: CURRENT_TIMESTAMP"
    }

    WEEKLY_REPORTS {
        SERIAL id PK "auto-increment primary key"
        INTEGER user_id FK "not null, references users(id) ON DELETE CASCADE"
        DATE week_start_date "not null, UNIQUE with user_id"
        DATE week_end_date "not null"
        INTEGER total_habits "default: 0"
        INTEGER consistent_habits "default: 0"
        INTEGER inconsistent_habits "default: 0"
        INTEGER total_completions "default: 0"
        VARCHAR average_mood "nullable, max 50"
        DECIMAL average_stress "precision 3 scale 2"
        JSONB report_data "semi-structured analytics blob"
        TIMESTAMP created_at "default: CURRENT_TIMESTAMP"
    }

    SUB_TASKS {
        SERIAL id PK "auto-increment primary key"
        INTEGER habit_id FK "not null, references habits(id) ON DELETE CASCADE"
        VARCHAR name "not null, max 200"
        TEXT description "nullable"
        BOOLEAN is_completed "default: false"
        TIMESTAMP created_at "default: CURRENT_TIMESTAMP"
        TIMESTAMP completed_at "nullable, set on completion"
        INTEGER order_index "default: 0, user-defined sort"
    }

    NOTIFICATIONS {
        SERIAL id PK "auto-increment primary key"
        INTEGER user_id FK "not null, references users(id) ON DELETE CASCADE"
        INTEGER habit_id FK "nullable, references habits(id) ON DELETE CASCADE"
        TEXT message "not null"
        VARCHAR notification_type "default: reminder, max 50"
        BOOLEAN is_read "default: false"
        TIMESTAMP created_at "default: CURRENT_TIMESTAMP"
    }

    GARDEN_PLANTS {
        SERIAL id PK "auto-increment primary key"
        INTEGER user_id FK "not null, references users(id) ON DELETE CASCADE"
        INTEGER habit_id FK "nullable, references habits(id) ON DELETE SET NULL"
        VARCHAR habit_name "nullable, max 100, denormalized archive"
        VARCHAR plant_type "not null, max 50"
        INTEGER milestone_number "default: 0"
        TEXT reward_given "nullable, archived reward text"
        TIMESTAMP grown_at "default: CURRENT_TIMESTAMP"
        INTEGER growth_cycle_number "default: 1"
        INTEGER growth_stage_reached "default: 0"
    }

    ORACLE_MEMORIES {
        SERIAL id PK "auto-increment primary key"
        INTEGER user_id FK "nullable, references users(id) ON DELETE CASCADE"
        TEXT content "not null, semantic reflection text"
        REAL_ARRAY embedding "nullable, vector coordinates for cosine similarity"
        VARCHAR category "nullable, max 50, memory type tag"
        TIMESTAMP created_at "default: CURRENT_TIMESTAMP"
    }

    USERS ||--o{ HABITS : "curates"
    HABITS ||--o{ HABIT_LOGS : "documents"
    USERS ||--o{ HABIT_LOGS : "authors"
    USERS ||--o{ MOOD_LOGS : "logs"
    USERS ||--o{ WEEKLY_REPORTS : "generates"
    HABITS ||--o{ SUB_TASKS : "decomposes into"
    USERS ||--o{ NOTIFICATIONS : "receives"
    HABITS ||--o{ NOTIFICATIONS : "triggers"
    USERS ||--o{ GARDEN_PLANTS : "cultivates"
    HABITS ||--o{ GARDEN_PLANTS : "grows"
    USERS ||--o{ ORACLE_MEMORIES : "retains"

```


## 2.2 Application Flow

The application follows a standard client-server architecture:

* React frontend for user interaction
* Express backend for API handling
* JWT authentication for secure access
* PostgreSQL for data storage

```mermaid
sequenceDiagram
    autonumber
    actor Curator as User/Curator
    participant Client as React Client (Vite)
    participant Server as Express Server
    participant Auth as Auth Middleware
    participant DB as PostgreSQL Database

    Curator->>Client: Clicks "Save Profile" / Password Edit
    Client->>Server: PUT /api/auth/profile or /change-password
    activate Server
    Server->>Auth: Validate JWT Session Token
    activate Auth
    Auth->>DB: Fetch User details (id, username, email, avatar)
    DB-->>Auth: Hydrated User Object
    deactivate Auth
    Server->>DB: Execute secure SQL Update
    DB-->>Server: Returning updated records
    Server-->>Client: 200 OK (Instant state update)
    deactivate Server
    Client-->>Curator: Update UI elements (Navbar & Chat)
```

---

# 3. Core Modules

## 3.1 Oracle Reflection Engine

The Oracle module provides AI-assisted reflections based on user activity, mood history, and journaling data. It helps users identify patterns, maintain consistency, and reflect on long-term progress.

| System Topic          | Vector Directives     | Operational Focus                                        |
| :-------------------- | :-------------------- | :------------------------------------------------------- |
| Burnout Thresholds    | stress, overwhelmed   | Detects signs of overload and suggests recovery actions. |
| Volatility Timing     | peak, dip, window     | Identifies productive and low-energy periods.            |
| Headspace Correlation | mood, emotion         | Relates mood patterns to habit completion data.          |
| Loop Optimization     | loop, craving, reward | Helps improve consistency through behavioral cues.       |
| Friction Engineering  | harder, easy          | Suggests ways to reduce barriers to habit completion.    |

## 3.2 Analytics Dashboard

The platform includes visual reports that help users understand their progress:

* **Mastery Bloom:** Visual representation of consistency and habit growth.
* **Stress Curve Overlay:** Compares completion trends with self-reported stress levels.
* **Reflection Summary:** Aggregates journal and reflection entries for review.

---

# 4. Tech Stack

## Frontend

* React 18
* Vite
* Axios

## Backend

* Node.js
* Express.js

## Database

* PostgreSQL

## Authentication & Utilities

* JWT Authentication
* bcrypt
* date-fns
* Lucide Icons

---

# 5. Project Structure

```text
routiq-dbms-project/
├── client/
│   ├── src/
│   │   ├── components/  (Re-usable UI assets)
│   │   ├── pages/       (Dynamic container routes)
│   │   ├── services/    (API integration layer)
│   │   └── index.css    (Standard design tokens)
├── server/
│   ├── database/        (Persistence and schemas)
│   ├── middleware/      (Security & session hooks)
│   ├── routes/          (REST API declarations)
│   ├── services/        (Back-end computation engines)
│   └── index.js         (Server initialization)
└── package.json
```

---

# 6. Setup Instructions

> [!IMPORTANT]
> To reduce repository size, `node_modules` folders are not included. Install dependencies before running the project.

## Prerequisites

* Node.js (18+)
* PostgreSQL

### Install Dependencies

```bash
npm run install-all
```

### Create Database

```bash
createdb habit_tracker
```

### Initialize Database

```bash
cd server && node -e "require('./database/init').initDatabase().then(() => process.exit(0))"
```

### Run the Application

```bash
npm run dev
```

The application will be available at:

* Frontend: http://localhost:3000
* Backend API: http://localhost:5600

---

# 7. Environment Variables

Create a `.env` file inside the `server/` directory:

```env
DATABASE_URL=postgresql://[USER]:[PASS]@localhost:5432/habit_tracker

JWT_SECRET=[YOUR_JWT_SECRET_HERE]

PORT=5600

GEMINI_API_KEY=[YOUR_GEMINI_API_KEY_HERE]
```
