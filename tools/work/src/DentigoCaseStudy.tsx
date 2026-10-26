import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

/**
 * Dentigo · Case study (same glass shell and same contents list as the Lumi and 3TFlow case studies)
 * Sidebar contents: Overview · 01 Context · 02 Problem · 03 Research · 04 Ecosystem · 05 Strategy · 06 Solution ·
 *   07 Evaluation · 08 Reflection · Next project.
 * What lives where:
 *   Context = understanding the ecosystem (system map, participants, handoffs) · Problem · Research = evidence → insight → opportunity ·
 *   Ecosystem = the users (dentist and lab perspectives) · Strategy = opportunity + prioritisation, then information architecture and flows ·
 *   Solution = the core experience (sticky screens), then the design details · Evaluation = proposed / prototyped / tested / unvalidated ·
 *   Reflection = what I learned.
 * Order: top bar → CaseStudyVideoHero → Overview → … → Next project. The video hero sits outside every contents target.
 * Everything is placeholder text ("[...]" shows with a dashed underline) plus labelled image and video slots.
 * Clear a field to hide that element. Hide a contents section with "Contents · Hide sections", e.g.  ecosystem, evaluation
 * Parts of Strategy (opportunity, flows) and Solution (experience, details) can be hidden on their own.
 * Sources and status badges are explicit: label every issue and finding as secondary research, user-reported or assumption,
 * and every screen as proposed, prototyped or tested. Nothing is invented for you.
 * Brand: green #366D49 · pink #F1D3C9 · blue #476A8A · dark #24292F · light #F6F8FA, layered on the portfolio's glass.
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 11000
 */

const rich = (t: string): React.ReactNode[] =>
    t.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((p, i) => {
        if (/^\*\*[^*]+\*\*$/.test(p)) return <strong key={i}>{p.slice(2, -2)}</strong>
        if (/^\*[^*]+\*$/.test(p)) return <em key={i}>{p.slice(1, -1)}</em>
        return p
    })
const ph = (t: string) => (String(t || "").trim().startsWith("[") ? " pc-ph" : "")
const has = (t: any) => !!t && !!String(t).trim()
const lines = (t: any): string[] => String(t || "").split(/\n+/).map((s) => s.trim()).filter(Boolean)

const Tx = ({ t, as = "p", className = "" }: any) => {
    if (!has(t)) return null
    const Tag: any = as
    return <Tag className={className + ph(String(t))}>{rich(String(t))}</Tag>
}
const Paras = ({ t }: any) =>
    !has(t) ? null : (
        <div className="pc-p">
            {lines(t).map((p, i) => <p key={i} className={ph(p).trim()}>{rich(p)}</p>)}
        </div>
    )
const Lines = ({ t }: any) =>
    !has(t) ? null : (
        <ul className="pc-list">
            {lines(t).map((p, i) => <li key={i} className={ph(p).trim()}>{rich(p)}</li>)}
        </ul>
    )
const Row = ({ k, t }: any) =>
    !has(t) ? null : (
        <div className="pc-row"><small>{k}</small><Paras t={t} /></div>
    )
const Img = ({ src, label }: any) =>
    src && src.src ? (
        <img src={src.src} srcSet={src.srcSet} alt={src.alt || label} loading="lazy" />
    ) : (
        <div className="pc-phbox"><b>Image placeholder</b><small>{label}</small></div>
    )
/* source / status badge: "Not labelled yet" and "Not set" show as an unfinished marker */
const Badge = ({ t }: { t: string }) => {
    const unset = !t || /^not (labelled|set)/i.test(t)
    return <span className={"pc-src" + (unset ? " pc-ph" : " set")}>{unset ? "Label needed" : t}</span>
}

/* ---------- CaseStudyVideoHero: reusable 16:9 hero, never fabricates footage ---------- */
function CaseStudyVideoHero(p: { src?: string; poster?: any; title?: string; transcript?: string; name?: string; autoplay?: boolean }) {
    const [ready, setReady] = React.useState(false)
    const [failed, setFailed] = React.useState(false)
    const reduced = typeof window !== "undefined" && !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const auto = !!p.autoplay && !reduced
    const label = p.title || (p.name ? p.name + " video" : "Project video")
    const has_v = !!p.src && !failed
    React.useEffect(() => { setReady(false); setFailed(false) }, [p.src])
    return (
        <div className="pc-card pc-vh" role="group" aria-label={label} aria-busy={has_v && !ready}>
            <div className="pc-vhf">
                {has_v ? (
                    <video src={p.src} poster={p.poster?.src} controls preload="metadata" playsInline
                        autoPlay={auto} muted={auto} loop={auto} aria-label={label}
                        onLoadedMetadata={() => setReady(true)} onError={() => setFailed(true)} />
                ) : p.poster?.src ? (
                    <img src={p.poster.src} srcSet={p.poster.srcSet} alt={p.poster.alt || ""} />
                ) : (
                    <div className="pc-phbox" role="status">
                        <b>{failed ? "This video couldn’t be loaded." : "Video placeholder"}</b>
                        <small>Supply a recording of the real Dentigo prototype or screens (for example lab discovery → new order → tracking) in “Hero · Video file”. Do not use a static mockup as a stand-in for a working prototype.</small>
                    </div>
                )}
                {has_v && !ready && <div className="pc-load" role="status"><i />Loading video…</div>}
                {has(p.title) && <div className="pc-vt">{p.title}</div>}
            </div>
            {has(p.transcript) && (
                <details className="pc-vtr"><summary>Transcript</summary><Paras t={p.transcript} /></details>
            )}
        </div>
    )
}

/* ---------- tab helper (tabs live inside a section; the sidebar stays a table of contents) ---------- */
function useTabs(n: number) {
    const [i, setI] = React.useState(0)
    const onKey = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowRight") setI((i + 1) % n)
        if (e.key === "ArrowLeft") setI((i - 1 + n) % n)
    }
    return { i: Math.min(i, Math.max(n - 1, 0)), setI, onKey }
}

/* ---------- user perspectives: dentist and lab ---------- */
function Perspectives({ items }: { items: any[] }) {
    const { i, setI, onKey } = useTabs(items.length)
    const cur = items[i]
    if (!cur) return null
    return (
        <div className="pc-glass" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div className="pc-tabs" role="tablist" aria-label="User perspectives" onKeyDown={onKey}>
                {items.map((r, n) => (
                    <button key={n} type="button" role="tab" id={"pc-us-t" + n} aria-selected={n === i} aria-controls="pc-us-p"
                        tabIndex={n === i ? 0 : -1} className={"pc-tab" + (n === i ? " on" : "")} onClick={() => setI(n)}>
                        {r.name}
                    </button>
                ))}
            </div>
            <div id="pc-us-p" role="tabpanel" aria-labelledby={"pc-us-t" + i} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div className="pc-panel">
                    <div>
                        <Tx t={cur.summary} className="pc-lead" />
                        <div style={{ marginTop: 18 }}><small className="pc-k">What they need</small><Lines t={cur.needs} /></div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                        <div><small className="pc-k">Observed in research</small><Lines t={cur.observed} /></div>
                        <div><small className="pc-k">Persona assumptions</small><Lines t={cur.assumptions} /></div>
                    </div>
                </div>
                <div className="pc-2">
                    <div className="pc-stimg"><Img src={cur.persona} label="Upload this persona" /></div>
                    <div className="pc-stimg"><Img src={cur.empathy} label="Upload this empathy map" /></div>
                </div>
            </div>
        </div>
    )
}

