# RoutIQ Complete System Guidebook

**A full readable manual for understanding RoutIQ from product idea to feature behavior, visual language, database thinking, backend architecture, AI intelligence, archives, vines, plants, and growth mechanics.**

Prepared from the available RoutIQ workspace, the current Oracle implementation, and the existing RoutIQ system encyclopedia material on 2026-05-10.

> **Important correction:** RoutIQ is not a streak-based habit tracker. Streaks encourage competition, fragility, and all-or-nothing thinking. RoutIQ uses **Growth Vines** instead. Vines do not reset to zero when a user misses a day. They recede. This preserves psychological equity: progress can shrink, but it is not erased.

> **Scope note:** The local folder contains the Oracle feature slice and an older RoutIQ guide artifact, not the entire app source tree. This guidebook explains the complete documented system and distinguishes confirmed implementation details from broader documented architecture where necessary. It avoids source-code dumps and focuses on how the system works.

---

## 1. What RoutIQ Is

RoutIQ is a full-stack habit growth system. It helps users create routines, log daily effort, visualize progress through plants and vines, understand patterns through archives, and receive personalized reflection through an AI companion called **The Oracle**.

The application is built against a simple but powerful belief: people do not grow through brittle streak counters. A normal streak tracker says that missing one day destroys the entire chain. RoutIQ rejects that. Instead, it treats habits like living vines. A missed day may cause the vine to recede, but the user's accumulated growth remains part of the system.

RoutIQ therefore sits between a habit tracker, a wellness journal, a visual garden, and an AI reflection companion. Its job is not only to answer "Did I complete this habit today?" Its deeper job is to answer:

- What kind of effort did I make today?
- What conditions helped or blocked me?
- How is this habit growing over time?
- What does my mood or stress reveal about my consistency?
- Which habits are stable, fragile, dormant, or close to blooming?
- What does my archive say about my behavior?
- What should I adjust next?

The visible system confirms a React frontend, a Node and Express backend, PostgreSQL data storage, authentication middleware, deterministic pattern detection, and Google Gemini integration for Oracle reflection. The documented system also includes Vite, JWT authentication, bcrypt password hashing, profile avatar storage, the Context API, archives, arboretum-style plant selection, memory ledgers, and deployment stability hooks.

---

## 2. The Core Philosophy

RoutIQ is designed around growth instead of punishment. It does not want the user to feel that one missed day means everything is lost. It also does not flatten human effort into a yes/no checkbox. The product assumes that habits are biological, emotional, and contextual systems.

A habit can be dormant. It can sprout through one tiny action. It can bud through meaningful partial effort. It can reach full bloom through complete execution. That four-state model gives RoutIQ more emotional accuracy than a traditional habit app.

The plant language is therefore structural, not decorative. Vines describe continuity. Plants describe habit identity. Growth stages describe accumulated effort. Milestones describe meaningful progress thresholds. The garden describes long-term achievement. Archives describe the mathematics of the user's history.

### RoutIQ's guiding principles

- Habits are living systems, not binary chores.
- Progress should recede before it resets.
- A missed day is information, not identity failure.
- Partial effort matters because it protects continuity.
- A micro-step can save the relationship between user and habit.
- Mood and stress are not side notes; they are behavioral data.
- Visual growth should make consistency feel alive.
- AI should interpret verified habit data, not invent generic advice.
- The product should help users redesign routines instead of shaming them.

---

## 3. RoutIQ Language and Terms

RoutIQ uses its own vocabulary because the product is trying to move away from harsh productivity language. Understanding these terms makes the whole system easier to understand.

