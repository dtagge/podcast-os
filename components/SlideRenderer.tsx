import type { Slide } from "@/lib/schemas";

type SlideRendererProps = {
  slides: Slide[];
};

export function SlideRenderer({ slides }: SlideRendererProps) {
  return (
    <div className="grid gap-6">
      {slides.map((slide, index) => (
        <article
          key={slide.id}
          className="aspect-[16/9] rounded-lg border border-zinc-200 bg-white p-8 shadow-sm"
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 text-xs font-semibold tracking-[0.18em] text-teal-700 uppercase">
                <span>{slide.eyebrow ?? `Slide ${index + 1}`}</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h2 className="mt-8 max-w-4xl text-4xl font-semibold tracking-tight text-zinc-950">
                {slide.title}
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">
                {slide.body}
              </p>
            </div>

            {slide.bullets ? (
              <ul className="grid gap-2 text-sm text-zinc-700 sm:grid-cols-3">
                {slide.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="rounded-md border border-zinc-200 bg-stone-50 px-3 py-2"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
