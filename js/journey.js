// "My design journey": one screen, pinned while you scroll; the track slides sideways,
// a line draws itself, glass cards rise as the pen passes, and a sunset wipes in for 2026.
// Port of the Framer JourneyTimeline. Edit the content below.
import { butterflyArt } from "./butterflies.js?v=2"

const CONTENT = {
    eyebrow: "2023 → 2026",
    heading: "My design journey",
    hint: "scroll to follow the line →",
    doodles: ["graphic design?", "illustration?", "UI?", "research?"],
    milestones: [
        { year: "2023", period: "2023 — 2027", kicker: "where it began", title: "B.Des, User Experience Design", org: "MIT World Peace University, Pune", text: "Started my design degree not quite sure which direction to take. Interaction design, systems thinking, UI, prototyping and HCI slowly pulled everything together. CGPA 8.7.", tags: ["HCI", "Systems thinking", "Prototyping"] },
        { year: "2023", period: "June 2023", kicker: "my first real brief", title: "Visual Design Intern", org: "Texol Engineering, Pune", logos: [["texol", "Texol Engineering"]], text: "Designed playful, on-brand poster graphics for the Texol canteen — still up in the factory and appreciated by visitors from across the country and the globe.", tags: ["Visual design", "Illustration"] },
        { year: "2024", period: "Studio project · 2024", kicker: "designing for someone else", title: "Pay Ez", org: "Digital payments for elderly people", text: "Simplified online payments for older users with low digital literacy — clearer flows, stronger trust cues and learning support for financial independence.", tags: ["Accessibility", "Research", "Mobile"] },
        { year: "2024", period: "Certifications", kicker: "learning the why", title: "HCI, critical thinking & SEL", org: "IDC School of Design · RIT · UC Riverside", logos: [["indiahci", "IndiaHCI 2024"], ["hcipai", "HCIPAI"], ["rit", "Rochester Institute of Technology"], ["ucr", "UC Riverside"]], text: "Human-Computer Interaction (IDC, HCIPAI), Critical Thinking & Problem Solving (Rochester Institute of Technology), Social Emotional Learning (UC Riverside).", tags: ["HCI", "Problem solving"] },
        { year: "2025", period: "Feb — May 2025", kicker: "where data meets care", title: "UX Design Intern", org: "Encora Inc., Pune", logos: [["encora", "Encora"]], text: "Interactive biomedical data visualisations for clinical decision-making — 5 concepts across 4 data types, tested with 6 users: ~30% faster interpretation, ~20% fewer misreads.", tags: ["Data viz", "Healthcare", "Usability testing"], link: ["Read the case study", "work/encora/"] },
        { year: "2025", period: "Jun — Oct 2025", kicker: "freelance, remotely", title: "Freelance Designer", org: "IACS Youth Leadership Program", logos: [["iacs", "Indian American Community Services"]], text: "Graphic design for the Youth Leadership Program at Indian American Community Services, working remotely as a freelancer.", tags: ["Graphic design", "Freelance", "Remote"] },
        { year: "2025", period: "Studio project · 2025", kicker: "thinking in systems", title: "Dentigo", org: "B2B platform for dental clinics & labs", text: "Brought restorations, supplies and clinic–lab communication into one transparent flow to cut remakes, delays and staff workload.", tags: ["B2B", "Service design", "Web app"], link: ["Read the case study", "work/dentigo/"] },
        { year: "2026", period: "Academic project · 2026", kicker: "a system of support", title: "Lumi", org: "Postpartum support for mothers & families", text: "Explored how a digital experience can help mothers recognise and express postpartum emotional difficulty, while giving partners and family a clearer, more compassionate way to support her.", tags: ["User research", "Interaction design", "Maternal health"], link: ["Read the case study", "work/lumi/"] },
        { year: "2026", period: "March 2026 — now", kicker: "going end-to-end", title: "Product Design Intern", org: "SSK Technologies · 3TFlow", logos: [["ssk", "SSK Technologies"]], text: "End-to-end flows across 2000+ ITSM screens for 5 user roles — ticket assignment cut from 6 steps to 3, a Reports module, SLA tracking and a design system of 4000+ components.", tags: ["ITSM", "Design systems", "Enterprise"], link: ["Under NDA · ask me about it", "work/3tflow/"] },
    ],
    finale: { label: "Today", year: "2026", connector: "and now I'm an", title: "End-to-end product & interaction designer", text: "I make intentional design choices for the small moments that make an experience better.", cta: ["See my work", "#work"] },
}

