// Research: a row of folders. Each opens a scrollable modal with the data behind it.
// A folder's content is a list of blocks; see the Block type for what each one draws.
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
    table?: { head: string[]; rows: string[][] }
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
.rf-head h3{margin:0;font-size:var(--t-h2);font-weight:600;letter-spacing:var(--ls-h2);line-height:1.15}
.rf-x{flex:none;width:40px;height:40px;border:0;border-radius:50%;background:rgba(30,35,60,.08);color:var(--ink);font-size:19px;line-height:1;cursor:pointer}
.rf-x:hover{background:rgba(30,35,60,.15)}
.rf-body{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:clamp(18px,3vw,32px);display:flex;flex-direction:column;gap:18px}
.rf-body:focus{outline:none}
.rf-body > *{flex-shrink:0}
.rf-body h4{margin:12px 0 -6px;font-size:var(--t-label);font-weight:600;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--ai)}
.rf-body > h4:first-child{margin-top:0}
.rf-p{margin:0;font-size:var(--t-body);font-weight:400;line-height:1.5;color:var(--soft)}
.rf-quote{margin:0;padding:18px 22px;border-radius:16px;background:#fdecef;font-size:var(--t-h3);font-weight:600;letter-spacing:var(--ls-h3);line-height:1.25}
.rf-note{margin:0;padding:12px 16px;border-radius:12px;background:rgba(30,35,60,.06);font-size:var(--t-small);font-weight:400;line-height:1.5;color:var(--soft)}
.rf-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}
.rf-stats div{padding:16px;border-radius:14px;background:#fff;box-shadow:0 0 0 1px rgba(30,35,60,.07)}
.rf-stats b{display:block;font-size:var(--t-h2);font-weight:600;letter-spacing:var(--ls-h2);line-height:1.15;color:var(--ai)}
.rf-stats span{display:block;margin-top:6px;font-size:var(--t-small);font-weight:400;line-height:1.5;color:var(--soft)}
.rf-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px}
.rf-card{padding:16px 18px;border-radius:14px;background:#fff;box-shadow:0 0 0 1px rgba(30,35,60,.07)}
.rf-card b{display:block;margin-bottom:8px;font-size:var(--t-body);font-weight:600;line-height:1.25}
.rf-card ul,.rf-p-col ul{margin:0;padding:0 0 0 17px;display:flex;flex-direction:column;gap:5px;font-size:var(--t-small);font-weight:400;line-height:1.5;color:var(--soft)}
.rf-tablewrap{overflow-x:auto;border-radius:14px;box-shadow:0 0 0 1px rgba(30,35,60,.09)}
.rf-table{width:100%;min-width:640px;border-collapse:collapse;background:#fff;font-size:var(--t-small);font-weight:400;line-height:1.5}
.rf-table th{padding:11px 14px;text-align:left;font-size:var(--t-label);font-weight:600;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--quiet);background:rgba(30,35,60,.04)}
.rf-table td{padding:12px 14px;vertical-align:top;border-top:1px solid rgba(30,35,60,.08);color:var(--soft)}
.rf-table td:first-child{font-weight:600;color:var(--ink)}
.rf-img{margin:0;display:flex;flex-direction:column;gap:8px}
.rf-img a{display:block;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 0 0 1px rgba(30,35,60,.08)}
.rf-img img{display:block;width:100%;height:auto}
.rf-img figcaption{font-size:var(--t-small);font-weight:400;color:var(--quiet)}
.rf-person{padding:clamp(16px,2vw,24px);border-radius:18px;background:#fff;box-shadow:0 0 0 1px rgba(30,35,60,.07);display:flex;flex-direction:column;gap:14px}
.rf-p-top{display:flex;align-items:center;gap:clamp(14px,1.8vw,20px)}
.rf-faces{flex:none;display:flex}
.rf-faces .av{display:block;width:clamp(64px,7vw,84px);height:auto;border-radius:50%;box-shadow:0 0 0 3px #fff,0 8px 18px -10px rgba(30,35,60,.45)}
.rf-faces .av + .av{margin-left:-16px}
.rf-p-id{display:flex;flex-direction:column;gap:6px;min-width:0}
.rf-p-id b{font-size:var(--t-h3);font-weight:600;letter-spacing:var(--ls-h3);line-height:1.25}
.rf-p-id b small{display:block;margin-top:4px;font-size:var(--t-small);font-weight:500;color:var(--ai)}
.rf-p-id span{font-size:var(--t-small);font-weight:400;line-height:1.5;color:var(--quiet)}
.rf-person blockquote{margin:0;padding-left:14px;border-left:3px solid var(--a);font-size:var(--t-body);font-weight:500;line-height:1.3}
.rf-traits{display:flex;flex-wrap:wrap;gap:6px}
.rf-traits i{padding:4px 11px;border-radius:999px;background:rgba(30,35,60,.06);font-size:var(--t-label);font-weight:500;font-style:normal;color:var(--soft)}
.rf-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:16px}
.rf-p-col p{margin:0 0 7px;font-size:var(--t-label);font-weight:600;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--quiet)}
@media (max-width:760px){
  .rf-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .rf-modal{width:100vw;max-height:100dvh;height:100dvh;border-radius:0}
}
@media (max-width:440px){.rf-grid{grid-template-columns:1fr}.rf-folder{min-height:112px}}
@media (prefers-reduced-motion:reduce){.rf-wrap,.rf-paper,.rf-folder{transition:none}.rf-modal[open]{animation:none}}
`

function PersonaCard({ p }: { p: Persona }) {
    const col = (t: string, items?: string[]) =>
        items?.length ? (
            <div className="rf-p-col" key={t}>
                <p>{t}</p>
                <ul>
                    {items.map((x) => (
                        <li key={x}>{x}</li>
                    ))}
                </ul>
            </div>
        ) : null
    const faces = p.face ? ([] as Face[]).concat(p.face) : []
    return (
        <article className="rf-person">
            <div className="rf-p-top">
                {faces.length ? (
                    <span className="rf-faces">
                        {faces.map((f, i) => (
                            <Avatar key={i} face={f} size={84} />
                        ))}
                    </span>
                ) : null}
                <div className="rf-p-id">
                    <b>
                        {p.name}
                        <small>{p.role}</small>
                    </b>
                    {p.meta ? <span>{p.meta}</span> : null}
                </div>
            </div>
            {p.quote ? <blockquote>{p.quote}</blockquote> : null}
            {p.traits?.length ? (
                <div className="rf-traits">
                    {p.traits.map((t) => (
                        <i key={t}>{t}</i>
                    ))}
                </div>
            ) : null}
            <div className="rf-cols">
                {col("Family background", p.background)}
                {col("Pain points", p.pain)}
                {col("Goals", p.goals)}
                {col("Needs", p.needs)}
                {p.columns?.map((c) => col(c.t, c.items))}
            </div>
        </article>
    )
}

function Blocks({ blocks }: { blocks: Block[] }) {
    return (
        <>
            {blocks.map((b, i) => (
                <React.Fragment key={i}>
                    {b.h ? <h4>{b.h}</h4> : null}
                    {b.p ? <p className="rf-p">{b.p}</p> : null}
                    {b.quote ? <p className="rf-quote">{b.quote}</p> : null}
                    {b.stats ? (
                        <div className="rf-stats">
                            {b.stats.map((s) => (
                                <div key={s.l}>
                                    <b>{s.n}</b>
                                    <span>{s.l}</span>
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {b.cards ? (
                        <div className="rf-cards">
                            {b.cards.map((c) => (
                                <div className="rf-card" key={c.t}>
                                    <b>{c.t}</b>
                                    <ul>
                                        {c.items.map((x) => (
                                            <li key={x}>{x}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {b.table ? (
                        <div className="rf-tablewrap" tabIndex={0} role="region" aria-label="Table">
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
                                    {b.table.rows.map((r) => (
                                        <tr key={r[0]}>
                                            {r.map((c, n) => (
                                                <td key={n}>{c}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : null}
                    {b.image ? (
                        <figure className="rf-img">
                            <a href={b.image.src} target="_blank" rel="noreferrer">
                                <img src={b.image.src} alt={b.image.alt} loading="lazy" decoding="async" />
                            </a>
                            {b.image.caption ? <figcaption>{b.image.caption}</figcaption> : null}
                        </figure>
                    ) : null}
                    {b.persona ? <PersonaCard p={b.persona} /> : null}
                    {b.note ? <p className="rf-note">{b.note}</p> : null}
                </React.Fragment>
            ))}
        </>
    )
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

    // closed with the mouse (the X or the backdrop): the folder lets go of focus, so it drops back into place
    const byPointer = React.useRef(false)
    const close = () => {
        byPointer.current = true
        dialog.current?.close()
    }
    const f = open === null ? null : folders[open]

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
                            <Blocks blocks={f.blocks} />
                        </div>
                    </>
                ) : null}
            </dialog>
        </div>
    )
}
