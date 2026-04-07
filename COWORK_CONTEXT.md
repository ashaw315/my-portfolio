# COWORK CONTEXT — Adam Shaw Portfolio

This file is the single source of truth for populating the portfolio
repository with real content. Read this entire file before starting
any task.

---

## IDENTITY

Name: Adam Shaw
Role: Full-Stack Engineer & Artist
Location: Brooklyn, NY
Email: ashaw315@gmail.com
GitHub: https://github.com/ashaw315
LinkedIn: https://www.linkedin.com/in/adam-shaw-studio/
Art Portfolio: https://adamshaw.studio

Bio (use this verbatim on the About page and Hero):
Adam Shaw is a full-stack engineer and artist based in Brooklyn.
He builds web applications with a focus on thoughtful design and
solid architecture, and comes from a Fine Arts background that
shapes how he thinks about interfaces, systems, and the details
that make software feel considered.

Short bio (use for meta tags and Nav tooltip if applicable):
Full-stack engineer and artist based in Brooklyn.

---

## TECH STACK (for About page)

Languages & Frameworks:
Ruby on Rails, React, Next.js, TypeScript, JavaScript, Python

Databases & Storage:
PostgreSQL, MongoDB, Supabase, Cloudflare R2

Infrastructure & Tools:
Vercel, Render, Docker, GitHub Actions

Currently exploring:
AI-assisted development, generative systems, agentic workflows

---

## FRONTMATTER SCHEMA

Every MDX file must include these fields:

title: string
tagline: string
description: string (2-3 paragraphs, markdown supported)
architectureNote: string
stack: string[]
liveUrl: string
githubUrl: string
thumbnail: string (path relative to public/)
featured: boolean
section: "project" | "lab"
year: number
type: string
role: string

---

## PROJECTS

### 1. Finance Tracker

File: content/projects/finance-tracker.mdx
section: project
featured: true
year: 2024
type: Full-Stack Application
role: Design & Engineering

title: Finance Tracker
tagline: A personal finance dashboard that connects to real bank
accounts, syncs transactions locally, and visualizes spending patterns.
liveUrl: (not deployed — demo mode available via seed data)
githubUrl: https://github.com/ashaw315/finance-tracker
thumbnail: /images/projects/finance-tracker.svg
stack:

- Ruby on Rails 7
- React 18
- Redux Toolkit
- PostgreSQL
- Plaid API
- Chart.js
- JWT
- Active Record Encryption
- RSpec
- Jest

description: |
Finance Tracker connects to real bank accounts through Plaid,
pulling transaction data and surfacing spending patterns through
a clean dashboard. It supports multiple institutions, automatic
transaction categorization, subscription detection, and smart
tagging — built as a tool for understanding money without sending
your data to a third-party service.

The application is a Rails 7 API paired with a React 18 SPA.
Transactions sync through Plaid's cursor-based incremental
endpoint, meaning only new data is fetched on each refresh rather
than re-pulling the full history. All other reads serve from a
local PostgreSQL database, keeping the app fast and minimizing
Plaid API calls.

A demo mode is available via seed data — three accounts
(checking, savings, credit card), 90 days of transactions,
detected subscriptions, and tag rules — so the full application
can be explored without real bank credentials.

architectureNote: |
The security architecture was the most deliberate part of this
build. Plaid access tokens are encrypted at rest using Active
Record Encryption rather than stored as plaintext strings —
a four-step migration sequence handled re-encryption when the
tokens moved between models during a PlaidItem extraction.
Authentication uses JWT in HTTP-only signed cookies rather than
localStorage, which prevents XSS access to tokens entirely.
The Plaid API is only called during sync and token exchange —
all other reads serve from local Postgres. The combination means
the application handles real financial credentials without any
of them being accessible to client-side JavaScript.

---

### 2. Daily News Digest

File: content/projects/daily-news-digest.mdx
section: project
featured: true
year: 2025
type: Automation System
role: Design & Engineering