| Term | Meaning | Why It Exists |
| --- | --- | --- |
| Growth Vine | The user's ongoing continuity with a habit. | Replaces streaks with a model that can recede instead of resetting. |
| Recession | A reduction in vine height or vitality after missed or dormant days. | Preserves past progress while showing that the habit needs attention. |
| Dormant | Completion level 0. The habit received no meaningful action for the day. | Names inactivity without calling it failure. |
| Sprouting | Completion level 1. A micro-step was done. | Rewards tiny action as identity-preserving progress. |
| Budding | Completion level 2. The user made substantial partial effort. | Recognizes meaningful effort even without full execution. |
| Full Bloom | Completion level 3. The full habit was completed. | Represents complete routine execution and strongest growth input. |
| Grace Period | A 3-day startup protection window for new habits. | Prevents brand-new habits from being penalized before rhythm forms. |
| Plant Type | The visual species assigned to a habit. | Gives each habit a symbolic identity. |
| Growth Stage | The numeric or visual level of a plant's current development. | Shows accumulated effort over time. |
| Milestone | A progress threshold that marks meaningful growth. | Creates long-term achievement moments. |
| Garden | The collection of completed or fully grown habit achievements. | Preserves history as a visible memory ledger. |
| Arboretum | The plant registry or selection system. | Organizes plant species and possible tier unlocks. |
| Archive | The historical analysis area. | Turns logs into retrospective visual mathematics. |
| Oracle | The AI reflection companion. | Explains patterns and gives personalized habit guidance. |
| Live Observation | A deterministic insight card. | Gives immediate interpretation before chat begins. |

---

## 4. The 0-3 Growth Metric

The 0-3 metric is one of the most important pieces of RoutIQ. It is the system's alternative to a checkbox. Instead of asking whether the user succeeded or failed, RoutIQ asks how much life the user gave the habit today.

| Level | RoutIQ Name | Behavioral Meaning | Visual Meaning | System Meaning |
| --- | --- | --- | --- | --- |
| 0 | Dormant State | No meaningful action was logged. | The vine recedes or plant receives no nourishment. | The database records absence or zero effort. |
| 1 | Sprouting | A minimum viable action was completed, such as one page, one pushup, or two minutes. | A small sprout of continuity remains alive. | The system recognizes identity-preserving contact with the habit. |
| 2 | Budding | A partial but meaningful version of the habit was completed. | The plant buds and the vine gains moderate vitality. | The log shows substantive effort above a micro-step. |
| 3 | Full Bloom | The complete intended habit was executed. | The plant receives full growth energy and may advance strongly. | The system records maximum daily growth input. |

This model makes RoutIQ more realistic. A user who studies for 10 minutes on an exhausted day did not do nothing. A user who completes half a workout still gave the habit real energy. A user who does the full routine deserves full bloom. The system can represent all three without forcing them into the same binary box.

### Why the 0-3 model matters

- It reduces shame by recognizing partial progress.
- It helps users keep momentum during difficult days.
- It creates better data for the Oracle.
- It allows archives to show intensity rather than simple presence or absence.
- It makes plant growth feel proportional to actual effort.
- It helps users design minimum versions of habits.

---

## 5. Vines, Not Streaks

This is the most important correction to the earlier guidebook: RoutIQ should not be described as a streak system.

Traditional streak systems are brittle. They create pressure by saying that the user's entire chain disappears after one missed day. That can motivate some users briefly, but it often turns habit tracking into competition, anxiety, or avoidance. Once the streak is broken, the user may feel there is no reason to continue.

RoutIQ uses **Growth Vines** instead.

A Growth Vine is a continuity model. It grows with repeated care. It strengthens when the user logs Sprouting, Budding, or Full Bloom activity. It recedes when the user leaves the habit Dormant. But it does not vanish. This means the user still sees that they have built something worth returning to.

| Traditional Streak | RoutIQ Growth Vine |
| --- | --- |
| Resets to zero after a miss. | Recedes after Dormant days. |
| Encourages competition and perfection. | Encourages recovery and care. |
| Makes missed days feel catastrophic. | Makes missed days visible but survivable. |
| Measures uninterrupted compliance. | Measures living continuity. |
| Often demotivates after failure. | Invites the user back into growth. |

Some backend fields and older labels may still use streak-like names such as consecutive days or Streak Champion. In the RoutIQ product language, these should be treated as legacy or internal continuity measures. User-facing language should say **vine**, **growth continuity**, **vine height**, **vine vitality**, or **growth momentum**, not streak.

