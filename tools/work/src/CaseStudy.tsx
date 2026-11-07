// The one case-study layout: Brief (context, background, impact) → Understanding → What I did → Process → Reflection.
// Very visual on purpose: one line of text per block, and the interface gets the width of the page.
// Only Understanding, the research, carries sticky notes and text. Every screen is a video (tools/work/video/).
import * as React from "react"
import StickyWall, { type StickyGroup } from "./StickyWall"
import JourneyMap, { type Persona } from "./JourneyMap"
import ResearchFolders, { type Folder } from "./ResearchFolders"

type ClipData = { src: string; poster?: string; label?: string; sound?: boolean; ratio?: number }
type Did = { lead: string; text: string; clips: ClipData[]; phones?: boolean }
type Props = {
    backLink: string
    title: string
    meta: string
    headline: string
    accent: string
    note?: string
    nda?: boolean // shows the note as a highlighted box with a lock
    link?: { href: string; label: string }
    ratio?: number // width ÷ height of the wide videos
    hero: ClipData & { phone?: boolean; ratio?: number; title?: string }
    brief: { context: string; background: string; impact: { n: string; l: string }[]; impactNote?: string }
    understanding: { quote: string; method: string; stickiesTitle?: string; stickies: StickyGroup[] }
    research?: { statement: string; folders: Folder[] }
    ecosystem?: { statement: string; hubLabel?: string; personas: Persona[] }
    story?: { did?: string; process?: string; reflection?: string } // the line that carries the reader from one section to the next
    didNote?: string
    why?: { title: string; statement: string; points: { label: string; text: string }[] } // why this medium, shown before the work
    did: Did[]
    process: { label: string; image: string }[]
    reflection: { label: string; text: string }[]
    next: { title: string; link: string }
}

const SECTIONS = [
    ["brief", "Brief"],
    ["research", "Research"], // research and ecosystem: only on pages that have them
    ["understanding", "Understanding"],
    ["ecosystem", "Ecosystem"],
    ["did", "What I did"],
    ["process", "Process"],
    ["reflection", "Reflection"],
]

