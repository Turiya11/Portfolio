// "What I bring to a team", folder 02 of the archive (about.js makes the folder, this fills it): a four-piece
// jigsaw. The pieces start scattered; drag each one onto the outline it fits, and it clicks in. Once all four are in,
// "How I contribute" is taped across the top and each piece flies off and turns into a die-cut sticker. The stickers
// tilt toward the pointer, can be peeled off and stuck down anywhere on the folder, and wiggle when tapped.
// Edit the words below.
const CONTENT = {
    skip: "or just show me",
    reveal: "How I contribute",
    again: "mix them up again",
    hintAfter: "they're stickers now, move them around",
    pieces: [
        { label: "Research", title: "Understanding people", color: "#8f7bea", texture: "dots", face: "curls" },
        { label: "Business requirements", title: "Connecting user needs with business goals", color: "#ff9eb5", texture: "scribble", face: "glasses" },
        { label: "Systems thinking", title: "Seeing the bigger picture", color: "#7cc2f6", texture: "grid", face: "waves" },
        { label: "Interaction design", title: "Making things feel intuitive", color: "#f5c518", texture: "zigzag", face: "swirl" },
    ],
    // the little tags stuck around the big stickers, one for each way of working above
    tags: [
        { text: "asks why", icon: "ask", bg: "#e3dcff", ink: "#4a37b0" },
        { text: "finds the gap", icon: "gap", bg: "#ffd9e3", ink: "#b02d63" },
        { text: "zooms out", icon: "zoom", bg: "#d6edff", ink: "#1d5ea6" },
        { text: "sweats the details", icon: "spark", bg: "#fff0b0", ink: "#9a5b00" },
    ],
}

const root = document.getElementById("team")
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c])

/* ------------------------------ the pieces: drawn in a 100-unit cell, knobs reach 24 units past it ------------------------------ */

const S = 100
const PAD = 24
// edges are [top, right, bottom, left]: 1 is a knob sticking out, -1 a socket, 0 the flat outside edge
const EDGES = [
    [0, 1, -1, 0],
    [0, 0, 1, -1],
    [1, -1, 0, 0],
    [-1, 0, 0, 1],
]
const CELL = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
]

// one edge of the piece, walking clockwise; the knob is the classic neck-and-bulb
function edge([x0, y0], [x1, y1], dir) {
    if (!dir) return `L${x1} ${y1}`
    const ux = (x1 - x0) / S
    const uy = (y1 - y0) / S
    // outward normal, scaled by the knob direction
    const nx = uy * dir
    const ny = -ux * dir
    const p = (t, h) => `${(x0 + ux * t * S + nx * h * S).toFixed(1)} ${(y0 + uy * t * S + ny * h * S).toFixed(1)}`
    return [`L${p(0.35, 0)}`, `C${p(0.41, 0)} ${p(0.42, 0.08)} ${p(0.38, 0.13)}`, `C${p(0.3, 0.24)} ${p(0.4, 0.3)} ${p(0.5, 0.3)}`, `C${p(0.6, 0.3)} ${p(0.7, 0.24)} ${p(0.62, 0.13)}`, `C${p(0.58, 0.08)} ${p(0.59, 0)} ${p(0.65, 0)}`, `L${p(1, 0)}`].join(" ")
}
const shape = ([t, r, b, l]) => `M0 0 ${edge([0, 0], [S, 0], t)} ${edge([S, 0], [S, S], r)} ${edge([S, S], [0, S], b)} ${edge([0, S], [0, 0], l)} Z`

const TEXTURE = {
    dots: `<pattern id="tm-t0" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="2.200" fill="#fff" opacity=".35"/><circle cx="11" cy="11" r="1.500" fill="#fff" opacity=".25"/></pattern>`,
    scribble: `<pattern id="tm-t1" width="34" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(-24)"><path d="M0 11c6-8 11 8 17 0s11 8 17 0" fill="none" stroke="#fff" stroke-width="2" opacity=".3"/></pattern>`,
    grid: `<pattern id="tm-t2" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(12)"><path d="M0 8h16M8 0v16" stroke="#fff" stroke-width="1.400" opacity=".3"/></pattern>`,
    zigzag: `<pattern id="tm-t3" width="20" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(38)"><path d="M0 10 5 4l5 6 5-6 5 6" fill="none" stroke="#fff" stroke-width="1.800" opacity=".4"/></pattern>`,
}