const NODE_COLORS = ["#B9A8FF", "#FF9EB5", "#7CC2F6", "#F5C518", "#C4E727", "#FFB27A", "#8F7BEA"]
// three butterflies flutter along the line: blue scouts ahead of the pen, pink + yellow trail (Framer DesignerTimeline)
const FLOCK = ["#1E90FF", "#FF9EB5", "#F5C518"]
// the tools on the 2026 screen, as small brand-coloured marks (Miro, Framer and Claude paths from Simple Icons, CC0)
const TOOLS = [
    ["Figma", `<svg viewBox="0 0 38 57"><path fill="#F24E1E" d="M19 0H9.5a9.5 9.5 0 0 0 0 19H19z"/><path fill="#FF7262" d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19z"/><path fill="#A259FF" d="M19 19H9.5a9.5 9.5 0 0 0 0 19H19z"/><circle fill="#1ABCFE" cx="28.5" cy="28.5" r="9.5"/><path fill="#0ACF83" d="M9.5 38H19v9.5A9.5 9.5 0 1 1 9.5 38z"/></svg>`],
    ["Miro", `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#FFD02F"/><path fill="#050038" transform="translate(4.2 4.2) scale(.65)" d="M17.392 0H13.9L17 4.808 10.444 0H6.949l3.102 6.3L3.494 0H0l3.05 8.131L0 24h3.494L10.05 6.985 6.949 24h3.494L17 5.494 13.899 24h3.493L24 3.672 17.392 0z"/></svg>`],
    ["Adobe Photoshop", `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#001E36"/><text x="12" y="16.2" text-anchor="middle" font-family="Mona Sans, sans-serif" font-size="11" font-weight="600" fill="#31A8FF">Ps</text></svg>`],
    ["Adobe Illustrator", `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#330000"/><text x="12" y="16.2" text-anchor="middle" font-family="Mona Sans, sans-serif" font-size="11" font-weight="600" fill="#FF9A00">Ai</text></svg>`],
    ["Claude", `<svg viewBox="0 0 24 24"><path fill="#D97757" d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"/></svg>`],
    ["Framer", `<svg viewBox="0 0 24 24"><path fill="#1a1a1a" d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/></svg>`],
]

// where each tool sits on the 2026 screen: a loose ring around the text (x %, y %, tilt in degrees),
// clear of the title's row, the button below it, the nav on top and the progress bar on the right
const ORBIT = [
    [16, 27, -8],
    [29, 12, 6],
    [71, 12, -5],
    [84, 27, 8],
    [82, 78, -6],
    [18, 78, 5],
]
const TRACK_END = 0.86 // the last 14% of the scroll is the sunset finale
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const logo = ([file, name]) => `<img class="jt-logo jt-logo--${file}" src="assets/images/logos/${file}.png" alt="${name}" title="${name}" />`
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c])

const root = document.getElementById("journey")
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
let geo = null
let lineY = null // set when the line is rebalanced to fit the tallest cards on short screens
const isAbove = (i, mobile) => !mobile && i % 2 === 1 // phones keep every card under the line: one card at a time, more room
const NODE_R = 28 // half the year bubble
let els = {}

