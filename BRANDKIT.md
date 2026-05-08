# Routiq Brand Kit

## Brand Overview

### Brand Name
Routiq

### Brand Category
Habit tracking, ritual design, reflective productivity, visual wellness

### Brand Idea
Routiq turns consistency into something cultivated. It frames habits as living rituals instead of administrative chores, combining structure, reflection, atmosphere, and visible growth.

### Brand Promise
Help users build routines that feel intentional, emotionally aware, and visibly rewarding.

### Brand Positioning
Routiq sits between productivity tooling and emotional wellbeing. It is not a sterile tracker, a gamified toy, or a generic dashboard. It is a ritual-driven system with premium visual presence.

## Brand Essence

### Mission
To make habit building feel alive, elegant, and deeply personal.

### Vision
To create a digital sanctuary where routine, mood, and growth can coexist in one coherent visual language.

### Brand Personality
- Cultivated
- Reflective
- Premium
- Atmospheric
- Human
- Calm
- Intentional

### What Routiq Is
- Editorial
- Botanical
- Softly luxurious
- Structured without being clinical
- Data-aware without feeling corporate

### What Routiq Is Not
- Loud
- Cartoonish
- Hyper-gamified
- Tech-bro minimal
- Neon
- Corporate dashboard software

## Positioning Statement

For people who want more than a checklist, Routiq is a ritual-based habit system that transforms routine into a living visual experience through reflection, milestone design, reminders, growth, and atmosphere.

## Tagline Directions

Primary:
- Rituals that feel alive.

Secondary options:
- Grow what you repeat.
- Build rhythm. Watch it bloom.
- A cultivated system for everyday consistency.
- Habit tracking with atmosphere and pulse.

## Verbal Identity

### Voice
Routiq speaks with clarity, elegance, and warmth. It should feel designed, not over-written.

### Tone
- Calm, not passive
- Poetic, not vague
- Premium, not pretentious
- Encouraging, not childish
- Reflective, not sentimental

### Writing Guidelines
- Prefer ritual, growth, cadence, archive, bloom, garden, signal, and refinement over generic productivity jargon.
- Use short, high-signal sentences.
- Avoid cliché self-help language.
- Avoid excessive exclamation and emoji.
- Keep microcopy direct even when the surrounding brand language is expressive.

### UX Copy Examples
- Good: `Complete the milestone`
- Good: `Return to landing`
- Good: `Build your garden`
- Avoid: `Crush your goals!`
- Avoid: `You are unstoppable!`

## Visual Strategy

### Visual Direction
Routiq combines editorial typography, parchment-inspired surfaces, atmospheric gradients, botanical cues, and premium glass layers. It should feel like a cross between a design magazine, a field notebook, and a living dashboard.

### Core Principles
1. Atmosphere first.
2. Typography carries authority.
3. Surfaces should feel layered, not flat.
4. Motion should feel ambient, not gimmicky.
5. Data should feel composed, not mechanical.
6. Plants are identity-bearing, not decorative filler.

## Logo System

### Primary Mark
The Routiq logo mark is the standalone plant/monogram form stored at:
- [logo.png](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/logo.png)

### App Asset
The client-served version lives at:
- [client/public/logo.png](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/public/logo.png)

### Current Product Usage
The logo is integrated in:
- [client/src/pages/Landing.jsx](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/src/pages/Landing.jsx)
- [client/src/components/Navbar.jsx](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/src/components/Navbar.jsx)
- [client/src/pages/Login.jsx](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/src/pages/Login.jsx)
- [client/src/pages/Register.jsx](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/src/pages/Register.jsx)
- [client/index.html](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/index.html)

### Logo Behavior
- Use the logo as a clean, tinted mark instead of as a raw black PNG.
- Match the mark color to the Routiq wordmark on light surfaces.
- In dark mode, switch the mark to the light primary text color.
- Keep the logo compact relative to the wordmark.

### Logo Do
- Use consistent brand tinting.
- Pair with wordmark on key brand surfaces.
- Preserve clear space around the mark.

### Logo Don’t
- Stretch it
- Recolor arbitrarily
- Add outlines
- Use harsh drop shadows
- Place it larger than the wordmark in normal nav contexts

## Color System

The current design system is tokenized in:
- [client/src/index.css](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/src/index.css)

### Core Light Theme Palette
- Parchment Beige: `#f6efdc`
- Moss Green: `#6f8b63`
- Moss Deep: `#124d39`
- Rosy Bloom: `#d6876c`
- Midnight Teal: `#105666`
- Forest Deep: `#0a3323`
- Sun Wash: `#ffe6bb`