// little faces, like doodles on the pieces of a kids' puzzle; the hair is allowed to run off the edge
const FACE = {
    curls: `<path d="M8 22C-4 14-14 18-20 10M14 14C6 2-6 2-12-6M24 10c-2-8 4-14 10-10 5 4-1 10-5 6" /><circle cx="40" cy="52" r="2.600" class="tm-dot"/><circle cx="58" cy="52" r="2.600" class="tm-dot"/><path d="M50 54l-3 9h5M42 68c6 5 12 5 17 0"/>`,
    glasses: `<circle cx="38" cy="50" r="9"/><circle cx="62" cy="50" r="9"/><path d="M47 50h6M29 48l-6-2M71 48l6-2"/><circle cx="38" cy="50" r="2.200" class="tm-dot"/><circle cx="62" cy="50" r="2.200" class="tm-dot"/><path d="M43 69c5 4 10 4 14 0M50 10c-6-6-12 0-6 4 6 4 10-4 4-8"/>`,
    waves: `<circle cx="38" cy="54" r="2.600" class="tm-dot"/><circle cx="58" cy="54" r="2.600" class="tm-dot"/><path d="M46 70c4 3 8 3 11 0M84 16c10 6 4 16 14 22s4 16 14 22M92 8c10 6 4 16 14 22s4 16 14 22M76 24c8 6 2 14 10 20"/>`,
    swirl: `<path d="M22 18c-4-10 8-16 14-8 6 8-6 14-8 6M40 14c-4-10 8-16 14-8 6 8-6 14-8 6M58 18c-2-10 10-14 14-6 4 8-8 12-8 4"/><circle cx="40" cy="54" r="2.600" class="tm-dot"/><circle cx="60" cy="54" r="2.600" class="tm-dot"/><path d="M50 56v8h4M44 71c4 3 9 3 13 0"/>`,
}

const piece = (p, i) => {
    const d = shape(EDGES[i])
    return `<button class="tm-piece" type="button" data-i="${i}" style="--c:${p.color};--i:${i}" aria-label="Puzzle piece: ${esc(p.label)}. Press Enter to put it in place.">
        <svg class="tm-piece__front" viewBox="${-PAD} ${-PAD} ${S + PAD * 2} ${S + PAD * 2}" aria-hidden="true">
          <defs>${TEXTURE[p.texture].replace(/tm-t\d/, `tm-t${i}`)}<clipPath id="tm-clip${i}"><path d="${d}"/></clipPath></defs>
          <path class="tm-piece__shape" d="${d}"/>
          <rect x="${-PAD}" y="${-PAD}" width="${S + PAD * 2}" height="${S + PAD * 2}" fill="url(#tm-t${i})" clip-path="url(#tm-clip${i})"/>
          <g class="tm-face">${FACE[p.face]}</g>
        </svg>
    </button>`
}

/* ------------------------------ the stickers: line drawings on pastel, with a thick white die-cut edge ------------------------------ */

