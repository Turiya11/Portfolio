# Turiya Joshi — Portfolio

Hand-built portfolio site 

```
index.html          the page
css/styles.css      all styles
js/hero.js          hero: window, sky by time of day, time bar
js/butterflies.js   hoverable butterflies (port of the Framer ButterflyHero)
js/journey.js       "My design journey" horizontal timeline
js/about.js         "The archive": calendar, record player, film strip, gallery wall (content at the top)
js/garden.js        the garden footer (port of the Framer GardenFooter)
js/eyes.js          googly-eyes cursor
work/<project>/     case-study pages (built, see below)
assets/images/      illustration, cloud and star images
tools/              dev-only helpers (asset builder, screenshot script)
```

Run locally: `python3 -m http.server 4175` in this folder, then open http://localhost:4175.

Case-study pages (`work/lumi`, `work/dentigo`, `work/encora`, `work/pip`) share one layout,
`tools/work/src/CaseStudy.tsx`, and their words live in `tools/work/briefs.mjs`.
After changing either: `cd tools/work && npm install && npm run build`.
`work/3tflow` is a static page, parked under NDA. The older page components in `tools/work/src/` are no longer built.

Every screen on those pages is a video in `assets/video/work/`. Lumi, Dentigo and KG Hub are walkthroughs of the real
screens with a scripted pointer: the steps are in `tools/work/video/scenes.mjs`, the screens in `tools/work/video/shots/`
and `assets/images/`. With the site running on :4175, `cd tools/work/video && node render.mjs` renders all of them,
and `node render.mjs lm-mood` renders one. Pip's clips are trimmed from the real prototype recordings with `clip.swift`.
Both tools need Chrome and macOS (they encode through AVFoundation, no ffmpeg).
