import { promises as fs } from "node:fs";
import path from "node:path";
import Link from "next/link";

type DeckInfo = {
  name: string;
  videos: string[];
};

async function listDecks(): Promise<DeckInfo[]> {
  const root = path.join(process.cwd(), "decks");
  let entries: import("node:fs").Dirent[];
  try {
    entries = await fs.readdir(root, { withFileTypes: true });
  } catch {
    return [];
  }

  const decks: DeckInfo[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith("_")) continue;
    const dir = path.join(root, entry.name);
    let files: string[] = [];
    try {
      files = await fs.readdir(dir);
    } catch {
      // ignore
    }
    const videos = files
      .filter((name) => /^video-[a-z0-9-]+\.(mp4|webm|mov|m4v)$/i.test(name))
      .sort();
    decks.push({ name: entry.name, videos });
  }
  return decks.sort((a, b) => a.name.localeCompare(b.name));
}

export default async function DecksIndexPage() {
  const decks = await listDecks();

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10">
          <Link href="/" className="text-sm font-medium text-gold">
            podcast-os
          </Link>
          <h1 className="mt-3 text-4xl font-serif font-semibold tracking-tight text-charcoal">
            Decks
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate">
            Each folder under{" "}
            <code className="rounded bg-light-gold px-1 py-0.5">decks/</code> is a presentation.
            Drop an HTML file and standardized video files alongside it.
          </p>
        </header>

        {decks.length > 0 ? (
          <ul className="grid gap-3">
            {decks.map((deck) => (
              <li key={deck.name}>
                <Link
                  href={`/d/${deck.name}`}
                  className="flex flex-col gap-2 rounded-lg border border-light-navy bg-light-gold px-5 py-4 text-charcoal shadow-sm transition hover:border-gold hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium">{deck.name}</span>
                    <span className="text-xs text-slate">decks/{deck.name}/</span>
                  </div>
                  {deck.videos.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {deck.videos.map((video) => (
                        <span
                          key={video}
                          className="rounded border border-light-navy bg-warm-white px-2 py-0.5 text-[11px] font-medium text-slate"
                        >
                          {video}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-muted">no video files yet</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-lg border border-dashed border-muted bg-light-gold p-5 text-sm text-slate">
            No decks yet. Start one with{" "}
            <code className="rounded bg-warm-white px-1 py-0.5">
              cp -r decks/_template decks/my-deck
            </code>
            .
          </p>
        )}

        <section className="mt-10 rounded-lg border border-light-navy bg-warm-white p-5 text-sm leading-6 text-slate shadow-sm">
          <p className="font-semibold text-charcoal">File convention</p>
          <p className="mt-2">
            Drop these next to your HTML file. Slots stay hidden until the file exists.
          </p>
          <pre className="mt-3 overflow-x-auto rounded bg-light-gold p-3 font-mono text-xs text-charcoal">
{`decks/my-deck/
  index.html
  video-one.mp4
  video-two.mp4
  video-three.mp4
  video-four.mp4
  video-five.mp4
  video-six.mp4`}
          </pre>
          <p className="mt-4">
            Reference any of them in your HTML as{" "}
            <code className="rounded bg-light-gold px-1 py-0.5">
              &lt;video src=&quot;video-one.mp4&quot; autoplay loop muted playsinline&gt;
            </code>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