// each one: its viewBox size, the die-cut outline, and what's drawn on it. Text is SVG so it can follow a curve.
const INK = ["#4a37b0", "#b02d63", "#1d5ea6", "#9a5b00"]
const BG = ["#e6e0ff", "#ffdbe4", "#d9eeff", "#fff1b8"]
const big = (lines, y, size) => lines.map((l, k) => `<text class="tm-st__big" x="50%" y="${y + k * size * 1.12}" font-size="${size}">${esc(l)}</text>`).join("")
const small = (t, y) => `<text class="tm-st__small" x="50%" y="${y}">${esc(t.toUpperCase())}</text>`
// the puzzle piece's own doodle face, carried over onto its sticker
const face = (i, x, y, k) => `<g class="tm-st__doodle" transform="translate(${x} ${y}) scale(${k})">${FACE[CONTENT.pieces[i].face]}</g>`
const STICKERS = [
    {
        // a round badge: the words run round the edge, a magnifying glass finds a smiling face
        w: 240,
        h: 240,
        outline: `<circle cx="120" cy="120" r="106"/>`,
        art: (i) => `
          <path id="tm-arc-a" d="M36 120a84 84 0 0 1 168 0" fill="none"/>
          <path id="tm-arc-b" d="M26 120a94 94 0 0 0 188 0" fill="none"/>
          <text class="tm-st__ring" font-size="17"><textPath href="#tm-arc-a" startOffset="50%">UNDERSTANDING PEOPLE</textPath></text>
          <text class="tm-st__ring" font-size="14.5"><textPath href="#tm-arc-b" startOffset="50%">✦ RESEARCH ✦</textPath></text>
          <g class="tm-st__line">
            <circle cx="112" cy="112" r="33" class="tm-st__paper"/>
            <path d="M136 137l24 24" stroke-width="11"/>
          </g>
          ${face(i, 72, 64, 0.8)}`,
    },
    {
        // a ticket: a dashed bridge carries a heart (what people need) over to a chart (what the business needs)
        w: 276,
        h: 222,
        outline: `<rect x="12" y="12" width="252" height="198" rx="30"/>`,
        art: (i) => `
          ${small("Business requirements", 46)}
          <g class="tm-st__line">
            <path d="M70 120c-23-14-25-33-12-37 6-2 11 2 12 7 1-5 6-9 12-7 13 4 11 23-12 37z" class="tm-st__paper"/>
            <path d="M90 82q46-44 92-2" stroke-dasharray="1 9" stroke-width="5"/>
            <path d="M170 74l13 7-4-14"/>
            <path d="M184 76v40h50"/>
          </g>
          ${face(i, 42.5, 72, 0.55)}
          <rect x="192" y="100" width="9" height="16" rx="2" class="tm-st__dot"/>
          <rect x="206" y="90" width="9" height="26" rx="2" class="tm-st__dot"/>
          <rect x="220" y="78" width="9" height="38" rx="2" class="tm-st__dot"/>
          ${big(["Connecting user needs", "with business goals"], 162, 20)}`,
    },
    {
        // an arch: the name curves over the top, and an eye sits in the middle of everything it's connected to
        w: 224,
        h: 256,
        outline: `<path d="M18 116a94 94 0 0 1 188 0v108a18 18 0 0 1-18 18H36a18 18 0 0 1-18-18z"/>`,
        art: (i) => `
          <path id="tm-arc-c" d="M40 116a72 72 0 0 1 144 0" fill="none"/>
          <text class="tm-st__ring" font-size="14"><textPath href="#tm-arc-c" startOffset="50%">SYSTEMS THINKING</textPath></text>
          <g class="tm-st__line">
            <path d="M112 124L64 108M112 124l46-20M112 124l-34 34M112 124l36 34M112 124V78" />
            <path d="M64 108l14 50M158 104l-10 54M64 108l48-30 46 26" stroke-dasharray="1 7" stroke-width="3.5"/>
            <circle cx="64" cy="108" r="8" class="tm-st__paper"/><circle cx="158" cy="104" r="8" class="tm-st__paper"/>
            <circle cx="78" cy="158" r="8" class="tm-st__paper"/><circle cx="148" cy="158" r="8" class="tm-st__paper"/>
            <circle cx="112" cy="78" r="8" class="tm-st__paper"/>
            <circle cx="112" cy="124" r="19" class="tm-st__paper"/>
          </g>
          ${face(i, 83, 92, 0.6)}
          ${big(["Seeing the", "bigger picture"], 200, 21)}`,
    },
    {
        // a rounded square: a happy toggle, switched on, with the pointer that just clicked it
        w: 262,
        h: 232,
        outline: `<rect x="12" y="12" width="238" height="208" rx="38"/>`,
        art: (i) => `
          ${small("Interaction design", 46)}
          <g class="tm-st__line">
            <rect x="64" y="64" width="108" height="50" rx="25" class="tm-st__paper"/>
          </g>
          <circle cx="147" cy="89" r="17" class="tm-st__knob"/>
          ${face(i, 119.5, 55, 0.55)}
          <g class="tm-st__line">
            <path d="M83 89h18" stroke-width="3.5" opacity=".45"/>
            <path d="M170 104v38l10-10 9 17 8-4-9-16h15z" class="tm-st__paper" stroke-width="4"/>
            <path d="M160 102l-9-6M165 95l-3-10M172 97l4-9"/>
          </g>
          ${big(["Making things", "feel intuitive"], 170, 23)}`,
    },
]
// little drawn icons for the tags
const ICON = {
    ask: `<circle cx="10" cy="10" r="8"/><path d="M7.5 7.6c.3-1.6 1.4-2.400 2.700-2.400 1.500 0 2.600 1 2.600 2.300 0 2.200-2.800 2-2.800 4.300"/><circle cx="10" cy="14.6" r=".9" class="tm-ico-dot"/>`,
    gap: `<path d="M3 3v14M17 3v14M6.5 10h7M9 7.5 6.5 10 9 12.5M11 7.5l2.5 2.5-2.5 2.5"/>`,
    zoom: `<path d="M3 8V3h5M17 12v5h-5M3 3l5 5M17 17l-5-5"/>`,
    spark: `<path d="M10 2c.6 4.200 1.800 6.800 8 8-6.200 1.200-7.400 3.800-8 8-.6-4.200-1.800-6.800-8-8 6.200-1.200 7.400-3.800 8-8z"/>`,
}
// and a few doodles with nothing to say
const DOODLES = [
    { w: 46, h: 46, c: "#ffd34d", ink: "#9a5b00", d: `<path d="M26 4L10 26h12l-4 16 18-24H24z"/>` },
    { w: 40, h: 40, c: "#ffb9c9", ink: "#b02d63", d: `<path d="M20 34C6 25 4 13 11 10c4-2 8 0 9 4 1-4 5-6 9-4 7 3 5 15-9 24z"/>` },
    { w: 42, h: 42, c: "#c9bcff", ink: "#4a37b0", d: `<path d="M21 4c1 9 4 13 15 17-11 4-14 8-15 17-1-9-4-13-15-17 11-4 14-8 15-17z"/>` },
]