### Core Dark Theme Palette
- Base Background: `#0f1718`
- Deep Field: `#182427`
- Accent Green: `#7bc6ac`
- Accent Coral: `#f2a089`
- Accent Mist Blue: `#7ca7b4`
- Primary Text: `#eef5ed`
- Accent Text: `#bfe7d8`

### Semantic Tokens
- Primary text: `--color-text-primary`
- Secondary text: `--color-text-secondary`
- Muted text: `--color-text-muted`
- Accent text: `--color-accent-text`
- Border: `--color-border`
- Accent: `--color-accent`
- Accent light: `--color-accent-light`

### Surface Tokens
- Panel surface: `--surface-panel`
- Subtle surface: `--surface-subtle`
- Strong subtle surface: `--surface-subtle-strong`
- Chip surface: `--surface-chip`

### Color Usage Rules
- Use deep green as the primary brand anchor.
- Use rosy bloom as the warmth counterweight.
- Use teal and mist blue as supporting atmospheric hues.
- Keep accents selective; do not flood full layouts with high-saturation green.
- Dark mode should lift contrast rather than simply invert light mode.

## Typography

### Typefaces
- Display serif: `Fraunces`
- Accent sans: `Space Grotesk`
- Body sans: `Manrope`

### Roles
- `Fraunces` for hero titles, page titles, premium headings, and brand presence
- `Space Grotesk` for navigation, labels, pills, buttons, metadata, and chart annotations
- `Manrope` for body copy, descriptions, settings content, and form support text

### Typographic Principles
- Serif for emotion and authority
- Geometric sans for rhythm and contrast
- Humanist sans for readability

### Hierarchy Guidance
- Hero and page titles should feel decisive and spacious
- Labels should be uppercase or tracked when used as UI signals
- Body text should remain highly readable and not over-stylized

### Current Typography Tokens
- `--font-display`
- `--font-serif`
- `--font-accent`
- `--font-sans`

## Layout And Spatial System

### Layout Character
Layouts are composed, roomy, and layered. The system favors editorial spacing over dense app packing.

### Width System
- Standard content width: `min(1180px, 100%)`

### Radius System
- XL: `2.5rem`
- LG: `1.8rem`
- MD: `1.2rem`

### Spacing Guidance
- Prefer generous vertical rhythm
- Let hero, dashboard, and report sections breathe
- Use pills and chips to compress metadata, not full content blocks

## Surface Language

### Surface Style
Routiq surfaces are translucent, tinted, and layered rather than pure white or flat solid blocks.

### Rules
- Use glass/tinted cards over plain white rectangles
- Favor depth through blur, borders, and internal gradients
- Keep borders soft and atmospheric
- In dark mode, surfaces should remain readable and not collapse into flat charcoal

## Motion Language

### Motion Philosophy
Motion should make the product feel alive, not busy.

### Motion Types
- slow atmospheric drift
- gentle pulse
- floating seeds/motes
- subtle hover lift
- soft reveal transitions
- celebration moments for major progress events

### Timing Guidance
- Standard interaction: about `180ms` to `220ms`
- Ambient loops: long, calm, continuous
- Celebration motion: visible but short-lived

### Motion Don’ts
- no twitchy micro-animations everywhere
- no bouncy consumer-app motion
- no constant aggressive scaling

## Iconography

### Style
Icons should feel clean, centered, and secondary to typography.

### Guidelines
- Use simple line icons
- Keep circular icon buttons perfectly centered
- Avoid introducing decorative icons that fight the atmosphere
- For feature highlights, prefer ornaments and abstract marks over random literal icons when the aesthetic calls for it

## Illustration And Botanical Language

### Plant System Role
Plants are a core part of the product language, not an add-on.

### Rules
- Selected plant should match the living model and growth view
- Growth should reveal progressively
- Higher-tier plants should feel rarer and more elaborate
- Archives should feel like a curated botanical collection

### Species Tone
- Fern: foundational, calm, approachable
- Lotus: elevated, serene
- Orchid: expressive, refined
- Bonsai: disciplined, crafted
- Moonvine: rare, atmospheric, aspirational

## UI Component Language

### Navigation
The main navbar is a premium rounded shell with live clock, notification access, and directional naming:
- Atmosphere
- Registry
- Garden
- Archives
- Refinement

### Buttons
- Primary buttons use green gradients and soft depth
- Secondary buttons use translucent surfaces
- Buttons should feel tactile through shadow and slight lift, not through loud color changes

