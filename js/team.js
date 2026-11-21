// "What can I do for you", folder 02 of the archive (about.js makes the folder, this fills it): a four-piece
// jigsaw. The pieces start scattered; drag each one onto the outline it fits, and it clicks in. Once all four are in,
// "How I contribute" is taped across the top, then the puzzle flips over: on the back is me, hiding behind my MacBook,
// and what I can do for you comes out of the laptop as Liquid Glass cards. They tilt toward the pointer, glide when
// you drag or throw them, click back into place when dropped near it, and wiggle when tapped.
// Edit the words below.
const CONTENT = {
    skip: "or just show me",
    reveal: "How I contribute",
    again: "mix them up again",
    hintAfter: "straight out of my laptop. move them around",
    // the back of the puzzle: me behind my laptop, and the laptop's lid again on its own, so the cards can come out from behind it
    me: { photo: "assets/images/about/mac-back.webp", lid: "assets/images/about/mac-lid.webp", alt: "Turiya, hiding behind her MacBook" },
    pieces: [
        { label: "Research", title: "Understanding business & user requirements", color: "#8f7bea", texture: "dots", face: "curls" },
        { label: "Business requirements", title: "Connecting user needs with business goals", color: "#ff9eb5", texture: "scribble", face: "glasses" },
        { label: "Systems thinking", title: "Seeing the bigger picture", color: "#7cc2f6", texture: "grid", face: "waves" },
        { label: "Interaction design", title: "Making things feel intuitive", color: "#f5c518", texture: "zigzag", face: "swirl" },
    ],
    // the little glass chips around the cards, one for each way of working above
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

/* ------------------------------ the back of the puzzle: me, my laptop, and Liquid Glass cards ------------------------------ */

const INK = ["#4a37b0", "#b02d63", "#1d5ea6", "#9a5b00"]
// the photo is cropped to me (930 x 1066); the lid sits at these fractions of it
const PHOTO = 930 / 1066
const LID = { x: 31 / 930, y: 152 / 1066, w: 834 / 930, h: 552 / 1066 }

// little drawn icons for the tags
const ICON = {
    ask: `<circle cx="10" cy="10" r="8"/><path d="M7.5 7.6c.3-1.6 1.4-2.400 2.700-2.400 1.500 0 2.600 1 2.600 2.300 0 2.200-2.800 2-2.800 4.300"/><circle cx="10" cy="14.6" r=".9" class="tm-ico-dot"/>`,
    gap: `<path d="M3 3v14M17 3v14M6.5 10h7M9 7.5 6.5 10 9 12.5M11 7.5l2.5 2.5-2.5 2.5"/>`,
    zoom: `<path d="M3 8V3h5M17 12v5h-5M3 3l5 5M17 17l-5-5"/>`,
    spark: `<path d="M10 2c.6 4.200 1.800 6.800 8 8-6.200 1.200-7.400 3.800-8 8-.6-4.200-1.800-6.800-8-8 6.200-1.200 7.400-3.800 8-8z"/>`,
}
const card = (p, i) =>
    `<div class="tm-st tm-glass tm-glass--card" data-k="${i}" style="--c:${p.color};--ink:${INK[i]};--i:${i}">
        <span class="tm-glass__tag"><i></i>${esc(p.label)}</span>
        <b class="tm-glass__title">${esc(p.title)}</b>
      </div>`
const tag = (t, i) =>
    `<div class="tm-st tm-glass tm-glass--chip" data-k="${4 + i}" style="--ink:${t.ink};--i:${4 + i}"><svg class="tm-ico" viewBox="0 0 20 20" aria-hidden="true">${ICON[t.icon]}</svg>${esc(t.text)}</div>`

function render() {
    root.innerHTML = `
      <div class="tm-stage">
        <svg class="tm-board" aria-hidden="true"></svg>
        <p class="tm-ribbon" aria-live="polite"><span>${esc(CONTENT.reveal)}</span></p>
        ${CONTENT.pieces.map(piece).join("")}
        <div class="tm-sheet">
          <img class="tm-me" src="${CONTENT.me.photo}" alt="${esc(CONTENT.me.alt)}" width="930" height="1066" loading="lazy" decoding="async">
          ${CONTENT.pieces.map(card).join("")}
          ${CONTENT.tags.map(tag).join("")}
          <img class="tm-me tm-me--lid" src="${CONTENT.me.lid}" alt="" width="930" height="1066" loading="lazy" decoding="async">
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

/* ------------------------------ the back: me behind my laptop, the cards around me ------------------------------ */

const sticks = stickers.map(() => ({ x: 0, y: 0, rot: 0, w: 0, h: 0, home: null }))

function putSticker(k) {
    const el = stickers[k]
    const t = sticks[k]
    el.style.translate = `${(t.x - t.w / 2).toFixed(1)}px ${(t.y - t.h / 2).toFixed(1)}px`
    el.style.rotate = `${t.rot}deg`
}

// lay out the back of the puzzle: me and the laptop where the board was, the cards around us.
// Laid out fresh (instant), everything just goes to its place; the first time, the cards come out of the laptop
const me = [...root.querySelectorAll(".tm-me")]
function sheet(instant) {
    const W = stage.clientWidth
    const wide = W >= 820
    root.classList.add("is-sheet")
    root.classList.toggle("is-narrow", !wide)
    gliding.forEach(stopGlide) // laid out afresh: anything still sliding stops where the layout puts it
    stickers.forEach((el, k) => {
        el.style.width = el.style.height = ""
        sticks[k].w = el.offsetWidth
        sticks[k].h = el.offsetHeight
    })
    const cw = sticks[0].w
    const ch = Math.max(...sticks.slice(0, 4).map((t) => t.h))
    let H = parseFloat(stage.style.height)
    let mh, mx, my, spots
    if (wide) {
        // me in the middle, standing on the bottom edge; two cards each side, the chips further out
        mh = clamp(H - 6, 340, 520)
        mx = (W - mh * PHOTO) / 2
        my = H - mh
        const mw = mh * PHOTO
        // the cards keep just clear of the laptop's edges
        const L = mx + mw * 0.03 - 26 - cw / 2
        const R = mx + mw * 0.97 + 26 + cw / 2
        spots = [
            [L, H * 0.3, -4],
            [R, H * 0.26, 3],
            [L + 6, H * 0.68, 3],
            [R - 4, H * 0.66, -3],
            [L - cw * 0.3, H * 0.3 - ch / 2 - 30, -6],
            [R + cw * 0.28, H * 0.26 - ch / 2 - 28, 5],
            [L - cw * 0.22, H * 0.68 + ch / 2 + 30, 4],
            [R + cw * 0.2, H * 0.66 + ch / 2 + 32, -5],
        ]
    } else {
        // on a phone: me at the top, the cards below, the chips in two rows under them
        const mw = Math.min(W * 0.72, 300)
        mh = mw / PHOTO
        mx = (W - mw) / 2
        my = 4
        let y = my + mh + 16
        spots = [0, 1, 2, 3].map((i) => {
            const at = [W / 2 + (i % 2 ? 10 : -10), y + sticks[i].h / 2, i % 2 ? 2 : -2]
            y += sticks[i].h + 12
            return at
        })
        const row = (a, b, yy) => [
            [W / 2 - 8 - sticks[a].w / 2, yy, -4],
            [W / 2 + 8 + sticks[b].w / 2, yy + 6, 4],
        ]
        spots.push(...row(4, 5, y + 18), ...row(6, 7, y + 64))
        H = y + 100
        stage.style.height = `${Math.round(H)}px`
    }
    me.forEach((img) => {
        img.style.left = `${mx}px`
        img.style.top = `${my}px`
        img.style.height = `${mh}px`
    })
    // the cards come out from just under the top edge of the lid, behind it
    const lidTop = my + mh * LID.y
    const from = [W / 2, lidTop + mh * LID.h * 0.3]
    const order = [0, 1, 4, 5, 2, 3, 6, 7]
    stickers.forEach((el, k) => {
        const t = sticks[k]
        const [x, y, rot] = spots[k]
        Object.assign(t, { x: clamp(x, t.w / 2 + 6, W - t.w / 2 - 6), y: clamp(y, t.h / 2 + 4, H - t.h / 2 - 4), rot })
        t.home = { x: t.x, y: t.y, rot }
        el.style.width = `${t.w}px`
        el.style.height = `${t.h}px`
        putSticker(k)
        el.getAnimations().forEach((a) => a.cancel())
        if (instant || reduced) return (el.style.zIndex = 10 + k)
        // out of the laptop: up from behind the lid, then off to its place
        el.style.zIndex = 2
        el.classList.add("is-instant")
        const px = (x, y) => `${(x - t.w / 2).toFixed(1)}px ${(y - t.h / 2).toFixed(1)}px`
        const lean = t.x < W / 2 ? -1 : 1
        const a = el.animate(
            [
                { translate: px(...from), scale: 0.3, rotate: "0deg", opacity: 0 },
                { translate: px(from[0] + lean * mh * 0.06, lidTop - t.h * 0.2 - mh * 0.1), scale: 0.8, rotate: `${lean * 6}deg`, opacity: 1, offset: 0.42 },
                { translate: px(t.x, t.y), scale: 1, rotate: `${rot}deg`, opacity: 1 },
            ],
            { duration: 900, delay: 820 + order.indexOf(k) * 120, easing: "cubic-bezier(.3,.75,.25,1)", fill: "backwards" }
        )
        a.finished
            .then(() => {
                el.style.zIndex = 10 + k
                el.classList.remove("is-instant")
                replay(el, "is-slap")
            })
            .catch(() => {})
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
// back in its place: it clicks in
function home(k) {
    const t = sticks[k]
    stopGlide(k)
    Object.assign(t, t.home)
    putSticker(k)
    replay(stickers[k], "is-slap")
}

stickers.forEach((el, k) => {
    const settle = () => {
        el.style.transform = ""
        el.classList.remove("is-lit")
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
        // the light catches the glass where the pointer is
        el.style.setProperty("--gx", `${(px * 100).toFixed(0)}%`)
        el.style.setProperty("--gy", `${(py * 100).toFixed(0)}%`)
        el.classList.add("is-lit")
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