const sticker = (p, i) => {
    const st = STICKERS[i]
    return `<div class="tm-st tm-st--big" data-k="${i}" style="--ink:${INK[i]};--bg:${BG[i]};--i:${i}" role="img" aria-label="${esc(p.label)}: ${esc(p.title)}">
        <svg viewBox="0 0 ${st.w} ${st.h}" aria-hidden="true">
          <defs><clipPath id="tm-cut${i}">${st.outline}</clipPath></defs>
          <g class="tm-st__edge">${st.outline}</g>
          <g class="tm-st__face">${st.outline}</g>
          <g clip-path="url(#tm-cut${i})">${st.art(i)}<circle class="tm-st__glare" cx="-200" cy="-200" r="${st.w * 0.55}"/></g>
        </svg>
      </div>`
}
const tag = (t, i) =>
    `<div class="tm-st tm-st--tag" data-k="${4 + i}" style="--ink:${t.ink};--bg:${t.bg};--i:${4 + i}"><svg class="tm-ico" viewBox="0 0 20 20" aria-hidden="true">${ICON[t.icon]}</svg>${esc(t.text)}</div>`
const doodle = (d, i) =>
    `<div class="tm-st tm-st--doodle" data-k="${8 + i}" style="--ink:${d.ink};--bg:${d.c};--i:${8 + i}" aria-hidden="true"><svg viewBox="0 0 ${d.w} ${d.h}"><g class="tm-st__edge">${d.d}</g><g class="tm-st__face">${d.d}</g></svg></div>`

function render() {
    root.innerHTML = `
      <div class="tm-stage">
        <svg class="tm-board" aria-hidden="true"></svg>
        <p class="tm-ribbon" aria-live="polite"><span>${esc(CONTENT.reveal)}</span></p>
        ${CONTENT.pieces.map(piece).join("")}
        <svg class="tm-defs" width="0" height="0" aria-hidden="true"><defs><radialGradient id="tm-shine"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".6" stop-color="#fff" stop-opacity=".25"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs></svg>
        <div class="tm-sheet">
          ${CONTENT.pieces.map(sticker).join("")}
          ${CONTENT.tags.map(tag).join("")}
          ${DOODLES.map(doodle).join("")}
        </div>
      </div>
      <p class="tm-foot">
        <button class="tm-skip" type="button">${esc(CONTENT.skip)}</button>
        <button class="tm-skip tm-again" type="button" hidden>${esc(CONTENT.again)}</button>
      </p>`
}
render()

/* ------------------------------ layout: the board in the middle, the loose pieces around it ------------------------------ */

