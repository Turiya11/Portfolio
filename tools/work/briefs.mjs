// What each case-study page says. Keep it short: the videos carry the story.
// Research sticky notes come from content.mjs. Numbers are only the ones the projects actually produced.
import { dentigo as dentigoSource, encora as kgSource, pip as pipSource, lumiStickies } from "./content.mjs"

const clip = (id, label) => ({ src: `../../assets/video/work/${id}.mp4`, poster: `../../assets/video/work/${id}.jpg`, label })
const fr = (id, ext = "png") => `https://framerusercontent.com/images/${id}.${ext}`
const site = (p) => `../../assets/images/${p}`

const WALKTHROUGH = "Prototype walkthroughs of the real screens, with sample data."

export const lumi = {
    title: "Lumi.",
    meta: "User research · Interaction design · 12 weeks · Academic project",
    headline: "Rethinking postpartum care as a system of support.",
    accent: "rgb(200, 84, 110)",
    note: "Lumi is a design concept. It does not diagnose, treat or replace professional care, and it has not been clinically validated.",
    link: {
        label: "Open the prototype in Figma ↗",
        href: "https://www.figma.com/proto/ej8YddthuaGL8rEengyDms/UX-Studio-Sem6?node-id=56-4650&viewport=-53%2C-1621%2C0.29&t=1dSYAobHJgRg7rOF-1&scaling=contain&content-scaling=fixed&starting-point-node-id=56%3A4650&page-id=45%3A16",
    },
    hero: { ...clip("lm-role", "Choosing a role in Lumi, then the mother's home screen"), phone: true },
    brief: {
        context: "A 12-week academic project in postpartum mental health: one app for a new mother, her partner and her family.",
        background: "Postpartum depression is treatable, but stigma and low mental-health literacy delay care. Mothers stay quiet and families miss the signs.",
        impact: [
            { n: "3", l: "roles in one shared experience" },
            { n: "5", l: "principles tied to research" },
            { n: "1", l: "hi-fi prototype" },
        ],
        impactNote: "A concept prototype. Effects on wellbeing have not been measured.",
    },
    understanding: {
        quote: "The problem isn't absence of support. It's absence of emotional understanding.",
        method: "Interviews with mothers, fathers and caregivers, plus doctors, psychiatrists and research papers, grouped by card sorting.",
        ...{ stickiesTitle: lumiStickies.stickiesTitle, stickies: lumiStickies.stickies },
    },
    didNote: WALKTHROUGH,
    did: [
        {
            lead: "For the mother:",
            text: "name a feeling in a few taps, and get validated, not diagnosed.",
            phones: true,
            clips: [clip("lm-mood", "Check in"), clip("lm-check", "Should I seek help?"), clip("lm-journal", "A private journal")],
        },
        {
            lead: "For the partner:",
            text: "understand before fixing, with clear actions and the right words.",
            phones: true,
            clips: [clip("lm-partner", "What can I do?"), clip("lm-flowers", "A gesture of love"), clip("lm-say", "What do I say?")],
        },
        {
            lead: "For the family:",
            text: "a shared, non-clinical picture, and small ways to show up.",
            phones: true,
            clips: [clip("lm-family", "Send an affirmation"), clip("lm-learn", "Understanding modern PPD"), clip("lm-calls", "Daily calls")],
        },
    ],
    process: [
        { label: "Persona: the silent struggler", image: fr("MSrWLnItMvvUOAk2hFNjsQ7NVVk") },
        { label: "Persona: the hyper-responsible fixer", image: fr("rwT14cOeezON1u91oCwXmVk5GA") },
        { label: "Persona: the well-meaning minimizer", image: fr("QVwbSs0yhqbKAkgDLoCskZX7RM") },
        { label: "Storyboard: 3AM, alone", image: fr("RtBHy475FWRwisQWQLgLNhsSkqU") },
        { label: "Storyboard: Lumi notices the pattern", image: fr("fLjlXF6wH4pwFW4EvhjNjKLzd4I") },
        { label: "Storyboard: family understanding begins", image: fr("wijwbxWPIqKdDPTgOe1iqki4vg") },
    ],
    reflection: [
        { label: "What shaped it", text: "A private journal beside opt-in check-ins, and a pattern notice that points to people, not a condition." },
        { label: "The limits", text: "A 12-week concept with no clinical validation. The guidance copy is illustrative." },
        { label: "What I'd do next", text: "Test check-ins and the pattern notice with mothers, under ethical oversight and clinical input." },
    ],
}

