// "What I bring to a team", folder 02 of the archive (about.js makes the folder, this fills it): a four-piece
// jigsaw. The pieces start scattered; drag each one onto the outline it fits, and it clicks in. Once all four are in, "How I contribute" is stamped across the top and the pieces
// turn over into square cards. Edit the words below.
const CONTENT = {
    skip: "or just show me",
    reveal: "How I contribute",
    again: "mix them up again",
    pieces: [
        { label: "Research", title: "Understanding people", color: "#8f7bea", texture: "dots", face: "curls" },
        { label: "Business requirements", title: "Connecting user needs with business goals", color: "#ff9eb5", texture: "scribble", face: "glasses" },
        { label: "Systems thinking", title: "Seeing the bigger picture", color: "#7cc2f6", texture: "grid", face: "waves" },
        { label: "Interaction design", title: "Making things feel intuitive", color: "#f5c518", texture: "zigzag", face: "swirl" },
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
      <span class="tm-piece__flip">
        <svg class="tm-piece__front" viewBox="${-PAD} ${-PAD} ${S + PAD * 2} ${S + PAD * 2}" aria-hidden="true">
          <defs>${TEXTURE[p.texture].replace(/tm-t\d/, `tm-t${i}`)}<clipPath id="tm-clip${i}"><path d="${d}"/></clipPath></defs>
          <path class="tm-piece__shape" d="${d}"/>
          <rect x="${-PAD}" y="${-PAD}" width="${S + PAD * 2}" height="${S + PAD * 2}" fill="url(#tm-t${i})" clip-path="url(#tm-clip${i})"/>
          <g class="tm-face">${FACE[p.face]}</g>
        </svg>
        <span class="tm-piece__back">
          <span class="tm-card">
            <span class="tm-card__label">${esc(p.label)}</span>
            <span class="tm-card__title">${esc(p.title)}</span>
          </span>
        </span>
      </span>
    </button>`
}

function render() {
    root.innerHTML = `
      <div class="tm-stage">
        <svg class="tm-board" aria-hidden="true"></svg>
        <p class="tm-ribbon" aria-live="polite"><span>${esc(CONTENT.reveal)}</span></p>
        ${CONTENT.pieces.map(piece).join("")}
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
    const cell = wide ? clamp(Math.min(W * 0.155, (innerHeight - 350) / 2.4), 118, 190) : clamp((W - 24) / (2 + (2 * PAD) / S), 110, 180)
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
    if (root.classList.contains("is-wall")) wall(true)
}

// once they've turned over, the cards spread out along the table: a row of four, or two by two on a phone
function wall(instant) {
    const W = stage.clientWidth
    const cols = W >= 820 ? 4 : 2
    root.classList.add("is-wall")
    const cell = S * unit
    const E = (S + PAD * 2) * unit
    const gap = cols === 4 ? 22 : 12
    const card = Math.min(290, (W - (cols === 4 ? 64 : 24) - gap * (cols - 1)) / cols)
    const k = card / cell
    const top = 72
    const left = (W - card * cols - gap * (cols - 1)) / 2
    const rows = 4 / cols
    stage.style.height = `${Math.round(top + rows * card + (rows - 1) * gap + 40)}px`
    state.forEach((s, i) => {
        const c = i % cols
        const r = Math.floor(i / cols)
        Object.assign(s, { x: left + card / 2 + c * (card + gap) - E / 2, y: top + card / 2 + r * (card + gap) - E / 2, rot: 0, scale: k })
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
    const again = root.querySelector(".tm-again")
    again.hidden = false
    clearTimeout(wallTimer)
    wallTimer = setTimeout(wall, reduced ? 0 : 2300)
}
let wallTimer = 0

function scatter() {
    clearTimeout(wallTimer)
    root.classList.remove("is-solved", "is-wall")
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
