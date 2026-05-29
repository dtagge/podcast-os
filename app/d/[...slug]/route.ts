import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

const DECKS_ROOT = path.join(process.cwd(), "decks");

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".m4v": "video/x-m4v",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".pdf": "application/pdf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

type RouteContext = {
  params: Promise<{ slug: string[] }>;
};

function resolveSafe(slug: string[]) {
  const relative = slug.join("/");
  const candidate = path.resolve(DECKS_ROOT, relative);
  if (candidate !== DECKS_ROOT && !candidate.startsWith(DECKS_ROOT + path.sep)) {
    return null;
  }
  return candidate;
}

async function findHtmlIn(dir: string): Promise<string | null> {
  const indexPath = path.join(dir, "index.html");
  if (await fs.stat(indexPath).then(() => true).catch(() => false)) {
    return indexPath;
  }
  // Fall back to the first .html file alphabetically (case-insensitive)
  try {
    const entries = await fs.readdir(dir);
    const html = entries
      .filter((name) => name.toLowerCase().endsWith(".html"))
      .sort((a, b) => a.localeCompare(b))[0];
    return html ? path.join(dir, html) : null;
  } catch {
    return null;
  }
}

function liveReloadScript(pathname: string) {
  return `
<script>
(function () {
  var params = new URLSearchParams(window.location.search);
  if (params.get('live') === '0') return;
  var endpoint = ${JSON.stringify(pathname)} + '?mtime=1';
  var last = null;
  setInterval(function () {
    fetch(endpoint, { cache: 'no-store' })
      .then(function (r) { return r.text(); })
      .then(function (t) {
        if (last !== null && t !== last) {
          location.reload();
        }
        last = t;
      })
      .catch(function () {});
  }, 1200);
})();
</script>`;
}

async function serveDirectory(slug: string[], dirPath: string) {
  const htmlPath = await findHtmlIn(dirPath);
  if (!htmlPath) {
    return NextResponse.json(
      { error: `No .html file found in decks/${slug.join("/")}/.` },
      { status: 404 },
    );
  }

  const html = await fs.readFile(htmlPath, "utf8");
  const baseHref = `/d/${slug.join("/")}/`;
  const baseTag = `<base href="${baseHref}">`;
  const pathname = `/d/${slug.join("/")}`;

  let modified = html;
  if (/<head[^>]*>/i.test(modified)) {
    modified = modified.replace(/<head[^>]*>/i, (match) => `${match}\n${baseTag}`);
  } else {
    modified = `${baseTag}\n${modified}`;
  }
  if (/<\/body>/i.test(modified)) {
    modified = modified.replace(/<\/body>/i, `${liveReloadScript(pathname)}\n</body>`);
  } else {
    modified = `${modified}\n${liveReloadScript(pathname)}`;
  }

  return new NextResponse(modified, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}

export async function GET(request: Request, { params }: RouteContext) {
  const { slug } = await params;
  if (!slug || slug.length === 0) {
    return NextResponse.json({ error: "Deck name required." }, { status: 400 });
  }

  const fullPath = resolveSafe(slug);
  if (!fullPath) {
    return NextResponse.json({ error: "Invalid path." }, { status: 400 });
  }

  const stat = await fs.stat(fullPath).catch(() => null);
  if (!stat) {
    return NextResponse.json(
      { error: `Not found: decks/${slug.join("/")}` },
      { status: 404 },
    );
  }

  const url = new URL(request.url);
  if (url.searchParams.get("mtime") === "1") {
    const target = stat.isDirectory()
      ? (await findHtmlIn(fullPath)) ?? fullPath
      : fullPath;
    const targetStat = await fs.stat(target).catch(() => null);
    if (!targetStat) {
      return new NextResponse("missing", { status: 200 });
    }
    return new NextResponse(String(targetStat.mtimeMs), {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-store",
      },
    });
  }

  if (stat.isDirectory()) {
    return serveDirectory(slug, fullPath);
  }

  if (stat.isFile()) {
    const ext = path.extname(fullPath).toLowerCase();
    const mime = MIME[ext] ?? "application/octet-stream";
    const data = await fs.readFile(fullPath);
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": mime,
        "Cache-Control": "no-cache",
      },
    });
  }

  return NextResponse.json({ error: "Unsupported." }, { status: 400 });
}