function layout() {
    const vw = innerWidth
    const vh = innerHeight
    const mobile = vw < 700
    const compact = vh < 820 || mobile
    const kk = clamp(Math.min(vw / 1440, vh / 860), 0.62, 1.1)
    const n = CONTENT.milestones.length
    const cardW = mobile ? Math.min(vw * 0.86, 380) : clamp(vw * 0.34, 380, 520)
    const step = mobile ? vw * 0.92 : cardW * 0.78
    const tipFrac = mobile ? 0.5 : 0.58
    const lead = mobile ? vw * 0.42 : 6 // phones reveal a card as its node approaches
    const x0 = mobile ? 22 : vw * 0.06
    const introW = Math.min(vw - x0 * 2, 640 * kk)
    const firstX = mobile ? vw * 1.12 : Math.max(vw * 0.64, x0 + introW + cardW * 0.6)
    const xs = CONTENT.milestones.map((_, i) => firstX + i * step)
    const T = xs[n - 1] + vw * 0.7
    // shorter windows: flatter line, shorter stems, so the room goes to the cards
    const tight = vh < 880
    const short = vh < 720
    const gap = mobile ? 20 : short ? 10 : tight ? 18 : 44 * kk
    const baseY = lineY ?? vh * 0.55 // below centre: the nav takes space from the cards above the line
    const topY = Math.max(100, vh * 0.16)
    // phones: the line starts level with the intro, then climbs to the top before the first card
    const rise = (x) => {
        const t = clamp((x - vw * 0.55) / (firstX - vw * 0.65), 0, 1)
        return t * t * (3 - 2 * t)
    }
    const midY = mobile ? (x) => baseY + (topY - baseY) * rise(x) : () => baseY
    const amp = mobile ? 16 * kk : short ? 4 : tight ? 8 : 30 * kk
    const yFn = (x) => midY(x) + amp * Math.sin((x / (step * 0.9)) * Math.PI * 2 + 0.6) + amp * 0.35 * Math.sin(x / 173)
    let d = ""
    for (let x = x0; x <= T; x += 18) d += `${d ? " L" : "M"}${x.toFixed(1)} ${(yFn(x) + Math.sin(x * 1.7) * 0.8).toFixed(1)}`
    const m = CONTENT.doodles.length
    const exX = CONTENT.doodles.map((_, k) => (mobile ? vw * 0.18 + k * vw * 0.2 : vw * 0.14 + k * Math.min(140, (firstX - vw * 0.14 - cardW * 0.6) / m)))
    return { vw, vh, mobile, compact, kk, gap, waveW: Math.round(vw * 0.08), cardW, tipFrac, lead, x0, introW, xs, T, travel: Math.max(T - vw, 1), yFn, d, exX }
}