const CSS = `
.cs{--edge:rgba(255,255,255,.72);--rail:188px;--gut:clamp(16px,2.6vw,40px);
  min-height:100vh;color:var(--ink);font-family:var(--sans);-webkit-font-smoothing:antialiased;line-height:1.45;
  background:radial-gradient(circle at 88% 120px,rgba(255,217,163,.55) 0,rgba(255,217,163,0) 260px),linear-gradient(180deg,#BFD9FF 0,#EAF3FF 900px,#DAD8FF 45%,#F8E9F2 75%,#F3EEE2 100%)}
.cs a{color:inherit;text-decoration:none}
.cs :focus-visible{outline:2px solid var(--ai);outline-offset:3px;border-radius:6px}
.cs-rail{position:fixed;left:0;top:0;bottom:0;width:var(--rail);padding:34px 18px 28px 30px;display:flex;flex-direction:column;justify-content:center;z-index:4}
.cs-back{position:absolute;top:36px;left:30px;font-size:var(--t-label);font-weight:600;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--soft);transition:color .2s}
.cs-back:hover{color:var(--ink)}
.cs-rail nav{display:flex;flex-direction:column;gap:6px}
.cs-rail nav a{position:relative;padding:7px 0 7px 16px;font-size:var(--t-small);font-weight:400;color:var(--quiet);transition:color .2s}
.cs-rail nav a:hover{color:var(--ink)}
.cs-rail nav a.on{color:var(--ai);font-weight:600}
.cs-rail nav a.on:before{content:'';position:absolute;left:0;top:7px;bottom:7px;width:3px;border-radius:2px;background:var(--a)}
.cs-main{margin-left:var(--rail);padding:92px var(--gut) 40px;display:flex;flex-direction:column;gap:clamp(72px,9vw,128px)}
.cs-top{display:flex;flex-direction:column;gap:clamp(24px,3vw,36px)}
.cs-top h1{margin:0;font-size:var(--t-display);font-weight:600;letter-spacing:var(--ls-display);line-height:1}
.cs-top h1.long{line-height:1}
.cs-top .cs-head{margin:14px 0 0;font-size:var(--t-h2);font-weight:600;letter-spacing:var(--ls-h2);line-height:1.15}
.cs-meta{margin:0 0 14px;font-size:var(--t-label);font-weight:600;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--ai)}
.cs-top.phone{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:clamp(24px,5vw,72px);align-items:center}
.cs-sec{display:flex;flex-direction:column;gap:clamp(22px,2.6vw,34px);scroll-margin-top:32px}
.cs-eye{margin:0;font-size:var(--t-label);font-weight:600;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--quiet)}
.cs-state{margin:0;font-size:var(--t-h2);font-weight:600;letter-spacing:var(--ls-h2);line-height:1.15}
.cs-state b{color:var(--ai);font-weight:600}
.cs-small{margin:0;font-size:var(--t-small);font-weight:400;line-height:1.5;color:var(--soft)}
.cs-small a{text-decoration:underline;text-underline-offset:3px}
.cs-nda{display:flex;align-items:flex-start;gap:14px;margin:0;padding:clamp(16px,1.8vw,22px) clamp(18px,2.2vw,28px);border-radius:18px;background:var(--ai);color:#fff;font-size:var(--t-body);font-weight:600;line-height:1.5;box-shadow:0 18px 36px -22px rgba(60,40,150,.6)}
.cs-nda svg{flex:none;width:24px;height:24px;margin-top:1px}
.cs-brief{display:grid;grid-template-columns:1fr 1fr 1.25fr;gap:16px}
.cs-card{padding:clamp(20px,2vw,28px);border-radius:22px;border:1px solid var(--edge);background:linear-gradient(145deg,rgba(255,255,255,.66),rgba(255,255,255,.34));box-shadow:inset 0 1px 0 rgba(255,255,255,.85),0 18px 36px -24px rgba(60,70,170,.3);display:flex;flex-direction:column;gap:12px}
.cs-card p{margin:0;font-size:var(--t-body);font-weight:400;line-height:1.5}
.cs-card .cs-eye{font-size:var(--t-label);font-weight:600;letter-spacing:var(--ls-caps);line-height:inherit}
.cs-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.cs-stats b{display:block;font-size:var(--t-h2);font-weight:600;letter-spacing:var(--ls-h2);line-height:1.15;color:var(--ai)}
.cs-stats span{display:block;margin-top:6px;font-size:var(--t-small);font-weight:400;line-height:1.5;color:var(--soft)}
.cs-did{display:flex;flex-direction:column;gap:clamp(64px,7vw,104px)}
.cs-item{display:flex;flex-direction:column;gap:clamp(16px,1.8vw,24px)}
.cs-clip{position:relative;width:100%;margin:0;border-radius:clamp(12px,1.4vw,20px);overflow:hidden;background:#fff;box-shadow:0 0 0 1px rgba(40,50,90,.08),0 32px 64px -32px rgba(40,50,110,.5);line-height:0;cursor:pointer}
.cs-clip video{display:block;width:100%;height:auto;object-fit:cover}
.cs-clip.wide{max-width:calc(100vh * var(--ar))}
.cs-clip.wide video{aspect-ratio:var(--ar)}
.cs-clip.phone{border-radius:clamp(18px,2.2vw,30px)}
.cs-clip.phone video{aspect-ratio:618/1376}
.cs-ctrl{position:absolute;right:12px;bottom:12px;display:flex;gap:6px;line-height:1}
.cs-ctrl button{display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:34px;padding:0 10px;border:0;border-radius:999px;background:rgba(20,24,40,.62);color:#fff;font:600 12px/1 'Mona Sans',system-ui,sans-serif;cursor:pointer;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.cs-phones{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(12px,1.8vw,24px)}
.cs-phones figure{margin:0;display:flex;flex-direction:column;gap:10px;min-width:0}
.cs-phones .cs-clip{max-width:calc(92vh * 0.449);margin:0 auto}
.cs-phones figcaption{text-align:center;font-size:var(--t-small);font-weight:500;color:var(--soft)}
.cs-top.phone .cs-clip{width:min(29vw,calc(84vh * 0.449));min-width:250px}
.cs-proc{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.cs-proc button{display:flex;flex-direction:column;gap:10px;min-width:0;padding:0;border:0;background:none;color:inherit;font:inherit;text-align:left;cursor:zoom-in}
.cs-proc span.cs-thumb{display:block;aspect-ratio:4/3;border-radius:16px;overflow:hidden;background:rgba(255,255,255,.8);box-shadow:0 0 0 1px rgba(40,50,90,.07),0 20px 40px -28px rgba(40,50,110,.5)}
.cs-proc img{display:block;width:100%;height:100%;padding:8px;object-fit:contain;transition:transform .5s cubic-bezier(.2,.8,.25,1)}
.cs-proc button:hover img{transform:scale(1.04)}
.cs-lb{width:min(1320px,94vw);max-width:none;max-height:90vh;padding:0;border:0;border-radius:24px;background:#fbfaf7;color:var(--ink);box-shadow:0 40px 90px -20px rgba(20,20,60,.6);overflow:hidden}
.cs-lb[open]{display:flex;flex-direction:column;animation:cs-lb-in .28s cubic-bezier(.2,.9,.25,1)}
.cs-lb::backdrop{background:rgba(25,25,55,.55);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
@keyframes cs-lb-in{from{opacity:0;transform:translateY(14px) scale(.985)}to{opacity:1;transform:none}}
.cs-lb-head{flex:none;display:flex;align-items:center;gap:10px;padding:14px clamp(16px,2.4vw,28px);border-bottom:1px solid rgba(30,35,60,.1)}
.cs-lb-head h3{flex:1;min-width:0;margin:0;font-size:var(--t-h3);font-weight:600;letter-spacing:var(--ls-h3);line-height:1.25}
.cs-lb-head small{flex:none;font-size:var(--t-small);font-weight:500;color:var(--quiet)}
.cs-lb-btn{flex:none;width:40px;height:40px;border:0;border-radius:50%;background:rgba(30,35,60,.08);color:var(--ink);font-size:19px;line-height:1;cursor:pointer}
.cs-lb-btn:hover{background:rgba(30,35,60,.15)}
.cs-lb-btn:disabled{opacity:.35;cursor:default}
.cs-lb-body{flex:1 1 auto;min-height:0;overflow:auto;overscroll-behavior:contain;padding:clamp(12px,2vw,24px)}
.cs-lb-body:focus{outline:none}
.cs-lb-body{display:flex;flex-direction:column}
.cs-lb-body img{display:block;flex-shrink:0;width:100%;height:auto;margin:auto 0;border-radius:12px}
@media (max-width:680px){.cs-lb{width:100vw;max-height:100dvh;height:100dvh;border-radius:0}.cs-lb-head small{display:none}}
@media (prefers-reduced-motion:reduce){.cs-lb[open]{animation:none}}
.cs-proc small{font-size:var(--t-small);font-weight:500;color:var(--soft)}
.cs-why{display:flex;flex-direction:column;gap:clamp(16px,1.8vw,24px);padding:clamp(8px,1.4vw,20px) 0 clamp(16px,2vw,28px)}
.cs-why > .cs-eye{color:var(--ai)}
.cs-refl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.cs-next{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:clamp(24px,3vw,40px) clamp(24px,3.4vw,48px);border-radius:28px}
.cs-next small{display:block;font-size:var(--t-label);font-weight:600;letter-spacing:var(--ls-caps);text-transform:uppercase}
.cs-next b{display:block;margin-top:6px;font-size:var(--t-display);font-weight:600;letter-spacing:var(--ls-display);line-height:1}
.cs-next span{flex:none;display:inline-flex;align-items:center;justify-content:center;width:clamp(48px,6vw,72px);height:clamp(48px,6vw,72px);border-radius:50%;font-size:24px}
@media (max-width:1040px){
  .cs{--rail:0px}
  .cs-rail nav{display:none}
  .cs-rail{position:static;width:auto;padding:0;display:block}
  .cs-back{position:fixed;top:24px;left:var(--gut);z-index:5;display:inline-flex;align-items:center;height:42px;padding:0 18px;border-radius:999px;border:1px solid var(--edge);background:rgba(255,255,255,.5);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)}
  .cs-brief{grid-template-columns:1fr}
  .cs-proc{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:680px){
  .cs-top.phone{grid-template-columns:1fr}
  .cs-top.phone .cs-clip{width:min(100%,340px);margin:0 auto}
  .cs-back{padding:0 14px}
  .cs-phones{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;margin:0 calc(var(--gut) * -1);padding:0 var(--gut) 8px;gap:12px}
  .cs-phones figure{flex:0 0 74vw;scroll-snap-align:center}
  .cs-proc,.cs-refl{grid-template-columns:1fr}
}
`