const stage = root.querySelector(".tm-stage")
const board = root.querySelector(".tm-board")
const ribbon = root.querySelector(".tm-ribbon")
const pieces = [...root.querySelectorAll(".tm-piece")]
const stickers = [...root.querySelectorAll(".tm-st")]
const hint = root.closest(".ab-folder")?.querySelector(".ab-hand")
const hintBefore = hint?.textContent
const state = pieces.map(() => ({ x: 0, y: 0, rot: 0, scale: 1, placed: false }))
// where each loose piece lies, out of order on purpose, and how it's tilted
const SCATTER = [2, 0, 3, 1]
const TILT = [-13, 9, -7, 14]
let unit = 0 // pixels per puzzle unit
let origin = [0, 0] // the board's top-left corner
let homes = [] // the scattered resting spots

const slot = (i) => [origin[0] + (CELL[i][0] * S - PAD) * unit, origin[1] + (CELL[i][1] * S - PAD) * unit]

function layout() {
    const W = stage.clientWidth
    const wide = W >= 820
    // one piece cell, in pixels; the board is two of them square
    const cell = wide ? clamp(Math.min(W * 0.155, (innerHeight - 380) / 2.4), 118, 190) : clamp((W - 24) / (2 + (2 * PAD) / S), 110, 180)
    unit = cell / S
    const E = (S + PAD * 2) * unit // a piece's box, knobs included
    const sc = wide ? 0.92 : 0.8 // loose pieces lie a little smaller until you pick one up
    const e = E * sc
    const lift = (E - e) / 2 // scaling happens about the middle, so shift the box to put the visible piece where we want it
    const boardSize = 2 * cell
    const top = 54 // room for the ribbon above the board
    origin = [(W - boardSize) / 2, top]
    let H
    if (wide) {
        // two loose pieces down each side of the board, staggered
        H = Math.max(top + boardSize + PAD * unit + 36, 2 * e + 30)
        const side = origin[0] - PAD * unit - 12
        const at = (x, y) => [x - lift, y - lift]
        homes = [
            at(12 + (side - e) * 0.1, 16),
            at(12 + (side - e) * 0.9, H - e - 16),
            at(W - 12 - e - (side - e) * 0.85, 30),
            at(W - 12 - e - (side - e) * 0.05, H - e - 22),
        ]
    } else {
        // a tray of loose pieces under the board
        const trayTop = top + boardSize + PAD * unit + 24
        const at = (x, y) => [x - lift, y - lift]
        homes = [at(W * 0.03, trayTop), at(W * 0.97 - e, trayTop + 14), at(W * 0.08, trayTop + e * 0.9), at(W * 0.92 - e, trayTop + e * 0.96)]
        H = trayTop + e * 1.96 + 16
    }
    stage.style.height = `${Math.round(H)}px`
    stage.style.setProperty("--e", `${E}px`)
    stage.style.setProperty("--unit", unit)
    stage.dataset.scale = sc
    drawBoard()
    state.forEach((s, i) => {
        if (s.placed) [s.x, s.y, s.rot, s.scale] = [...slot(i), 0, 1]
        else rest(i)
    })
    pieces.forEach((_, i) => place(i, true))
    ribbon.style.left = `${origin[0] + boardSize / 2}px`
    ribbon.style.top = `${top - 10}px`
    if (root.classList.contains("is-sheet")) sheet(true)
}

/* ------------------------------ the sticker sheet ------------------------------ */

// where everything is stuck down, as [x, y, tilt] centres in a design space: 1000 × 430 on a wide folder, 360 × 560 on a phone
const SHEET = {
    wide: {
        w: 1000,
        h: 410,
        size: 1.06,
        ribbon: [500, 30],
        // the tags are tucked over the corners of the big stickers, the way a sheet gets crowded
        at: [
            [148, 216, -7],
            [400, 236, 4],
            [632, 220, -4],
            [864, 234, 6],
            [92, 350, -7],
            [342, 358, 4],
            [676, 364, -3],
            [906, 362, 5],
            [268, 72, 12],
            [752, 66, -10],
            [984, 118, 6],
        ],
    },
    narrow: {
        w: 360,
        h: 610,
        size: 0.68,
        ribbon: [180, 22],
        at: [
            [92, 126, -6],
            [264, 146, 5],
            [94, 316, -4],
            [264, 322, 6],
            [96, 444, -4],
            [256, 456, 3],
            [84, 512, 3],
            [214, 566, -3],
            [190, 222, 10],
            [342, 236, -8],
            [22, 222, 0],
        ],
    },
}
const sticks = stickers.map(() => ({ x: 0, y: 0, rot: 0, w: 0, h: 0 }))