/* ---------- flow explorer: start → end, with diagram and trade-offs ---------- */
function FlowViewer({ items }: { items: any[] }) {
    const { i, setI, onKey } = useTabs(items.length)
    const cur = items[i]
    if (!cur) return null
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="pc-tabs" role="tablist" aria-label="User flows" onKeyDown={onKey}>
                {items.map((w, n) => (
                    <button key={n} type="button" role="tab" id={"pc-fl-t" + n} aria-selected={n === i} aria-controls="pc-fl-p"
                        tabIndex={n === i ? 0 : -1} className={"pc-tab" + (n === i ? " on" : "")} onClick={() => setI(n)}>
                        {w.name}
                    </button>
                ))}
            </div>
            <div id="pc-fl-p" role="tabpanel" aria-labelledby={"pc-fl-t" + i} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div className="pc-flow">
                    <span className={"s" + ph(cur.start)}>{cur.start}</span><i aria-hidden="true">→</i><span className={"s" + ph(cur.end)}>{cur.end}</span>
                </div>
                <div className="pc-panel">
                    <div className="pc-stimg"><Img src={cur.diagram} label="Upload this flow diagram (readable scale, clear start and end)" /></div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <Tx t={cur.summary} className="pc-lead" />
                        <Row k="Trade-offs behind the structure" t={cur.tradeoffs} />
                        <div className="pc-stimg" style={{ aspectRatio: "16/10" }}><Img src={cur.screens} label="Annotated screens for this flow (optional)" /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* ---------- sticky story: the screen stays while the explanation changes ---------- */
function StickyStory({ items, compact, isCanvas }: { items: any[]; compact: boolean; isCanvas: boolean }) {
    const ref = React.useRef<HTMLDivElement>(null)
    const [step, setStep] = React.useState(0)
    React.useEffect(() => {
        if (isCanvas || compact || typeof IntersectionObserver === "undefined") return
        const root = ref.current
        if (!root) return
        const els = Array.from(root.querySelectorAll("[data-step]")) as HTMLElement[]
        const io = new IntersectionObserver(
            (es) => es.forEach((e) => { if (e.isIntersecting) setStep(Number((e.target as HTMLElement).dataset.step)) }),
            { rootMargin: "-45% 0px -45% 0px" }
        )
        els.forEach((el) => io.observe(el))
        return () => io.disconnect()
    }, [isCanvas, compact, items.length])
    const cur = items[Math.min(step, items.length - 1)]
    if (!cur) return null
    return (
        <div className="pc-story" ref={ref}>
            <div className="pc-stage">
                <div className="pc-stagebox"><Img src={cur.image} label={"Upload the screen for “" + (cur.title || "this step") + "”"} /></div>
                <div className="pc-stagecap">{String(step + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} · {cur.title}</div>
            </div>
            <div>
                {items.map((s, i) => (
                    <article className={"pc-sstep" + (step === i ? " on" : "")} data-step={i} key={i}>
                        <Badge t={s.state} />
                        <Tx t={s.title} as="h3" className="pc-sh" />
                        <Row k="User need" t={s.need} />
                        <Row k="Design decision" t={s.decision} />
                        <Lines t={s.notes} />
                        <div className="pc-inl pc-stimg"><Img src={s.image} label={"Upload the screen for “" + (s.title || "this step") + "”"} /></div>
                    </article>
                ))}
            </div>
        </div>
    )
}

/* ---------- text fields: [key, panel title, default, long?] ---------- */
type Field = [string, string, string, boolean?]
const FIELDS: Field[] = [
    ["title", "Sidebar · Title", "Dentigo"],
    ["role", "Sidebar · Role", "UX research · UI/UX design"],
    ["roleNote", "Sidebar · Role note", "academic project"],
    ["timeline", "Sidebar · Timeline", "12 weeks"],
    ["projectType", "Overview · Project type", "Academic UX project"],
    ["domain", "Overview · Domain", "Healthcare · B2B dental services"],
    ["team", "Overview · Team", "[Team, or note solo work]"],
    ["tools", "Overview · Tools", "[Tools]"],
    ["scope", "Overview · Scope", "[Scope: the research, mapping, flows and screens you produced]", true],
    ["status", "Overview · Status", "[Status: concept or prototype, and what has been tested]", true],
    ["backLabel", "Top bar · Back label", "Back to work"],
    ["menuLabel", "Top bar · Menu label", "menu"],
    ["hiddenSections", "Contents · Hide sections", ""],
    ["vhTitle", "Hero · Title overlay", ""],
    ["vhTranscript", "Hero · Transcript", "", true],
    ["ovHeadline", "Overview · Headline", "Connecting dental clinics and laboratories through a clearer workflow.", true],
    ["ovLead", "Overview · Lead", "Dentigo is a B2B platform concept exploring how dental clinics and laboratories can coordinate restoration orders, exchange case information, discover trusted lab partners, and track work through a more connected digital experience.", true],
    ["ovChallenge", "Overview · The challenge", "[The challenge in two or three sentences]", true],
    ["ovNote", "Overview · Status note", "Dentigo is an academic UX project and platform concept, not a launched product. [Add which interface content is sample data.]", true],
    ["ctxHeading", "Context · Heading", "Understanding the ecosystem", true],
    ["ctxIntro", "Context · Intro", "[Intro: why this is a coordination problem across several stakeholders, not only a screen-design problem]", true],
    ["ctxPartLabel", "Context · Participants label", "Who is involved"],
    ["ctxMapLabel", "Context · System map label", "System map"],
    ["ctxMapNote", "Context · System map caption", "[Caption: highlight only the relationships that matter most to the design]", true],
    ["ctxHandoffLabel", "Context · Handoffs label", "Handoffs and failure points"],
    ["probQuote", "Problem · Headline (use *asterisks* to highlight)", "[The problem in one bold line, with a *highlighted phrase*.]", true],
    ["probLabel", "Problem · Statement label", "Problem statement"],
    ["probStatement", "Problem · Statement", "[Problem statement: who struggles, with what, and why it matters.]", true],
    ["issuesLabel", "Problem · Issues label", "Issues the project identified"],
    ["issuesNote", "Problem · Issues note", "[Label each issue by source: secondary research, user-reported, or assumption.]", true],
    ["challengesLabel", "Problem · Challenges label", "Supporting challenges"],
    ["resHeading", "Research · Heading", "[Heading: what the research showed]", true],
    ["resIntro", "Research · Intro", "[How you researched: only methods and participants the artifacts document.]", true],
    ["resMethod", "Research · Method detail", "", true],
    ["findingsLabel", "Research · Findings label", "Evidence → Insight → Design opportunity"],
    ["artifactsLabel", "Research · Artifacts label", "Supporting research artifacts"],
    ["usrHeading", "Ecosystem · Heading", "[Heading: different people, different needs]", true],
    ["usrIntro", "Ecosystem · Intro", "[Intro: how responsibilities differ between clinics and labs. Separate research observations from persona assumptions.]", true],
    ["opHeading", "Strategy · Opportunity heading", "[Heading: from problems to a proposed platform]", true],
    ["opIntro", "Strategy · Opportunity intro", "[Intro: how the opportunity was defined and what was prioritised.]", true],
    ["hmwLabel", "Strategy · How might we label", "How might we"],
    ["prioLabel", "Strategy · Prioritisation label", "What was prioritised, and why"],
    ["deferredLabel", "Strategy · Deferred label", "Deferred or excluded"],
    ["deferred", "Strategy · Deferred ideas", "[Ideas deferred or excluded, and why, one per line]", true],
    ["flHeading", "Strategy · Flows heading", "[Heading: how the experience is organised]", true],
    ["flIntro", "Strategy · Flows intro", "[Intro: the structure and the trade-offs behind it. Verify every step against the real screens.]", true],
    ["flSitemapLabel", "Strategy · Sitemap label", "Sitemap and information architecture"],
    ["exHeading", "Solution · Core experience heading", "[Heading: the core experience]", true],
    ["exIntro", "Solution · Core experience intro", "[Intro: which screens carry the experience, and what each helps a user do.]", true],
    ["dtHeading", "Solution · Details heading", "The details that make the design work", true],
    ["dtIntro", "Solution · Details intro", "[Two or three decisions explained in depth. Use real earlier iterations only if they exist.]", true],
    ["evHeading", "Evaluation · Heading", "What the design proposes, and what has been tested", true],
    ["evProposed", "Evaluation · Proposed", "[What the design proposes, one per line]", true],
    ["evPrototyped", "Evaluation · Prototyped", "[What exists as a working prototype, one per line]", true],
    ["evTested", "Evaluation · Tested", "[What was tested with people, one per line. Leave as is if nothing was.]", true],
    ["evUnvalidated", "Evaluation · Still unvalidated", "[What remains unvalidated, e.g. fit with real clinic and lab workflows, clarity of order information, reduced coordination effort]", true],
    ["evMethod", "Evaluation · Method (only if testing happened)", "", true],
    ["evFindings", "Evaluation · Findings (only if testing happened)", "", true],
    ["evChanged", "Evaluation · What changed (only if testing happened)", "", true],
    ["rfHeading", "Reflection · Heading", "[Heading: what this project taught me]", true],
    ["rfA", "Reflection · Multi-stakeholder B2B ecosystems", "[What you learned about designing for several stakeholders at once]", true],
    ["rfB", "Reflection · Complexity and clarity", "[What you learned about balancing technical complexity with clarity]", true],
    ["rfC", "Reflection · Research to decisions", "[What you learned about connecting research insights to product decisions]", true],
    ["rfNext", "Reflection · What I would do next", "[Next steps, one per line]", true],
    ["nextLabel", "Next · Label", "Next project"],
    ["nextTitle", "Next · Title", "Encora"],
]
const D: Record<string, string> = {}
FIELDS.forEach((f) => (D[f[0]] = f[2]))

/* ---------- list defaults ---------- */
const PARTICIPANTS = ["Dental clinics", "Dentists", "Lab technicians", "Assistants", "Laboratories", "Suppliers", "Delivery coordination"]
const HANDOFFS = [1, 2, 3].map((n) => ({
    between: "[Handoff " + n + ": who → whom]",
    exchange: "[What information is exchanged]",
    failure: "[Where it breaks down]",
}))
const SOURCES = ["Not labelled yet", "Secondary research", "User-reported", "Assumption"]
const ISSUES = [
    "Manual order tracking",
    "Fragmented communication through calls, WhatsApp and email",
    "Incomplete restoration instructions or visual references",
    "Uncertainty about order status and delivery",
    "Difficulty finding and comparing suitable labs",
    "Delays and avoidable remakes",
    "Additional coordination work for clinic staff",
]
const CHALLENGES = [1, 2, 3].map((n) => ({
    title: "[Supporting challenge " + n + "]",
    text: "[What makes it hard, in a sentence or two]",
    source: "Not labelled yet",
}))
const FINDINGS = [1, 2, 3].map((n) => ({
    evidence: "[Evidence " + n + ": what the research showed]",
    insight: "[Insight: what it means]",
    opportunity: "[Design opportunity]",
    source: "Not labelled yet",
}))
const ARTIFACTS = [
    "Stakeholder mapping",
    "Secondary research",
    "Competitive analysis",
    "Affinity mapping",
    "Existing workflow analysis",
].map((t) => ({ title: "[" + t + "]", note: "[What it contributed to the direction]" }))
const PERSPECTIVES = [
    {
        name: "Dentists and clinic staff",
        summary: "[One line on this group's role in the clinic–lab workflow]",
        needs: "Communicate accurate restoration requirements\nFind suitable laboratory partners\nSee active orders and delivery expectations\nCoordinate appointments around case progress\nReview relevant pricing, quotes and prior orders",
        observed: "[Observation from research]\n[Observation from research]",
        assumptions: "[Assumption made in the persona]\n[Assumption made in the persona]",
    },
    {
        name: "Lab technicians and laboratories",
        summary: "[One line on this group's role in the clinic–lab workflow]",
        needs: "Receive complete, understandable case specifications\nAccess reference images and digital files\nCommunicate clarifications and progress updates\nManage concurrent cases and expectations\nReduce rework caused by incomplete or misunderstood instructions",
        observed: "[Observation from research]\n[Observation from research]",
        assumptions: "[Assumption made in the persona]\n[Assumption made in the persona]",
    },
]
const HMW = [1, 2, 3, 4].map((n) => "[How might we … " + n + "]")
const PRIOS = ["Not set", "Must have", "Should have", "Could have", "Won't have"]
const FEATURES = [
    "Centralised order tracking",
    "Lab discovery and comparison",
    "Structured order creation",
    "Unified case communication",
    "Quotation and payment visibility",
    "Digital review or annotation of case information",
].map((f) => ({
    feature: "[" + f + "]",
    priority: "Not set",
    reasoning: "[Why it was prioritised, or deferred. Remove any feature that is not in the project.]",
}))
const FLOWS = [
    "Discover and compare lab partners",
    "Create a restoration order and share complex requirements",
    "Manage or review quotations and payments",
    "Track active and completed orders",
].map((n) => ({
    name: "[" + n + "]",
    start: "[Start state]",
    end: "[End state]",
    summary: "[What the flow lets a user do. Verify the steps against the real screens.]",
    tradeoffs: "[Trade-offs behind this structure]",
}))
const STATES = ["Not set", "Proposed in design", "Prototyped", "Tested"]
const SCREENS = [
    ["Dashboard", "[How it centralises orders, outstanding tasks, updates and key actions, and what it prioritises]"],
    ["Lab discovery and comparison", "[Which information supports the comparison. Mark sample content as sample, never as verified lab data.]"],
    ["Creating a new restoration order", "[How the form structures requirements and supports images and materials]"],
    ["3D model viewer and visual review", "[The intended interaction model. Do not claim it works unless it was built.]"],
    ["Order tracking", "[The real status model: active, pending, completed, past]"],
    ["Quotations and payment", "[How quotes, statuses and payment information are organised, as far as the design supports]"],
].map(([t, d]) => ({
    title: "[" + t + "]",
    state: "Not set",
    need: "[The user need this screen answers]",
    decision: d,
    notes: "[Annotation on a specific interface decision]",
}))
const DETAILS = [1, 2, 3].map((n) => ({
    title: "[Design decision " + n + "]",
    challenge: "[The user or workflow challenge]",
    evidence: "[The evidence or constraint]",
    direction: "[The design direction]",
    rationale: "[Rationale and trade-offs]",
    effect: "[Expected effect. Say \"expected\" unless it was observed in testing.]",
}))

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Mona+Sans:wght@400;500;600;700;800&display=swap');
.pc{--ink:#24292F;--soft:#363D47;--quiet:#5C6B78;--edge:rgba(255,255,255,.65);--glass:linear-gradient(145deg,rgba(255,255,255,.62) 0%,rgba(255,255,255,.34) 55%,rgba(255,255,255,.22) 100%);--lift:inset 0 1.5px 0 rgba(255,255,255,.85),inset 0 -1px 0 rgba(255,255,255,.25),0 18px 36px rgba(60,70,170,.12);display:flex;align-items:flex-start;width:100%;background:radial-gradient(circle at 88% 140px,rgba(255,217,163,.6) 0,rgba(255,217,163,0) 240px),linear-gradient(180deg,#BFD9FF 0%,#EAF3FF 22%,#DAD8FF 55%,#F8E9F2 78%,#F3EEE2 100%);color:var(--ink);font-family:'Mona Sans',Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;line-height:1.5}
.pc *{box-sizing:border-box}
.pc a{color:inherit;text-decoration:none}
.pc a:focus-visible,.pc summary:focus-visible,.pc button:focus-visible{outline:2px solid var(--m);outline-offset:3px;border-radius:8px}
.pc em{font-style:normal;color:var(--ai)}
.pc-ph{opacity:.6;text-decoration:underline dashed rgba(48,55,59,.35);text-underline-offset:6px}
.pc-side{position:sticky;top:0;flex:none;width:232px;height:100vh;max-height:920px;overflow:auto;padding:30px 26px 26px;background:var(--glass);backdrop-filter:blur(18px) saturate(180%);-webkit-backdrop-filter:blur(18px) saturate(180%);border-right:1px solid var(--edge);display:flex;flex-direction:column}
.pc-stitle{font-size:21px;font-weight:700;line-height:1.02;letter-spacing:-.02em;margin:14px 0 34px}
.pc-label{font-size:10.5px;letter-spacing:.16em;margin-bottom:7px;text-transform:uppercase}
.pc-val{font-size:14px;color:var(--m);line-height:1.35}
.pc-note{font-size:12.5px;margin-top:2px}
.pc-smeta{margin-bottom:22px}
.pc-nav{display:flex;flex-direction:column;margin-top:14px}
.pc-nav a{display:grid;grid-template-columns:36px 1fr;align-items:center;padding:7px 0;font-size:13px;color:var(--quiet);position:relative;transition:color .2s;cursor:pointer}
.pc-nav a:hover{color:var(--ink)}
.pc-nav .n{font-size:11px;padding-left:14px}
.pc-nav a.on{color:var(--ink);font-weight:600}
.pc-nav a.on:before{content:'';position:absolute;left:0;top:50%;width:3px;height:18px;margin-top:-9px;background:var(--a);border-radius:2px}
.pc-bar{display:none}
.pc-prog{margin-top:auto;padding-top:26px}
.pc-prog i{display:block;height:2px;background:rgba(48,55,59,.15);position:relative}
.pc-prog i b{position:absolute;left:0;top:0;bottom:0;background:var(--a);transition:width .15s}
.pc-prog span{display:block;margin-top:10px;font-size:11px;color:var(--quiet);letter-spacing:.08em}
.pc-main{flex:1;min-width:0;padding:22px 26px 80px;display:flex;flex-direction:column;gap:26px}
.pc-top{display:flex;justify-content:space-between;align-items:center}
.pc-pill,.pc-menu{display:inline-flex;align-items:center;gap:12px;border:1px solid var(--edge);border-radius:999px;background:var(--glass);backdrop-filter:blur(18px) saturate(180%);-webkit-backdrop-filter:blur(18px) saturate(180%);box-shadow:var(--lift);text-transform:uppercase;letter-spacing:.14em}
.pc-pill{height:40px;padding:0 24px;font-size:12.5px;color:var(--m)}
.pc-menu{height:44px;padding:0 30px;font-size:13px}
.pc-menu i{display:block;width:17px;height:7px;border-top:1.5px solid var(--ink);border-bottom:1.5px solid var(--ink)}
.pc-sec{scroll-margin-top:16px;display:flex;flex-direction:column;gap:28px;padding:44px 8px 20px}
.pc-sec:focus{outline:none}
.pc-card{border:1px solid var(--edge);border-radius:28px;background:var(--glass);backdrop-filter:blur(18px) saturate(180%);-webkit-backdrop-filter:blur(18px) saturate(180%);box-shadow:var(--lift)}
.pc-vh{padding:14px}
.pc-vhf{position:relative;aspect-ratio:16/9;border-radius:20px;overflow:hidden;background:rgba(255,255,255,.4)}
.pc-vhf video,.pc-vhf img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.pc-vhf .pc-phbox{position:absolute;inset:0;border-radius:20px}
.pc-vt{position:absolute;left:20px;top:20px;padding:9px 18px;border-radius:999px;border:1px solid var(--edge);background:var(--glass);backdrop-filter:blur(18px);font-size:18px;font-weight:700;letter-spacing:-.02em;pointer-events:none}
.pc-load{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:inline-flex;align-items:center;gap:10px;padding:10px 18px;border-radius:999px;border:1px solid var(--edge);background:var(--glass);font-size:13px}
.pc-load i{display:block;width:16px;height:16px;border-radius:50%;border:2px solid rgba(48,55,59,.2);border-top-color:var(--ai);animation:pc-spin .8s linear infinite}
@keyframes pc-spin{to{transform:rotate(360deg)}}
.pc-vtr{margin:14px 10px 6px}
.pc-vtr summary{cursor:pointer;width:fit-content;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--quiet);padding:6px 0}
.pc-eye{display:flex;align-items:center;gap:12px;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--quiet);margin:0 0 -8px}
.pc-eye b{color:var(--ai);font-weight:700}
.pc-h1{font-size:clamp(40px,5.4vw,76px);font-weight:800;letter-spacing:-.045em;line-height:.98;margin:0;max-width:900px}
.pc-h2{font-size:clamp(30px,3.6vw,52px);font-weight:700;letter-spacing:-.035em;line-height:1.05;margin:0;max-width:820px}
.pc-h3{font-size:20px;font-weight:700;letter-spacing:-.02em;line-height:1.15;margin:0 0 8px}
.pc-lead{font-size:clamp(18px,1.6vw,22px);line-height:1.5;color:var(--soft);max-width:680px;margin:0}
.pc-p{font-size:16.5px;line-height:1.65;color:var(--soft);max-width:640px}
.pc-p p{margin:0 0 14px}
.pc-small{font-size:13.5px;line-height:1.5;color:var(--quiet);margin:0}
.pc-k,.pc-row small{display:block;font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--quiet);margin:0 0 8px;font-weight:600}
.pc-row{padding:12px 0;border-top:1px solid rgba(48,55,59,.14)}
.pc-row .pc-p{font-size:15px;line-height:1.55}
.pc-row .pc-p p:last-child{margin:0}
.pc-glass{border:1px solid var(--edge);border-radius:24px;background:var(--glass);backdrop-filter:blur(18px) saturate(180%);-webkit-backdrop-filter:blur(18px) saturate(180%);box-shadow:var(--lift);padding:28px}
.pc-tint{background:var(--t);border-radius:28px;padding:56px;border:1px solid rgba(255,255,255,.7)}
.pc-dark{background:var(--d);color:#fff;border-radius:28px;padding:60px;display:flex;flex-direction:column;gap:32px}
.pc-dark em{color:#9FD3B0}
.pc-list{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px}
.pc-list li{position:relative;padding-left:20px;font-size:15px;line-height:1.5;color:var(--soft)}
.pc-list li:before{content:'';position:absolute;left:0;top:.62em;width:8px;height:8px;border-radius:50%;background:var(--a)}
.pc-chips{display:flex;flex-wrap:wrap;gap:10px}
.pc-chips span{padding:7px 16px;border:1px solid var(--edge);border-radius:999px;font-size:13px;background:rgba(255,255,255,.6);color:var(--soft)}
.pc-ov{display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center}
.pc-meta{display:grid;grid-template-columns:repeat(3,1fr);column-gap:36px;border-top:1px solid rgba(48,55,59,.2);margin:0}
.pc-meta div{padding:16px 0;border-bottom:1px solid rgba(48,55,59,.14)}
.pc-meta dt{font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--quiet);margin:0 0 6px}
.pc-meta dd{margin:0;font-size:15px;line-height:1.45}
.pc-meta .wide{grid-column:1 / -1}
.pc-img{border-radius:28px;padding:28px;display:flex;justify-content:center;background:linear-gradient(160deg,var(--t),rgba(255,255,255,.7))}
.pc-img img{display:block;width:auto;max-width:100%;max-height:520px;height:auto;border-radius:14px}
.pc-phbox{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;text-align:center;padding:24px;width:100%;min-height:240px;border:1px dashed rgba(48,55,59,.4);border-radius:20px;color:var(--ink);background:rgba(255,255,255,.35);font-size:13.5px}
.pc-phbox small{opacity:.75;max-width:440px}
.pc-disc{padding:16px 20px;border-radius:18px;background:var(--t);border:1px solid rgba(255,255,255,.7);font-size:14px;max-width:780px}
.pc-2{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.pc-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.pc-4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.pc-src{display:inline-block;width:fit-content;padding:3px 10px;border-radius:999px;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;background:rgba(255,255,255,.7);border:1px solid var(--edge);color:var(--quiet)}
.pc-src.set{background:var(--t);color:var(--ink)}
.pc-eio{display:flex;flex-direction:column;gap:12px}
.pc-eio-r{display:grid;grid-template-columns:1fr 24px 1.1fr 24px 1.2fr;gap:12px;align-items:center}
.pc-eio-r>div{padding:20px 22px;border-radius:20px;background:rgba(255,255,255,.6);border:1px solid var(--edge);font-size:15px;line-height:1.45;color:var(--soft);display:flex;flex-direction:column;gap:8px;align-items:flex-start}
.pc-eio-r>div.ins{background:var(--d);color:#fff;font-weight:600;font-size:17px}
.pc-eio-r>div.opp{background:var(--t);color:var(--ink)}
.pc-eio-r>i{font-style:normal;text-align:center;color:var(--ai);font-size:20px}
.pc-pq{font-size:clamp(30px,4.2vw,60px);font-weight:800;letter-spacing:-.04em;line-height:1.04;margin:0}
.pc-pl{font-size:11px;letter-spacing:.18em;text-transform:uppercase;opacity:.8;margin:0 0 10px}
.pc-ps{font-size:16.5px;line-height:1.65;color:rgba(255,255,255,.86);max-width:720px;margin:0}
.pc-flow{display:flex;flex-wrap:wrap;align-items:center;gap:10px}
.pc-flow .s{padding:12px 20px;border-radius:999px;background:rgba(255,255,255,.7);border:1px solid var(--edge);font-weight:600;font-size:14px}
.pc-flow i{font-style:normal;color:var(--ai)}
.pc-tabs{display:flex;flex-wrap:wrap;gap:8px}
.pc-tab{all:unset;box-sizing:border-box;cursor:pointer;padding:9px 18px;border-radius:999px;border:1px solid var(--edge);background:rgba(255,255,255,.55);font-size:13.5px;font-weight:600;color:var(--soft)}
.pc-tab.on{background:var(--d);color:#fff}
.pc-tab:focus-visible{outline:2px solid var(--m);outline-offset:3px}
.pc-panel{display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:start}
.pc-det{border:1px solid var(--edge);border-radius:20px;background:rgba(255,255,255,.5);padding:6px 22px}
.pc-det summary{cursor:pointer;padding:16px 0;font-size:17px;font-weight:700;letter-spacing:-.01em}
.pc-det[open] summary{border-bottom:1px solid rgba(48,55,59,.14);margin-bottom:10px}
.pc-det .in{padding:0 0 20px}
.pc-ba{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px}
.pc-ba figure{margin:0;display:flex;flex-direction:column;gap:8px}
.pc-ba figcaption{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--quiet)}
.pc-stimg{aspect-ratio:4/3;border-radius:24px;background:linear-gradient(160deg,var(--t),rgba(255,255,255,.7));display:flex;align-items:center;justify-content:center;padding:14px;overflow:hidden}
.pc-stimg img{display:block;max-width:100%;max-height:100%;object-fit:contain;border-radius:14px}
.pc-map{aspect-ratio:16/9;border-radius:28px}
.pc-prio{display:grid;grid-template-columns:150px 1fr;gap:20px;align-items:start;padding:20px 0;border-top:1px solid rgba(48,55,59,.2)}
.pc-prio:last-child{border-bottom:1px solid rgba(48,55,59,.2)}
.pc-prio h3{font-size:clamp(18px,1.8vw,24px);font-weight:700;letter-spacing:-.02em;margin:6px 0 6px}
.pc-prio p{margin:0;font-size:15px;line-height:1.55;color:var(--soft)}
.pc-story{display:grid;grid-template-columns:minmax(260px,.9fr) 1.1fr;gap:48px;align-items:start}
.pc-stage{position:sticky;top:24px}
.pc-stagebox{height:min(72vh,620px);border-radius:28px;background:linear-gradient(160deg,var(--t),rgba(255,255,255,.7));display:flex;align-items:center;justify-content:center;padding:18px;overflow:hidden}
.pc-stagebox img{display:block;max-width:100%;max-height:100%;object-fit:contain;border-radius:16px}
.pc-stagecap{margin-top:12px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--quiet)}
.pc-sstep{min-height:62vh;display:flex;flex-direction:column;justify-content:center;gap:12px;padding:24px 0;opacity:.6;transition:opacity .3s}
.pc-sstep.on{opacity:1}
.pc-sh{font-size:clamp(24px,2.8vw,36px);font-weight:700;letter-spacing:-.03em;line-height:1.06;margin:4px 0 6px}
.pc-inl{display:none}
.pc-btn{display:inline-flex;align-items:center;width:fit-content;height:48px;padding:0 26px;border-radius:999px;background:var(--d);color:#fff!important;font-size:14px;font-weight:600}
.pc-next{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:44px 48px;border-radius:28px;background:var(--d);color:#fff;transition:transform .25s}
.pc-next small{display:block;font-size:11px;letter-spacing:.2em;text-transform:uppercase;opacity:.8;margin-bottom:8px}
.pc-next b{font-size:clamp(28px,3.4vw,46px);letter-spacing:-.03em;line-height:1.05}
.pc-next span{flex:none;width:56px;height:56px;border-radius:50%;background:var(--a);color:#fff;display:flex;align-items:center;justify-content:center;font-size:24px}
.pc-next:hover{transform:translateY(-3px)}
.pc.nav-minimal .pc-side{background:transparent;backdrop-filter:none;-webkit-backdrop-filter:none;border-right:0}
.pc.nav-hidden .pc-side{display:none}
.pc.compact{flex-direction:column}
.pc.compact .pc-side{position:relative;width:100%;height:auto;max-height:none;border-right:0;border-bottom:1px solid var(--edge)}
.pc.compact .pc-prog,.pc.compact .pc-side .pc-nav,.pc.compact .pc-side .pc-clabel{display:none}
.pc.compact .pc-bar{display:flex;width:100%;position:sticky;top:0;z-index:30;gap:6px;overflow-x:auto;padding:10px 14px;background:var(--glass);backdrop-filter:blur(18px) saturate(180%);-webkit-backdrop-filter:blur(18px) saturate(180%);border-bottom:1px solid var(--edge);scrollbar-width:none}
.pc-bar a{flex:none;display:inline-flex;align-items:center;height:34px;padding:0 14px;border-radius:999px;border:1px solid transparent;font-size:12.5px;color:var(--quiet);white-space:nowrap}
.pc-bar a.on{color:var(--ink);font-weight:600;background:rgba(255,255,255,.7);border-color:var(--edge)}
.pc.compact .pc-sec{scroll-margin-top:72px;padding:34px 0 10px}
.pc.compact .pc-main{width:100%;padding:16px 14px 50px}
.pc.compact .pc-ov,.pc.compact .pc-2,.pc.compact .pc-3,.pc.compact .pc-meta,.pc.compact .pc-panel,.pc.compact .pc-ba,.pc.compact .pc-story,.pc.compact .pc-prio{grid-template-columns:1fr}
.pc.compact .pc-4{grid-template-columns:1fr 1fr}
.pc.compact .pc-eio-r{grid-template-columns:1fr;gap:6px}
.pc.compact .pc-eio-r>i{transform:rotate(90deg)}
.pc.compact .pc-stage{display:none}
.pc.compact .pc-sstep{min-height:0;opacity:1;padding:26px 0}
.pc.compact .pc-inl{display:flex}
.pc.compact .pc-tint{padding:30px 22px}
.pc.compact .pc-dark{padding:34px 24px}
.pc.compact .pc-next{flex-direction:column;align-items:flex-start;padding:30px 26px}
@media (prefers-reduced-motion:reduce){.pc *{transition:none!important;scroll-behavior:auto!important}.pc-load i{animation:none!important}}
`

function DentigoCaseStudy(props: any) {
    const v = (k: string): string => (props[k] === undefined || props[k] === null ? D[k] ?? "" : String(props[k]))
    const list = (k: string, d: any[]): any[] => (Array.isArray(props[k]) ? props[k] : d)

    const rootRef = React.useRef<HTMLDivElement>(null)
    const barRef = React.useRef<HTMLElement>(null)
    const pinned = React.useRef(false)
    const [compact, setCompact] = React.useState(false)
    const [active, setActive] = React.useState("overview")
    const [progress, setProgress] = React.useState(0)
    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const navStyle: string = ["glass", "minimal", "hidden"].includes(props.navStyle) ? props.navStyle : "glass"

    const hidden = new Set(v("hiddenSections").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean))
    /* contents list: identical to the Lumi and 3TFlow case studies */
    const strategyOn = !hidden.has("strategy") && !(hidden.has("opportunity") && hidden.has("flows"))
    const solutionOn = !hidden.has("solution") && !(hidden.has("experience") && hidden.has("details"))
    const defs: any[] = [
        { id: "overview", label: "Overview", on: true },
        { id: "context", label: "Context", num: true },
        { id: "problem", label: "Problem", num: true },
        { id: "research", label: "Research", num: true },
        { id: "ecosystem", label: "Ecosystem", num: true },
        { id: "strategy", label: "Strategy", num: true, on: strategyOn },
        { id: "solution", label: "Solution", num: true, on: solutionOn },
        { id: "evaluation", label: "Evaluation", num: true },
        { id: "reflection", label: "Reflection", num: true },
        { id: "next", label: "Next project", on: has(v("nextTitle")) },
    ].map((d) => ({ ...d, on: d.on === undefined ? !hidden.has(d.id) : d.on }))
    let counter = 0
    const secs = defs.filter((d) => d.on).map((d) => ({ ...d, n: d.num ? String(++counter).padStart(2, "0") : "" }))
    const sec = (id: string) => secs.find((s) => s.id === id)
    const idsKey = secs.map((s) => s.id).join(",")
    const on = (id: string, grp: string) => !!sec(grp) && !hidden.has(id)
    const sp = (id: string, grp: string, first = true) => ({
        id: "pc-" + (first ? grp : id),
        "data-sec": grp,
        tabIndex: -1,
        "aria-label": sec(grp)?.label || grp,
    })
    const Eye = ({ grp, sub }: { grp: string; sub?: string }) => {
        const s: any = sec(grp)
        return (
            <div className="pc-eye">
                {s && s.n && <b>{s.n}</b>}
                <span>{s ? s.label : grp}{sub ? " · " + sub : ""}</span>
            </div>
        )
    }
    const stratFirst = !hidden.has("opportunity") ? "opportunity" : "flows"
    const solFirst = !hidden.has("experience") ? "experience" : "details"

    React.useEffect(() => {
        const el = rootRef.current
        if (!el || typeof ResizeObserver === "undefined") return
        const ro = new ResizeObserver((e) => setCompact(e[0].contentRect.width < 900))
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    React.useEffect(() => {
        const release = () => { pinned.current = false }
        const evts = ["wheel", "touchstart", "keydown", "pointerdown"]
        evts.forEach((e) => window.addEventListener(e, release, { passive: true }))
        return () => evts.forEach((e) => window.removeEventListener(e, release))
    }, [])

    React.useEffect(() => {
        if (isCanvas || navStyle === "hidden") return
        const ids = idsKey.split(",")
        const onScroll = () => {
            const root = rootRef.current
            if (!root) return
            const r = root.getBoundingClientRect()
            const total = r.height - window.innerHeight
            setProgress(total > 0 ? Math.min(100, Math.max(0, Math.round((-r.top / total) * 100))) : 0)
            if (pinned.current) return
            let cur = ids[0]
            ids.forEach((id) => {
                const n = root.querySelector(`[data-sec="${id}"]`) as HTMLElement | null
                if (n && n.getBoundingClientRect().top <= window.innerHeight * 0.35) cur = id
            })
            if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = ids[ids.length - 1]
            setActive(cur)
        }
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll)
        return () => {
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
        }
    }, [idsKey, isCanvas, navStyle])

    React.useEffect(() => {
        if (!compact) return
        const bar = barRef.current
        const el = bar?.querySelector("a.on") as HTMLElement | null
        if (bar && el) bar.scrollTo({ left: el.offsetLeft - bar.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" })
    }, [active, compact])

    const go = (id: string) => {
        const n = rootRef.current?.querySelector(`[data-sec="${id}"]`) as HTMLElement | null
        if (!n) return
        pinned.current = true
        setActive(id)
        const reduce = typeof window !== "undefined" && !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
        n.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
        try { n.focus({ preventScroll: true }) } catch (e) {}
    }
    const links = (chips: boolean) =>
        secs.map((s: any) => (
            <a key={s.id} href={"#pc-" + s.id} className={active === s.id ? "on" : ""} aria-current={active === s.id ? "location" : undefined}
                onClick={(e) => { e.preventDefault(); go(s.id) }}>
                {!chips && <span className="n">{s.n}</span>}
                <span>{s.label}</span>
            </a>
        ))

    const style: any = {
        "--a": props.accent || "#366D49",
        "--ai": props.accentInk || "#2A5A3B",
        "--t": props.tint || "#F1D3C9",
        "--d": props.dark || "#24292F",
        "--m": props.muted || "#476A8A",
        ...(props.style || {}),
    }

    const meta: [string, string, boolean?][] = [
        ["Project type", v("projectType")],
        ["Domain", v("domain")],
        ["Timeline", v("timeline")],
        ["Role", [v("role"), v("roleNote")].filter(Boolean).join(" · ")],
        ["Team", v("team")],
        ["Tools", v("tools")],
        ["Scope", v("scope"), true],
        ["Status", v("status"), true],
    ]
    const participants = list("participants", PARTICIPANTS).filter(has)
    const handoffs = list("handoffs", HANDOFFS)
    const issues = list("issues", ISSUES).filter(has)
    const challenges = list("challenges", CHALLENGES)
    const findings = list("findings", FINDINGS)
    const artifacts = list("artifacts", ARTIFACTS)
    const perspectives = list("perspectives", PERSPECTIVES)
    const hmw = list("hmw", HMW).filter(has)
    const features = list("features", FEATURES)
    const flows = list("flows", FLOWS)
    const screens = list("screens", SCREENS)
    const details = list("details", DETAILS)

    return (
        <div ref={rootRef} className={"pc nav-" + navStyle + (compact ? " compact" : "")} style={style}>
            <style>{CSS}</style>

            {navStyle !== "hidden" && (
                <aside className="pc-side">
                    <div className="pc-stitle">{v("title")}</div>
                    {has(v("role")) && (
                        <div className="pc-smeta">
                            <div className="pc-label">Role</div>
                            <div className="pc-val">{v("role")}</div>
                            {has(v("roleNote")) && <div className="pc-note">{v("roleNote")}</div>}
                        </div>
                    )}
                    {has(v("timeline")) && (
                        <div className="pc-smeta">
                            <div className="pc-label">Timeline</div>
                            <div className="pc-val">{v("timeline")}</div>
                        </div>
                    )}
                    <div className="pc-label pc-clabel" style={{ marginTop: 36 }}>Contents</div>
                    <nav className="pc-nav" aria-label="Case study contents">{links(false)}</nav>
                    <div className="pc-prog"><i><b style={{ width: progress + "%" }} /></i><span>{progress}%</span></div>
                </aside>
            )}
            {navStyle !== "hidden" && <nav className="pc-bar" ref={barRef} aria-label="Case study contents">{links(true)}</nav>}

            <main className="pc-main">
                <div className="pc-top">
                    <a className="pc-pill" href={props.backLink || "/"}>← {v("backLabel")}</a>
                    <a className="pc-menu" href={props.menuLink || "/"}>{v("menuLabel")}<i /></a>
                </div>

                {props.showHero !== false && (
                    <CaseStudyVideoHero src={props.heroVideo} poster={props.heroPoster} title={v("vhTitle")} transcript={v("vhTranscript")} name={v("title")} autoplay={!!props.heroAutoplay} />
                )}

                {/* 00 overview */}
                <section className="pc-sec" {...sp("overview", "overview")}>
                    <Eye grp="overview" />
                    <Tx t={v("ovHeadline")} as="h1" className="pc-h1" />
                    <Tx t={v("ovLead")} className="pc-lead" />
                    <div className="pc-ov">
                        <dl className="pc-meta">
                            {meta.filter((r) => has(r[1])).map((r, i) => (
                                <div key={i} className={r[2] ? "wide" : ""}><dt>{r[0]}</dt><dd className={ph(r[1]).trim()}>{r[1]}</dd></div>
                            ))}
                        </dl>
                        <div className="pc-img"><Img src={props.ovImage} label="Upload in “Overview · Image” (a strong interface preview)" /></div>
                    </div>
                    {has(v("ovChallenge")) && (
                        <div className="pc-glass"><h3 className="pc-h3">The challenge</h3><Paras t={v("ovChallenge")} /></div>
                    )}
                    {has(v("ovNote")) && <div className={"pc-disc" + ph(v("ovNote"))}>{rich(v("ovNote"))}</div>}
                </section>

                {/* 01 context: understanding the ecosystem */}
                {on("context", "context") && (
                    <section className="pc-sec" {...sp("context", "context")}>
                        <Eye grp="context" />
                        <Tx t={v("ctxHeading")} as="h2" className="pc-h2" />
                        <Tx t={v("ctxIntro")} className="pc-lead" />
                        {participants.length > 0 && (
                            <div>
                                <h3 className="pc-h3" style={{ marginBottom: 12 }}>{v("ctxPartLabel")}</h3>
                                <div className="pc-chips">{participants.map((c: string, i: number) => <span key={i} className={ph(c).trim()}>{c}</span>)}</div>
                            </div>
                        )}
                        <div>
                            <h3 className="pc-h3" style={{ marginBottom: 12 }}>{v("ctxMapLabel")}</h3>
                            <div className="pc-stimg pc-map"><Img src={props.ctxMap} label="Upload the system or stakeholder map (clear participants, exchanges, handoffs and failure points)" /></div>
                            <div style={{ marginTop: 10 }}><Tx t={v("ctxMapNote")} className="pc-small" /></div>
                        </div>
                        {handoffs.length > 0 && (
                            <div>
                                <h3 className="pc-h3" style={{ marginBottom: 12 }}>{v("ctxHandoffLabel")}</h3>
                                <div className="pc-3">
                                    {handoffs.map((h: any, i: number) => (
                                        <div className="pc-glass" key={i}>
                                            <Tx t={h.between} as="h3" className="pc-h3" />
                                            <Row k="What is exchanged" t={h.exchange} />
                                            <Row k="Where it breaks down" t={h.failure} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* 02 problem */}
                {on("problem", "problem") && (
                    <section className="pc-sec" {...sp("problem", "problem")}>
                        <Eye grp="problem" />
                        <div className="pc-dark">
                            <Tx t={v("probQuote")} className="pc-pq" />
                            {has(v("probStatement")) && (
                                <div><p className="pc-pl">{v("probLabel")}</p><Tx t={v("probStatement")} className="pc-ps" /></div>
                            )}
                        </div>
                        {challenges.length > 0 && (
                            <div>
                                <h3 className="pc-h3" style={{ marginBottom: 14 }}>{v("challengesLabel")}</h3>
                                <div className="pc-3">
                                    {challenges.map((c: any, i: number) => (
                                        <div className="pc-glass" key={i} style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
                                            <Badge t={c.source} />
                                            <Tx t={c.title} as="h3" className="pc-h3" />
                                            <Tx t={c.text} className="pc-small" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {issues.length > 0 && (
                            <div className="pc-glass">
                                <h3 className="pc-h3">{v("issuesLabel")}</h3>
                                <ul className="pc-list">{issues.map((q: string, i: number) => <li key={i}>{q}</li>)}</ul>
                                <div style={{ marginTop: 12 }}><Tx t={v("issuesNote")} className="pc-small" /></div>
                            </div>
                        )}
                    </section>
                )}

                {/* 03 research */}
                {on("research", "research") && (
                    <section className="pc-sec" {...sp("research", "research")}>
                        <Eye grp="research" />
                        <Tx t={v("resHeading")} as="h2" className="pc-h2" />
                        <Tx t={v("resIntro")} className="pc-lead" />
                        {findings.length > 0 && (
                            <div>
                                <h3 className="pc-h3" style={{ marginBottom: 14 }}>{v("findingsLabel")}</h3>
                                <div className="pc-eio">
                                    {findings.map((r: any, i: number) => (
                                        <div className="pc-eio-r" key={i}>
                                            <div><Badge t={r.source} /><span className={ph(r.evidence || "").trim()}>{r.evidence}</span></div>
                                            <i aria-hidden="true">→</i>
                                            <div className={"ins" + ph(r.insight || "")}>{r.insight}</div>
                                            <i aria-hidden="true">→</i>
                                            <div className={"opp" + ph(r.opportunity || "")}>{r.opportunity}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {artifacts.length > 0 && (
                            <div>
                                <h3 className="pc-h3" style={{ marginBottom: 14 }}>{v("artifactsLabel")}</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    {artifacts.map((a: any, i: number) => (
                                        <details className="pc-det" key={i}>
                                            <summary className={ph(a.title).trim()}>{a.title}</summary>
                                            <div className="in">
                                                <Tx t={a.note} className="pc-small" />
                                                <div className="pc-stimg" style={{ aspectRatio: "16/9", marginTop: 14 }}><Img src={a.image} label="Upload this artifact at a readable scale" /></div>
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        )}
                        {has(v("resMethod")) && (
                            <details className="pc-det">
                                <summary>Method, participants and limitations</summary>
                                <div className="in"><Paras t={v("resMethod")} /></div>
                            </details>
                        )}
                    </section>
                )}

                {/* 04 ecosystem: the users */}
                {on("users", "ecosystem") && (
                    <section className="pc-sec" {...sp("users", "ecosystem")}>
                        <Eye grp="ecosystem" />
                        <Tx t={v("usrHeading")} as="h2" className="pc-h2" />
                        <Tx t={v("usrIntro")} className="pc-lead" />
                        <Perspectives items={perspectives} />
                    </section>
                )}

                {/* 05 strategy: opportunity and prioritisation, then information architecture and flows */}
                {on("opportunity", "strategy") && (
                    <section className="pc-sec" {...sp("opportunity", "strategy", stratFirst === "opportunity")}>
                        <Eye grp="strategy" sub="Opportunity" />
                        <Tx t={v("opHeading")} as="h2" className="pc-h2" />
                        <Tx t={v("opIntro")} className="pc-lead" />
                        {hmw.length > 0 && (
                            <div className="pc-glass">
                                <h3 className="pc-h3">{v("hmwLabel")}</h3>
                                <ul className="pc-list">{hmw.map((q: string, i: number) => <li key={i} className={ph(q).trim()}>{q}</li>)}</ul>
                            </div>
                        )}
                        {features.length > 0 && (
                            <div>
                                <h3 className="pc-h3" style={{ marginBottom: 6 }}>{v("prioLabel")}</h3>
                                <div>
                                    {features.map((f: any, i: number) => (
                                        <div className="pc-prio" key={i}>
                                            <Badge t={f.priority} />
                                            <div><Tx t={f.feature} as="h3" /><Tx t={f.reasoning} /></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {has(v("deferred")) && (
                            <div className="pc-glass"><h3 className="pc-h3">{v("deferredLabel")}</h3><Lines t={v("deferred")} /></div>
                        )}
                    </section>
                )}
                {on("flows", "strategy") && (
                    <section className="pc-sec" {...sp("flows", "strategy", stratFirst === "flows")}>
                        <Eye grp="strategy" sub="Flows" />
                        <Tx t={v("flHeading")} as="h2" className="pc-h2" />
                        <Tx t={v("flIntro")} className="pc-lead" />
                        <div>
                            <h3 className="pc-h3" style={{ marginBottom: 12 }}>{v("flSitemapLabel")}</h3>
                            <div className="pc-stimg pc-map"><Img src={props.flSitemap} label="Upload the sitemap and information architecture" /></div>
                        </div>
                        <FlowViewer items={flows} />
                    </section>
                )}

                {/* 06 solution: core experience (sticky), then design details */}
                {on("experience", "solution") && (
                    <section className="pc-sec" {...sp("experience", "solution", solFirst === "experience")}>
                        <Eye grp="solution" sub="Core experience" />
                        <Tx t={v("exHeading")} as="h2" className="pc-h2" />
                        <Tx t={v("exIntro")} className="pc-lead" />
                        <StickyStory items={screens} compact={compact} isCanvas={isCanvas} />
                    </section>
                )}
                {on("details", "solution") && (
                    <section className="pc-sec" {...sp("details", "solution", solFirst === "details")}>
                        <Eye grp="solution" sub="Design details" />
                        <Tx t={v("dtHeading")} as="h2" className="pc-h2" />
                        <Tx t={v("dtIntro")} className="pc-lead" />
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            {details.map((d: any, i: number) => (
                                <details className="pc-det" key={i} open={i === 0}>
                                    <summary className={ph(d.title).trim()}>{String(i + 1).padStart(2, "0")} · {d.title}</summary>
                                    <div className="in">
                                        <Row k="User or workflow challenge" t={d.challenge} />
                                        <Row k="Evidence or constraint" t={d.evidence} />
                                        <Row k="Design direction" t={d.direction} />
                                        <Row k="Rationale and trade-offs" t={d.rationale} />
                                        <Row k="Expected or observed effect" t={d.effect} />
                                        <div className="pc-ba">
                                            <figure><div className="pc-stimg"><Img src={d.before} label="Real earlier iteration (only if one exists)" /></div><figcaption>Earlier iteration</figcaption></figure>
                                            <figure><div className="pc-stimg"><Img src={d.after} label="Final screen" /></div><figcaption>Final design</figcaption></figure>
                                        </div>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </section>
                )}

                {/* 07 evaluation */}
                {on("evaluation", "evaluation") && (
                    <section className="pc-sec" {...sp("evaluation", "evaluation")}>
                        <Eye grp="evaluation" />
                        <Tx t={v("evHeading")} as="h2" className="pc-h2" />
                        <div className="pc-4">
                            <div className="pc-glass"><h3 className="pc-h3">Proposed</h3><Lines t={v("evProposed")} /></div>
                            <div className="pc-glass"><h3 className="pc-h3">Prototyped</h3><Lines t={v("evPrototyped")} /></div>
                            <div className="pc-glass"><h3 className="pc-h3">Tested</h3><Lines t={v("evTested")} /></div>
                            <div className="pc-glass"><h3 className="pc-h3">Still unvalidated</h3><Lines t={v("evUnvalidated")} /></div>
                        </div>
                        {(has(v("evMethod")) || has(v("evFindings")) || has(v("evChanged"))) && (
                            <div className="pc-3">
                                <div className="pc-glass"><h3 className="pc-h3">Method</h3><Paras t={v("evMethod")} /></div>
                                <div className="pc-glass"><h3 className="pc-h3">Findings</h3><Paras t={v("evFindings")} /></div>
                                <div className="pc-glass"><h3 className="pc-h3">What changed</h3><Paras t={v("evChanged")} /></div>
                            </div>
                        )}
                    </section>
                )}

                {/* 08 reflection */}
                {on("reflection", "reflection") && (
                    <section className="pc-sec" {...sp("reflection", "reflection")}>
                        <Eye grp="reflection" />
                        <Tx t={v("rfHeading")} as="h2" className="pc-h2" />
                        <div className="pc-3">
                            <div className="pc-glass"><h3 className="pc-h3">Multi-stakeholder B2B ecosystems</h3><Paras t={v("rfA")} /></div>
                            <div className="pc-glass"><h3 className="pc-h3">Complexity and clarity</h3><Paras t={v("rfB")} /></div>
                            <div className="pc-glass"><h3 className="pc-h3">From research to decisions</h3><Paras t={v("rfC")} /></div>
                        </div>
                        {has(v("rfNext")) && (
                            <div className="pc-tint"><h3 className="pc-h3">What I would do next</h3><Lines t={v("rfNext")} /></div>
                        )}
                    </section>
                )}

                {sec("next") && (
                    <section {...sp("next", "next")}>
                        <a className="pc-next" href={props.nextLink || "/encora"}>
                            <div><small>{v("nextLabel")}</small><b>{v("nextTitle")}</b></div>
                            <span aria-hidden="true">→</span>
                        </a>
                    </section>
                )}
            </main>
        </div>
    )
}

DentigoCaseStudy.displayName = "Dentigo Case Study"
export default DentigoCaseStudy

const controls: any = {}
FIELDS.forEach(([key, title, def, long]) => {
    controls[key] = { type: ControlType.String, title, defaultValue: def, displayTextArea: !!long }
})
const text = (title: string, long = true) => ({ type: ControlType.String, title, defaultValue: "", displayTextArea: long })
const img = (title: string) => ({ type: ControlType.ResponsiveImage, title })
const pick = (title: string, options: string[]) => ({ type: ControlType.Enum, title, options, optionTitles: options, defaultValue: options[0] })
const arr = (title: string, fields: any, def: any[]) => ({
    type: ControlType.Array, title, control: { type: ControlType.Object, controls: fields }, defaultValue: def,
})
const strs = (title: string, def: string[]) => ({ type: ControlType.Array, title, control: { type: ControlType.String }, defaultValue: def })
Object.assign(controls, {
    participants: strs("Context · Participants", PARTICIPANTS),
    handoffs: arr("Context · Handoffs", { between: text("Between", false), exchange: text("What is exchanged"), failure: text("Where it breaks down") }, HANDOFFS),
    challenges: arr("Problem · Supporting challenges", { title: text("Title", false), text: text("Text"), source: pick("Source", SOURCES) }, CHALLENGES),
    issues: strs("Problem · Issues identified", ISSUES),
    findings: arr("Research · Findings", { evidence: text("Evidence"), insight: text("Insight"), opportunity: text("Design opportunity"), source: pick("Source", SOURCES) }, FINDINGS),
    artifacts: arr("Research · Supporting artifacts", { title: text("Title", false), note: text("Note"), image: img("Artifact image") }, ARTIFACTS),
    perspectives: arr("Ecosystem · Perspectives", { name: text("Name", false), summary: text("Summary"), needs: text("Needs (one per line)"), observed: text("Observed in research (one per line)"), assumptions: text("Persona assumptions (one per line)"), persona: img("Persona"), empathy: img("Empathy map") }, PERSPECTIVES),
    hmw: strs("Strategy · How might we", HMW),
    features: arr("Strategy · Prioritised features", { feature: text("Feature", false), priority: pick("MoSCoW", PRIOS), reasoning: text("Reasoning") }, FEATURES),
    flows: arr("Strategy · User flows", { name: text("Name", false), start: text("Start state", false), end: text("End state", false), summary: text("Summary"), tradeoffs: text("Trade-offs"), diagram: img("Flow diagram"), screens: img("Annotated screens") }, FLOWS),
    screens: arr("Solution · Core screens", { title: text("Title", false), state: pick("Status", STATES), need: text("User need"), decision: text("Design decision"), notes: text("Annotations (one per line)"), image: img("Screen") }, SCREENS),
    details: arr("Solution · Design details", { title: text("Title", false), challenge: text("Challenge"), evidence: text("Evidence or constraint"), direction: text("Design direction"), rationale: text("Rationale and trade-offs"), effect: text("Expected or observed effect"), before: img("Earlier iteration"), after: img("Final design") }, DETAILS),
    navStyle: {
        type: ControlType.Enum, title: "Nav style", defaultValue: "glass",
        options: ["glass", "minimal", "hidden"], optionTitles: ["Glass", "Minimal", "Hidden"], displaySegmentedControl: true,
    },
    showHero: { type: ControlType.Boolean, title: "Hero · Show", defaultValue: true, enabledTitle: "Show", disabledTitle: "Hide" },
    heroAutoplay: { type: ControlType.Boolean, title: "Hero · Muted autoplay loop", defaultValue: false, enabledTitle: "On", disabledTitle: "Off" },
    heroVideo: { type: ControlType.File, title: "Hero · Video file", allowedFileTypes: ["mp4", "webm", "mov"] },
    heroPoster: img("Hero · Poster"),
    ovImage: img("Overview · Image"),
    ctxMap: img("Context · System map"),
    flSitemap: img("Strategy · Sitemap"),
    backLink: { type: ControlType.Link, title: "Top bar · Back link" },
    menuLink: { type: ControlType.Link, title: "Top bar · Menu link" },
    nextLink: { type: ControlType.Link, title: "Next · Link" },
    accent: { type: ControlType.Color, title: "Style · Dentigo green", defaultValue: "#366D49" },
    accentInk: { type: ControlType.Color, title: "Style · Green (text)", defaultValue: "#2A5A3B" },
    tint: { type: ControlType.Color, title: "Style · Warm pink", defaultValue: "#F1D3C9" },
    dark: { type: ControlType.Color, title: "Style · Dark neutral", defaultValue: "#24292F" },
    muted: { type: ControlType.Color, title: "Style · Dentigo blue", defaultValue: "#476A8A" },
})
addPropertyControls(DentigoCaseStudy, controls)
