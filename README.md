# Turiya Joshi — Portfolio

Hand-built portfolio site 

```
index.html          the page
css/styles.css      all styles
js/hero.js          hero: window, sky by time of day, time bar
js/butterflies.js   hoverable butterflies (port of the Framer ButterflyHero)
js/journey.js       "My design journey" horizontal timeline
js/garden.js        the garden footer (port of the Framer GardenFooter)
js/eyes.js          googly-eyes cursor
work/<project>/     case-study pages (built, see below)
assets/images/      illustration, cloud and star images
tools/              dev-only helpers (asset builder, screenshot script)
```

Run locally: `python3 -m http.server 4175` in this folder, then open http://localhost:4175.

Case-study pages (`work/lumi`, `work/3tflow`, `work/dentigo`, `work/encora`) run the Framer code components
unchanged. Their source is `tools/work/src/*.tsx` and the per-page settings are in `tools/work/pages.mjs`.
After changing either: `cd tools/work && npm install && npm run build`.
