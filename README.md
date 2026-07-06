# dannydeng.dev

My personal site, live at [dannydeng.dev](https://www.dannydeng.dev). The whole thing is themed after a clay tennis court since I play tennis, and the two bigger features come from my other hobbies: a music stats page (I listen to a lot of pop) and a photo map for my travel photography.

- **/music** — my real listening stats from Last.fm, cached in Redis
- **/photo-map** — a world map of my photos with semantic search: type "rainy" or "golden hour" and it finds matching photos, no tags involved

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router), React 18 |
| Styling / animation | Tailwind CSS, Framer Motion |
| Map | Mapbox GL via `react-map-gl` |
| Photos | Cloudinary (hosting + URL-based transforms) |
| Database | Supabase (Postgres + pgvector) |
| ML | CLIP via `@xenova/transformers` (runs in Node, no API cost) |
| Cache | Upstash Redis |
| Hosting | Vercel (+ two daily cron jobs) |

Everything runs on free tiers.

## Architecture

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
                                        └────────────────────┘
```

## Home page

Standard portfolio one-pager: hero, about, experience, projects. The animations are done with Framer Motion (scroll reveals, staggered grids, a card flip using `AnimatePresence` + animated `clipPath`) — I learned these by working through the Motion docs. The hero typewriter effect is Typed.js.

## Music page

Recent tracks, weekly and all-time top tracks/artists, total minutes listened.

1. Six Last.fm endpoints are fetched in parallel with `Promise.all`.
2. Last.fm blocks real artwork through their API for copyright reasons (you mostly get placeholder images), so each track gets a second lookup on the iTunes Search API, and the artwork URL is rewritten from `100x100` to `600x600` for a usable resolution.
3. The merged payload is cached in Upstash Redis with a 1-hour TTL — reads are cache-first with a refetch fallback, so the page stays fast and Last.fm doesn't get hammered.
4. A daily Vercel cron re-warms the cache, protected by a `CRON_SECRET` bearer token.

## Photo map

Two modes on one page:

**Browse** — a Mapbox world map with custom SVG pins. Clicking a pin opens a preview card: cover photo, place info, filter chips for each visit, and a thumbnail strip. Thumbnails swap into the cover slot, and the cover opens a fullscreen modal.

**Search** — typing in the search bar (debounced 500ms) collapses the map to a thin strip and fades in a photo grid of matches across all places.

The search has no tags anywhere. Every photo gets a 512-dimensional CLIP embedding (generated once by a script, stored in a pgvector column). At query time the API route runs CLIP's text encoder on the query — the model runs in Node and loads once at module scope — and a Postgres function returns the nearest photos by cosine distance (`ORDER BY embedding <=> query_embedding`). Since CLIP maps images and text into the same embedding space, "golden hour" finds sunset shots without anyone labeling them.

Data is three tables, `places → visits → photos`, and the places API returns the whole tree in one nested Supabase select.

## Infrastructure

**Supabase** — Postgres with the pgvector extension. Schema is the three tables above plus a `search_photos` SQL function that does the cosine-distance ranking. Seeded from a JSON file by a one-time script; another script generates CLIP embeddings for any photos that don't have one yet.

**Cloudinary** — photos are uploaded once and served at every size the UI needs purely by rewriting the URL (`c_fill,g_auto,w_360,h_240` for thumbnails, `ar_3:2` smart-crop for covers, `f_auto` for automatic WebP/AVIF).

**Vercel** — hosting, env vars, and two daily crons: one refreshes the music cache, one runs a tiny `select` against Supabase because free-tier projects get auto-paused after a week without traffic. OpenGraph/Twitter card metadata is set in the root layout so shared links render a proper preview.

## Problems that took real debugging

**pgvector's ANN index was quietly ruining search.** Searching "mountain" returned exactly one photo — a beach. The embeddings, SQL, and API were all correct. The cause: the vector column had an IVFFlat index, which clusters vectors and only scans the nearest cluster at query time. With only ~45 photos the clusters were tiny, and text-query embeddings kept landing in a near-empty one. Fix: `SET LOCAL enable_indexscan = off` inside the SQL function to force an exact scan — sub-millisecond at this size. ANN indexes only pay off at scale.

**Last.fm artwork is copyright-blocked.** The API returns placeholder images for most tracks instead of real album art. Rather than shipping a page of grey placeholders, I joined in a second data source — iTunes Search — and upscaled its artwork by rewriting the size inside the URL.

**The Vercel build kept failing.** Two separate issues: `createClient()` throws at module load time if its env var is undefined (the vars had been added after that build was queued), fixed with `?? ''` fallbacks so importing never throws. And adding URL persistence broke the build because the App Router requires any component using `useSearchParams` to be wrapped in a `<Suspense>` boundary.
