# Routiq Figma Brand Spec

## Purpose

This document translates the current Routiq brand and product UI into a Figma-ready file structure so a designer can build a clean source-of-truth design file without inventing naming, tokens, or component strategy.

Primary reference:
- [BRANDKIT.md](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/BRANDKIT.md)
- [BRANDBOOK.html](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/BRANDBOOK.html)

Implementation references:
- [client/src/index.css](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/src/index.css)
- [client/src/pages/Landing.css](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/src/pages/Landing.css)
- [client/src/components/Navbar.css](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/src/components/Navbar.css)
- [client/src/pages/Auth.css](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/src/pages/Auth.css)
- [client/src/pages/Dashboard.css](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/src/pages/Dashboard.css)
- [client/src/pages/Reports.css](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/client/src/pages/Reports.css)

## Recommended Figma File Name

`Routiq Brand System + Product UI`

## Recommended Page Structure

### 01 Cover
Use for:
- file title
- version
- owner
- quick brand statement

Suggested frames:
- `Cover / Brand Book`
- `Cover / Product System`

## 02 Brand Foundations

Suggested frames:
- `Brand / Overview`
- `Brand / Positioning`
- `Brand / Personality`
- `Brand / Voice`
- `Brand / Messaging`

Content to include:
- mission
- promise
- positioning statement
- tagline directions
- do / do not writing examples

## 03 Logo

Suggested frames:
- `Logo / Primary Lockup`
- `Logo / Mark Only`
- `Logo / Light Theme`
- `Logo / Dark Theme`
- `Logo / Clear Space`
- `Logo / Incorrect Usage`

Asset source:
- [logo.png](/Users/manasvisharma/Desktop/uni/sem-3 material/routiq-dbms-project/logo.png)

Rules:
- keep the logo compact relative to the wordmark
- tint mark to match brand text on light surfaces
- reverse to light text color in dark mode
- no stretch, outlines, or arbitrary recolors

## 04 Tokens

Break this page into sections for:
- color
- typography
- spacing
- radius
- shadow
- motion

### 04A Color Tokens

Create separate sections for:
- `Color / Light / Core`
- `Color / Light / Semantic`
- `Color / Dark / Core`
- `Color / Dark / Semantic`
- `Color / Surfaces`

Suggested variable names:
- `color.core.parchment`
- `color.core.mossGreen`
- `color.core.mossDeep`
- `color.core.rosyBloom`
- `color.core.midnightTeal`
- `color.core.forestDeep`
- `color.core.sunWash`
- `color.dark.base`
- `color.dark.field`
- `color.dark.accentGreen`
- `color.dark.accentCoral`
- `color.dark.mistBlue`
- `color.text.primary`
- `color.text.secondary`
- `color.text.muted`
- `color.text.accent`
- `color.border.default`
- `color.surface.panel`
- `color.surface.subtle`
- `color.surface.subtleStrong`
- `color.surface.chip`

Base values:
- `#f6efdc`
- `#6f8b63`
- `#124d39`
- `#d6876c`
- `#105666`
- `#0a3323`
- `#ffe6bb`
- `#0f1718`
- `#182427`
- `#7bc6ac`
- `#f2a089`
- `#7ca7b4`
- `#eef5ed`
- `#bfe7d8`

### 04B Typography Tokens

Create variables or styles for:
- `type.display.hero`
- `type.display.page`
- `type.display.section`
- `type.accent.label`
- `type.accent.nav`
- `type.body.lg`
- `type.body.md`
- `type.body.sm`

Font assignments:
- Display: `Fraunces`
- Accent: `Space Grotesk`
- Body: `Manrope`

### 04C Spacing Tokens

Recommended spacing scale:
- `space.4`
- `space.8`
- `space.12`
- `space.16`
- `space.20`
- `space.24`
- `space.32`
- `space.40`
- `space.48`
- `space.64`

### 04D Radius Tokens

Use:
- `radius.md = 20`
- `radius.lg = 28`
- `radius.xl = 40`
- `radius.full = 999`

These are close to the implemented visual system and will map cleanly to the coded feel.

### 04E Shadow Tokens

Create styles for:
- `shadow.soft`
- `shadow.strong`
- `shadow.button`
- `shadow.overlay`

### 04F Motion Tokens

Track these in documentation frames:
- interaction timing: `180ms-220ms`
- hover lift distance: `2-3px`
- ambient loops: slow, long, unobtrusive
- celebration motion: brief and isolated

## 05 Grid And Layout

Suggested frames:
- `Layout / Desktop Grid`
- `Layout / Tablet Grid`
- `Layout / Mobile Grid`
- `Layout / Content Width`
- `Layout / Spacing Rhythm`

Rules:
- main content width aligns to `1180px`
- use generous vertical spacing
- avoid cramped dashboard-density layouts
- prioritize editorial whitespace

## 06 Surfaces

Suggested frames:
- `Surface / Panel`
- `Surface / Subtle`
- `Surface / Chip`
- `Surface / Dark Panel`
- `Surface / Overlay`

Document:
- gradient stack
- blur amount
- border opacity
- shadow type

Routiq surfaces should look layered and tinted, never like plain flat white cards.

## 07 Components

