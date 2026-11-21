// Research: a row of folders. Each opens a scrollable modal with the data behind it.
// A folder's content is a list of blocks; see the Block type for what each one draws.
// Any text can mark a key point as ==like this==: it shows bold, and a highlighter sweeps over it shortly after it scrolls into view.
import * as React from "react"
import Avatar, { type Face } from "./Avatar"

type Persona = {
    name: string
    role: string
    face?: Face | Face[] // an illustrated face, or two for a couple
    meta?: string
    quote?: string
    traits?: string[]
    background?: string[]
    pain?: string[]
    goals?: string[]
    needs?: string[]
    columns?: { t: string; items: string[] }[] // any other headings, such as an empathy map
}
export type Block = {
    h?: string // sub-heading
    p?: string // one short paragraph
    stats?: { n: string; l: string }[]
    cards?: { t: string; items: string[] }[]
    table?: { head: string[]; rows: string[][]; hl?: number; tag?: string } // hl: a row to pick out, tag: a badge on it
    image?: { src: string; alt: string; caption?: string }
    quote?: string
    note?: string
    persona?: Persona
}
export type Folder = { title: string; hint: string; blocks: Block[] }

const CSS = `
.rf-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(18px,2.4vw,30px) clamp(14px,1.8vw,24px);padding-top:14px}
.rf-wrap{position:relative;isolation:isolate;height:100%;padding-top:20px;transition:transform .35s cubic-bezier(.2,.9,.25,1)}
.rf-wrap:hover,.rf-wrap:has(.rf-folder:focus-visible){transform:translateY(-4px)}
/* liquid glass: a frosted body and tab, with a coloured sheet inside that the glass blurs, and that peeks out on hover */
.rf-paper{position:absolute;z-index:0;left:9%;right:9%;top:30px;height:62%;border-radius:12px;background:linear-gradient(135deg,var(--p1),var(--p2));box-shadow:0 6px 16px -8px rgba(40,40,90,.35);transform:rotate(-3deg);filter:blur(12px);transition:transform .45s cubic-bezier(.2,.9,.25,1),filter .45s;pointer-events:none}
.rf-paper:after{content:'';position:absolute;left:12%;right:30%;top:18%;height:8px;border-radius:4px;background:rgba(255,255,255,.7);box-shadow:0 16px 0 rgba(255,255,255,.55),0 32px 0 -1px rgba(255,255,255,.45)}
.rf-wrap:hover .rf-paper,.rf-wrap:has(.rf-folder:focus-visible) .rf-paper{transform:translateY(-30px) rotate(-5deg);filter:blur(0)}
.rf-tab,.rf-folder{background:linear-gradient(160deg,rgba(255,255,255,.62),rgba(255,255,255,.26));backdrop-filter:blur(18px) saturate(170%);-webkit-backdrop-filter:blur(18px) saturate(170%)}
.rf-tab{position:absolute;z-index:1;left:0;top:2px;width:46%;height:20px;background:linear-gradient(170deg,rgba(255,255,255,.85),rgba(255,255,255,.5));clip-path:polygon(0 calc(100% + 1px),0 12px,0.5px 7.4px,2.1px 4.2px,4.2px 2.1px,7.4px 0.5px,12px 0,66.0% 0.0%,69.4% 2.8%,72.8% 10.4%,76.2% 21.6%,79.6% 35.2%,83.0% 50.0%,86.4% 64.8%,89.8% 78.4%,93.2% 89.6%,96.6% 97.2%,100.0% 100.0%,100% calc(100% + 1px));box-shadow:inset 0 1.5px 0 rgba(255,255,255,.95);pointer-events:none}
.rf-folder{position:relative;z-index:1;display:flex;flex-direction:column;justify-content:flex-end;width:100%;height:100%;min-height:clamp(150px,14vw,196px);padding:clamp(16px,1.8vw,24px);border:1px solid rgba(255,255,255,.78);border-top-color:rgba(255,255,255,.6);border-radius:0 22px 22px 22px;color:var(--ink);font:inherit;text-align:left;cursor:pointer;box-shadow:inset 0 1.5px 0 rgba(255,255,255,.9),inset 0 -1px 0 rgba(255,255,255,.35),0 26px 44px -28px rgba(50,60,140,.5);transition:box-shadow .35s}
.rf-folder:before{content:'';position:absolute;left:clamp(16px,1.8vw,24px);right:clamp(16px,1.8vw,24px);bottom:clamp(12px,1.2vw,16px);height:5px;border-top:1.5px solid rgba(255,255,255,.85);border-bottom:1.5px solid rgba(255,255,255,.6);pointer-events:none}
.rf-wrap:hover .rf-folder{box-shadow:inset 0 1.5px 0 rgba(255,255,255,.95),inset 0 -1px 0 rgba(255,255,255,.4),0 34px 52px -28px rgba(50,60,140,.55)}
.rf-folder:focus-visible{outline:3px solid var(--ai);outline-offset:3px}
.rf-wrap:nth-child(6n+1){--p1:#ffd6e0;--p2:#c9b8ff}
.rf-wrap:nth-child(6n+2){--p1:#d3e8ff;--p2:#9fe3d0}
.rf-wrap:nth-child(6n+3){--p1:#fff1a6;--p2:#ffb98a}
.rf-wrap:nth-child(6n+4){--p1:#e6ddff;--p2:#ff9fc4}
.rf-wrap:nth-child(6n+5){--p1:#d9f3cf;--p2:#8fc8ee}
.rf-wrap:nth-child(6n+6){--p1:#ffe2c6;--p2:#f59aa8}
.rf-title{display:block;font-size:var(--t-h3);font-weight:600;letter-spacing:var(--ls-h3);line-height:1.25}
.rf-hint{display:block;margin-top:6px;margin-bottom:12px;font-size:var(--t-small);font-weight:400;line-height:1.5;color:var(--soft)}
.rf-modal{width:min(1040px,94vw);max-width:none;max-height:88vh;padding:0;border:0;border-radius:24px;background:#fbfaf7;color:var(--ink);box-shadow:0 40px 90px -20px rgba(20,20,60,.6);overflow:hidden}
.rf-modal[open]{display:flex;flex-direction:column;animation:rf-in .28s cubic-bezier(.2,.9,.25,1)}
.rf-modal::backdrop{background:rgba(25,25,55,.5);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
@keyframes rf-in{from{opacity:0;transform:translateY(14px) scale(.985)}to{opacity:1;transform:none}}
.rf-head{flex:none;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px clamp(18px,3vw,32px);border-bottom:1px solid rgba(30,35,60,.1)}
.rf-head h3{flex:1;min-width:0;margin:0;font-size:var(--t-h2);font-weight:600;letter-spacing:var(--ls-h2);line-height:1.15}
.rf-x{flex:none;width:40px;height:40px;border:0;border-radius:50%;background:rgba(30,35,60,.08);color:var(--ink);font-size:19px;line-height:1;cursor:pointer;transition:background .2s,transform .2s}
.rf-x:hover{background:rgba(30,35,60,.15);transform:rotate(90deg)}
.rf-foot{flex:none;display:flex;justify-content:space-between;gap:12px;padding:12px clamp(18px,3vw,32px) 14px;border-top:1px solid rgba(30,35,60,.1)}
.rf-step{display:flex;flex-direction:column;gap:2px;max-width:48%;min-width:0;padding:10px 16px;border:0;border-radius:14px;background:rgba(30,35,60,.05);color:var(--ink);font:inherit;text-align:left;cursor:pointer;transition:background .2s,transform .2s}
.rf-step:hover{background:color-mix(in srgb,var(--ai) 12%,#fff)}
.rf-step:hover small{transform:translateX(-3px)}
.rf-step.next:hover small{transform:translateX(3px)}
.rf-step small{font-size:var(--t-label);font-weight:600;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--ai);transition:transform .2s}
.rf-step b{font-size:var(--t-small);font-weight:600;line-height:1.35}
.rf-step.next{margin-left:auto;align-items:flex-end;text-align:right}
.rf-body{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:clamp(18px,3vw,32px);display:flex;flex-direction:column;gap:18px}
.rf-body:focus{outline:none}
.rf-body > *{flex-shrink:0}
/* blocks rise in as they scroll into view (only once the script is watching, so nothing is ever stuck hidden) */
.rf-go .rf-rv{transition:opacity .5s ease,transform .6s cubic-bezier(.2,.9,.25,1);transition-delay:var(--d,0s)}
.rf-go .rf-rv:not(.in){opacity:0;transform:translateY(14px)}
.rf-go .rf-cards.rf-rv .rf-card{transition:opacity .45s ease,transform .55s cubic-bezier(.2,.9,.25,1);transition-delay:calc(var(--d,0s) + var(--i,0) * 70ms)}
.rf-go .rf-cards.rf-rv:not(.in) .rf-card{opacity:0;transform:translateY(10px)}
.rf-body h4{display:flex;align-items:center;gap:10px;margin:12px 0 -6px;font-size:var(--t-label);font-weight:600;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--ai)}
.rf-body h4:before{content:'';flex:none;width:18px;height:2px;border-radius:2px;background:currentColor}
.rf-body > h4:first-child{margin-top:0}
.rf-p{margin:0;font-size:var(--t-body);font-weight:400;line-height:1.5;color:var(--soft)}
/* the highlighter: bold straight away, then the marker sweeps across */
mark.rf-hl{padding:0 .12em;margin:0 -.04em;border-radius:.25em;font-weight:600;color:var(--ink);background:linear-gradient(100deg,rgba(255,224,102,.0) 0,rgba(255,224,102,.85) .4em,rgba(255,214,79,.8) 100%) no-repeat 0 62%/0% 74%;-webkit-box-decoration-break:clone;box-decoration-break:clone;transition:background-size .9s cubic-bezier(.6,.05,.25,1);transition-delay:var(--hd,.6s)}
mark.rf-hl.on{background-size:100% 74%}
.rf-quote{position:relative;margin:0;padding:22px 26px 22px 70px;border-radius:18px;background:linear-gradient(120deg,color-mix(in srgb,var(--ai) 11%,#fff),#fdecef);font-size:var(--t-h3);font-weight:600;letter-spacing:var(--ls-h3);line-height:1.3;color:var(--ink);overflow:hidden}
.rf-quote:before{content:'\\201C';position:absolute;left:18px;top:2px;font:700 76px/1 Georgia,serif;color:var(--ai);opacity:.55}
.rf-note{display:flex;gap:10px;align-items:flex-start;margin:0;padding:12px 16px;border-radius:12px;background:rgba(30,35,60,.05);font-size:var(--t-small);font-weight:400;line-height:1.5;color:var(--soft)}
.rf-note:before{content:'i';flex:none;display:grid;place-items:center;width:18px;height:18px;margin-top:2px;border-radius:50%;background:color-mix(in srgb,var(--ai) 16%,#fff);color:var(--ai);font:700 11px/1 Georgia,serif}
.rf-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}
.rf-stat{position:relative;padding:18px;border-radius:16px;background:linear-gradient(160deg,#fff 40%,color-mix(in srgb,var(--ai) 9%,#fff));box-shadow:0 0 0 1px rgba(30,35,60,.07);overflow:hidden;transition:transform .25s,box-shadow .25s}
.rf-stat:hover{transform:translateY(-2px);box-shadow:0 0 0 1px color-mix(in srgb,var(--ai) 30%,transparent),0 14px 26px -18px color-mix(in srgb,var(--ai) 70%,transparent)}
.rf-stat b{display:block;font-size:clamp(28px,3.2vw,40px);font-weight:600;letter-spacing:var(--ls-h2);line-height:1.05;color:var(--ai);font-variant-numeric:tabular-nums}
.rf-stat span{display:block;margin-top:8px;font-size:var(--t-small);font-weight:400;line-height:1.5;color:var(--soft)}
.rf-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px}
.rf-card{position:relative;padding:18px 18px 16px;border-radius:16px;background:#fff;box-shadow:0 0 0 1px rgba(30,35,60,.07);overflow:hidden;transition:transform .25s,box-shadow .25s}
.rf-card:before{content:'';position:absolute;left:0;top:0;right:0;height:4px;background:linear-gradient(90deg,var(--c1),var(--c2))}
.rf-card:hover{transform:translateY(-3px);box-shadow:0 0 0 1px rgba(30,35,60,.09),0 18px 30px -22px rgba(30,35,60,.45)}
.rf-card:nth-child(5n+1){--c1:#ff9fbb;--c2:#a98bff}
.rf-card:nth-child(5n+2){--c1:#7cc4ff;--c2:#5fd8b4}
.rf-card:nth-child(5n+3){--c1:#ffd24d;--c2:#ff9a6b}
.rf-card:nth-child(5n+4){--c1:#b8a2ff;--c2:#ff8fbf}
.rf-card:nth-child(5n+5){--c1:#86d97a;--c2:#63b4ee}
.rf-card b{display:block;margin-bottom:10px;font-size:var(--t-body);font-weight:600;line-height:1.25}
.rf-card ul{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:7px;font-size:var(--t-small);font-weight:400;line-height:1.5;color:var(--soft)}
.rf-card li{position:relative;padding-left:16px}
.rf-card li:before{content:'';position:absolute;left:1px;top:.62em;width:6px;height:6px;border-radius:50%;background:var(--c2)}
.rf-tablewrap{overflow-x:auto;border-radius:16px;box-shadow:0 0 0 1px rgba(30,35,60,.09)}
.rf-table{width:100%;min-width:640px;border-collapse:collapse;background:#fff;font-size:var(--t-small);font-weight:400;line-height:1.5}
.rf-table th{padding:11px 14px;text-align:left;font-size:var(--t-label);font-weight:600;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--quiet);background:rgba(30,35,60,.04)}
.rf-table td{padding:12px 14px;vertical-align:top;border-top:1px solid rgba(30,35,60,.08);color:var(--soft);transition:background .2s}
.rf-table tbody tr:hover td{background:rgba(30,35,60,.025)}
.rf-table td:first-child{font-weight:600;color:var(--ink)}
.rf-table tr.rf-pick td{background:color-mix(in srgb,var(--ai) 9%,#fff);color:var(--ink);border-top-color:color-mix(in srgb,var(--ai) 30%,transparent)}
.rf-table tr.rf-pick + tr td{border-top-color:color-mix(in srgb,var(--ai) 30%,transparent)}
.rf-table tr.rf-pick td:first-child{box-shadow:inset 4px 0 0 var(--ai);color:var(--ai)}
.rf-table tr.rf-pick:hover td{background:color-mix(in srgb,var(--ai) 13%,#fff)}
.rf-tag{display:inline-block;margin:0 0 0 8px;padding:2px 9px;border-radius:999px;background:var(--ai);color:#fff;font-size:11px;font-weight:600;letter-spacing:.04em;line-height:1.6;vertical-align:1px;white-space:nowrap}
.rf-dots{display:inline-flex;gap:4px;vertical-align:-1px}
.rf-dots i{width:11px;height:11px;border-radius:50%;background:rgba(30,35,60,.12)}
.rf-dots i.f{background:color-mix(in srgb,var(--ai) 55%,#5b5470)}
.rf-pick .rf-dots{gap:7px}
.rf-pick .rf-dots i.f{background:var(--ai);box-shadow:0 0 0 3px color-mix(in srgb,var(--ai) 18%,transparent)}
.rf-meter{display:flex;align-items:center;gap:10px;min-width:130px}
.rf-meter span{flex:1;height:8px;border-radius:99px;background:rgba(30,35,60,.08);overflow:hidden}
.rf-meter span i{display:block;height:100%;width:0;border-radius:inherit;background:linear-gradient(90deg,color-mix(in srgb,var(--ai) 55%,#fff),var(--ai));transition:width 1s cubic-bezier(.2,.9,.25,1) .2s}
.rf-meter.on span i{width:var(--v)}
.rf-meter b{flex:none;min-width:3ch;font-weight:600;color:var(--ink);font-variant-numeric:tabular-nums}
.rf-img{margin:0;display:flex;flex-direction:column;gap:8px}
.rf-img a{display:block;border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 0 0 1px rgba(30,35,60,.08)}
.rf-img img{display:block;width:100%;height:auto;transition:transform .5s cubic-bezier(.2,.9,.25,1)}
.rf-img a:hover img{transform:scale(1.015)}
.rf-img figcaption{font-size:var(--t-small);font-weight:400;color:var(--quiet)}
/* persona: who they are on the left, and tabs for what they need on the right */
.rf-person{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.4fr);border-radius:22px;background:#fff;box-shadow:0 0 0 1px rgba(30,35,60,.07),0 22px 40px -32px rgba(30,35,60,.5);overflow:hidden}
.rf-p-who{position:relative;display:flex;flex-direction:column;gap:14px;padding:clamp(18px,2.2vw,28px);background:linear-gradient(165deg,color-mix(in srgb,var(--ai) 12%,#fff),#fbf7f2)}
.rf-p-top{display:flex;align-items:center;gap:clamp(12px,1.6vw,18px)}
.rf-faces{flex:none;display:flex}
.rf-faces .av{display:block;width:clamp(68px,7.4vw,92px);height:auto;border-radius:50%;box-shadow:0 0 0 4px #fff,0 10px 22px -12px rgba(30,35,60,.5);transition:transform .45s cubic-bezier(.3,1.6,.5,1)}
.rf-faces .av + .av{margin-left:-18px}
.rf-person:hover .rf-faces .av{transform:translateY(-3px) rotate(-5deg)}
.rf-person:hover .rf-faces .av + .av{transform:translateY(-3px) rotate(5deg)}
.rf-p-id{display:flex;flex-direction:column;gap:4px;min-width:0}
.rf-p-id b{font-size:var(--t-h3);font-weight:600;letter-spacing:var(--ls-h3);line-height:1.2}
.rf-p-id em{align-self:flex-start;padding:3px 10px;border-radius:9px;background:var(--ai);color:#fff;font-size:12px;font-weight:600;font-style:normal;line-height:1.5}
.rf-p-id span{margin-top:2px;font-size:var(--t-small);font-weight:400;line-height:1.45;color:var(--quiet)}
.rf-bubble{position:relative;margin:4px 0 0;padding:14px 16px;border-radius:16px;background:#fff;font-size:var(--t-body);font-weight:500;line-height:1.35;color:var(--ink);box-shadow:0 10px 24px -18px rgba(30,35,60,.5)}
.rf-bubble:before{content:'';position:absolute;left:30px;top:-7px;width:14px;height:14px;background:#fff;transform:rotate(45deg);border-radius:3px 0 0 0}
.rf-traits{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto}
.rf-traits i{padding:4px 11px;border-radius:999px;background:rgba(255,255,255,.85);box-shadow:0 0 0 1px rgba(30,35,60,.08);font-size:var(--t-label);font-weight:500;font-style:normal;color:var(--soft);transition:transform .2s,background .2s}
.rf-traits i:hover{transform:translateY(-2px);background:#fff}
.rf-p-what{display:flex;flex-direction:column;gap:14px;min-width:0;padding:clamp(18px,2.2vw,28px)}
.rf-tabs{position:relative;display:flex;gap:2px;padding:4px;border-radius:999px;background:rgba(30,35,60,.06);overflow-x:auto;scrollbar-width:none}
.rf-tabs::-webkit-scrollbar{display:none}
.rf-tabs-pill{position:absolute;top:4px;bottom:4px;left:0;width:var(--w,0);transform:translateX(var(--x,0));border-radius:999px;background:#fff;box-shadow:0 2px 8px -3px rgba(30,35,60,.35);transition:transform .45s cubic-bezier(.3,1.35,.5,1),width .45s cubic-bezier(.3,1.35,.5,1);pointer-events:none}
.rf-tab-b{position:relative;z-index:1;flex:none;display:flex;align-items:center;gap:6px;padding:8px 14px;border:0;border-radius:999px;background:none;color:var(--quiet);font:inherit;font-size:var(--t-small);font-weight:600;white-space:nowrap;cursor:pointer;transition:color .2s}
.rf-tab-b:hover{color:var(--ink)}
.rf-tab-b[aria-selected=true]{color:var(--ink)}
.rf-tab-b i{min-width:20px;padding:0 6px;border-radius:99px;background:rgba(30,35,60,.08);font-size:11px;font-style:normal;line-height:18px;text-align:center;transition:background .2s,color .2s}
.rf-tab-b[aria-selected=true] i{background:var(--k);color:#fff}
.rf-tab-b:focus-visible{outline:2px solid var(--ai);outline-offset:1px}
.rf-panel{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px}
.rf-panel li{display:flex;gap:12px;align-items:flex-start;padding:12px 14px;border-radius:14px;background:color-mix(in srgb,var(--k) 7%,#fff);font-size:var(--t-small);font-weight:400;line-height:1.5;color:var(--soft);animation:rf-item .45s cubic-bezier(.2,.9,.25,1) both;animation-delay:calc(var(--i) * 60ms)}
.rf-panel li:before{content:'';flex:none;width:8px;height:8px;margin-top:.5em;border-radius:50%;background:var(--k);box-shadow:0 0 0 4px color-mix(in srgb,var(--k) 18%,transparent)}
@keyframes rf-item{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:none}}
.rf-person[data-one] .rf-tabs{display:none}
@media (max-width:760px){
  .rf-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .rf-modal{width:100vw;max-height:100dvh;height:100dvh;border-radius:0}
  .rf-person{grid-template-columns:1fr}
  .rf-quote{padding-left:56px}
  .rf-quote:before{left:14px;font-size:60px}
}
@media (max-width:440px){.rf-grid{grid-template-columns:1fr}.rf-folder{min-height:112px}}
@media (prefers-reduced-motion:reduce){
  .rf-wrap,.rf-paper,.rf-folder,.rf-card,.rf-stat,.rf-tabs-pill,.rf-x,.rf-faces .av{transition:none}
  .rf-modal[open],.rf-panel li{animation:none}
  mark.rf-hl,.rf-meter span i{transition:none}
}
`

