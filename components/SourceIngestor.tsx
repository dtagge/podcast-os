"use client";

type SourceIngestorProps = {
  urls: string;
  transcript: string;
  onUrlsChange: (value: string) => void;
  onTranscriptChange: (value: string) => void;
};

export function SourceIngestor({
  urls,
  transcript,
  onUrlsChange,
  onTranscriptChange,
}: SourceIngestorProps) {
  return (
    <section className="rounded-lg border border-light-navy bg-light-gold p-5 shadow-sm">
      <div className="mb-5">
        <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
          Sources
        </p>
        <h2 className="mt-2 text-xl font-serif font-semibold text-charcoal">
          Ingest source material
        </h2>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate">URLs</span>
        <textarea
          value={urls}
          onChange={(event) => onUrlsChange(event.target.value)}
          placeholder="One URL per line"
          rows={4}
          className="mt-2 w-full resize-y rounded-md border border-muted bg-warm-white px-3 py-2 text-sm text-charcoal outline-none transition focus:border-gold focus:bg-light-gold"
        />
      </label>

      <label className="mt-4 block">
        <span className="text-sm font-medium text-slate">
          Transcript text
        </span>
        <textarea
          value={transcript}
          onChange={(event) => onTranscriptChange(event.target.value)}
          placeholder="Paste transcript excerpts or full raw text"
          rows={8}
          className="mt-2 w-full resize-y rounded-md border border-muted bg-warm-white px-3 py-2 text-sm text-charcoal outline-none transition focus:border-gold focus:bg-light-gold"
        />
      </label>
    </section>
  );
}
