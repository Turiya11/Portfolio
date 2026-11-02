// "Selected work" (case-study cards, same style as the Framer project cards) and "Passion projects"
// (smaller cards that open a detail view). Edit the content here. `scene` is a looping demo from card-scenes.js.
import { mountScene } from "./card-scenes.js?v=25"

// placeholder clip from the Framer project cards, until each project has its own
const OCEAN = {
    video: "https://framerusercontent.com/assets/MLWPbW1dUQawJLhhun3dBwpgJak.mp4",
    poster: "https://framerusercontent.com/images/5ILRvlYXf72kHSVHqpa3snGzjU.jpg",
}

// in order; a new `group` starts a labelled row of cards
const SELECTED = [
    {
        group: "Internships",
        meta: "2026 - Internship · SSK Technologies",
        title: "3TFlow",
        text: "End-to-end flows across 2000+ ITSM screens for 5 user roles — ticket assignment cut from 6 steps to 3, a Reports module, SLA tracking and a design system of 4000+ components.",
        tags: ["ITSM", "Design systems", "Enterprise"],
        href: "work/3tflow/",
        nda: true,
        scene: "tflow",
    },
    {
        meta: "2025 - Internship · Encora",
        title: "KG Hub",
        text: "Knowledge-graph visualisations of biomedical data for clinical decision-making — 5 concepts across 4 data types, tested with 6 users. Shared in a modified form due to an NDA.",
        nda: true,
        tags: ["Data viz", "Healthcare", "Testing"],
        href: "work/encora/",
        scene: "kg",
    },
    {
        group: "Academic projects & research",
        meta: "2026 - Academic research",
        title: "Pip",
        text: "An AR companion that helps design students park their thoughts and come back to them at the right moment. Built on a survey of 46 students, 18 interviews and a recall experiment; prototyped for the web and Meta Quest.",
        tags: ["AR", "Research", "Prototype"],
        href: "work/pip/",
        wide: true,
        scene: "pip",
    },
    {
        meta: "2026 - Academic project",
        title: "Lumi",
        text: "Lumi is a mental health support platform designed to help mothers navigate postpartum emotional challenges through gentle self-awareness, guided emotional expression, and family-centered support systems.",
        tags: ["Mobile", "D2C", "Healthcare"],
        href: "work/lumi/",
        scene: "lumi",
    },
    {
        meta: "2025 - Academic project",
        title: "Dentigo",
        text: "A B2B platform concept connecting dental clinics and labs — restorations, supplies and clinic–lab communication in one transparent flow.",
        tags: ["B2B", "Service design", "Web app"],
        href: "work/dentigo/",
        scene: "dentigo",
    },
]

// passion projects open a detail view; `link` (optional) adds a button to a prototype, repo or video
const PASSION = [
    {
        meta: "AR / VR",
        title: "[AR/VR project]",
        text: "[One line: what the experience is and who it's for.]",
        more: "[A short paragraph: the idea, the platform or headset, what you built, and what you learned.]",
        tags: ["AR", "VR", "[Tool]"],
        ...OCEAN,
    },
    {
        meta: "Side build · AI",
        title: "Meeting-to-Figma agent",
        text: "An MVP AI agent that turns live meetings into Figma design briefs.",
        more: "[A short paragraph: how the agent listens, what it writes into Figma, and what you'd build next.]",
        tags: ["AI", "Agents", "Figma"],
        ...OCEAN,
    },
    {
        meta: "[Category]",
        title: "[Another passion project]",
        text: "[One line on the project.]",
        more: "[A short paragraph on the project.]",
        tags: ["[Tag]", "[Tag]"],
        ...OCEAN,
    },
]

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c])
const media = (p) =>
    p.scene
        ? `<div class="pj-media" data-scene="${esc(p.scene)}"></div>`
        : `<div class="pj-media"><video muted loop playsinline preload="none" poster="${esc(p.poster)}" aria-hidden="true"><source src="${esc(p.video)}" type="video/mp4" /></video></div>`
const tags = (p) => `<ul class="pj-tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`
const body = (p) => `<div class="pj-body"><p class="pj-meta">${esc(p.meta)}${p.nda ? ` <span class="pj-nda">NDA</span>` : ""}</p><h3 class="pj-title">${esc(p.title)}</h3><p class="pj-text">${esc(p.text)}</p>${tags(p)}</div>`

/* ------------------------------ selected work: `wide` cards span the row, the rest pair up ------------------------------ */

const work = document.getElementById("work")
work.querySelector(".pj-grid").innerHTML = SELECTED.map(
    (p) =>
        (p.group ? `<h3 class="pj-group">${esc(p.group)}</h3>` : "") +
        `<a class="pj-card${p.wide ? " is-wide" : ""}" href="${esc(p.href)}" aria-label="${esc(p.title)}${p.nda ? " — under NDA" : ""}: read more">${media(p)}${body(p)}</a>`
).join("")

/* ------------------------------ passion projects: open a detail view ------------------------------ */

const passion = document.getElementById("passion")
passion.querySelector(".pj-grid").innerHTML = PASSION.map(
    (p, i) => `<button class="pj-card is-small" type="button" data-i="${i}" aria-haspopup="dialog">${media(p)}${body(p)}</button>`
).join("")

const dialog = document.getElementById("pj-dialog")
const dialogBody = dialog.querySelector(".pj-dialog__body")
let opener = null
passion.addEventListener("click", (e) => {
    const card = e.target.closest(".pj-card")
    if (!card) return
    const p = PASSION[+card.dataset.i]
    opener = card
    dialogBody.innerHTML = `
      <div class="pj-media"><video muted loop playsinline autoplay poster="${esc(p.poster)}" aria-hidden="true"><source src="${esc(p.video)}" type="video/mp4" /></video></div>
      <p class="pj-meta">${esc(p.meta)}</p>
      <h3 class="pj-title" id="pj-dialog-title">${esc(p.title)}</h3>
      <p class="pj-text">${esc(p.text)}</p>
      ${p.more ? `<p class="pj-text pj-more">${esc(p.more)}</p>` : ""}
      ${tags(p)}
      ${p.link ? `<a class="pj-open" href="${esc(p.link[1])}" target="_blank" rel="noreferrer">${esc(p.link[0])} <span aria-hidden="true">↗</span></a>` : ""}`
    dialog.showModal()
})
const close = () => dialog.close()
dialog.querySelector(".pj-dialog__close").addEventListener("click", close)
dialog.addEventListener("click", (e) => e.target === dialog && close()) // click outside the card
dialog.addEventListener("close", () => {
    dialogBody.innerHTML = ""
    opener?.focus()
})

/* ------------------------------ videos and scenes play only while on screen; cards rise in ------------------------------ */

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
const scenes = new Map()
document.querySelectorAll("[data-scene]").forEach((box) => scenes.set(box.closest(".pj-card"), mountScene(box, box.dataset.scene)))

const io = new IntersectionObserver(
    (entries) => {
        for (const e of entries) {
            const card = e.target
            const v = card.querySelector(":scope > .pj-media > video")
            const scene = scenes.get(card)
            if (e.isIntersecting) {
                card.classList.add("is-in")
                scene?.play()
                if (v && !reduced) v.play().catch(() => {})
            } else {
                scene?.stop()
                v?.pause()
            }
        }
    },
    { threshold: 0.2 }
)
document.querySelectorAll(".pj-grid .pj-card").forEach((c) => io.observe(c))