---

## 6. The 3-Day Grace Period

RoutIQ includes a documented **3-day grace period** for new habits. This is also called a 3-day exemption hook in the older system material.

The purpose is simple: brand-new habits should not be punished before they have had time to form rhythm. A user may create a habit while still figuring out the right time, difficulty, and minimum action. Penalizing the vine immediately would make the system feel hostile.

During the grace period, a new habit is protected from normal validation penalties. The user can start experimenting with the routine without immediately seeing harsh recession. This matches RoutIQ's philosophy: the beginning of a habit is a planting phase, not a performance test.

### What the grace period does conceptually

- Gives a new habit time to settle.
- Prevents early Dormant days from feeling destructive.
- Encourages users to define realistic minimum actions.
- Helps the app distinguish setup friction from true inconsistency.
- Makes onboarding more forgiving.

### How it fits the plant metaphor

A newly planted seed is not judged like a mature vine. For the first few days, the system lets the user prepare the soil: finding the right time, testing effort level, and learning what blocks the habit. After the grace period, the vine enters normal growth and recession behavior.

---

## 7. Product Feature Breakdown

### 7.1 Account and Profile

The broader project material describes a user account system with usernames, emails, password hashes, avatars, and coaching persona settings. Authentication appears to be JWT-based, with bcrypt used for password security. The Oracle routes are protected by authentication middleware, which means private habit intelligence is only generated for the logged-in user.

Profiles may also include avatar storage. The older documentation mentions base64 avatar handling and expanded Express payload limits, allowing user images to be stored directly in PostgreSQL rather than in a separate file storage service.

### 7.2 Habit Registry

The habit registry is where the user creates and manages habits. A habit includes a name, description, active status, selected plant type, growth stage, current goal, current reward, habit time, specific timing, motivation, hindrance, total completions, and vine continuity data.

This registry is not just a task list. It is the user's behavioral greenhouse. Each habit becomes a living unit with its own plant identity, history, difficulty, and blockers.

### 7.3 Arboretum

The older project material refers to a **Registry & Arboretum**. This suggests that RoutIQ has or is designed to have a plant selection and unlock system. The Arboretum is where plant species are organized and where harder or rarer plant species can require previous milestone progress before selection.

The currently visible source confirms a default plant value of **fern** and a selected plant type field. The exact full plant catalog is not present in the local folder. Because of that, this guide should not invent a fake list of species. What can be said confidently is:

- Every habit can have a selected plant type.
- Fern is the documented/default fallback plant.
- Plant type is used by the Oracle and garden records.
- The broader system describes tier-unlocked plant species.
- Harder plant species may require milestone aggregates before initialization.
- Fully grown plants are stored in the garden collection.

### 7.4 Habit Logging

Daily logging is the core action loop. The user records whether the habit was Dormant, Sprouting, Budding, or Full Bloom. The user may also log mood, stress, and notes. The system prevents duplicate daily input through database uniqueness rules around habit and log date.

The log is not just a checkbox. It is a daily behavioral data point. Over time, these logs power archives, Oracle insight cards, mood distribution, stress correlation, day-of-week analysis, vine recession, and plant growth.

### 7.5 Atmosphere Hub

The older material describes an **Atmosphere Hub** as the visual primary control unit. This appears to be the main daily interaction space where users see active routines and perform real-time logging. Its job is to make today's habit state visible and actionable.

In product terms, the Atmosphere Hub likely answers:

- What habits are active today?
- Which vines need attention?
- Which habits are Dormant, Sprouting, Budding, or Full Bloom?
- Which logs have already been submitted today?
- Which plants are close to a milestone?
- Is the user's stress or mood changing the day's routine energy?

### 7.6 Plant Growth

Plant growth is driven by logged effort. The more consistently and more fully the user nourishes a habit, the more the habit's plant develops. A Dormant day gives no growth and may cause vine recession. Sprouting gives a small continuity input. Budding gives moderate growth. Full Bloom gives the strongest growth input.

