// Hoverable 3D blue butterflies — a plain-JS port of the Framer "ButterflyHero" component.
// They drift slowly inside the hero (kept within a padding), and hovering / tapping / focusing
// one slows its wings, scales it up and opens a Liquid Glass details card.

const DEFAULTS = {
    details: [
        { tag: "Who I am", title: "UX/UI designer", detail: "Design undergrad at MIT-WPU, Pune. Graduating in 2027." },
        { tag: "Right now", title: "Interning at 3TFlow", detail: "Designing agent-facing workflows, reports modules, ticketing systems and SLA tracking interfaces for an enterprise ITSM platform." },
        { tag: "What I care about", title: "Ethical, human-centered AI", detail: "Inclusive, accessible systems that work for real people." },
        { tag: "Side build", title: "Meeting-to-Figma agent", detail: "An MVP AI agent that turns live meetings into Figma design briefs." },
        { tag: "Home base", title: "Pune, India", detail: "Designing from Pune." },
    ],
    padding: 48,
    layout: "trail", // "trail" | "scattered"
    count: 5,
    minSize: 14,
    maxSize: 42,
    speed: 1,
    flapSpeed: 1,
    seed: 4,
    wingColor: "#1E90FF",
    wingLight: "#6FDCFF",
    edgeColor: "#0A1228",
    dotColor: "#FFFFFF",
}

const CARD_W = 270

const FORE_DOTS = [[18, 11, 1.5], [24, 6, 1.2], [31, 3.8, 1.6], [38, 5.5, 1.1], [44, 9.5, 1.3], [15.5, 21, 1.4], [14.5, 29, 1.1], [18, 37, 1.5], [25, 42, 1.2], [34, 44, 1]]
const HIND_DOTS = [[11.5, 62, 1.4], [10, 70, 1.2], [13.5, 78, 1.6], [21, 84, 1.3], [30, 85, 1.5], [38, 82, 1.1], [45, 75, 1.4], [50, 67, 1]]

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

const wingArt = (mirrored, o) => `
<svg viewBox="0 0 60 90" width="100%" height="100%" aria-hidden="true" style="display:block;overflow:visible${mirrored ? ";transform:scaleX(-1)" : ""}">
  <path d="M60 40 C 58 22, 48 6, 34 2 C 24 0, 15 8, 13 20 C 11 33, 22 45, 60 47 Z" fill="${o.edgeColor}"/>
  <path d="M60 46 C 40 44, 12 50, 7 66 C 3 80, 20 89, 35 85 C 49 81, 59 67, 60 52 Z" fill="${o.edgeColor}"/>
  <path d="M58 40 C 56 26, 47 12, 36 8.5 C 29 6.5, 22 12, 21 22 C 20 32, 28 41, 58 43 Z" fill="url(#${o.gradId || "bf-grad"})"/>
  <path d="M58 49 C 42 47, 20 52, 15 66 C 12 76, 22 81, 32 78 C 44 74, 55 64, 58 54 Z" fill="url(#${o.gradId || "bf-grad"})"/>
  <path d="M58 42 L25 21 M58 42 L35 10 M58 42 L21 31 M58 42 L28 38 M58 50 L18 62 M58 50 L24 74 M58 50 L38 77 M58 50 L16 70" stroke="${o.edgeColor}" stroke-width="1.1" stroke-linecap="round" fill="none" opacity="0.85"/>
  ${[...FORE_DOTS, ...HIND_DOTS].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${o.dotColor}"/>`).join("")}
</svg>`

const bodyArt = (o) => `
<svg class="bf__thorax" viewBox="0 0 20 80" aria-hidden="true">
  <path d="M9 14 C 6 6, 3 3, 0 1 M11 14 C 14 6, 17 3, 20 1" stroke="${o.edgeColor}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  <ellipse cx="10" cy="17" rx="3.6" ry="3.8" fill="${o.edgeColor}"/>
  <ellipse cx="10" cy="30" rx="3.8" ry="9" fill="${o.edgeColor}"/>
  <ellipse cx="10" cy="53" rx="2.8" ry="22" fill="${o.edgeColor}"/>
