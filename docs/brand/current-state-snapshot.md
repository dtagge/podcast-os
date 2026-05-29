# Tagge Precision Health — Current State Snapshot

Last updated: May 6, 2026

This document captures the operational snapshot of the practice. Replace
in place when major things change. For evolution and decision history,
see the decisions log.

---

## The Practice

Tagge Precision Health, PLLC. Solo virtual-first practice based in
Charlotte, NC. Founded by Dr. Daniel Tagge.

Practice positioning: Concierge Precision Medicine. A standard of care
for health, not disease. Built on a definition of health and the
methodology to deliver it. Detection and correction, not diagnosis and
treatment. Salutogenic practice.

The practice exists to deliver something that doesn't exist anywhere
else in medicine: a standard of care organized around health rather
than around disease.

Website: taggehealth.com

---

## The Single Product

Concierge Precision Medicine. One ongoing physician relationship,
billed monthly at $500. The trial entry is the first month, fully
refundable. After 30 days, the patient continues at the same monthly
rate or stops. There is no separate Consult, no separate Workup, no
separate Partnership product. There is only Concierge Precision
Medicine, with two ways to enter.

Founders rate: ten patients lock in $300/month for life. Founders
slots are not yet visually elevated on the website but will be once
the offer is validated.

Primary Care add-on: separate retainer for patients who want primary
care services within the relationship. Available by invitation only,
selective. Pricing not public.

The existing Founders Tier patient at $150/month is grandfathered at
the original rate for life.

---

## How Patients Engage

Two equally-weighted entry paths on the homepage:

**Explore Your First Month** — $500 first month, fully refundable. Routes
to /start. Patient pays through Stripe, fills out a brief intake (state of
residence, age, situation, prior care, source). Healthie account creation
link sent after payment. Initial physician phone call within 24 hours.
Plan delivered within 7 days. After 30 days, recurring monthly subscription
through Healthie kicks in at $500/month or refund issued.

**Schedule a Call** — Free 20-minute Precision Call. Routes to
/precision-call. Calendly embed with brief framing on the page. For
patients who want to vet fit before committing.

Both paths lead to the same product: Concierge Precision Medicine. The
choice is about reader readiness, not about different services.

---

## Site Architecture

**Homepage** (taggehealth.com)

1. Hero — eyebrow "Concierge Precision Medicine", H1 "The care your
   health has been looking for.", body paragraph, three-line italic
   refrain ("A relationship with a physician. / A personalized Plan. /
   The path to optimal health."), CTA "Explore Your First Month" with
   helper line "Or schedule a call if you prefer to talk first →"

2. The Foundation — eyebrow "THE FOUNDATION", H2 "Your health deserves
   its own standard of care.", two-paragraph body articulating the
   shift from disease-oriented to health-oriented care.

3. How It Works — eyebrow "How it works", H2 "Your path to optimal
   health.", subtitle "What working with me looks like, from first
   touch to ongoing partnership.", three phases (Interpret, Develop,
   Implement) with bodies and italic closing lines, section closer
   "For the long arc of your health."

4. Inside Your Precision Health Plan — eyebrow "The deliverable", H2
   "Inside your Precision Health Plan.", body, Plan cover image as
   button to multi-page modal preview, "See an example Plan →" link.

5. Testimonials — eyebrow "In their words", H2 "A different kind of
   physician.", three patient testimonial cards (locked verbatim per
   FTC + NC Medical Board rules).

6. Final CTA — eyebrow "BEGIN", H2 "No reason not to start.", intro
   line "Two ways in. Pick the one that fits.", two-paragraph body
   describing the offer and the call alternative, dual CTA: "Explore
   Your First Month" → /start, "Schedule a Call" → /precision-call.

Newsletter section deleted. No email capture on the homepage.

**Other pages**

- /start — entry transaction page. Description of the first month,
  what's included, refund clause, gate questions, Stripe checkout
  link. Currently being rebuilt from the old /precision-consult page.
- /precision-call — Calendly booking page with FAQ section. Live and
  functional.
- /about (Who I Am) — physician credibility surface, narrative arc.
- /how-i-think — methodology surface, deeper articulation of the
  framework. Will eventually carry the salutogenic framework, the
  HOMe/HOPe methodology, and the explicit AI-enhanced synthesis
  explanation.

Nav: Who I Am, How I Think, gold "Get Started" button (currently
routes to /start). Connection page is a simple drop with social
links.

---