The visible Oracle service uses a growth target of 12 stages when determining whether a plant is close to blooming. A habit between 70% and 100% growth can trigger an Almost Bloomed insight card. That card tells the user the plant is close to completion and encourages a few more consistent days.

### 7.7 Milestones

Milestones mark meaningful growth thresholds. When a habit reaches milestone progress, the system can update the habit's milestone count and may create a garden record. Milestones turn routine work into achievement moments.

Milestones are important because they make growth durable. Even if a vine later recedes, the user can still see what they previously cultivated. This protects long-term motivation.

### 7.8 Garden and Memory Ledgers

The garden is a read-only or mostly historical collection of fully grown plants and completed milestones. The older documentation calls it **Garden / Memory Ledgers**, which is a strong description. It is not only a trophy shelf. It is a memory layer for the user's completed growth cycles.

Each garden plant can store plant type, habit name that produced it, milestone number, date grown, and user ownership. The Oracle reads this collection so it can understand the user's lifetime growth, not only their current active habits.

### 7.9 Archives

The Archives section is where RoutIQ becomes analytical. The older system material describes Archives as **Visual Mathematics**, meaning it converts raw logs into charts, correlations, and historical pattern views.

| Archive Visualization | Metric Shown | What It Helps the User Understand |
| --- | --- | --- |
| Completion Intensity Calendar | Dormant, Sprouting, Budding, Full Bloom by date. | Which days had no action, tiny action, partial action, or full execution. |
| Vine Height Timeline | Growth vine level over time. | Whether continuity is growing, stabilizing, or receding. |
| Plant Growth Timeline | Growth stage changes for each habit. | How close a habit is to the next milestone or full bloom. |
| Mood Distribution Chart | Counts of moods across recent logs. | Which emotional states dominate habit days. |
| Stress Trend Chart | Stress levels over time. | Whether the user's routine is becoming overloaded. |
| Stress vs Completion Correlation | Completion rate under low, medium, and high stress. | Whether stress is a major reason habits slip. |
| Day-of-Week Heatmap | Completion intensity grouped by weekday. | Which days are naturally strong or weak. |
| Habit Consistency Matrix | Per-habit activity across dates. | Which habits are stable, fragile, or dormant. |
| Milestone Ledger | Milestones achieved over time. | What long-term progress has already been earned. |
| Garden History | Fully grown plants and their source habits. | Which routines produced lasting achievements. |
| Notes Reflection View | Written log notes by date or habit. | Qualitative reasons behind pattern changes. |
| Recovery View | Activity after Dormant periods. | How quickly users return after vine recession. |

The Archives should be the place where the user sees evidence. The Oracle then becomes the companion that interprets that evidence conversationally.

### 7.10 The Oracle

The Oracle is RoutIQ's AI reflection companion. It has two visible surfaces: live observation cards and chat. Observation cards are deterministic. Chat responses are generated by Gemini after the backend builds a detailed context summary.

The Oracle is not meant to be a generic productivity assistant. It should speak from the user's own habit names, vine continuity, plant growth, mood patterns, stress levels, motivations, hindrances, and garden history.

---

## 8. Plant System and Growth Mechanics

The plant system is RoutIQ's emotional interface for habit progress. It turns invisible discipline into visible life.

### 8.1 Plant Assignment

When a habit is created, it receives a selected plant type. The local source confirms a default of **fern**. The broader system references plant species selection through the Arboretum, including the idea that some plant species may be harder to unlock and require milestone history.

Because the full plant catalog is not present in the local workspace, the exact list of available plant names cannot be verified here. The correct manual language is therefore:

- Confirmed default plant: fern.
- Confirmed database concept: selected plant type.
- Confirmed garden concept: stored plant type for grown plants.
- Documented feature concept: Arboretum with tier-unlocked plant species.
- Not locally visible: complete plant catalog and species artwork list.

### 8.2 How Plants Grow

Plants grow from habit logs. Each daily log contributes growth energy depending on the 0-3 state.

