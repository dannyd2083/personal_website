# dannydeng.dev — Personal Portfolio

My personal website, live at **[dannydeng.dev](https://www.dannydeng.dev)**. Built with Next.js 15 (App Router), Tailwind CSS, and Framer Motion, deployed on Vercel. Beyond the usual portfolio sections, it has two full-stack features: a **live music stats page** backed by the Last.fm API with a Redis cache, and an **interactive photo map** with AI-powered semantic photo search (CLIP embeddings + pgvector).

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Design System](#design-system)
- [Home Page](#home-page)
- [Music Page](#music-page)
- [Photo Map](#photo-map)
- [Infrastructure & Deployment](#infrastructure--deployment)
- [Interesting Problems I Solved](#interesting-problems-i-solved)
- [Running Locally](#running-locally)
- [Project Structure](#project-structure)

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | Server components, API routes, file-based routing in one framework |
| Styling | Tailwind CSS | Custom clay-court design tokens, fast iteration |
| Animation | Framer Motion | Scroll-triggered reveals, card flips, layout transitions |
| Maps | Mapbox GL via `react-map-gl` | Free tier (50k loads/mo), custom markers, smooth pan/zoom |
| Image CDN | Cloudinary | URL-based transforms (crop/resize/format), auto-WebP, free 25GB |
| Database | Supabase (PostgreSQL + pgvector) | Relational data + vector similarity search in one free instance |
| AI / ML | CLIP via `@xenova/transformers` | 512-dim image & text embeddings, runs in Node — zero inference cost |
| Cache | Upstash Redis | Serverless Redis for caching Last.fm responses (1h TTL) |
| Music data | Last.fm API + iTunes Search API | Scrobble history + high-res album artwork |
| Hosting | Vercel | Zero-config deploys, serverless functions, cron jobs |

---

## Architecture Overview

```
                        ┌─────────────────────────────────────┐
                        │           Vercel (Next.js)          │
                        │                                     │
 Browser ──────────────▶│  Pages            API Routes        │
                        │  /        ────▶   /api/music/*      │──▶ Last.fm API
                        │  /music           /api/photo-map/*  │──▶ iTunes API
                        │  /photo-map       /api/cron/*       │
                        └──────┬──────────────────┬───────────┘
                               │                  │
                   ┌───────────▼────┐   ┌─────────▼──────────┐
                   │ Upstash Redis  │   │ Supabase Postgres  │
                   │ (music cache)  │   │ places/visits/     │
                   └────────────────┘   │ photos + pgvector  │
                                        └─────────┬──────────┘
                                                  │ photo URLs
                                        ┌─────────▼──────────┐
                                        │     Cloudinary     │
                                        │  (image hosting +  │
                                        │   transformations) │
                                        └────────────────────┘
```

Two Vercel cron jobs run daily: one refreshes the music cache, one pings Supabase so the free-tier project never gets paused for inactivity.

---

## Design System

The whole site uses a **clay tennis court palette** (I play tennis) defined as custom Tailwind tokens in `tailwind.config.js`:

```js
'clay-court':       '#8b5a3c',  // main clay brown (Roland Garros)
'clay-court-light': '#a67c5a',
'clay-court-dark':  '#6d4528',
'clay-dust':        '#d4b896',  // highlight color
'clay-cream':       '#f5f1e8',  // card background
'clay-forest':      '#3e5233',  // court-surroundings green
'clay-charcoal':    '#2c2c2c',  // text
```

Typography pairs **Abril Fatface** (display headings) with **Lato** (body), loaded via Google Fonts. Every feature — including the Mapbox map style and its popups — is themed to match this palette, so third-party components don't look bolted on.

A small CSS trick worth noting: sticky-navbar anchor links use an invisible `a.anchor` element offset `-80px` so in-page jumps land below the fixed navbar instead of underneath it.

---

## Home Page

Single-page layout with four sections (`Hero`, `About`, `Experience`, `Projects`) plus a sticky responsive navbar with a hamburger menu on mobile.

### Animations

- **Hero** — a typewriter effect cycling through "Coder / Gamer / Dreamer" using **Typed.js**, initialized in a `useEffect` with proper cleanup (`typed.destroy()`) to avoid duplicated instances on re-render.
- **Experience cards** — Framer Motion `whileInView` reveals: the card fades in while its content slides in from the left (`x: -300 → 0`). `viewport={{ once: true }}` ensures animations fire once instead of re-triggering on every scroll.
- **Projects grid** — a container/item **variant system** with `staggerChildren: 0.1`, so cards cascade in one after another as the grid scrolls into view.
- **Project card flip** — clicking a card cross-fades between a "front" (image, description, GitHub link) and a "back" (feature list, skill chips) using `AnimatePresence mode="wait"` with **animated `clipPath` polygons**, producing a wipe/reveal effect instead of a plain fade.
- **Category filter** — projects are filterable by category (tabs with live counts). Changing tabs remounts the grid via a `key={activeCategory}` prop so the stagger animation replays for the filtered set.

---

## Music Page

**`/music`** shows my real listening stats: recent tracks, weekly & all-time top tracks/artists, total minutes listened.

### Data pipeline

1. **Last.fm API** — six endpoints fetched **in parallel** with `Promise.all` (user info, recent tracks, weekly/all-time top tracks & artists).
2. **Artwork enhancement** — Last.fm often returns missing or low-res artwork, so each track is enriched with the **iTunes Search API**: search `artist + track`, take `artworkUrl100`, and rewrite the URL from `100x100` to `600x600` for high-res covers. Each item also gets a Spotify search link.
3. **Caching layer** — the merged payload is cached in **Upstash Redis** with `SETEX` and a 1-hour TTL. The read path (`getCachedStats`) is cache-first with a fallback: on a miss or a parse error it re-fetches and repopulates. This keeps the page fast and avoids hammering Last.fm's rate limits.
4. **Daily cron** — `vercel.json` schedules `GET /api/music/cron` daily, which re-warms the cache. The endpoint is protected by a `CRON_SECRET` bearer-token check so random visitors can't trigger upstream API calls.

### API routes

| Route | Purpose |
|---|---|
| `GET /api/music/update` | Cache-first stats read (includes cache TTL metadata in `_cache`) |
| `POST /api/music/update` | Force cache refresh |
| `GET /api/music/stats` | Direct Last.fm fetch (bypasses cache) |
| `GET /api/music/cron` | Cron target, bearer-auth protected |

---

## Photo Map

**`/photo-map`** is the most technically involved feature: an interactive world map of my travel photography with **semantic search** — type any mood or concept ("rainy", "golden hour", "ocean cliffs") and it finds matching photos across every location, with zero manual tagging.

### Two modes, one page

**Browse mode** — a Mapbox world map with custom SVG pins (clay-palette teardrop markers with place labels). Clicking a pin animates in a preview card below the map with:
- a cover photo (Cloudinary-cropped to 3:2 with `g_auto` smart gravity),
- place info (visit count, photo count, last-photographed date, camera body),
- **visit chips** — filter tabs for each trip to that place ("All visits", "London", "Seven Sisters", …),
- a horizontal **thumbnail strip**; clicking a thumbnail swaps it into the cover slot, and clicking the cover opens a full-screen modal (closable via backdrop click or Escape key).

**Search mode** — typing in the search bar (debounced 500ms via `useRef` + `setTimeout`) collapses the map to an 80px strip with an animated CSS height transition, and a cross-place photo grid fades in via Framer Motion, each result labeled with its place and visit name. Clearing the search restores browse mode.

### Semantic search with CLIP + pgvector

The search has no keyword index and no tags — it's pure vector similarity in embedding space:

1. **Offline (one-time script)** — `scripts/generate-embeddings.mjs` runs CLIP's **vision encoder** (`Xenova/clip-vit-base-patch32` via `@xenova/transformers`, ONNX runtime in Node) over every photo and stores a **512-dimensional embedding** in a pgvector column in Supabase.
2. **At query time** — `GET /api/photo-map/search?q=rainy` runs CLIP's **text encoder** on the query *inside the Next.js API route* (models lazy-loaded once and cached at module scope across warm invocations), then calls a Postgres RPC:

```sql
SELECT ..., (1 - (p.embedding <=> query_embedding))::float AS similarity
FROM photos p
JOIN visits v ON v.id = p.visit_id
JOIN places pl ON pl.id = v.place_id
ORDER BY p.embedding <=> query_embedding   -- cosine distance
LIMIT match_count;
```

Because CLIP maps images and text into a **shared embedding space**, "golden hour" finds sunset photos and "rainy" finds overcast street shots without a single manual tag. Inference is free (runs on my own compute), storage is free (Supabase), so the entire AI search costs $0 to operate.

### Data model

```
places (id, name, country, lat/lng, description, camera, cover_photo, last_photographed)
  └── visits (id, place_id, name, date)          -- one place, many trips
        └── photos (id, visit_id, url, alt, embedding vector(512))
```

The places API returns the full tree in **one query** using Supabase's nested select (`places → visits → photos`), so the page loads with a single round trip.

### Cloudinary URL transforms

Photos are stored once and served in multiple render sizes purely by rewriting the URL path:

- thumbnails: `f_auto,q_auto,c_fill,g_auto,w_360,h_240` (2× for retina, smart-crop)
- cover: `f_auto,q_auto,c_fill,g_auto,ar_3:2`
- `f_auto` serves WebP/AVIF automatically based on browser support.

The thumbnail strip **preloads** the large variants with `new Image()` in a `useEffect`, so promoting a thumbnail to the cover slot feels instant.

### State & URL persistence

All state lives in the page component (`selectedPlace`, `activeVisit`, `selectedPhoto`, `modalPhoto`, `searchResults`, `searchQuery`), passed down as props — no state library needed at this scale. Effects cascade resets sensibly (changing place resets the visit filter; changing visit resets the selected photo).

Selected pins persist to the URL (`/photo-map?place=uk`) via `router.replace(..., { scroll: false })`, making places **shareable/bookmarkable**. On load, the page reads `useSearchParams` and re-selects the matching pin. Since `useSearchParams` requires a Suspense boundary in the App Router, the component is exported wrapped in `<Suspense>`.

One subtle layout detail: the map container uses a `ResizeObserver` that calls `map.resize()`, because Mapbox doesn't automatically repaint when its container animates between 420px and 80px heights.

---

## Infrastructure & Deployment

- **Vercel** — production deploys on push to `main`, preview deploys per branch/PR.
- **Environment variables** — API keys (Last.fm, Mapbox, Supabase, Upstash, `CRON_SECRET`) live in Vercel env settings; only intentionally-public keys use the `NEXT_PUBLIC_` prefix (Mapbox token and the Supabase anon key, which is safe to expose by design with row-level security).
- **Cron jobs** (`vercel.json`):
  - `0 0 * * *` → refresh the music stats cache
  - `0 12 * * *` → ping Supabase (`select` one row) so the free-tier database is never auto-paused for 7-day inactivity
- **SEO / link previews** — OpenGraph + Twitter Card metadata (`og:title`, `og:image` at 1200×630, `summary_large_image`) exported from the root layout so shares on LinkedIn/Twitter render a proper preview card.
- **Image security** — `next.config.js` allowlists only `res.cloudinary.com` via `remotePatterns`, and `@xenova/transformers`/`sharp` are marked as `serverExternalPackages` so the ONNX runtime isn't bundled into edge builds.

---

## Interesting Problems I Solved

These are the bugs and design issues that taught me the most while building this.

### 1. pgvector's ANN index silently ruined search recall

Symptom: searching "mountain" returned exactly **one** photo — a beach. The RPC, embeddings, and API were all correct. The cause: the vector column had an approximate-nearest-neighbor index (IVFFlat), which partitions vectors into clusters and only scans the closest cluster at query time. With just ~45 photos, clusters were tiny and text-query embeddings kept landing in near-empty ones. Fix: force an exact scan inside the RPC with `SET LOCAL enable_indexscan = off` — a sequential scan over 45 rows is sub-millisecond and perfectly accurate. Lesson: **ANN indexes trade recall for speed and only make sense at scale**; on small datasets they're strictly worse.

### 2. Serverless build crashed with "supabaseUrl is required"

The Vercel build failed even though the env vars were set — because they were added *after* the build had been queued, and `createClient()` throws at **module load time** when its URL is `undefined`. Static analysis of API routes at build time therefore crashed. Fix: fall back to empty strings at client creation (`process.env.… ?? ''`) so module evaluation never throws; real requests still get the injected env vars at runtime.

### 3. `useSearchParams` breaking static rendering

Adding URL persistence broke the build: Next.js App Router requires any component using `useSearchParams` to be inside a `<Suspense>` boundary (otherwise the whole route opts out of static rendering). Solved by keeping the page as an inner component and exporting a thin wrapper that renders it inside `<Suspense>`.

### 4. Stale cover photo when switching places

Clicking pin A then pin B kept showing A's cover photo until B's image finished downloading — React reuses the same `<img>` element and the browser keeps the old pixels while the new `src` loads. Fix: `key={displayUrl}` on the `next/image` component, forcing a remount (and thus an immediate clear) whenever the URL changes.

### 5. Mapbox not resizing with an animated container

Collapsing the map from 420px to 80px during search-mode transitions left Mapbox rendering at the old size. Mapbox only measures its container on init and window resize — not on CSS transitions. Fix: attach a `ResizeObserver` to the map container that calls `map.resize()` on every frame of the height animation.

### 6. Free-tier keep-alive

Supabase pauses free projects after a week without traffic. A daily Vercel cron hits an internal endpoint that does a minimal `select`, keeping the project active — with a `CRON_SECRET` bearer check so it can't be abused as an open proxy to the database.

### 7. Last.fm artwork quality

Last.fm's API frequently returns placeholder or missing album art. Rather than showing broken images, every track is enriched via the iTunes Search API, with a URL rewrite (`100x100` → `600x600`) to get artwork at display quality — effectively joining two public APIs to build one clean dataset.

---

## Running Locally

```bash
git clone https://github.com/dannyd2083/personal_website.git
cd personal_website
npm install
npm run dev
```

Create `.env.local`:

```bash
# Music page
LASTFM_API_KEY=...
LASTFM_USERNAME=...
UPSTASH_REDIS_KV_REST_API_URL=...
UPSTASH_REDIS_KV_REST_API_TOKEN=...
CRON_SECRET=...

# Photo map
NEXT_PUBLIC_MAPBOX_TOKEN=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...   # only needed for seed/embedding scripts
```

One-time photo-map data setup:

```bash
node scripts/seed-database.mjs         # load data/places-seed.json into Supabase
node scripts/generate-embeddings.mjs   # generate CLIP embeddings for new photos
```

---

## Project Structure

```
app/
  page.js                       # Home (Hero / About / Experience / Projects)
  layout.js                     # Root layout, OpenGraph metadata, navbar/footer
  music/page.js                 # Music stats page
  photo-map/page.js             # Photo map (browse + search modes, all state)
  api/
    music/{stats,update,cron,cache}/route.js
    photo-map/{places,search}/route.js
    cron/supabase-ping/route.js
components/
  Navbar.jsx  ProjectCard.jsx  ProjectData.jsx  ExperienceCard.jsx
  music/      MusicSection.jsx  MusicGrid.jsx  ArtistGrid.jsx
  photo-map/  MapView.jsx  PreviewCard.jsx  VisitChips.jsx
              ThumbnailStrip.jsx  SearchBar.jsx  FilterGallery.jsx  PhotoModal.jsx
sections/
  Hero.jsx  About.jsx  Experience.jsx  Projects.jsx  Footer.jsx
  music/ListeningStats.jsx
lib/
  lastfm.js                     # Last.fm + iTunes artwork pipeline
  cache.js                      # Upstash Redis cache layer
  supabase.js                   # Supabase client
scripts/
  seed-database.mjs             # JSON → Supabase seed
  generate-embeddings.mjs       # CLIP vision embeddings → pgvector
data/
  places-seed.json              # source of truth for places/visits/photos
```