export const dentigo = {
    title: "Dentigo",
    meta: "UX research · UI/UX design · 12 weeks · Academic project",
    headline: "One place for every dental case.",
    accent: "rgb(42, 90, 59)",
    note: dentigoSource.ovNote,
    ratio: 1524 / 986,
    hero: { src: "../../assets/video/work/dentigo-explainer.mp4", poster: "../../assets/video/work/dentigo-explainer.jpg", label: "Dentigo explainer", sound: true, ratio: 16 / 9 },
    brief: {
        context: "A 12-week academic project in B2B healthcare, for dental clinics and the specialised labs they work with in India.",
        background: "Restorations and supplies run on calls, paper slips, WhatsApp and email. Instructions arrive incomplete and nobody can see where a case is.",
        impact: [
            { n: "6", l: "workflow stages mapped" },
            { n: "5", l: "user flows" },
            { n: "9", l: "hi-fi screens" },
        ],
        impactNote: "A concept. Whether it reduces remakes is still untested.",
    },
    understanding: {
        quote: "Clinics and labs run on fragmented, manual workflows, and small miscommunications turn into remakes and delays.",
        method: "User interviews and surveys, secondary research and a competitive analysis, affinity-mapped.",
        stickiesTitle: dentigoSource.stickiesTitle,
        stickies: dentigoSource.stickies,
    },
    didNote: WALKTHROUGH,
    did: [
        { lead: "One hub for every case:", text: "active orders, pending actions and scheduled deliveries at a glance.", clips: [clip("dg-hub", "Dentigo dashboard, moving on to Browse Labs")] },
        { lead: "Find trusted labs:", text: "ratings, specialties, delivery times and on-time rates.", clips: [clip("dg-labs", "Browsing labs and requesting a quote")] },
        { lead: "Order without the guesswork:", text: "a guided form with AI lab recommendations and clear turnaround times.", clips: [clip("dg-order", "Filling in a new lab order")] },
        { lead: "Compare side by side:", text: "pricing, delivery, performance, materials and warranty.", clips: [clip("dg-compare", "Comparing three labs")] },
        { lead: "Track it like a package:", text: "status, ETA and one-tap messaging for every active case.", clips: [clip("dg-track", "Tracking active orders")] },
        { lead: "Check before approving:", text: "measurements, annotations and layers on the digital scan.", clips: [clip("dg-viewer", "Reviewing a case in the 3D viewer")] },
    ],
    process: [
        { label: "Stakeholder map", image: fr("600AM7vuVugdK4bghpSttVSms") },
        { label: "Core workflow", image: fr("r0TJpemDNu7JEjdSuoO3EFpcXH8") },
        { label: "Storyboard: a complex crown", image: fr("uXPJgRLEWSqCP4qHKmhIWdup4Ek") },
        { label: "Storyboard: a new clinic", image: fr("V01SGxeBv0uyPg1sregW9INR50o") },
        { label: "Sitemap", image: fr("ImQHPo0mCnfM7uKxW0FLOqViNU") },
        { label: "User flow: place an order", image: fr("a6jnaF4nBxwKrkxtFkJlS9sMVg") },
    ],
    reflection: [
        { label: "What it taught me", text: "The problem is coordination across people, not one screen." },
        { label: "Still untested", text: "Whether structured orders reduce remakes, and whether comparison builds enough trust to switch labs." },
        { label: "What I'd do next", text: "Put the flows in front of real clinics and labs, and check the fit with how they work today." },
    ],
}

export const kg = {
    title: "KG Hub",
    meta: "UX design intern · Encora Inc. · Feb – May 2025",
    headline: "From data to discovery, with biomedical visualisation powered by a knowledge graph.",
    accent: "rgb(98, 58, 200)",
    note: "This project has been modified due to an NDA. The product is presented as KG Hub, proprietary names are changed and the screens are redesigned with sample data. Happy to walk through the work at itsturiyajoshi11@gmail.com.",
    ratio: 1.5,
    hero: clip("kg-journey", "One investigation in KG Hub, from a research question to a shared project"),
    brief: {
        context: "My internship at Encora, designing interactive visualisations for clinical researchers. 5 concepts across 4 data types.",
        background: "Patient, genetic and trial data live in separate tools. The value only appears when it is connected, and current tools don't connect it.",
        impact: [
            { n: "~30%", l: "faster data interpretation" },
            { n: "~20%", l: "fewer misreads" },
            { n: "6", l: "users in testing" },
        ],
        impactNote: "Measured on the internship prototypes and presented to 10+ stakeholders.",
    },
    understanding: {
        quote: "Researchers have the data, but no single place to see how it connects.",
        method: "Secondary research, a competitive analysis of ten platforms, two personas with journey maps, and team dot voting.",
        stickiesTitle: kgSource.stickiesTitle,
        stickies: kgSource.stickies,
    },
    didNote: WALKTHROUGH,
    did: [
        { lead: "Ask in plain language:", text: "start from a research question, then tighten it with clauses.", clips: [clip("kg-query", "Building a query and running it")] },
        { lead: "See how it connects:", text: "results open as a graph, with sources behind every relation.", clips: [clip("kg-graph", "Exploring query results")] },
        { lead: "Trace the path:", text: "find how two entities connect, hop by hop, with evidence.", clips: [clip("kg-paths", "Comparing paths between EGFR and Rash")] },
        { lead: "Compare graphs:", text: "shared and unique entities, side by side.", clips: [clip("kg-compare", "Comparing two knowledge graphs")] },
        { lead: "Save the finding:", text: "an insight keeps its graph snapshot and its sources.", clips: [clip("kg-save", "Saving a selection as an insight")] },
        { lead: "Work on the same graph:", text: "threaded comments on entities, and sharing by role.", clips: [clip("kg-collab", "Commenting on the graph and sharing the project")] },
    ],
    process: [
        { label: "Research trends", image: site("kg/research.jpg") },
        { label: "Competitive analysis", image: fr("0kE3ZMhLpUn3pFdl20XnA53LSsE") },
        { label: "Personas", image: fr("atZX13o6Os8KOxRgUnWJoeySSPQ") },
        { label: "Journey map", image: fr("Ubw2vjh1bItWdlQQA7rULzOAVSg") },
        { label: "Dot voting", image: fr("WCL7cM5MbJxZChXgeW6QGnFC9c") },
        { label: "Flow map", image: site("kg/flow.jpg") },
    ],
    reflection: [
        { label: "Evidence first", text: "Evidence belongs at the point of investigation, so every relation links back to its sources." },
        { label: "Honest data", text: "A comparison shows what each graph contains, not which is clinically better. No invented confidence scores." },
        { label: "What testing showed", text: "With 6 users on the internship prototypes, interpretation got faster and misreads dropped." },
    ],
}

