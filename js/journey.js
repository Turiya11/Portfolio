// "My design journey": one screen, pinned while you scroll; the track slides sideways,
// a line draws itself, glass cards rise as the pen passes, and a sunset wipes in for 2026.
// Port of the Framer JourneyTimeline. Edit the content below.
import { butterflyArt } from "./butterflies.js"

const CONTENT = {
    eyebrow: "2023 → 2026",
    heading: "My design journey",
    hint: "scroll to follow the line →",
    doodles: ["graphic design?", "illustration?", "UI?", "research?"],
    milestones: [
        { year: "2023", period: "2023 — 2027", kicker: "where it began", title: "B.Des, User Experience Design", org: "MIT World Peace University, Pune", text: "Started my design degree not quite sure which direction to take. Interaction design, systems thinking, UI, prototyping and HCI slowly pulled everything together. CGPA 8.7.", tags: ["HCI", "Systems thinking", "Prototyping"] },
        { year: "2023", period: "June 2023", kicker: "my first real brief", title: "Visual Design Intern", org: "Texol Engineering, Pune", text: "Designed playful, on-brand poster graphics for the Texol canteen — still up in the factory and appreciated by visitors from across the country and the globe.", tags: ["Visual design", "Illustration"] },
        { year: "2024", period: "Studio project · 2024", kicker: "designing for someone else", title: "Pay Ez", org: "Digital payments for elderly people", text: "Simplified online payments for older users with low digital literacy — clearer flows, stronger trust cues and learning support for financial independence.", tags: ["Accessibility", "Research", "Mobile"] },
        { year: "2024", period: "Certifications", kicker: "learning the why", title: "HCI, critical thinking & SEL", org: "IDC School of Design · RIT · UC Riverside", text: "Human-Computer Interaction (IDC, HCIPAI), Critical Thinking & Problem Solving (Rochester Institute of Technology), Social Emotional Learning (UC Riverside).", tags: ["HCI", "Problem solving"] },
        { year: "2025", period: "Feb — May 2025", kicker: "where data meets care", title: "UX Design Intern", org: "Encora Inc., Pune", text: "Interactive biomedical data visualisations for clinical decision-making — 5 concepts across 4 data types, tested with 6 users: ~30% faster interpretation, ~20% fewer misreads.", tags: ["Data viz", "Healthcare", "Usability testing"], link: ["Read the case study", "#work"] },
        { year: "2025", period: "Studio project · 2025", kicker: "thinking in systems", title: "Dentigo", org: "B2B platform for dental clinics & labs", text: "Brought restorations, supplies and clinic–lab communication into one transparent flow to cut remakes, delays and staff workload.", tags: ["B2B", "Service design", "Web app"], link: ["Read the case study", "#work"] },
        { year: "2026", period: "March 2026 — now", kicker: "going end-to-end", title: "Product Design Intern", org: "SSK Technologies · 3TFlow", text: "End-to-end flows across 2000+ ITSM screens for 5 user roles — ticket assignment cut from 6 steps to 3, a Reports module, SLA tracking and a design system of 4000+ components.", tags: ["ITSM", "Design systems", "Enterprise"], link: ["Read the case study", "#work"] },
    ],
    finale: { label: "Today", year: "2026", connector: "and now I'm an", title: "End-to-end product & interaction designer", text: "Research to release — systems, flows, data and the small moments that make them feel alive.", cta: ["See my work", "#work"] },
}

const NODE_COLORS = ["#B9A8FF", "#FF9EB5", "#7CC2F6", "#F5C518", "#C4E727", "#FFB27A", "#8F7BEA"]
// three butterflies flutter along the line: blue scouts ahead of the pen, pink + yellow trail (Framer DesignerTimeline)
const FLOCK = ["#1E90FF", "#FF9EB5", "#F5C518"]
const TRACK_END = 0.86 // the last 14% of the scroll is the sunset finale
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c])

const root = document.getElementById("journey")
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
let geo = null
let els = {}