| Daily State | Growth Contribution | Visual Interpretation |
| --- | --- | --- |
| Dormant | None, and vine may recede. | The plant receives no care today. |
| Sprouting | Small growth preservation. | The habit remains alive through micro-action. |
| Budding | Moderate growth. | The habit is being actively developed. |
| Full Bloom | Strong growth. | The habit receives full execution energy. |

### 8.3 Growth Stages

Growth stages are numeric or visual checkpoints inside a plant's lifecycle. The Oracle currently treats 12 as a full growth target for milestone proximity. A plant at roughly 70% to 99% progress is considered close enough to trigger an Almost Bloomed insight.

Growth stages help the app answer:

- Is this habit still young?
- Is it actively developing?
- Is it close to blooming?
- Has it reached a milestone?
- Should the user be encouraged to finish the current growth cycle?

### 8.4 What Milestones Do

Milestones are the bridge between daily logging and long-term reward. When a plant reaches an important growth point, the milestone count can increase. When a plant fully grows, the achievement can be copied into the garden collection.

Milestones can increase the habit's milestone count, unlock harder or rarer plant species in the Arboretum, add a grown plant to the garden ledger, increase lifetime plants grown on the user profile, give the Oracle a positive historical achievement to reference, and create a reason for the user to keep going beyond daily check-ins.

### 8.5 Fully Grown Plants

A fully grown plant represents a completed growth cycle. It is not the same as a one-day success. It is evidence that the user repeatedly nourished a habit over time.

Fully grown plants matter because they remain visible even if active habit vines later recede. They are accumulated proof. In RoutIQ terms, the user does not lose the forest just because one vine needs care.

---

## 9. Oracle Intelligence Layer

The Oracle has two intelligence modes: deterministic observation and generative reflection.

### 9.1 Deterministic Observations

Live observations are insight cards created by backend rules. They should use RoutIQ language. For example, older card names like Streak Champion should be revised into names such as **Strongest Vine**, **Most Nourished Vine**, or **Growth Momentum**.

| Current or Documented Signal | RoutIQ-Friendly Card Name | Meaning |
| --- | --- | --- |
| High consecutive continuity | Strongest Vine | A habit has received repeated care recently. |
| High recent stress | Burnout Signal | The user's stress load may be threatening habit growth. |
| Completion lower under stress | Stress-Performance Pattern | Habits weaken when stress rises. |
| Best weekday | Peak Growth Day | A weekday where habits tend to bloom. |
| Worst weekday | Recession-Prone Day | A weekday where habits often go Dormant or underfed. |
| Inconsistent habit flag | Vine Needs Care | A habit's continuity is fragile. |
| Dominant mood | Emotional Landscape | A recurring emotional state surrounds recent logs. |
| Near full growth | Almost Bloomed | A plant is close to a milestone or full growth. |
| No active habits | Plant Your First Seed | The user should begin with one easy habit. |
| New user | Early Roots | The user is still in the protected startup phase. |

### 9.2 Oracle Context

Before Gemini responds, RoutIQ builds a context summary containing username and member age, lifetime plants grown, garden collection size, active habits, paused habits, vine continuity indicators, total completions, 14-day completion rates, growth stages, milestones, plant type, inconsistency flags, current goals, habit timing, motivations, hindrances, mood distribution, average stress, day-of-week performance, stress-completion correlation, and garden history.

This context gives Gemini the facts it needs. The model should not guess habit details. It should speak from the user's data.

### 9.3 Oracle Personality

The Oracle should be warm, perceptive, gently challenging, and botanical without being cheesy. It should not use emojis. It should ask reflective questions. It should avoid generic advice. It should never invent data.

The Oracle's best answers sound like:

- Your vine for reading is still alive because you kept Sprouting on difficult days.
- The pattern is not laziness; your high-stress logs show lower habit energy.
- This habit may need a smaller Dormant-day recovery version.
- Your garden already shows you can finish growth cycles. What made those plants easier to nourish?

