"use client";

import { useState } from "react";
import Link from "next/link";
import { BriefEditor } from "@/components/BriefEditor";
import { EpisodePublisher } from "@/components/EpisodePublisher";
import { SlideRenderer } from "@/components/SlideRenderer";
import { SourceList } from "@/components/SourceList";
import { SourceIngestor } from "@/components/SourceIngestor";
import {
  createMockEpisodeBrief,
  createMockSlides,
} from "@/lib/mockGeneration";
import type { EpisodeBrief, Slide } from "@/lib/schemas";

export default function BuilderPage() {
  const [title, setTitle] = useState("The future of podcast workflows");
  const [thesis, setThesis] = useState(
    "Podcast teams need local-first tools that keep research, briefs, and decks in one editable workflow.",
  );
  const [notes, setNotes] = useState(
    "Explore the shift from scattered docs to structured episode systems. Keep the producer's workflow fast, portable, and versionable.",
  );
  const [urls, setUrls] = useState(
    "https://example.com/local-first-software\nhttps://example.com/podcast-production",
  );
  const [transcript, setTranscript] = useState(
    "Host: The best production tools disappear into the workflow. Guest: Exactly. The brief should become the presentation without a copy-paste tax.",
  );
  const [brief, setBrief] = useState<EpisodeBrief | null>(null);
  const [slides, setSlides] = useState<Slide[]>([]);

  function generateMockEpisode() {
    const nextBrief = createMockEpisodeBrief({
      title,
      thesis,
      notes,
      urls,
      transcript,
    });

    setBrief(nextBrief);
    setSlides(createMockSlides(nextBrief));
  }

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <Link href="/" className="text-sm font-medium text-teal-700">
              podcast-os
            </Link>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
              Episode Builder
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
              Draft a brief from notes, source URLs, and transcript text before
              generating a web-native slide outline.
            </p>
          </div>
          <Link
            href="/episodes/future-of-podcast-workflows"
            className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:border-zinc-400"
          >
            View Example
          </Link>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr_360px]">
          <BriefEditor
            title={title}
            thesis={thesis}
            notes={notes}
            onTitleChange={setTitle}
            onThesisChange={setThesis}
            onNotesChange={setNotes}
          />
          <SourceIngestor
            urls={urls}
            transcript={transcript}
            onUrlsChange={setUrls}
            onTranscriptChange={setTranscript}
          />
          <EpisodePublisher
            title={title}
            thesis={thesis}
            notes={notes}
            urls={urls}
            transcript={transcript}
            onGenerate={generateMockEpisode}
          />
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                  Presentation
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
                  Mock slide deck
                </h2>
              </div>
              {brief ? (
                <p className="text-sm text-zinc-500">
                  Generated from brief: {brief.slug}
                </p>
              ) : null}
            </div>
            <SlideRenderer slides={slides} />
          </div>

          <div className="grid gap-6">
            <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                EpisodeBrief
              </p>
              {brief ? (
                <div className="mt-4 grid gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-zinc-950">{brief.title}</p>
                    <p className="mt-2 leading-6 text-zinc-600">
                      {brief.summary}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-950">
                      Key questions
                    </p>
                    <ul className="mt-2 grid gap-2 text-zinc-600">
                      {brief.keyQuestions.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm leading-6 text-zinc-500">
                  Click Generate Mock Brief to populate a local EpisodeBrief and
                  convert it into slides.
                </p>
              )}
            </section>
            <SourceList sources={brief?.sources ?? []} />
          </div>
        </section>
      </div>
    </main>
  );
}
