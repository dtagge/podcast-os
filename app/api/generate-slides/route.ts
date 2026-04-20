import { NextResponse } from "next/server";
import type { EpisodeBrief, Slide } from "@/lib/schemas";

type GenerateSlidesRequest = {
  brief?: EpisodeBrief;
};

export async function POST(request: Request) {
  const body = (await request.json()) as GenerateSlidesRequest;
  const brief = body.brief;

  const slides: Slide[] = [
    {
      id: "opening",
      eyebrow: "Opening",
      title: brief?.title ?? "Untitled episode",
      body: brief?.thesis ?? "Add a thesis to create a stronger opening slide.",
      bullets: ["Thesis", "Audience promise", "Episode arc"],
    },
    {
      id: "questions",
      eyebrow: "Editorial spine",
      title: "Key questions",
      body: "Use the brief questions to keep the conversation focused.",
      bullets: brief?.keyQuestions ?? [
        "What is the core claim?",
        "Why does this matter now?",
        "What changes for the listener?",
      ],
    },
    {
      id: "takeaway",
      eyebrow: "Close",
      title: "Listener takeaway",
      body:
        brief?.summary ??
        "A concise summary will become the closing slide once generation is connected.",
      bullets: brief?.narrativeBeats ?? ["Context", "Tension", "Takeaway"],
    },
  ];

  return NextResponse.json({ slides });
}