/* Plays while on screen and pauses when it scrolls away. Nothing downloads until it is close to the viewport. */
function Clip({ clip, cls, ratio }: { clip: ClipData; cls: string; ratio?: number }) {
    const box = React.useRef<HTMLElement | null>(null)
    const video = React.useRef<HTMLVideoElement | null>(null)
    const [paused, setPaused] = React.useState(false)
    const [muted, setMuted] = React.useState(true)
    const manual = React.useRef(false)

    React.useEffect(() => {
        const v = video.current
        if (!v) return
        v.muted = true
        const calm = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
        if (calm) {
            manual.current = true
            setPaused(true)
        }
        // setting src cancels a pending play(), so it always happens first
        const fetchIt = () => {
            if (!v.getAttribute("src")) v.setAttribute("src", clip.src)
        }
        const near = new IntersectionObserver(
            ([e]) => {
                if (!e.isIntersecting) return
                fetchIt()
                near.disconnect()
            },
            { rootMargin: "900px 0px" }
        )
        const seen = new IntersectionObserver(
            ([e]) => {
                if (manual.current) return
                if (e.isIntersecting) {
                    fetchIt()
                    v.play().catch(() => setPaused(true))
                } else v.pause()
            },
            { threshold: 0.35 }
        )
        near.observe(v)
        seen.observe(v)
        return () => {
            near.disconnect()
            seen.disconnect()
        }
    }, [clip.src])

    const toggle = () => {
        const v = video.current
        if (!v) return
        manual.current = true
        if (v.paused) {
            if (!v.getAttribute("src")) v.setAttribute("src", clip.src)
            v.play()
            setPaused(false)
        } else {
            v.pause()
            setPaused(true)
        }
    }

    return (
        <figure className={`cs-clip ${cls}`} ref={box} style={ratio ? ({ "--ar": ratio } as React.CSSProperties) : undefined} onClick={toggle}>
            <video ref={video} poster={clip.poster} muted loop playsInline preload="none" aria-label={clip.label} onPause={() => setPaused(true)} onPlay={() => setPaused(false)} />
            <div className="cs-ctrl" onClick={(e) => e.stopPropagation()}>
                {clip.sound ? (
                    <button
                        type="button"
                        aria-pressed={!muted}
                        onClick={() => {
                            const v = video.current
                            if (!v) return
                            v.muted = !v.muted
                            setMuted(v.muted)
                        }}
                    >
                        {muted ? "Sound on" : "Sound off"}
                    </button>
                ) : null}
                <button type="button" aria-label={paused ? "Play video" : "Pause video"} onClick={toggle}>
                    {paused ? "▶" : "❚❚"}
                </button>
            </div>
        </figure>
    )
}

