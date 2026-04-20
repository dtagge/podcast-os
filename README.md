# podcast-os

podcast-os is a local-first web app for creating podcast episode briefs and turning them into web-native presentations.

The current MVP is mock-driven on purpose. It lets a producer enter an episode title, thesis, notes, URLs, and transcript text, then generate a local `EpisodeBrief`, convert that brief into mock slides, and preview the deck with next/previous navigation. There is no auth, database, external CMS, or live AI integration yet.

## What It Does Today

- Provides a minimal product home page at `/`.
- Provides an episode builder at `/builder`.
- Generates a mock `EpisodeBrief` from local form state.
- Converts the mock brief into mock `Slide` data.
- Renders slides with next/previous navigation.
- Shows a local source list below the presentation.
- Renders an example local episode from `data/episodes`.
- Exposes mock API routes for future generation wiring.

## Local Setup

Requirements:

- Node.js 20 or newer
- npm

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful routes:

- `/` for the product overview.
- `/builder` for the local episode builder.
- `/episodes/future-of-podcast-workflows` for the example presentation.

## Verification

Run linting:

```bash
npm run lint
```

Run a production build:

```bash
npm run build
```

Test the mock brief API:

```bash
curl -X POST http://localhost:3000/api/generate-brief \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Testing podcast-os",
    "thesis": "Local-first production tools reduce podcast workflow friction.",
    "notes": "A test brief for validating the mock generator.",
    "urls": ["https://example.com/source"],
    "transcript": "Host: This is a useful transcript excerpt."
  }'
```

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
  SourceList.tsx

lib/
  schemas.ts
  prompts.ts
  mockGeneration.ts

data/
  episodes/
```

## Core Data Types

The MVP centers on three typed objects:

- `SourceItem`: local input material such as URLs, producer notes, or transcript excerpts.
- `EpisodeBrief`: the structured editorial brief generated from source material.
- `Slide`: a web-native presentation slide derived from the brief.

These types live in `lib/schemas.ts`.

## Product Roadmap

### Phase 1: Local-First MVP

- Generate mock briefs from builder inputs.
- Convert mock briefs into mock slides.
- Render navigable slide previews.
- Show local source lists.
- Keep sample episodes in JSON.

### Phase 2: Durable Local Workspace

- Save drafts from the builder into `data/episodes`.
- Add an episode index page.
- Load and edit existing local episode files.
- Add JSON schema validation for local files and API responses.
- Add import/export for briefs and slide decks.

### Phase 3: AI-Assisted Generation

- Connect `/api/generate-brief` to an LLM.
- Connect `/api/generate-slides` to an LLM.
- Add prompt controls and generation history.
- Add guardrails for preserving source attribution.
- Support regenerating individual sections or slides.

### Phase 4: Publishing Workflow

- Add presentation themes.
- Add speaker notes view.
- Add static export for web sharing.
- Add PDF or image export.
- Add optional deployment targets.

### Phase 5: Collaboration And Scale

- Add optional sync or repo-backed storage.
- Add team review workflows.
- Add version history for briefs and slide decks.
- Add external CMS integrations only after the local-first workflow is proven.

## Design Principles

- Local-first by default.
- Typed data before infrastructure.
- Briefs are the source of truth.
- Slides should be web-native, editable, and portable.
- Avoid auth, databases, and CMS dependencies until the workflow proves itself.

## Tech

- Next.js
- TypeScript
- Tailwind CSS
- App Router
