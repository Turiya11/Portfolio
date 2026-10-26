// The garden footer — a plain-JS port of the Framer "GardenFooter".
// A pastel cloud sky, hills and glass shapes that drift with scroll, geometric flowers that grow in,
// three blue butterflies that say thank you, and a glass form: a visitor's note drops a seed that
// sprouts into a flower. Notes are kept in the visitor's own browser (nothing is sent anywhere).
import { mountButterflies } from "./butterflies.js"

const root = document.getElementById("garden")
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches

const STORE = "garden-blooms-v1"
const MAX_BLOOMS = 24
const HEAD = 64 // a visitor's flower head (px)
const PALETTE = ["#6C63E8", "#8C8DF0", "#A7B6F7", "#C9C2F8", "#8EC5FF", "#E58FE0"]

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c])

function makeRng(seed) {
    let a = seed >>> 0
    return () => {
        a += 0x6d2b79f5
        let t = a
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

// five flower heads, same shapes as Framer
function headArt(type, color) {
    const c = "#FFFFFF"
    const svg = (body) => `<svg viewBox="0 0 100 100" aria-hidden="true">${body}</svg>`
    switch (type % 5) {
        case 0:
            return svg(Array.from({ length: 8 }, (_, k) => `<ellipse cx="50" cy="22" rx="11" ry="20" fill="${color}" transform="rotate(${k * 45} 50 50)"/>`).join("") + `<circle cx="50" cy="50" r="11" fill="${c}"/>`)
        case 1:
            return svg(`<path d="M16 12 L34 34 L50 6 L66 34 L84 12 L84 56 C84 80 66 92 50 92 C34 92 16 80 16 56 Z" fill="${color}"/>`)
        case 2:
            return svg(`<circle cx="50" cy="50" r="44" fill="${color}"/>` + [[34, 36], [62, 32], [46, 54], [70, 58], [30, 62]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="${c}" opacity="0.85"/><circle cx="${x}" cy="${y}" r="1.8" fill="${color}"/>`).join(""))
        case 3:
            return svg([[34, 34], [66, 34], [34, 66], [66, 66]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="24" fill="${color}"/>`).join("") + `<circle cx="50" cy="50" r="14" fill="${c}"/><circle cx="50" cy="50" r="7" fill="${color}"/>`)
        default:
            return svg(Array.from({ length: 6 }, (_, k) => `<circle cx="${50 + 28 * Math.cos((k * Math.PI) / 3)}" cy="${50 + 28 * Math.sin((k * Math.PI) / 3)}" r="19" fill="${color}"/>`).join("") + `<circle cx="50" cy="50" r="14" fill="${c}"/><circle cx="50" cy="50" r="6" fill="${color}"/>`)
    }
}

const leaf = (flip, bottom) =>
    `<span class="gf-leaf${flip ? " is-flip" : ""}" style="bottom:${bottom}"><svg viewBox="0 0 50 30" aria-hidden="true"><path d="M0 20 C 10 0, 40 0, 50 14 C 38 28, 10 30, 0 20 Z"/></svg></span>`

// a stem with two leaves and a head; --w head size, --h stem height
const flowerArt = (type, color, w, h, sway) => `
  <span class="gf-clip" style="--w:${w}px;--total:${h + w}px">
    <span class="gf-grow"><span class="gf-sway" style="animation-duration:${sway}s">
      <i class="gf-stem"></i>${leaf(true, "17%")}${leaf(false, "35%")}
      <span class="gf-head"><span class="gf-pop">${headArt(type, color)}</span></span>
    </span></span>
  </span>`

/* ------------------------------ ambient flowers: grow in when the footer comes into view ------------------------------ */

const bed = root.querySelector(".gf-bed")
{
    const r = makeRng(31)
    const n = 9
    let html = ""
    for (let i = 0; i < n; i++) {
        const x = Math.min(0.96, Math.max(0.04, (i + 0.5) / n + (r() - 0.5) * 0.05))
        const h = 46 + r() * 64
        const type = (i * 2 + Math.floor(r() * 3)) % 5
        const color = PALETTE[Math.floor(r() * PALETTE.length)]
        html += `<div class="gf-flower" style="left:${x * 100}%;--delay:${0.1 + i * 0.12}s" aria-hidden="true">${flowerArt(type, color, 52, h, 3.6 + r() * 2.4)}</div>`
    }
    bed.insertAdjacentHTML("beforeend", html)
}

/* ------------------------------ soil specks ------------------------------ */
{
    const r = makeRng(77)
    root.querySelector(".gf-specks").innerHTML = Array.from({ length: 90 }, () => `<circle cx="${(r() * 1440).toFixed(0)}" cy="${(34 + r() * 80).toFixed(0)}" r="${(0.8 + r() * 2.6).toFixed(1)}" opacity="${(0.3 + r() * 0.5).toFixed(2)}"/>`).join("")
}

/* ------------------------------ grow in + scroll drift ------------------------------ */

new IntersectionObserver(
    ([e], io) => {
        if (!e.isIntersecting) return
        root.classList.add("is-grown")
        io.disconnect()
    },
    { threshold: 0.25 }
).observe(root)

// --p: 0 when the footer's top meets the bottom of the screen, 1 when its bottom does (hills, shapes and heading drift with it)
let raf = 0
const onScroll = () => {
    if (raf) return
    raf = requestAnimationFrame(() => {
        raf = 0
        const r = root.getBoundingClientRect()
        const p = Math.min(1, Math.max(0, (innerHeight - r.top) / Math.max(1, r.height)))
        root.style.setProperty("--p", p.toFixed(3))
    })
}
if (!reduced) {
    addEventListener("scroll", onScroll, { passive: true })
    addEventListener("resize", onScroll)
    onScroll()
} else root.style.setProperty("--p", 1)

/* ------------------------------ butterflies that say thank you ------------------------------ */

const compact = innerWidth < 720
mountButterflies(root.querySelector(".gf-butterflies"), {
    count: 3,
    padding: 24,
    spots: compact
        ? [{ ox: 20, oy: 63, size: 36 }, { ox: 78, oy: 58, size: 34 }, { ox: 50, oy: 68, size: 32 }]
        : [{ ox: 13, oy: 36, size: 44 }, { ox: 85, oy: 30, size: 38 }, { ox: 24, oy: 68, size: 32 }],
    details: [{ tag: "A little note", title: "Thank you for your time", detail: "Hope something here sparked an idea." }],
})

/* ------------------------------ the form: a note becomes a flower ------------------------------ */

const form = root.querySelector(".gf-form")
const note = form.querySelector("textarea")
const nameIn = form.querySelector("input")
const status = form.querySelector(".gf-status")
const clearBtn = form.querySelector(".gf-clear")
const hint = root.querySelector(".gf-empty")

let blooms = []
try {
    const saved = JSON.parse(localStorage.getItem(STORE) || "[]")
    if (Array.isArray(saved)) blooms = saved.slice(-MAX_BLOOMS)
} catch {}
const save = () => {
    try {
        localStorage.setItem(STORE, JSON.stringify(blooms))
    } catch {}
}

function pickX() {
    let best = 0.5, bestD = -1
    for (let i = 0; i < 28; i++) {
        const c = 0.06 + Math.random() * 0.88
        const d = blooms.length ? Math.min(...blooms.map((b) => Math.abs(b.x - c))) : 1
        if (d > bestD) (bestD = d), (best = c)
    }
    return best
}

function renderBloom(b, fall) {
    const side = b.x < 0.18 ? "left" : b.x > 0.82 ? "right" : "center"
    const el = document.createElement("div")
    el.className = `gf-bloom${fall ? " is-fresh" : ""}`
    el.style.cssText = `left:${b.x * 100}%;--fall:${fall || 0}px;--total:${b.h + HEAD}px;--hh:${b.h}px`
    el.innerHTML = `
      ${fall ? `<span class="gf-seed" aria-hidden="true"></span><span class="gf-ripple" aria-hidden="true"></span>` : ""}
      <span aria-hidden="true">${flowerArt(b.type, b.color, HEAD, b.h, 3.4 + (b.h % 3))}</span>
      <span class="gf-mound" aria-hidden="true"></span>
      <button class="gf-hit" type="button" aria-label="A note from ${esc(b.name || "a visitor")}: ${esc(b.msg)}"></button>
      <span class="gf-card gf-card--${side}" role="tooltip">
        <span class="gf-pill" style="--c:${b.color}"><i></i>A thought</span>
        <span class="gf-card__msg">${esc(b.msg)}</span>
        <span class="gf-card__by">${b.name ? `- ${esc(b.name)}` : "A kind visitor"}</span>
      </span>`
    const hit = el.querySelector(".gf-hit")
    hit.addEventListener("pointerenter", (e) => e.pointerType === "mouse" && el.classList.add("is-open"))
    hit.addEventListener("pointerleave", (e) => e.pointerType === "mouse" && el.classList.remove("is-open"))
    hit.addEventListener("focus", () => el.classList.add("is-open"))
    hit.addEventListener("blur", () => el.classList.remove("is-open"))
    hit.addEventListener("click", () => el.classList.toggle("is-open"))
    bed.append(el)
    return el
}

const sync = () => {
    hint.hidden = blooms.length > 0
    clearBtn.hidden = blooms.length === 0
}
blooms.forEach((b) => renderBloom(b, 0))
sync()

let statusTimer = 0
const say = (text, accent) => {
    clearTimeout(statusTimer)
    status.textContent = text
    status.classList.toggle("is-accent", !!accent)
    if (accent) statusTimer = setTimeout(() => say(`${note.value.length}/200`), 3600)
}
note.addEventListener("input", () => {
    form.classList.remove("is-nudge")
    say(`${note.value.length}/200`)
})
note.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) (e.preventDefault(), form.requestSubmit())
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const text = note.value.trim().slice(0, 200)
    if (!text) {
        form.classList.remove("is-nudge")
        void form.offsetWidth
        form.classList.add("is-nudge")
        say("Write a thought first, then plant it.", true)
        note.focus()
        return
    }
    const b = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        msg: text,
        name: nameIn.value.trim().slice(0, 40),
        x: pickX(),
        type: Math.floor(Math.random() * 5),
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        h: 110 + Math.random() * 120,
    }
    blooms = [...blooms, b].slice(-MAX_BLOOMS)
    save()
    // the seed falls from under the form to the ground
    const fall = reduced ? 0 : Math.max(140, bed.getBoundingClientRect().bottom - form.getBoundingClientRect().bottom)
    const el = renderBloom(b, fall)
    while (bed.querySelectorAll(".gf-bloom").length > MAX_BLOOMS) bed.querySelector(".gf-bloom").remove()
    note.value = ""
    sync()
    say("Seed sown. Thank you for your time.", true)
    setTimeout(() => el.classList.add("is-open"), reduced ? 150 : 2700)
    setTimeout(() => el.classList.remove("is-open"), reduced ? 4500 : 7600)
})

clearBtn.addEventListener("click", () => {
    blooms = []
    save()
    bed.querySelectorAll(".gf-bloom").forEach((el) => el.remove())
    sync()
})
