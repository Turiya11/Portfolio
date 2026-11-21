// Causal loop diagrams for the research folders, drawn live in SVG so they stay sharp and match each page's accent.
// (The system maps themselves are SVG files made by tools/work/sysmaps.mjs.) Each link carries a polarity: + (moves the same way) or − (moves the opposite way).
// A loop with an even number of − links is reinforcing (R); an odd number makes it balancing (B). The type is worked out
// from the links, never typed in, so a label can't contradict its arrows.
import * as React from "react"

export type Loop = {
    name: string
    note: string // what the loop means, in one line
    vars: { t: string; lever?: boolean }[] // in order around the loop
    signs: ("+" | "-")[] // signs[i]: the link from vars[i] to vars[i + 1], wrapping round
    lever?: string // who steps in at the filled variable, such as "Lumi steps in"; read out to screen readers
}

const CSS = `
.sd-loops{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:14px}
.sd-loop{display:flex;flex-direction:column;gap:6px;margin:0;padding:14px 14px 16px;border-radius:18px;background:#fff;box-shadow:0 0 0 1px rgba(30,35,60,.07),0 18px 36px -26px rgba(30,35,60,.4)}
.sd-loop svg{display:block;width:100%;height:auto}
.sd-loop b{font-size:var(--t-body);font-weight:600}
.sd-loop p{margin:0;font-size:var(--t-small);line-height:1.5;color:var(--soft)}
.sd-kind{display:inline-flex;align-items:center;gap:6px;font-size:var(--t-label);font-weight:600;letter-spacing:var(--ls-caps);text-transform:uppercase}
.sd-kind.R{color:#c0473f}.sd-kind.B{color:#2b7a5b}
.sd-arc{fill:none;stroke:#3b3f55;stroke-width:1.8}
.sd-sign circle{fill:#fff;stroke:#3b3f55;stroke-width:1.4}
.sd-sign text{font:700 15px/1 var(--sans);fill:#3b3f55}
.sd-var rect{fill:#f6f5f2;stroke:rgba(30,35,60,.14)}
.sd-var text{font:500 14px/1.15 var(--sans);fill:var(--ink)}
.sd-var.lv rect{fill:var(--ai);stroke:none}
.sd-var.lv text{fill:#fff;font-weight:600}
.sd-lvtag,.sd-var.lv .sd-lvtag{font:600 11px/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;fill:var(--ai)}
.sd-mid{font:700 30px/1 var(--sans)}
.sd-mid.R{fill:#c0473f}.sd-mid.B{fill:#2b7a5b}
.sd-midsub{font:600 10px/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;fill:#8a8a99}
.sd-legend{display:flex;flex-wrap:wrap;gap:8px 18px;margin:0;padding:0;list-style:none;font-size:var(--t-small);color:var(--soft)}
.sd-legend b{color:var(--ink)}
`

// split a label into lines of at most n characters, on word breaks
const wrap = (s: string, n: number) => {
    const out: string[] = []
    let line = ""
    for (const w of s.split(" ")) {
        if (line && (line + " " + w).length > n) {
            out.push(line)
            line = w
        } else line = line ? line + " " + w : w
    }
    if (line) out.push(line)
    return out
}
const textW = (s: string, px: number) => s.length * px * 0.56

function OneLoop({ loop }: { loop: Loop }) {
    const n = loop.vars.length
    const kind = loop.signs.filter((s) => s === "-").length % 2 === 0 ? "R" : "B"
    const W = 360,
        H = 290,
        cx = W / 2,
        cy = H / 2 + 2,
        r = 104
    const ang = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n
    const pt = (t: number, rr = r) => ({ x: cx + rr * Math.cos(t), y: cy + rr * Math.sin(t) * 0.82 })
    const gap = 0.36 // radians kept clear around each label
    return (
        <figure className="sd-loop">
            <span className={`sd-kind ${kind}`}>{kind === "R" ? "Reinforcing loop" : "Balancing loop"}</span>
            <b>{loop.name}</b>
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${loop.name}: ${loop.vars.map((v, i) => `${v.t} ${loop.signs[i] === "+" ? "raises" : "lowers"} ${loop.vars[(i + 1) % n].t}`).join("; ")}${loop.lever ? `. ${loop.lever} at ${loop.vars.find((v) => v.lever)?.t}` : ""}`}>
                <defs>
                    <marker id="sd-lp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                        <path d="M0 0L10 5L0 10z" fill="#3b3f55" />
                    </marker>
                </defs>
                {loop.vars.map((_, i) => {
                    const t0 = ang(i) + gap,
                        t1 = ang(i + 1) - gap
                    const steps = 24
                    let d = ""
                    for (let s = 0; s <= steps; s++) {
                        const p = pt(t0 + ((t1 - t0) * s) / steps)
                        d += `${s ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`
                    }
                    const m = pt((t0 + t1) / 2, r + 20)
                    return (
                        <g key={i}>
                            <path className="sd-arc" d={d} markerEnd="url(#sd-lp)" />
                            <g className="sd-sign">
                                <circle cx={m.x} cy={m.y} r={11} />
                                <text x={m.x} y={m.y + 5} textAnchor="middle">
                                    {loop.signs[i] === "+" ? "+" : "−"}
                                </text>
                            </g>
                        </g>
                    )
                })}
                {loop.vars.map((v, i) => {
                    const p = pt(ang(i))
                    const lines = wrap(v.t, 14)
                    const w = Math.max(...lines.map((l) => textW(l, 14))) + 20,
                        h = 12 + lines.length * 16
                    return (
                        <g key={v.t} className={v.lever ? "sd-var lv" : "sd-var"}>
                            <rect x={p.x - w / 2} y={p.y - h / 2} width={w} height={h} rx={10} />
                            {lines.map((l, k) => (
                                <text key={k} x={p.x} y={p.y - ((lines.length - 1) * 16) / 2 + k * 16 + 5} textAnchor="middle">
                                    {l}
                                </text>
                            ))}
                        </g>
                    )
                })}
                <text className={`sd-mid ${kind}`} x={cx} y={cy + 6} textAnchor="middle">
                    {kind === "R" ? "R" : "B"}
                </text>
                <text className="sd-midsub" x={cx} y={cy + 24} textAnchor="middle">
                    {kind === "R" ? "reinforcing" : "balancing"}
                </text>
            </svg>
            <p>{loop.note}</p>
        </figure>
    )
}

export function Loops({ loops }: { loops: Loop[] }) {
    return (
        <>
            <style>{CSS}</style>
            <ul className="sd-legend">
                <li>
                    <b>+</b> moves the next one the same way
                </li>
                <li>
                    <b>−</b> moves it the opposite way
                </li>
                <li>
                    <b>R</b> reinforcing: the loop amplifies itself
                </li>
                <li>
                    <b>B</b> balancing: the loop settles itself
                </li>
                <li>
                    <b>Filled</b> where the design steps in
                </li>
            </ul>
            <div className="sd-loops">
                {loops.map((l) => (
                    <OneLoop key={l.name} loop={l} />
                ))}
            </div>
        </>
    )
}