## Brand & Voice

Palette: Navy (#1B2A4A), Gold (#C9A227), supporting Physician Navy
(#1E3050), Navy Light (#243558), Navy Deep (#151F35), Warm White
(#F7F5F0).

Typography: Playfair Display (headlines, brand wordmark in uppercase
with letter-spacing), Inter (body, UI).

Voice rules: No em dashes in body copy. No semicolons. No banned
words (full list in voice-and-documentation-standards.md). Short
declarative sentences. "My" not "our" except shared physician+patient
activity. Capital P "Plan" when referring to the Precision Health
Plan, italicized when written in body copy.

Site standard for headings: sentence case plus period.

---

## Tech Stack

- Site: Next.js, hosted on Vercel
- EHR: Healthie (offering IDs locked: Consult 244435, DHE 244437 —
  these are legacy IDs and may be repurposed for the new single-product
  monthly subscription)
- Scheduling: Calendly (Precision Call), Healthie (patient visits)
- Payments: Stripe (first month checkout via /start), Healthie
  (recurring monthly subscription after first month)
- Email: Kit (ConvertKit) — drtagge@taggehealth.com (no homepage
  newsletter capture currently)
- Analytics: Plausible
- Implementation: Claude Code

---

## Operational Reality

- **First month transaction:** Stripe checkout via /start page. After
  payment, Healthie account creation link sent. Patient onboards into
  Healthie. Recurring monthly subscription kicks in for month 2+.
- **Refund:** Fully refundable, no time limit. Patient asked to share
  why for the practice's learning. Refund issued through Stripe for
  first month, through Healthie for ongoing subscription.
- **Cancellation of ongoing subscription:** Patient self-serve through
  Healthie portal (web browser, FTC Click-to-Cancel compliance).
- **Async messaging SLA:** During business hours, same-day or next-day
  response.
- **Newsletter:** Deleted from homepage. May return as a deliberate
  content strategy after launch validation.

---

## Patient-Facing PDFs

Three branded service-overview PDFs exist from the previous architecture:

- Precision-Consult-Service-Overview.pdf (4 pages)
- Precision-Workup-Service-Overview.pdf (6 pages)
- Precision-Partnership-Service-Overview.pdf (4 pages)

These need to be retired or rewritten to match the new single-product
architecture. Replacement: a single Concierge Precision Medicine
service overview that explains the practice, the first month, the
ongoing relationship, and the optional primary care add-on.

---

## Current Focus

- Pre-launch homepage rebuild (Hero, Section 2, Section 3, Section 4
  copy, Final CTA section) — substantially complete as of May 6, 2026
- /start page rebuild — pending
- Stripe + Healthie operational setup for the first month transaction
  — pending
- Legal review of refund/residency language with healthcare attorney
  — pending
- May 4, 2026 launch via warm outreach
- Personal network first, no paid acquisition
- Founders rate: 10 slots at $300/month locked for life

---

## Key Decisions Locked

- Concierge Precision Medicine as the single product. No separate
  Consult, Workup, or Partnership SKUs.
- Salutogenic framing: a standard of care for health, not disease.
- Intervention Accountability Standard governs every recommendation.
- Optimal ranges, not disease cutoffs.
- Unified audience frame: people frustrated with current care
  (conventional, functional, integrative). The Optimize/Heal two-bucket
  architecture from earlier strategic work has been retired.
- $500/month, fully refundable first month, 10 founders at $300/month
  locked for life.
- Primary Care available as a selective add-on, by invitation only.
- Two equally-weighted entry paths: Explore Your First Month, or
  Schedule a Call.
- Pricing not displayed on the homepage. Pricing lives on the /start
  page where the transaction happens.
- Premium positioning at all touchpoints. Warm, peer-level voice.
- Welcome package for first-month patients — pending design.

---

## Reference Documents Active

- north-star-vision-v4.docx — strategic foundation (revised May 2026
  to retire Optimize/Heal architecture and elevate the salutogenic
  positioning)
- voice-and-documentation-standards.md — binding voice rules
- brand-foundation-master-v3.docx — brand identity, visual system,
  positioning
- healthie-reference.docx — EHR operational reference

Documents retired:
- master-sop-revised-april-7.docx Section 07 (Avatar Reference) — the
  two-bucket Optimize/Heal architecture is no longer accurate. Sub-avatar
  development is no longer a pending workstream. The unified frame
  ("frustrated with current care") is the operative audience model.
