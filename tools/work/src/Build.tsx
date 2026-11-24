// "What I did", before the final screens: the steps that got there.
// Sketches scroll sideways, lo-fi screens and boards sit full width, and a style guide is drawn live (real swatches, real type) when the project's tokens are known.
// Every image opens in the page's pop-up, through onOpen.
import * as React from "react"
import PipStyle from "./PipStyle"

export type Shot = { src: string; label: string; clear?: boolean; span?: boolean } // span: takes the whole row of a grid // clear: a cut-out with a transparent background, shown without a card behind it
export type StyleGuide = {
    colors: { group: string; swatches: { hex: string; name: string }[] }[]
    type: { family: string; css: string; google?: string; note: string; scale: { name: string; size: number; weight: number }[] }[]
}
export type Step = {
    tag: string
    lead: string
    text: string
    strip?: Shot[] // a sideways row, for sketches
    phones?: boolean // the strip holds phone screens: narrower cards, cut out from their background
    captioned?: boolean // the images carry their own title and note, so no label underneath
    grid?: Shot[] // two or three across, for UI elements
    wide?: Shot & { crop?: boolean } // one board, full width; crop keeps a very tall board to one screen
    style?: StyleGuide
    pipStyle?: string // Pip's live design system board; the value is the 3D model to show
}

