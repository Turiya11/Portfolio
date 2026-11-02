// Looping mini-demos for the Selected work cards: a project's screen on a pastel gradient, with a labelled cursor
// playing out a small story on top. Coded instead of video files, so they stay sharp at any size and load fast.
// Each scene is drawn on a fixed 720×450 stage that scales to fit its card. A scene returns:
//   reset()  back to the first frame   steps  [[ms, fn], …]   dur  loop length (ms)   stop()  optional, on pause

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
const ARROW = `<svg viewBox="0 0 16 20" aria-hidden="true"><path d="M1 1v15l4.2-3.6 2.6 6 2.7-1.2-2.6-5.9 5.6-.3z" fill="#16132b" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>`
const CHECK = `<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 6.4 5 8.8l4.6-5.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`

const cursor = (label) => `<div class="cs-cur">${ARROW}<span>${label}</span></div>`
const tools = (el) => {
    const $ = (s) => el.querySelector(s)
    const $$ = (s) => [...el.querySelectorAll(s)]
    const cur = $(".cs-cur")
    return {
        $,
        $$,
        on: (s) => $$(s).forEach((n) => n.classList.add("on")),
        move: (x, y) => (cur.style.transform = `translate(${x}px,${y}px)`),
        tap: () => {
            cur.classList.remove("tap")
            void cur.offsetWidth
            cur.classList.add("tap")
        },
        clear: (start) => {
            $$(".on").forEach((n) => n.classList.remove("on"))
            cur.classList.add("jump")
            cur.style.transform = `translate(${start[0]}px,${start[1]}px)`
            void cur.offsetWidth
            cur.classList.remove("jump", "tap")
        },
    }
}

/* ------------------------------ 3TFlow: assigning a ticket, 6 steps → 3 ------------------------------ */

function tflow(el) {
    el.innerHTML = `
      <img class="cs-shot" src="assets/images/3tflow-tickets.jpg" alt="" style="left:70px;top:26px;width:580px" />
      <i class="cs-ring" style="left:396px;top:172px;width:40px;height:22px"></i>
      <div class="cs-panel cs-pop cs-assign" style="left:462px;top:196px;width:226px">
        <b>Assign ticket</b><small>TKT-1001 · Login page throws 500</small>
        <ol>${[1, 2, 3].map((n) => `<li class="s${n}"><em>${CHECK}</em>Step ${n}</li>`).join("")}</ol>
      </div>
      <div class="cs-panel cs-pop cs-stat" style="left:34px;top:318px"><small>Ticket assignment</small><b><s>6 steps</s> → 3 steps</b></div>
      <div class="cs-toast cs-pop" style="left:238px;top:396px"><i></i>TKT-1001 assigned · SLA on track</div>
      ${cursor("Support Admin")}`
    const t = tools(el)
    return {
        reset: () => t.clear([640, 400]),
        dur: 10000,
        steps: [
            [500, () => t.move(416, 186)],
            [1500, () => (t.on(".cs-ring"), t.tap())],
            [1900, () => t.on(".cs-assign")],
            [2500, () => t.move(520, 276)],
            [3200, () => (t.tap(), t.on(".s1"))],
            [3800, () => t.move(520, 303)],
            [4400, () => (t.tap(), t.on(".s2"))],
            [5000, () => t.move(520, 330)],
            [5600, () => (t.tap(), t.on(".s3"), t.on(".cs-stat"))],
            [6300, () => t.on(".cs-toast")],
        ],
    }
}

/* ------------------------------ KG Hub: search, a graph grows, compare, comment ------------------------------ */

