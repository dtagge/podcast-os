import type { EpisodeBrief, Slide, SourceItem } from "@/lib/schemas";

export type MockEpisodeInput = {
  title: string;
  thesis: string;
  notes: string;
  urls: string;
  transcript: string;
};

const fallbackTitle = "Untitled episode";
const fallbackThesis = "Add a thesis to anchor this episode.";

export function slugifyTitle(title: string) {
  const slug = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return slug || "untitled-episode";
}

export function parseSourceItems(input: MockEpisodeInput, createdAt: string) {
  const urls = input.urls
    .split("\n")
    .map((url) => url.trim())
    .filter(Boolean);

  const urlSources: SourceItem[] = urls.map((url, index) => ({
    id: `url-${index + 1}`,
    type: "url",
    label: `Source URL ${index + 1}`,
    content: url,
    createdAt,
  }));

  const noteSource: SourceItem | null = input.notes.trim()
    ? {
        id: "notes-1",
        type: "note",
        label: "Producer notes",
        content: input.notes.trim(),
        createdAt,
      }
    : null;

  const transcriptSource: SourceItem | null = input.transcript.trim()
    ? {
        id: "transcript-1",
        type: "transcript",
        label: "Transcript excerpt",
        content: input.transcript.trim(),
        createdAt,
      }
    : null;

  return [...urlSources, noteSource, transcriptSource].filter(
    (source): source is SourceItem => Boolean(source),
  );
}

function firstSentence(value: string, fallback: string) {
  return value
    .split(/[.!?]/)
    .map((part) => part.trim())
    .filter(Boolean)[0] ?? fallback;
}

export function createMockEpisodeBrief(input: MockEpisodeInput): EpisodeBrief {
  const createdAt = new Date().toISOString();
  const title = input.title.trim() || fallbackTitle;
  const thesis = input.thesis.trim() || fallbackThesis;
  const notesLead = firstSentence(
    input.notes,
    "The episode brief will sharpen as source material is added.",
  );
  const transcriptLead = firstSentence(
    input.transcript,
    "Transcript material will provide supporting voice and evidence.",
  );

  return {
    slug: slugifyTitle(title),
    title,
    thesis,
    audience: "Podcast producers, hosts, and editorial teams",
    summary: `${notesLead}. The working thesis is: ${thesis}`,
    keyQuestions: [
      "What does the listener need to believe by the end?",
      `How does "${notesLead}" support the episode thesis?`,
      `Which moment from the transcript best proves "${transcriptLead}"?`,
    ],
    narrativeBeats: [
      "Open with the production problem or listener tension.",
      "Use sources to make the thesis concrete and credible.",
      "Close with a practical takeaway the audience can remember.",
    ],
    sources: parseSourceItems(input, createdAt),
    createdAt,
    updatedAt: createdAt,
  };
}

export function createMockSlides(brief: EpisodeBrief): Slide[] {
  return [
    {
      id: "slide-1",
      eyebrow: "Thesis",
      title: brief.title,
      body: brief.thesis,
      bullets: ["Core claim", "Audience promise", "Editorial spine"],
      speakerNotes:
        "Start by clearly naming the episode's point of view and why this conversation matters now.",
    },
    {
      id: "slide-2",
      eyebrow: "Brief",
      title: "The listener promise",
      body: brief.summary,
      bullets: brief.keyQuestions.slice(0, 3),
      speakerNotes:
        "Use the brief summary to connect the topic, audience, and practical stakes.",
    },
    {
      id: "slide-3",
      eyebrow: "Arc",
      title: "Narrative beats",
      body: "A strong episode moves from context to tension to a memorable takeaway.",
      bullets: brief.narrativeBeats,
      speakerNotes:
        "Treat these beats as the draft run-of-show for the episode conversation.",
    },
    {
      id: "slide-4",
      eyebrow: "Sources",
      title: "Evidence to bring forward",
      body:
        brief.sources.length > 0
          ? "Use the collected sources to ground the episode in concrete details."
          : "Add notes, URLs, or transcript text to give the episode stronger evidence.",
      bullets:
        brief.sources.length > 0
          ? brief.sources.slice(0, 3).map((source) => source.label)
          : ["Source URLs", "Producer notes", "Transcript excerpts"],
      speakerNotes:
        "Point to the source list below the presentation for the raw local material.",
    },
  ];
}