// ==key point== → a highlighted, bold run
function rich(s: string): React.ReactNode {
    if (!s.includes("==")) return s
    return s.split(/==(.+?)==/g).map((x, i) =>
        i % 2 ? (
            <mark className="rf-hl" key={i}>
                {x}
            </mark>
        ) : (
            x
        ),
    )
}

// table cells: "●●○" draws as dots, "83%" as a bar, anything else as text
function cell(c: string): React.ReactNode {
    if (/^[●○]+$/.test(c)) {
        const full = [...c].filter((x) => x === "●").length
        return (
            <span className="rf-dots" role="img" aria-label={`${full} of ${c.length}`}>
                {[...c].map((x, i) => (
                    <i key={i} className={x === "●" ? "f" : undefined} />
                ))}
            </span>
        )
    }
    if (/^\d{1,3}%$/.test(c))
        return (
            <span className="rf-meter" style={{ "--v": c } as React.CSSProperties}>
                <span aria-hidden="true">
                    <i />
                </span>
                <b>{c}</b>
            </span>
        )
    return rich(c)
}

// colour for each kind of persona list
const kind = (t: string) =>
    /pain|frustr|break/i.test(t) ? "#e8607a" : /goal/i.test(t) ? "var(--ai)" : /need/i.test(t) ? "#2ba58a" : /feel/i.test(t) ? "#e79a2f" : /say|think/i.test(t) ? "#4f8fe0" : "#7a7f93"

