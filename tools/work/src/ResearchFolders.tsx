// Research: a row of folders. Each opens a scrollable modal with the data behind it.
// A folder's content is a list of blocks; see the Block type for what each one draws.
import * as React from "react"

type Persona = { name: string; role: string; meta: string; quote: string; traits: string[]; background: string[]; pain: string[]; goals: string[]; needs: string[] }
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
.rf-folder{position:relative;display:flex;flex-direction:column;justify-content:flex-end;width:100%;height:100%;min-height:clamp(150px,14vw,196px);padding:clamp(16px,1.8vw,24px);border:0;border-radius:4px 18px 18px 18px;background:linear-gradient(160deg,#ffe3a0,#f8cf74);color:#3b2f12;font:inherit;text-align:left;cursor:pointer;box-shadow:0 22px 34px -24px rgba(90,60,10,.65),inset 0 1px 0 rgba(255,255,255,.6);transition:transform .3s cubic-bezier(.2,.9,.25,1),box-shadow .3s}
.rf-folder:before{content:'';position:absolute;left:0;top:-13px;width:38%;height:14px;border-radius:9px 12px 0 0;background:#f4c766}
.rf-folder:after{content:'';position:absolute;left:12px;right:12px;top:-6px;height:16px;border-radius:6px 6px 0 0;background:#fffdf6;box-shadow:0 1px 2px rgba(0,0,0,.14);transform:translateY(8px);transition:transform .3s cubic-bezier(.2,.9,.25,1);z-index:-1}
.rf-folder:hover{transform:translateY(-4px);box-shadow:0 30px 42px -24px rgba(90,60,10,.7),inset 0 1px 0 rgba(255,255,255,.6)}
.rf-folder:hover:after{transform:translateY(-3px)}
.rf-folder:focus-visible{outline:3px solid var(--ai);outline-offset:3px}
.rf-wrap{position:relative;isolation:isolate}
.rf-title{display:block;font-size:clamp(18px,1.7vw,23px);font-weight:600;letter-spacing:-.015em;line-height:1.16}
.rf-hint{display:block;margin-top:6px;font-size:13.5px;line-height:1.3;color:#6b5722}
.rf-modal{width:min(1040px,94vw);max-width:none;max-height:88vh;padding:0;border:0;border-radius:24px;background:#fbfaf7;color:var(--ink);box-shadow:0 40px 90px -20px rgba(20,20,60,.6);overflow:hidden}
.rf-modal[open]{display:flex;flex-direction:column;animation:rf-in .28s cubic-bezier(.2,.9,.25,1)}
.rf-modal::backdrop{background:rgba(25,25,55,.5);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
@keyframes rf-in{from{opacity:0;transform:translateY(14px) scale(.985)}to{opacity:1;transform:none}}
.rf-head{flex:none;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px clamp(18px,3vw,32px);border-bottom:1px solid rgba(30,35,60,.1)}
.rf-head h3{margin:0;font-size:clamp(20px,2.1vw,27px);font-weight:600;letter-spacing:-.02em;line-height:1.15}
.rf-x{flex:none;width:40px;height:40px;border:0;border-radius:50%;background:rgba(30,35,60,.08);color:var(--ink);font-size:19px;line-height:1;cursor:pointer}
.rf-x:hover{background:rgba(30,35,60,.15)}
.rf-body{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:clamp(18px,3vw,32px);display:flex;flex-direction:column;gap:18px}
.rf-body h4{margin:12px 0 -6px;font-size:13px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--ai)}
.rf-body > h4:first-child{margin-top:0}
.rf-p{margin:0;font-size:16.5px;line-height:1.5;color:var(--soft)}
.rf-quote{margin:0;padding:18px 22px;border-radius:16px;background:#fdecef;font-size:clamp(18px,1.9vw,23px);font-weight:600;letter-spacing:-.015em;line-height:1.26}
.rf-note{margin:0;padding:12px 16px;border-radius:12px;background:rgba(30,35,60,.06);font-size:13.5px;line-height:1.45;color:var(--soft)}
.rf-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}
.rf-stats div{padding:16px;border-radius:14px;background:#fff;box-shadow:0 0 0 1px rgba(30,35,60,.07)}
.rf-stats b{display:block;font-size:clamp(24px,2.6vw,33px);font-weight:700;letter-spacing:-.02em;line-height:1.05;color:var(--ai)}
.rf-stats span{display:block;margin-top:6px;font-size:13px;line-height:1.3;color:var(--soft)}
.rf-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px}
.rf-card{padding:16px 18px;border-radius:14px;background:#fff;box-shadow:0 0 0 1px rgba(30,35,60,.07)}
.rf-card b{display:block;margin-bottom:8px;font-size:15.5px;font-weight:600;line-height:1.25}
.rf-card ul,.rf-p-col ul{margin:0;padding:0 0 0 17px;display:flex;flex-direction:column;gap:5px;font-size:14.5px;line-height:1.38;color:var(--soft)}
.rf-tablewrap{overflow-x:auto;border-radius:14px;box-shadow:0 0 0 1px rgba(30,35,60,.09)}
.rf-table{width:100%;min-width:640px;border-collapse:collapse;background:#fff;font-size:14.5px;line-height:1.38}
.rf-table th{padding:11px 14px;text-align:left;font-size:11.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--quiet);background:rgba(30,35,60,.04)}
.rf-table td{padding:12px 14px;vertical-align:top;border-top:1px solid rgba(30,35,60,.08);color:var(--soft)}
.rf-table td:first-child{font-weight:600;color:var(--ink)}
.rf-img{margin:0;display:flex;flex-direction:column;gap:8px}
.rf-img a{display:block;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 0 0 1px rgba(30,35,60,.08)}
.rf-img img{display:block;width:100%;height:auto}
.rf-img figcaption{font-size:13.5px;color:var(--quiet)}
.rf-person{padding:clamp(16px,2vw,24px);border-radius:18px;background:#fff;box-shadow:0 0 0 1px rgba(30,35,60,.07);display:flex;flex-direction:column;gap:14px}
.rf-person > b{font-size:clamp(21px,2.1vw,27px);font-weight:600;letter-spacing:-.02em;line-height:1.1}
.rf-person > b small{display:block;margin-top:4px;font-size:14px;font-weight:500;letter-spacing:0;color:var(--ai)}
.rf-person > span{font-size:14px;color:var(--quiet)}
.rf-person blockquote{margin:0;padding-left:14px;border-left:3px solid var(--a);font-size:17px;font-weight:500;line-height:1.3}
.rf-traits{display:flex;flex-wrap:wrap;gap:6px}
.rf-traits i{padding:4px 11px;border-radius:999px;background:rgba(30,35,60,.06);font-size:12.5px;font-style:normal;color:var(--soft)}
.rf-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:16px}
.rf-p-col p{margin:0 0 7px;font-size:11.5px;font-weight:600;letter-spacing:.11em;text-transform:uppercase;color:var(--quiet)}
@media (max-width:760px){
  .rf-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .rf-modal{width:100vw;max-height:100dvh;height:100dvh;border-radius:0}
}
@media (max-width:440px){.rf-grid{grid-template-columns:1fr}.rf-folder{min-height:112px}}
@media (prefers-reduced-motion:reduce){.rf-folder,.rf-folder:after{transition:none}.rf-modal[open]{animation:none}}
`

function PersonaCard({ p }: { p: Persona }) {
    const col = (t: string, items: string[]) => (
        <div className="rf-p-col">
            <p>{t}</p>
            <ul>
                {items.map((x) => (
                    <li key={x}>{x}</li>
                ))}
            </ul>
        </div>
    )
    return (
        <article className="rf-person">
            <b>
                {p.name}
                <small>{p.role}</small>
            </b>
            <span>{p.meta}</span>
            <blockquote>{p.quote}</blockquote>
            <div className="rf-traits">
                {p.traits.map((t) => (
                    <i key={t}>{t}</i>
                ))}
            </div>
            <div className="rf-cols">
                {col("Family background", p.background)}
                {col("Pain points", p.pain)}
                {col("Goals", p.goals)}
                {col("Needs", p.needs)}
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
        if (body.current) body.current.scrollTop = 0
        const html = document.documentElement
        const before = html.style.overflow
        html.style.overflow = "hidden"
        return () => {
            html.style.overflow = before
        }
    }, [open])

    const close = () => dialog.current?.close()
    const f = open === null ? null : folders[open]

    return (
        <div>
            <style>{CSS}</style>
            <div className="rf-grid">
                {folders.map((x, i) => (
                    <div className="rf-wrap" key={x.title}>
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
                onClose={() => setOpen(null)}
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
