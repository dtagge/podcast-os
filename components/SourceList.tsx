import type { SourceItem } from "@/lib/schemas";

type SourceListProps = {
  sources: SourceItem[];
};

export function SourceList({ sources }: SourceListProps) {
  return (
    <section className="rounded-lg border border-light-navy bg-light-gold p-5 shadow-sm">
      <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
            Sources
          </p>
          <h2 className="mt-2 text-xl font-serif font-semibold text-charcoal">
            Local source list
          </h2>
        </div>
        <p className="text-sm text-slate">{sources.length} items</p>
      </div>

      {sources.length > 0 ? (
        <div className="grid gap-3">
          {sources.map((source) => (
            <article
              key={source.id}
              className="rounded-md border border-light-navy bg-warm-white p-4"
            >
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-semibold text-charcoal">
                    {source.label}
                  </p>
                  <p className="mt-1 text-xs font-medium text-gold uppercase">
                    {source.type}
                  </p>
                </div>
                <time className="text-xs text-slate">
                  {new Date(source.createdAt).toLocaleDateString()}
                </time>
              </div>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate">
                {source.content}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-md border border-dashed border-muted bg-warm-white p-4 text-sm text-slate">
          No sources yet. Add URLs, notes, or transcript text in the builder.
        </p>
      )}
    </section>
  );
}
