// Ecosystem: the personas, and each one's journey drawn as a route through the phases.
// Choosing a persona swaps the route. Everything comes from the project's journey maps.
// A project whose research recorded emotions passes emoji, feel and level, and the route becomes an emotion curve; without them it's a plain wave.
import * as React from "react"

export type Phase = { name: string; does: string; pain: string; hub: string; emoji?: string; feel?: string; level?: number }
export type Persona = { role: string; mark?: string; tagline: string; wants: string; stuck: string; phases: Phase[] }

const CSS = `
.jm{display:flex;flex-direction:column;gap:16px}
.jm-people{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}
.jm-person{display:flex;flex-direction:column;gap:12px;padding:clamp(18px,2vw,26px);border-radius:22px;border:1.5px solid rgba(255,255,255,.72);background:linear-gradient(145deg,rgba(255,255,255,.6),rgba(255,255,255,.28));color:var(--ink);font:inherit;text-align:left;cursor:pointer;transition:border-color .25s,background .25s,box-shadow .25s}
.jm-person:hover{background:rgba(255,255,255,.72)}
.jm-person[aria-pressed=true]{border-color:var(--a);background:rgba(255,255,255,.86);box-shadow:0 24px 44px -28px rgba(60,50,150,.55)}
.jm-who{display:flex;align-items:center;gap:14px}
.jm-who i{flex:none;display:flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:50%;background:var(--a);color:#fff;font-style:normal;font-size:var(--t-small);font-weight:600}
.jm-person[aria-pressed=false] .jm-who i{background:rgba(70,80,100,.5)}
.jm-who b{display:block;font-size:var(--t-h3);font-weight:600;letter-spacing:var(--ls-h3);line-height:1.25}
.jm-who > span{display:block}
.jm-who span span{display:block;margin-top:3px;font-size:var(--t-small);font-weight:400;color:var(--soft)}
.jm-facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:14px;margin:0}
.jm-facts dt{margin:0 0 4px;font-size:var(--t-label);font-weight:600;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--quiet)}
.jm-facts dd{margin:0;font-size:var(--t-small);font-weight:400;line-height:1.5}
.jm-board{border-radius:24px;border:1px solid rgba(255,255,255,.75);background-color:rgba(255,255,255,.55);background-image:radial-gradient(rgba(60,60,90,.14) 1px,transparent 1.2px);background-size:18px 18px;box-shadow:inset 0 1px 0 rgba(255,255,255,.9),0 24px 48px -32px rgba(40,40,90,.35);overflow-x:auto}
.jm-map{--cols:92px repeat(var(--n),minmax(142px,1fr));min-width:calc(92px + var(--n) * 152px);padding:clamp(16px,2vw,26px);display:flex;flex-direction:column;gap:14px;animation:jm-in .4s ease both}
@keyframes jm-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.jm-row{display:grid;grid-template-columns:var(--cols);gap:10px;align-items:start}
.jm-lane{margin:0;padding-top:2px;font-size:var(--t-label);font-weight:600;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--quiet)}
.jm-route{position:relative;grid-column:2/-1}
.jm-axis{display:flex;flex-direction:column;justify-content:space-between;align-self:stretch;margin:0;font-size:var(--t-label);font-weight:600;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--quiet)}
.jm-emoji{position:absolute;display:flex;align-items:center;justify-content:center;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;background:#fff;border:2px solid var(--a);font-size:24px;line-height:1;box-shadow:0 8px 16px -8px rgba(40,40,90,.6)}
.jm-feel{margin:0;font-size:var(--t-small);font-weight:400;font-style:italic;line-height:1.5;color:var(--ink)}
.jm-route svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.jm-route path{fill:none;stroke:var(--a);stroke-width:3;stroke-linecap:round;vector-effect:non-scaling-stroke;stroke-dasharray:1;stroke-dashoffset:1;animation:jm-draw 1.1s cubic-bezier(.4,0,.2,1) .1s forwards}
@keyframes jm-draw{to{stroke-dashoffset:0}}
.jm-stop{position:absolute;display:flex;align-items:center;justify-content:center;width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;background:#fff;border:3px solid var(--a);color:var(--ink);font-size:var(--t-label);font-weight:600;box-shadow:0 8px 16px -8px rgba(40,40,90,.6)}
.jm-phase{margin:0;font-size:var(--t-body);font-weight:600;line-height:1.2}
.jm-does{margin:0;font-size:var(--t-small);font-weight:400;line-height:1.5;color:var(--soft)}
.jm-pain{margin:0;padding:10px 11px 12px;border-radius:3px 3px 10px 3px;background:#FFD6E0;color:#262626;font-family:var(--hand);font-size:var(--t-hand-sm);font-weight:500;line-height:1.1;box-shadow:0 1px 1px rgba(0,0,0,.06),0 10px 16px -10px rgba(0,0,0,.35)}
.jm-row > .jm-pain:nth-child(odd){transform:rotate(-1deg)}
.jm-row > .jm-pain:nth-child(even){transform:rotate(.9deg)}
.jm-hub{justify-self:start;margin:0;padding:6px 12px;border-radius:999px;background:var(--a);color:#fff;font-size:var(--t-small);font-weight:600;line-height:1.2}
@media (max-width:760px){
  .jm-people{grid-template-columns:1fr}
}
@media (prefers-reduced-motion:reduce){
  .jm-map{animation:none}
  .jm-route path{animation:none;stroke-dashoffset:0}
}
`

