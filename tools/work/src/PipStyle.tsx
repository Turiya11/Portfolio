// Pip's style guide, drawn live from the design system (the "Cosmic dark UI in Montserrat" board and jury slide 28):
// why the style was chosen, then one wide board that scrolls sideways on smaller screens: colour tokens, Pip in 3D
// (the low-poly model from the headset build, drag to turn), orbs and buttons, glow styles, type, the layout rules and the components.
import * as React from "react"

const TOKENS: [string, string, string][] = [
    ["Deep Space", "App background", "#0B0A1A"],
    ["Panel Purple", "Cards, headset panels", "#1A1333"],
    ["Primary Purple", "Buttons, active", "#7C3AED"],
    ["Light Purple", "Accents, links", "#B794F6"],
    ["Neon Pink", "Orbs, AR glow", "#FF7EDB"],
    ["Teal Glow", "Focus ring, Save", "#00D1C1"],
    ["Alert Rose", "Destructive", "#FF6B8A"],
    ["Surface", "Body text on dark", "#C9C6E3"],
]
const STICKY = ["#E6DDFF", "#FAF0B4", "#C9DDF5", "#F5CFE0"]
const ORBS: [string, string][] = [
    ["#FF7EDB", "#B794F6"],
    ["#7FB2FF", "#3B6FE0"],
    ["#FF8A8A", "#D9363E"],
    ["#5CF08A", "#1DB954"],
    ["#C58BFF", "#7C3AED"],
]
const WHY: [string, string][] = [
    ["Calm, because reminders already feel like noise", "Students told me long lists and constant reminders made them anxious. So the screens stay dark and quiet, and colour only glows where a thought lives."],
    ["Deep space, because thoughts orbit Pip", "Every thought is an orb circling Pip, so the app is set in the night sky he floats in. The neon pink orbs are the brightest thing on screen."],
    ["One system for phone and headset", "Capture and retrieval happen on the phone every day. The same tokens appear on the headset's translucent panels, so both feel like one product."],
    ["Colour is never the only signal", "Every orb also shows a letter, a title and a written status. Glows are decoration and never carry meaning, and Reduce motion keeps the orbit still."],
]
const TYPE: [string, string, number, number][] = [
    ["Display", "Bold", 32, 700],
    ["Clock", "Medium", 56, 500],
    ["Heading 1", "Bold", 26, 700],
    ["Heading 2", "SemiBold", 18, 600],
    ["Body", "Regular", 15, 400],
    ["Label", "SemiBold", 13, 600],
]
const RULES: [string, string][] = [
    ["Layout and shape", "Screens are 402 × 874 (iPhone 16 Pro) with 24 px side gutters and 14–16 px between items. Radii: panels 18, thought rows 16, fields 14, buttons 24 and 20. A starfield sits behind every screen."],
    ["Touch and motion", "Large buttons are 48 px tall, medium ones 40 px. Orbs have a 52 px disc. Glows are decoration only, and Reduce motion keeps the orbit still."],
    ["Accessibility", "Orbs always carry a letter, a title and a written status: Parked, Active, Completed or Archived. Colour is never the only signal, and touch selection is always there."],
]

