// Reflection, part one: each gap the research found, bridged to what was designed for it and how that closes it.
// Three notes per row joined by hand-drawn arrows (the same language as the Methods section), stacked on phones.
// Content is per project in tools/work/reflections.mjs.
import * as React from "react"

export type Gaps = {
    statement: string
    rows: { gap: string; seen: string; fix: string; how: string }[]
    note?: string
}

const INK = "#3b3f55"
const TILT = [-1.1, 0.9, -0.6, 1.2]

const CSS = `
.gp{display:flex;flex-direction:column;gap:clamp(18px,2vw,26px);margin:0;padding:0;list-style:none}
.gp-row{display:grid;grid-template-columns:44px minmax(0,1fr) 44px minmax(0,1fr) 44px minmax(0,1fr);align-items:stretch}
.gp-n{align-self:center;display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#fff;box-shadow:0 0 0 1px rgba(30,35,60,.08),0 6px 12px -8px rgba(30,35,60,.4);font-size:14px;font-weight:700;color:var(--ai)}
.gp-card{display:flex;flex-direction:column;gap:8px;padding:16px 16px 18px;border-radius:4px 4px 12px 4px;box-shadow:0 1px 1px rgba(0,0,0,.05),0 12px 20px -12px rgba(0,0,0,.3);transition:transform .35s cubic-bezier(.2,.9,.25,1)}
.gp-card:hover{transform:rotate(0deg) translateY(-2px)!important}
.gp-card span{font-size:var(--t-label);font-weight:600;letter-spacing:var(--ls-caps);text-transform:uppercase;color:rgba(38,38,38,.55)}
.gp-card b{font-size:var(--t-body);font-weight:600;line-height:1.35;color:#262626}
.gp-card p{margin:0;font-size:var(--t-small);line-height:1.5;color:#3a3d4a}
.gp-card q{display:block;margin-top:auto;padding-top:6px;border-top:1px dashed rgba(38,38,38,.18);font-size:var(--t-small);line-height:1.45;color:rgba(38,38,38,.7);quotes:none}
.gp-gap{background:#FFD6E0}
.gp-fix{background:#fffefa}
.gp-how{background:var(--ai);box-shadow:0 18px 30px -18px rgba(60,40,150,.6)}
.gp-how span{color:rgba(255,255,255,.75)}.gp-how p{color:#fff;font-size:var(--t-body);line-height:1.45}
.gp-arrow{align-self:center;justify-self:center;width:40px;height:20px}
.gp-note{margin:4px 0 0;font-size:var(--t-small);color:var(--soft)}
@media (max-width:900px){
  .gp-row{grid-template-columns:1fr;gap:6px}
  .gp-n{justify-self:start}
  .gp-arrow{transform:rotate(90deg);justify-self:start;margin-left:6px}
}
@media (prefers-reduced-motion:reduce){.gp-card{transition:none}}
`

const Arrow = () => (
    <svg className="gp-arrow" viewBox="0 0 64 28" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 17c12-10 30-12 50-4" />
        <path d="M46 6.5l9 6.8-10 4.2" />
    </svg>
)

export default function GapBridge({ g }: { g: Gaps }) {
    return (
        <>
            <style>{CSS}</style>
            <p className="cs-state">{g.statement}</p>
            <ol className="gp">
                {g.rows.map((r, i) => (
                    <li className="gp-row" key={r.gap}>
                        <span className="gp-n" aria-hidden="true">
                            {i + 1}
                        </span>
                        <div className="gp-card gp-gap" style={{ transform: `rotate(${TILT[i % 4]}deg)` }}>
                            <span>The gap</span>
                            <b>{r.gap}</b>
                            <q>{r.seen}</q>
                        </div>
                        <Arrow />
                        <div className="gp-card gp-fix" style={{ transform: `rotate(${TILT[(i + 1) % 4]}deg)` }}>
                            <span>What I designed</span>
                            <p>{r.fix}</p>
                        </div>
                        <Arrow />
                        <div className="gp-card gp-how" style={{ transform: `rotate(${TILT[(i + 2) % 4]}deg)` }}>
                            <span>How it closes the gap</span>
                            <p>{r.how}</p>
                        </div>
                    </li>
                ))}
            </ol>
            {g.note ? <p className="gp-note">{g.note}</p> : null}
        </>
    )
}