</svg>`

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c])

// A single butterfly (same art as the hero ones) for decoration elsewhere, e.g. the timeline flock.
// options.gradId picks a wing gradient defined by the caller; options.flap is the flap duration (s).
export function butterflyArt(size, rot = 15, options = {}) {
    const o = { ...DEFAULTS, ...options }
    return `<span class="bf__scale"><span class="bf__persp" style="perspective:${size * 3.2}px">
      <span class="bf__tilt" style="transform:rotateZ(${rot}deg) rotateX(24deg)">
        <span class="bf__wing bf__wing--l" style="--flap:${o.flap || 2}s">${wingArt(false, o)}</span>
        <span class="bf__wing bf__wing--r" style="--flap:${o.flap || 2}s">${wingArt(true, o)}</span>
        ${bodyArt(o)}
      </span></span></span>`
}

export function mountButterflies(container, options = {}) {
    const o = { ...DEFAULTS, ...options }
    const pad = Math.max(0, o.padding)
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches

    // shared wing gradient
    container.insertAdjacentHTML(
        "beforeend",
        `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
           <radialGradient id="bf-grad" cx="1" cy="0.5" r="1">
             <stop offset="0%" stop-color="${o.wingLight}"/><stop offset="45%" stop-color="${o.wingColor}"/><stop offset="100%" stop-color="${o.wingColor}"/>
           </radialGradient></defs></svg>`
    )

    // same layout maths as the Framer component
    const rand = makeRng(o.seed * 7919 + 13)
    const n = Math.max(1, Math.round(o.count))
    const lo = Math.min(o.minSize, o.maxSize)
    const hi = Math.max(o.minSize, o.maxSize)
    const items = Array.from({ length: n }, (_, i) => {
        const t = n === 1 ? 0.5 : i / (n - 1)
        let ox, oy, size
        if (o.layout === "trail") {
            ox = 12 + 70 * t + (rand() - 0.5) * 5
            oy = 24 + 46 * t + 6 * Math.sin(t * 3) + (rand() - 0.5) * 6
            size = lo + (hi - lo) * Math.pow(t, 1.5)
        } else {
            ox = 10 + rand() * 80
            oy = 14 + rand() * 66
            size = lo + (hi - lo) * rand()
        }
        return {
            ox, oy, size,
            ax: 0.012 + rand() * 0.02, ay: 0.016 + rand() * 0.024,
            fx: 0.22 + rand() * 0.2, fy: 0.2 + rand() * 0.22,
            p1: rand() * Math.PI * 2, p2: rand() * Math.PI * 2, p3: rand() * Math.PI * 2, p4: rand() * Math.PI * 2,
            rot0: -25 + rand() * 60,
            flap: 1.7 + rand() * 0.9,
            opacity: 0.92 + rand() * 0.08,
            time: 0, x: 0, y: 0,
        }
    })

    let size = { w: container.clientWidth || 1200, h: container.clientHeight || 700 }
    const originPx = (b) => ({
        x: pad + (b.ox / 100) * Math.max(0, size.w - pad * 2),
        y: pad + (b.oy / 100) * Math.max(0, size.h - pad * 2),
    })

    let open = -1
    const els = items.map((b, i) => {
        const d = o.details.length ? o.details[i % o.details.length] : { tag: "About", title: "Hello", detail: "" }
        const h = b.size * 0.75
        const el = document.createElement("div")
        el.className = "bf"
        el.tabIndex = 0
        el.setAttribute("role", "button")
        el.setAttribute("aria-label", `Butterfly: ${d.title}. ${d.detail}`)
        el.style.cssText = `left:calc(${pad}px + (100% - ${pad * 2}px) * ${b.ox / 100});top:calc(${pad}px + (100% - ${pad * 2}px) * ${b.oy / 100});width:${b.size}px;height:${h}px;margin:${-h / 2}px 0 0 ${-b.size / 2}px;z-index:${Math.round(b.size)}`
        el.innerHTML = `
          <span class="bf__hit"></span>
          <span class="bf__scale" style="opacity:${b.opacity}">
            <span class="bf__persp" style="perspective:${b.size * 3.2}px">
              <span class="bf__tilt" style="transform:rotateZ(${b.rot0}deg) rotateX(24deg)">
                <span class="bf__wing bf__wing--l" style="--flap:${b.flap / Math.max(0.2, o.flapSpeed)}s">${wingArt(false, o)}</span>
                <span class="bf__wing bf__wing--r" style="--flap:${b.flap / Math.max(0.2, o.flapSpeed)}s">${wingArt(true, o)}</span>
                ${bodyArt(o)}
              </span>
            </span>
          </span>
          <span class="bf__card" role="tooltip">
            ${d.tag ? `<span class="bf__tag"><i></i>${esc(d.tag)}</span>` : ""}
            <span class="bf__title">${esc(d.title)}</span>
            <span class="bf__detail">${esc(d.detail)}</span>
          </span>`
        container.append(el)

        const openCard = () => {
            const px = originPx(b).x + b.x
            const py = originPx(b).y + b.y
            el.dataset.v = py < 200 ? "bottom" : "top"
            el.dataset.h = px < CARD_W / 2 + pad ? "left" : px > size.w - CARD_W / 2 - pad ? "right" : "center"
            open = i
            el.classList.add("is-open")
            el.style.zIndex = 1000
        }
        const closeCard = () => {
            if (open === i) open = -1
            el.classList.remove("is-open")
            el.style.zIndex = Math.round(b.size)
        }
        el.addEventListener("pointerenter", (e) => e.pointerType === "mouse" && openCard())
        el.addEventListener("pointerleave", (e) => e.pointerType === "mouse" && closeCard())
        el.addEventListener("focus", openCard)
        el.addEventListener("blur", closeCard)
        el.addEventListener("click", () => (open === i ? closeCard() : openCard()))
        return { el, tilt: el.querySelector(".bf__tilt") }
    })

    if (typeof ResizeObserver !== "undefined") {
        new ResizeObserver(() => {
            size = { w: container.clientWidth || size.w, h: container.clientHeight || size.h }
        }).observe(container)
    }
    if (reduced) return

    // drift: only transforms, only while on screen
    let raf = 0
    let last = performance.now()
    const tick = (now) => {
        const dt = Math.min(0.05, (now - last) / 1000)
        last = now
        const { w, h } = size
        items.forEach((b, i) => {
            if (open !== i) b.time += dt * o.speed
            const t = b.time
            const innerW = Math.max(0, w - pad * 2)
            const innerH = Math.max(0, h - pad * 2)
            let x = b.ax * innerW * Math.sin(t * b.fx + b.p1)
            let y = b.ay * innerH * Math.sin(t * b.fy + b.p3)
            const org = originPx(b)
            const halfW = (b.size * 1.5) / 2
            const halfH = (b.size * 0.75 * 1.5) / 2
            x = Math.min(Math.max(x, Math.min(pad + halfW - org.x, 0)), Math.max(w - pad - halfW - org.x, 0))
            y = Math.min(Math.max(y, Math.min(pad + halfH - org.y, 0)), Math.max(h - pad - halfH - org.y, 0))
            b.x = x
            b.y = y
            const depth = 1 + 0.07 * Math.sin(t * 0.33 + b.p3)
            els[i].el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${depth.toFixed(3)})`
            els[i].tilt.style.transform = `rotateZ(${(b.rot0 + 9 * Math.sin(t * 0.35 + b.p2)).toFixed(1)}deg) rotateX(${(24 + 9 * Math.sin(t * 0.3 + b.p1)).toFixed(1)}deg) rotateY(${(11 * Math.sin(t * 0.27 + b.p4)).toFixed(1)}deg)`
        })
        raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([entry]) => {
        cancelAnimationFrame(raf)
        if (entry.isIntersecting) {
            last = performance.now()
            raf = requestAnimationFrame(tick)
        }
    })
    io.observe(container)
}
