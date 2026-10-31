// "Selected work" (case-study cards, same style as the Framer project cards) and "Passion projects"
// (smaller cards that open a detail view). Edit the content here; swap `video` / `poster` for each project's own.

// placeholder clip from the Framer project cards, until each project has its own
const OCEAN = {
    video: "https://framerusercontent.com/assets/MLWPbW1dUQawJLhhun3dBwpgJak.mp4",
    poster: "https://framerusercontent.com/images/5ILRvlYXf72kHSVHqpa3snGzjU.jpg",
}

const SELECTED = [
    {
        meta: "2026 - Academic project",
        title: "Lumi",
        text: "Lumi is a mental health support platform designed to help mothers navigate postpartum emotional challenges through gentle self-awareness, guided emotional expression, and family-centered support systems.",
        tags: ["Mobile", "D2C", "Healthcare"],
        href: "work/lumi/",
        ...OCEAN,
    },
    {
        meta: "2025 - Internship · Encora",
        title: "Encora",
        text: "Interactive biomedical data visualisations for clinical decision-making — 5 concepts across 4 data types, tested with 6 users.",
        tags: ["Data viz", "Healthcare", "Testing"],
        href: "work/encora/",
        ...OCEAN,
    },
    {
        meta: "2025 - Academic project",
        title: "Dentigo",
        text: "A B2B platform concept connecting dental clinics and labs — restorations, supplies and clinic–lab communication in one transparent flow.",
        tags: ["B2B", "Service design", "Web app"],
        href: "work/dentigo/",
        ...OCEAN,
    },
    {
        meta: "2026 - Internship · SSK Technologies",
        title: "3TFlow",
        text: "End-to-end flows across 2000+ ITSM screens for 5 user roles — ticket assignment cut from 6 steps to 3, a Reports module, SLA tracking and a design system of 4000+ components.",
        tags: ["ITSM", "Design systems", "Enterprise"],
        href: "work/3tflow/",
        ...OCEAN,
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
    `<div class="pj-media"><video muted loop playsinline preload="none" poster="${esc(p.poster)}" aria-hidden="true"><source src="${esc(p.video)}" type="video/mp4" /></video></div>`
const tags = (p) => `<ul class="pj-tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`
const body = (p) => `<div class="pj-body"><p class="pj-meta">${esc(p.meta)}</p><h3 class="pj-title">${esc(p.title)}</h3><p class="pj-text">${esc(p.text)}</p>${tags(p)}</div>`

/* ------------------------------ selected work: wide, two halves, wide … ------------------------------ */

const work = document.getElementById("work")
work.querySelector(".pj-grid").innerHTML = SELECTED.map((p, i) => {
    const wide = i % 3 === 0
    return `<a class="pj-card${wide ? " is-wide" : ""}" href="${esc(p.href)}" aria-label="${esc(p.title)} — read the case study">${media(p)}${body(p)}</a>`
}).join("")

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

/* ------------------------------ videos play only while on screen; cards rise in ------------------------------ */

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
const io = new IntersectionObserver(
    (entries) => {
        for (const e of entries) {
            const card = e.target
            const v = card.querySelector("video")
            if (e.isIntersecting) {
                card.classList.add("is-in")
                if (!reduced) v.play().catch(() => {})
            } else v.pause()
        }
    },
    { threshold: 0.2 }
)
document.querySelectorAll(".pj-grid .pj-card").forEach((c) => io.observe(c))
