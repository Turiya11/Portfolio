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
        move: (x, y) => {
            cur.style.transform = `translate(${x}px,${y}px)`
            cur.classList.toggle("flip", x > 560) // near the right edge, the label sits left of the arrow
        },
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

/* ------------------------------ KG Hub: the real journey, query → results → map → compare → save → collaborate ------------------------------ */

function kg(el) {
    const SHOT = { left: 60, top: 25, scale: 600 / 1440 } // screens are 1440×960 in Figma
    const at = (x, y) => [SHOT.left + x * SHOT.scale, SHOT.top + y * SHOT.scale]
    const screens = ["a1-query", "a2-results", "b1-map", "b2-compare", "c1-insight", "d4-collab"]
    el.innerHTML = `
      <div class="cs-kgwin" style="left:${SHOT.left}px;top:${SHOT.top}px">
        ${screens.map((n, i) => `<img class="k${i}" src="assets/images/kg/${n}.jpg" alt="" loading="lazy" />`).join("")}
      </div>
      <i class="cs-ring"></i>
      <div class="cs-toast cs-pop" style="left:216px;top:396px"><i></i>Saved to EGFR-TKI toxicity review</div>
      ${cursor("Clinical researcher")}`
    const t = tools(el)
    const ring = t.$(".cs-ring")
    const press = (x, y, w, h) => {
        const [cx, cy] = at(x, y)
        ring.style.cssText = `left:${cx - (w * SHOT.scale) / 2}px;top:${cy - (h * SHOT.scale) / 2}px;width:${w * SHOT.scale}px;height:${h * SHOT.scale}px`
        ring.classList.add("on")
        t.tap()
    }
    const go = (x, y) => t.move(...at(x, y))
    const show = (i) => {
        ring.classList.remove("on")
        t.on(`.k${i}`)
    }
    return {
        reset: () => (t.clear([660, 430]), t.on(".k0")),
        dur: 14500,
        steps: [
            [400, () => go(1221, 866)], // Run query
            [1400, () => press(1221, 862, 300, 44)],
            [1800, () => show(1)],
            [2400, () => go(1355, 227)], // Map relation
            [3400, () => press(1355, 223, 100, 28)],
            [3800, () => show(2)],
            [4400, () => go(849, 94)], // Compare graphs
            [5400, () => press(849, 90, 120, 34)],
            [5800, () => show(3)],
            [6400, () => go(1271, 870)], // Save difference as insight
            [7400, () => press(1271, 866, 240, 40)],
            [7800, () => show(4)],
            [8400, () => go(973, 878)], // Save insight
            [9400, () => press(973, 874, 110, 36)],
            [9800, () => show(5)],
            [10100, () => t.on(".cs-toast")],
            [10600, () => go(1160, 300)],
        ],
    }
}

/* ------------------------------ Lumi: the real screens, from the mother's check-in to the partner's guidance ------------------------------ */

function lumi(el) {
    const shot = (name, cls = "") => `<img class="${cls}" src="assets/images/lumi/${name}.jpg" alt="" />`
    el.innerHTML = `
      <div class="cs-lphone p1" style="left:64px">${shot("home")}${shot("journal", "next n1")}</div>
      <div class="cs-lphone p2" style="left:268px">${shot("patterns")}</div>
      <div class="cs-lphone p3" style="left:472px">${shot("partner")}${shot("partner-guide", "next n3")}</div>
      <i class="cs-ring r1" style="left:172px;top:290px;width:58px;height:20px"></i>
      <i class="cs-ring r2" style="left:280px;top:226px;width:160px;height:86px"></i>
      <i class="cs-ring r3" style="left:480px;top:66px;width:168px;height:70px"></i>
      ${cursor("Mother")}`
    const t = tools(el)
    const label = t.$(".cs-cur span")
    return {
        reset: () => (t.clear([230, 440]), t.on(".p1"), (label.textContent = "Mother")),
        dur: 12000,
        steps: [
            [500, () => t.move(198, 300)],
            [1500, () => (t.on(".r1"), t.tap())],
            [1900, () => (t.$(".r1").classList.remove("on"), t.on(".n1"))],
            [2900, () => t.on(".p2")],
            [3300, () => t.move(360, 300)],
            [4300, () => (t.on(".r2"), t.tap())],
            [5400, () => (t.$(".r2").classList.remove("on"), t.on(".p3"))],
            [5800, () => (label.textContent = "Partner")],
            [5900, () => t.move(562, 124)],
            [6900, () => (t.on(".r3"), t.tap())],
            [7300, () => (t.$(".r3").classList.remove("on"), t.on(".n3"))],
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

/* ------------------------------ Pip: a VR headset, through its lens, into the real footage ------------------------------ */

function pip(el) {
    el.innerHTML = `
      <video class="cs-pipvideo" muted playsinline preload="none" poster="assets/images/pip/ar-pip.jpg"><source src="assets/video/pip-focus-grab.mp4" type="video/mp4" /></video>
      <div class="cs-pipintro"><img src="assets/images/cards/pip-headset.jpg" alt="" /></div>`
    const video = el.querySelector("video")
    const intro = el.querySelector(".cs-pipintro")
    const CLIP = 16000 // length of pip-focus-grab.mp4
    return {
        reset: () => {
            intro.style.transition = "none" // snap back without playing the dive in reverse
            intro.classList.remove("dive", "gone", "push")
            void intro.offsetWidth
            intro.style.transition = ""
            video.classList.remove("on")
            video.pause()
            if (video.readyState) video.currentTime = 0
        },
        dur: 3000 + CLIP,
        steps: [
            [0, () => intro.classList.add("push")],
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