title: Daily News Digest
tagline: A personalized news aggregation service that fetches,
summarizes, and delivers articles by email on your schedule.
liveUrl: (deployed on Render — fetch pipeline currently inactive)
githubUrl: https://github.com/ashaw315/daily_news_digest
thumbnail: /images/projects/daily-news-digest.svg
stack:

- Ruby on Rails
- Supabase
- PostgreSQL
- AI Summarization
- Docker
- Render

description: |
Daily News Digest aggregates articles from sources you choose,
generates AI summaries, and delivers them to your inbox on a
daily or weekly schedule. Users subscribe to news sources by
topic, set delivery preferences, and receive a curated digest
without visiting any news sites directly.

The backend is a Rails application with a cron-driven pipeline:
articles are fetched each morning, summarized, and queued for
delivery. An admin interface manages sources, users, and
scheduling. Supabase provides the database with Row Level Security
enforced across all user-facing tables at the database layer,
not just in application code.

The stack was deliberately simplified over time — Sidekiq was
removed in favor of an async adapter after it proved unnecessary
for the load, and SendGrid was swapped for Gmail SMTP to reduce
external dependencies. The result is a system with fewer moving
parts and easier deployment.

architectureNote: |
The fetch pipeline only pulls articles from sources that have at
least one active subscriber — a single query filters NewsSource
records by subscriber count before any API calls are made. This
prevents unnecessary requests to sources nobody is reading and
keeps the daily job fast regardless of how many sources are
registered in the system. A complementary mechanism locks each
cron task using Rails.cache with a 30-minute TTL and an
ensure-based release — preventing duplicate concurrent runs
without a separate queue system. Both decisions came from the
same constraint: keep the infrastructure minimal while making
the automated behavior correct.

---

### 3. Draw Together

File: content/projects/draw-together.mdx
section: project
featured: true
year: 2023
type: Real-Time Collaboration Tool
role: Design & Engineering

title: Draw Together
tagline: A real-time collaborative drawing canvas where multiple
users draw on the same surface simultaneously.
liveUrl: https://draw-together-app.vercel.app
githubUrl: https://github.com/ashaw315/draw-together-app
thumbnail: /images/projects/draw-together.svg
stack:

- Next.js
- TypeScript
- Socket.IO
- MongoDB
- GridFS
- SCSS
- Vercel

description: |
Draw Together is a shared canvas where multiple users can draw
simultaneously — lines appear on everyone's screen in real time
as they're made. Sessions are ephemeral by default, with the
option to save and share the resulting image.

The frontend is a Next.js application with a Canvas API drawing
layer. A separate Node.js Socket.IO server handles real-time
event broadcasting, running as its own process independently
of the Next.js deployment. MongoDB with GridFS handles binary
image storage, chosen for its ability to stream large files
without loading them fully into memory.

The project started with Pusher for managed WebSocket
infrastructure, then migrated to a self-hosted Socket.IO server
— trading operational simplicity for control over the connection
lifecycle and eliminating per-connection costs.

architectureNote: |
Canvas state is kept consistent across clients by broadcasting
stroke events rather than canvas snapshots. Each draw action
emits a small event object (coordinates, color, brush size) that
remote clients replay locally — keeping payloads small regardless
of canvas size or session length. A five-point anti-aliasing
technique smooths lines between broadcast intervals, and
coordinate normalization ensures strokes land correctly across
different screen sizes and device pixel ratios. Undo is
intentionally local-only — undoing a remote user's stroke would
be disruptive in a shared session, so each client manages its
own history independently.

---

### 4. Photo a Day

File: content/projects/photo-a-day.mdx
section: project
featured: true
year: 2026
type: Personal Automation
role: Design & Engineering

title: Photo a Day
tagline: A personal daily photo journal that automates everything
except taking the picture.
liveUrl: https://photo-a-day-smoky.vercel.app
githubUrl: https://github.com/ashaw315/photo-a-day
thumbnail: /images/projects/photo-a-day.svg
stack:

- Next.js
- TypeScript
- Cloudflare R2
- PostgreSQL
- Claude API
- Vercel
- iOS Shortcuts

