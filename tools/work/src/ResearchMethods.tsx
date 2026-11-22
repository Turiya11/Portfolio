// Research methods, drawn in the site's hand-made language (all text in the sans; no handwriting here): index cards taped to the dotted board, a whiteboard sketch of
// where each method sits (after Nielsen Norman Group's attitudinal/behavioural and qualitative/quantitative axes), the
// sensemaking steps as sticky notes along a hand-drawn path (Pirolli & Card's foraging and sensemaking loops), and one finding
// followed from evidence to design. Content is per project in tools/work/methods.mjs.
import * as React from "react"

export type Method = {
    name: string
    src: "Primary" | "Secondary"
    kind: "Qualitative" | "Quantitative" | "Mixed"
    n?: string // the sample or scale, such as "46 students"
    asked: string // the question it answered
    x: number // 0 qualitative … 1 quantitative
    y: number // 0 attitudinal (what people say) … 1 behavioural (what people do)
}
type Step = { step: string; did: string; out: string }
export type Methods = {
    statement: string
    used: Method[]
    forage: Step[] // gather and filter
    sense: Step[] // structure and decide
    chain: { saw: string; means: string; could: string; did: string }
}

const INK = "#3b3f55"
const TAPE = { Primary: "rgba(255,214,90,.72)", Secondary: "rgba(140,190,255,.62)" }
const NOTE = { Primary: "#FFF1A6", Secondary: "#D3E8FF" }
const STICKY = ["#FFF1A6", "#FFD6E0", "#D3E8FF", "#D9F3CF", "#E6DDFF", "#FFE2C6", "#FFF1A6"]
const TILT = [-1.6, 1.2, -0.7, 1.7, -1.2, 0.8, -1.4, 1.1]