const CSS = `
.ps{display:flex;flex-direction:column;gap:22px;--ink2:#0B0A1A;--panel:#1A1333;--pp:#7C3AED;--lp:#B794F6;--np:#FF7EDB;--tg:#00D1C1;--ar:#FF6B8A;--sf:#C9C6E3}
.ps-why{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;margin:0;padding:0;list-style:none}
.ps-why li{display:flex;flex-direction:column;gap:8px;padding:18px 18px 20px;border-radius:20px;border:1px solid var(--edge);background:linear-gradient(145deg,rgba(255,255,255,.66),rgba(255,255,255,.34));box-shadow:inset 0 1px 0 rgba(255,255,255,.85),0 18px 36px -24px rgba(60,70,170,.3)}
.ps-why b{font-size:var(--t-body);font-weight:600;line-height:1.3}
.ps-why p{margin:0;font-size:var(--t-small);line-height:1.5;color:var(--soft)}
.ps-why i{display:block;width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff 0 8%,transparent 9%),linear-gradient(135deg,var(--np),var(--lp));box-shadow:0 0 14px rgba(255,126,219,.55)}
.ps-scroll{position:relative;overflow-x:auto;overscroll-behavior-x:contain;scrollbar-width:thin;border-radius:28px}
.ps-board{min-width:1080px;display:flex;flex-direction:column;gap:18px;padding:clamp(18px,2vw,26px);border-radius:28px;background:#F5F2EA;box-shadow:0 0 0 1px rgba(30,35,60,.06),0 30px 60px -40px rgba(30,35,60,.45);font-family:"Montserrat",var(--sans)}
.ps-top{display:grid;grid-template-columns:330px 1fr 290px;gap:18px;align-items:stretch}
.ps-dark{border-radius:20px;background:var(--ink2);color:#F8F8FF;padding:20px 20px 18px}
.ps-h{margin:0 0 12px;font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--lp)}
.ps-tok{display:grid;grid-template-columns:34px 1fr auto;align-items:center;gap:4px 12px;padding:6px 0}
.ps-tok i{width:34px;height:34px;border-radius:9px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)}
.ps-tok b{display:block;font-size:14px;font-weight:600;line-height:1.15}
.ps-tok span{display:block;font-size:11.5px;color:var(--sf);opacity:.85}
.ps-tok code{font:500 12px/1 "Montserrat",var(--sans);color:var(--sf)}
.ps-stk{display:flex;align-items:center;gap:8px;margin-top:10px;font-size:12px;color:var(--sf)}
.ps-stk i{width:30px;height:30px;border-radius:6px}
.ps-grad{display:flex;gap:10px;margin-top:12px}
.ps-grad div{flex:1;display:flex;flex-direction:column;gap:5px;font-size:11px;color:var(--sf)}
.ps-grad i{height:26px;border-radius:999px}
.ps-pip{position:relative;display:flex;flex-direction:column;border-radius:20px;background:radial-gradient(120% 90% at 50% 20%,#241a45 0,#120f26 55%,#0B0A1A 100%);overflow:hidden;min-height:470px}
.ps-pip .ps-h{position:absolute;left:20px;top:18px;z-index:2}
.ps-pip .ps-mv{flex:1;width:100%;min-height:400px;margin:38px 0 34px}
.ps-pip model-viewer{background:transparent;--poster-color:transparent}
.ps-stars{position:absolute;inset:0;background-image:radial-gradient(1.2px 1.2px at 12% 18%,#fff8 50%,transparent),radial-gradient(1px 1px at 72% 12%,#fff7 50%,transparent),radial-gradient(1.4px 1.4px at 86% 64%,#fff6 50%,transparent),radial-gradient(1px 1px at 30% 80%,#fff6 50%,transparent),radial-gradient(1.2px 1.2px at 55% 40%,#fff5 50%,transparent),radial-gradient(1px 1px at 8% 58%,#fff5 50%,transparent),radial-gradient(1px 1px at 92% 30%,#fff7 50%,transparent);pointer-events:none}
.ps-pip p{position:absolute;left:20px;right:20px;bottom:14px;margin:0;font-size:12px;line-height:1.4;color:var(--sf);z-index:2}
.ps-load{position:absolute;inset:0;display:grid;place-items:center;font-size:13px;color:var(--sf)}
.ps-right{display:flex;flex-direction:column;gap:14px}
.ps-orbs{display:flex;justify-content:space-around;align-items:center;padding:16px 10px;border:1.5px dashed rgba(124,58,237,.55);border-radius:12px}
.ps-orb{width:30px;height:30px;border-radius:50%;box-shadow:0 0 14px var(--g)}
.ps-btns{display:grid;grid-template-columns:1fr 1fr;gap:12px 12px;align-items:center}
.ps-b{display:grid;place-items:center;border-radius:24px;font-size:14px;font-weight:600;color:#fff;white-space:nowrap}
.ps-b.l{height:48px}.ps-b.m{height:40px;border-radius:20px}
.ps-b.pri{background:linear-gradient(90deg,var(--pp),var(--tg))}.ps-b.pri.l{box-shadow:0 0 18px rgba(124,58,237,.55)}
.ps-b.sec{background:#3a3150;box-shadow:inset 0 0 0 1.5px rgba(183,148,246,.45)}
.ps-b.gh{color:var(--lp);font-weight:500}
.ps-b.dst{background:#3a3150;color:var(--ar);box-shadow:inset 0 0 0 1.5px var(--ar)}
.ps-b.dsf{background:var(--ar);color:#1a0b14}
.ps-glows{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
.ps-glow{display:flex;flex-direction:column;gap:8px}
.ps-glow div{display:grid;place-items:center;height:110px;border-radius:16px;background:var(--ink2)}
.ps-glow span{font-size:12px;font-weight:500;color:#4b4760}
.ps-glow i{display:block}
.ps-mid{display:grid;grid-template-columns:1.15fr 1fr;gap:18px}
.ps-type{display:flex;flex-direction:column;gap:6px}
.ps-type div{display:grid;grid-template-columns:120px 1fr;align-items:baseline;gap:14px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06)}
.ps-type span{font-size:11.5px;color:var(--sf);line-height:1.3}
.ps-type strong{color:#F8F8FF;line-height:1.15;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ps-rules{display:flex;flex-direction:column;gap:10px}
.ps-rules div{padding:14px 16px;border-radius:14px;background:var(--panel);box-shadow:inset 0 0 0 1px rgba(183,148,246,.18)}
.ps-rules b{display:block;margin-bottom:5px;font-size:13px;font-weight:600;color:#F8F8FF}
.ps-rules p{margin:0;font-size:12px;line-height:1.55;color:var(--sf)}
.ps-comp{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:16px;align-items:start}
.ps-cell{display:flex;flex-direction:column;gap:10px}
.ps-cell > span{font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--lp)}
.ps-row{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:16px;background:var(--panel);box-shadow:inset 0 0 0 1px rgba(183,148,246,.16)}
.ps-row .o{flex:none;display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--np),var(--lp));box-shadow:0 0 14px rgba(255,126,219,.6);font-size:14px;font-weight:700;color:#2a0f2a}
.ps-row b{display:block;font-size:13.5px;font-weight:600;color:#F8F8FF}
.ps-row small{display:block;font-size:11.5px;color:var(--sf)}
.ps-row em{margin-left:auto;padding:4px 10px;border-radius:999px;font-style:normal;font-size:11px;font-weight:500;color:var(--tg);box-shadow:inset 0 0 0 1px rgba(0,209,193,.5)}
.ps-chips{display:flex;flex-wrap:wrap;gap:6px}
.ps-chips i{padding:5px 11px;border-radius:999px;font-style:normal;font-size:11.5px;font-weight:500;color:var(--sf);box-shadow:inset 0 0 0 1px rgba(183,148,246,.4)}
.ps-chips i.on{background:var(--pp);color:#fff;box-shadow:none}
.ps-field{display:flex;flex-direction:column;gap:5px;font-size:11px;color:var(--sf)}
.ps-field div{height:40px;display:flex;align-items:center;gap:8px;padding:0 14px;border-radius:14px;background:#0F0E1F;box-shadow:inset 0 0 0 1px rgba(183,148,246,.3);font-size:13px;color:#F8F8FF}
.ps-field.focus div{box-shadow:inset 0 0 0 1.5px var(--tg),0 0 12px rgba(0,209,193,.35)}
.ps-tabs{display:grid;grid-template-columns:repeat(3,1fr);padding:8px 6px;border-radius:18px;background:var(--panel)}
.ps-tabs span{display:flex;flex-direction:column;align-items:center;gap:4px;font-size:11px;color:var(--sf)}
.ps-tabs span.on{color:var(--lp)}
.ps-tabs span i{width:18px;height:18px;border-radius:50%;box-shadow:inset 0 0 0 1.6px currentColor}
.ps-tabs span.on i{background:radial-gradient(circle,currentColor 0 35%,transparent 38%)}
.ps-orbcard{display:flex;gap:18px;align-items:flex-start}
.ps-orbcard div{display:flex;flex-direction:column;align-items:center;gap:6px;font-size:11.5px;color:var(--sf)}
.ps-orbcard div > i{display:grid;place-items:center;width:52px;height:52px;border-radius:50%;font-style:normal;font-size:18px;font-weight:700;color:#2a0f2a;background:linear-gradient(135deg,var(--np),var(--lp));box-shadow:0 0 18px rgba(255,126,219,.6)}
.ps-orbcard div > i.act{box-shadow:0 0 0 3px var(--ink2),0 0 0 5px var(--tg),0 0 20px rgba(0,209,193,.5)}
.ps-hint{display:none;margin:0;font-size:var(--t-small);color:var(--soft)}
@media (max-width:1180px){.ps-hint{display:block}}
`