function kg(el) {
    const A = [190, 165]
    const B = [430, 165]
    const S = [310, 92] // the node both diseases share
    const kids = [
        [A, [92, 92], "gene", "Gene"],
        [A, [70, 190], "drug", "Drug"],
        [A, [118, 268], "side", "Side effect"],
        [A, [250, 262], "path", "Pathway"],
        [A, S, "gene", "Gene"],
    ]
    const kidsB = [
        [B, [528, 92], "drug", "Drug"],
        [B, [552, 196], "gene", "Gene"],
        [B, [470, 268], "side", "Side effect"],
        [B, S, "gene", ""],
    ]
    const line = ([a, b], [c, d], cls) => `<path class="cs-edge ${cls}" pathLength="1" d="M${a} ${b}L${c} ${d}"/>`
    const node = ([x, y], kind, label, cls, r = 13) =>
        `<g class="cs-node ${kind} ${cls}" style="transform-origin:${x}px ${y}px"><circle cx="${x}" cy="${y}" r="${r}"/><text x="${x}" y="${y + r + 13}">${label}</text></g>`
    el.innerHTML = `
      <div class="cs-win" style="left:58px;top:24px;width:604px;height:402px">
        <div class="cs-kgbar"><b>KG Hub</b><span class="cs-kgsearch"><u></u><i></i></span><span class="cs-chip cs-cmp">Compare</span></div>
        <svg class="cs-graph" viewBox="0 0 604 350" aria-hidden="true">
          ${kids.map((k) => line(k[0], k[1], "a")).join("")}
          ${kidsB.map((k) => line(k[0], k[1], "b")).join("")}
          ${node(A, "main", "Lung cancer", "c0", 20)}
          ${kids.map((k) => node(k[1], k[2], k[3], "a")).join("")}
          ${node(B, "main two", "Blood cancer", "c1", 20)}
          ${kidsB.slice(0, 3).map((k) => node(k[1], k[2], k[3], "b")).join("")}
          <circle class="cs-pulse" cx="${S[0]}" cy="${S[1]}" r="13"/>
        </svg>
      </div>
      <div class="cs-panel cs-pop cs-note" style="left:402px;top:78px;width:190px"><small>Comment</small>Both graphs share this gene. Worth a look?</div>
      ${cursor("Clinical researcher")}`
    const t = tools(el)
    const typed = t.$(".cs-kgsearch u")
    const word = "Lung cancer"
    return {
        reset: () => (t.clear([640, 400]), (typed.textContent = "Search your query")),
        dur: 12000,
        steps: [
            [400, () => t.move(280, 44)],
            [1300, () => (t.tap(), t.on(".cs-kgsearch"), (typed.textContent = ""))],
            ...[...word].map((_, i) => [1500 + i * 70, () => (typed.textContent = word.slice(0, i + 1))]),
            [2500, () => t.on(".c0")],
            [2800, () => t.on(".cs-edge.a, .cs-node.a")],
            [3000, () => t.move(590, 44)],
            [5000, () => (t.tap(), t.on(".cs-cmp"))],
            [5300, () => t.on(".c1")],
            [5600, () => t.on(".cs-edge.b, .cs-node.b")],
            [6100, () => t.move(372, 150)],
            [7100, () => (t.tap(), t.on(".cs-pulse"))],
            [7400, () => t.on(".cs-note")],
        ],
    }
}

/* ------------------------------ Lumi: a check-in, a gentle nudge, the partner brought along ------------------------------ */

function lumi(el) {
    const moods = [["Stress", "#a9d3f2"], ["Anxious", "#f9c78e"], ["Numb", "#cdb8f1"], ["Sad", "#f7a8bc"], ["Okay", "#a5dfb4"]]
    el.innerHTML = `
      <img class="cs-phone" src="assets/images/cards/lumi-phone.png" alt="" style="left:74px;top:18px;height:414px" />
      <div class="cs-panel cs-pop cs-c1" style="left:318px;top:34px;width:346px">
        <b>How are you feeling today?</b>
        <div class="cs-moods">${moods.map(([m, c], i) => `<span class="m${i}"><i style="background:${c}"></i>${m}</span>`).join("")}</div>
      </div>
      <div class="cs-panel cs-pop cs-c2" style="left:318px;top:158px;width:346px">
        <b>You've been carrying a lot this week.</b>
        <div class="cs-opts"><span>Drink water</span><span class="ask">Ask for help</span><span>Rest for 10 mins</span></div>
      </div>
      <div class="cs-panel cs-pop cs-c3" style="left:318px;top:278px;width:346px">
        <small>Companion mode · Partner</small>
        <b>Neha may be feeling a little overwhelmed today.</b>
        <p>Try listening, not solving.</p>
      </div>
      ${cursor("Mother")}`
    const t = tools(el)
    const label = t.$(".cs-cur span")
    return {
        reset: () => (t.clear([690, 420]), (label.textContent = "Mother")),
        dur: 11000,
        steps: [
            [300, () => t.on(".cs-c1")],
            [700, () => t.move(424, 104)],
            [1700, () => (t.tap(), t.on(".m1"))],
            [2400, () => t.on(".cs-c2")],
            [3000, () => t.move(490, 214)],
            [4000, () => (t.tap(), t.on(".ask"))],
            [4800, () => t.on(".cs-c3")],
            [5200, () => (label.textContent = "Partner")],
            [5300, () => t.move(600, 392)],
        ],
    }
}

/* ------------------------------ Dentigo: tracking a case as simply as a parcel ------------------------------ */

function dentigo(el) {
    const stages = ["Ordering", "Production", "Delivery", "Verification", "Payment"]
    el.innerHTML = `
      <img class="cs-shot bare" src="assets/images/cards/dentigo-active.png" alt="" style="left:26px;top:22px;width:640px" />
      <i class="cs-ring" style="left:298px;top:310px;width:62px;height:24px"></i>
      <div class="cs-panel cs-pop cs-track" style="left:462px;top:40px;width:232px">
        <b>Zirconia Crowns</b><small>Apex Dental Labs · ETA 1 day</small>
        <ol>${stages.map((s, i) => `<li class="s${i}"><em>${CHECK}</em>${s}</li>`).join("")}</ol>
      </div>
      <div class="cs-toast cs-pop green" style="left:396px;top:300px"><i></i>Awaiting shipment → Delivered</div>
      ${cursor("Dentist")}`
    const t = tools(el)
    return {
        reset: () => t.clear([660, 420]),
        dur: 10000,
        steps: [
            [500, () => t.move(332, 322)],
            [1500, () => (t.on(".cs-ring"), t.tap())],
            [1900, () => t.on(".cs-track")],
            [2300, () => t.on(".s0")],
            [3000, () => t.on(".s1")],
            [3800, () => t.on(".s2")],
            [4500, () => t.on(".cs-toast")],
            [5000, () => t.move(580, 214)],
            [5800, () => (t.tap(), t.on(".s3"))],
            [6500, () => t.on(".s4")],
        ],
    }
}