This page should be divided into component sets.

### Navigation

Frames:
- `Component / Navbar / Desktop`
- `Component / Navbar / Mobile`
- `Component / Theme Toggle`
- `Component / Notification Bell`
- `Component / Live Clock`

Variants:
- light
- dark
- active link
- idle link

### Buttons

Frames:
- `Component / Button / Primary`
- `Component / Button / Secondary`
- `Component / Button / Circular Icon`
- `Component / Button / Pill`

States:
- default
- hover
- pressed
- disabled

### Cards

Frames:
- `Component / Card / Feature`
- `Component / Card / Habit`
- `Component / Card / Analytics`
- `Component / Card / Garden Archive`

### Inputs

Frames:
- `Component / Input / Text`
- `Component / Input / Textarea`
- `Component / Input / Select`
- `Component / Input / Time`
- `Component / Input / Validation`

### Modal

Frames:
- `Component / Modal / Standard`
- `Component / Modal / Milestone Celebration`
- `Component / Modal / Scrollable Form`

Required notes:
- modal content must scroll when long
- close controls must remain visible
- dark mode contrast must hold

### Plant Components

Frames:
- `Component / Plant / Fern`
- `Component / Plant / Lotus`
- `Component / Plant / Orchid`
- `Component / Plant / Bonsai`
- `Component / Plant / Moonvine`

For each plant include:
- seed stage
- early growth
- mid growth
- late growth
- full bloom

### Data Viz Components

Frames:
- `Component / Chart / Premium Card`
- `Component / Chart / Label Set`
- `Component / Chart / Legend`
- `Component / Chart / Dark Theme`
- `Component / Chart / Light Theme`

## 08 Marketing Screens

Suggested frames:
- `Marketing / Landing / Desktop`
- `Marketing / Landing / Tablet`
- `Marketing / Landing / Mobile`

Break landing into sections:
- nav
- hero
- philosophy
- features
- CTA
- footer

Document:
- background atmosphere layers
- ornamental graphics
- hero composition
- button group behavior

## 09 Product Screens

Suggested frames:
- `Product / Dashboard`
- `Product / Habits Registry`
- `Product / Add Habit`
- `Product / Log Habit`
- `Product / Reports`
- `Product / Garden`
- `Product / Settings`
- `Product / Auth / Login`
- `Product / Auth / Register`

Each screen should exist in:
- desktop
- mobile

For high-priority screens also include:
- dark mode
- critical interaction states

## 10 Charts And Data Storytelling

Suggested frames:
- `Charts / Palette`
- `Charts / Label Contrast`
- `Charts / Bloom Orb`
- `Charts / Progress Bars`
- `Charts / Comparison Blocks`

Rules:
- avoid raw Recharts defaults
- use atmospheric color combinations from the brand palette
- keep labels readable over both dark and light backgrounds
- use charts to support reflection, not just metrics dumping

## 11 Content And Copy

Suggested frames:
- `Copy / Tone`
- `Copy / UI Labels`
- `Copy / Empty States`
- `Copy / Notifications`
- `Copy / Celebration`

Examples to include:
- approved product naming
- approved CTA patterns
- do / avoid message pairs

## 12 Prototyping Rules

Suggested notes:
- hover lift for primary buttons
- gentle toggle movement for theme switch
- modal open with fade + slight rise
- ambient movement in hero only as presentation aid
- avoid over-animating standard app flows

## 13 Accessibility

Make a dedicated audit frame with:
- dark mode contrast checks
- accent text visibility checks
- button target sizes
- scrollable modal rule
- icon centering rule
- chart label contrast rule

## 14 Handoff

Suggested final page:
- `Handoff / Tokens`
- `Handoff / Components`
- `Handoff / Screens`
- `Handoff / Open Questions`

Document:
- what is production-ready
- what still requires illustration polish
- what is intentionally tokenized
- what should never be hardcoded

## Naming Conventions

Use consistent slash naming:
- `Component / Button / Primary / Hover`
- `Screen / Dashboard / Dark`
- `Plant / Fern / Stage 04`
- `Color / Light / Moss Deep`
- `Type / Display / Hero`

Avoid vague names like:
- `Card 1`
- `Green Button`
- `Final Final`
- `New Navbar`

## Auto Layout Guidance

Default Figma construction rules:
- use auto layout for nav bars, button groups, cards, and form sections
- use constraints for atmospheric backgrounds and large decorative layers
- keep spacing token-based
- build mobile from the same component logic, not from detached redraws

## Recommended Build Order

1. Cover
2. Brand foundations
3. Logo
4. Tokens
5. Grid and surfaces
6. Typography styles
7. Core components
8. Marketing screens
9. Product screens
10. Chart system
11. Plant library
12. Handoff page

## Minimum Viable Figma File

If time is limited, the essential pages are:
- `Brand Foundations`
- `Tokens`
- `Components`
- `Landing`
- `Dashboard`
- `Habits`
- `Reports`
- `Garden`

## Final Rule

The Figma file should preserve the same identity as the implemented site:
- editorial typography
- atmospheric depth
- premium glass surfaces
- botanical progression
- strong dark mode
- chart styling with character

If the Figma file starts looking generic, the system has drifted.