function layout() {
    const vw = innerWidth
    const vh = innerHeight
    const mobile = vw < 700
    const compact = vh < 760 || mobile
    const kk = clamp(Math.min(vw / 1440, vh / 860), 0.62, 1.1)
    const n = CONTENT.milestones.length
    const cardW = mobile ? Math.min(vw * 0.86, 380) : clamp(vw * 0.34, 380, 520) // wide cards = fewer lines = shorter cards
    const step = mobile ? vw * 0.92 : cardW * 0.78
    const tipFrac = mobile ? 0.5 : 0.58
    const lead = mobile ? vw * 0.42 : 6 // phones reveal a card as its node approaches
    const x0 = mobile ? 22 : vw * 0.06
    const introW = Math.min(vw - x0 * 2, 640 * kk)
    const firstX = mobile ? vw * 0.92 : Math.max(vw * 0.64, x0 + introW + cardW * 0.6)
    const xs = CONTENT.milestones.map((_, i) => firstX + i * step)
    const T = xs[n - 1] + vw * 0.7
    const baseY = vh * (compact ? 0.5 : 0.52)
    const amp = (compact ? 16 : 30) * kk
    const yFn = (x) => baseY + amp * Math.sin((x / (step * 0.9)) * Math.PI * 2 + 0.6) + amp * 0.35 * Math.sin(x / 173)
    let d = ""
    for (let x = x0; x <= T; x += 18) d += `${d ? " L" : "M"}${x.toFixed(1)} ${(yFn(x) + Math.sin(x * 1.7) * 0.8).toFixed(1)}`
    const m = CONTENT.doodles.length
    const exX = CONTENT.doodles.map((_, k) => (mobile ? vw * 0.18 + k * vw * 0.2 : vw * 0.14 + k * Math.min(140, (firstX - vw * 0.14 - cardW * 0.6) / m)))
    return { vw, vh, mobile, compact, kk, cardW, tipFrac, lead, x0, introW, xs, T, travel: Math.max(T - vw, 1), yFn, d, exX }
}