// ---------- doodles: drawn with a felt-tip feel, round ends, a little uneven ----------
const D: Record<string, React.ReactNode> = {
    talk: (
        <>
            <path d="M7 12c0-3 2-5 5-5h16c3 0 5 2 5 5v8c0 3-2 5-5 5H17l-6 5 1-5c-3 0-5-2-5-5z" />
            <path d="M34 18h2c3 0 5 2 5 5v7c0 3-2 5-5 5h-1l1 5-6-5h-8c-2 0-4-1-5-3" />
            <path d="M13 13.5h13M13 18.5h8" />
        </>
    ),
    doctor: (
        <>
            <path d="M14 8v10a8 8 0 0 0 16 0V8" />
            <path d="M22 26v5a8 8 0 0 0 16 0v-3" />
            <circle cx="38" cy="25" r="3" />
            <path d="M11 8h6M27 8h6" />
        </>
    ),
    survey: (
        <>
            <rect x="11" y="9" width="26" height="33" rx="3" />
            <path d="M18 6.5h12v5.5H18z" />
            <path d="M16 21l2.5 2.5 4-4.5M16 31l2.5 2.5 4-4.5M26.5 21.5h6M26.5 31.5h5" />
        </>
    ),
    book: (
        <>
            <path d="M24 13c-4-3-10-4-16-3v27c6-1 12 0 16 3 4-3 10-4 16-3V10c-6-1-12 0-16 3z" />
            <path d="M24 13v27M12 17c3-.4 6 0 8 1M12 23c3-.4 6 0 8 1M28 18c2-1 5-1.4 8-1" />
        </>
    ),
    compare: (
        <>
            <circle cx="20" cy="20" r="11" />
            <path d="M28.5 28.5l11 11" />
            <path d="M14.5 19c1-3 3-4.5 6-4.5" />
        </>
    ),
    vote: (
        <>
            <circle cx="13" cy="15" r="4" fill="currentColor" />
            <circle cx="26" cy="11" r="4" fill="currentColor" />
            <circle cx="20" cy="27" r="4" />
            <circle cx="34" cy="24" r="4" fill="currentColor" />
            <circle cx="29" cy="38" r="4" />
        </>
    ),
    test: (
        <>
            <rect x="6" y="9" width="36" height="24" rx="3" />
            <path d="M18 40h12M24 33v7" />
            <path d="M21 15l9 6.5-4 1 2.3 4.2-2.2 1.2-2.3-4.3-3 2.8z" />
        </>
    ),
    flask: (
        <>
            <path d="M19 7h10M21 7v11L10 37c-1.5 3 .5 5 4 5h20c3.5 0 5.5-2 4-5L27 18V7" />
            <path d="M15 30c5-2 12 2 18 0" />
        </>
    ),
    threads: (
        <>
            <path d="M8 10h26c2 0 3 1 3 3v14c0 2-1 3-3 3H20l-7 6v-6H8c-2 0-3-1-3-3V13c0-2 1-3 3-3z" />
            <path d="M17.5 15l-2 10M25 15l-2 10M13 18.5h14M12 23h14" />
        </>
    ),
    rules: (
        <>
            <path d="M12 6h17l8 8v28H12z" />
            <path d="M29 6v8h8M17 20h14M17 26h14M17 32h7" />
            <circle cx="32" cy="35" r="4" />
        </>
    ),
    chart: (
        <>
            <path d="M7 40.5c11-.6 23-.4 35 0" />
            <path d="M12 39V27M20 39V16M28 39V23M36 39V10" />
        </>
    ),
    eye: (
        <>
            <path d="M4 24c5-8 12-12 20-12s15 4 20 12c-5 8-12 12-20 12S9 32 4 24z" />
            <circle cx="24" cy="24" r="6" />
            <circle cx="24" cy="24" r="1.5" fill="currentColor" />
        </>
    ),
    audit: (
        <>
            <rect x="7" y="8" width="24" height="32" rx="2" />
            <path d="M12 16h14M12 22h14M12 28h7" />
            <path d="M38 17l4 4-14 14h-4v-4z" />
        </>
    ),
    people: (
        <>
            <circle cx="17" cy="16" r="6" />
            <path d="M6 38c1-7 5-11 11-11s10 4 11 11" />
            <circle cx="33" cy="18" r="5" />
            <path d="M31 28c6 0 10 3 11.5 10" />
        </>
    ),
    flow: (
        <>
            <rect x="5" y="8" width="13" height="10" rx="2" />
            <rect x="30" y="8" width="13" height="10" rx="2" />
            <rect x="17.5" y="31" width="13" height="10" rx="2" />
            <path d="M18 13h12M11.5 18v7c0 3 2 6 6 6M36.5 18v7c0 3-2 6-6 6" />
        </>
    ),
    loop: (
        <>
            <path d="M38 19a15 15 0 0 0-27-4" />
            <path d="M10 8.5v7h7" />
            <path d="M10 29a15 15 0 0 0 27 4" />
            <path d="M38 39.5v-7h-7" />
        </>
    ),
    shield: (
        <>
            <path d="M24 5l15 6v11c0 10-7 17-15 21C16 39 9 32 9 22V11z" />
            <path d="M18 24l4 4 8-9" />
        </>
    ),
    headset: (
        <>
            <rect x="6" y="16" width="36" height="17" rx="7" />
            <path d="M20 30c1-3 2.5-4 4-4s3 1 4 4" />
            <path d="M9 16c2.5-5 8-8 15-8s12.5 3 15 8" />
        </>
    ),
    // sensemaking steps
    stack: (
        <>
            <path d="M7 14.5l19-4.5 4 18-19 4.5z" />
            <path d="M16 20h21v21H16z" />
            <path d="M20.5 27h12M20.5 32h8" />
        </>
    ),
    cluster: (
        <>
            <path d="M3.5 18c-.5-11 27-14 28.5-2 1.5 12-28 16-28.5 2z" />
            <path d="M29 34c0-9 16-11 16-1s-16 10-16 1z" />
            <rect x="9" y="11" width="7" height="7" />
            <rect x="19" y="13" width="7" height="7" />
            <rect x="34" y="30" width="6" height="6" />
        </>
    ),
    tally: <path d="M11 10v28M18 10.5v27.5M25 10v28M32 10.5v27.5M6 33l31-19" />,
    wave: (
        <>
            <path d="M5 31c6-14 10-14 14-4s8 10 13-6 8-8 11 0" />
            <circle cx="5" cy="31" r="2.6" fill="currentColor" />
            <circle cx="43" cy="21" r="2.6" fill="currentColor" />
        </>
    ),
    system: (
        <>
            <circle cx="12" cy="14" r="5" />
            <circle cx="36" cy="14" r="5" />
            <circle cx="24" cy="36" r="5" />
            <path d="M17.5 14h12.5M33.5 19l-6.5 12M20.5 31.5L15 19.5" />
        </>
    ),
    bulb: (
        <>
            <path d="M17 31c-4-3-6-7-6-11a13 13 0 0 1 26 0c0 4-2 8-6 11v4H17z" />
            <path d="M18.5 39.5h11M20.5 43.5h7M24 23v8" />
            <path d="M5 8l3 2.5M43 8l-3 2.5M24 1.5v3" />
        </>
    ),
    question: (
        <>
            <path d="M15.5 16a8.5 8.5 0 1 1 11.5 7.5c-2 1-3 2.5-3 5v2" />
            <circle cx="24" cy="37.5" r="1.8" fill="currentColor" />
        </>
    ),
    check: (
        <>
            <rect x="7" y="7" width="34" height="34" rx="7" />
            <path d="M15 25l6 6 13-14" />
        </>
    ),
    grid: (
        <>
            <rect x="6" y="6" width="16" height="16" rx="2" />
            <rect x="26" y="6" width="16" height="16" rx="2" />
            <rect x="6" y="26" width="16" height="16" rx="2" />
            <rect x="26" y="26" width="16" height="16" rx="2" />
            <path d="M10 14l3 3 6-6" />
        </>
    ),
    heart: <path d="M24 40C10 31 6 24 6 17a9 9 0 0 1 18-3 9 9 0 0 1 18 3c0 7-4 14-18 23z" />,
    face: (
        <>
            <circle cx="24" cy="24" r="17" />
            <circle cx="18.5" cy="21" r="1.6" fill="currentColor" />
            <circle cx="29.5" cy="21" r="1.6" fill="currentColor" />
            <path d="M17 29c4 4 10 4 14 0" />
        </>
    ),
    pen: (
        <>
            <path d="M10 38l4-12 20-20 8 8-20 20z" />
            <path d="M14 26l8 8M30 10l8 8" />
        </>
    ),
}

