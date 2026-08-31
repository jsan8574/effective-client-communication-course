# Effective Client Communication Strategies — Self-Paced Course

A static, self-paced e-learning course built from a facilitator-led workshop deck.
Plain HTML/CSS/JS — no build step, no framework, no backend, no login. Deploys to
GitHub Pages by pushing this folder as-is.

## Running locally

Any static file server works, e.g.:

```
python3 -m http.server 8080
```

then open `http://localhost:8080/index.html`. (Opening the files directly via
`file://` also works for everything except the two CDN-loaded pieces — Google
Fonts and jsPDF on the Certificate page — which need a real HTTP(S) origin with
internet access, same as the deployed site will have.)

## Deploying to GitHub Pages

1. Push this folder's contents to the root of a GitHub repository (or to a `/docs`
   folder, adjusting the Pages source setting accordingly).
2. In the repo's Settings → Pages, set the source to the branch/folder you pushed to.
3. GitHub Pages is **public by default** — this is true even for a private repo on a
   paid plan, unless the org specifically has GitHub Enterprise Cloud with Pages
   access control enabled. Anyone with the URL can view the site.

## Project structure

```
index.html              course hub / dashboard
module-1.html … 5.html  the five modules
knowledge-check.html    final graded assessment (20 Qs across all modules)
certificate.html        canvas-drawn certificate + "download PDF of my answers"
css/styles.css          design system (brand palette, components)
js/course-config.js     course-wide config — module list, activity IDs, etc.
js/storage.js           single localStorage blob: progress, quiz answers, reflections
js/timer.js             robust elapsed-time tracking (ignores backgrounded-tab gaps)
js/activities.js        renderers: flip cards, matching, drag-drop sort, sequence, branching sim
js/quiz.js              CFU + knowledge-check quiz renderer/scorer
js/nav.js               shared header, module prev/next footer, first-visit name-gate modal
js/personalize.js       {name} token substitution used to personalize coaching text
js/certificate.js       canvas certificate drawing
js/pdf-export.js        jsPDF-based "download my answers" compiler
data/module-N.js         content + activity data for each module
data/knowledge-check.js  final assessment question bank
```

## Cache-busting

Every CSS/JS `<script>`/`<link>` tag is loaded with a `?v=N` query string
(currently `?v=5`). **Bump this number on every future edit to `css/styles.css`
or any file in `js/`**, across every HTML file that references it — otherwise
returning learners' browsers may keep serving a cached, stale copy. A quick way
to do this repo-wide:

```
sed -i 's/?v=5/?v=6/g' *.html
```

(bump the numbers to whatever the next version should be).

## Extending the course (adding Module 2, 3, … as a series)

This was built as a standalone course but structured so a future module can be
added without restructuring anything already built:

- Add a new entry to the `MODULES` array in `js/course-config.js` (id, title,
  desc, path, activities, cfuId). Everything else — the dashboard grid, the
  header progress bar, the prev/next footer nav, the certificate's course-wide
  scope — reads from this array.
- localStorage keys are namespaced by module id (`m1`, `m2`, …), so a new
  module's saved state can never collide with an existing one.
- Add questions for the new module to `data/knowledge-check.js` if it should be
  included in the graded assessment.
- Build the new `module-N.html` + `data/module-N.js` following the pattern of
  the existing five.

## Data provenance note

The source PowerPoint contained two overlapping runs of the same workshop —
slides 1–32 (dated Mar 11, 2026) and slides 33–64 (dated Mar 2, 2026, an
earlier draft) — covering the same five parts with minor wording drift and one
structural difference (the second run splits "Part 4" into 3.1/3.2 and
retitles Part 5 "Roleplays, Feedback & Wrap-Up"). These were treated as ONE
course rather than kept as duplicate/conflicting modules: content was merged
to the richer/more complete version of each section (the Mar 11 run generally
had fuller speaker notes), with the Mar 2 run used only to fill specific gaps
— e.g. its channel-matrix row "Slack/Teams/chat" is more specific than Mar
11's "MS Teams" (kept the more specific one), and its "Pre-Call / In-Meeting /
Post-Call" labels for Follow-Up & Accountability are clearer than the
unlabeled Mar 11 version (adopted those labels, used in Module 5).

Media: no stock photography — all visuals are CSS/inline-SVG in the brand
palette. Exception: Module 4 embeds the real YouTube source supplied for the
workshop's "Let's watch this!" clip (a Pursuit of Happyness scene used to
teach the SPARK model), tracked via the YouTube IFrame API so the rest of the
module stays locked (dimmed, non-interactive) until the learner has actually
watched it (~90% of its runtime), told us they can't watch right now (a
"Can't watch the video right now?" disclosure, deliberately tucked away
rather than placed next to the player, reveals the opt-out + the deck's
written debrief notes instead), or confirms they watched it on YouTube
directly via the automatic embed-failure fallback described below. All three
choices persist, so a returning learner doesn't get re-gated. The deck's
other, sourceless "Video Time" slide became a text-based discussion prompt.

**Note on opening this course via `file://`:** a YouTube embed will show
"Video player configuration error — Error 153" when the page is opened
directly from disk (double-clicked, or `file:///path/to/module-4.html`)
rather than served over `http(s)://` — YouTube's player requires a normal
page referrer to authorize embedded playback, and `file://` pages don't send
one. This is a YouTube-side restriction, not a bug in the course; it resolves
on its own once the course is served over HTTP (`python3 -m http.server`,
GitHub Pages, any real web host). Module 4 detects this automatically (an
`onError`/timeout check) and swaps in a "watch it on YouTube directly, then
check this box to continue" fallback so a learner testing locally via
`file://` is never stuck.
