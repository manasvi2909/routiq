# RoutiQ

RoutiQ is a high-performance, enterprise-grade behavioral optimization platform constructed as a database-driven ecosystem for tracking personal habits, cognitive fluctuations, and biological reflections. 

Stepping away from generalized performance trackers, RoutiQ leverages complex botanical modeling logic, Pearson-correlation behavioral mathematics, and an AI-powered stateful reflection core to drive meaningful sustainable growth.

---

## 1. Product Capability Index

The platform delivers an integrated suite of architectural primitives designed to translate daily behavior into durable assets:

*   **Dynamic Habit Structures:** Establishes deep contextual anchors including sequential timing, internal motivations, high-friction deterrents, and specified goal windows.
*   **Botanical Progression Modeling:** Translates integer-bound dataset completions directly into visual specimen growth stages, supporting collectible asset archiving within the Arboretum.
*   **Integrated High-Density Analytics:** Executes frequency heatmapping and stress-to-performance correlation parsing at runtime for instantaneous behavioral pattern recognition.
*   **Omnichannel State Synchronization:** Delivers persistent automated dark-mode rendering and glass-morphism UI optimization across all client contexts.

---

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

### 2.2 Architectural Flow & Security Design

Communication cycles between the presentation layer and persisted databases utilize standardized JWT verification and asynchronous dispatch modeling.

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

## 3. Core Module Detail

### 3.1 The Oracle Companion Engine
The Oracle functions as a stateful, local reflection assistant initialized with custom psychology modules. It delivers real-time intervention tactics spanning custom inversion action plans, cue-anchoring tactics, and burnout prevention analytics.

| System Topic | Vector Directives | Operational Focus |
| :--- | :--- | :--- |
| Burnout Thresholds | stress, overwhelmed | Analyzes load variables to trigger recovery warnings. |
| Volatility Timing | peak, dip, window | Determines optimal throughput windows within the cycle. |
| Headspace Correlation | mood, emotion | Maps internal states against raw habit completions. |
| Loop Optimization | loop, craving, reward | Architecting sequential cues for friction minimization. |
| Friction Engineering | harder, easy | Adjusting variables to reduce starting resistance. |

### 3.2 Statistical Reporting Matrix
*   **Mastery Bloom:** An SVG functional render translating fractional consistency directly into radial floral path geometry.
*   **Stress Curve Overlay:** A dual-axis path overlaying average daily completions against internal reported stress integers.
*   **Qualitative Reflective Aggregation:** Extracts inline unstructured text inputs to feed the unified notes database view.

---

## 4. Developer Stack

### Presentation & Engine
*   React 18
*   Vite Compiler
*   Node.js runtime
*   Express API Controller
*   PostgreSQL
*   Axios Networking

### Utility & Security
*   Lucide vector engine
*   JSON Web Token Auth
*   BCrypt Salt Verification
*   Date-FNS chronological manipulation

---

## 5. Repository Topography

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

## 6. Installation Protocols

### Prerequisites
*   Node.js (18+)
*   PostgreSQL Database Cluster

### 1. Dependency Alignment
Retrieve standard binaries from the root node:
```bash
npm run install-all
```

### 2. Database Initialization
Execute external pool commands to initialize raw clusters:
```bash
createdb habit_tracker
```
Deploy standard database procedures from root:
```bash
cd server && node -e "require('./database/init').initDatabase().then(() => process.exit(0))"
```

### 3. Operational Execution
Initiate unified dual-threaded local clusters:
```bash
npm run dev
```
Default standard execution:
*   Client Endpoint: `http://localhost:3000`
*   API Controller: `http://localhost:5600`

---

## 7. Environment Variables Configuration

Manual environment configuration requires a `server/.env` declaration:

```env
DATABASE_URL=postgresql://[USER]:[PASS]@localhost:5432/habit_tracker
JWT_SECRET=[ENCRYPTED_KEY_HERE]
PORT=5600
```