### 9.4 Oracle Memory and RAG Concept

The older documentation references Oracle memories and a RAG-style pipeline. The visible current code uses SQL retrieval and prompt grounding rather than a full vector memory system. The documented long-term concept includes storing memories or embeddings tied to a user.

A complete Oracle memory system could store important user reflections, repeated blockers, successful habit redesigns, motivational phrases the user wrote, summaries of prior Oracle conversations, and long-term emotional patterns.

If implemented, this memory layer should be transparent and editable so the user can trust what the Oracle remembers.

---

## 10. Archives and Visual Mathematics

Archives deserve a full breakdown because they are where the database becomes visible intelligence.

### 10.1 Purpose of Archives

The Archives section is not just storage. It is a retrospective analysis tool. It should answer questions like which habits are growing steadily, which vines often recede, which days are strongest, which stress levels damage consistency, which moods appear around Dormant days, which plants have reached milestones, and how often the user recovers after recession.

### 10.2 Archive Metrics

| Metric | Source Data | Meaning |
| --- | --- | --- |
| Completion State | Habit log percentage or level. | Dormant, Sprouting, Budding, or Full Bloom for a day. |
| Vine Height | Derived from continuity and recession rules. | Current living momentum of a habit. |
| Growth Stage | Habit growth stage. | Plant development progress. |
| Milestones Achieved | Habit milestone count. | Number of meaningful thresholds reached. |
| Total Completions | Habit completion count. | Lifetime activity volume. |
| Mood Frequency | Mood values from logs. | Emotional distribution around habits. |
| Average Stress | Stress level values from logs. | Overall pressure around routines. |
| Stress Bucket Rate | Completion under low, medium, high stress. | How stress changes habit success. |
| Day-of-Week Rate | Log date grouped by weekday. | Timing strengths and weak points. |
| Dormant Frequency | Count of level 0 days. | How often a habit receives no care. |
| Sprouting Frequency | Count of level 1 days. | How often micro-actions preserve continuity. |
| Budding Frequency | Count of level 2 days. | How often partial effort happens. |
| Full Bloom Frequency | Count of level 3 days. | How often complete execution happens. |

### 10.3 Archive Visualizations

| Visualization | What It Shows | How To Read It |
| --- | --- | --- |
| State Calendar | Daily Dormant/Sprouting/Budding/Full Bloom states. | Look for clusters of Dormant or Full Bloom days. |
| Vine Recession Chart | Vine level over time. | Drops show recession; climbs show renewed care. |
| Growth Stage Bar | Current plant stage toward full bloom. | Shows how close a habit is to milestone growth. |
| Mood Ring / Mood Bars | Most frequent moods across logs. | Reveals emotional climate around routines. |
| Stress Line | Stress values over time. | Rising stress may explain weaker habit energy. |
| Stress Completion Buckets | Completion rates under low, medium, high stress. | Shows whether stress is the main blocker. |
| Weekday Heatmap | Activity grouped by weekday. | Identifies Peak Growth Days and Recession-Prone Days. |
| Habit Matrix | Habits as rows and days as columns. | Shows which habits are stable or fragile. |
| Garden Ledger | Fully grown plants by date and habit. | Shows completed growth cycles. |
| Milestone Timeline | Milestone achievements over time. | Shows long-term progress rhythm. |
| Recovery Curve | Days needed to return after Dormant periods. | Shows resilience after vine recession. |

### 10.4 Archive Interpretation Examples

If the State Calendar shows many Sprouting days, the user may be under load but still protecting identity. The Oracle should praise continuity while asking whether the full habit is too large.

If the Stress Completion Buckets show that high stress reduces Full Bloom days, the user may need a stress-adjusted version of the habit.

If the Weekday Heatmap shows repeated Dormant Sundays, the user may need a rest-day design rather than treating Sunday as failure.

If the Recovery Curve improves over time, the user is becoming more resilient even if Dormant days still happen.

---

## 11. Database Model

RoutIQ's database is not just storage. It is the foundation of the product's intelligence.

