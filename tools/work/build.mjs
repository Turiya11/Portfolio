// Builds /work/<slug>/index.html + shared JS from the Framer case-study components.
// Run: cd tools/work && npm install && npm run build
import { build } from "esbuild"
import { mkdirSync, writeFileSync, rmSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { pages } from "./pages.mjs"

// every block fills its container: no line-length caps on text, images scale up to fill their frames (never cropped)
const FILL =
    ".pc-h1,.pc-h2,.pc-lead,.pc-p,.pc-ps,.pc-disc,.lm-h1,.lm-h2,.lm-lead,.lm-p,.lm-prob-s,.lm-disc,.lm-small,.lm-step p{max-width:none!important}" +
    ".pc-img img{width:100%!important;max-height:none!important;height:auto!important}" +
    ".pc-stimg img,.pc-stagebox img,.lm-stagebox img{width:100%!important;height:100%!important;object-fit:contain}"

// the "Next project" band: blue glass, grey text, yellow arrow circle with a grey arrow
const NEXT =
    ".pc-next,.cs-next{background:linear-gradient(135deg,rgba(187,218,254,.85),rgba(187,218,254,.55))!important;" +
    "backdrop-filter:blur(22px) saturate(170%);-webkit-backdrop-filter:blur(22px) saturate(170%);border:1px solid rgba(255,255,255,.7);" +
    "box-shadow:inset 0 1.5px 0 rgba(255,255,255,.85),inset 0 -1px 0 rgba(255,255,255,.3),0 24px 48px -20px rgba(70,90,170,.3);color:#4b5563!important}" +
    ".pc-next small,.pc-next b,.cs-next small,.cs-next b{color:#4b5563!important;opacity:1!important}" +
    ".pc-next span,.cs-next span{background:rgb(243,234,154)!important;color:#4b5563!important}"

const here = (p) => fileURLToPath(new URL(p, import.meta.url))
const out = here("../../work/")
const stamp = Date.now().toString(36) // the entry files keep their names, so browsers would otherwise reuse an old build
rmSync(out + "js", { recursive: true, force: true })
mkdirSync(here(".entries/"), { recursive: true })

for (const p of pages) {
    writeFileSync(
        here(`.entries/${p.slug}.jsx`),
        `import * as React from "react"
import { createRoot } from "react-dom/client"
import Page from "../src/${p.file}.tsx"
createRoot(document.getElementById("root")).render(<Page {...${JSON.stringify(p.props)}} />)
`
    )
}

await build({
    entryPoints: Object.fromEntries(pages.map((p) => [p.slug, here(`.entries/${p.slug}.jsx`)])),
    outdir: out + "js",
    bundle: true,
    splitting: true, // React is shared between the pages
    format: "esm",
    minify: true,
    target: "es2020",
    alias: { framer: here("framer-shim.js") },
    define: { "process.env.NODE_ENV": '"production"' },
    legalComments: "none",
    logLevel: "warning",
})

for (const p of pages) {
    mkdirSync(out + p.slug, { recursive: true })
    writeFileSync(
        out + p.slug + "/index.html",
        `<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <script src="../../js/analytics.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${p.title}</title>
        <link rel="icon" type="image/png" sizes="48x48" href="../../assets/images/favicon-48.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="../../assets/images/favicon-32.png" />
        <link rel="apple-touch-icon" href="../../assets/images/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mona+Sans:wght@400;500;600&family=Caveat:wght@500;600&display=swap" />
        <link rel="stylesheet" href="../../css/brand.css?v=1" />
        <style>html,body{margin:0;background:${p.bg}}*,*::before,*::after{box-sizing:border-box}.pc-stimg:empty,.pc-img:empty{display:none}${FILL}${NEXT}${p.css || ""}</style>
    </head>
    <body>
        <!-- built by tools/work/build.mjs from the Framer component ${p.file}.tsx — edit there, then rebuild -->
        <div id="root"></div>
        <script type="module" src="../js/${p.slug}.js?v=${stamp}"></script>
    </body>
</html>
`
    )
}
console.log("built", pages.map((p) => p.slug).join(", "))
