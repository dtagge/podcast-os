import { promises as fs } from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Episode } from "@/lib/schemas";

async function getEpisodes() {
  const directory = path.join(process.cwd(), "data", "episodes");

  try {
    const files = await fs.readdir(directory);
    const episodes = await Promise.all(
      files
        .filter((file) => file.endsWith(".json"))
        .map(async (file) => {
          const filePath = path.join(directory, file);
          const content = await fs.readFile(filePath, "utf8");
          return JSON.parse(content) as Episode;
        }),
    );

    return episodes.sort((a, b) =>
      b.brief.updatedAt.localeCompare(a.brief.updatedAt),
    );
  } catch {
    return [];
  }
}

export default async function EpisodesPage() {
  const episodes = await getEpisodes();

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col justify-between gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <Link href="/" className="text-sm font-medium text-teal-700">
              podcast-os
            </Link>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
              Local Episodes
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
              Browse locally saved mock briefs and web-native slide decks from
              the data/episodes folder.
            </p>
          </div>
          <Link
            href="/builder"
            className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            New Episode
          </Link>
        </header>

        {episodes.length > 0 ? (
          <div className="grid gap-4">
            {episodes.map((episode) => (
              <Link
                key={episode.brief.slug}
                href={`/episodes/${episode.brief.slug}`}
                className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 hover:shadow-md"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.18em] text-teal-700 uppercase">
                      {episode.slides.length} slides
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-zinc-950">
                      {episode.brief.title}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600">
                      {episode.brief.summary}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm text-zinc-500">
                    {new Date(episode.brief.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <section className="rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center">
            <p className="text-sm text-zinc-500">
              No local episodes yet. Create and save one from the builder.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