/* ------------------------------ Pip: a VR headset, through the visor, into the real footage ------------------------------ */

const HEADSET = `<svg class="cs-headset" viewBox="0 0 360 230" aria-hidden="true">
  <defs>
    <linearGradient id="hsShell" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbfaff"/><stop offset="1" stop-color="#bdb8d6"/></linearGradient>
    <linearGradient id="hsVisor" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2d1f73"/><stop offset=".55" stop-color="#150e3f"/><stop offset="1" stop-color="#3b2496"/></linearGradient>
    <radialGradient id="hsOrb"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="#f0d6ff"/><stop offset="1" stop-color="#b57bff" stop-opacity="0"/></radialGradient>
  </defs>
  <path d="M46 112C14 112 6 96 6 78s16-34 44-38M314 112c32 0 40-16 40-34s-16-34-44-38" fill="none" stroke="#3a3560" stroke-width="15" stroke-linecap="round"/>
  <rect x="34" y="34" width="292" height="150" rx="62" fill="url(#hsShell)"/>
  <path d="M146 184c8-22 60-22 68 0z" fill="#8f8ab0"/>
  <rect x="52" y="50" width="256" height="112" rx="48" fill="url(#hsVisor)"/>
  <circle class="cs-orb o1" cx="118" cy="106" r="24" fill="url(#hsOrb)"/>
  <circle class="cs-orb o2" cx="186" cy="90" r="16" fill="url(#hsOrb)"/>
  <circle class="cs-orb o3" cx="246" cy="116" r="20" fill="url(#hsOrb)"/>
  <path d="M84 72c20-12 54-16 84-14" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="6" stroke-linecap="round"/>
  <g fill="#262140"><circle cx="60" cy="44" r="5"/><circle cx="300" cy="44" r="5"/><circle cx="50" cy="168" r="5"/><circle cx="310" cy="168" r="5"/></g>
</svg>`

function pip(el) {
    el.innerHTML = `
      <div class="cs-pipstars"></div>
      <video class="cs-pipvideo" muted playsinline preload="none" poster="assets/images/pip/ar-pip.jpg"><source src="assets/video/pip-focus-grab.mp4" type="video/mp4" /></video>
      <div class="cs-pipintro">${HEADSET}</div>`
    const video = el.querySelector("video")
    const intro = el.querySelector(".cs-pipintro")
    const CLIP = 16000 // length of pip-focus-grab.mp4
    return {
        reset: () => {
            intro.classList.remove("dive", "gone")
            video.classList.remove("on")
            video.pause()
            if (video.readyState) video.currentTime = 0
        },
        dur: 3000 + CLIP,
        steps: [
            [2200, () => intro.classList.add("dive")],
            [2700, () => (video.classList.add("on"), video.play().catch(() => {}))],
            [3300, () => intro.classList.add("gone")],
        ],
        stop: () => video.pause(),
    }
}

const SCENES = { tflow, kg, lumi, dentigo, pip }
const STAGE_W = 720
const STAGE_H = 450

// builds a scene inside a card's media box; returns play() / stop(), which pause it while off screen
export function mountScene(box, name) {
    box.classList.add("cs-scene", `cs-${name}`)
    const stage = document.createElement("div")
    stage.className = name === "pip" ? "cs-full" : "cs-stage"
    stage.setAttribute("aria-hidden", "true")
    box.append(stage)
    const scene = SCENES[name](stage)
    if (name !== "pip")
        new ResizeObserver(([e]) => {
            const { width: w, height: h } = e.contentRect
            stage.style.transform = `translate(-50%,-50%) scale(${Math.min(w / STAGE_W, h / STAGE_H)})`
        }).observe(box)

    let timers = []
    let playing = false
    const later = (fn, ms) => timers.push(setTimeout(fn, ms))
    const loop = () => {
        box.classList.remove("cs-fading")
        scene.reset()
        scene.steps.forEach(([ms, fn]) => later(fn, ms))
        later(() => box.classList.add("cs-fading"), scene.dur - 450)
        later(loop, scene.dur)
    }
    scene.reset()
    return {
        play() {
            if (playing) return
            playing = true
            if (reduced) scene.steps.forEach(([, fn]) => fn()) // still image of the story's last frame
            else loop()
        },
        stop() {
            playing = false
            timers.forEach(clearTimeout)
            timers = []
            scene.stop?.()
        },
    }
}
