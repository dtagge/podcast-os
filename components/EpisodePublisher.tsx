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
    <aside className="rounded-lg border border-zinc-200 bg-zinc-950 p-5 text-white shadow-sm">
      <p className="text-xs font-semibold tracking-[0.18em] text-teal-300 uppercase">
        Draft state
      </p>
      <h2 className="mt-2 text-xl font-semibold">Local episode preview</h2>
      <dl className="mt-5 grid gap-4 text-sm">
        <div>
          <dt className="text-zinc-400">Title</dt>
          <dd className="mt-1 font-medium">{title || "Untitled episode"}</dd>
        </div>
        <div>
          <dt className="text-zinc-400">Thesis</dt>
          <dd className="mt-1 line-clamp-3 text-zinc-200">
            {thesis || "Add a thesis to anchor the episode brief."}
          </dd>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md bg-white/10 p-3">
            <dt className="text-zinc-400">Sources</dt>
            <dd className="mt-1 text-2xl font-semibold">{sourceCount}</dd>
          </div>
          <div className="rounded-md bg-white/10 p-3">
            <dt className="text-zinc-400">Words</dt>
            <dd className="mt-1 text-2xl font-semibold">{noteCount}</dd>
          </div>
        </div>
      </dl>
      <button
        type="button"
        onClick={onGenerate}
        className="mt-6 w-full rounded-md bg-teal-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-teal-300"
      >
        Generate Mock Brief
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={!canSave || isSaving}
        className="mt-3 w-full rounded-md border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-45"
      >
        {isSaving ? "Saving..." : "Save Local Episode"}
      </button>
      {savedUrl ? (
        <a
          href={savedUrl}
          className="mt-3 block rounded-md bg-white px-4 py-3 text-center text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100"
        >
          Open Saved Deck
        </a>
      ) : null}
      <p className="mt-3 text-xs leading-5 text-zinc-400">
        This stays local-first and mock-driven. Save writes a JSON episode file
        into data/episodes.
      </p>
    </aside>
  );
}