function PersonaCard({ p }: { p: Persona }) {
    const groups = (
        [
            ["Family background", p.background],
            ["Pain points", p.pain],
            ["Goals", p.goals],
            ["Needs", p.needs],
            ...(p.columns ?? []).map((c) => [c.t, c.items] as const),
        ] as (readonly [string, string[] | undefined])[]
    ).filter((g): g is readonly [string, string[]] => !!g[1]?.length)
    const [tab, setTab] = React.useState(0)
    const id = React.useId()
    const bar = React.useRef<HTMLDivElement | null>(null)
    const btns = React.useRef<(HTMLButtonElement | null)[]>([])

    // the white pill glides to the chosen tab
    React.useLayoutEffect(() => {
        const place = () => {
            const b = btns.current[tab]
            if (!b || !bar.current) return
            bar.current.style.setProperty("--x", b.offsetLeft + "px")
            bar.current.style.setProperty("--w", b.offsetWidth + "px")
        }
        place()
        window.addEventListener("resize", place)
        return () => window.removeEventListener("resize", place)
    }, [tab])

    // the first tab's highlights wait to scroll into view; a tab opened later sweeps its own in
    const panel = React.useRef<HTMLUListElement | null>(null)
    const first = React.useRef(true)
    React.useEffect(() => {
        if (first.current) {
            first.current = false
            return
        }
        const marks = panel.current?.querySelectorAll<HTMLElement>("mark.rf-hl") ?? []
        const raf = requestAnimationFrame(() =>
            marks.forEach((m, i) => {
                m.style.setProperty("--hd", 0.45 + i * 0.3 + "s")
                m.classList.add("on")
            }),
        )
        return () => cancelAnimationFrame(raf)
    }, [tab])

    const pick = (i: number, focus?: boolean) => {
        setTab(i)
        const b = btns.current[i]
        if (focus) b?.focus()
        b?.scrollIntoView({ block: "nearest", inline: "nearest" })
    }
    const faces = p.face ? ([] as Face[]).concat(p.face) : []
    const g = groups[tab]
    return (
        <article className="rf-person" data-one={groups.length < 2 ? "" : undefined}>
            <div className="rf-p-who">
                <div className="rf-p-top">
                    {faces.length ? (
                        <span className="rf-faces">
                            {faces.map((f, i) => (
                                <Avatar key={i} face={f} size={92} />
                            ))}
                        </span>
                    ) : null}
                    <div className="rf-p-id">
                        <b>{p.name}</b>
                        <em>{p.role}</em>
                        {p.meta ? <span>{p.meta}</span> : null}
                    </div>
                </div>
                {p.quote ? <blockquote className="rf-bubble">{rich(p.quote)}</blockquote> : null}
                {p.traits?.length ? (
                    <div className="rf-traits">
                        {p.traits.map((t) => (
                            <i key={t}>{t}</i>
                        ))}
                    </div>
                ) : null}
            </div>
            {g ? (
                <div className="rf-p-what">
                    <div
                        className="rf-tabs"
                        role="tablist"
                        aria-label={`About ${p.name}`}
                        ref={bar}
                        onKeyDown={(e) => {
                            const n = groups.length
                            const to = e.key === "ArrowRight" ? (tab + 1) % n : e.key === "ArrowLeft" ? (tab - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1
                            if (to < 0) return
                            e.preventDefault()
                            e.stopPropagation() // arrows here move between tabs, not folders
                            pick(to, true)
                        }}
                    >
                        <span className="rf-tabs-pill" aria-hidden="true" />
                        {groups.map(([t, items], i) => (
                            <button
                                key={t}
                                type="button"
                                role="tab"
                                className="rf-tab-b"
                                id={`${id}-t${i}`}
                                aria-selected={i === tab}
                                aria-controls={`${id}-p`}
                                tabIndex={i === tab ? 0 : -1}
                                ref={(el) => {
                                    btns.current[i] = el
                                }}
                                style={{ "--k": kind(t) } as React.CSSProperties}
                                onClick={() => pick(i)}
                            >
                                {t}
                                <i>{items.length}</i>
                            </button>
                        ))}
                    </div>
                    <ul ref={panel} className="rf-panel" role="tabpanel" id={`${id}-p`} aria-labelledby={`${id}-t${tab}`} key={tab} style={{ "--k": kind(g[0]) } as React.CSSProperties}>
                        {g[1].map((x, i) => (
                            <li key={x} style={{ "--i": i } as React.CSSProperties}>
                                <span>{rich(x)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </article>
    )
}

function Blocks({ blocks }: { blocks: Block[] }) {
    return (
        <>
            {blocks.map((b, i) => (
                <React.Fragment key={i}>
                    {b.h ? <h4 className="rf-rv">{b.h}</h4> : null}
                    {b.p ? <p className="rf-p rf-rv">{rich(b.p)}</p> : null}
                    {b.quote ? <p className="rf-quote rf-rv">{rich(b.quote)}</p> : null}
                    {b.stats ? (
                        <div className="rf-stats rf-rv">
                            {b.stats.map((s) => (
                                <div className="rf-stat" key={s.l}>
                                    <b data-n={s.n}>{s.n}</b>
                                    <span>{rich(s.l)}</span>
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {b.cards ? (
                        <div className="rf-cards rf-rv">
                            {b.cards.map((c, n) => (
                                <div className="rf-card" key={c.t} style={{ "--i": n } as React.CSSProperties}>
                                    <b>{c.t}</b>
                                    <ul>
                                        {c.items.map((x) => (
                                            <li key={x}>{rich(x)}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {b.table ? (
                        <div className="rf-tablewrap rf-rv" tabIndex={0} role="region" aria-label="Table">
                            <table className="rf-table">
                                <thead>
                                    <tr>
                                        {b.table.head.map((h) => (
                                            <th key={h} scope="col">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {b.table.rows.map((r, k) => (
                                        <tr key={r[0]} className={k === b.table!.hl ? "rf-pick" : undefined}>
                                            {r.map((c, n) => (
                                                <td key={n}>
                                                    {cell(c)}
                                                    {n === 0 && k === b.table!.hl && b.table!.tag ? <span className="rf-tag">{b.table!.tag}</span> : null}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : null}
                    {b.image ? (
                        <figure className="rf-img rf-rv">
                            <a href={b.image.src} target="_blank" rel="noreferrer">
                                <img src={b.image.src} alt={b.image.alt} loading="lazy" decoding="async" />
                            </a>
                            {b.image.caption ? <figcaption>{b.image.caption}</figcaption> : null}
                        </figure>
                    ) : null}
                    {b.persona ? (
                        <div className="rf-rv">
                            <PersonaCard p={b.persona} />
                        </div>
                    ) : null}
                    {b.note ? <p className="rf-note rf-rv">{rich(b.note)}</p> : null}
                </React.Fragment>
            ))}
        </>
    )
}

// counts a stat such as "46", "~30%" or "1,196" up from zero
function countUp(el: HTMLElement) {
    const s = el.dataset.n || ""
    const m = s.match(/^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/)
    if (!m) return
    const [, pre, num, post] = m
    const end = parseFloat(num.replace(/,/g, ""))
    const dec = (num.split(".")[1] || "").length
    const comma = num.includes(",")
    const t0 = performance.now()
    const dur = 900
    const fmt = (v: number) => {
        const x = v.toFixed(dec)
        return comma ? Number(x).toLocaleString("en-US", { minimumFractionDigits: dec }) : x
    }
    const step = (t: number) => {
        const k = Math.min(1, (t - t0) / dur)
        const e = 1 - Math.pow(1 - k, 3)
        el.textContent = pre + fmt(end * e) + post
        if (k < 1) requestAnimationFrame(step)
        else el.textContent = s
    }
    requestAnimationFrame(step)
}

export default function ResearchFolders({ folders }: { folders: Folder[] }) {
    const dialog = React.useRef<HTMLDialogElement | null>(null)
    const body = React.useRef<HTMLDivElement | null>(null)
    const [open, setOpen] = React.useState<number | null>(null)

    React.useEffect(() => {
        const d = dialog.current
        if (!d || open === null) return
        if (!d.open) d.showModal() // native dialog: keeps focus inside, Esc closes, focus returns to the folder
        if (body.current) {
            body.current.scrollTop = 0
            body.current.focus({ preventScroll: true }) // arrow keys scroll straight away; otherwise Safari rings the close button
        }
        const html = document.documentElement
        const before = html.style.overflow
        html.style.overflow = "hidden"
        return () => {
            html.style.overflow = before
        }
    }, [open])

    // as content scrolls into view: blocks rise in, numbers count up, bars fill, and highlights sweep in one after another
    React.useLayoutEffect(() => {
        const root = body.current
        if (!root || open === null) return
        const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const marks = root.querySelectorAll<HTMLElement>("mark.rf-hl, .rf-meter")
        if (still || !("IntersectionObserver" in window)) {
            marks.forEach((m) => m.classList.add("on"))
            return
        }
        root.classList.add("rf-go")
        const io = new IntersectionObserver(
            (entries) => {
                let rv = 0
                let hl = 0
                for (const e of entries) {
                    if (!e.isIntersecting) continue
                    const el = e.target as HTMLElement
                    io.unobserve(el)
                    if (el.classList.contains("rf-rv")) {
                        el.style.setProperty("--d", Math.min(rv++, 5) * 0.07 + "s")
                        el.classList.add("in")
                        el.querySelectorAll<HTMLElement>("[data-n]").forEach((n) => setTimeout(() => countUp(n), 150))
                    } else {
                        el.style.setProperty("--hd", 0.6 + Math.min(hl++, 6) * 0.35 + "s")
                        el.classList.add("on")
                    }
                }
            },
            { root, threshold: 0.15 },
        )
        root.querySelectorAll(".rf-rv").forEach((el) => io.observe(el))
        marks.forEach((el) => io.observe(el))
        return () => {
            io.disconnect()
            root.classList.remove("rf-go")
        }
    }, [open])

    // closed with the mouse (the X or the backdrop): the folder lets go of focus, so it drops back into place
    const byPointer = React.useRef(false)
    const close = () => {
        byPointer.current = true
        dialog.current?.close()
    }
    const f = open === null ? null : folders[open]
    const go = (d: number) => setOpen((i) => (i === null ? i : Math.min(folders.length - 1, Math.max(0, i + d))))
    const prev = open !== null && open > 0 ? folders[open - 1] : null
    const next = open !== null && open < folders.length - 1 ? folders[open + 1] : null

    return (
        <div>
            <style>{CSS}</style>
            <div className="rf-grid">
                {folders.map((x, i) => (
                    <div className="rf-wrap" key={x.title}>
                        <span className="rf-paper" aria-hidden="true" />
                        <span className="rf-tab" aria-hidden="true" />
                        <button type="button" className="rf-folder" aria-haspopup="dialog" onClick={() => setOpen(i)}>
                            <span className="rf-title">{x.title}</span>
                            <span className="rf-hint">{x.hint}</span>
                        </button>
                    </div>
                ))}
            </div>
            <dialog
                className="rf-modal"
                ref={dialog}
                aria-labelledby="rf-title"
                onClose={() => {
                    if (dialog.current?.open) return // a quick click on the next folder may have reopened it already
                    setOpen(null)
                    if (byPointer.current) (document.activeElement as HTMLElement | null)?.blur?.()
                    byPointer.current = false
                }}
                onClick={(e) => {
                    if (e.target === dialog.current) close() // a click on the backdrop lands on the dialog itself
                }}
                onKeyDown={(e) => {
                    if ((e.target as HTMLElement).closest(".rf-tablewrap")) return // left and right scroll wide tables
                    if (e.key === "ArrowRight") go(1)
                    if (e.key === "ArrowLeft") go(-1)
                }}
            >
                {f ? (
                    <>
                        <header className="rf-head">
                            <h3 id="rf-title">{f.title}</h3>
                            <button type="button" className="rf-x" aria-label="Close" onClick={close}>
                                ✕
                            </button>
                        </header>
                        <div className="rf-body" ref={body} tabIndex={0}>
                            <Blocks key={open} blocks={f.blocks} />
                        </div>
                        <footer className="rf-foot">
                            {prev ? (
                                <button type="button" className="rf-step" onClick={() => go(-1)}>
                                    <small>← Previous</small>
                                    <b>{prev.title}</b>
                                </button>
                            ) : null}
                            {next ? (
                                <button type="button" className="rf-step next" onClick={() => go(1)}>
                                    <small>Next →</small>
                                    <b>{next.title}</b>
                                </button>
                            ) : null}
                        </footer>
                    </>
                ) : null}
            </dialog>
        </div>
    )
}
