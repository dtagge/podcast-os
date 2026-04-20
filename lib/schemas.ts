export type SourceItem = {
  id: string;
  type: "url" | "note" | "transcript";
  label: string;
  content: string;
  createdAt: string;
};

export type EpisodeBrief = {
  slug: string;
  title: string;
  thesis: string;
  audience: string;
  summary: string;
  keyQuestions: string[];
  narrativeBeats: string[];
  sources: SourceItem[];
  createdAt: string;
  updatedAt: string;
};

export type Slide = {
  id: string;
  eyebrow?: string;
  title: string;
  body: string;
  bullets?: string[];
  speakerNotes?: string;
};

export type Episode = {
  brief: EpisodeBrief;
  slides: Slide[];
};