const initials = (role: string) =>
    role
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()

// a smooth line through every stop: at each phase's level, or alternating high and low when there are no levels
function route(phases: Phase[], height: number) {
    const n = phases.length
    const stop = (i: number) => {
        const level = phases[i].level
        const y = level === undefined ? (i % 2 ? 62 : 22) : 26 + level * (height - 52)
        return { x: ((i + 0.5) / n) * 1000, y }
    }
    let d = `M0 ${stop(0).y}L${stop(0).x} ${stop(0).y}`
    for (let i = 1; i < n; i++) {
        const a = stop(i - 1)
        const b = stop(i)
        const mid = (a.x + b.x) / 2
        d += `C${mid} ${a.y} ${mid} ${b.y} ${b.x} ${b.y}`
    }
    const last = stop(n - 1)
    return { d: `${d}L1000 ${last.y}`, stop }
}

export default function JourneyMap({ personas, hubLabel = "KG Hub" }: { personas: Persona[]; hubLabel?: string }) {
    const [active, setActive] = React.useState(0)
    const p = personas[active]
    const n = p.phases.length
    const curve = p.phases[0].level !== undefined
    const height = curve ? 190 : 84
    const { d, stop } = route(p.phases, height)

    return (
        <div className="jm">
            <style>{CSS}</style>
            <div className="jm-people">
                {personas.map((x, i) => (
                    <button type="button" className="jm-person" key={x.role} aria-pressed={i === active} onClick={() => setActive(i)}>
                        <span className="jm-who">
                            <i aria-hidden="true">{x.mark || initials(x.role)}</i>
                            <span>
                                <b>{x.role}</b>
                                <span>{x.tagline}</span>
                            </span>
                        </span>
                        <dl className="jm-facts">
                            <div>
                                <dt>Wants</dt>
                                <dd>{x.wants}</dd>
                            </div>
                            <div>
                                <dt>Gets stuck on</dt>
                                <dd>{x.stuck}</dd>
                            </div>
                        </dl>
                    </button>
                ))}
            </div>

            <div className="jm-board" tabIndex={0} role="region" aria-label={`Journey map: ${p.role}`}>
                {/* key: replays the route when the persona changes */}
                <div className="jm-map" key={p.role} style={{ "--n": n } as React.CSSProperties}>
                    <div className="jm-row">
                        {curve ? (
                            <p className="jm-axis" aria-hidden="true">
                                <span>Positive</span>
                                <span>Negative</span>
                            </p>
                        ) : (
                            <span />
                        )}
                        <div className="jm-route" aria-hidden="true" style={{ height }}>
                            <svg viewBox={`0 0 1000 ${height}`} preserveAspectRatio="none">
                                <path d={d} pathLength={1} />
                            </svg>
                            {p.phases.map((s, i) =>
                                s.emoji ? (
                                    <span className="jm-emoji" key={i} style={{ left: `${stop(i).x / 10}%`, top: `${stop(i).y}px` }}>
                                        {s.emoji}
                                    </span>
                                ) : (
                                    <span className="jm-stop" key={i} style={{ left: `${stop(i).x / 10}%`, top: `${stop(i).y}px` }}>
                                        {i + 1}
                                    </span>
                                )
                            )}
                        </div>
                    </div>
                    {curve ? (
                        <div className="jm-row">
                            <p className="jm-lane">Feels</p>
                            {p.phases.map((s) => (
                                <p className="jm-feel" key={s.name}>
                                    {s.feel}
                                </p>
                            ))}
                        </div>
                    ) : null}
                    <div className="jm-row">
                        <p className="jm-lane">Phase</p>
                        {p.phases.map((s) => (
                            <p className="jm-phase" key={s.name}>
                                {s.name}
                            </p>
                        ))}
                    </div>
                    <div className="jm-row">
                        <p className="jm-lane">Does</p>
                        {p.phases.map((s) => (
                            <p className="jm-does" key={s.name}>
                                {s.does}
                            </p>
                        ))}
                    </div>
                    <div className="jm-row">
                        <p className="jm-lane">Stuck on</p>
                        {p.phases.map((s) => (
                            <p className="jm-pain" key={s.name}>
                                {s.pain}
                            </p>
                        ))}
                    </div>
                    <div className="jm-row">
                        <p className="jm-lane">{hubLabel}</p>
                        {p.phases.map((s) => (
                            <p className="jm-hub" key={s.name}>
                                {s.hub}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