description: |
Photo a Day is a personal archive — one photo for every day,
displayed in a minimal gallery with an AI-generated caption for
each image. The entire system runs automatically once configured.
The only manual step is taking the photo.

Photos arrive through an iOS Shortcut set as a daily automation.
When it runs, it opens the camera or photo library, resizes the
image, and uploads it to the server via a single API call. The
backend stores the image in Cloudflare R2, generates a caption
by passing the photo to the Claude API, and writes the metadata
to Postgres — all in sequence before returning a response. The
frontend is a Next.js gallery with horizontal scroll on desktop
and vertical on mobile, a year filter, and a password-protected
admin panel.

The system has been running continuously with zero ongoing
maintenance — no dashboards to check, no jobs to monitor. It
either works or it doesn't, and it almost always works.

architectureNote: |
The most deliberate decision was the no-gap guarantee. If
midnight passes with no upload, a cron job pulls a random unused
photo from a pre-loaded fallback pool and posts it automatically
— so the gallery never has a missing day. The fallback pool
self-recycles when images are deleted through the admin panel,
and the cron job uses explicit transaction isolation to prevent
race conditions between concurrent runs. Images are written to
R2 before Postgres — if the database write fails, the image can
be recovered; if R2 fails, there's nothing to save a record for.
The write ordering reflects the actual dependency between the
two stores.

---

### 5. We Were Here Briefly

File: content/projects/we-were-here-briefly.mdx
section: lab
featured: false
year: 2026
type: Generative System / Conceptual Art
role: Concept & Engineering

title: We Were Here Briefly
tagline: An automated system that scrapes the internet for human
residue and turns it into video, daily, without anyone watching.
liveUrl: https://we-were-here-briefly.vercel.app
githubUrl: https://github.com/ashaw315/we-were-here-briefly
thumbnail: /images/projects/we-were-here-briefly.svg
stack:

- Python
- Playwright
- Datamosh
- PostgreSQL
- Vercel

description: |
The internet produces residue. Not content — residue. Fragments
that accumulate in image search results, forum archives, metadata
fields, alt text nobody wrote carefully. We Were Here Briefly
collects this material daily, without intention, without curation,
without a human deciding what counts.

An automated pipeline scrapes the web using a seed word list that
mixes the mundane with the institutional. The day's fragments are
condensed into a single sentence using one of five constrained
personas, each with explicit anti-instructions: no metaphors about
the ocean, no metaphors about stars or time. The sentence becomes
a video. The videos datamosh together — not as an effect, but as
a process of erasure and accumulation — into a continuous loop.
It accumulates whether or not anyone is present to receive it.

It runs. The archive grows.

architectureNote: |
The datamosh is not a filter. The pipeline reads raw MPEG-2
bytes, locates picture start codes at 0x00 0x00 0x01 0x00, checks
picture coding type bits, and rewrites I-frames as P-frames —
collapsing the distinctions between discrete moments into a single
smeared duration. This is the same operation the work performs
conceptually: making the boundaries between days harder to find.

The system never crashes on a missing service. Image scraping
falls through Bing → Wikimedia → Flickr. Storage falls through
Postgres → log.json. The frontend falls through API → direct URL.
Cascading fallback everywhere — not as resilience engineering,
but as a condition of the work. The archive continues regardless
of what fails. Something always gets through.

---

## DESIGN NOTES FOR COWORK

- Warm off-white background (#F7F5F2) — already in place
- Dark text (#1A1A1A), slate blue accent (#4A6FA5)
- Serif: Libre Baskerville, Sans: Source Sans 3, Mono: Geist Mono
- Minimal, no decoration, generous whitespace
- Lab section uses directory layout (not cards) — see design
  system already implemented
- Thumbnail images: replace SVG placeholders with real screenshots
  once available. For now leave SVG placeholders in place and note
  where real images should go.

---

## WHAT COWORK SHOULD NOT CHANGE

- Any component files in components/
- Any CSS variables or global styles
- The MDX rendering pipeline in lib/projects.ts beyond adding
  new fields
- Framer Motion animation configs
- next.config.js or tailwind.config.js
- Any files not explicitly mentioned in the task