export default function CaseStudy(p: Props) {
    const [on, setOn] = React.useState("")
    // process images open in a pop-up instead of a new tab
    const [shot, setShot] = React.useState<number | null>(null)
    const lb = React.useRef<HTMLDialogElement | null>(null)
    const lbBody = React.useRef<HTMLDivElement | null>(null)
    const thumb = (src: string) => (src.includes("framerusercontent") ? src + "?scale-down-to=1024" : src)
    const [sharp, setSharp] = React.useState<number | null>(null) // which pop-up image has its full size loaded
    React.useEffect(() => {
        if (shot === null) return
        const src = p.process[shot].image
        if (thumb(src) === src) return setSharp(shot)
        // the thumbnail is already cached, so it shows at once and the full image replaces it; Safari would otherwise open a thin, empty pop-up
        const im = new Image()
        im.onload = () => setSharp(shot)
        im.src = src
        return () => {
            im.onload = null
        }
    }, [shot])
    const step = (d: number) => setShot((i) => (i === null ? i : Math.min(p.process.length - 1, Math.max(0, i + d))))

    React.useEffect(() => {
        const d = lb.current
        if (!d || shot === null) return
        if (!d.open) d.showModal() // native dialog: keeps focus inside, Esc closes, focus returns to the thumbnail
        if (lbBody.current) {
            lbBody.current.scrollTop = 0
            lbBody.current.focus({ preventScroll: true })
        }
    }, [shot])

    React.useEffect(() => {
        if (shot === null) return
        const html = document.documentElement
        const before = html.style.overflow
        html.style.overflow = "hidden"
        return () => {
            html.style.overflow = before
        }
    }, [shot === null])

    React.useEffect(() => {
        const secs = SECTIONS.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
        const onScroll = () => {
            let cur = ""
            for (const s of secs) if (s.getBoundingClientRect().top < window.innerHeight * 0.4) cur = s.id
            setOn(cur)
        }
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const heading = (
        <div>
            <p className="cs-meta">{p.meta}</p>
            <h1 className={p.title.length > 14 ? "long" : undefined}>{p.title}</h1>
            <p className="cs-head">{p.headline}</p>
        </div>
    )
    const theme = { "--a": p.accent, "--ai": p.accent } as React.CSSProperties

    return (
        <div className="cs" style={theme}>
            <style>{CSS}</style>
            <aside className="cs-rail">
                <a className="cs-back" href={p.backLink}>
                    ← Back to work
                </a>
                <nav aria-label="Contents">
                    {SECTIONS.filter(([id]) => (id !== "ecosystem" || p.ecosystem) && (id !== "research" || p.research)).map(([id, label]) => (
                        <a key={id} href={`#${id}`} className={on === id ? "on" : ""} aria-current={on === id ? "true" : undefined}>
                            {label}
                        </a>
                    ))}
                </nav>
            </aside>

            <main className="cs-main">
                {p.hero.phone ? (
                    <header className="cs-top phone">
                        {heading}
                        <Clip clip={p.hero} cls="phone" />
                    </header>
                ) : (
                    <header className="cs-top">
                        {heading}
                        {p.hero.title ? (
                            <p className="cs-state">
                                <b>{p.hero.title}</b>
                            </p>
                        ) : null}
                        <Clip clip={p.hero} cls="wide" ratio={p.hero.ratio || p.ratio} />
                    </header>
                )}

                <section className="cs-sec" id="brief">
                    <div className="cs-brief">
                        <div className="cs-card">
                            <p className="cs-eye">Context</p>
                            <p>{p.brief.context}</p>
                        </div>
                        <div className="cs-card">
                            <p className="cs-eye">Background</p>
                            <p>{p.brief.background}</p>
                        </div>
                        <div className="cs-card">
                            <p className="cs-eye">Impact</p>
                            <div className="cs-stats">
                                {p.brief.impact.map((s) => (
                                    <div key={s.l}>
                                        <b>{s.n}</b>
                                        <span>{s.l}</span>
                                    </div>
                                ))}
                            </div>
                            {p.brief.impactNote ? <p className="cs-small">{p.brief.impactNote}</p> : null}
                        </div>
                    </div>
                    {p.note && p.nda ? (
                        <p className="cs-nda">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <rect x="4" y="10.5" width="16" height="10.5" rx="2.5" />
                                <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
                                <circle cx="12" cy="15.5" r="1.3" fill="currentColor" stroke="none" />
                            </svg>
                            <span>{p.note}</span>
                        </p>
                    ) : p.note || p.link ? (
                        <p className="cs-small">
                            {p.note}{" "}
                            {p.link ? (
                                <a href={p.link.href} target="_blank" rel="noreferrer">
                                    {p.link.label}
                                </a>
                            ) : null}
                        </p>
                    ) : null}
                </section>

                {p.research ? (
                    <section className="cs-sec" id="research">
                        <p className="cs-eye">Research</p>
                        <p className="cs-state">{p.research.statement}</p>
                        <ResearchFolders folders={p.research.folders} />
                    </section>
                ) : null}

                <section className="cs-sec" id="understanding">
                    <p className="cs-eye">Understanding the pain point</p>
                    <p className="cs-state">{p.understanding.quote}</p>
                    <p className="cs-small">{p.understanding.method}</p>
                    <StickyWall groups={p.understanding.stickies} title={p.understanding.stickiesTitle} />
                </section>

                {p.ecosystem ? (
                    <section className="cs-sec" id="ecosystem">
                        <p className="cs-eye">Ecosystem</p>
                        <p className="cs-state">{p.ecosystem.statement}</p>
                        <JourneyMap personas={p.ecosystem.personas} hubLabel={p.ecosystem.hubLabel} />
                    </section>
                ) : null}

                <section className="cs-sec" id="did">
                    <p className="cs-eye">What I did</p>
                    {p.story?.did ? <p className="cs-state">{p.story.did}</p> : null}
                    {p.why ? (
                        <div className="cs-why">
                            <p className="cs-eye">{p.why.title}</p>
                            <p className="cs-state">{p.why.statement}</p>
                            <div className="cs-refl">
                                {p.why.points.map((r) => (
                                    <div className="cs-card" key={r.label}>
                                        <p className="cs-eye">{r.label}</p>
                                        <p>{r.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                    {p.didNote ? <p className="cs-small">{p.didNote}</p> : null}
                    <div className="cs-did">
                        {p.did.map((d) => (
                            <article className="cs-item" key={d.lead}>
                                <p className="cs-state">
                                    <b>{d.lead}</b> {d.text}
                                </p>
                                {d.phones ? (
                                    <div className="cs-phones">
                                        {d.clips.map((c) => (
                                            <figure key={c.src}>
                                                <Clip clip={c} cls="phone" />
                                                {c.label ? <figcaption>{c.label}</figcaption> : null}
                                            </figure>
                                        ))}
                                    </div>
                                ) : (
                                    <Clip clip={d.clips[0]} cls="wide" ratio={d.clips[0].ratio || p.ratio} />
                                )}
                            </article>
                        ))}
                    </div>
                </section>

                <section className="cs-sec" id="process">
                    <p className="cs-eye">Process</p>
                    {p.story?.process ? <p className="cs-state">{p.story.process}</p> : null}
                    <div className="cs-proc">
                        {p.process.map((s, i) => (
                            <button type="button" key={s.label} aria-haspopup="dialog" onClick={() => setShot(i)}>
                                <span className="cs-thumb">
                                    {/* Framer serves a small copy for the thumbnail; the pop-up shows the full image */}
                                    <img src={thumb(s.image)} alt={s.label} loading="lazy" decoding="async" />
                                </span>
                                <small>{s.label}</small>
                            </button>
                        ))}
                    </div>
                    <dialog
                        className="cs-lb"
                        ref={lb}
                        aria-labelledby="cs-lb-t"
                        onClose={() => {
                            if (!lb.current?.open) setShot(null) // a quick click on the next thumbnail may have reopened it already
                        }}
                        onClick={(e) => {
                            if (e.target === lb.current) lb.current?.close() // a click on the backdrop lands on the dialog itself
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "ArrowRight") step(1)
                            if (e.key === "ArrowLeft") step(-1)
                        }}
                    >
                        {shot !== null ? (
                            <>
                                <header className="cs-lb-head">
                                    <h3 id="cs-lb-t">{p.process[shot].label}</h3>
                                    <small>
                                        {shot + 1} / {p.process.length}
                                    </small>
                                    <button type="button" className="cs-lb-btn" aria-label="Previous image" disabled={shot === 0} onClick={() => step(-1)}>
                                        ‹
                                    </button>
                                    <button type="button" className="cs-lb-btn" aria-label="Next image" disabled={shot === p.process.length - 1} onClick={() => step(1)}>
                                        ›
                                    </button>
                                    <button type="button" className="cs-lb-btn" aria-label="Close" onClick={() => lb.current?.close()}>
                                        ✕
                                    </button>
                                </header>
                                <div className="cs-lb-body" ref={lbBody} tabIndex={0}>
                                    <img src={sharp === shot ? p.process[shot].image : thumb(p.process[shot].image)} alt={p.process[shot].label} />
                                </div>
                            </>
                        ) : null}
                    </dialog>
                </section>

                <section className="cs-sec" id="reflection">
                    <p className="cs-eye">Reflection</p>
                    {p.story?.reflection ? <p className="cs-state">{p.story.reflection}</p> : null}
                    <div className="cs-refl">
                        {p.reflection.map((r) => (
                            <div className="cs-card" key={r.label}>
                                <p className="cs-eye">{r.label}</p>
                                <p>{r.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <a className="cs-next" href={p.next.link}>
                    <div>
                        <small>Next project</small>
                        <b>{p.next.title}</b>
                    </div>
                    <span aria-hidden="true">→</span>
                </a>
            </main>
        </div>
    )
}
