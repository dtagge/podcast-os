import { promises as fs } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SlideRenderer } from "@/components/SlideRenderer";
import type { Episode } from "@/lib/schemas";

type EpisodePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getEpisode(slug: string): Promise<Episode | null> {
  try {
    const filePath = path.join(process.cwd(), "data", "episodes", `${slug}.json`);
    const file = await fs.readFile(filePath, "utf8");
    return JSON.parse(file) as Episode;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const directory = path.join(process.cwd(), "data", "episodes");

  try {
    const files = await fs.readdir(directory);
    return files
      .filter((file) => file.endsWith(".json"))
      .map((file) => ({ slug: file.replace(/\.json$/, "") }));
  } catch {
    return [];
  }
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { slug } = await params;
  const episode = await getEpisode(slug);

  if (!episode) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 border-b border-zinc-200 pb-6">
          <Link href="/builder" className="text-sm font-medium text-teal-700">
            Back to builder
          </Link>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
            <div>
              <p className="text-sm font-medium text-zinc-500">
                Example episode
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
                {episode.brief.title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-600">
                {episode.brief.thesis}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                Brief summary
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-700">
                {episode.brief.summary}
              </p>
            </div>
          </div>
        </header>

        <SlideRenderer slides={episode.slides} />
      </div>
    </main>
  );
}
