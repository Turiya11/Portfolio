// One entry per case-study page: the layout and the content passed to it.
// Links are relative to /work/<slug>/ so they work under GitHub Pages' /Portfolio/ path.
// The page content lives in briefs.mjs. 3TFlow is under NDA: its page (threetflow.mjs) shows public screens and Turiya's research synthesis only.
import { lumi, dentigo, kg, pip } from "./briefs.mjs"
import { copilot } from "./research-copilot.mjs"
import { doodleverse } from "./research-doodleverse.mjs"
import { threetflow, ndaVeil } from "./threetflow.mjs"
import { methods } from "./methods.mjs"
import { kgBuild, copilotBuild, lumiBuild, dentigoBuild, doodleverseBuild, pipBuild } from "./build-steps.mjs"

const home = { backLink: "../../#work" }
const bg = "rgb(245, 243, 234)"
const FILE = "CaseStudy"

export const pages = [
    { slug: "lumi", file: FILE, title: "Lumi — case study · Turiya Joshi", bg, props: { ...home, methods: methods["lumi"], ...lumi, build: lumiBuild, next: { title: "Dentigo", link: "../dentigo/" } } },
    { slug: "copilot", file: FILE, title: "Adaptive Emotional AI Co-Pilot — case study · Turiya Joshi", bg, props: { ...home, methods: methods["copilot"], ...copilot, build: copilotBuild, next: { title: "Pip", link: "../pip/" } } },
    { slug: "dentigo", file: FILE, title: "Dentigo — case study · Turiya Joshi", bg, props: { ...home, methods: methods["dentigo"], ...dentigo, build: dentigoBuild, next: { title: "Doodleverse", link: "../doodleverse/" } } },
    { slug: "doodleverse", file: FILE, title: "Doodleverse — case study · Turiya Joshi", bg, props: { ...home, methods: methods["doodleverse"], ...doodleverse, build: doodleverseBuild, next: { title: "3TFlow", link: "../3tflow/" } } },
    { slug: "3tflow", file: FILE, title: "3TFlow — case study · Turiya Joshi", bg, ...ndaVeil, props: { ...home, methods: methods["3tflow"], ...threetflow, next: { title: "KG Hub", link: "../encora/" } } },
    { slug: "encora", file: FILE, title: "KG Hub (Encora) — case study · Turiya Joshi", bg, props: { ...home, methods: methods["encora"], ...kg, build: kgBuild, next: { title: "Adaptive Emotional AI Co-Pilot", link: "../copilot/" } } },
    { slug: "pip", file: FILE, title: "Pip — case study · Turiya Joshi", bg, props: { ...home, methods: methods["pip"], ...pip, build: pipBuild, next: { title: "Lumi", link: "../lumi/" } } },
]
