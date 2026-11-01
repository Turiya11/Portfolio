// Research wall: the research shown as clusters of sticky notes on a dotted board (like an affinity map).
// Used by the Lumi, Dentigo and Encora case-study layouts (portfolio site only; not part of the Framer components).
import * as React from "react"

export type StickyGroup = { label: string; color?: string; notes: string[] }

const PALETTE = ["#FFF1A6", "#FFD6E0", "#D3E8FF", "#D9F3CF", "#E6DDFF", "#FFE2C6"]

const CSS = `
.sw{display:flex;flex-direction:column;gap:14px}
.sw-title{margin:0;font-size:18px;font-weight:600;letter-spacing:-.01em}
.sw-board{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:26px 22px;padding:26px 24px 30px;border-radius:24px;
  border:1px solid rgba(255,255,255,.75);background-color:rgba(255,255,255,.55);
  background-image:radial-gradient(rgba(60,60,90,.16) 1px,transparent 1.2px);background-size:18px 18px;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.9),0 24px 48px -32px rgba(40,40,90,.35)}
.sw-col{display:flex;flex-direction:column;gap:12px;min-width:0}
.sw-lab{align-self:flex-start;margin:0 0 2px;padding:5px 11px;border-radius:999px;background:rgba(255,255,255,.85);
  box-shadow:0 1px 0 rgba(0,0,0,.04);font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#4b5563}
.sw-note{margin:0;padding:13px 14px 16px;border-radius:3px 3px 10px 3px;font-family:"Caveat","Comic Sans MS",cursive;font-size:21px;
  line-height:1.12;color:#262626;box-shadow:0 1px 1px rgba(0,0,0,.06),0 10px 16px -10px rgba(0,0,0,.35);
  transition:transform .35s cubic-bezier(.2,.9,.25,1),box-shadow .35s ease;overflow-wrap:anywhere}
.sw-note:hover{transform:rotate(0deg) scale(1.04)!important;box-shadow:0 2px 2px rgba(0,0,0,.06),0 18px 26px -12px rgba(0,0,0,.35)}
@media (prefers-reduced-motion:reduce){.sw-note{transition:none}}
`

export default function StickyWall({ groups, title = "From the research wall" }: { groups?: StickyGroup[]; title?: string }) {
    if (!Array.isArray(groups) || !groups.length) return null
    let n = 0
    return (
        <div className="sw">
            <style>{CSS}</style>
            {title ? <h3 className="sw-title">{title}</h3> : null}
            <div className="sw-board" role="list">
                {groups.map((g, gi) => (
                    <div className="sw-col" key={gi} role="listitem">
                        <p className="sw-lab">{g.label}</p>
                        {g.notes.map((t, i) => {
                            // a slight, steady tilt per note, so the wall looks hand-placed
                            const tilt = [-1.6, 1.2, -0.6, 1.8, -1.1, 0.7][n++ % 6]
                            return (
                                <p className="sw-note" key={i} style={{ background: g.color || PALETTE[gi % PALETTE.length], transform: `rotate(${tilt}deg)` }}>
                                    {t}
                                </p>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}