### Cards
- Use layered surfaces
- Use strong heading hierarchy
- Avoid pure white content boxes
- Use subtle internal gradients for richness

### Inputs
- Inputs should remain readable first
- Brand styling can be present, but utility takes priority
- Forms should keep clear labels, generous padding, and visible focus states

### Modals
- Must be scrollable when content is long
- Must preserve visibility in dark mode
- Should feel ceremonial for milestone and reward moments

### Notifications
- Notification placement should sit with the navbar control cluster
- Notification styling should read as part of the premium shell, not a detached widget

## Data Visualization

### Chart Philosophy
Charts should feel premium and composed, not like defaults dropped from a library.

### Chart Rules
- Use custom palette mapping from the brand tokens
- Keep backgrounds atmospheric and supportive
- Use labels that remain legible in both themes
- Avoid overly dense grid lines
- Use charts to tell a mood-and-rhythm story, not only raw counts

### Reporting Tone
Reports should feel like an archive or studio readout, not business intelligence software.

## UX Principles

### 1. Ritual Over Task
Every primary flow should reinforce that habits are intentional rituals, not generic entries.

### 2. Reflection With Momentum
Mood, reward, accountability, and progress should support action rather than interrupt it.

### 3. Progress Must Be Visible
Users should always understand:
- what they did
- what progressed
- what unlocked
- what happens next

### 4. Editing Must Be Safe
Users need to be able to change goals, rewards, reminder times, plant choices, and windows without feeling trapped by prior setup.

### 5. Dark Mode Must Be Fully Designed
Dark mode is not an afterthought. Contrast, accent color visibility, and panel readability are mandatory.

### 6. Celebration Must Be Earned
Milestone and plant-completion moments should feel rewarding and clear, not noisy.

## Information Architecture

### Main User Areas
- Landing: brand, promise, and conversion
- Dashboard: current state and live growth
- Registry: habits, editing, milestone flow
- Garden: archive and unlock progress
- Archives: reports and progress reading
- Refinement: settings and preference tuning

### Primary User Journey
1. Arrive on landing page
2. Sign up or log in
3. Create a ritual
4. Choose a plant
5. Set goal, reward, and window
6. Log daily progress
7. Complete milestone
8. Claim reward
9. Choose next plant if unlocked
10. Archive fully grown plants in the garden

## Accessibility Guidance

### Contrast
- Accent text must remain readable in dark mode
- Green text should never disappear against dark surfaces
- Light centers in charts require dark text, not pale text

### Usability
- Modals must scroll
- Circular buttons must center icons
- Interactive controls must have visible hover and focus states
- Dense information should be chunked into readable cards and sections

### Responsive Behavior
- Brand lockups should scale down gracefully
- Navigation should wrap cleanly
- Dashboard and registry cards should remain legible on mobile

## Theme System

### Implementation
Theme state is managed in:
- [client/src/contexts/ThemeContext.jsx](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/src/contexts/ThemeContext.jsx)

### Theme Toggle
The fixed toggle is implemented in:
- [client/src/components/ThemeToggle.css](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/src/components/ThemeToggle.css)

### Theme Rule
Light mode is warm, parchment-like, and editorial.
Dark mode is deep, misty, and luminous.

They should feel related, not mirrored.

## Product Naming System

Current UI naming patterns:
- Atmosphere
- Registry
- Garden
- Archives
- Refinement
- Living Model
- Longest Vine
- Sequences logged today

This naming system should remain consistent across future features.

## Brand Touchpoints

The Routiq brand should be visible in:
- landing nav
- authenticated navbar
- auth pages
- favicon/browser tab
- README and project documentation
- future presentation material

## Implementation Reference

Primary design-system sources:
- [client/src/index.css](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/src/index.css)
- [client/src/pages/Landing.css](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/src/pages/Landing.css)
- [client/src/components/Navbar.css](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/src/components/Navbar.css)
- [client/src/pages/Auth.css](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/src/pages/Auth.css)
- [client/src/pages/Dashboard.css](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/src/pages/Dashboard.css)
- [client/src/pages/Reports.css](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/src/pages/Reports.css)

## Future Brand Extensions

Recommended next assets if a full formal brand system is needed:
- SVG master logo set
- monochrome and reversed logo exports
- social avatar and app icon variants
- presentation cover template
- Figma brand foundations page
- component screenshot library
- chart palette spec sheet
- illustration rule sheet for future plants

## One-Line Brand Summary

Routiq is a premium ritual-tracking brand that makes personal growth feel cultivated, atmospheric, and visibly alive.
