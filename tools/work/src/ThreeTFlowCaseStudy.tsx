import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

/**
 * 3TFlow · Case study (same glass shell and same contents list as the Lumi case study)
 * Sidebar contents (identical to Lumi): Overview · 01 Context · 02 Problem · 03 Research · 04 Ecosystem ·
 *   05 Strategy · 06 Solution · 07 Evaluation · 08 Reflection · Next project.
 * What lives where:
 *   Research = discovery and information architecture · Ecosystem = users, roles and system complexity ·
 *   Strategy = key design decisions · Solution = workflows, the Problem Ticket concept, the final interface ·
 *   Evaluation = outcomes and evidence · Reflection = collaboration, constraints, delivery and what I learned.
 * Order: top bar → CaseStudyVideoHero → Overview → … → Next project. The video hero sits outside every contents target.
 * Everything is placeholder text ("[...]" shows with a dashed underline) plus labelled image and video slots.
 * Clear a field to hide that element. Hide a contents section with "Contents · Hide sections", e.g.  ecosystem, evaluation
 * You can also hide a part of Solution on its own: workflows, concept or interface.
 * The sidebar is a table of contents (real #pc-{id} anchors), never tabs.
 * No metrics, quotes, research findings or features are written for you: add only what you can substantiate and share.
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 9000
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
                        <small>Supply a screen recording of a real workflow (for example opening a ticket, inspecting its details, moving it through its lifecycle) in “Hero · Video file”</small>
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

/* ---------- role explorer (tabs inside a section; the sidebar stays a table of contents) ---------- */
function RoleExplorer({ roles }: { roles: any[] }) {
    const [i, setI] = React.useState(0)
    const cur = roles[Math.min(i, roles.length - 1)]
    if (!cur) return null
    const onKey = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowRight") setI((i + 1) % roles.length)
        if (e.key === "ArrowLeft") setI((i - 1 + roles.length) % roles.length)
    }
    return (
        <div className="pc-glass" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div className="pc-tabs" role="tablist" aria-label="Roles" onKeyDown={onKey}>
                {roles.map((r, n) => (
                    <button key={n} type="button" role="tab" id={"pc-role-t" + n} aria-selected={n === i} aria-controls="pc-role-p"
                        tabIndex={n === i ? 0 : -1} className={"pc-tab" + (n === i ? " on" : "")} onClick={() => setI(n)}>
                        {r.role}
                    </button>
                ))}
            </div>
            <div id="pc-role-p" role="tabpanel" aria-labelledby={"pc-role-t" + i} className="pc-panel">
                <div>
                    <Tx t={cur.summary} className="pc-lead" />
                    <Row k="Access and visibility" t={cur.access} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div><small className="pc-k">Key tasks</small><Lines t={cur.tasks} /></div>
                    <div><small className="pc-k">Interface areas</small><Lines t={cur.areas} /></div>
                </div>
            </div>
        </div>
    )
}

/* ---------- workflow viewer ---------- */
function WorkflowViewer({ items }: { items: any[] }) {
    const [i, setI] = React.useState(0)
    const cur = items[Math.min(i, items.length - 1)]
    if (!cur) return null
    const onKey = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowRight") setI((i + 1) % items.length)
        if (e.key === "ArrowLeft") setI((i - 1 + items.length) % items.length)
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="pc-tabs" role="tablist" aria-label="Workflows" onKeyDown={onKey}>
                {items.map((w, n) => (
                    <button key={n} type="button" role="tab" id={"pc-wf-t" + n} aria-selected={n === i} aria-controls="pc-wf-p"
                        tabIndex={n === i ? 0 : -1} className={"pc-tab" + (n === i ? " on" : "")} onClick={() => setI(n)}>
                        {w.name}
                    </button>
                ))}
            </div>
            <div id="pc-wf-p" role="tabpanel" aria-labelledby={"pc-wf-t" + i} className="pc-panel">
                <div className="pc-stimg" style={{ aspectRatio: "4/3" }}><Img src={cur.image} label="Upload the diagram or screens for this workflow" /></div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <Tx t={cur.summary} className="pc-lead" />
                    <div><small className="pc-k">Decisions explained</small><Lines t={cur.decisions} /></div>
                </div>
            </div>
        </div>
    )
}

