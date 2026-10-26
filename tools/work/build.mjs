// Builds /work/<slug>/index.html + shared JS from the Framer case-study components.
// Run: cd tools/work && npm install && npm run build
import { build } from "esbuild"
import { mkdirSync, writeFileSync, rmSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { pages } from "./pages.mjs"

const here = (p) => fileURLToPath(new URL(p, import.meta.url))
const out = here("../../work/")
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${p.title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mona+Sans:wght@400;500;600;700;800&display=swap" />
        <style>html,body{margin:0;background:${p.bg}}*,*::before,*::after{box-sizing:border-box}</style>
    </head>
    <body>
        <!-- built by tools/work/build.mjs from the Framer component ${p.file}.tsx — edit there, then rebuild -->
        <div id="root"></div>
        <script type="module" src="../js/${p.slug}.js"></script>
    </body>
</html>
`
    )
}
console.log("built", pages.map((p) => p.slug).join(", "))