| Entity | Purpose | Important Concepts |
| --- | --- | --- |
| Users | Own accounts and lifetime growth. | Username, email, password hash, avatar, coaching persona, plants grown, creation date. |
| Habits | Store active and paused routines. | Name, user, plant type, growth stage, active status, goals, rewards, motivation, hindrance, vine indicators. |
| Habit Logs | Store daily behavior. | Habit, user, date, 0-3 state, mood, stress, notes. |
| Garden Plants | Store grown milestone achievements. | Plant type, habit name, milestone number, grown date. |
| Mood Entries | Store mood history in broader documented model. | Date, score, note, user. |
| Oracle Memories | Store long-term AI memory in documented model. | User, content, embedding or vector-like representation. |

### Relational Flow

~~~text
User
  owns Habits
  records Habit Logs
  grows Garden Plants
  may have Mood Entries
  may have Oracle Memories

Habit
  belongs to User
  has many Habit Logs
  has growth stages and milestones
  can produce Garden Plants

Habit Log
  belongs to User and Habit
  records daily state, stress, mood, notes
~~~

The value of PostgreSQL here is relational integrity. Habit logs must belong to real habits. Habits must belong to real users. Garden plants must connect back to user history. This structure lets the Oracle trust the data it receives.

---

## 12. Frontend System

The documented frontend stack is React with Vite. The visible Oracle page uses React hooks, a custom API client, an AuthContext, Lucide icons, and a dedicated CSS file.

| Module | Role |
| --- | --- |
| AuthContext | Holds logged-in user state and likely hydrates auth on reload. |
| API Client | Sends requests to backend routes with auth handling. |
| Atmosphere Hub | Main daily visual control area for logging and active habits. |
| Registry & Arboretum | Habit setup, scheduling, plant selection, and unlock logic. |
| Garden / Memory Ledgers | Historical plant achievements and completed routines. |
| Archives | Visual analytics for logs, stress, mood, and completion intensity. |
| Oracle Page | Live observations and AI chat reflection. |

RoutIQ uses botanical styling: forest greens, soft panels, plant icons, calm typography, dark and light themes, and progress visuals. The design should feel reflective and alive, not competitive or gamified in a harsh way.

---

## 13. Backend System

The backend is a RESTful Express server running on Node. It uses a PostgreSQL connection pool and authentication middleware. The broader documentation describes JWT token verification, bcrypt password hashing, payload expansion for base64 avatars, and self-healing database hooks for serverless environments.

Backend responsibilities include verifying authentication, protecting private habit data, validating request bodies, querying PostgreSQL safely, preventing duplicate daily logs through database uniqueness, computing archive and Oracle metrics, generating deterministic insight cards, building Gemini prompt context, returning friendly fallback messages when AI fails, supporting profile updates and avatar payloads, and maintaining schema compatibility during deployment cold starts.

---

## 14. Technology Stack and Skills

| Area | Technology / Skill | What It Demonstrates |
| --- | --- | --- |
| Frontend | React | Component-driven UI and stateful interaction. |
| Build Tooling | Vite | Fast local development and hot module replacement. |
| State | React Context API | Global auth/user state without heavy external state libraries. |
| Styling | CSS variables | Scalable theme system and dark/light mode design. |
| Icons | Lucide React | Consistent visual communication. |
| Backend | Node and Express | REST API design and middleware flow. |
| Database | PostgreSQL | Relational modeling, constraints, and query logic. |
| Auth | JWT | Token-based session verification. |
| Passwords | Bcrypt | Secure password hashing. |
| AI | Gemini | Grounded natural-language reflection. |
| Analytics | Deterministic rules | Reliable non-AI pattern detection. |
| Deployment | Serverless-aware hooks | Cold-start schema checks and environment-based config. |
| Product Design | Behavioral UX | Designing for growth, recovery, and self-awareness. |

---

## 15. End-to-End User Journey

