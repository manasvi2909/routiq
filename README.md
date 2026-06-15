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
        SERIAL id PK
        VARCHAR username "unique, not null"
        VARCHAR email "unique, not null"
        VARCHAR password_hash
        TIMESTAMP created_at
        TIME reminder_time
        BOOLEAN reminder_enabled
        INTEGER plants_fully_grown
        TEXT avatar "base64 custom profile image"
        VARCHAR coaching_personality "default: 'analytical'"
        INTEGER friction_threshold "default: 3"
    }
    HABITS {
        SERIAL id PK
        INTEGER user_id FK
        VARCHAR title
        VARCHAR description
        VARCHAR plant_type
        INTEGER current_stage
        TIMESTAMP created_at
    }
    LOGS {
        SERIAL id PK
        INTEGER habit_id FK
        DATE date "not null"
        INTEGER completion_status "0 to 3 completion scale"
        TIMESTAMP created_at
    }
    MOOD {
        SERIAL id PK
        INTEGER user_id FK
        DATE date "not null"
        INTEGER score "1 to 5 mood scale"
        TEXT note
        TIMESTAMP created_at
    }
    ORACLE_MEMORIES {
        SERIAL id PK
        INTEGER user_id FK
        TEXT content "semantic reflections"
        REAL_array embedding "vector coordinates"
        VARCHAR category "memory type"
        TIMESTAMP created_at
    }

    USERS ||--o{ HABITS : "curates"
    USERS ||--o{ MOOD : "logs"
    USERS ||--o{ ORACLE_MEMORIES : "retains"
    HABITS ||--o{ LOGS : "documents"
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
