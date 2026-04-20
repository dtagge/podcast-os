import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import type { Episode } from "@/lib/schemas";

type SaveEpisodeRequest = {
  episode?: Episode;
};

export async function POST(request: Request) {
  const body = (await request.json()) as SaveEpisodeRequest;
  const episode = body.episode;

  if (!episode?.brief?.slug || !Array.isArray(episode.slides)) {
    return NextResponse.json(
      { error: "A complete local episode is required." },
      { status: 400 },
    );
  }

  const safeSlug = episode.brief.slug.replace(/[^a-z0-9-]/g, "");

  if (!safeSlug) {
    return NextResponse.json(
      { error: "Episode slug is invalid." },
      { status: 400 },
    );
  }

  const directory = path.join(process.cwd(), "data", "episodes");
  const filePath = path.join(directory, `${safeSlug}.json`);
  const savedEpisode: Episode = {
    ...episode,
    brief: {
      ...episode.brief,
      slug: safeSlug,
      updatedAt: new Date().toISOString(),
    },
  };

  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(savedEpisode, null, 2)}\n`);

  return NextResponse.json({
    episode: savedEpisode,
    path: `data/episodes/${safeSlug}.json`,
    url: `/episodes/${safeSlug}`,
  });
}