function render() {
    geo = layout()
    const { vw, vh, kk, cardW, compact, gap, mobile, x0, introW, xs, T, yFn, d, exX } = geo

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
            const above = isAbove(i, mobile)
            const color = NODE_COLORS[i % NODE_COLORS.length]
            return `<div class="jt-mark" style="left:${xs[i]}px;top:${yFn(xs[i])}px;--node:${color};--from:${above ? -24 : 24}px">
              <div class="jt-node">’${esc(m.year.slice(-2))}</div>
              <span class="jt-stem" style="height:${gap - 8}px;${above ? `bottom:${NODE_R}px` : `top:${NODE_R}px`}"></span>
              <article class="jt-card${compact ? " is-compact" : ""}" style="width:${cardW}px;left:${-cardW / 2}px;${above ? `bottom:${NODE_R + gap}px` : `top:${NODE_R + gap}px`}">
                <div class="jt-card__top"><span class="jt-kicker">${esc(m.kicker)}</span><span class="jt-period">${esc(m.period)}</span></div>
                <div class="jt-card__head">
                  ${m.logos?.length === 1 ? logo(m.logos[0]) : ""}
                  <div><h3>${esc(m.title)}</h3><p class="jt-org">${esc(m.org)}</p></div>
                </div>
                ${m.logos?.length > 1 ? `<div class="jt-logos">${m.logos.map(logo).join("")}</div>` : ""}
                <p class="jt-text">${esc(m.text)}</p>
                <div class="jt-card__foot">
                  <div class="jt-tags">${m.tags.map((t) => `<span style="border-color:${color}">${esc(t)}</span>`).join("")}</div>
                  ${m.link ? `<a class="jt-link" href="${m.link[1]}">${esc(m.link[0])} <span aria-hidden="true">→</span></a>` : ""}
                </div>
              </article></div>`
        })
        .join("")

    const f = CONTENT.finale
    const waveW = Math.round(vw * 0.08)
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
        <div class="jt-finale" style="right:${-waveW}px">
          <svg class="jt-wave" viewBox="0 0 100 1000" preserveAspectRatio="none" style="width:${waveW}px" aria-hidden="true">
            <defs><linearGradient id="jt-sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF1A6"/><stop offset="1" stop-color="#FFF1A6"/></linearGradient></defs>
            <path d="M100 0 L100 1000 L60 1000 C20 930 90 860 50 790 S20 650 60 580 S90 440 40 370 S25 230 65 160 S85 70 55 0 Z" fill="url(#jt-sg)"/>
          </svg>
          <div class="jt-sunset">
            <ul class="jt-orbit" aria-label="Tools I use">${TOOLS.map(([name, svg], i) => `<li title="${name}" style="--x:${ORBIT[i][0]}%;--y:${ORBIT[i][1]}%;--tilt:${ORBIT[i][2]}deg;--bob:${(i % 3) * 0.7}s"><span class="jt-tool" aria-hidden="true">${svg}</span><span class="sr-only">${name}</span></li>`).join("")}</ul>
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
        orbit: root.querySelector(".jt-orbit"),
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

// keep every card on screen: between the nav (top) and the bottom edge. The line moves first; only if that isn't
// enough do they all scale down together, each anchored at its stem
const NAV_CLEAR = 76
function fitCards() {
    const { vh, xs, yFn, gap, mobile } = geo
    const bottomClear = mobile ? 56 : 12 // phones keep the progress bar clear
    const cards = els.marks.map((mark) => mark.querySelector(".jt-card"))
    const roomFor = (i) => {
        const y = yFn(xs[i])
        return isAbove(i, mobile) ? y - NODE_R - gap - NAV_CLEAR : vh - bottomClear - (y + NODE_R + gap)
    }
    // one scale for every card, set by the tightest fit, so they all stay the same size
    const fit = Math.min(1, ...cards.map((card, i) => roomFor(i) / card.offsetHeight))
    // too tall: centre the line between the tallest cards and lay out again.
    // Scaling down (below) is the last resort, because it shrinks the text.
    if (fit < 1 && !mobile) {
        const tallest = (above) => Math.max(...cards.filter((_, i) => isAbove(i, mobile) === above).map((c) => c.offsetHeight))
        const balanced = (vh - bottomClear + NAV_CLEAR + tallest(true) - tallest(false)) / 2
        if (Math.abs(balanced - (lineY ?? 0)) > 3) {
            lineY = balanced
            return render()
        }
    }
    cards.forEach((card, i) => {
        card.style.transformOrigin = isAbove(i, mobile) ? "50% 100%" : "50% 0%"
        card.style.setProperty("--fit", fit.toFixed(3))
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
    // slides in from the right; at the end its wavy edge leaves the screen too, so the yellow covers everything
    els.finale.style.transform = `translate3d(calc(${(1 - ease(wp)) * 110}% - ${ease(wp) * geo.waveW}px),0,0)`
    const o = clamp((wp - 0.5) / 0.4, 0, 1)
    els.glass.style.opacity = o
    els.orbit.style.opacity = o
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
    lineY = null
    render()
    apply((cur = goal = progress()))
})

// card heights depend on the web fonts: fit again once they have loaded
document.fonts?.ready.then(() => geo && fitCards())
