import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-12">
        <nav className="mb-20 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-[0.2em] text-slate uppercase">
            podcast-os
          </span>
          <Link
            href="/builder"
            className="rounded-md bg-navy px-4 py-2 text-sm font-medium text-warm-white transition hover:bg-navy-light"
          >
            Open Builder
          </Link>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-5 text-sm font-medium text-gold">
              Local-first podcast brief studio
            </p>
            <h1 className="max-w-4xl text-5xl font-serif font-semibold tracking-tight text-charcoal sm:text-6xl">
              Turn episode research into sharp briefs and web-native decks.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate">
              podcast-os helps producers collect notes, source links, and
              transcripts, then shape them into structured episode briefs and
              presentation-ready slides without adding a database or CMS.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/builder"
                className="rounded-md bg-navy px-5 py-3 text-sm font-semibold text-warm-white transition hover:bg-navy-light"
              >
                Create Episode Brief
              </Link>
              <Link
                href="/episodes/future-of-podcast-workflows"
                className="rounded-md border border-muted bg-light-gold px-5 py-3 text-sm font-semibold text-charcoal transition hover:border-gold"
              >
                View Example Episode
              </Link>
              <Link
                href="/episodes"
                className="rounded-md border border-muted bg-light-gold px-5 py-3 text-sm font-semibold text-charcoal transition hover:border-gold"
              >
                Browse Local Episodes
              </Link>
            </div>
          </div>

          <div className="border-l border-light-navy pl-6">
            <div className="grid gap-5">
              {[
                ["01", "Ingest sources", "Capture title, thesis, notes, URLs, and transcript text."],
                ["02", "Draft the brief", "Keep the story spine, audience promise, and segment beats together."],
                ["03", "Publish slides", "Render clean web slides from local JSON episode data."],
              ].map(([step, title, body]) => (
                <div key={step} className="border-b border-light-navy pb-5">
                  <p className="text-xs font-semibold text-gold">{step}</p>
                  <h2 className="mt-2 text-lg font-serif font-semibold text-charcoal">
                    {title}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
