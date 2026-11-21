// "What can I do for you", folder 02 of the archive (about.js makes the folder, this fills it): a four-piece
// jigsaw. The pieces start scattered; drag each one onto the outline it fits, and it clicks in. Once all four are in,
// "How I contribute" is taped across the top and each piece flies off and turns into a die-cut sticker. The stickers
// tilt toward the pointer, can be peeled off and stuck down anywhere on the folder, and wiggle when tapped.
// Edit the words below.
const CONTENT = {
    skip: "or just show me",
    reveal: "How I contribute",
    again: "mix them up again",
    hintAfter: "now they're stickers. pull them apart",
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

// the other side of each puzzle piece: the same outline (EDGES), the same 100-unit cell, flipped over in place and
// printed as a sticker. Each piece has one socket biting into it, so each drawing keeps clear of its own socket.
const INK = ["#4a37b0", "#b02d63", "#1d5ea6", "#9a5b00"]
const BG = ["#e6e0ff", "#ffdbe4", "#d9eeff", "#fff1b8"]
const SPAD = PAD + 6 // the knobs, plus room for the white edge
const big = (lines, y, size) => lines.map((l, k) => `<text class="tm-st__big" x="50" y="${y + k * size * 1.1}" font-size="${size}">${esc(l)}</text>`).join("")
const small = (t, y, size = 5.6) => `<text class="tm-st__small" x="50" y="${y}" style="font-size:${size}px">${esc(t.toUpperCase())}</text>`
const ART = [
    // research (socket at the bottom): a magnifying glass, with a glint
    () => `${small("Research", 14, 6.4)}
          <g class="tm-st__line">
            <circle cx="47" cy="30" r="9" class="tm-st__paper"/>
            <path d="M53.5 36.5l7 7" stroke-width="4"/>
            <path d="M42.5 28.500a5.500 5.500 0 0 1 4.500-3.800"/>
            <path d="M35 21l-3-3M39.500 18.500l-1-4M33 26l-4-1"/>
          </g>
          ${big(["Understanding", "people"], 55, 10.5)}`,
    // business requirements (socket on the left): a dotted bridge from a heart to a chart
    () => `${small("Business requirements", 14, 5.4)}
          <g class="tm-st__line">
            <path d="M48 52c-7-4-8-10-4-11.500 2-.5 3.500.5 4 2 .5-1.500 2-2.500 4-2 4 1.500 3 7.500-4 11.500z" class="tm-st__paper"/>
            <path d="M55 39q10-11 20 0" stroke-dasharray=".5 3.400"/>
            <path d="M72.500 36.500l3 3 .4-4"/>
            <path d="M78 38v14h12"/>
          </g>
          <rect x="80.500" y="46" width="2.400" height="5" rx=".6" class="tm-st__dot"/>
          <rect x="84" y="42.500" width="2.400" height="8.500" rx=".6" class="tm-st__dot"/>
          <rect x="87.500" y="38.500" width="2.400" height="12.500" rx=".6" class="tm-st__dot"/>
          ${big(["Connecting user", "needs with", "business goals"], 78, 8.6)}`,
    // systems thinking (socket on the right): an eye in the middle of everything it's connected to
    () => `${small("Systems thinking", 14, 6.2)}
          <g class="tm-st__line">
            <path d="M36 42l-15-6M36 42l15-6M36 42l-11 12M36 42l11 12M36 42V25"/>
            <path d="M21 36l4 18M51 36l-4 18M21 36l15-11 15 11" stroke-dasharray=".5 2.800" stroke-width="1.600"/>
            <circle cx="21" cy="36" r="3" class="tm-st__paper"/><circle cx="51" cy="36" r="3" class="tm-st__paper"/>
            <circle cx="25" cy="54" r="3" class="tm-st__paper"/><circle cx="47" cy="54" r="3" class="tm-st__paper"/>
            <circle cx="36" cy="25" r="3" class="tm-st__paper"/>
            <path d="M28 42q8-7 16 0q-8 7-16 0z" class="tm-st__paper"/>
          </g>
          <circle cx="36" cy="42" r="2.100" class="tm-st__dot"/>
          ${big(["Seeing the", "bigger picture"], 80, 10)}`,
    // interaction design (socket at the top): a toggle, switched on, and the pointer that just clicked it
    () => `${small("Interaction design", 40, 6)}
          <g class="tm-st__line">
            <rect x="34" y="47" width="30" height="14" rx="7" class="tm-st__paper"/>
            <path d="M39.500 54h5" opacity=".45"/>
          </g>
          <circle cx="57" cy="54" r="5" class="tm-st__dot"/>
          <g class="tm-st__line" stroke-width="1.500">
            <path d="M61 57v11l3-3 2.500 5 2.200-1.100-2.500-4.900h4.500z" class="tm-st__paper"/>
            <path d="M58 56l-3-2M60 52.500l-.8-3M63 53.500l1.400-2.600"/>
          </g>
          ${big(["Making things", "feel intuitive"], 80, 10)}`,
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
    const d = shape(EDGES[i])
    return `<div class="tm-st tm-st--big" data-k="${i}" style="--ink:${INK[i]};--bg:${BG[i]};--i:${i}" role="img" aria-label="${esc(p.label)}: ${esc(p.title)}">
        <svg viewBox="${-SPAD} ${-SPAD} ${S + SPAD * 2} ${S + SPAD * 2}" aria-hidden="true">
          <defs><clipPath id="tm-cut${i}"><path d="${d}"/></clipPath></defs>
          <g class="tm-st__edge"><path d="${d}"/></g>
          <g class="tm-st__face"><path d="${d}"/></g>
          <g clip-path="url(#tm-cut${i})">${ART[i]()}<circle class="tm-st__glare" cx="-400" cy="-400" r="60"/></g>
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

// once it's solved the puzzle turns over where it lies, so the stickers sit exactly where the pieces were.
// The tags and doodles lie loose around it: [x, y, tilt], x and y counted in piece cells from the board's top-left corner.
const LOOSE = {
    wide: [
        [-0.62, 0.42, -6],
        [2.7, 0.62, 5],
        [-0.72, 1.45, 4],
        [2.85, 1.58, -4],
        [-0.95, -0.05, 12],
        [2.38, -0.08, -10],
        [2.32, 2.12, 6],
    ],
}
const sticks = stickers.map(() => ({ x: 0, y: 0, rot: 0, w: 0, h: 0, home: null }))

function putSticker(k) {
    const el = stickers[k]
    const t = sticks[k]
    el.style.translate = `${(t.x - t.w / 2).toFixed(1)}px ${(t.y - t.h / 2).toFixed(1)}px`
    el.style.rotate = `${t.rot}deg`
}

// lay the sheet out: the four stickers exactly over the solved puzzle, everything else around it
function sheet(instant) {
    const W = stage.clientWidth
    const wide = W >= 820
    const cell = S * unit
    const [ox, oy] = origin
    root.classList.add("is-sheet")
    stage.style.setProperty("--k", wide ? 1 : 0.85)
    // the tape moves up off the stickers so their labels show
    ribbon.style.top = `${oy - 30}px`
    let narrowSpots = null
    if (!wide) {
        // on a phone the tags line up under the board, where the loose pieces lay
        const y0 = oy + 2 * cell + PAD * unit + 34
        narrowSpots = [
            [W * 0.28, y0, -4],
            [W * 0.72, y0 + 8, 3],
            [W * 0.26, y0 + 56, 3],
            [W * 0.62, y0 + 104, -3],
            [W - 24, oy - 6, -8],
            [W * 0.9, y0 + 60, 10],
            [22, y0 + 110, 0],
        ]
        stage.style.height = `${Math.round(y0 + 150)}px`
    }
    gliding.forEach(stopGlide) // laid out afresh: anything still sliding stops where the layout puts it
    stickers.forEach((el, i) => {
        const t = sticks[i]
        if (i < 4) {
            t.w = t.h = (cell * (S + SPAD * 2)) / S
            Object.assign(t, { x: ox + (CELL[i][0] + 0.5) * cell, y: oy + (CELL[i][1] + 0.5) * cell, rot: 0 })
            t.home = { x: t.x, y: t.y, rot: 0 }
        } else {
            const [x, y, rot] = wide ? [ox + LOOSE.wide[i - 4][0] * cell, oy + LOOSE.wide[i - 4][1] * cell, LOOSE.wide[i - 4][2]] : narrowSpots[i - 4]
            if (el.classList.contains("tm-st--doodle")) {
                const [, , vw, vh] = el.querySelector("svg").getAttribute("viewBox").split(" ").map(Number)
                ;[t.w, t.h] = [vw, vh]
            } else {
                el.style.width = el.style.height = ""
                ;[t.w, t.h] = [el.offsetWidth, el.offsetHeight]
            }
            Object.assign(t, { x, y, rot })
        }
        el.style.width = `${t.w}px`
        el.style.height = `${t.h}px`
        el.style.zIndex = ""
        putSticker(i)
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

let pieceRaf = 0
let pieceT = 0
function pieceStep(now) {
    const dt = clamp((now - pieceT) / 1000, 0.001, 0.034)
    pieceT = now
    if (!drag) return (pieceRaf = 0)
    const s = state[drag.i]
    const a = reduced ? 1 : 1 - Math.exp(-FOLLOW * dt)
    s.x += (drag.tx - s.x) * a
    s.y += (drag.ty - s.y) * a
    place(drag.i) // .is-dragging turns its transition off, so this lands this frame
    pieceRaf = requestAnimationFrame(pieceStep)
}

pieces.forEach((el, i) => {
    el.addEventListener("pointerdown", (e) => {
        if (state[i].placed || root.classList.contains("is-solved")) return
        e.preventDefault()
        el.setPointerCapture(e.pointerId)
        const s = state[i]
        drag = { i, dx: e.clientX - s.x, dy: e.clientY - s.y, tx: s.x, ty: s.y, moved: 0 }
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
        // where it's heading; pieceStep() carries it there, a touch behind, like the stickers
        drag.tx = clamp(e.clientX - drag.dx, -E * 0.3, stage.clientWidth - E * 0.7)
        drag.ty = clamp(e.clientY - drag.dy, -E * 0.3, stage.clientHeight - E * 0.7)
        drag.moved++
        if (!pieceRaf) (pieceT = performance.now()), (pieceRaf = requestAnimationFrame(pieceStep))
    })
    const drop = () => {
        if (!drag || drag.i !== i) return
        const s = state[i]
        // the last bit of the way it eases into, below
        s.x = drag.tx
        s.y = drag.ty
        drag = null
        el.classList.remove("is-dragging")
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
    gliding.forEach(stopGlide)
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
// gliding: a carried sticker trails the pointer on a soft spring, swings with its speed like paper,
// and when let go keeps sliding until friction stops it. One loop for all of them, writing only translate and rotate
const FOLLOW = 24 // how quickly it catches up with the pointer, per second
const FRICTION = 4 // how quickly a thrown one slows down, per second
const gliding = new Set()
let glideRaf = 0
let glideT = 0
const bounds = (t) => [t.w * 0.3, stage.clientWidth - t.w * 0.3, t.h * 0.3, stage.clientHeight - t.h * 0.3]
function glide(k) {
    const t = sticks[k]
    if (!t.g) {
        t.g = { held: true, tx: t.x, ty: t.y, vx: 0, vy: 0, swing: 0 }
        stickers[k].classList.add("is-instant")
    }
    gliding.add(k)
    if (!glideRaf) (glideT = performance.now()), (glideRaf = requestAnimationFrame(glideStep))
    return t.g
}
function glideStep(now) {
    const dt = clamp((now - glideT) / 1000, 0.001, 0.034)
    glideT = now
    for (const k of gliding) {
        const t = sticks[k]
        const g = t.g
        const px = t.x
        const py = t.y
        if (g.held) {
            const a = reduced ? 1 : 1 - Math.exp(-FOLLOW * dt)
            t.x += (g.tx - t.x) * a
            t.y += (g.ty - t.y) * a
            g.vx += ((t.x - px) / dt - g.vx) * 0.3
            g.vy += ((t.y - py) / dt - g.vy) * 0.3
        } else {
            const f = Math.exp(-FRICTION * dt)
            g.vx *= f
            g.vy *= f
            t.x += g.vx * dt
            t.y += g.vy * dt
            // it bumps softly off the edges of the folder instead of leaving it
            const [x0, x1, y0, y1] = bounds(t)
            if (t.x < x0 || t.x > x1) (t.x = clamp(t.x, x0, x1)), (g.vx *= -0.35)
            if (t.y < y0 || t.y > y1) (t.y = clamp(t.y, y0, y1)), (g.vy *= -0.35)
        }
        g.swing += (clamp(g.vx * 0.014, -14, 14) - g.swing) * (1 - Math.exp(-9 * dt))
        const el = stickers[k]
        el.style.translate = `${(t.x - t.w / 2).toFixed(2)}px ${(t.y - t.h / 2).toFixed(2)}px`
        el.style.rotate = `${(t.rot + g.swing).toFixed(2)}deg`
        const speed = Math.hypot(g.vx, g.vy)
        // sliding slowly over its own place, it's caught there
        if (!g.held && t.home && speed < 500 && Math.hypot(t.x - t.home.x, t.y - t.home.y) < t.w * 0.2) home(k)
        else if (!g.held && speed < 18 && Math.abs(g.swing) < 0.4) land(k)
    }
    glideRaf = gliding.size ? requestAnimationFrame(glideStep) : 0
}
const stopGlide = (k) => {
    gliding.delete(k)
    sticks[k].g = null
    stickers[k].classList.remove("is-instant")
}
// came to rest somewhere loose: stuck down, a touch crooked
function land(k) {
    const t = sticks[k]
    t.rot = clamp(t.rot + (t.g?.swing || 0) + (Math.random() - 0.5) * 6, -14, 14)
    stopGlide(k)
    if (t.home && Math.hypot(t.x - t.home.x, t.y - t.home.y) < t.w * 0.28) return home(k)
    putSticker(k)
    replay(stickers[k], "is-slap")
}
// back in its place in the chain: it clicks in, with ticks at the joins it locks into
function home(k) {
    const t = sticks[k]
    stopGlide(k)
    Object.assign(t, t.home)
    putSticker(k)
    replay(stickers[k], "is-slap")
    const cell = S * unit
    CELL.forEach(([c, r], j) => {
        const [mc, mr] = CELL[k]
        if (j === k || j > 3 || Math.abs(c - mc) + Math.abs(r - mr) !== 1) return
        if (Math.hypot(sticks[j].x - sticks[j].home.x, sticks[j].y - sticks[j].home.y) > 2) return
        setTimeout(() => burst(stickers[j], t.x + ((c - mc) * cell) / 2, t.y + ((r - mr) * cell) / 2), reduced ? 0 : 200)
    })
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
        // caught mid-glide or picked up from rest, it starts from where it is now
        peel = { k, sx: e.clientX, sy: e.clientY, ox: t.x, oy: t.y, moved: false }
        el.style.zIndex = ++stickZ
        el.classList.add("is-held")
        settle()
        if (t.g) t.g.held = true
    })
    el.addEventListener("pointermove", (e) => {
        const t = sticks[k]
        if (peel && peel.k === k) {
            const dx = e.clientX - peel.sx
            const dy = e.clientY - peel.sy
            if (Math.hypot(dx, dy) > 4) peel.moved = true
            if (!peel.moved) return
            const [x0, x1, y0, y1] = bounds(t)
            // the pointer only sets where it's heading; glide() carries it there, a touch behind
            glide(k).tx = clamp(peel.ox + dx, x0, x1)
            t.g.ty = clamp(peel.oy + dy, y0, y1)
            return
        }
        if (e.pointerType !== "mouse" || reduced || !root.classList.contains("is-sheet") || t.g) return
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
        const g = t.g
        el.classList.remove("is-held")
        if (g) {
            // let go: it keeps the speed it had and slides to a stop (or, flicked at its place, clicks in)
            g.held = false
            const v = Math.hypot(g.vx, g.vy)
            if (reduced) g.vx = g.vy = 0
            else if (v > 2400) (g.vx *= 2400 / v), (g.vy *= 2400 / v)
            // let go on its place (where the pointer is, it trails a touch behind), or flicked so it would come to rest there: it clicks in
            const near = (x, y) => t.home && Math.hypot(x - t.home.x, y - t.home.y) < t.w * 0.28
            if (near(g.tx, g.ty) || near(t.x, t.y) || near(t.x + g.vx / FRICTION, t.y + g.vy / FRICTION)) home(k)
        } else if (peel.moved) {
            land(k)
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