const CSS = `
.bd{display:flex;flex-direction:column;gap:clamp(56px,6vw,88px)}
.bd-step{display:flex;flex-direction:column;gap:clamp(16px,1.8vw,24px);min-width:0}
.bd-tag{display:flex;align-items:center;gap:10px;margin:0;font-size:var(--t-label);font-weight:600;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--ai)}
.bd-tag span{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:var(--a);color:#fff;font-size:11px;letter-spacing:0}
.bd-tag i{flex:1;height:1px;background:linear-gradient(90deg,color-mix(in srgb,var(--a) 35%,transparent),transparent)}
.bd-head{display:flex;align-items:flex-end;gap:16px}
.bd-head .cs-state{flex:1;min-width:0}
.bd-nav{flex:none;display:flex;gap:8px}
.bd-nav button{width:42px;height:42px;border:1px solid rgba(255,255,255,.8);border-radius:50%;background:rgba(255,255,255,.6);color:var(--ink);font-size:18px;line-height:1;cursor:pointer;box-shadow:0 10px 20px -14px rgba(40,50,110,.5);transition:background .2s,opacity .2s}
.bd-nav button:hover{background:#fff}
.bd-nav button:disabled{opacity:.35;cursor:default}
.bd-strip{display:flex;gap:clamp(12px,1.6vw,20px);overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;margin:0 calc(var(--gut) * -1) 0 0;padding:4px var(--gut) 18px 0}
.bd-strip::-webkit-scrollbar{display:none}
.bd-shot{display:flex;flex-direction:column;gap:10px;min-width:0;margin:0;padding:0;border:0;background:none;color:inherit;font:inherit;text-align:left;cursor:zoom-in}
.bd-strip .bd-shot{flex:0 0 min(620px,80%);scroll-snap-align:start}
.bd-strip.phones{gap:clamp(14px,2vw,28px)}
.bd-strip.phones .bd-shot{flex:0 0 clamp(170px,19vw,250px)}
.bd-strip.phones .bd-frame img{filter:drop-shadow(0 18px 24px rgba(40,50,110,.22)) drop-shadow(0 2px 4px rgba(40,50,110,.1))}
.bd-frame{display:block;border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 0 0 1px rgba(40,50,90,.08),0 24px 44px -30px rgba(40,50,110,.55);transition:transform .45s cubic-bezier(.2,.8,.25,1),box-shadow .45s}
.bd-shot:hover .bd-frame{transform:translateY(-4px);box-shadow:0 0 0 1px rgba(40,50,90,.08),0 34px 54px -30px rgba(40,50,110,.6)}
.bd-frame img{display:block;width:100%;height:auto}
.bd-shot.own .bd-frame{padding:14px 16px 16px}
.bd-shot small{font-size:var(--t-small);font-weight:500;color:var(--soft)}
.bd-wide .bd-frame{border-radius:clamp(12px,1.4vw,20px)}
.bd-wide.crop .bd-frame{position:relative;max-height:min(78vh,760px)}
.bd-wide.crop .bd-frame:after{content:'Open the full board';position:absolute;left:0;right:0;bottom:0;padding:70px 0 18px;text-align:center;font-size:var(--t-small);font-weight:600;color:#fff;background:linear-gradient(180deg,transparent,rgba(15,12,40,.85))}
.bd-grid{display:grid;grid-template-columns:repeat(var(--c,3),minmax(0,1fr));gap:clamp(12px,1.6vw,20px);align-items:start}
.bd-grid .bd-frame{display:flex;align-items:center;justify-content:center;aspect-ratio:4/3;padding:clamp(10px,1.4vw,18px);background:rgba(255,255,255,.85)}
.bd-grid .bd-frame img{width:100%;height:100%;object-fit:contain}
.bd-frame.clear,.bd-grid .bd-frame.clear{background:none;box-shadow:none;border-radius:0;overflow:visible}
.bd-grid .bd-frame.clear{aspect-ratio:auto;padding:0;justify-content:flex-start}
.bd-grid .bd-frame.clear img{width:auto;max-width:100%;height:auto;max-height:520px}
.bd-grid .bd-shot.span{grid-column:1/-1}
.bd-shot:hover .bd-frame.clear{box-shadow:none}
.bd-wide.crop .bd-frame.clear{overflow:hidden}
.bd-wide.crop .bd-frame.clear img{-webkit-mask-image:linear-gradient(180deg,#000 72%,transparent 97%);mask-image:linear-gradient(180deg,#000 72%,transparent 97%)}
.bd-wide.crop .bd-frame.clear:after{background:none;color:var(--ai);padding:0 0 8px}
.bd-frame.clear img{filter:drop-shadow(0 16px 26px rgba(40,50,110,.2)) drop-shadow(0 2px 4px rgba(40,50,110,.08))}
.bd-sg{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:16px}
.bd-sg > div{padding:clamp(20px,2.2vw,30px);border-radius:22px;border:1px solid var(--edge);background:linear-gradient(145deg,rgba(255,255,255,.7),rgba(255,255,255,.38));box-shadow:inset 0 1px 0 rgba(255,255,255,.85),0 18px 36px -24px rgba(60,70,170,.3);display:flex;flex-direction:column;gap:20px;min-width:0}
.bd-sg.only{grid-template-columns:1fr}
.bd-sg h4{margin:0;font-size:var(--t-label);font-weight:600;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--quiet)}
.bd-row{display:flex;flex-direction:column;gap:10px}
.bd-sw{display:grid;grid-template-columns:repeat(auto-fill,minmax(84px,1fr));gap:12px}
.bd-sw div{display:flex;flex-direction:column;gap:6px;min-width:0}
.bd-sw b{display:block;height:58px;border-radius:14px;box-shadow:inset 0 0 0 1px rgba(20,20,40,.08);transition:transform .35s cubic-bezier(.3,1.6,.5,1)}
.bd-sw div:hover b{transform:translateY(-3px) scale(1.04)}
.bd-sw span{font-size:12px;font-weight:600;line-height:1.2;color:var(--ink)}
.bd-sw code{font:500 11px/1.2 ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--quiet);text-transform:uppercase}
.bd-type{display:flex;flex-direction:column;gap:14px}
.bd-type + .bd-type{padding-top:18px;border-top:1px solid rgba(30,35,60,.1)}
.bd-aa{display:flex;align-items:flex-end;gap:14px}
.bd-aa b{font-size:clamp(56px,6vw,84px);line-height:.9;font-weight:600;color:var(--ai)}
.bd-aa p{margin:0 0 4px;font-size:var(--t-small);line-height:1.4;color:var(--soft)}
.bd-aa p strong{display:block;font-size:var(--t-body);color:var(--ink)}
.bd-scale{display:flex;flex-direction:column;gap:6px;margin:0;padding:0;list-style:none}
.bd-scale li{display:flex;align-items:baseline;gap:12px;min-width:0}
.bd-scale small{flex:none;width:100px;white-space:nowrap;font:500 11px/1.2 ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--quiet)}
.bd-scale span{min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;line-height:1.2;color:var(--ink)}
.bd-final{display:flex;flex-direction:column;gap:clamp(16px,1.8vw,24px)}
@media (max-width:900px){
  .bd-sg{grid-template-columns:1fr}
}
@media (max-width:760px){
  .bd-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .bd-strip .bd-shot{flex-basis:86%}
  .bd-nav{display:none}
}
@media (prefers-reduced-motion:reduce){
  .bd-frame,.bd-sw b{transition:none}
}
`

function Shots({ shots, onOpen, cls, bare }: { shots: Shot[]; onOpen: (l: Shot[], i: number) => void; cls?: string; bare?: boolean }) {
    return (
        <>
            {shots.map((s, i) => (
                <button type="button" className={`bd-shot ${cls || ""}${s.span ? " span" : ""}`} key={s.src} aria-haspopup="dialog" onClick={() => onOpen(shots, i)}>
                    <span className={s.clear ? "bd-frame clear" : "bd-frame"}>
                        <img src={s.src.includes("framerusercontent") ? s.src + "?scale-down-to=1024" : s.src} alt={s.label} loading="lazy" decoding="async" />
                    </span>
                    {bare ? null : <small>{s.label}</small>}
                </button>
            ))}
        </>
    )
}

