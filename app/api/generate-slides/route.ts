import { NextResponse } from "next/server";
import { createMockSlides } from "@/lib/mockGeneration";
import type { EpisodeBrief } from "@/lib/schemas";

type GenerateSlidesRequest = {
  brief?: EpisodeBrief;
};

export async function POST(request: Request) {
  const body = (await request.json()) as GenerateSlidesRequest;
  const brief = body.brief;

  if (!brief) {
    return NextResponse.json(
      { error: "A mock EpisodeBrief is required to generate slides." },
      { status: 400 },
    );
  }

  const slides = createMockSlides(brief);

  return NextResponse.json({ slides });
}