// the 3D model from the headset build: model-viewer, fetched only when the board comes near the screen
const MV = "https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js"
const MESHOPT = "https://unpkg.com/meshoptimizer@0.20.0/meshopt_decoder.js"
let mvReady: Promise<void> | null = null
function loadMV() {
    if (!mvReady)
        mvReady = new Promise<void>((ok, fail) => {
            const sc = document.createElement("script")
            sc.type = "module"
            sc.src = MV
            sc.onerror = () => fail(new Error("model-viewer did not load"))
            document.head.append(sc)
            customElements.whenDefined("model-viewer").then(() => {
                ;(customElements.get("model-viewer") as unknown as { meshoptDecoderLocation: string }).meshoptDecoderLocation = MESHOPT
                ok()
            })
        })
    return mvReady
}

function Pip3D({ src }: { src: string }) {
    const ref = React.useRef<HTMLDivElement>(null)
    const [on, setOn] = React.useState(false)
    const [state, setState] = React.useState("Loading Pip…")
    React.useEffect(() => {
        const el = ref.current
        if (!el) return
        const io = new IntersectionObserver(
            (es) => {
                if (es.some((e) => e.isIntersecting)) {
                    io.disconnect()
                    loadMV()
                        .then(() => setOn(true))
                        .catch(() => setState("Pip couldn't load here."))
                }
            },
            { rootMargin: "600px" },
        )
        io.observe(el)
        return () => io.disconnect()
    }, [])
    React.useEffect(() => {
        const mv = ref.current?.querySelector("model-viewer")
        if (!mv) return
        const ok = () => setState("")
        const bad = () => setState("Pip couldn't load here.")
        mv.addEventListener("load", ok)
        mv.addEventListener("error", bad)
        return () => {
            mv.removeEventListener("load", ok)
            mv.removeEventListener("error", bad)
        }
    }, [on])
    return (
        <div ref={ref} className="ps-mv" style={{ position: "relative", display: "flex" }}>
            {state ? <span className="ps-load">{state}</span> : null}
            {on
                ? React.createElement("model-viewer", {
                      src,
                      alt: "Pip, the low-poly astronaut companion, in 3D. Drag to turn him.",
                      "camera-controls": "",
                      "disable-zoom": "",
                      "disable-pan": "",
                      "auto-rotate": "",
                      "auto-rotate-delay": "0",
                      "rotation-per-second": "18deg",
                      "interaction-prompt": "none",
                      "camera-orbit": "20deg 80deg 115%",
                      "field-of-view": "30deg",
                      exposure: "1.05",
                      "shadow-intensity": "0",
                      "environment-image": "neutral",
                      style: { flex: 1, width: "100%", minHeight: 400, background: "transparent" },
                  })
                : null}
        </div>
    )
}