function putSticker(k) {
    const el = stickers[k]
    const t = sticks[k]
    el.style.translate = `${(t.x - t.w / 2).toFixed(1)}px ${(t.y - t.h / 2).toFixed(1)}px`
    el.style.rotate = `${t.rot}deg`
}

// lay the sheet out: every sticker back to its own spot, and the pieces fly to the sticker they become
function sheet(instant) {
    const W = stage.clientWidth
    const L = W >= 820 ? SHEET.wide : SHEET.narrow
    const k = L === SHEET.wide ? clamp(Math.min(W / L.w, (innerHeight - 400) / L.h), 0.62, 1.15) : clamp(W / L.w, 0.82, 1.3)
    const left = (W - L.w * k) / 2
    root.classList.add("is-sheet")
    stage.style.height = `${Math.round(L.h * k)}px`
    stage.style.setProperty("--k", k)
    stickers.forEach((el, i) => {
        const t = sticks[i]
        const [x, y, rot] = L.at[i]
        const svg = el.querySelector("svg")
        if (el.classList.contains("tm-st--big")) {
            const [, , vw, vh] = svg.getAttribute("viewBox").split(" ").map(Number)
            ;[t.w, t.h] = [vw * L.size * k, vh * L.size * k]
        } else if (el.classList.contains("tm-st--doodle")) {
            const [, , vw, vh] = svg.getAttribute("viewBox").split(" ").map(Number)
            ;[t.w, t.h] = [vw * k, vh * k]
        } else {
            el.style.width = ""
            ;[t.w, t.h] = [el.offsetWidth, el.offsetHeight]
        }
        el.style.width = `${t.w}px`
        el.style.height = `${t.h}px`
        Object.assign(t, { x: left + x * k, y: y * k, rot })
        putSticker(i)
    })
    ribbon.style.left = `${left + L.ribbon[0] * k}px`
    ribbon.style.top = `${L.ribbon[1] * k}px`
    const E = (S + PAD * 2) * unit
    state.forEach((s, i) => {
        Object.assign(s, { x: sticks[i].x - E / 2, y: sticks[i].y - E / 2, rot: sticks[i].rot, scale: 0.5 })
        place(i, instant)
    })
}

function rest(i) {
    const s = state[i]
    const [x, y] = homes[SCATTER[i]]
    Object.assign(s, { x, y, rot: TILT[i], scale: +stage.dataset.scale })
}

// the empty board: each piece's outline in pencil, with its number
function drawBoard() {
    const W = stage.clientWidth
    const H = stage.clientHeight
    board.setAttribute("viewBox", `0 0 ${W} ${H}`)
    board.innerHTML = CONTENT.pieces
        .map((_, i) => {
            const [x, y] = slot(i)
            return `<g transform="translate(${(x + PAD * unit).toFixed(1)} ${(y + PAD * unit).toFixed(1)}) scale(${unit})"><path d="${shape(EDGES[i])}" vector-effect="non-scaling-stroke"/></g>`
        })
        .join("")
}

function place(i, instant) {
    const el = pieces[i]
    const s = state[i]
    if (instant) el.classList.add("is-instant")
    el.style.transform = `translate(${s.x.toFixed(1)}px, ${s.y.toFixed(1)}px) rotate(${s.rot}deg) scale(${s.scale})`
    if (instant) requestAnimationFrame(() => el.classList.remove("is-instant"))
}

/* ------------------------------ dragging ------------------------------ */

let z = 10
let drag = null

// the click of a piece going in: it overshoots and settles, the pieces it now locks into get knocked
// a little, and a burst of pencil ticks goes off at each join
const NEIGHBOURS = [
    [1, 2],
    [0, 3],
    [0, 3],
    [1, 2],
]
function interlock(i) {
    const el = pieces[i]
    el.classList.remove("is-locking")
    void el.offsetWidth
    el.classList.add("is-locking")
    if (reduced) return
    const cell = S * unit
    const centre = (k) => [origin[0] + (CELL[k][0] + 0.5) * cell, origin[1] + (CELL[k][1] + 0.5) * cell]
    const [ax, ay] = centre(i)
    for (const k of NEIGHBOURS[i]) {
        if (!state[k].placed) continue
        const [bx, by] = centre(k)
        // the neighbour is pushed away from the piece arriving, then springs back
        pieces[k].animate([{ translate: "0 0" }, { translate: `${Math.sign(bx - ax) * 5}px ${Math.sign(by - ay) * 5}px` }, { translate: "0 0" }], { duration: 380, easing: "cubic-bezier(.3,1.6,.5,1)" })
        const tick = document.createElement("span")
        tick.className = "tm-click"
        tick.style.left = `${(ax + bx) / 2}px`
        tick.style.top = `${(ay + by) / 2}px`
        tick.innerHTML = `<svg viewBox="-20 -20 40 40" aria-hidden="true">${[0, 60, 120, 180, 240, 300].map((a) => `<path d="M0 -9V-16" transform="rotate(${a + 30})"/>`).join("")}</svg>`
        stage.append(tick)
        tick.addEventListener("animationend", () => tick.remove())
    }
}

