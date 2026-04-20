import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-12">
        <nav className="mb-20 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-[0.2em] text-zinc-500 uppercase">
            podcast-os
          </span>
          <Link
            href="/builder"
            className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Open Builder
          </Link>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-5 text-sm font-medium text-teal-700">
              Local-first podcast brief studio
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
              Turn episode research into sharp briefs and web-native decks.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
              podcast-os helps producers collect notes, source links, and
              transcripts, then shape them into structured episode briefs and
              presentation-ready slides without adding a database or CMS.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/builder"
                className="rounded-md bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Create Episode Brief
              </Link>
              <Link
                href="/episodes/future-of-podcast-workflows"
                className="rounded-md border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:border-zinc-400"
              >
                View Example Episode
              </Link>
              <Link
                href="/episodes"
                className="rounded-md border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:border-zinc-400"
              >
                Browse Local Episodes
              </Link>
            </div>
          </div>

          <div className="border-l border-zinc-200 pl-6">
            <div className="grid gap-5">
              {[
                ["01", "Ingest sources", "Capture title, thesis, notes, URLs, and transcript text."],
                ["02", "Draft the brief", "Keep the story spine, audience promise, and segment beats together."],
                ["03", "Publish slides", "Render clean web slides from local JSON episode data."],
              ].map(([step, title, body]) => (
                <div key={step} className="border-b border-zinc-200 pb-5">
                  <p className="text-xs font-semibold text-teal-700">{step}</p>
                  <h2 className="mt-2 text-lg font-semibold text-zinc-950">
                    {title}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