function Strip({ step, n, onOpen }: { step: Step; n: number; onOpen: (l: Shot[], i: number) => void }) {
    const row = React.useRef<HTMLDivElement | null>(null)
    const [ends, setEnds] = React.useState<[boolean, boolean]>([true, false])
    const check = () => {
        const r = row.current
        if (!r) return
        setEnds([r.scrollLeft < 8, r.scrollLeft + r.clientWidth > r.scrollWidth - 8])
    }
    React.useEffect(() => {
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])
    const go = (d: number) => {
        const r = row.current
        if (!r) return
        const card = r.querySelector(".bd-shot") as HTMLElement | null
        const by = card ? card.offsetWidth + 20 : r.clientWidth * 0.8
        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
        r.scrollBy({ left: d * by, behavior: reduce ? "auto" : "smooth" })
    }
    return (
        <div className="bd-step">
            <Tag n={n} tag={step.tag} />
            <div className="bd-head">
                <p className="cs-state">
                    <b>{step.lead}</b> {step.text}
                </p>
                <div className="bd-nav">
                    <button type="button" aria-label="Scroll back" disabled={ends[0]} onClick={() => go(-1)}>
                        ←
                    </button>
                    <button type="button" aria-label="Scroll on" disabled={ends[1]} onClick={() => go(1)}>
                        →
                    </button>
                </div>
            </div>
            <div className={step.phones ? "bd-strip phones" : "bd-strip"} ref={row} onScroll={check}>
                <Shots shots={step.phones ? step.strip!.map((s) => ({ ...s, clear: true })) : step.strip!} onOpen={onOpen} bare={step.captioned} cls={step.captioned ? "own" : ""} />
            </div>
        </div>
    )
}

const Tag = ({ n, tag }: { n: number; tag: string }) => (
    <p className="bd-tag">
        <span>{String(n).padStart(2, "0")}</span>
        {tag}
        <i aria-hidden="true" />
    </p>
)

function Style({ g }: { g: StyleGuide }) {
    React.useEffect(() => {
        for (const t of g.type) {
            if (!t.google) continue
            const href = `https://fonts.googleapis.com/css2?family=${t.google}&display=swap`
            if (document.querySelector(`link[href="${href}"]`)) continue
            const l = document.createElement("link")
            l.rel = "stylesheet"
            l.href = href
            document.head.appendChild(l)
        }
    }, [])
    return (
        <div className={g.type.length ? "bd-sg" : "bd-sg only"}>
            <div>
                {g.colors.map((c) => (
                    <div className="bd-row" key={c.group}>
                        <h4>{c.group}</h4>
                        <div className="bd-sw">
                            {c.swatches.map((s) => (
                                <div key={s.hex + s.name}>
                                    <b style={{ background: s.hex }} />
                                    <span>{s.name}</span>
                                    <code>{s.hex}</code>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {g.type.length ? (
            <div>
                {g.type.map((t) => (
                    <div className="bd-type" key={t.family}>
                        <h4>Type</h4>
                        <div className="bd-aa">
                            <b style={{ fontFamily: t.css }}>Aa</b>
                            <p>
                                <strong>{t.family}</strong>
                                {t.note}
                            </p>
                        </div>
                        <ul className="bd-scale">
                            {t.scale.map((s) => (
                                <li key={s.name}>
                                    <small>
                                        {s.name} · {s.size}
                                    </small>
                                    <span style={{ fontFamily: t.css, fontSize: Math.min(s.size, 34), fontWeight: s.weight }}>{s.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            ) : null}
        </div>
    )
}

export default function Build({ steps, onOpen }: { steps: Step[]; onOpen: (l: Shot[], i: number) => void }) {
    return (
        <div className="bd">
            <style>{CSS}</style>
            {steps.map((s, i) =>
                s.strip ? (
                    <Strip key={s.tag + i} step={s} n={i + 1} onOpen={onOpen} />
                ) : (
                    <div className="bd-step" key={s.tag + i}>
                        <Tag n={i + 1} tag={s.tag} />
                        <p className="cs-state">
                            <b>{s.lead}</b> {s.text}
                        </p>
                        {s.wide ? <Shots shots={[s.wide]} onOpen={onOpen} cls={`bd-wide${s.wide.crop ? " crop" : ""}`} /> : null}
                        {s.grid ? (
                            <div className="bd-grid" style={{ "--c": Math.min(3, s.grid.length) } as React.CSSProperties}>
                                <Shots shots={s.grid} onOpen={onOpen} />
                            </div>
                        ) : null}
                        {s.style ? <Style g={s.style} /> : null}
                        {s.pipStyle ? <PipStyle model={s.pipStyle} /> : null}
                    </div>
                )
            )}
            <div className="bd-final">
                <Tag n={steps.length + 1} tag="The final screens" />
            </div>
        </div>
    )
}