const pick = (s: string, table: [RegExp, string][], fallback: string) => table.find(([re]) => re.test(s))?.[1] || fallback
const methodIcon = (name: string) =>
    pick(
        name,
        [
            [/doctor/i, "doctor"],
            [/interview|conversation/i, "talk"],
            [/survey/i, "survey"],
            [/dot vot/i, "vote"],
            [/usability/i, "test"],
            [/sprint/i, "loop"],
            [/experiment/i, "flask"],
            [/community|discussion|reddit/i, "threads"],
            [/audit of|form/i, "audit"],
            [/stakeholder/i, "people"],
            [/workflow/i, "flow"],
            [/safety/i, "shield"],
            [/XR/i, "headset"],
            [/human factors/i, "eye"],
            [/crash|data mining|market/i, "chart"],
            [/standard|regulation|ITIL|documentation/i, "rules"],
            [/competit/i, "compare"],
        ],
        "book",
    )
const stepIcon = (name: string) =>
    pick(
        name,
        [
            [/collect/i, "stack"],
            [/empathy/i, "heart"],
            [/count/i, "tally"],
            [/journey/i, "wave"],
            [/system/i, "system"],
            [/how might/i, "question"],
            [/insight|problem/i, "bulb"],
            [/persona|storyboard/i, "face"],
            [/moscow/i, "grid"],
            [/dot vot/i, "vote"],
            [/test/i, "test"],
            [/map how/i, "flow"],
            [/audit|gap|compar|market/i, "compare"],
            [/affinity|card sort|split|cluster|pain/i, "cluster"],
            [/requirement|principle|decision|ideas|rule|move/i, "check"],
        ],
        "pen",
    )