const Glow = ({ k }: { k: string }) => {
    const s: Record<string, React.CSSProperties> = {
        Orb: { width: 58, height: 58, borderRadius: "50%", background: "linear-gradient(135deg,#FF7EDB,#B794F6)", boxShadow: "0 0 22px rgba(255,126,219,.75)" },
        Primary: { width: 54, height: 54, borderRadius: 14, background: "#7C3AED", boxShadow: "0 0 22px rgba(124,58,237,.8)" },
        "Teal (focus)": { width: 58, height: 58, borderRadius: "50%", background: "#00D1C1", boxShadow: "0 0 22px rgba(0,209,193,.7)" },
        Pip: { width: 58, height: 58, borderRadius: "50%", background: "#B794F6", boxShadow: "0 0 22px rgba(183,148,246,.7)" },
        "Panel shadow": { width: 54, height: 54, borderRadius: 14, background: "#1A1333", boxShadow: "0 10px 24px rgba(0,0,0,.6)" },
    }
    return <i style={s[k]} />
}

export default function PipStyle({ model }: { model: string }) {
    React.useEffect(() => {
        if (document.getElementById("ps-montserrat")) return
        const l = document.createElement("link")
        l.id = "ps-montserrat"
        l.rel = "stylesheet"
        l.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
        document.head.append(l)
    }, [])
    return (
        <div className="ps">
            <style>{CSS}</style>
            <ul className="ps-why">
                {WHY.map(([t, p]) => (
                    <li key={t}>
                        <i aria-hidden="true" />
                        <b>{t}</b>
                        <p>{p}</p>
                    </li>
                ))}
            </ul>
            <p className="ps-hint">The board is wide: scroll it sideways →</p>
            <div className="ps-scroll" tabIndex={0} role="region" aria-label="Pip's design system board, scrolls sideways">
                <div className="ps-board">
                    <div className="ps-top">
                        <div className="ps-dark">
                            <p className="ps-h">Colour tokens</p>
                            {TOKENS.map(([n, u, h]) => (
                                <div className="ps-tok" key={n}>
                                    <i style={{ background: h }} />
                                    <div>
                                        <b>{n}</b>
                                        <span>{u}</span>
                                    </div>
                                    <code>{h}</code>
                                </div>
                            ))}
                            <div className="ps-stk">
                                {STICKY.map((c) => (
                                    <i key={c} style={{ background: c }} />
                                ))}
                                Sticky colours
                            </div>
                            <div className="ps-grad">
                                <div>
                                    <i style={{ background: "linear-gradient(90deg,#7C3AED,#00D1C1)" }} />
                                    Button gradient
                                </div>
                                <div>
                                    <i style={{ background: "linear-gradient(90deg,#FF7EDB,#B794F6)" }} />
                                    Orb glow
                                </div>
                            </div>
                        </div>
                        <div className="ps-pip">
                            <span className="ps-stars" aria-hidden="true" />
                            <p className="ps-h">Pip · AR companion · low-poly 3D</p>
                            <Pip3D src={model} />
                            <p>Drag to turn him. The same model floats in your room on Meta Quest.</p>
                        </div>
                        <div className="ps-right">
                            <p className="ps-h" style={{ color: "#7C3AED", margin: 0 }}>
                                Orbs
                            </p>
                            <div className="ps-orbs">
                                {ORBS.map(([a, b]) => (
                                    <i key={a} className="ps-orb" style={{ background: `radial-gradient(circle at 35% 30%,#fff9 0 12%,transparent 14%),linear-gradient(135deg,${a},${b})`, ["--g" as string]: a } as React.CSSProperties} />
                                ))}
                            </div>
                            <p className="ps-h" style={{ color: "#7C3AED", margin: "6px 0 0" }}>
                                Buttons
                            </p>
                            <div className="ps-btns">
                                <span className="ps-b l pri">Label</span>
                                <span className="ps-b m pri">Label</span>
                                <span className="ps-b l sec">Label</span>
                                <span className="ps-b m sec">Label</span>
                                <span className="ps-b l gh">Label</span>
                                <span className="ps-b m gh">Label</span>
                                <span className="ps-b l dst">Label</span>
                                <span className="ps-b m dst">Label</span>
                                <span className="ps-b l dsf">Label</span>
                                <span className="ps-b m dsf">Label</span>
                            </div>
                        </div>
                    </div>

                    <div className="ps-glows">
                        {["Orb", "Primary", "Teal (focus)", "Pip", "Panel shadow"].map((k) => (
                            <div className="ps-glow" key={k}>
                                <div>
                                    <Glow k={k} />
                                </div>
                                <span>Glow · {k}</span>
                            </div>
                        ))}
                    </div>

                    <div className="ps-mid">
                        <div className="ps-dark">
                            <p className="ps-h">Type · Montserrat only</p>
                            <div className="ps-type">
                                {TYPE.map(([n, w, size, weight]) => (
                                    <div key={n}>
                                        <span>
                                            {n}
                                            <br />
                                            {w}
                                        </span>
                                        <strong style={{ fontSize: size, fontWeight: weight }}>{n === "Clock" ? "4:00" : "A little space for later."}</strong>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="ps-rules">
                            {RULES.map(([t, p]) => (
                                <div key={t}>
                                    <b>{t}</b>
                                    <p>{p}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="ps-dark">
                        <p className="ps-h">Components</p>
                        <div className="ps-comp">
                            <div className="ps-cell">
                                <span>Thought row</span>
                                <div className="ps-row">
                                    <i className="o">A</i>
                                    <div>
                                        <b>Research idea</b>
                                        <small>Parked for later</small>
                                    </div>
                                    <em>Parked</em>
                                </div>
                                <span>Chips</span>
                                <div className="ps-chips">
                                    <i className="on">All</i>
                                    <i>Parked</i>
                                    <i>Active</i>
                                    <i>Completed</i>
                                    <i>Archived</i>
                                </div>
                            </div>
                            <div className="ps-cell">
                                <span>Fields</span>
                                <label className="ps-field">
                                    Title
                                    <div>One line is enough</div>
                                </label>
                                <label className="ps-field focus">
                                    Search
                                    <div>⌕ Search your thoughts</div>
                                </label>
                            </div>
                            <div className="ps-cell">
                                <span>Orb and status</span>
                                <div className="ps-orbcard">
                                    <div>
                                        <i>A</i>Parked
                                    </div>
                                    <div>
                                        <i className="act">A</i>Active
                                    </div>
                                </div>
                                <span>Tab bar</span>
                                <div className="ps-tabs">
                                    <span className="on">
                                        <i />
                                        AR Orbit
                                    </span>
                                    <span>
                                        <i />
                                        Library
                                    </span>
                                    <span>
                                        <i />
                                        Settings
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
