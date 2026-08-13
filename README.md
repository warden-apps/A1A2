# ことば · Kotoba

**English for Thai speakers, A1–A2.** A single-file offline study app: spaced
repetition, grammar, graded readers, pronunciation drills and quizzes — all in
Thai, with Japanese alongside.

Built for one person: a Thai adult beginner who also reads Japanese and manages
a residential building, so the vocabulary leans towards the words he actually
needs at work.

---

## Use it

Open `index.html` in a browser. That's the whole app — no install, no server,
no network.

**On a phone:** open the hosted page, then *Add to Home Screen*. It installs as
a normal app and works with no signal. Progress is saved on the device.

---

## What's inside

| | |
|---|---|
| Vocabulary | **1,868 words**, Pre-A1 → A2, plus the B1 words his job needs |
| Grammar | **49 points**, A1–A2, each with the mistake a Thai speaker makes |
| Reading | **8 graded stories** with tappable words and comprehension questions |
| Pronunciation | **10 lessons, 46 minimal pairs**, targeted at Thai interference |
| Phrases | **42 ready-made sentences** for reception, complaints, emergencies |
| Topics | **23 categories**, each with a Thai explanation |
| Placement | **28-item test** on first run, to find where to start |

Every word carries Thai and Japanese, IPA, part of speech, and — only where it
earns its place — separate senses, a usage note, a warning about a specific
mistake, or an example sentence.

## How it teaches

- **FSRS-6 scheduling.** Tracks difficulty and stability per card rather than a
  single ease factor.
- **A task ladder.** The same word is asked in a harder way as it strengthens:
  recognise → recall → **type it** → listen.
- **Objective grading.** The quiz answer decides the grade. The app never has to
  take his word for what he knows.
- **A 0–100 strength score** combining interval, accuracy, attempt count,
  lapses and overdue decay — so "what am I weak at" has an honest answer.
- **Practice is walled off.** Quizzes and sound drills never touch the review
  schedule.
- **A placement test on first run**, so the starting point is measured rather
  than assumed. Vocabulary is sampled in five fixed bands across the study
  order; grammar acts as a brake, because recognising words you cannot yet put
  in a sentence is not the same as knowing them. Skipping ahead is optional,
  and gives the skipped words a few days' head start rather than marking them
  mastered — a 28-item test is too blunt an instrument to delete words from
  someone's schedule outright.

## Sources

Vocabulary and levels come from Cambridge's published word lists — Pre A1
Starters / A1 Movers / A2 Flyers (2025), A2 Key (Aug 2025) and B1 Preliminary
(Aug 2025) — cross-referenced with pronunciation data and hand-written Thai.

The graded readers are **original**, written against this app's own word list so
about 98% of the running words are ones the learner is already studying.

## Rebuilding

Content lives in `build/data/` as JSON; the app is generated from it.

```bash
bash build/extract-sources.sh        # PDFs -> text  (needs pdftotext)
perl build/build-lexicon.pl          # merge sources -> lexicon.json
perl build/merge-gloss.pl ...        # apply the authored Thai layers
perl build/build-app-data.pl         # -> app-data.js
perl build/check-content.pl          # integrity checks, must pass clean
perl build/assemble.pl index.html    # inline everything -> index.html
```

`check-content.pl` is not optional. It catches the failures that are invisible
by eye: duplicate keys, two options in one question meaning the same thing,
mojibake from bulk editing, comprehension answers pointing past the end of their
options.

## Publishing

Upload to the repository root:

```
index.html  manifest.json  sw.js  favicon.ico  apple-touch-icon.png  icons/
```

`apple-touch-icon.png` must sit **beside `index.html`, not inside `icons/`** —
iOS would not add the app to the Home Screen otherwise. Found on a real
iPhone; nothing in local testing surfaces it.

Bump `CACHE` in `sw.js` on every republish, or installed copies keep serving
the old version from cache with no sign that anything is wrong.

## Notes

- `legacy-v1.html` is the original version of this app, kept for reference.
- British English is the house style, matching the Cambridge sources and Thai
  schooling. American forms are labelled, not silently mixed in.
- Audio uses the device's built-in speech voices; quality varies by phone.