const Doodle = ({ k, size = 40 }: { k: string; size?: number }) => (
    <svg className="rm-doodle" viewBox="0 0 48 48" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {D[k]}
    </svg>
)

// a hand-drawn arrow between two stops
const Arrow = ({ cls = "" }: { cls?: string }) => (
    <svg className={`rm-arrow ${cls}`} viewBox="0 0 64 28" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 17c12-10 30-12 50-4" />
        <path d="M46 6.5l9 6.8-10 4.2" />
    </svg>
)

// ---------- CSS ----------
const CSS = `
.rm{display:flex;flex-direction:column;gap:clamp(34px,4vw,56px)}
.rm-h{margin:0 0 6px;font-size:var(--t-h3);font-weight:600;letter-spacing:var(--ls-h3)}
.rm-board{position:relative;padding:clamp(20px,2.4vw,30px);border-radius:24px;border:1px solid rgba(255,255,255,.75);
  background-color:rgba(255,255,255,.55);background-image:radial-gradient(rgba(60,60,90,.16) 1px,transparent 1.2px);background-size:18px 18px;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.9),0 24px 48px -32px rgba(40,40,90,.35)}
.rm-legend{display:flex;flex-wrap:wrap;gap:6px 22px;margin:0 0 18px;padding:0;list-style:none;font-size:var(--t-small);font-weight:500;color:var(--soft)}
.rm-legend li{display:flex;align-items:center;gap:8px}
.rm-legend i{display:inline-block;width:34px;height:12px;transform:rotate(-4deg)}
.rm-kit{display:grid;grid-template-columns:minmax(260px,.82fr) 1.6fr;gap:clamp(18px,2.4vw,30px);align-items:start}
.rm-sketch{position:sticky;top:28px;margin:0}
.rm-sketch svg{display:block;width:100%;height:auto;overflow:visible}
.rm-sketch figcaption{margin:6px 6px 0;font-size:var(--t-label);font-weight:400;line-height:1.45;color:var(--quiet)}
.rm-pin{cursor:default}
.rm-pin rect{transition:transform .25s cubic-bezier(.2,.9,.25,1);transform-box:fill-box;transform-origin:center}
.rm-pin.on rect{transform:scale(1.25)}
.rm-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:26px 20px;margin:0;padding:10px 0 0;list-style:none}
.rm-card{position:relative;display:flex;flex-direction:column;gap:8px;padding:22px 16px 16px;border-radius:4px 4px 12px 4px;background:#fffefa;
  box-shadow:0 1px 1px rgba(0,0,0,.05),0 12px 20px -12px rgba(0,0,0,.32);transition:transform .35s cubic-bezier(.2,.9,.25,1),box-shadow .35s}
.rm-card.on,.rm-card:hover{transform:rotate(0deg) translateY(-3px)!important;box-shadow:0 2px 2px rgba(0,0,0,.05),0 20px 28px -14px rgba(0,0,0,.34)}
.rm-tape{position:absolute;top:-9px;left:50%;width:74px;height:18px;transform:translateX(-50%) rotate(-3deg);box-shadow:0 1px 1px rgba(0,0,0,.05)}
.rm-ch{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
.rm-ico{position:relative;display:grid;place-items:center;width:52px;height:52px;color:${INK}}
.rm-ico:before{content:"";position:absolute;inset:6px 2px 4px 8px;border-radius:46% 54% 40% 60%/55% 45% 55% 45%;background:var(--blob);opacity:.9}
.rm-ico svg{position:relative}
.rm-no{font-size:18px;font-weight:600;line-height:1;color:var(--ai)}
.rm-card b{font-size:var(--t-body);font-weight:600;line-height:1.3;color:var(--ink)}
.rm-n{margin:0;font-size:var(--t-small);font-weight:600;line-height:1.4;color:var(--ai)}
.rm-q{margin:0;font-size:var(--t-small);line-height:1.5;color:var(--soft)}
.rm-kind{margin-top:auto;padding-top:4px;font-size:var(--t-label);font-weight:600;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--quiet)}
/* sensemaking path */
.rm-mess{display:block;width:min(100%,560px);height:auto;margin:0 auto 6px}
.rm-mess text{font-family:var(--sans);font-size:13px;font-weight:500;fill:#6b7083}
.rm-zone{display:flex;flex-direction:column;gap:14px}
.rm-zone + .rm-zone{margin-top:26px}
.rm-zh{display:flex;align-items:baseline;flex-wrap:wrap;gap:4px 12px;margin:0}
.rm-zh b{font-size:var(--t-body);font-weight:600}
.rm-zh span{font-size:var(--t-small);font-weight:500;color:var(--soft);background:linear-gradient(transparent 62%,rgba(255,224,102,.75) 62%,rgba(255,214,79,.7) 92%,transparent 92%)}
.rm-path{display:flex;align-items:flex-start;gap:0;margin:0;padding:0;list-style:none}
.rm-stop{flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center}
.rm-stop .rm-ring{display:grid;place-items:center;width:62px;height:62px;border-radius:50%;background:#fff;color:${INK};box-shadow:0 0 0 1px rgba(30,35,60,.08),0 8px 16px -10px rgba(30,35,60,.4)}
.rm-stop b{font-size:var(--t-small);font-weight:600;line-height:1.3}
.rm-sticky{width:100%;max-width:220px;margin:0;padding:12px 13px 15px;border-radius:3px 3px 10px 3px;font-size:var(--t-small);font-weight:500;line-height:1.4;color:#262626;text-align:left;
  box-shadow:0 1px 1px rgba(0,0,0,.06),0 10px 16px -10px rgba(0,0,0,.35);transition:transform .35s cubic-bezier(.2,.9,.25,1)}
.rm-sticky:hover{transform:rotate(0deg) scale(1.04)!important}
.rm-stop p.rm-did{margin:0;max-width:220px;font-size:var(--t-small);line-height:1.45;color:var(--soft)}
.rm-arrow{flex:none;width:48px;height:22px;margin-top:20px}
.rm-down{display:block;width:70px;height:60px;margin:6px auto -6px}
/* the chain */
.rm-chain{display:flex;align-items:stretch;margin:0;padding:8px 0 0;list-style:none}
.rm-link{flex:1 1 0;min-width:0;display:flex;flex-direction:column;gap:10px}
.rm-link .rm-lab{align-self:flex-start;margin:0;padding:5px 11px;border-radius:999px;background:rgba(255,255,255,.85);font-size:var(--t-label);font-weight:600;letter-spacing:var(--ls-caps);text-transform:uppercase;color:#4b5563}
.rm-link .rm-sticky{flex:1;max-width:none;font-size:var(--t-body);line-height:1.45;padding:16px 16px 20px}
.rm-link.last .rm-sticky{background:var(--ai)!important;color:#fff;box-shadow:0 18px 30px -18px rgba(60,40,150,.7)}
.rm-chain .rm-arrow{align-self:center;margin:30px 2px 0}
.rm-star{position:absolute;top:-14px;right:-10px;width:34px;height:34px;color:#f2b632}
@media (max-width:1100px){.rm-kit{grid-template-columns:1fr}.rm-sketch{position:static;max-width:460px}}
@media (max-width:860px){
  .rm-path,.rm-chain{flex-direction:column;align-items:stretch}
  .rm-stop{display:grid;grid-template-columns:62px 1fr;grid-template-areas:"ring name" "ring note" "ring did";align-items:start;gap:6px 14px;text-align:left}
  .rm-stop .rm-ring{grid-area:ring}.rm-stop b{grid-area:name;align-self:end}.rm-stop .rm-sticky{grid-area:note;max-width:320px}.rm-stop p.rm-did{grid-area:did;max-width:none}
  .rm-path .rm-arrow{transform:rotate(90deg);margin:4px 0 4px 8px}
  .rm-chain .rm-arrow{align-self:center;transform:rotate(90deg);margin:6px 0}
}
@media (prefers-reduced-motion:reduce){.rm-card,.rm-sticky,.rm-pin rect{transition:none}}
`

