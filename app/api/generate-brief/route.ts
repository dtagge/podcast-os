import { NextResponse } from "next/server";
import type { EpisodeBrief, SourceItem } from "@/lib/schemas";

type GenerateBriefRequest = {
  title?: string;
  thesis?: string;
  notes?: string;
  urls?: string[];
  transcript?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as GenerateBriefRequest;
  const createdAt = new Date().toISOString();

  const sources: SourceItem[] = [
    ...(body.urls ?? []).filter(Boolean).map((url, index) => ({
      id: `url-${index + 1}`,
      type: "url" as const,
      label: `Source URL ${index + 1}`,
      content: url,
      createdAt,
    })),
    ...(body.transcript
      ? [
          {
            id: "transcript-1",
            type: "transcript" as const,
            label: "Transcript",
            content: body.transcript,
            createdAt,
          },
        ]
      : []),
  ];

  const brief: EpisodeBrief = {
    slug: (body.title ?? "untitled-episode")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    title: body.title ?? "Untitled episode",
    thesis: body.thesis ?? "Add a thesis for this episode.",
    audience: "Podcast producers and editorial teams",
    summary:
      body.notes ??
      "A generated brief will summarize the episode direction once model integration is added.",
    keyQuestions: [
      "What is the listener promise?",
      "Which source material best supports the thesis?",
      "What should the audience remember after the episode?",
    ],
    narrativeBeats: ["Set the context", "Develop the tension", "Land the takeaway"],
    sources,
    createdAt,
    updatedAt: createdAt,
  };

  return NextResponse.json({ brief });
}
