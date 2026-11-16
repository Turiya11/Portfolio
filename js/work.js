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
        lock: true, // parked under NDA: the card closes into a glass lock before the NDA page
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
        meta: "Independent concept · Automotive",
        title: "Adaptive Emotional AI Co-Pilot",
        text: "A driver-monitoring experience that notices fatigue and stress early, and answers with calm instead of alarms.",
        tags: ["Automotive", "HMI", "AI"],
        href: "work/copilot/",
        wide: true,
        video: "assets/video/work/cp-centre.mp4", // the centre display fits this card's shape without cropping the UI
        poster: "assets/video/work/cp-centre.jpg",
    },
    {
        meta: "2026 - Academic research",
        title: "Pip",
        text: "A mixed reality companion that helps design students park their thoughts and come back to them at the right moment. Built on a survey of 46 students, 18 interviews and a recall experiment; prototyped for the web and Meta Quest.",
        tags: ["Mixed Reality", "Research", "Prototype"],
        href: "work/pip/",
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
        wide: true, // the odd card out, after Pip and Lumi pair up
        scene: "dentigo",
    },
    {
        group: "Something Fun – A VR experience!",
        meta: "2026 - Academic project",
        title: "Doodleverse",
        text: "A WebXR experience for Meta Quest 3 where children aged 12+ draw with their fingertips, wave a magic wand, and play fetch with the drawing that comes to life.",
        tags: ["VR", "Mixed Reality", "Kids"],
        href: "work/doodleverse/",
        wide: true,
        video: "assets/video/work/dv-hero.mp4",
        poster: "assets/video/work/dv-hero.jpg",
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
        `<a class="pj-card${p.wide ? " is-wide" : ""}" href="${esc(p.href)}"${p.lock ? " data-lock" : ""} aria-label="${esc(p.title)}${p.nda ? " — under NDA" : ""}: read more">${media(p)}${body(p)}</a>`
).join("")

/* ------------------------------ an NDA card: a glass lock appears over it, then grows into the NDA page ------------------------------ */

const LOCK_CSS = `
.nda-veil{position:fixed;inset:0;z-index:200;pointer-events:none;background:rgba(234,243,255,0);backdrop-filter:blur(0);-webkit-backdrop-filter:blur(0)}
.nda-lock{position:fixed;z-index:201;display:grid;place-items:center;border-radius:30px;border:1px solid rgba(255,255,255,.9);background:linear-gradient(150deg,rgba(255,255,255,.78),rgba(255,255,255,.36));backdrop-filter:blur(20px) saturate(170%);-webkit-backdrop-filter:blur(20px) saturate(170%);box-shadow:inset 0 1.5px 0 #fff,inset 0 -1px 0 rgba(255,255,255,.4),0 30px 60px -24px rgba(40,50,120,.45);color:rgb(58,61,170);pointer-events:none}
.nda-lock svg{width:44%;height:44%;overflow:visible}
.nda-lock .shackle{transform-box:fill-box;transform-origin:50% 100%}`
const LOCK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10.5" width="16" height="10.5" rx="2.5"/><path class="shackle" d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.5" r="1.3" fill="currentColor" stroke="none"/></svg>`

function lockThenGo(card) {
    const href = card.href
    const calm = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (calm || !document.body.animate) return (location.href = href)
    if (!document.getElementById("nda-lock-css")) document.head.insertAdjacentHTML("beforeend", `<style id="nda-lock-css">${LOCK_CSS}</style>`)
    const r = card.getBoundingClientRect()
    const size = Math.min(132, r.width * 0.4, r.height * 0.6)
    const veil = document.createElement("div")
    veil.className = "nda-veil"
    const lock = document.createElement("div")
    lock.className = "nda-lock"
    lock.innerHTML = LOCK_SVG
    Object.assign(lock.style, { left: r.left + r.width / 2 - size / 2 + "px", top: r.top + r.height / 2 - size / 2 + "px", width: size + "px", height: size + "px" })
    document.body.append(veil, lock)
    const ease = "cubic-bezier(.2,.85,.25,1)"
    // 1. the page frosts over and the glass lock settles in, shackle open
    veil.animate([{ background: "rgba(234,243,255,0)", backdropFilter: "blur(0px)", webkitBackdropFilter: "blur(0px)" }, { background: "rgba(234,243,255,.35)", backdropFilter: "blur(14px)", webkitBackdropFilter: "blur(14px)" }], { duration: 420, easing: ease, fill: "forwards" })
    lock.animate([{ opacity: 0, transform: "scale(.6)" }, { opacity: 1, transform: "scale(1)" }], { duration: 420, easing: "cubic-bezier(.3,1.4,.5,1)", fill: "forwards" })
    // 2. the shackle clicks shut
    lock.querySelector(".shackle").animate([{ transform: "translateY(-3px) rotate(-14deg)" }, { transform: "translateY(-3px) rotate(-14deg)", offset: 0.55 }, { transform: "none" }], { duration: 760, easing: ease, fill: "forwards" })
    // 3. the lock grows into the page, which takes over from the same glass
    const grow = lock.animate(
        [
            { left: lock.style.left, top: lock.style.top, width: size + "px", height: size + "px", borderRadius: "30px" },
            { left: "0px", top: "0px", width: innerWidth + "px", height: innerHeight + "px", borderRadius: "0px" },
        ],
        { duration: 460, delay: 820, easing: "cubic-bezier(.7,0,.25,1)", fill: "forwards" }
    )
    lock.querySelector("svg").animate([{ opacity: 1 }, { opacity: 0.85 }], { duration: 460, delay: 820, fill: "forwards" })
    try {
        sessionStorage.setItem("nda-lock", "1")
    } catch (e) {}
    grow.finished.then(() => (location.href = href)).catch(() => (location.href = href))
}
work.addEventListener("click", (e) => {
    const card = e.target.closest("a.pj-card[data-lock]")
    if (!card || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    lockThenGo(card)
})
// coming back with the browser's back button: clear the lock left over from leaving
window.addEventListener("pageshow", (e) => {
    if (e.persisted) document.querySelectorAll(".nda-veil,.nda-lock").forEach((n) => n.remove())
})

/* ------------------------------ passion projects: open a detail view ------------------------------ */

// parked: the section is commented out in index.html, so all of this waits until it's back
const passion = document.getElementById("passion")
if (passion)
    passion.querySelector(".pj-grid").innerHTML = PASSION.map(
        (p, i) => `<button class="pj-card is-small" type="button" data-i="${i}" aria-haspopup="dialog">${media(p)}${body(p)}</button>`
    ).join("")

const dialog = document.getElementById("pj-dialog")
const dialogBody = dialog.querySelector(".pj-dialog__body")
let opener = null
passion?.addEventListener("click", (e) => {
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
