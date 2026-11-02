// One entry per case-study page: the component file and the props set on its Framer page instance.
// Content not listed here comes from the component's own defaults (as in Framer).
// Links are relative to /work/<slug>/ so they work under GitHub Pages' /Portfolio/ path.
// The written case-study content lives in content.mjs. 3TFlow is parked under NDA: work/3tflow/index.html is a static page.
import { dentigo, encora, pip, lumiStickies } from "./content.mjs"

const home = { backLink: "../../#journey", menuLink: "../../", backLabel: "Back to work", menuLabel: "menu", navStyle: "glass" }

export const pages = [
    {
        slug: "lumi",
        file: "LumiCaseStudy",
        title: "Lumi — case study · Turiya Joshi",
        bg: "rgb(245, 243, 234)",
        props: {
            ...home,
            title: "Lumi.",
            role: "User research · Interaction design",
            roleNote: "academic project",
            timeline: "12 weeks",
            team: "",
            tools: "Figma",
            scope: "System mapping, personas, user journey, ideation, information architecture, lo-fi wireframes, hi-fi prototype",
            status: "Academic concept with a high-fidelity prototype. Not a launched product.",
            vhNavLabel: "Preview",
            prototypeLink:
                "https://www.figma.com/proto/ej8YddthuaGL8rEengyDms/UX-Studio-Sem6?node-id=56-4650&viewport=-53%2C-1621%2C0.29&t=1dSYAobHJgRg7rOF-1&scaling=contain&content-scaling=fixed&starting-point-node-id=56%3A4650&page-id=45%3A16",
            nextLabel: "Next project",
            nextTitle: "Dentigo",
            nextLink: "../dentigo/",
            showTodos: true,
            showVideoHero: true,
            ...lumiStickies,
            // the hero is a blank video frame until the Lumi video is added; screens are exported from the Lumi Figma file (wireframes page)
            screen1: { src: "../../assets/images/lumi/home.jpg" },
            screen2: { src: "../../assets/images/lumi/patterns.jpg" },
            screen3: { src: "../../assets/images/lumi/journal.jpg" },
            screen4: { src: "../../assets/images/lumi/partner-guide.jpg" },
            screen5: { src: "../../assets/images/lumi/family.jpg" },
            videoHeroInNav: false,
            accent: "rgb(226, 121, 141)",
            muted: "rgb(43, 47, 143)",
        },
    },
    {
        slug: "dentigo",
        file: "DentigoCaseStudy",
        title: "Dentigo — case study · Turiya Joshi",
        bg: "rgb(245, 243, 234)",
        props: {
            ...home,
            title: "Dentigo",
            role: "UX research · UI/UX design",
            roleNote: "academic project",
            timeline: "12 weeks",
            projectType: "Academic UX project",
            domain: "Healthcare · B2B dental services",
            ...dentigo,
            nextLabel: "Next project",
            nextTitle: "3TFlow",
            nextLink: "../3tflow/",
            showHero: true,
            heroAutoplay: false,
            accent: "rgb(54, 109, 73)",
            accentInk: "rgb(42, 90, 59)",
            tint: "rgb(241, 211, 201)",
            dark: "rgb(36, 41, 47)",
            muted: "rgb(71, 106, 138)",
        },
    },
    {
        slug: "encora",
        file: "EncoraCaseStudy",
        title: "KG Hub (Encora) — case study · Turiya Joshi",
        bg: "rgb(245, 243, 234)",
        css: ".pc-story{grid-template-columns:1.9fr 1fr!important}.pc-stagebox{height:auto!important;aspect-ratio:3/2;padding:10px!important}", // wide desktop screens: a wide stage
        props: {
            ...home,
            ...encora, // title: "KG Hub"
            nextLabel: "Next project",
            nextTitle: "Pip",
            nextLink: "../pip/",
            showHero: true,
            heroAutoplay: false,
            accent: "rgb(79, 82, 214)",
            accentInk: "rgb(62, 65, 184)",
            tint: "rgb(226, 220, 253)",
            dark: "rgb(36, 41, 47)",
            muted: "rgb(74, 90, 134)",
        },
    },
    {
        slug: "pip",
        file: "EncoraCaseStudy", // same case-study layout as Encora
        title: "Pip — case study · Turiya Joshi",
        bg: "rgb(245, 243, 234)",
        props: {
            ...home,
            ...pip,
            nextLabel: "Next project",
            nextTitle: "Lumi",
            nextLink: "../lumi/",
            showHero: true,
            accent: "rgb(124, 77, 230)",
            accentInk: "rgb(94, 52, 190)",
            tint: "rgb(234, 224, 255)",
            dark: "rgb(28, 20, 56)",
            muted: "rgb(78, 66, 140)",
        },
    },
]