function render() {
    geo = layout()
    const { vw, vh, kk, cardW, compact, x0, introW, xs, T, yFn, d, exX } = geo
    const gap = compact ? 28 : 44 * kk

    const doodles = CONTENT.doodles
        .map((label, k) => {
            const dir = k % 2 === 0 ? 1 : -1
            const dy = (dir > 0 ? 70 : 58) * kk
            const dx = (30 + (k % 2) * 12) * kk
            return `<div class="jt-doodle" style="left:${exX[k]}px;top:${yFn(exX[k])}px">
              <svg viewBox="0 0 120 200" style="left:-20px;top:-100px"><g transform="translate(20 100)">
                <path d="M0 0 C8 ${dir * dy * 0.3} -10 ${dir * dy * 0.55} ${dx * 0.6} ${dir * dy * 0.8} S${dx} ${dir * dy * 0.95} ${dx} ${dir * dy}"/>
                <circle cx="${dx}" cy="${dir * dy}" r="3"/></g></svg>
              <p style="left:${dx - 70 * kk}px;top:${dir > 0 ? dy + 6 : -dy - 32 * kk}px;width:${140 * kk}px">${esc(label)}</p></div>`
        })
        .join("")

    const cards = CONTENT.milestones
        .map((m, i) => {
            const above = i % 2 === 1
            const color = NODE_COLORS[i % NODE_COLORS.length]
            return `<div class="jt-mark" style="left:${xs[i]}px;top:${yFn(xs[i])}px;--node:${color};--from:${above ? -24 : 24}px">
              <div class="jt-node">’${esc(m.year.slice(-2))}</div>
              <span class="jt-stem" style="height:${gap - 8}px;${above ? `bottom:24px` : `top:24px`}"></span>
              <article class="jt-card${compact ? " is-compact" : ""}" style="width:${cardW}px;left:${-cardW / 2}px;${above ? `bottom:${24 + gap}px` : `top:${24 + gap}px`}">
                <div class="jt-card__top"><span class="jt-kicker">${esc(m.kicker)}</span><span class="jt-period">${esc(m.period)}</span></div>
                <h3>${esc(m.title)}</h3>
                <p class="jt-org">${esc(m.org)}</p>
                <p class="jt-text">${esc(m.text)}</p>
                <div class="jt-card__foot">
                  <div class="jt-tags">${m.tags.map((t) => `<span style="border-color:${color}">${esc(t)}</span>`).join("")}</div>
                  ${m.link ? `<a class="jt-link" href="${m.link[1]}">${esc(m.link[0])} <span aria-hidden="true">→</span></a>` : ""}
                </div>
              </article></div>`
        })
        .join("")

    const f = CONTENT.finale
    root.style.height = `${vh + geo.travel / TRACK_END}px`
    root.innerHTML = `
      <div class="jt-stage">
        <div class="jt-clouds" aria-hidden="true">${[1, 3, 5, 2, 4]
            .map((k, i) => `<span style="--img:url(../assets/images/cloud-${k}.webp);left:${8 + i * 26}%;top:${[6, 22, 64, 40, 78][i]}%;width:${[420, 300, 480, 260, 380][i]}px"></span>`)
            .join("")}</div>
        <div class="jt-track" style="width:${T}px">
          <svg class="jt-line" width="${T}" height="${vh}" aria-hidden="true"><path class="jt-guide" d="${d}"/></svg>
          <div class="jt-drawn"><svg width="${T}" height="${vh}" aria-hidden="true"><path class="jt-glow" d="${d}"/><path class="jt-ink" d="${d}"/></svg></div>
          <div class="jt-tip" aria-hidden="true"><i></i><b></b></div>
          <div class="jt-flock" aria-hidden="true">
            <svg width="0" height="0" style="position:absolute"><defs>${FLOCK.map((c, j) => `<radialGradient id="jt-bf-${j}" cx="1" cy="0.5" r="1"><stop offset="0%" style="stop-color:color-mix(in srgb, ${c} 42%, white)"/><stop offset="45%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join("")}</defs></svg>
            ${FLOCK.map((c, j) => {
                const w = (40 - j * 4) * kk
                return `<span style="width:${w}px;height:${w * 0.75}px">${butterflyArt(w, 0, { gradId: `jt-bf-${j}`, flap: 1.1 + j * 0.17 })}</span>`
            }).join("")}
          </div>
          <header class="jt-intro" style="left:${x0}px;top:${vh * 0.11}px;width:${introW}px">
            <p class="jt-eyebrow">${esc(CONTENT.eyebrow)}</p>
            <h2>${esc(CONTENT.heading)}</h2>
            <p class="jt-hint">${esc(CONTENT.hint)}</p>
          </header>
          ${doodles}${cards}
        </div>
        <div class="jt-finale">
          <svg class="jt-wave" viewBox="0 0 100 1000" preserveAspectRatio="none" style="width:${Math.round(vw * 0.08)}px" aria-hidden="true">
            <defs><linearGradient id="jt-sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BBDAFE"/><stop offset="1" stop-color="#BBDAFE"/></linearGradient></defs>
            <path d="M100 0 L100 1000 L60 1000 C20 930 90 860 50 790 S20 650 60 580 S90 440 40 370 S25 230 65 160 S85 70 55 0 Z" fill="url(#jt-sg)"/>
          </svg>
          <div class="jt-sunset">
            <div class="jt-glass">
              <p class="jt-label">${esc(f.label)}</p>
              <p class="jt-year">${esc(f.year)}</p>
              <p class="jt-connector">${esc(f.connector)}</p>
              <h3>${esc(f.title)}</h3>
              <p>${esc(f.text)}</p>
              <a class="jt-cta" href="${f.cta[1]}">${esc(f.cta[0])} <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
        <div class="jt-progress" aria-hidden="true"><span class="jt-progress__year">${esc(CONTENT.eyebrow.split(" ")[0])}</span>${'<i></i>'.repeat(CONTENT.milestones.length + 2)}</div>
      </div>`

    els = {
        track: root.querySelector(".jt-track"),
        drawn: root.querySelector(".jt-drawn"),
        tip: root.querySelector(".jt-tip"),
        clouds: root.querySelector(".jt-clouds"),
        finale: root.querySelector(".jt-finale"),
        glass: root.querySelector(".jt-glass"),
        marks: [...root.querySelectorAll(".jt-mark")],
        doodles: [...root.querySelectorAll(".jt-doodle")],
        dots: [...root.querySelectorAll(".jt-progress i")],
        year: root.querySelector(".jt-progress__year"),
        flock: root.querySelector(".jt-flock"),
        birds: [...root.querySelectorAll(".jt-flock > span")].map((el) => ({ el, tilt: el.querySelector(".bf__tilt") })),
    }
    flock.st = []
    flock.last = 0
    fitCards()
}

// keep every card on screen: between the nav (top) and the bottom edge; a card that's still too tall
// after the wide layout is scaled down a touch, anchored at its stem
const NAV_CLEAR = 76
function fitCards() {
    const { vh, xs, yFn, compact, kk } = geo
    const gap = compact ? 28 : 44 * kk
    els.marks.forEach((mark, i) => {
        const card = mark.querySelector(".jt-card")
        const above = i % 2 === 1
        const y = yFn(xs[i])
        const room = above ? y - 24 - gap - NAV_CLEAR : vh - 16 - (y + 24 + gap)
        card.style.transformOrigin = above ? "50% 100%" : "50% 0%"
        card.style.setProperty("--fit", Math.min(1, room / card.offsetHeight).toFixed(3))
    })
}

// the flock: each butterfly chases a point near the pen tip, bobbing above / below the line
// and turning with its motion (same maths as the Framer DesignerTimeline)
const flock = { st: [], last: 0, raf: 0, tipX: 0 }
function flutter(now) {
    const dt = Math.min(0.05, (now - flock.last) / 1000)
    const snap = !flock.last || reduced
    flock.last = now
    const t = now / 1000
    const { yFn, kk } = geo
    els.birds.forEach((b, j) => {
        const w = (40 - j * 4) * kk
        const lag = (j === 0 ? -30 : 60 + (j - 1) * 105) * kk
        const ph = j * 2.1
        const side = j % 2 === 0 ? -1 : 1
        const tx = flock.tipX - lag + Math.sin(t * 0.8 + ph) * 24 * kk
        const s = (flock.st[j] ||= { x: tx, y: yFn(tx) + side * 44 * kk, h: 0 })
        const px = s.x, py = s.y
        s.x += (tx - s.x) * (snap ? 1 : Math.min(1, dt * 2.4))
        const ty = yFn(s.x) + side * (44 + 22 * Math.sin(t * 1.1 + ph * 1.7)) * kk + 14 * Math.sin(t * 2.3 + ph) * kk
        s.y += (ty - s.y) * (snap ? 1 : Math.min(1, dt * 3))
        const head = clamp(Math.atan2(s.y - py, Math.abs(s.x - px) + 0.35), -0.9, 0.9)
        s.h += (head - s.h) * (snap ? 1 : Math.min(1, dt * 3))
        b.el.style.transform = `translate3d(${(s.x - w / 2).toFixed(1)}px,${(s.y - w * 0.375).toFixed(1)}px,0)`
        b.tilt.style.transform = `rotateZ(${(s.h * 57.3 + 90).toFixed(1)}deg) rotateX(24deg)`
    })
    flock.raf = reduced ? 0 : requestAnimationFrame(flutter)
}
new IntersectionObserver(([e]) => {
    cancelAnimationFrame(flock.raf)
    flock.raf = 0
    if (e.isIntersecting) (flock.last = 0), (flock.raf = requestAnimationFrame(flutter))
}).observe(root)

function apply(p) {
    const { vw, T, travel, xs, exX, yFn, tipFrac, lead } = geo
    const wp = clamp((p - TRACK_END) / (1 - TRACK_END), 0, 1)
    const cam = clamp(p / TRACK_END, 0, 1) * travel
    const tipX = cam + tipFrac * vw
    els.track.style.transform = `translate3d(${-cam}px,0,0)`
    els.clouds.style.transform = `translate3d(${-cam * 0.18}px,0,0)`
    els.drawn.style.clipPath = `inset(-40px ${Math.max(0, T - tipX)}px -40px 0)`
    els.tip.style.transform = `translate3d(${tipX}px,${yFn(tipX)}px,0)`
    els.tip.style.opacity = els.flock.style.opacity = 1 - clamp(wp * 3, 0, 1)
    flock.tipX = tipX
    if (reduced) flutter(performance.now())
    let passed = -1
    xs.forEach((x, i) => {
        if (tipX >= x - 6) passed = i
        els.marks[i].classList.toggle("on", tipX >= x - lead)
    })
    exX.forEach((x, i) => els.doodles[i].classList.toggle("on", tipX >= x + 10))
    els.finale.style.transform = `translate3d(${(1 - ease(wp)) * 110}%,0,0)`
    const o = clamp((wp - 0.5) / 0.4, 0, 1)
    els.glass.style.opacity = o
    els.glass.style.transform = `translate3d(0,${(1 - o) * 26}px,0)`
    const active = wp > 0.5 ? els.dots.length - 1 : passed + 1
    els.dots.forEach((d, i) => (d.dataset.on = i === active ? "1" : i < active ? "2" : "0"))
    els.year.textContent = wp > 0.5 ? CONTENT.finale.year : passed >= 0 ? CONTENT.milestones[passed].year : CONTENT.eyebrow.split(" ")[0]
}

const progress = () => {
    const r = root.getBoundingClientRect()
    const total = r.height - innerHeight
    return total > 0 ? clamp(-r.top / total, 0, 1) : 0
}

// smooth follow of the scroll position; only runs while catching up
let cur = 0
let goal = 0
let raf = 0
const tick = () => {
    cur += (goal - cur) * 0.14
    if (Math.abs(goal - cur) < 0.0004) cur = goal
    apply(cur)
    raf = cur !== goal ? requestAnimationFrame(tick) : 0
}
const onScroll = () => {
    goal = progress()
    if (reduced) return apply((cur = goal))
    if (!raf) raf = requestAnimationFrame(tick)
}

render()
apply((cur = goal = progress()))
addEventListener("scroll", onScroll, { passive: true })
let lastW = innerWidth
let lastH = innerHeight
addEventListener("resize", () => {
    // ignore the small height jumps of mobile browser toolbars
    if (innerWidth === lastW && Math.abs(innerHeight - lastH) < 120) return
    lastW = innerWidth
    lastH = innerHeight
    render()
    apply((cur = goal = progress()))
})

// card heights depend on the web fonts: fit again once they have loaded
document.fonts?.ready.then(() => geo && fitCards())
