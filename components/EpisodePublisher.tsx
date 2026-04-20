"use client";

type EpisodePublisherProps = {
  title: string;
  thesis: string;
  notes: string;
  urls: string;
  transcript: string;
  onGenerate: () => void;
  onSave: () => void;
  canSave: boolean;
  isSaving: boolean;
  savedUrl: string | null;
};

export function EpisodePublisher({
  title,
  thesis,
  notes,
  urls,
  transcript,
  onGenerate,
  onSave,
  canSave,
  isSaving,
  savedUrl,
}: EpisodePublisherProps) {
  const sourceCount =
    urls
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean).length + (transcript.trim() ? 1 : 0);
  const noteCount = notes.trim().split(/\s+/).filter(Boolean).length;

  return (
    <aside className="rounded-lg border border-light-navy bg-physician-navy p-5 text-warm-white shadow-sm">
      <p className="text-xs font-semibold tracking-[0.18em] text-gold-hover uppercase">
        Draft state
      </p>
      <h2 className="mt-2 text-xl font-serif font-semibold">Local episode preview</h2>
      <dl className="mt-5 grid gap-4 text-sm">
        <div>
          <dt className="text-muted">Title</dt>
          <dd className="mt-1 font-medium">{title || "Untitled episode"}</dd>
        </div>
        <div>
          <dt className="text-muted">Thesis</dt>
          <dd className="mt-1 line-clamp-3 text-light-navy">
            {thesis || "Add a thesis to anchor the episode brief."}
          </dd>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md bg-warm-white/10 p-3">
            <dt className="text-muted">Sources</dt>
            <dd className="mt-1 text-2xl font-serif font-semibold">{sourceCount}</dd>
          </div>
          <div className="rounded-md bg-warm-white/10 p-3">
            <dt className="text-muted">Words</dt>
            <dd className="mt-1 text-2xl font-serif font-semibold">{noteCount}</dd>
          </div>
        </div>
      </dl>
      <button
        type="button"
        onClick={onGenerate}
        className="mt-6 w-full rounded-md bg-gold px-4 py-3 text-sm font-semibold text-charcoal transition hover:bg-gold-hover"
      >
        Generate Mock Brief
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={!canSave || isSaving}
        className="mt-3 w-full rounded-md border border-warm-white/20 px-4 py-3 text-sm font-semibold text-warm-white transition hover:bg-warm-white/10 disabled:cursor-not-allowed disabled:opacity-45"
      >
        {isSaving ? "Saving..." : "Save Local Episode"}
      </button>
      {savedUrl ? (
        <a
          href={savedUrl}
          className="mt-3 block rounded-md bg-light-gold px-4 py-3 text-center text-sm font-semibold text-charcoal transition hover:bg-light-navy"
        >
          Open Saved Deck
        </a>
      ) : null}
      <p className="mt-3 text-xs leading-5 text-muted">
        This stays local-first and mock-driven. Save writes a JSON episode file
        into data/episodes.
      </p>
    </aside>
  );
}
