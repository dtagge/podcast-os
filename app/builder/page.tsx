"use client";

import { useState } from "react";
import Link from "next/link";
import { BriefEditor } from "@/components/BriefEditor";
import { EpisodePublisher } from "@/components/EpisodePublisher";
import { SourceIngestor } from "@/components/SourceIngestor";

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
          />
        </div>
      </div>
    </main>
  );
}