function snapIn(i) {
    const s = state[i]
    ;[s.x, s.y] = slot(i)
    s.rot = 0
    s.scale = 1
    s.placed = true
    pieces[i].classList.add("is-placed")
    pieces[i].style.zIndex = 2
    place(i)
    setTimeout(() => interlock(i), reduced ? 0 : 230)
    if (state.every((p) => p.placed)) solve()
}

pieces.forEach((el, i) => {
    el.addEventListener("pointerdown", (e) => {
        if (state[i].placed || root.classList.contains("is-solved")) return
        e.preventDefault()
        el.setPointerCapture(e.pointerId)
        const s = state[i]
        drag = { i, dx: e.clientX - s.x, dy: e.clientY - s.y, moved: 0 }
        s.scale = 1.06
        s.rot = s.rot * 0.4
        el.style.zIndex = ++z
        el.classList.add("is-dragging")
        place(i)
    })
    el.addEventListener("pointermove", (e) => {
        if (!drag || drag.i !== i) return
        const s = state[i]
        const E = parseFloat(stage.style.getPropertyValue("--e"))
        s.x = clamp(e.clientX - drag.dx, -E * 0.3, stage.clientWidth - E * 0.7)
        s.y = clamp(e.clientY - drag.dy, -E * 0.3, stage.clientHeight - E * 0.7)
        drag.moved++
        place(i, true)
    })
    const drop = () => {
        if (!drag || drag.i !== i) return
        drag = null
        el.classList.remove("is-dragging")
        const s = state[i]
        // close enough to its own spot: in it goes
        const [hx, hy] = slot(i)
        const near = (x, y) => Math.hypot(s.x - x, s.y - y) < S * unit * 0.42
        if (near(hx, hy)) return snapIn(i)
        // dropped on someone else's spot: a little shake, and it stays where you left it
        if (state.some((_, k) => k !== i && near(...slot(k)))) {
            el.classList.remove("is-nope")
            void el.offsetWidth
            el.classList.add("is-nope")
        }
        s.scale = +stage.dataset.scale
        s.rot = TILT[i] * 0.5
        place(i)
    }
    el.addEventListener("pointerup", drop)
    el.addEventListener("pointercancel", drop)
    // the keyboard way: Enter or Space puts the piece in place
    el.addEventListener("click", (e) => {
        if (e.detail === 0 && !state[i].placed) snapIn(i)
    })
})

/* ------------------------------ solved: stamp the title, turn the pieces over ------------------------------ */

function solve() {
    root.classList.add("is-solved")
    pieces.forEach((el) => {
        el.setAttribute("aria-disabled", "true")
        el.tabIndex = -1
    })
    root.querySelector(".tm-skip").hidden = true
    root.querySelector(".tm-again").hidden = false
    clearTimeout(sheetTimer)
    sheetTimer = setTimeout(
        () => {
            sheet()
            if (hint) hint.textContent = CONTENT.hintAfter
        },
        reduced ? 0 : 1250
    )
}
let sheetTimer = 0

function scatter() {
    clearTimeout(sheetTimer)
    root.classList.remove("is-solved", "is-sheet")
    if (hint) hint.textContent = hintBefore
    state.forEach((s, i) => {
        s.placed = false
        pieces[i].classList.remove("is-placed")
        pieces[i].removeAttribute("aria-disabled")
        pieces[i].tabIndex = 0
        rest(i)
        place(i)
    })
    root.querySelector(".tm-skip").hidden = false
    root.querySelector(".tm-again").hidden = true
    layout()
}

/* ------------------------------ playing with the stickers ------------------------------ */

