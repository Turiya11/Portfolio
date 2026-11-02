// Ecosystem: the personas, and each one's journey drawn as a route through the phases.
// Choosing a persona swaps the route. Everything comes from the project's journey maps; there is no emotion curve because the research did not measure one.
import * as React from "react"

export type Phase = { name: string; does: string; pain: string; hub: string }
export type Persona = { role: string; tagline: string; wants: string; stuck: string; phases: Phase[] }

const CSS = `
.jm{display:flex;flex-direction:column;gap:16px}
.jm-people{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.jm-person{display:flex;flex-direction:column;gap:12px;padding:clamp(18px,2vw,26px);border-radius:22px;border:1.5px solid rgba(255,255,255,.72);background:linear-gradient(145deg,rgba(255,255,255,.6),rgba(255,255,255,.28));color:var(--ink);font:inherit;text-align:left;cursor:pointer;transition:border-color .25s,background .25s,box-shadow .25s}
.jm-person:hover{background:rgba(255,255,255,.72)}
.jm-person[aria-pressed=true]{border-color:var(--a);background:rgba(255,255,255,.86);box-shadow:0 24px 44px -28px rgba(60,50,150,.55)}
.jm-who{display:flex;align-items:center;gap:14px}
.jm-who i{flex:none;display:flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:50%;background:var(--a);color:#fff;font-style:normal;font-size:15px;font-weight:700;letter-spacing:.02em}
.jm-person[aria-pressed=false] .jm-who i{background:rgba(70,80,100,.5)}
.jm-who b{display:block;font-size:clamp(19px,1.7vw,23px);font-weight:600;letter-spacing:-.015em;line-height:1.15}
.jm-who > span{display:block}
.jm-who span span{display:block;margin-top:3px;font-size:14.5px;color:var(--soft)}
.jm-facts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:0}
.jm-facts dt{margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--quiet)}
.jm-facts dd{margin:0;font-size:15px;line-height:1.38}
.jm-board{border-radius:24px;border:1px solid rgba(255,255,255,.75);background-color:rgba(255,255,255,.55);background-image:radial-gradient(rgba(60,60,90,.14) 1px,transparent 1.2px);background-size:18px 18px;box-shadow:inset 0 1px 0 rgba(255,255,255,.9),0 24px 48px -32px rgba(40,40,90,.35);overflow-x:auto}
.jm-map{--cols:72px repeat(var(--n),minmax(142px,1fr));min-width:calc(72px + var(--n) * 152px);padding:clamp(16px,2vw,26px);display:flex;flex-direction:column;gap:14px;animation:jm-in .4s ease both}
@keyframes jm-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.jm-row{display:grid;grid-template-columns:var(--cols);gap:10px;align-items:start}
.jm-lane{margin:0;padding-top:2px;font-size:10.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--quiet)}
.jm-route{position:relative;grid-column:2/-1;height:84px}
.jm-route svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.jm-route path{fill:none;stroke:var(--a);stroke-width:3;stroke-linecap:round;vector-effect:non-scaling-stroke;stroke-dasharray:1;stroke-dashoffset:1;animation:jm-draw 1.1s cubic-bezier(.4,0,.2,1) .1s forwards}
@keyframes jm-draw{to{stroke-dashoffset:0}}
.jm-stop{position:absolute;display:flex;align-items:center;justify-content:center;width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;background:#fff;border:3px solid var(--a);color:var(--ink);font-size:13px;font-weight:700;box-shadow:0 8px 16px -8px rgba(40,40,90,.6)}
.jm-phase{margin:0;font-size:15px;font-weight:600;line-height:1.2;letter-spacing:-.01em}
.jm-does{margin:0;font-size:14px;line-height:1.36;color:var(--soft)}
.jm-pain{margin:0;padding:10px 11px 12px;border-radius:3px 3px 10px 3px;background:#FFD6E0;color:#262626;font-family:"Caveat","Comic Sans MS",cursive;font-size:19px;line-height:1.1;box-shadow:0 1px 1px rgba(0,0,0,.06),0 10px 16px -10px rgba(0,0,0,.35)}
.jm-row > .jm-pain:nth-child(odd){transform:rotate(-1deg)}
.jm-row > .jm-pain:nth-child(even){transform:rotate(.9deg)}
.jm-hub{justify-self:start;margin:0;padding:6px 12px;border-radius:999px;background:var(--a);color:#fff;font-size:13px;font-weight:600;line-height:1.2}
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

// a smooth wave that passes through every stop, alternating high and low
function route(n: number) {
    const stop = (i: number) => ({ x: ((i + 0.5) / n) * 1000, y: i % 2 ? 62 : 22 })
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

export default function JourneyMap({ personas }: { personas: Persona[] }) {
    const [active, setActive] = React.useState(0)
    const p = personas[active]
    const n = p.phases.length
    const { d, stop } = route(n)

    return (
        <div className="jm">
            <style>{CSS}</style>
            <div className="jm-people">
                {personas.map((x, i) => (
                    <button type="button" className="jm-person" key={x.role} aria-pressed={i === active} onClick={() => setActive(i)}>
                        <span className="jm-who">
                            <i aria-hidden="true">{initials(x.role)}</i>
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
                        <span />
                        <div className="jm-route" aria-hidden="true">
                            <svg viewBox="0 0 1000 84" preserveAspectRatio="none">
                                <path d={d} pathLength={1} />
                            </svg>
                            {p.phases.map((_, i) => (
                                <span className="jm-stop" key={i} style={{ left: `${stop(i).x / 10}%`, top: `${stop(i).y}px` }}>
                                    {i + 1}
                                </span>
                            ))}
                        </div>
                    </div>
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
                        <p className="jm-lane">KG Hub</p>
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
