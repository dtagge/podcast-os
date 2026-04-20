# podcast-os

podcast-os is a local-first web app for creating podcast episode briefs and turning them into web-native presentations.

The MVP is intentionally small: producers can draft an episode title, thesis, notes, source URLs, and transcript text in a clean builder UI, then view example episode slides rendered from local JSON. There is no auth, database, or external CMS yet.

## Product Direction

podcast-os is designed to become a lightweight operating system for each episode:

- Collect source material in one place.
- Shape the editorial thesis and narrative beats.
- Generate structured briefs from local inputs.
- Turn briefs into presentation-ready web slides.
- Keep episode artifacts portable and versionable.

## Current MVP

- Next.js App Router project with TypeScript and Tailwind CSS.
- `/builder` page for drafting episode inputs.
- `/episodes/[slug]` page that reads mock episode data from `data/episodes`.
- API route stubs for generating briefs and slides.
- Shared TypeScript schemas for source items, episode briefs, slides, and episodes.

## Project Structure

```txt
app/
  page.tsx
  builder/page.tsx
  episodes/[slug]/page.tsx
  api/generate-brief/route.ts
  api/generate-slides/route.ts

components/
  SourceIngestor.tsx
  BriefEditor.tsx
  SlideRenderer.tsx
  EpisodePublisher.tsx

lib/
  schemas.ts
  prompts.ts

data/
  episodes/
```

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Useful routes:

- `/` for the product overview.
- `/builder` for the local episode builder.
- `/episodes/future-of-podcast-workflows` for the example presentation.

## Next Steps

- Add durable local draft persistence.
- Connect generation routes to an LLM provider.
- Add schema validation at API boundaries.
- Support multiple local episode files from the UI.
- Add export modes for slides and briefs.

## Tech

- Next.js
- TypeScript
- Tailwind CSS
- App Router
