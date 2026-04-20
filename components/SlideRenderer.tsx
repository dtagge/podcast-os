"use client";

import { useState } from "react";
import type { Slide } from "@/lib/schemas";

type SlideRendererProps = {
  slides: Slide[];
};

export function SlideRenderer({ slides }: SlideRendererProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSlide = slides[currentIndex];
  const hasSlides = slides.length > 0;

  function goToPrevious() {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }

  function goToNext() {
    setCurrentIndex((index) => Math.min(index + 1, slides.length - 1));
  }

  if (!hasSlides) {
    return (
      <section className="rounded-lg border border-dashed border-muted bg-light-gold p-8 text-center">
        <p className="text-sm font-medium text-slate">
          Generate mock slides to preview the presentation.
        </p>
      </section>
    );
  }

  return (
    <section className="grid gap-4">
      <article className="aspect-[16/9] rounded-lg border border-light-navy bg-light-gold p-8 shadow-sm">
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4 text-xs font-semibold tracking-[0.18em] text-gold uppercase">
              <span>{currentSlide.eyebrow ?? `Slide ${currentIndex + 1}`}</span>
              <span>
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </span>
            </div>
            <h2 className="mt-8 max-w-4xl text-4xl font-serif font-semibold tracking-tight text-charcoal">
              {currentSlide.title}
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate">
              {currentSlide.body}
            </p>
          </div>

          {currentSlide.bullets ? (
            <ul className="grid gap-2 text-sm text-slate sm:grid-cols-3">
              {currentSlide.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="rounded-md border border-light-navy bg-warm-white px-3 py-2"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </article>

      <div className="flex flex-col justify-between gap-4 rounded-lg border border-light-navy bg-light-gold p-4 shadow-sm sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-charcoal">
            {currentSlide.speakerNotes ? "Speaker notes" : "Slide navigation"}
          </p>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate">
            {currentSlide.speakerNotes ??
              "Use the controls to move through the mock slide deck."}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="rounded-md border border-muted bg-light-gold px-4 py-2 text-sm font-semibold text-charcoal transition hover:border-gold disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={goToNext}
            disabled={currentIndex === slides.length - 1}
            className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-warm-white transition hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