/* ---------- Problem Ticket concept: a labelled, non-shipped exploration ---------- */
function ConceptMap(p: { tickets: string[]; suggestion: string; badge: string }) {
    const [sel, setSel] = React.useState<number[]>([])
    const [sug, setSug] = React.useState(false)
    const toggle = (n: number) => setSel(sel.includes(n) ? sel.filter((x) => x !== n) : [...sel, n])
    return (
        <div className="pc-glass" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {has(p.badge) && <span className="pc-badge">{p.badge}</span>}
            <div className="pc-legend" aria-hidden="true">
                <span><i className="k1" />Confirmed ticket information</span>
                <span><i className="k2" />Relationship selected by the agent</span>
                <span><i className="k3" />Suggested · unverified</span>
            </div>
            <div className="pc-nodes" role="group" aria-label="Tickets. Select the ones that look related.">
                {p.tickets.filter(has).map((t, n) => (
                    <button key={n} type="button" aria-pressed={sel.includes(n)} className={"pc-nd" + (sel.includes(n) ? " on" : "")} onClick={() => toggle(n)}>
                        <small>Ticket · confirmed information</small>
                        <span className={ph(t).trim()}>{t}</span>
                        {sel.includes(n) && <em>Linked by the agent</em>}
                    </button>
                ))}
            </div>
            <div className="pc-prob" aria-live="polite">
                <b>Proposed Problem Ticket</b>
                <span>
                    {sel.length === 0
                        ? "Select two or more related tickets to propose a Problem Ticket."
                        : sel.length + " ticket" + (sel.length > 1 ? "s" : "") + " linked by the agent. Root cause: not confirmed."}
                </span>
                {sel.length > 1 && (
                    <button type="button" className="pc-tab" aria-pressed={sug} onClick={() => setSug(!sug)}>
                        {sug ? "Hide suggestion" : "Show suggested summary"}
                    </button>
                )}
                {sel.length > 1 && sug && (
                    <div className="pc-sug"><small>Suggested · unverified</small><span className={ph(p.suggestion).trim()}>{p.suggestion}</span></div>
                )}
            </div>
        </div>
    )
}

/* ---------- text fields: [key, panel title, default, long?] ---------- */
type Field = [string, string, string, boolean?]
const FIELDS: Field[] = [
    ["title", "Sidebar · Title", "3TFlow"],
    ["role", "Sidebar · Role", "UX design intern"],
    ["roleNote", "Sidebar · Role note", "SSK Technologies"],
    ["timeline", "Sidebar · Timeline", "[Timeline]"],
    ["projectType", "Overview · Project type", "Enterprise product design · internship"],
    ["domain", "Overview · Domain", "IT service management (ITSM)"],
    ["team", "Overview · Collaborators", "[Collaborators and stakeholders]"],
    ["tools", "Overview · Tools", "[Tools]"],
    ["scope", "Overview · Scope", "[Scope: the modules, workflows and screens I worked on]", true],
    ["status", "Overview · Status", "[Status: what shipped, what was explored, what remains conceptual]", true],
    ["backLabel", "Top bar · Back label", "Back to work"],
    ["menuLabel", "Top bar · Menu label", "menu"],
    ["hiddenSections", "Contents · Hide sections", ""],
    ["vhTitle", "Hero · Title overlay", ""],
    ["vhTranscript", "Hero · Transcript", "", true],
    ["ovHeadline", "Overview · Headline", "Making complex IT support workflows easier to navigate.", true],
    ["ovLead", "Overview · Lead", "An enterprise product-design project focused on the workflows, relationships, and interactions that help IT support teams manage tickets and coordinate service operations.", true],
    ["ovChallenge", "Overview · The challenge", "[The challenge in two or three sentences]", true],
    ["ovOwned", "Overview · What I owned", "[What I owned, one item per line]", true],
    ["ovShared", "Overview · Shared with the team", "[What was shared with the wider team, one item per line]", true],
    ["ndaNote", "Overview · Confidentiality note", "[Confidentiality: state what is shared with permission, what is anonymised, and which visuals are recreations rather than production screens.]", true],
    ["ctxHeading", "Context · Heading", "Understanding IT service management", true],
    ["ctxIntro", "Context · Plain-language intro", "A support ticket is a record of an issue, request, or operational task that needs to be tracked, assigned, and resolved.", true],
    ["ctxBody", "Context · Body (one paragraph per line)", "[Paragraph: how tickets, incidents, service requests and changes relate in this product]\n[Paragraph: the concepts needed to follow my design decisions, e.g. routing, SLAs, queues]", true],
    ["ctxConceptsLabel", "Context · Concepts label", "Concepts that matter here"],
    ["flowLabel", "Context · Flow label", "How a ticket moves through the system"],
    ["flowNote", "Context · Flow caption", "[Caption: describe the flow only as the product actually behaves]", true],
    ["probQuote", "Problem · Headline (use *asterisks* to highlight)", "[The problem in one bold line, with a *highlighted phrase*.]", true],
    ["probLabel", "Problem · Statement label", "Problem statement"],
    ["probStatement", "Problem · Statement", "[Problem statement: who struggles, with what, and why it matters.]", true],
    ["questionsLabel", "Problem · Questions label", "Questions investigated (not findings)"],
    ["challengesLabel", "Problem · Challenges label", "Design challenges"],
    ["iaHeading", "Research · Heading", "[Heading: how structure and requirements shaped the interface]", true],
    ["iaIntro", "Research · Intro", "[Describe the process that actually happened: requirements, collaboration, iteration. Do not claim research that did not take place.]", true],
    ["iaArtifactsLabel", "Research · Artifacts label", "Artifacts behind the structure"],
    ["rolesHeading", "Ecosystem · Heading", "Who uses the system, and how roles shape it", true],
    ["rolesIntro", "Ecosystem · Intro", "[Intro: how roles change navigation, access and what information is visible. Use the actual role names and permissions from the product.]", true],
    ["dcHeading", "Strategy · Heading", "[Heading: the decisions that mattered most]", true],
    ["dcIntro", "Strategy · Intro", "[Two or three substantial decisions, not every screen.]", true],
    ["wfHeading", "Solution · Workflows heading", "[Heading: designing the workflows]", true],
    ["wfIntro", "Solution · Workflows intro", "[Intro: which workflows you designed, and what each decision does for the person using it.]", true],
    ["cnHeading", "Solution · Concept heading", "Ticket relationships and the Problem Ticket concept", true],
    ["cnBadge", "Solution · Concept status badge", "Concept · design exploration · not a shipped feature"],
    ["cnIntro", "Solution · Concept intro", "[Describe the idea: helping an agent connect related tickets and investigate a possible common cause. Keep it labelled as a concept unless it shipped.]", true],
    ["cnSuggestion", "Solution · Concept suggested summary (demo)", "[Suggested summary wording, if the concept includes one]", true],
    ["cnNote", "Solution · Concept note on confirmed vs suggested", "[State how the concept keeps confirmed information, agent-selected links and suggestions visibly separate.]", true],
    ["prototypeLink", "Solution · Concept prototype link", ""],
    ["prototypeLabel", "Solution · Concept prototype button", "Open the concept prototype ↗"],
    ["ifHeading", "Solution · Interface heading", "[Heading: the final interface]", true],
    ["ifIntro", "Solution · Interface intro", "[Intro: which screens best show the scale and quality of your work, and which parts you personally designed.]", true],
    ["ouHeading", "Evaluation · Heading", "What was delivered, and what can be shown", true],
    ["ouDelivered", "Evaluation · Delivered", "[What was delivered, one per line]", true],
    ["ouEvidence", "Evaluation · Evidence", "[Stakeholder feedback, testing or implementation status you can show]", true],
    ["ouEval", "Evaluation · How it could be evaluated", "[If nothing was measured, say how the design could be evaluated]", true],
    ["dvHeading", "Reflection · Heading", "Collaboration, constraints and delivery", true],
    ["dvOwn", "Reflection · My responsibilities", "[My responsibilities, one per line]", true],
    ["dvShared", "Reflection · Shared decisions", "[Decisions shared with other team members, one per line]", true],
    ["dvConstraints", "Reflection · Constraints", "[Constraints, e.g. permissions, large interface system, changing requirements]", true],
    ["dvCollab", "Reflection · Developers and QA", "[How handoff, implementation and QA worked]", true],
    ["ouLearned", "Reflection · What I learned", "[What you learned about designing for complex products: information density, role-specific workflows, making relationships understandable.]", true],
    ["nextLabel", "Next · Label", "Next project"],
    ["nextTitle", "Next · Title", "Dentigo"],
]
const D: Record<string, string> = {}
FIELDS.forEach((f) => (D[f[0]] = f[2]))

