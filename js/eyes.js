// Googly-eyes cursor: two eyes ride beside the normal arrow and their pupils wobble towards where it's heading.
// Mouse / trackpad only — touch screens keep the normal behaviour.
if (matchMedia("(pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const eyes = document.createElement("div")
    eyes.className = "eyes"
    eyes.setAttribute("aria-hidden", "true")
    eyes.innerHTML = `<span class="eye"><i></i></span><span class="eye"><i></i></span>`
    document.body.append(eyes)
    const pupils = [...eyes.querySelectorAll("i")]

    const MAX = 5 // how far a pupil can roll from the centre (px)
    let mx = -100, my = -100, px = mx, py = my
    let ox = 0, oy = 0, vx = 0, vy = 0 // pupil offset + velocity (springy, so they jiggle)
    let running = false

    const tick = () => {
        const dx = mx - px, dy = my - py
        px = mx
        py = my
        eyes.style.translate = `${mx}px ${my}px`

        // look where the cursor is going; drift back to centre when it stops
        const speed = Math.hypot(dx, dy)
        const k = speed ? Math.min(1, speed / 6) * MAX / speed : 0
        vx = (vx + (dx * k - ox) * 0.2) * 0.72
        vy = (vy + (dy * k - oy) * 0.2) * 0.72
        ox += vx
        oy += vy
        const r = Math.hypot(ox, oy)
        if (r > MAX) (ox *= MAX / r), (oy *= MAX / r)
        for (const p of pupils) p.style.translate = `${ox}px ${oy}px`

        running = speed > 0.1 || Math.abs(vx) + Math.abs(vy) + Math.abs(ox) + Math.abs(oy) > 0.05
        if (running) requestAnimationFrame(tick)
    }
    const wake = () => {
        if (!running) (running = true), requestAnimationFrame(tick)
    }

    addEventListener("pointermove", (e) => {
        if (e.pointerType !== "mouse") return
        if (!eyes.classList.contains("is-on")) (px = e.clientX), (py = e.clientY)
        mx = e.clientX
        my = e.clientY
        eyes.classList.add("is-on")
        eyes.classList.toggle("is-link", !!e.target.closest?.("a, button, [role=button], [role=slider]"))
        wake()
    })
    document.documentElement.addEventListener("pointerleave", () => eyes.classList.remove("is-on"))
}
