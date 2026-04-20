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
import type { Episode, EpisodeBrief, Slide } from "@/lib/schemas";

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
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [savedUrl, setSavedUrl] = useState<string | null>(null);

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
    setSaveMessage(null);
    setSavedUrl(null);
  }

  async function saveLocalEpisode() {
    if (!brief || slides.length === 0) {
      setSaveMessage("Generate a mock brief before saving.");
      return;
    }

    setIsSaving(true);
    setSaveMessage(null);

    const episode: Episode = { brief, slides };
    const response = await fetch("/api/episodes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ episode }),
    });

    const payload = (await response.json()) as {
      error?: string;
      path?: string;
      url?: string;
    };

    setIsSaving(false);

    if (!response.ok) {
      setSaveMessage(payload.error ?? "Unable to save local episode.");
      return;
    }

    setSavedUrl(payload.url ?? null);
    setSaveMessage(`Saved to ${payload.path}.`);
  }

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-4 border-b border-light-navy pb-6 sm:flex-row sm:items-end">
          <div>
            <Link href="/" className="text-sm font-medium text-gold">
              podcast-os
            </Link>
            <h1 className="mt-3 text-4xl font-serif font-semibold tracking-tight text-charcoal">
              Episode Builder
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate">
              Draft a brief from notes, source URLs, and transcript text before
              generating a web-native slide outline.
            </p>
          </div>
          <Link
            href="/episodes"
            className="rounded-md border border-muted bg-light-gold px-4 py-2 text-sm font-semibold text-charcoal transition hover:border-gold"
          >
            Browse Episodes
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
            onSave={saveLocalEpisode}
            canSave={Boolean(brief && slides.length > 0)}
            isSaving={isSaving}
            savedUrl={savedUrl}
          />
        </div>

        {saveMessage ? (
          <div className="mt-4 rounded-lg border border-light-navy bg-light-gold px-4 py-3 text-sm text-slate shadow-sm">
            {saveMessage}
          </div>
        ) : null}

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                  Presentation
                </p>
                <h2 className="mt-2 text-2xl font-serif font-semibold tracking-tight text-charcoal">
                  Mock slide deck
                </h2>
              </div>
              {brief ? (
                <p className="text-sm text-slate">
                  Generated from brief: {brief.slug}
                </p>
              ) : null}
            </div>
            <SlideRenderer slides={slides} />
          </div>

          <div className="grid gap-6">
            <section className="rounded-lg border border-light-navy bg-light-gold p-5 shadow-sm">
              <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                EpisodeBrief
              </p>
              {brief ? (
                <div className="mt-4 grid gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-charcoal">{brief.title}</p>
                    <p className="mt-2 leading-6 text-slate">
                      {brief.summary}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal">
                      Key questions
                    </p>
                    <ul className="mt-2 grid gap-2 text-slate">
                      {brief.keyQuestions.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm leading-6 text-slate">
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
