"use client";

type BriefEditorProps = {
  title: string;
  thesis: string;
  notes: string;
  onTitleChange: (value: string) => void;
  onThesisChange: (value: string) => void;
  onNotesChange: (value: string) => void;
};

export function BriefEditor({
  title,
  thesis,
  notes,
  onTitleChange,
  onThesisChange,
  onNotesChange,
}: BriefEditorProps) {
  return (
    <section className="rounded-lg border border-light-navy bg-light-gold p-5 shadow-sm">
      <div className="mb-5">
        <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
          Brief
        </p>
        <h2 className="mt-2 text-xl font-serif font-semibold text-charcoal">
          Shape the episode
        </h2>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate">
          Episode title
        </span>
        <input
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="The future of podcast workflows"
          className="mt-2 w-full rounded-md border border-muted bg-warm-white px-3 py-2 text-sm text-charcoal outline-none transition focus:border-gold focus:bg-light-gold"
        />
      </label>

      <label className="mt-4 block">
        <span className="text-sm font-medium text-slate">Thesis</span>
        <textarea
          value={thesis}
          onChange={(event) => onThesisChange(event.target.value)}
          placeholder="The core claim this episode should make"
          rows={4}
          className="mt-2 w-full resize-y rounded-md border border-muted bg-warm-white px-3 py-2 text-sm text-charcoal outline-none transition focus:border-gold focus:bg-light-gold"
        />
      </label>

      <label className="mt-4 block">
        <span className="text-sm font-medium text-slate">Notes</span>
        <textarea
          value={notes}
          onChange={(event) => onNotesChange(event.target.value)}
          placeholder="Guest context, angle, must-cover points, open questions"
          rows={8}
          className="mt-2 w-full resize-y rounded-md border border-muted bg-warm-white px-3 py-2 text-sm text-charcoal outline-none transition focus:border-gold focus:bg-light-gold"
        />
      </label>
    </section>
  );
}