// keep pins that land on the same spot apart, so every number stays readable
function place(used: Method[], x0: number, y0: number, w: number, h: number) {
    const pts = used.map((m) => ({ x: x0 + m.x * w, y: y0 + m.y * h }))
    for (let k = 0; k < 60; k++)
        for (let i = 0; i < pts.length; i++)
            for (let j = i + 1; j < pts.length; j++) {
                const dx = pts[j].x - pts[i].x,
                    dy = pts[j].y - pts[i].y,
                    d = Math.hypot(dx, dy) || 0.01
                if (d < 30) {
                    const p = (30 - d) / 2,
                        ux = dx / d || 1,
                        uy = dy / d
                    pts[i].x -= ux * p
                    pts[i].y -= uy * p
                    pts[j].x += ux * p
                    pts[j].y += uy * p
                }
            }
    return pts.map((p) => ({ x: Math.min(x0 + w, Math.max(x0, p.x)), y: Math.min(y0 + h, Math.max(y0, p.y)) }))
}

// the landscape, sketched on a whiteboard: wobbly axes, handwritten ends, a sticky square per method
function Sketch({ used, on, setOn }: { used: Method[]; on: number; setOn: (i: number) => void }) {
    const W = 340,
        H = 320,
        cx = W / 2,
        cy = H / 2
    const pts = place(used, 44, 44, W - 88, H - 88)
    return (
        <figure className="rm-sketch">
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Where each method sits: ${used.map((m, i) => `${i + 1}, ${m.name}: ${m.x < 0.5 ? "qualitative" : "quantitative"}, ${m.y < 0.5 ? "what people say" : "what people do"}`).join("; ")}`}>
                <path d="M14 10c80-3 230-4 312 1 3 90 4 210 0 298-90 3-220 3-312 0-3-95-3-200 0-299z" fill="rgba(255,255,255,.88)" stroke="rgba(30,35,60,.12)" strokeWidth="1.4" />
                <g fill="none" stroke={INK} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity=".75">
                    <path d={`M${cx + 1} 34c-2 60 2 170-1 ${H - 68}`} />
                    <path d={`M${cx - 6} 42l6-9 6 9M${cx - 6} ${H - 42}l6 9 6-9`} />
                    <path d={`M34 ${cy}c70 2 190-3 ${W - 68} 1`} />
                    <path d={`M42 ${cy - 6}l-9 6 9 6M${W - 42} ${cy - 5}l9 6-9 6`} />
                </g>
                <g fontFamily="var(--sans)" fontWeight="500" fill="#6b7083" fontSize="12">
                    <text x={cx} y="27" textAnchor="middle">
                        what people say
                    </text>
                    <text x={cx} y={H - 14} textAnchor="middle">
                        what people do
                    </text>
                    <text x="24" y={H - 40}>
                        ← why · qual
                    </text>
                    <text x={W - 24} y={H - 40} textAnchor="end">
                        how many · quant →
                    </text>
                </g>
                {used.map((m, i) => {
                    const p = pts[i],
                        r = TILT[i % TILT.length] * 4
                    return (
                        <g key={m.name} className={`rm-pin${on === i ? " on" : ""}`} onMouseEnter={() => setOn(i)} onMouseLeave={() => setOn(-1)} transform={`translate(${p.x} ${p.y}) rotate(${r})`}>
                            <rect x="-13" y="-13" width="26" height="26" rx="2" fill={NOTE[m.src]} stroke="rgba(0,0,0,.06)" style={{ filter: "drop-shadow(0 3px 3px rgba(0,0,0,.18))" }} />
                            <text y="4.5" textAnchor="middle" fontFamily="var(--sans)" fontWeight="600" fontSize="13" fill="#262626" style={{ pointerEvents: "none" }}>
                                {i + 1}
                            </text>
                        </g>
                    )
                })}
            </svg>
            <figcaption>roughly where each one sits, after NN/g's map of research methods</figcaption>
        </figure>
    )
}

// from a messy pile, to clusters, to one idea: the shape of the work, drawn once at the top of the path
const Mess = () => {
    const pile: [number, number, number, string][] = [
        [18, 30, -14, STICKY[0]],
        [46, 18, 9, STICKY[1]],
        [30, 52, 6, STICKY[2]],
        [62, 46, -10, STICKY[3]],
        [78, 22, 14, STICKY[4]],
        [12, 64, 12, STICKY[5]],
        [56, 70, -6, STICKY[1]],
        [86, 60, 8, STICKY[0]],
    ]
    const cols = [
        [STICKY[0], STICKY[0], STICKY[0]],
        [STICKY[1], STICKY[1]],
        [STICKY[2], STICKY[2], STICKY[2]],
    ]
    return (
        <svg className="rm-mess" viewBox="0 0 560 130" aria-hidden="true">
            {pile.map(([x, y, r, c], i) => (
                <rect key={i} x={x + 20} y={y} width="22" height="22" rx="2" fill={c} transform={`rotate(${r} ${x + 31} ${y + 11})`} style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,.15))" }} />
            ))}
            <text x="72" y="122" textAnchor="middle">
                everything I found
            </text>
            <g fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M146 54c18-8 36-9 54-2" />
                <path d="M192 44l9 8-11 5" />
                <path d="M358 54c18-8 36-9 54-2" />
                <path d="M404 44l9 8-11 5" />
            </g>
            {cols.map((col, ci) =>
                col.map((c, k) => <rect key={`${ci}-${k}`} x={230 + ci * 34} y={16 + k * 26} width="24" height="22" rx="2" fill={c} transform={`rotate(${(ci + k) % 2 ? 2 : -2} ${242 + ci * 34} ${27 + k * 26})`} style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,.15))" }} />),
            )}
            <text x="281" y="122" textAnchor="middle">
                grouped
            </text>
            <rect x="440" y="18" width="78" height="74" rx="3" fill={STICKY[3]} transform="rotate(-3 479 55)" style={{ filter: "drop-shadow(0 3px 3px rgba(0,0,0,.18))" }} />
            <g transform="translate(459 30) scale(.85)" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                {D.bulb}
            </g>
            <text x="479" y="122" textAnchor="middle">
                what it means
            </text>
        </svg>
    )
}

function Path({ steps, offset }: { steps: Step[]; offset: number }) {
    return (
        <ol className="rm-path">
            {steps.map((s, i) => (
                <React.Fragment key={s.step}>
                    {i ? (
                        <li aria-hidden="true" style={{ display: "contents" }}>
                            <Arrow />
                        </li>
                    ) : null}
                    <li className="rm-stop">
                        <span className="rm-ring">
                            <Doodle k={stepIcon(s.step)} size={36} />
                        </span>
                        <b>{s.step}</b>
                        <p className="rm-sticky" style={{ background: STICKY[(i + offset) % STICKY.length], transform: `rotate(${TILT[(i + offset) % TILT.length]}deg)` }}>
                            {s.out}
                        </p>
                        <p className="rm-did">{s.did}</p>
                    </li>
                </React.Fragment>
            ))}
        </ol>
    )
}

export default function ResearchMethods({ m }: { m: Methods }) {
    const [on, setOn] = React.useState(-1)
    const chain = [
        ["What I saw", m.chain.saw],
        ["What it means", m.chain.means],
        ["What could help", m.chain.could],
        ["What I designed", m.chain.did],
    ]
    return (
        <div className="rm">
            <style>{CSS}</style>

            <div>
                <h3 className="rm-h">The methods, and the question each one answered</h3>
                <div className="rm-board">
                    <ul className="rm-legend">
                        <li>
                            <i style={{ background: TAPE.Primary }} /> yellow tape: first-hand, from people
                        </li>
                        <li>
                            <i style={{ background: TAPE.Secondary }} /> blue tape: from what's already published
                        </li>
                    </ul>
                    <div className="rm-kit">
                        <Sketch used={m.used} on={on} setOn={setOn} />
                        <ol className="rm-cards">
                            {m.used.map((u, i) => (
                                <li key={u.name} className={`rm-card${on === i ? " on" : ""}`} style={{ transform: `rotate(${TILT[(i + 3) % TILT.length] * 0.7}deg)` }} onMouseEnter={() => setOn(i)} onMouseLeave={() => setOn(-1)}>
                                    <span className="rm-tape" style={{ background: TAPE[u.src] }} aria-hidden="true" />
                                    <div className="rm-ch">
                                        <span className="rm-ico" style={{ ["--blob" as string]: NOTE[u.src] } as React.CSSProperties}>
                                            <Doodle k={methodIcon(u.name)} />
                                        </span>
                                        <span className="rm-no" aria-hidden="true">
                                            {i + 1}
                                        </span>
                                    </div>
                                    <b>{u.name}</b>
                                    {u.n ? <p className="rm-n">{u.n}</p> : null}
                                    <p className="rm-q">{u.asked}</p>
                                    <span className="rm-kind">
                                        {u.src} · {u.kind}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="rm-h">How I made sense of it</h3>
                <div className="rm-board">
                    <Mess />
                    <div className="rm-zone">
                        <p className="rm-zh">
                            <b>Foraging</b>
                            <span>gather it, then filter it</span>
                        </p>
                        <Path steps={m.forage} offset={0} />
                    </div>
                    <svg className="rm-down" viewBox="0 0 70 60" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M18 6c-6 18 4 36 30 44" />
                        <path d="M38 43l11 7-12 4" />
                    </svg>
                    <div className="rm-zone">
                        <p className="rm-zh">
                            <b>Sensemaking</b>
                            <span>give it a shape, then decide</span>
                        </p>
                        <Path steps={m.sense} offset={3} />
                    </div>
                </div>
                <p className="cs-small" style={{ marginTop: 12 }}>
                    The two halves follow Pirolli and Card's model of sensemaking.
                </p>
            </div>

            <div>
                <h3 className="rm-h">One finding, followed all the way through</h3>
                <ol className="rm-chain">
                    {chain.map(([label, text], i) => (
                        <React.Fragment key={label}>
                            {i ? (
                                <li aria-hidden="true" style={{ display: "contents" }}>
                                    <Arrow />
                                </li>
                            ) : null}
                            <li className={i === 3 ? "rm-link last" : "rm-link"}>
                                <p className="rm-lab">{label}</p>
                                <div style={{ position: "relative", flex: 1, display: "flex" }}>
                                    <p className="rm-sticky" style={{ background: STICKY[i], transform: `rotate(${TILT[i + 1]}deg)` }}>
                                        {text}
                                    </p>
                                    {i === 3 ? (
                                        <svg className="rm-star" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
                                            <path d="M24 4l5.6 12.4 13.4 1.4-10 9.2 2.9 13.3L24 33.6 12.1 40.3 15 27 5 17.8l13.4-1.4z" />
                                        </svg>
                                    ) : null}
                                </div>
                            </li>
                        </React.Fragment>
                    ))}
                </ol>
            </div>

        </div>
    )
}