let stickZ = 20
let peel = null
// a burst of little ticks in the sticker's own ink, for a tap
function burst(el, x, y) {
    if (reduced) return
    const tick = document.createElement("span")
    tick.className = "tm-click"
    tick.style.cssText = `left:${x}px;top:${y}px;--tick:${getComputedStyle(el).getPropertyValue("--ink")}`
    tick.innerHTML = `<svg viewBox="-20 -20 40 40" aria-hidden="true">${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<path d="M0 -10V-17" transform="rotate(${a})"/>`).join("")}</svg>`
    stage.append(tick)
    tick.addEventListener("animationend", () => tick.remove())
}
const replay = (el, cls) => {
    el.classList.remove(cls)
    void el.offsetWidth
    el.classList.add(cls)
}
stickers.forEach((el, k) => {
    const glare = el.querySelector(".tm-st__glare")
    const box = el.querySelector("svg")?.viewBox.baseVal
    const settle = () => {
        el.style.transform = ""
        glare?.setAttribute("cx", -400)
    }
    el.addEventListener("pointerdown", (e) => {
        if (!root.classList.contains("is-sheet")) return
        e.preventDefault()
        el.setPointerCapture(e.pointerId)
        const t = sticks[k]
        peel = { k, sx: e.clientX, sy: e.clientY, ox: t.x, oy: t.y, lx: e.clientX, vx: 0, moved: false }
        el.style.zIndex = ++stickZ
        el.classList.add("is-held")
        settle()
    })
    el.addEventListener("pointermove", (e) => {
        const t = sticks[k]
        if (peel && peel.k === k) {
            const dx = e.clientX - peel.sx
            const dy = e.clientY - peel.sy
            if (Math.hypot(dx, dy) > 4) peel.moved = true
            if (!peel.moved) return
            peel.vx = peel.vx * 0.7 + (e.clientX - peel.lx) * 0.3
            peel.lx = e.clientX
            t.x = clamp(peel.ox + dx, t.w * 0.3, stage.clientWidth - t.w * 0.3)
            t.y = clamp(peel.oy + dy, t.h * 0.3, stage.clientHeight - t.h * 0.3)
            el.classList.add("is-instant")
            el.style.translate = `${(t.x - t.w / 2).toFixed(1)}px ${(t.y - t.h / 2).toFixed(1)}px`
            // it swings a little with the way you're moving it, like paper does
            el.style.rotate = `${t.rot + clamp(peel.vx * 1.3, -16, 16)}deg`
            return
        }
        if (e.pointerType !== "mouse" || reduced || !root.classList.contains("is-sheet")) return
        // hovering: it leans toward the pointer, and the light catches it where the pointer is
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        el.style.transform = `perspective(700px) rotateX(${((0.5 - py) * 16).toFixed(1)}deg) rotateY(${((px - 0.5) * 16).toFixed(1)}deg)`
        if (glare && box) {
            glare.setAttribute("cx", (px * box.width).toFixed(0))
            glare.setAttribute("cy", (py * box.height).toFixed(0))
        }
    })
    const drop = (e) => {
        if (!peel || peel.k !== k) return
        const t = sticks[k]
        el.classList.remove("is-held", "is-instant")
        if (peel.moved) {
            // stuck back down, a touch crooked
            t.rot = clamp(t.rot + clamp(peel.vx * 0.5, -6, 6) + (Math.random() - 0.5) * 6, -14, 14)
            putSticker(k)
            replay(el, "is-slap")
        } else {
            replay(el, "is-boop")
            const r = stage.getBoundingClientRect()
            burst(el, e.clientX - r.left, e.clientY - r.top)
        }
        peel = null
    }
    el.addEventListener("pointerup", drop)
    el.addEventListener("pointercancel", drop)
    el.addEventListener("pointerleave", () => peel?.k === k || settle())
    el.addEventListener("animationend", () => el.classList.remove("is-slap", "is-boop"))
})

root.querySelector(".tm-skip").addEventListener("click", () => {
    pieces.forEach((_, i) => state[i].placed || setTimeout(() => snapIn(i), reduced ? 0 : i * 140))
})
root.querySelector(".tm-again").addEventListener("click", scatter)

let lastW = 0
new ResizeObserver(() => {
    if (stage.clientWidth === lastW) return
    lastW = stage.clientWidth
    layout()
}).observe(stage)
document.fonts?.ready.then(layout)
