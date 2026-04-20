import type { SourceItem } from "@/lib/schemas";

type SourceListProps = {
  sources: SourceItem[];
};

export function SourceList({ sources }: SourceListProps) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
            Sources
          </p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-950">
            Local source list
          </h2>
        </div>
        <p className="text-sm text-zinc-500">{sources.length} items</p>
      </div>

      {sources.length > 0 ? (
        <div className="grid gap-3">
          {sources.map((source) => (
            <article
              key={source.id}
              className="rounded-md border border-zinc-200 bg-stone-50 p-4"
            >
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-semibold text-zinc-950">
                    {source.label}
                  </p>
                  <p className="mt-1 text-xs font-medium text-teal-700 uppercase">
                    {source.type}
                  </p>
                </div>
                <time className="text-xs text-zinc-500">
                  {new Date(source.createdAt).toLocaleDateString()}
                </time>
              </div>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600">
                {source.content}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-md border border-dashed border-zinc-300 bg-stone-50 p-4 text-sm text-zinc-500">
          No sources yet. Add URLs, notes, or transcript text in the builder.
        </p>
      )}
    </section>
  );
}
