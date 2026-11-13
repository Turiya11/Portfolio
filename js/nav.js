// Top nav: the lavender pill rests on the current tab and glides (gooey) to whichever tab is hovered.
// Hover only means a mouse: a phone "hovers" whatever was last tapped and never lets go, which froze the pill.
const bar = document.querySelector(".nav__bar")
const pill = bar.querySelector(".nav__pill")
const links = [...bar.querySelectorAll("a")]

const moveTo = (a) => {
    pill.style.setProperty("--x", `${a.offsetLeft}px`)
    pill.style.setProperty("--w", `${a.offsetWidth}px`)
}
const current = () => links.find((a) => a.getAttribute("aria-current") === "page") || links[0]

let hovering = false
links.forEach((a) => {
    a.addEventListener("pointerenter", (e) => {
        if (e.pointerType !== "mouse") return
        hovering = true
        moveTo(a)
    })
    a.addEventListener("focus", () => moveTo(a))
    a.addEventListener("click", () => {
        if (!a.getAttribute("href").startsWith("#")) return
        links.forEach((l) => l.removeAttribute("aria-current"))
        a.setAttribute("aria-current", "page")
        moveTo(a)
        // hold the pill on the tapped tab while the page scrolls there, instead of flicking through the sections on the way
        clearTimeout(arriving)
        arriving = setTimeout(arrived, 1400)
    })
})
bar.addEventListener("pointerleave", () => {
    hovering = false
    moveTo(current())
})

// keep the highlight on the section in view: the last one whose top has passed the middle of the screen
// (#top wraps the whole page, so it only wins above #work; Passion and the garden keep the tab before them)
const sections = links
    .map((a) => [a, document.querySelector(a.getAttribute("href").startsWith("#") ? a.getAttribute("href") : null)])
    .filter(([, el]) => el)
let active = null
let arriving = 0
const arrived = () => {
    clearTimeout(arriving)
    arriving = 0
    active = null
    sync()
}
addEventListener("scrollend", () => arriving && arrived())
const sync = () => {
    if (arriving) return
    const mid = innerHeight / 2
    const hit = sections.filter(([, el]) => el.getBoundingClientRect().top <= mid).pop()
    if (!hit || hit === active) return
    active = hit
    links.forEach((l) => l.removeAttribute("aria-current"))
    hit[0].setAttribute("aria-current", "page")
    if (!hovering) moveTo(hit[0])
}
addEventListener("scroll", sync, { passive: true })
addEventListener("resize", sync)
addEventListener("load", sync)
sync()

// place it once fonts have settled
moveTo(current())
document.fonts?.ready.then(() => moveTo(current()))