~~~text
1. User creates an account.
2. User creates a habit in the Registry.
3. User selects or receives a plant type, defaulting to fern if none is chosen.
4. Habit enters a 3-day grace period.
5. User logs daily state: Dormant, Sprouting, Budding, or Full Bloom.
6. Logs update vine vitality and plant growth.
7. Milestones are achieved as growth accumulates.
8. Fully grown plants move into the Garden / Memory Ledger.
9. Archives visualize completion state, vines, stress, mood, and growth history.
10. Oracle reads the user's data and creates live observations.
11. User chats with Oracle for reflection and habit redesign.
~~~

This loop makes RoutIQ more than a tracker. It is a cycle of action, visualization, interpretation, and redesign.

---

## 16. Recommended Corrections to Existing Labels

Because the visible code still includes some streak-oriented naming, a cleanup pass should align the implementation with RoutIQ philosophy.

| Existing or Legacy Label | Better RoutIQ Label |
| --- | --- |
| Streak | Growth Vine |
| Streak Champion | Strongest Vine |
| Consecutive days | Vine continuity days or recent care continuity |
| Completion percentage | Growth state or completion level |
| Worst day | Recession-prone day |
| Best day | Peak growth day |
| Inconsistent habit | Vine needing care |
| Full completion | Full Bloom |
| Partial completion | Budding |
| Micro-step | Sprouting |
| Missed day | Dormant day |

This is not just cosmetic. Language affects how the user interprets themselves. RoutIQ should not accidentally import the psychology of streak apps through labels.

---

## 17. Security, Privacy, and Trust

RoutIQ stores sensitive behavioral data. Habit names, stress, mood, motivations, hindrances, notes, and AI conversation history may reveal personal information.

Good existing directions include authenticated Oracle routes, server-side user identity selection, parameterized SQL queries, bcrypt password hashing in documented architecture, JWT verification in documented architecture, and AI context prepared by backend rather than direct database access.

Improvements needed include sanitizing AI-rendered text, limiting or summarizing chat history sent to Gemini, making AI data sharing clear to users, avoiding full habit-context logs in production, allowing deletion of Oracle memories if memory is implemented, and requiring explicit confirmation for any future AI-driven write action.

---

## 18. Deployment and Operations

The broader project documentation mentions serverless deployment issues. In serverless environments, backend functions may wake without a traditional long-running server boot sequence. RoutIQ therefore documents pool-level self-healing schema checks that add missing columns when the database connection initializes.

A complete deployment needs frontend hosting, backend hosting or serverless functions, PostgreSQL database, database URL environment variable, Gemini API key, JWT secret, CORS configuration, schema migrations or self-healing checks, seed data for demos, and error monitoring.

For a DBMS project, the most important operational requirement is reproducibility: the evaluator should be able to create the schema, run the app, log habits, view archives, grow plants, and test Oracle responses.

---

## 19. Current Workspace Limitations

The current local folder does not include the full source tree. Missing pieces include package manifests, server entry point, database initialization source, auth middleware implementation, API client, AuthContext source, global CSS variables, migrations, screenshots, tests, and non-Oracle pages.

The guidebook therefore treats the Oracle implementation as confirmed and the broader modules as documented from the existing system material. The next best documentation step would be to add the full source tree or screenshots of each app page, then update this guide with exact visual references.

---

## 20. Final Understanding

RoutIQ is a habit growth ecosystem. It replaces streaks with vines, checkboxes with growth states, failure with dormancy, and generic advice with data-grounded reflection.

The product loop is elegant: the user plants a habit, gives it daily care, watches the vine grow or recede, reaches milestones, stores fully grown plants in a garden, studies history in archives, and reflects with the Oracle.

The technical system supports that loop through React, Vite, Express, Node, PostgreSQL, JWT, bcrypt, deterministic analytics, and Gemini. The database gives structure to the user's behavior. The frontend makes growth visible. The backend protects the logic. The Oracle turns history into insight.

**RoutIQ is a behavioral growth system where habits become vines, effort becomes plant growth, archives become self-knowledge, and AI reflection helps the user redesign routines with compassion and precision.**