export const pip = {
    title: "Pip",
    meta: "UX research · AR interaction design · 2026 · Academic research",
    headline: pipSource.ovHeadline,
    accent: "rgb(104, 62, 214)",
    note: pipSource.ovNote,
    ratio: 16 / 9,
    hero: { src: "../../assets/video/pip-walkthrough.mp4", poster: "../../assets/video/work/pip-hero.jpg", label: "Pip's Thought Orbit, the web prototype" },
    brief: {
        context: "Academic research on prospective memory: remembering to act at the right moment, with design students aged 18 to 25.",
        background: "Students hold several intentions at once, and they slip anyway. More reminders only add to the overload.",
        impact: [
            { n: "46", l: "students surveyed" },
            { n: "18", l: "interviews" },
            { n: "2", l: "working AR prototypes" },
        ],
        impactNote: "Not yet tested with users.",
    },
    understanding: {
        quote: "Students don't lack places to store intentions. They lack a way to bring the right one back when they can act on it.",
        method: "A survey of 46 students, 18 interviews, a clutter experiment with 4 participants and a scan of eight Reddit threads.",
        stickiesTitle: pipSource.stickiesTitle,
        stickies: pipSource.stickies,
    },
    didNote: "The first two are walkthroughs of the design screens. The rest are recorded from the working prototypes: Three.js with WebXR, and Meta Quest with hand tracking.",
    did: [
        { lead: "Test the structure first:", text: "capture, the orbit, the card and the AR check-in, sketched as mobile flows.", clips: [clip("pip-lofi", "Moving through the lo-fi wireframes")] },
        { lead: "From opening to offloading:", text: "seven steps, from choosing your Pip to parking a new thought.", clips: [clip("pip-final", "Moving through the hi-fi flow")] },
        { lead: "Capture in seconds:", text: "type a thought and park it, without organising it.", clips: [clip("pip-capture", "Parking a thought in the web prototype")] },
        { lead: "Step into the space:", text: "Pip appears in the room, with thoughts orbiting as glowing orbs.", clips: [clip("pip-step-in", "Pip in passthrough AR on Meta Quest")] },
        { lead: "Focus on one thing:", text: "grab an orb and drop it into the ring. Everything else dims.", clips: [clip("pip-ring", "Dropping an orb into the ring with hand tracking")] },
        { lead: "Find the first step:", text: "stickies, sub-tasks and Break Down on a glass board.", clips: [clip("pip-board", "Adding a sticky on the thinking board")] },
    ],
    process: [
        { label: "Seven themes", image: site("pip/slide-09.jpg") },
        { label: "Three ways of losing a thought", image: site("pip/slide-11.jpg") },
        { label: "Intention journey", image: site("pip/slide-13.jpg") },
        { label: "Six directions compared", image: site("pip/slide-15.jpg") },
        { label: "Experience architecture", image: site("pip/slide-17.jpg") },
        { label: "Insights and opportunity areas", image: site("pip/slide-14.jpg") },
    ],
    reflection: [
        { label: "A longer study", text: "Six to eight weeks comparing Pip in AR, Pip in 2D, a phone notification and a sticky note." },
        { label: "Smaller tests", text: "A one-week Wizard-of-Oz Check-in Buddy with five or six students." },
        { label: "The prototype", text: "Voice capture, search and more than three active thoughts." },
    ],
}
