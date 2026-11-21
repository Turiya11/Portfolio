// One entry per case-study page: the layout and the content passed to it.
// Links are relative to /work/<slug>/ so they work under GitHub Pages' /Portfolio/ path.
// The page content lives in briefs.mjs. 3TFlow is under NDA: its page (threetflow.mjs) uses only what is public on 3tflow.com.
import { lumi, dentigo, kg, pip } from "./briefs.mjs"
import { copilot } from "./research-copilot.mjs"
import { doodleverse } from "./research-doodleverse.mjs"
import { threetflow, ndaVeil } from "./threetflow.mjs"

const home = { backLink: "../../#work" }
const bg = "rgb(245, 243, 234)"
const FILE = "CaseStudy"

export const pages = [
    { slug: "lumi", file: FILE, title: "Lumi — case study · Turiya Joshi", bg, props: { ...home, ...lumi, next: { title: "Dentigo", link: "../dentigo/" } } },
    { slug: "copilot", file: FILE, title: "Adaptive Emotional AI Co-Pilot — case study · Turiya Joshi", bg, props: { ...home, ...copilot, next: { title: "Pip", link: "../pip/" } } },
    { slug: "dentigo", file: FILE, title: "Dentigo — case study · Turiya Joshi", bg, props: { ...home, ...dentigo, next: { title: "Doodleverse", link: "../doodleverse/" } } },
    { slug: "doodleverse", file: FILE, title: "Doodleverse — case study · Turiya Joshi", bg, props: { ...home, ...doodleverse, next: { title: "3TFlow", link: "../3tflow/" } } },
    { slug: "3tflow", file: FILE, title: "3TFlow — case study · Turiya Joshi", bg, ...ndaVeil, props: { ...home, ...threetflow, next: { title: "KG Hub", link: "../encora/" } } },
    { slug: "encora", file: FILE, title: "KG Hub (Encora) — case study · Turiya Joshi", bg, props: { ...home, ...kg, next: { title: "Adaptive Emotional AI Co-Pilot", link: "../copilot/" } } },
    { slug: "pip", file: FILE, title: "Pip — case study · Turiya Joshi", bg, props: { ...home, ...pip, next: { title: "Lumi", link: "../lumi/" } } },
]
