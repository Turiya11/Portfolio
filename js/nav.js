// Top nav: the lavender pill rests on the current tab and glides (gooey) to whichever tab is hovered.
const bar = document.querySelector(".nav__bar")
const pill = bar.querySelector(".nav__pill")
const links = [...bar.querySelectorAll("a")]

const moveTo = (a) => {
    pill.style.setProperty("--x", `${a.offsetLeft}px`)
    pill.style.setProperty("--w", `${a.offsetWidth}px`)
}
const current = () => links.find((a) => a.getAttribute("aria-current") === "page") || links[0]

links.forEach((a) => {
    a.addEventListener("pointerenter", () => moveTo(a))
    a.addEventListener("focus", () => moveTo(a))
    a.addEventListener("click", () => {
        if (a.getAttribute("href").startsWith("#")) {
            links.forEach((l) => l.removeAttribute("aria-current"))
            a.setAttribute("aria-current", "page")
        }
    })
})
bar.addEventListener("pointerleave", () => moveTo(current()))

// keep the highlight on the section in view
const sections = links
    .map((a) => [a, document.querySelector(a.getAttribute("href").startsWith("#") ? a.getAttribute("href") : null)])
    .filter(([, el]) => el)
const io = new IntersectionObserver(
    (entries) => {
        for (const e of entries) {
            if (!e.isIntersecting) continue
            const hit = sections.find(([, el]) => el === e.target)
            if (!hit) continue
            links.forEach((l) => l.removeAttribute("aria-current"))
            hit[0].setAttribute("aria-current", "page")
            if (!bar.matches(":hover")) moveTo(hit[0])
        }
    },
    { rootMargin: "-45% 0px -45% 0px" }
)
sections.forEach(([, el]) => io.observe(el))

// place it once fonts have settled
moveTo(current())
document.fonts?.ready.then(() => moveTo(current()))
