import { NextResponse } from "next/server";
import { createMockEpisodeBrief } from "@/lib/mockGeneration";

type GenerateBriefRequest = {
  title?: string;
  thesis?: string;
  notes?: string;
  urls?: string[] | string;
  transcript?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as GenerateBriefRequest;
  const urls = Array.isArray(body.urls)
    ? body.urls.join("\n")
    : (body.urls ?? "");

  const brief = createMockEpisodeBrief({
    title: body.title ?? "",
    thesis: body.thesis ?? "",
    notes: body.notes ?? "",
    urls,
    transcript: body.transcript ?? "",
  });

  return NextResponse.json({ brief });
}
