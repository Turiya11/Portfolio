import { mountButterflies } from "./butterflies.js"

// Hero: paper by default; look out of the window and the sky appears at the visitor's
// real time of day. A thin bar on the right lets you pick another time, or go back to "auto".
// All colour animation is done by CSS (registered custom properties) — this script only
// sets values when something changes, never per frame.

const STOPS = [
    { t: 0, name: "Dawn", minutes: 370, top: "#7F8BD0", mid: "#C9AEDF", low: "#FFD3C4", lit: "#FFF0F1", shade: "#B9A3D9", haze: "#FFC9B5", sun: "#FFDDBD", sunX: 18, sunY: 84, glow: 0.75, moon: 0, stars: 0.12, ink: "#221A38", soft: "#4A3F66", accent: "#7046C8" },
    { t: 0.22, name: "Day", minutes: 690, top: "#A6B0F1", mid: "#CBC5F4", low: "#F1EAFB", lit: "#FFFFFF", shade: "#C6BFEE", haze: "#FFFFFF", sun: "#FFFFFF", sunX: 74, sunY: 14, glow: 0.55, moon: 0, stars: 0, ink: "#1D1932", soft: "#4D4870", accent: "#5A46C6" },
    { t: 0.45, name: "Golden hour", minutes: 1000, top: "#96A0E2", mid: "#E4C1D8", low: "#FFE0B6", lit: "#FFF3DF", shade: "#D6A8C4", haze: "#FFD8A0", sun: "#FFE6A8", sunX: 80, sunY: 58, glow: 0.85, moon: 0, stars: 0, ink: "#281A33", soft: "#5A4560", accent: "#8A3CA6" },
    { t: 0.65, name: "Sunset", minutes: 1120, top: "#4D56A5", mid: "#C579AD", low: "#FF9E7C", lit: "#FFBA9E", shade: "#8A5A9E", haze: "#FF8C6B", sun: "#FFB27A", sunX: 70, sunY: 90, glow: 1, moon: 0, stars: 0.05, ink: "#24153A", soft: "#47294F", accent: "#4B2A8F" },
    { t: 0.82, name: "Dusk", minutes: 1170, top: "#262A65", mid: "#645496", low: "#D2869F", lit: "#C69AC4", shade: "#4A3E7A", haze: "#E28AA0", sun: "#FF9C8E", sunX: 66, sunY: 106, glow: 0.45, moon: 0.35, stars: 0.55, ink: "#F7F2FF", soft: "#DCD3F2", accent: "#FFC6DA" },
    { t: 1, name: "Night", minutes: 1380, top: "#0D1033", mid: "#222759", low: "#43397A", lit: "#7C76B6", shade: "#2B2A5C", haze: "#5B4B95", sun: "#FF9C8E", sunX: 64, sunY: 120, glow: 0, moon: 1, stars: 1, ink: "#F4F1FF", soft: "#C9C3EA", accent: "#BBA9FF" },
]

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const hex = (c) => {
    const n = parseInt(c.slice(1), 16)
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const mix = (a, b, k) => {
    const x = hex(a)
    const y = hex(b)
    return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * k)).join(" ")})`
}

function skyAt(t) {
    t = clamp(t, 0, 1)
    let i = 0
    while (i < STOPS.length - 2 && t > STOPS[i + 1].t) i++
    const a = STOPS[i]
    const b = STOPS[i + 1]
    const k = clamp((t - a.t) / (b.t - a.t), 0, 1)
    const out = { name: k < 0.5 ? a.name : b.name }
    for (const key of Object.keys(a)) {
        if (key === "name" || key === "t") continue
        out[key] = typeof a[key] === "number" ? a[key] + (b[key] - a[key]) * k : mix(a[key], b[key], k)
    }
    return out
}

// local clock -> position on the bar (late night and small hours read as "Night")
function timeToT(date = new Date()) {
    const m = date.getHours() * 60 + date.getMinutes()
    if (m < STOPS[0].minutes || m >= STOPS[STOPS.length - 1].minutes) return 1
    let i = 0
    while (m > STOPS[i + 1].minutes) i++
    const a = STOPS[i]
    const b = STOPS[i + 1]
    return a.t + ((m - a.minutes) / (b.minutes - a.minutes)) * (b.t - a.t)
}

function clockLabel(minutes) {
    const m = Math.round(minutes) % 1440
    const h = Math.floor(m / 60)
    return `${h % 12 || 12}:${String(m % 60).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`
}

/* ------------------------------ elements ------------------------------ */

const hero = document.getElementById("hero")
const sky = hero.querySelector(".sky")
const windowBtn = hero.querySelector(".window__button")
const track = hero.querySelector(".timebar__track")
const autoBtn = hero.querySelector(".timebar__auto")
const stopsList = hero.querySelector(".timebar__stops")
const clockEl = hero.querySelector(".timebar__clock")
const nameEl = hero.querySelector(".timebar__name")

let auto = true
let t = timeToT()

for (const s of STOPS) {
    const li = document.createElement("li")
    li.style.setProperty("--t", s.t)
    const b = document.createElement("button")
    b.type = "button"
    b.textContent = s.name
    b.tabIndex = -1
    b.addEventListener("click", () => setT(s.t, { manual: true }))
    li.append(b)
    stopsList.append(li)
}

/* ------------------------------ painting ------------------------------ */

function paint() {
    const s = skyAt(t)
    const st = hero.style
    st.setProperty("--sky-top", s.top)
    st.setProperty("--sky-mid", s.mid)
    st.setProperty("--sky-low", s.low)
    st.setProperty("--cloud-lit", s.lit)
    st.setProperty("--cloud-shade", s.shade)
    st.setProperty("--haze", s.haze)
    st.setProperty("--sun", s.sun)
    st.setProperty("--sun-x", `${s.sunX}%`)
    st.setProperty("--sun-y", `${s.sunY}%`)
    st.setProperty("--glow", s.glow)
    st.setProperty("--moon", s.moon)
    st.setProperty("--stars", s.stars)
    st.setProperty("--sky-ink", s.ink)
    st.setProperty("--sky-soft", s.soft)
    st.setProperty("--sky-accent", s.accent)
    document.documentElement.style.setProperty("--logo-ink", s.ink)
    track.style.setProperty("--pos", t)
    hero.querySelector(".timebar__thumb").style.setProperty("--pos", t)

    const label = auto ? clockLabel(new Date().getHours() * 60 + new Date().getMinutes()) : clockLabel(s.minutes)
    clockEl.textContent = auto ? `now · ${label}` : label
    nameEl.textContent = s.name
    track.setAttribute("aria-valuenow", String(Math.round(t * 100)))
    track.setAttribute("aria-valuetext", `${label}, ${s.name}${auto ? " (your local time)" : ""}`)
    autoBtn.setAttribute("aria-pressed", String(auto))
}

function setT(next, { manual = false } = {}) {
    if (manual) auto = false
    t = clamp(next, 0, 1)
    wake()
    paint()
}

autoBtn.addEventListener("click", () => {
    auto = !auto
    if (auto) t = timeToT()
    wake()
    paint()
})

// keep "auto" in step with the real clock
setInterval(() => {
    if (!auto) return
    t = timeToT()
    paint()
}, 30_000)

/* ------------------------------ wake / sleep ------------------------------ */

let sleepTimer = 0
let pinned = false // tapped open on touch screens

function placeRevealOrigin() {
    const h = hero.getBoundingClientRect()
    const w = windowBtn.getBoundingClientRect()
    // centre of the window panes (roughly the middle of the frame)
    sky.style.setProperty("--ox", `${w.left - h.left + w.width * 0.5}px`)
    sky.style.setProperty("--oy", `${w.top - h.top + w.height * 0.45}px`)
}

function wake() {
    clearTimeout(sleepTimer)
    if (hero.classList.contains("is-awake")) return
    placeRevealOrigin()
    hero.classList.add("is-awake")
    document.documentElement.classList.add("sky-on")
    windowBtn.setAttribute("aria-pressed", "true")
}

function sleep() {
    if (pinned) return
    hero.classList.remove("is-awake")
    document.documentElement.classList.remove("sky-on")
    windowBtn.setAttribute("aria-pressed", "false")
}

const canHover = matchMedia("(hover: hover)").matches

// looking out of the window opens the sky; it stays while you're in the hero
windowBtn.addEventListener("pointerenter", (e) => {
    if (e.pointerType === "mouse") wake()
})
hero.addEventListener("pointerleave", (e) => {
    if (e.pointerType !== "mouse") return
    sleepTimer = setTimeout(sleep, 250)
})
hero.addEventListener("pointerenter", () => clearTimeout(sleepTimer))

// tap / click / keyboard toggles it
windowBtn.addEventListener("click", () => {
    if (hero.classList.contains("is-awake") && (pinned || !canHover)) {
        pinned = false
        sleep()
    } else {
        pinned = true
        wake()
    }
})

/* ------------------------------ the bar ------------------------------ */

const tFromPointer = (e) => {
    const r = track.getBoundingClientRect()
    return (e.clientY - r.top) / r.height
}
track.addEventListener("pointerdown", (e) => {
    e.preventDefault()
    track.setPointerCapture(e.pointerId)
    hero.classList.add("is-dragging")
    setT(tFromPointer(e), { manual: true })
})
track.addEventListener("pointermove", (e) => {
    if (!track.hasPointerCapture(e.pointerId)) return
    setT(tFromPointer(e), { manual: true })
})
const endDrag = () => hero.classList.remove("is-dragging")
track.addEventListener("pointerup", endDrag)
track.addEventListener("pointercancel", endDrag)

track.addEventListener("keydown", (e) => {
    const step = { ArrowDown: 0.03, ArrowRight: 0.03, ArrowUp: -0.03, ArrowLeft: -0.03 }[e.key]
    let next = null
    if (step !== undefined) next = t + step
    if (e.key === "Home") next = 0
    if (e.key === "End") next = 1
    if (e.key === "PageDown") next = STOPS.find((s) => s.t > t + 0.001)?.t ?? 1
    if (e.key === "PageUp") next = [...STOPS].reverse().find((s) => s.t < t - 0.001)?.t ?? 0
    if (e.key === "a" || e.key === "A") {
        autoBtn.click()
        e.preventDefault()
        return
    }
    if (next === null) return
    e.preventDefault()
    setT(next, { manual: true })
})
track.addEventListener("focus", wake)

/* ------------------------------ butterflies ------------------------------ */

mountButterflies(hero.querySelector(".butterflies"))

/* ------------------------------ start ------------------------------ */

paint()

// preview links: #awake opens the sky, #t=0.65 picks a time (handy for sharing a look)
const hash = new URLSearchParams(location.hash.slice(1))
if (hash.has("t")) setT(parseFloat(hash.get("t")), { manual: true })
if (hash.has("awake")) {
    pinned = true
    wake()
}