/* ---------- list defaults ---------- */
const CONCEPTS = ["[Concept 1, e.g. incidents and service requests]", "[Concept 2, e.g. assignment and routing]", "[Concept 3, e.g. SLAs and queues]"]
const STAGES = ["[Stage 1]", "[Stage 2]", "[Stage 3]", "[Stage 4]"]
const QUESTIONS = [
    "How do support agents understand a ticket and determine the next action?",
    "How do different roles interact with the same service-management system?",
    "How does the interface communicate ownership, status, priority, and routing?",
    "How do users recognise relationships between multiple tickets?",
    "How can complex operational workflows be made more understandable without hiding important information?",
]
const CHALLENGES = [1, 2, 3].map((n) => ({
    title: "[Design challenge " + n + "]",
    text: "[What made this hard]",
    evidence: "[Evidence or constraint: requirement, brief, feedback or workflow observation]",
}))
const ROLES = ["Super Admin", "Support Admin", "Support Agent"].map((r) => ({
    role: r,
    summary: "[Responsibilities of this role. Confirm the real permissions before publishing.]",
    tasks: "[Key task]\n[Key task]",
    areas: "[Interface area]\n[Interface area]",
    access: "[What this role can see or change, and how that shapes navigation]",
}))
const ARTIFACTS = ["[User flows]", "[Information architecture]", "[Workflow diagrams]", "[Requirements and constraints]", "[Wireframes]"]
const IA_DECISIONS = [1, 2].map((n) => ({
    problem: "[Problem " + n + "]",
    evidence: "[Evidence or constraint]",
    decision: "[Design decision]",
    rationale: "[Rationale]",
}))
const WORKFLOWS = [
    "[Workflow 1: e.g. ticket creation and triage]",
    "[Workflow 2: e.g. assignment and routing]",
    "[Workflow 3: e.g. incident or service-request handling]",
].map((n) => ({
    name: n,
    summary: "[What this workflow lets someone do, and how the design supports it]",
    decisions: "[Decision about hierarchy, status, filtering, density or action placement]\n[Another decision]",
}))
const DECISIONS = [1, 2, 3].map((n) => ({
    title: "[Decision " + n + "]",
    challenge: "[The initial challenge]",
    alternatives: "[Alternatives considered]",
    decision: "[The decision made]",
    tradeoff: "[The trade-off or constraint]",
    result: "[The resulting design]",
}))
const TICKETS = ["[Ticket A · symptom]", "[Ticket B · symptom]", "[Ticket C · symptom]", "[Ticket D · symptom]"]
const SCREENS = [1, 2, 3, 4].map((n) => ({
    name: "[Screen group " + n + "]",
    caption: "[What this screen shows and why it matters]",
    notes: "[Annotation on a specific interface decision]",
}))

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Mona+Sans:wght@400;500;600;700;800&display=swap');
.pc{--ink:#1E1B2E;--soft:#2E3050;--quiet:#5A5E8C;--edge:rgba(255,255,255,.65);--glass:linear-gradient(145deg,rgba(255,255,255,.62) 0%,rgba(255,255,255,.34) 55%,rgba(255,255,255,.22) 100%);--lift:inset 0 1.5px 0 rgba(255,255,255,.85),inset 0 -1px 0 rgba(255,255,255,.25),0 18px 36px rgba(60,70,170,.12);display:flex;align-items:flex-start;width:100%;background:radial-gradient(circle at 88% 140px,rgba(255,217,163,.6) 0,rgba(255,217,163,0) 240px),linear-gradient(180deg,#BFD9FF 0%,#EAF3FF 22%,#DAD8FF 55%,#F8E9F2 78%,#F3EEE2 100%);color:var(--ink);font-family:'Mona Sans',Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;line-height:1.5}
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
.pc-sec:focus,.pc-sec0:focus{outline:none}
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
.pc-dark em{color:var(--a)}
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
.pc-phbox small{opacity:.75;max-width:420px}
.pc-disc{padding:16px 20px;border-radius:18px;background:var(--t);border:1px solid rgba(255,255,255,.7);font-size:14px;max-width:780px}
.pc-2{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.pc-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.pc-ctx{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start}
.pc-epi{font-size:clamp(24px,2.6vw,36px);font-weight:700;letter-spacing:-.03em;line-height:1.14;margin:0}
.pc-pq{font-size:clamp(30px,4.2vw,60px);font-weight:800;letter-spacing:-.04em;line-height:1.04;margin:0}
.pc-pl{font-size:11px;letter-spacing:.18em;text-transform:uppercase;opacity:.8;margin:0 0 10px}
.pc-ps{font-size:16.5px;line-height:1.65;color:rgba(255,255,255,.86);max-width:720px;margin:0}
.pc-flow{display:flex;flex-wrap:wrap;align-items:center;gap:10px}
.pc-flow .s{padding:12px 20px;border-radius:999px;background:rgba(255,255,255,.7);border:1px solid var(--edge);font-weight:600;font-size:14px}
.pc-flow i{font-style:normal;color:var(--ai)}
.pc-tabs{display:flex;flex-wrap:wrap;gap:8px}
.pc-tab{all:unset;box-sizing:border-box;cursor:pointer;padding:9px 18px;border-radius:999px;border:1px solid var(--edge);background:rgba(255,255,255,.55);font-size:13.5px;font-weight:600;color:var(--soft)}
.pc-tab.on,.pc-tab[aria-pressed=true]{background:var(--d);color:#fff}
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
.pc-legend{display:flex;flex-wrap:wrap;gap:16px;font-size:12.5px;color:var(--soft)}
.pc-legend span{display:inline-flex;align-items:center;gap:8px}
.pc-legend i{width:14px;height:14px;border-radius:50%;display:block}
.pc-legend .k1{background:var(--d)}.pc-legend .k2{background:var(--a)}.pc-legend .k3{background:transparent;border:2px dashed var(--ai)}
.pc-badge{display:inline-block;width:fit-content;padding:6px 14px;border:1px dashed rgba(48,55,59,.55);border-radius:999px;font-size:12px;letter-spacing:.06em;background:var(--t)}
.pc-nodes{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.pc-nd{all:unset;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;gap:6px;padding:16px;border-radius:18px;background:rgba(255,255,255,.65);border:1.5px solid var(--edge);font-size:14px;font-weight:600;color:var(--ink);min-height:110px}
.pc-nd small{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--quiet);font-weight:600}
.pc-nd.on{border-color:var(--a);background:var(--t)}
.pc-nd em{font-size:12px;font-weight:600}
.pc-prob{display:flex;flex-direction:column;align-items:flex-start;gap:10px;padding:20px 22px;border-radius:20px;background:var(--d);color:#fff;font-size:15px}
.pc-prob .pc-tab{background:rgba(255,255,255,.12);color:#fff;border-color:rgba(255,255,255,.3)}
.pc-sug{padding:14px 16px;border-radius:14px;border:2px dashed var(--a);font-size:14px}
.pc-sug small{display:block;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;opacity:.8;margin-bottom:4px}
.pc-gal{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.pc-fig{margin:0;display:flex;flex-direction:column;gap:12px}
.pc-fig .pc-stimg{aspect-ratio:16/10}
.pc-btn{display:inline-flex;align-items:center;width:fit-content;height:48px;padding:0 26px;border-radius:999px;background:var(--d);color:#fff!important;font-size:14px;font-weight:600}
.pc-next{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:44px 48px;border-radius:28px;background:var(--d);color:#fff;transition:transform .25s}
.pc-next small{display:block;font-size:11px;letter-spacing:.2em;text-transform:uppercase;opacity:.8;margin-bottom:8px}
.pc-next b{font-size:clamp(28px,3.4vw,46px);letter-spacing:-.03em;line-height:1.05}
.pc-next span{flex:none;width:56px;height:56px;border-radius:50%;background:var(--a);color:var(--d);display:flex;align-items:center;justify-content:center;font-size:24px}
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
.pc.compact .pc-ov,.pc.compact .pc-ctx,.pc.compact .pc-2,.pc.compact .pc-3,.pc.compact .pc-meta,.pc.compact .pc-panel,.pc.compact .pc-ba,.pc.compact .pc-gal{grid-template-columns:1fr}
.pc.compact .pc-nodes{grid-template-columns:1fr 1fr}
.pc.compact .pc-tint{padding:30px 22px}
.pc.compact .pc-dark{padding:34px 24px}
.pc.compact .pc-next{flex-direction:column;align-items:flex-start;padding:30px 26px}
@media (prefers-reduced-motion:reduce){.pc *{transition:none!important;scroll-behavior:auto!important}.pc-load i{animation:none!important}}
`

function ThreeTFlowCaseStudy(props: any) {
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
    /* contents list: identical to the Lumi case study */
    const solutionOn = !hidden.has("solution") && !(hidden.has("workflows") && hidden.has("concept") && hidden.has("interface"))
    const defs: any[] = [
        { id: "overview", label: "Overview", on: true },
        { id: "context", label: "Context", num: true },
        { id: "problem", label: "Problem", num: true },
        { id: "research", label: "Research", num: true },
        { id: "ecosystem", label: "Ecosystem", num: true },
        { id: "strategy", label: "Strategy", num: true },
        { id: "solution", label: "Solution", num: true, on: solutionOn },
        { id: "evaluation", label: "Evaluation", num: true },
        { id: "reflection", label: "Reflection", num: true },
        { id: "next", label: "Next project", on: has(v("nextTitle")) },
    ].map((d) => ({ ...d, on: d.on === undefined ? !hidden.has(d.id) : d.on }))
    let counter = 0
    const secs = defs.filter((d) => d.on).map((d) => ({ ...d, n: d.num ? String(++counter).padStart(2, "0") : "" }))
    const sec = (id: string) => secs.find((s) => s.id === id)
    const idsKey = secs.map((s) => s.id).join(",")
    /* a page section belongs to a contents group; show it only if its group is on and it isn't hidden on its own */
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
    /* which section of the Solution group comes first on the page */
    const solFirst = !hidden.has("workflows") ? "workflows" : !hidden.has("concept") ? "concept" : "interface"

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
        "--a": props.accent || "#4F52D6",
        "--ai": props.accentInk || "#3A3DAA",
        "--t": props.tint || "#DDE2FF",
        "--d": props.dark || "#1F2347",
        "--m": props.muted || "#2B2F8F",
        ...(props.style || {}),
    }

    const meta: [string, string, boolean?][] = [
        ["Project type", v("projectType")],
        ["Domain", v("domain")],
        ["Timeline", v("timeline")],
        ["Role", [v("role"), v("roleNote")].filter(Boolean).join(" · ")],
        ["Collaborators", v("team")],
        ["Tools", v("tools")],
        ["Scope", v("scope"), true],
        ["Status", v("status"), true],
    ]
    const concepts = list("concepts", CONCEPTS).filter(has)
    const stages = list("flowStages", STAGES).filter(has)
    const questions = list("questions", QUESTIONS).filter(has)
    const challenges = list("challenges", CHALLENGES)
    const roles = list("roles", ROLES)
    const artifacts = list("artifacts", ARTIFACTS).filter(has)
    const iaDecisions = list("iaDecisions", IA_DECISIONS)
    const workflows = list("workflows", WORKFLOWS)
    const decisions = list("decisions", DECISIONS)
    const tickets = list("tickets", TICKETS)
    const screens = list("screens", SCREENS)

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
                        <div className="pc-img"><Img src={props.ovImage} label="Upload in “Overview · Image” (a key product screen you may share)" /></div>
                    </div>
                    {has(v("ovChallenge")) && (
                        <div className="pc-glass"><h3 className="pc-h3">The challenge</h3><Paras t={v("ovChallenge")} /></div>
                    )}
                    <div className="pc-2">
                        <div className="pc-glass"><h3 className="pc-h3">What I owned</h3><Lines t={v("ovOwned")} /></div>
                        <div className="pc-glass"><h3 className="pc-h3">Shared with the team</h3><Lines t={v("ovShared")} /></div>
                    </div>
                    {has(v("ndaNote")) && <div className={"pc-disc" + ph(v("ndaNote"))}>{rich(v("ndaNote"))}</div>}
                </section>

                {/* 01 context */}
                {on("context", "context") && (
                    <section className="pc-sec" {...sp("context", "context")}>
                        <Eye grp="context" />
                        <Tx t={v("ctxHeading")} as="h2" className="pc-h2" />
                        <div className="pc-tint">
                            <div className="pc-ctx">
                                <Tx t={v("ctxIntro")} className="pc-epi" />
                                <Paras t={v("ctxBody")} />
                            </div>
                        </div>
                        {concepts.length > 0 && (
                            <div>
                                <h3 className="pc-h3" style={{ marginBottom: 12 }}>{v("ctxConceptsLabel")}</h3>
                                <div className="pc-chips">{concepts.map((c: string, i: number) => <span key={i} className={ph(c).trim()}>{c}</span>)}</div>
                            </div>
                        )}
                        {stages.length > 0 && (
                            <div>
                                <h3 className="pc-h3" style={{ marginBottom: 12 }}>{v("flowLabel")}</h3>
                                <div className="pc-flow" role="list">
                                    {stages.map((s: string, i: number) => (
                                        <React.Fragment key={i}>
                                            <span className={"s" + ph(s)} role="listitem">{s}</span>
                                            {i < stages.length - 1 && <i aria-hidden="true">→</i>}
                                        </React.Fragment>
                                    ))}
                                </div>
                                <Tx t={v("flowNote")} className="pc-small" />
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
                        {questions.length > 0 && (
                            <div className="pc-glass">
                                <h3 className="pc-h3">{v("questionsLabel")}</h3>
                                <ul className="pc-list">{questions.map((q: string, i: number) => <li key={i}>{q}</li>)}</ul>
                            </div>
                        )}
                        {challenges.length > 0 && (
                            <div>
                                <h3 className="pc-h3" style={{ marginBottom: 14 }}>{v("challengesLabel")}</h3>
                                <div className="pc-3">
                                    {challenges.map((c: any, i: number) => (
                                        <div className="pc-glass" key={i}>
                                            <Tx t={c.title} as="h3" className="pc-h3" />
                                            <Tx t={c.text} className="pc-small" />
                                            <Row k="Evidence or constraint" t={c.evidence} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* 03 research: discovery and information architecture */}
                {on("research", "research") && (
                    <section className="pc-sec" {...sp("research", "research")}>
                        <Eye grp="research" />
                        <Tx t={v("iaHeading")} as="h2" className="pc-h2" />
                        <Tx t={v("iaIntro")} className="pc-lead" />
                        <div className="pc-ov" style={{ alignItems: "start" }}>
                            <div>
                                {artifacts.length > 0 && (
                                    <><h3 className="pc-h3" style={{ marginBottom: 12 }}>{v("iaArtifactsLabel")}</h3>
                                    <div className="pc-chips">{artifacts.map((a: string, i: number) => <span key={i} className={ph(a).trim()}>{a}</span>)}</div></>
                                )}
                            </div>
                            <div className="pc-stimg"><Img src={props.iaImage} label="Upload the information architecture or flow diagram" /></div>
                        </div>
                        <div className="pc-2">
                            {iaDecisions.map((d: any, i: number) => (
                                <div className="pc-glass" key={i}>
                                    <Row k="Problem" t={d.problem} />
                                    <Row k="Evidence or constraint" t={d.evidence} />
                                    <Row k="Design decision" t={d.decision} />
                                    <Row k="Rationale" t={d.rationale} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 04 ecosystem: users, roles and system complexity */}
                {on("ecosystem", "ecosystem") && (
                    <section className="pc-sec" {...sp("ecosystem", "ecosystem")}>
                        <Eye grp="ecosystem" />
                        <Tx t={v("rolesHeading")} as="h2" className="pc-h2" />
                        <Tx t={v("rolesIntro")} className="pc-lead" />
                        <RoleExplorer roles={roles} />
                    </section>
                )}

                {/* 05 strategy: key design decisions */}
                {on("strategy", "strategy") && (
                    <section className="pc-sec" {...sp("strategy", "strategy")}>
                        <Eye grp="strategy" />
                        <Tx t={v("dcHeading")} as="h2" className="pc-h2" />
                        <Tx t={v("dcIntro")} className="pc-lead" />
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            {decisions.map((d: any, i: number) => (
                                <details className="pc-det" key={i} open={i === 0}>
                                    <summary className={ph(d.title).trim()}>{String(i + 1).padStart(2, "0")} · {d.title}</summary>
                                    <div className="in">
                                        <Row k="Initial challenge" t={d.challenge} />
                                        <Row k="Alternatives considered" t={d.alternatives} />
                                        <Row k="Decision made" t={d.decision} />
                                        <Row k="Trade-off or constraint" t={d.tradeoff} />
                                        <Row k="Resulting design" t={d.result} />
                                        <div className="pc-ba">
                                            <figure><div className="pc-stimg"><Img src={d.before} label="Earlier iteration or wireframe" /></div><figcaption>Before</figcaption></figure>
                                            <figure><div className="pc-stimg"><Img src={d.after} label="Final screen" /></div><figcaption>After</figcaption></figure>
                                        </div>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </section>
                )}

                {/* 06 solution: workflows, concept, final interface (one contents entry) */}
                {on("workflows", "solution") && (
                    <section className="pc-sec" {...sp("workflows", "solution", solFirst === "workflows")}>
                        <Eye grp="solution" sub="Workflows" />
                        <Tx t={v("wfHeading")} as="h2" className="pc-h2" />
                        <Tx t={v("wfIntro")} className="pc-lead" />
                        <WorkflowViewer items={workflows} />
                    </section>
                )}
                {on("concept", "solution") && (
                    <section className="pc-sec" {...sp("concept", "solution", solFirst === "concept")}>
                        <Eye grp="solution" sub="Concept" />
                        <Tx t={v("cnHeading")} as="h2" className="pc-h2" />
                        <Tx t={v("cnIntro")} className="pc-lead" />
                        <ConceptMap tickets={tickets} suggestion={v("cnSuggestion")} badge={v("cnBadge")} />
                        <Tx t={v("cnNote")} className="pc-small" />
                        <div className="pc-stimg" style={{ aspectRatio: "16/9" }}><Img src={props.cnImage} label="Upload concept screens here, kept separate from shipped-product screens" /></div>
                        {has(v("prototypeLink")) && <a className="pc-btn" href={v("prototypeLink")} target="_blank" rel="noopener noreferrer">{v("prototypeLabel")}</a>}
                    </section>
                )}
                {on("interface", "solution") && (
                    <section className="pc-sec" {...sp("interface", "solution", solFirst === "interface")}>
                        <Eye grp="solution" sub="Interface" />
                        <Tx t={v("ifHeading")} as="h2" className="pc-h2" />
                        <Tx t={v("ifIntro")} className="pc-lead" />
                        <div className="pc-gal">
                            {screens.map((s: any, i: number) => (
                                <figure className="pc-fig" key={i}>
                                    <div className="pc-stimg"><Img src={s.image} label={"Upload in Screens · " + (i + 1) + " (anonymised, shareable)"} /></div>
                                    <Tx t={s.name} as="h3" className="pc-h3" />
                                    <Tx t={s.caption} className="pc-small" />
                                    <Lines t={s.notes} />
                                </figure>
                            ))}
                        </div>
                    </section>
                )}

                {/* 07 evaluation: outcomes and evidence */}
                {on("evaluation", "evaluation") && (
                    <section className="pc-sec" {...sp("evaluation", "evaluation")}>
                        <Eye grp="evaluation" />
                        <Tx t={v("ouHeading")} as="h2" className="pc-h2" />
                        <div className="pc-3">
                            <div className="pc-glass"><h3 className="pc-h3">Delivered</h3><Lines t={v("ouDelivered")} /></div>
                            <div className="pc-glass"><h3 className="pc-h3">Evidence</h3><Lines t={v("ouEvidence")} /></div>
                            <div className="pc-glass"><h3 className="pc-h3">How it could be evaluated</h3><Lines t={v("ouEval")} /></div>
                        </div>
                    </section>
                )}

                {/* 08 reflection: collaboration, constraints, delivery, what I learned */}
                {on("reflection", "reflection") && (
                    <section className="pc-sec" {...sp("reflection", "reflection")}>
                        <Eye grp="reflection" />
                        <Tx t={v("dvHeading")} as="h2" className="pc-h2" />
                        <div className="pc-2">
                            <div className="pc-glass"><h3 className="pc-h3">My responsibilities</h3><Lines t={v("dvOwn")} /></div>
                            <div className="pc-glass"><h3 className="pc-h3">Decisions shared with the team</h3><Lines t={v("dvShared")} /></div>
                            <div className="pc-glass"><h3 className="pc-h3">Constraints</h3><Lines t={v("dvConstraints")} /></div>
                            <div className="pc-glass"><h3 className="pc-h3">Developers and QA</h3><Paras t={v("dvCollab")} /></div>
                        </div>
                        {has(v("ouLearned")) && (
                            <div className="pc-tint"><h3 className="pc-h3">What I learned</h3><Paras t={v("ouLearned")} /></div>
                        )}
                    </section>
                )}

                {sec("next") && (
                    <section {...sp("next", "next")}>
                        <a className="pc-next" href={props.nextLink || "/dentigo"}>
                            <div><small>{v("nextLabel")}</small><b>{v("nextTitle")}</b></div>
                            <span aria-hidden="true">→</span>
                        </a>
                    </section>
                )}
            </main>
        </div>
    )
}

ThreeTFlowCaseStudy.displayName = "3TFlow Case Study"
export default ThreeTFlowCaseStudy

const controls: any = {}
FIELDS.forEach(([key, title, def, long]) => {
    controls[key] = { type: ControlType.String, title, defaultValue: def, displayTextArea: !!long }
})
const text = (title: string, long = true) => ({ type: ControlType.String, title, defaultValue: "", displayTextArea: long })
const img = (title: string) => ({ type: ControlType.ResponsiveImage, title })
const arr = (title: string, fields: any, def: any[]) => ({
    type: ControlType.Array, title, control: { type: ControlType.Object, controls: fields }, defaultValue: def,
})
const strs = (title: string, def: string[]) => ({ type: ControlType.Array, title, control: { type: ControlType.String }, defaultValue: def })
Object.assign(controls, {
    concepts: strs("Context · Concepts", CONCEPTS),
    flowStages: strs("Context · Flow stages", STAGES),
    questions: strs("Problem · Questions", QUESTIONS),
    challenges: arr("Problem · Design challenges", { title: text("Title", false), text: text("Text"), evidence: text("Evidence or constraint") }, CHALLENGES),
    artifacts: strs("Research · Artifacts", ARTIFACTS),
    iaDecisions: arr("Research · Decisions", { problem: text("Problem"), evidence: text("Evidence or constraint"), decision: text("Decision"), rationale: text("Rationale") }, IA_DECISIONS),
    roles: arr("Ecosystem · Roles", { role: text("Role name", false), summary: text("Summary"), tasks: text("Key tasks (one per line)"), areas: text("Interface areas (one per line)"), access: text("Access and visibility") }, ROLES),
    decisions: arr("Strategy · Decisions", { title: text("Title", false), challenge: text("Challenge"), alternatives: text("Alternatives"), decision: text("Decision"), tradeoff: text("Trade-off"), result: text("Result"), before: img("Before"), after: img("After") }, DECISIONS),
    workflows: arr("Solution · Workflows", { name: text("Name", false), summary: text("Summary"), decisions: text("Decisions (one per line)"), image: img("Diagram or screens") }, WORKFLOWS),
    tickets: strs("Solution · Concept demo tickets", TICKETS),
    screens: arr("Solution · Interface screen groups", { name: text("Name", false), caption: text("Caption"), notes: text("Annotations (one per line)"), image: img("Screenshot") }, SCREENS),
    navStyle: {
        type: ControlType.Enum, title: "Nav style", defaultValue: "glass",
        options: ["glass", "minimal", "hidden"], optionTitles: ["Glass", "Minimal", "Hidden"], displaySegmentedControl: true,
    },
    showHero: { type: ControlType.Boolean, title: "Hero · Show", defaultValue: true, enabledTitle: "Show", disabledTitle: "Hide" },
    heroAutoplay: { type: ControlType.Boolean, title: "Hero · Muted autoplay loop", defaultValue: false, enabledTitle: "On", disabledTitle: "Off" },
    heroVideo: { type: ControlType.File, title: "Hero · Video file", allowedFileTypes: ["mp4", "webm", "mov"] },
    heroPoster: img("Hero · Poster"),
    ovImage: img("Overview · Image"),
    iaImage: img("Research · Diagram"),
    cnImage: img("Solution · Concept screens"),
    backLink: { type: ControlType.Link, title: "Top bar · Back link" },
    menuLink: { type: ControlType.Link, title: "Top bar · Menu link" },
    nextLink: { type: ControlType.Link, title: "Next · Link" },
    accent: { type: ControlType.Color, title: "Style · Accent", defaultValue: "#4F52D6" },
    accentInk: { type: ControlType.Color, title: "Style · Accent (text)", defaultValue: "#3A3DAA" },
    tint: { type: ControlType.Color, title: "Style · Soft tint", defaultValue: "#DDE2FF" },
    dark: { type: ControlType.Color, title: "Style · Dark panel", defaultValue: "#1F2347" },
    muted: { type: ControlType.Color, title: "Style · Sidebar ink", defaultValue: "#2B2F8F" },
})
addPropertyControls(ThreeTFlowCaseStudy, controls)
