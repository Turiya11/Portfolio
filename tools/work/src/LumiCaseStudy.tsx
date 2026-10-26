import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

/**
 * Lumi · Case study
 * Same shell as the portfolio's Work Case Study (sticky glass sidebar, contents nav, Back to work + menu)
 * with a Lumi-specific narrative. Every statement comes from the project's published page.
 * Anything not yet documented is shown as a clearly marked "To add" placeholder (toggle: "Show to-do markers").
 *
 * Order: top bar → CaseStudyVideoHero → Overview → Context → Problem → Research → Ecosystem → Strategy →
 *        Solution → Evaluation → Reflection → Next project.
 * The video hero sits OUTSIDE every contents target, so "Overview" always scrolls to Overview.
 *
 * Contents navigation: real <a href="#cs-{id}"> links to <section id="cs-{id}">; smooth scroll (instant under
 * reduced-motion); active item updates on click and while scrolling; sticky chip bar on narrow layouts.
 * Hide a section (and its link) with "Contents · Hide sections", e.g.  evaluation, strategy
 *
 * Lumi accents: rose #E2798D, charcoal #30373B, cream #FCE5BB, layered on the portfolio's blue glass.
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1280
 * @framerIntrinsicHeight 7600
 */

/* ---------- assets already used on the published Lumi page ---------- */
const img = (id: string) =>
    `https://framerusercontent.com/images/${id}.png?scale-down-to=1024`

const A = {
    hero: img("zEPiYBCxECi75KbJMM8tLgP2x3w"),
}

const PERSONAS = [
    {
        name: "The Silent Struggler",
        who: "Mother",
        stage: "Week 3–16 postpartum",
        tag: "Feels emotionally overwhelmed",
        mind: "Something is wrong… but I can’t say it. I should be able to handle this alone.",
        src: img("MSrWLnItMvvUOAk2hFNjsQ7NVVk"),
        w: 704,
        h: 1006,
    },
    {
        name: "The Hyper-Responsible Fixer",
        who: "Partner / father",
        stage: "New father, week 1–12 postpartum",
        tag: "Wants to help but feels unsure",
        mind: "I need to fix this for her.",
        src: img("rwT14cOeezON1u91oCwXmVk5GA"),
        w: 939,
        h: 1206,
    },
    {
        name: "The Well-Meaning Minimizer",
        who: "Parents, in-laws",
        stage: "Wider family",
        tag: "Believes this phase is temporary",
        mind: "We’ve all gone through this. She’ll be fine.",
        src: img("QVwbSs0yhqbKAkgDLoCskZX7RM"),
        w: 1024,
        h: 1536,
    },
]

const STORYBOARD = [
    {
        t: "3AM, Alone",
        d: "Neha sits awake in the quiet darkness, emotionally exhausted while caring for her newborn as the weight of motherhood silently builds.",
        src: img("RtBHy475FWRwisQWQLgLNhsSkqU"),
    },
    {
        t: "The Gentle Check-In",
        d: "Neha opens Lumi and logs her feelings through a simple emotional check-in, taking the first small step toward awareness.",
        src: img("d5JRuA4R17m4ML9ky0Szoltf00"),
    },
    {
        t: "Lumi Notices the Pattern",
        d: "After days of emotional tracking, Lumi gently identifies that Neha’s feelings may be lasting longer than typical baby blues.",
        src: img("fLjlXF4wH4pwFW4EvhjNjKLzd4I"),
    },
    {
        t: "Rohan Gets a Signal",
        d: "Lumi’s companion mode helps Rohan understand Neha’s emotional state, encouraging empathy instead of problem-solving.",
        src: img("0IkBaKVwzSahEso74S7EydqBJqU"),
    },
    {
        t: "Support Through Presence",
        d: "Using Lumi’s conversation prompts, Rohan chooses quiet emotional support, simply sitting beside Neha and listening.",
        src: img("H6dSpB4VEDGbPaSidcYxmeUCEkA"),
    },
    {
        t: "Family Understanding Begins",
        d: "Rohan shares Lumi’s Family Awareness Card with the in-laws, helping shift the conversation from dismissal to understanding and care.",
        src: img("wijwbxWPIqKdDPTgOe1iqki4vg"),
    },
]

const STEPS = [
    {
        tag: "For the mother",
        title: "Check in, in a few taps",
        text: "Fourteen emotion options, from Great and Peaceful to Anxious, Numb and Stressed, make naming a feeling quick. The response validates instead of diagnosing: after she logs “tired”, Lumi says being tired doesn’t mean she’s failing, then suggests small actions such as a glass of water, one slow breath, or a short grounding exercise.",
        notes: [
            "Responds to the research insight that mothers hesitate to express distress.",
            "The app is organised in four tabs: Home, My tasks, Support, Journal.",
        ],
    },
    {
        tag: "For the mother",
        title: "Notice a pattern, gently",
        text: "When lower moods repeat, Lumi surfaces a plain-language notice (in the prototype, four consecutive days) and suggests talking it over with a partner or healthcare provider, with a link to “baby blues vs PPD”. It points toward people, not toward a verdict.",
        notes: [
            "The trigger shown is an illustrative example; a real threshold would need clinical input.",
        ],
    },
    {
        tag: "For the mother",
        title: "Say it privately, in text or voice",
        text: "“Bring it all out” is a private journal with starting prompts such as “Today I felt…” and “What I wish someone knew…”, plus a way to record her thoughts. Check-ins can be shared with a partner by invitation.",
        notes: [
            "Journal entries are marked private; shared check-ins are a separate, opt-in view.",
        ],
    },
    {
        tag: "For the partner",
        title: "Understand before fixing",
        text: "A companion view tells the partner when she may need extra support, then offers guidance: understand what she may be feeling, offer practical help, don’t immediately problem-solve, encourage rest without guilt. “What do I say?” adds situation-based prompts, such as when she is crying or overwhelmed.",
        notes: [
            "Answers the “Hyper-Responsible Fixer” pattern found in research.",
            "“Ask Lumi” is a design concept and its guidance copy is illustrative.",
        ],
    },
    {
        tag: "For the wider family",
        title: "Bring the family along",
        text: "A short, non-clinical explainer, “Understanding Modern PPD”, speaks to relatives who may think “she’ll be fine”, and suggests concrete actions such as a daily call. In the storyboard, a Family Awareness Card shared by the partner moves the conversation from dismissal to understanding.",
        notes: [
            "Answers the “Well-Meaning Minimizer” pattern found in research.",
        ],
    },
]

const PRINCIPLES = [
    {
        t: "Let her express before she explains",
        d: "Naming a feeling should take seconds and carry no label. Check-ins and a private journal give mothers a low-risk way to say something.",
        g: "Insight: mothers hesitate to express distress.",
    },
    {
        t: "Notice patterns, point to people",
        d: "Lumi highlights what repeats and then points toward a partner or healthcare provider. It does not name a condition.",
        g: "Design question: create early awareness without medicalising the experience.",
    },
    {
        t: "Help partners be present, not fix",
        d: "Guidance replaces generic internet advice with a few clear actions and words, and gently discourages immediate problem-solving.",
        g: "Persona: the Hyper-Responsible Fixer.",
    },
    {
        t: "Give the family a shared picture",
        d: "Shared check-ins and an awareness card give relatives the same plain-language understanding, so support stops depending on guesswork.",
        g: "Insight: families miss emotional warning signs.",
    },
    {
        t: "Close the gap between noticing and acting",
        d: "Every surface offers a next step, such as talking to someone, reading verified information, or seeing a professional.",
        g: "Insight: emotional support often comes too late.",
    },
]

const TRADEOFFS = [
    {
        t: "Privacy vs. family awareness",
        d: "The journal is private while check-ins can be shared. This keeps a safe space for her words while letting the family see how she is doing, but only by invitation.",
    },
    {
        t: "Noticing vs. medicalising",
        d: "A pattern notice can help or alarm. Lumi’s wording stays gentle and suggests conversation, not a conclusion.",
    },
    {
        t: "Clarity vs. information overload",
        d: "Partner guidance is short and action-led instead of an article library, trading depth for something a tired person can use in the moment.",
    },
]

const HMW = [
    "How might we create safe ways for mothers to express feelings without fear of judgment or labeling?",
    "How might we help new mothers differentiate between baby blues and early signs of PPD without causing panic?",
    "How might we enable fathers to support emotionally instead of trying to “fix” the situation?",
    "How might we help families recognize emotional distress without dismissing it as weakness?",
    "How might we reduce the gap between symptom recognition and action?",
    "How might we design for the family as a unit, not just the mother, in postpartum mental health?",
]

type Field = [string, string, string, boolean?]
const FIELDS: Field[] = [
    ["title", "Sidebar · Title", "Lumi."],
    ["role", "Sidebar · Role", "User research · Interaction design"],
    ["roleNote", "Sidebar · Role note", "academic project"],
    ["timeline", "Sidebar · Timeline", "12 weeks"],
    ["team", "Overview · Team", ""],
    ["tools", "Overview · Tools", "Figma"],
    [
        "scope",
        "Overview · Scope",
        "System mapping, personas, user journey, ideation, information architecture, lo-fi wireframes, hi-fi prototype",
        true,
    ],
    [
        "status",
        "Overview · Status",
        "Academic concept with a high-fidelity prototype. Not a launched product.",
        true,
    ],
    ["backLabel", "Top bar · Back label", "Back to work"],
    ["menuLabel", "Top bar · Menu label", "menu"],
    ["hiddenSections", "Contents · Hide sections", ""],
    ["vhNavLabel", "Video hero · Contents label", "Preview"],
    ["vhTitle", "Video hero · Title overlay", ""],
    ["vhTranscript", "Video hero · Transcript", "", true],
    ["methodDetail", "Research · Participants & method detail", "", true],
    ["evalTested", "Evaluation · What was tested", "", true],
    ["evalParticipants", "Evaluation · Participants", "", true],
    ["evalLearned", "Evaluation · What was learned", "", true],
    ["evalChanged", "Evaluation · What changed as a result", "", true],
    [
        "reflectionPersonal",
        "Reflection · How Lumi shaped my UX / HCI thinking",
        "",
        true,
    ],
    [
        "prototypeLink",
        "Solution · Prototype link",
        "https://www.figma.com/proto/ej8YddthuaGL8rEengyDms/UX-Studio-Sem6?node-id=56-4650&viewport=-53%2C-1621%2C0.29&t=1dSYAobHJgRg7rOF-1&scaling=contain&content-scaling=fixed&starting-point-node-id=56%3A4650&page-id=45%3A16",
    ],
    ["nextLabel", "Next · Label", "Next project"],
    ["nextTitle", "Next · Title", "Encora Internship"],
]
const D: Record<string, string> = {}
FIELDS.forEach((f) => (D[f[0]] = f[2]))

/* ---------- helpers ---------- */
const rich = (text: string): React.ReactNode[] =>
    text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((p, i) => {
        if (/^\*\*[^*]+\*\*$/.test(p))
            return <strong key={i}>{p.slice(2, -2)}</strong>
        if (/^\*[^*]+\*$/.test(p)) return <em key={i}>{p.slice(1, -1)}</em>
        return p
    })

const paras = (text: string) =>
    text
        .split(/\n+/)
        .map((s) => s.trim())
        .filter(Boolean)
        .map((p, i) => <p key={i}>{rich(p)}</p>)

const prefersReduced = () =>
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

const fmt = (t: number) => {
    const s = isFinite(t) && t > 0 ? t : 0
    return Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0")
}

const Icon = ({ d }: { d: string }) => (
    <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        focusable="false"
    >
        <path d={d} fill="currentColor" />
    </svg>
)
const I_PLAY = "M8 5v14l11-7z"
const I_PAUSE = "M6 5h4v14H6zM14 5h4v14h-4z"
const I_VOL =
    "M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4z"
const I_MUTE =
    "M3 9v6h4l5 5V4L7 9H3zm13.6 3 2.4-2.4-1.4-1.4-2.4 2.4-2.4-2.4-1.4 1.4 2.4 2.4-2.4 2.4 1.4 1.4 2.4-2.4 2.4 2.4 1.4-1.4z"

const Todo = ({ on, children }: { on: boolean; children: React.ReactNode }) =>
    on ? <span className="lm-todo">To add · {children}</span> : null

/* ---------- CaseStudyVideoHero ----------
 * Reusable 16:9 hero for any case study. Real file or a clearly labelled placeholder; never autoplays.
 * Poster + fallback image, custom accessible play/pause, seek, mute, optional title overlay,
 * loading state, captions track (.vtt) and an expandable transcript. */
function CaseStudyVideoHero(p: {
    src?: string
    poster?: any
    title?: string
    captions?: string
    transcript?: string
    name?: string
}) {
    const ref = React.useRef<HTMLVideoElement>(null)
    const [playing, setPlaying] = React.useState(false)
    const [ready, setReady] = React.useState(false)
    const [buffering, setBuffering] = React.useState(false)
    const [failed, setFailed] = React.useState(false)
    const [muted, setMuted] = React.useState(false)
    const [time, setTime] = React.useState(0)
    const [dur, setDur] = React.useState(0)

    const posterSrc: string | undefined = p.poster?.src
    const label = p.title || (p.name ? p.name + " video" : "Project video")
    const hasVideo = !!p.src && !failed

    React.useEffect(() => {
        setReady(false)
        setFailed(false)
        setPlaying(false)
        setTime(0)
    }, [p.src])

    React.useEffect(() => {
        if (ref.current) ref.current.muted = muted
    }, [muted, hasVideo])

    const toggle = () => {
        const v = ref.current
        if (!v) return
        if (v.paused) {
            const r = v.play()
            if (r && r.catch) r.catch(() => setPlaying(false))
        } else v.pause()
    }

    return (
        <div
            className={"cs-card cs-vh" + (playing ? " playing" : "")}
            role="group"
            aria-label={label}
            aria-busy={hasVideo && !ready}
        >
            <div
                className={
                    "cs-vh-frame" + (!hasVideo && !posterSrc ? " empty" : "")
                }
            >
                {hasVideo ? (
                    <video
                        ref={ref}
                        className="cs-vh-media"
                        src={p.src}
                        poster={posterSrc}
                        preload="metadata"
                        playsInline
                        crossOrigin={p.captions ? "anonymous" : undefined}
                        aria-label={label}
                        onClick={toggle}
                        onLoadedMetadata={(e) => {
                            setReady(true)
                            setDur(e.currentTarget.duration || 0)
                        }}
                        onDurationChange={(e) =>
                            setDur(e.currentTarget.duration || 0)
                        }
                        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
                        onPlay={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
                        onEnded={() => setPlaying(false)}
                        onWaiting={() => setBuffering(true)}
                        onPlaying={() => {
                            setBuffering(false)
                            setPlaying(true)
                        }}
                        onCanPlay={() => setBuffering(false)}
                        onError={() => setFailed(true)}
                    >
                        {p.captions && (
                            <track
                                kind="captions"
                                src={p.captions}
                                srcLang="en"
                                label="English"
                                default
                            />
                        )}
                    </video>
                ) : posterSrc ? (
                    <img
                        className="cs-vh-media"
                        src={posterSrc}
                        srcSet={p.poster?.srcSet}
                        alt={p.poster?.alt || ""}
                    />
                ) : null}

                {!hasVideo && (
                    <div className="cs-vh-ph" role="status">
                        <span>
                            {failed
                                ? "This video couldn’t be loaded."
                                : "Video placeholder · upload your Lumi prototype walkthrough in the “Video hero · Video file” control"}
                        </span>
                    </div>
                )}

                {hasVideo && (!ready || buffering) && (
                    <div className="cs-vh-load" role="status">
                        <i />
                        Loading video…
                    </div>
                )}

                {p.title && <div className="cs-vh-title">{p.title}</div>}

                {hasVideo && ready && !playing && (
                    <button
                        type="button"
                        className="cs-vh-big"
                        aria-hidden="true"
                        tabIndex={-1}
                        onClick={toggle}
                    >
                        <Icon d={I_PLAY} />
                    </button>
                )}

                {hasVideo && ready && (
                    <div className="cs-vh-bar">
                        <button
                            type="button"
                            className="cs-vh-btn"
                            onClick={toggle}
                            aria-label={playing ? "Pause video" : "Play video"}
                        >
                            <Icon d={playing ? I_PAUSE : I_PLAY} />
                        </button>
                        <input
                            className="cs-vh-seek"
                            type="range"
                            min={0}
                            max={dur || 0}
                            step={0.1}
                            value={Math.min(time, dur || 0)}
                            aria-label="Seek"
                            aria-valuetext={fmt(time) + " of " + fmt(dur)}
                            onChange={(e) => {
                                const t = Number(e.target.value)
                                if (ref.current) ref.current.currentTime = t
                                setTime(t)
                            }}
                        />
                        <span className="cs-vh-time" aria-hidden="true">
                            {fmt(time)} / {fmt(dur)}
                        </span>
                        <button
                            type="button"
                            className="cs-vh-btn ghost"
                            onClick={() => setMuted(!muted)}
                            aria-label={muted ? "Unmute video" : "Mute video"}
                            aria-pressed={muted}
                        >
                            <Icon d={muted ? I_MUTE : I_VOL} />
                        </button>
                    </div>
                )}
            </div>

            {p.transcript && (
                <details className="cs-vh-tr">
                    <summary>Transcript</summary>
                    <div className="lm-p">{paras(p.transcript)}</div>
                </details>
            )}
        </div>
    )
}

/* ---------- ecosystem map (built only from the labels in the project's system map) ---------- */
function EcosystemMap() {
    return (
        <div className="lm-ecowrap">
            <svg
                className="lm-eco"
                viewBox="0 0 960 610"
                role="img"
                aria-labelledby="lm-eco-t lm-eco-d"
            >
                <title id="lm-eco-t">Postpartum support ecosystem</title>
                <desc id="lm-eco-d">
                    Inside a shared home, the mother, her partner and her
                    in-laws relate to one another and to the newborn. The
                    mother discloses hesitantly to the healthcare provider and
                    avoids or delays the EPDS screening tool that providers
                    should use. Stigma, low literacy and no guidance are
                    barriers to recognition, leading to delayed detection and
                    worse outcomes.
                </desc>
                <defs>
                    <marker
                        id="lm-arr"
                        viewBox="0 0 10 10"
                        refX="8"
                        refY="5"
                        markerWidth="7"
                        markerHeight="7"
                        orient="auto-start-reverse"
                    >
                        <path d="M0 0L10 5L0 10z" className="arrow" />
                    </marker>
                </defs>

                <rect className="home" x="16" y="16" width="928" height="340" rx="30" />
                <text className="lab" x="42" y="48">SHARED HOME ENVIRONMENT</text>

                {/* connectors */}
                <line className="ln" x1="250" y1="147" x2="375" y2="147" />
                <line className="ln" x1="585" y1="147" x2="710" y2="147" />
                <line className="ln" x1="145" y1="204" x2="145" y2="252" />
                <line className="ln" x1="220" y1="284" x2="400" y2="210" />
                <path className="ln" d="M480 210 C480 300 165 290 165 392" />
                <path className="ln" d="M540 210 C540 300 815 290 815 392" />
                <line className="ln" x1="290" y1="446" x2="710" y2="446" />
                <line className="ln" x1="470" y1="560" x2="520" y2="560" markerEnd="url(#lm-arr)" />

                {/* inside the home */}
                <rect className="node" x="40" y="90" width="210" height="114" rx="20" />
                <text className="t1" x="145" y="122" textAnchor="middle">Partner / father</text>
                <text className="t2" x="145" y="146" textAnchor="middle">Hyper-responsible fixer</text>
                <text className="t3" x="145" y="170" textAnchor="middle">Observes, tries to understand</text>

                <rect className="node mom" x="375" y="84" width="210" height="126" rx="20" />
                <text className="t1" x="480" y="118" textAnchor="middle">Mother</text>
                <text className="t2" x="480" y="142" textAnchor="middle">Silent struggler</text>
                <text className="t3" x="480" y="162" textAnchor="middle">weeks 3–16 postpartum</text>
                <text className="t3" x="480" y="186" textAnchor="middle">Shares little, fears judgement</text>

                <rect className="node" x="710" y="90" width="210" height="114" rx="20" />
                <text className="t1" x="815" y="122" textAnchor="middle">In-laws / family</text>
                <text className="t2" x="815" y="146" textAnchor="middle">Well-meaning minimizer</text>
                <text className="t3" x="815" y="170" textAnchor="middle">Tends to minimise</text>

                <rect className="node" x="40" y="252" width="180" height="64" rx="18" />
                <text className="t1" x="130" y="278" textAnchor="middle">Newborn / infant</text>
                <text className="t3" x="130" y="298" textAnchor="middle">Shared caregiving load</text>

                {/* relationship labels */}
                <text className="lbl" x="312" y="134" textAnchor="middle">wants to fix</text>
                <text className="lbl" x="312" y="165" textAnchor="middle">can’t express</text>
                <text className="lbl" x="648" y="134" textAnchor="middle">feels dismissed</text>
                <text className="lbl" x="648" y="165" textAnchor="middle">minimises</text>
                <text className="lbl" x="330" y="326" textAnchor="middle">hesitant disclosure</text>
                <text className="lbl" x="690" y="326" textAnchor="middle">avoids / delays</text>
                <text className="lbl" x="500" y="434" textAnchor="middle">should screen</text>

                {/* outside the home */}
                <rect className="node" x="40" y="392" width="250" height="108" rx="20" />
                <text className="t1" x="165" y="432" textAnchor="middle">Healthcare provider</text>
                <text className="t3" x="165" y="458" textAnchor="middle">OB-GYN · midwife · GP</text>

                <rect className="node" x="710" y="392" width="210" height="108" rx="20" />
                <text className="t1" x="815" y="432" textAnchor="middle">EPDS screening tool</text>
                <text className="t3" x="815" y="458" textAnchor="middle">Early-detection instrument</text>

                <rect className="node" x="40" y="530" width="430" height="60" rx="18" />
                <text className="t2" x="255" y="555" textAnchor="middle">Barriers to recognition</text>
                <text className="t3" x="255" y="576" textAnchor="middle">stigma · low literacy · no guidance</text>

                <rect className="out" x="520" y="530" width="400" height="60" rx="18" />
                <text className="o1" x="720" y="555" textAnchor="middle">Outcome</text>
                <text className="o2" x="720" y="576" textAnchor="middle">delayed detection · worse outcomes</text>
            </svg>
        </div>
    )
}

/* ---------- styles ---------- */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Mona+Sans:wght@400;500;600;700;800&display=swap');
.cs{--ink:#1E1B2E;--soft:#2E3050;--quiet:#5A5E8C;--rose:#E2798D;--rose-ink:#A93A57;--char:#30373B;--cream:#FCE5BB;--edge:rgba(255,255,255,.65);--glass:linear-gradient(145deg,rgba(255,255,255,.62) 0%,rgba(255,255,255,.34) 55%,rgba(255,255,255,.22) 100%);--lift:inset 0 1.5px 0 rgba(255,255,255,.85),inset 0 -1px 0 rgba(255,255,255,.25),0 18px 36px rgba(60,70,170,.12);display:flex;align-items:flex-start;width:100%;background:radial-gradient(circle at 88% 140px,rgba(255,217,163,.65) 0,rgba(255,217,163,0) 240px),linear-gradient(180deg,#BFD9FF 0%,#EAF3FF 22%,#DAD8FF 55%,#F8E9F2 78%,#F3EEE2 100%);color:var(--ink);font-family:'Mona Sans',Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;line-height:1.5}
.cs *{box-sizing:border-box}
.cs a{color:inherit;text-decoration:none}
.cs a:focus-visible,.cs summary:focus-visible{outline:2px solid var(--m);outline-offset:3px;border-radius:8px}
.cs-side{position:sticky;top:0;flex:none;width:232px;height:100vh;max-height:920px;overflow:auto;padding:30px 26px 26px;background:var(--glass);backdrop-filter:blur(18px) saturate(180%);-webkit-backdrop-filter:blur(18px) saturate(180%);border-right:1px solid var(--edge);display:flex;flex-direction:column}
.cs-title{font-size:21px;font-weight:700;line-height:1.02;letter-spacing:-.02em;margin:14px 0 34px}
.cs-label{font-size:10.5px;letter-spacing:.16em;color:var(--ink);margin-bottom:7px;text-transform:uppercase}
.cs-val{font-size:14px;color:var(--m);line-height:1.35}
.cs-note{font-size:12.5px;color:var(--ink);margin-top:2px}
.cs-meta{margin-bottom:22px}
.cs-nav{display:flex;flex-direction:column;margin-top:14px}
.cs-nav a{display:grid;grid-template-columns:36px 1fr;align-items:center;padding:7px 0;font-size:13px;color:var(--quiet);position:relative;transition:color .2s;cursor:pointer}
.cs-nav a:hover{color:var(--ink)}
.cs-nav .n{font-size:11px;color:var(--quiet);padding-left:14px}
.cs-nav a.on{color:var(--ink);font-weight:600}
.cs-nav a.on:before{content:'';position:absolute;left:0;top:50%;width:3px;height:18px;margin-top:-9px;background:var(--rose);border-radius:2px}
.cs-bar{display:none}
.cs-prog{margin-top:auto;padding-top:26px}
.cs-prog i{display:block;height:2px;background:rgba(48,55,59,.15);position:relative}
.cs-prog i b{position:absolute;left:0;top:0;bottom:0;background:var(--rose);transition:width .15s}
.cs-prog span{display:block;margin-top:10px;font-size:11px;color:var(--quiet);letter-spacing:.08em}
.cs-main{flex:1;min-width:0;padding:22px 26px 80px;display:flex;flex-direction:column;gap:26px}
.cs-top{display:flex;justify-content:space-between;align-items:center;padding:0 0 2px 0}
.cs-pill{display:inline-flex;align-items:center;gap:10px;height:40px;padding:0 24px;border:1px solid var(--edge);border-radius:999px;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--m);background:var(--glass);backdrop-filter:blur(18px) saturate(180%);-webkit-backdrop-filter:blur(18px) saturate(180%);box-shadow:var(--lift);transition:border-color .2s}
.cs-pill:hover{border-color:var(--rose)}
.cs-menu{display:inline-flex;align-items:center;gap:14px;height:44px;padding:0 30px;border-radius:999px;border:1px solid var(--edge);background:var(--glass);backdrop-filter:blur(18px) saturate(180%);-webkit-backdrop-filter:blur(18px) saturate(180%);box-shadow:var(--lift);font-size:13px;letter-spacing:.14em;color:var(--ink)}
.cs-menu i{display:block;width:17px;height:7px;border-top:1.5px solid var(--ink);border-bottom:1.5px solid var(--ink)}
.cs-sec{scroll-margin-top:16px}
.cs-sec:focus{outline:none}
.cs-card{position:relative;border:1px solid var(--edge);border-radius:28px;background:var(--glass);backdrop-filter:blur(18px) saturate(180%);-webkit-backdrop-filter:blur(18px) saturate(180%);box-shadow:var(--lift)}
.cs-vh{padding:14px;border-radius:28px}
.cs-vh-frame{position:relative;aspect-ratio:16/9;border-radius:20px;overflow:hidden;background:rgba(255,255,255,.4)}
.cs-vh-frame.empty{border:1px dashed rgba(48,55,59,.3);background:rgba(252,229,187,.35)}
.cs-vh-media{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block;cursor:pointer}
img.cs-vh-media{object-fit:cover;cursor:default}
.cs-vh-title{position:absolute;left:20px;top:20px;max-width:calc(100% - 40px);padding:9px 18px;border-radius:999px;border:1px solid var(--edge);background:var(--glass);backdrop-filter:blur(18px) saturate(180%);-webkit-backdrop-filter:blur(18px) saturate(180%);font-size:clamp(14px,1.6vw,20px);font-weight:700;letter-spacing:-.02em;color:var(--ink);transition:opacity .25s;pointer-events:none}
.cs-vh.playing .cs-vh-title{opacity:0}
.cs-vh-big{all:unset;box-sizing:border-box;position:absolute;left:50%;top:50%;width:84px;height:84px;margin:-42px 0 0 -42px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;border:1px solid var(--edge);background:var(--glass);backdrop-filter:blur(18px) saturate(180%);-webkit-backdrop-filter:blur(18px) saturate(180%);box-shadow:var(--lift);color:var(--ink)}
.cs-vh-big svg{width:34px;height:34px;margin-left:4px}
.cs-vh-bar{position:absolute;left:14px;right:14px;bottom:14px;display:flex;align-items:center;gap:12px;padding:7px 14px 7px 8px;border-radius:999px;border:1px solid var(--edge);background:var(--glass);backdrop-filter:blur(18px) saturate(180%);-webkit-backdrop-filter:blur(18px) saturate(180%);box-shadow:var(--lift)}
.cs-vh-btn{all:unset;box-sizing:border-box;flex:none;width:36px;height:36px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;background:var(--char);color:#fff}
.cs-vh-btn.ghost{background:transparent;color:var(--ink)}
.cs-vh-btn:focus-visible,.cs-vh-seek:focus-visible,.cs-vh-big:focus-visible{outline:2px solid var(--m);outline-offset:3px}
.cs-vh-seek{flex:1;min-width:0;height:20px;accent-color:var(--rose-ink);cursor:pointer}
.cs-vh-time{flex:none;font-size:12px;letter-spacing:.04em;color:var(--soft);font-variant-numeric:tabular-nums}
.cs-vh-load{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:inline-flex;align-items:center;gap:10px;padding:10px 18px;border-radius:999px;border:1px solid var(--edge);background:var(--glass);font-size:13px;color:var(--soft)}
.cs-vh-load i{display:block;width:16px;height:16px;border-radius:50%;border:2px solid rgba(48,55,59,.2);border-top-color:var(--rose-ink);animation:cs-spin .8s linear infinite}
@keyframes cs-spin{to{transform:rotate(360deg)}}
.cs-vh-ph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center}
.cs-vh-ph span{max-width:100%;padding:10px 18px;border-radius:999px;border:1px solid var(--edge);background:var(--glass);font-size:13px;color:var(--soft)}
.cs-vh-tr{margin:14px 10px 6px}
.cs-vh-tr summary{cursor:pointer;width:fit-content;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--quiet);padding:6px 0}
.cs-next{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:44px 48px;border-radius:28px;background:var(--char);color:#fff;transition:transform .25s}
.cs-next small{display:block;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--cream);margin-bottom:8px}
.cs-next b{font-size:clamp(28px,3.4vw,46px);letter-spacing:-.03em;line-height:1.05}
.cs-next span{flex:none;width:56px;height:56px;border-radius:50%;background:var(--rose);color:var(--char);display:flex;align-items:center;justify-content:center;font-size:24px}
.cs-next:hover{transform:translateY(-3px)}
.cs a.cs-next:focus-visible{outline-color:var(--rose);outline-offset:4px;border-radius:28px}

.lm-sec{display:flex;flex-direction:column;gap:30px;padding:46px 8px 22px}
.lm-eyebrow{display:flex;align-items:center;gap:12px;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--quiet);margin:0 0 -8px}
.lm-eyebrow b{color:var(--rose-ink);font-weight:700}
.lm-h1{font-size:clamp(40px,5.6vw,80px);font-weight:800;letter-spacing:-.045em;line-height:.96;margin:0;max-width:900px}
.lm-h2{font-size:clamp(30px,3.8vw,54px);font-weight:700;letter-spacing:-.035em;line-height:1.04;margin:0;max-width:820px}
.lm-h3{font-size:20px;font-weight:700;letter-spacing:-.02em;line-height:1.15;margin:0 0 8px}
.lm-lead{font-size:clamp(18px,1.6vw,22px);line-height:1.5;color:var(--soft);max-width:680px;margin:0}
.lm-p{font-size:16.5px;line-height:1.65;color:var(--soft);max-width:640px}
.lm-p p{margin:0 0 14px}
.lm-p strong,.lm-lead strong{color:var(--rose-ink);font-weight:700}
.lm-small{font-size:13.5px;line-height:1.5;color:var(--quiet);margin:0}
.lm-glass{border:1px solid var(--edge);border-radius:24px;background:var(--glass);backdrop-filter:blur(18px) saturate(180%);-webkit-backdrop-filter:blur(18px) saturate(180%);box-shadow:var(--lift);padding:28px}
.lm-cream{background:var(--cream);border-radius:28px;padding:56px;border:1px solid rgba(255,255,255,.7)}
.lm-char{background:var(--char);color:#fff;border-radius:28px;padding:64px}
.lm-todo{display:inline-block;padding:5px 12px;border:1px dashed rgba(48,55,59,.55);border-radius:999px;font-size:12px;letter-spacing:.04em;color:var(--char);background:rgba(252,229,187,.6)}
.lm-chips{display:flex;flex-wrap:wrap;gap:10px}
.lm-chips span{padding:7px 16px;border:1px solid var(--edge);border-radius:999px;font-size:13px;background:rgba(255,255,255,.6);color:var(--soft)}
.lm-ov{display:grid;grid-template-columns:1.15fr .85fr;gap:48px;align-items:center}
.lm-phone{border-radius:28px;padding:36px;display:flex;justify-content:center;background:linear-gradient(160deg,rgba(226,121,141,.38),rgba(252,229,187,.85))}
.lm-phone img{display:block;width:auto;max-width:100%;max-height:540px;height:auto;border-radius:14px}
.lm-meta{display:grid;grid-template-columns:repeat(3,1fr);column-gap:36px;border-top:1px solid rgba(48,55,59,.2)}
.lm-meta div{padding:16px 0;border-bottom:1px solid rgba(48,55,59,.14)}
.lm-meta dt{font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--quiet);margin:0 0 6px}
.lm-meta dd{margin:0;font-size:15px;color:var(--ink);line-height:1.45}
.lm-meta .wide{grid-column:1 / -1}
.lm-disc{display:flex;gap:12px;align-items:flex-start;padding:16px 20px;border-radius:18px;background:rgba(252,229,187,.55);border:1px solid rgba(255,255,255,.7);font-size:14px;color:var(--char);max-width:780px}
.lm-ctx{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start}
.lm-epi{font-size:clamp(24px,2.6vw,36px);font-weight:700;letter-spacing:-.03em;line-height:1.14;color:var(--char);margin:0}
.lm-epi em{font-style:normal;color:var(--rose-ink)}
.lm-epi small{display:block;margin-top:18px;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--char);opacity:.75}
.lm-prob-q{font-size:clamp(30px,4.2vw,62px);font-weight:800;letter-spacing:-.04em;line-height:1.02;margin:0;color:var(--cream)}
.lm-prob-q em{font-style:normal;color:var(--rose)}
.lm-prob-s{font-size:16.5px;line-height:1.65;color:rgba(255,255,255,.86);max-width:720px;margin:0}
.lm-prob-l{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--cream);margin:0 0 10px}
.lm-cycle{display:flex;align-items:center;gap:14px;flex-wrap:wrap;font-size:clamp(18px,2vw,26px);font-weight:700;letter-spacing:-.02em;color:#fff}
.lm-cycle i{font-style:normal;color:var(--rose)}
.lm-char .lm-chips span{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.25);color:#fff}
.lm-methods{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.lm-methods ul,.lm-list{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px}
.lm-methods li,.lm-list li{position:relative;padding-left:20px;font-size:15px;line-height:1.5;color:var(--soft)}
.lm-methods li:before,.lm-list li:before{content:'';position:absolute;left:0;top:.62em;width:8px;height:8px;border-radius:50%;background:var(--rose)}
.lm-eio{display:flex;flex-direction:column;gap:12px}
.lm-eio-h,.lm-eio-r{display:grid;grid-template-columns:1fr 28px 1.1fr 28px 1.2fr;gap:14px;align-items:center}
.lm-eio-h span{font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--quiet)}
.lm-eio-r>div{padding:20px 22px;border-radius:20px;background:rgba(255,255,255,.6);border:1px solid var(--edge);font-size:15px;line-height:1.45;color:var(--soft)}
.lm-eio-r>div.ins{background:var(--char);color:#fff;font-weight:600;font-size:17px;letter-spacing:-.01em}
.lm-eio-r>div.opp{background:var(--cream)}
.lm-eio-r>i{font-style:normal;text-align:center;color:var(--rose-ink);font-size:20px}
.lm-persons{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.lm-person{display:flex;flex-direction:column;gap:12px}
.lm-person figure{margin:0;border-radius:24px;overflow:hidden;background:linear-gradient(160deg,rgba(226,121,141,.25),rgba(252,229,187,.7));aspect-ratio:4/5;display:flex;align-items:center;justify-content:center;padding:14px}
.lm-person img{display:block;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain}
.lm-person small{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--quiet)}
.lm-person p{margin:0;font-size:14.5px;line-height:1.5;color:var(--soft)}
.lm-person q{display:block;font-size:16px;font-weight:600;line-height:1.35;color:var(--ink);quotes:none;margin-top:2px}
.lm-det{border:1px solid var(--edge);border-radius:20px;background:rgba(255,255,255,.5);padding:6px 22px}
.lm-det summary{cursor:pointer;padding:14px 0;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink);font-weight:600}
.lm-det[open] summary{border-bottom:1px solid rgba(48,55,59,.14);margin-bottom:16px}
.lm-det .in{padding:0 0 20px;display:flex;flex-direction:column;gap:14px}
.lm-ecowrap{overflow-x:auto;border-radius:28px;background:rgba(255,255,255,.5);border:1px solid var(--edge);padding:18px}
.lm-eco{display:block;width:100%;min-width:760px;height:auto;font-family:'Mona Sans',Inter,system-ui,sans-serif}
.lm-eco .home{fill:rgba(252,229,187,.4);stroke:rgba(48,55,59,.35);stroke-width:1.5;stroke-dasharray:6 6}
.lm-eco .lab{font-size:11px;letter-spacing:.2em;font-weight:600;fill:#5A5E8C}
.lm-eco .node{fill:rgba(255,255,255,.85);stroke:rgba(48,55,59,.2);stroke-width:1.2}
.lm-eco .node.mom{fill:rgba(226,121,141,.25);stroke:#E2798D;stroke-width:2}
.lm-eco .out{fill:#30373B}
.lm-eco .ln{stroke:#5A5E8C;stroke-width:1.5;fill:none}
.lm-eco .arrow{fill:#5A5E8C}
.lm-eco .t1{font-size:15px;font-weight:700;fill:#1E1B2E}
.lm-eco .t2{font-size:13px;font-weight:600;fill:#2E3050}
.lm-eco .t3{font-size:11.5px;fill:#2E3050}
.lm-eco .lbl{font-size:11px;font-style:italic;fill:#A93A57;paint-order:stroke;stroke:#EDEBFA;stroke-width:4px;stroke-linejoin:round}
.lm-eco .o1{font-size:13px;font-weight:600;fill:#FCE5BB}
.lm-eco .o2{font-size:11.5px;fill:#fff}
.lm-legend{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.lm-legend .lm-glass{padding:24px}
.lm-legend .lm-glass.wide{grid-column:span 3;display:grid;grid-template-columns:1fr 1fr;gap:28px}
.lm-princ{display:flex;flex-direction:column}
.lm-pr{display:grid;grid-template-columns:72px 1fr 280px;gap:24px;align-items:start;padding:26px 0;border-top:1px solid rgba(48,55,59,.2)}
.lm-pr:last-child{border-bottom:1px solid rgba(48,55,59,.2)}
.lm-pr .no{font-size:34px;font-weight:800;letter-spacing:-.04em;color:var(--rose-ink);line-height:1}
.lm-pr h3{font-size:clamp(20px,2vw,26px);font-weight:700;letter-spacing:-.025em;line-height:1.1;margin:0 0 8px}
.lm-pr p{margin:0;font-size:15.5px;line-height:1.6;color:var(--soft)}
.lm-pr .g{font-size:12.5px;line-height:1.45;color:var(--quiet);padding-left:16px;border-left:2px solid var(--rose)}
.lm-trade{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.lm-trade div{background:var(--cream);border-radius:22px;padding:26px}
.lm-trade p{margin:0;font-size:14.5px;line-height:1.55;color:var(--char)}
.lm-story{display:grid;grid-template-columns:minmax(260px,.85fr) 1.15fr;gap:56px;align-items:start}
.lm-stage{position:sticky;top:24px}
.lm-stagebox{position:relative;height:min(76vh,680px);border-radius:32px;background:linear-gradient(160deg,rgba(226,121,141,.32),rgba(252,229,187,.8));display:flex;align-items:center;justify-content:center;padding:22px;overflow:hidden}
.lm-stagebox img{display:block;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;border-radius:18px}
.lm-stageph,.lm-inph{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;text-align:center;padding:24px;width:100%;height:100%;border:1px dashed rgba(48,55,59,.4);border-radius:20px;color:var(--char);font-size:14px}
.lm-stageph b,.lm-inph b{font-size:15px}
.lm-stageph small,.lm-inph small{color:var(--char);opacity:.8}
.lm-stagecap{margin-top:14px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--quiet)}
.lm-step{min-height:64vh;display:flex;flex-direction:column;justify-content:center;gap:14px;padding:26px 0;opacity:.62;transition:opacity .3s}
.lm-step.on{opacity:1}
.lm-step small{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--rose-ink);font-weight:700}
.lm-step h3{font-size:clamp(26px,3vw,40px);font-weight:700;letter-spacing:-.03em;line-height:1.05;margin:0}
.lm-step p{margin:0;font-size:16.5px;line-height:1.65;color:var(--soft);max-width:560px}
.lm-step ul{margin:0}
.lm-inline{display:none}
.lm-btn{display:inline-flex;align-items:center;gap:10px;width:fit-content;height:48px;padding:0 26px;border-radius:999px;background:var(--char);color:#fff!important;font-size:14px;font-weight:600;letter-spacing:.02em}
.lm-btn:hover{background:#3A4246}
.lm-sb{display:grid;grid-template-columns:repeat(3,1fr);gap:22px 18px}
.lm-sb figure{margin:0;display:flex;flex-direction:column;gap:10px}
.lm-sb img{display:block;width:100%;height:auto;aspect-ratio:1332/1320;object-fit:cover;border-radius:20px;background:rgba(255,255,255,.5)}
.lm-sb b{font-size:15px;letter-spacing:-.01em}
.lm-sb figcaption{font-size:13.5px;line-height:1.5;color:var(--soft)}
.lm-sb .no{display:block;font-size:11px;letter-spacing:.16em;color:var(--rose-ink);font-weight:700;margin-bottom:2px}
.lm-pal{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
.lm-pal div{display:flex;align-items:center;gap:10px;padding:6px 16px 6px 6px;border-radius:999px;background:rgba(255,255,255,.6);border:1px solid var(--edge);font-size:12.5px;color:var(--soft)}
.lm-pal i{display:block;width:30px;height:30px;border-radius:50%;border:1px solid rgba(48,55,59,.2)}
.lm-evalg{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.lm-evalg .lm-glass{display:flex;flex-direction:column;gap:10px}
.lm-evalg .lm-glass p{margin:0;font-size:15px;line-height:1.55;color:var(--soft)}
.lm-ref{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.lm-ref .lm-glass{display:flex;flex-direction:column;gap:12px}
.cs.nav-minimal .cs-side{background:transparent;backdrop-filter:none;-webkit-backdrop-filter:none;border-right:0}
.cs.nav-hidden .cs-side{display:none}
.cs.compact{flex-direction:column}
.cs.compact .cs-side{position:relative;width:100%;height:auto;max-height:none;border-right:0;border-bottom:1px solid var(--edge)}
.cs.compact.nav-minimal .cs-side{border-bottom:0}
.cs.compact .cs-prog{display:none}
.cs.compact .cs-side .cs-nav,.cs.compact .cs-side .cs-clabel{display:none}
.cs.compact .cs-bar{display:flex;width:100%;position:sticky;top:0;z-index:30;gap:6px;overflow-x:auto;padding:10px 14px;background:var(--glass);backdrop-filter:blur(18px) saturate(180%);-webkit-backdrop-filter:blur(18px) saturate(180%);border-bottom:1px solid var(--edge);scrollbar-width:none}
.cs-bar::-webkit-scrollbar{display:none}
.cs-bar a{flex:none;display:inline-flex;align-items:center;height:34px;padding:0 14px;border-radius:999px;border:1px solid transparent;font-size:12.5px;color:var(--quiet);white-space:nowrap}
.cs-bar a.on{color:var(--ink);font-weight:600;background:rgba(255,255,255,.7);border-color:var(--edge)}
.cs.compact .cs-sec{scroll-margin-top:72px}
.cs.compact .cs-main{width:100%;padding:16px 14px 50px}
.cs.compact .cs-vh{padding:8px;border-radius:22px}
.cs.compact .cs-vh-frame{border-radius:14px}
.cs.compact .cs-vh-bar{left:8px;right:8px;bottom:8px;gap:8px;padding:5px 10px 5px 5px}
.cs.compact .cs-vh-time{display:none}
.cs.compact .cs-vh-title{left:10px;top:10px}
.cs.compact .cs-vh-big{width:64px;height:64px;margin:-32px 0 0 -32px}
.cs.compact .cs-next{flex-direction:column;align-items:flex-start;padding:30px 26px}
.cs.compact .lm-sec{padding:34px 0 10px}
.cs.compact .lm-ov,.cs.compact .lm-ctx,.cs.compact .lm-methods,.cs.compact .lm-evalg,.cs.compact .lm-ref,.cs.compact .lm-trade,.cs.compact .lm-legend,.cs.compact .lm-meta,.cs.compact .lm-legend .lm-glass.wide{grid-template-columns:1fr}
.cs.compact .lm-legend .lm-glass.wide{grid-column:auto}
.cs.compact .lm-persons,.cs.compact .lm-sb{grid-template-columns:1fr 1fr}
.cs.compact .lm-cream{padding:30px 22px}
.cs.compact .lm-char{padding:34px 24px}
.cs.compact .lm-eio-h{display:none}
.cs.compact .lm-eio-r{grid-template-columns:1fr;gap:6px}
.cs.compact .lm-eio-r>i{transform:rotate(90deg)}
.cs.compact .lm-pr{grid-template-columns:44px 1fr;gap:14px}
.cs.compact .lm-pr .g{grid-column:2}
.cs.compact .lm-story{grid-template-columns:1fr;gap:10px}
.cs.compact .lm-stage{display:none}
.cs.compact .lm-step{min-height:0;opacity:1;padding:30px 0}
.cs.compact .lm-inline{display:block;height:min(70vh,460px);border-radius:24px;overflow:hidden;background:linear-gradient(160deg,rgba(226,121,141,.32),rgba(252,229,187,.8));padding:16px}
.cs.compact .lm-inline img{display:block;max-width:100%;max-height:100%;margin:0 auto;object-fit:contain}
@media (max-width:560px){.cs.compact .lm-persons,.cs.compact .lm-sb{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){.cs *{transition:none!important;scroll-behavior:auto!important}.cs-vh-load i{animation:none!important}}
`

function LumiCaseStudy(props: any) {
    const v = (k: string): string =>
        props[k] === undefined || props[k] === null
            ? (D[k] ?? "")
            : String(props[k])

    const rootRef = React.useRef<HTMLDivElement>(null)
    const barRef = React.useRef<HTMLElement>(null)
    const pinned = React.useRef(false)
    const [compact, setCompact] = React.useState(false)
    const [active, setActive] = React.useState("overview")
    const [progress, setProgress] = React.useState(0)
    const [step, setStep] = React.useState(0)
    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const navStyle: string = ["glass", "minimal", "hidden"].includes(
        props.navStyle
    )
        ? props.navStyle
        : "glass"
    const todos = props.showTodos !== false
    const showHero = props.showVideoHero !== false

    const hidden = new Set(
        v("hiddenSections")
            .split(",")
            .map((s) => s.trim().toLowerCase())
            .filter(Boolean)
    )

    /* section registry → drives the contents list, numbering and visibility */
    const defs = [
        {
            id: "preview",
            label: v("vhNavLabel") || "Preview",
            on: showHero && !!props.videoHeroInNav,
        },
        { id: "overview", label: "Overview", on: true },
        { id: "context", label: "Context", num: true, on: !hidden.has("context") },
        { id: "problem", label: "Problem", num: true, on: !hidden.has("problem") },
        { id: "research", label: "Research", num: true, on: !hidden.has("research") },
        { id: "ecosystem", label: "Ecosystem", num: true, on: !hidden.has("ecosystem") },
        { id: "strategy", label: "Strategy", num: true, on: !hidden.has("strategy") },
        { id: "solution", label: "Solution", num: true, on: !hidden.has("solution") },
        { id: "evaluation", label: "Evaluation", num: true, on: !hidden.has("evaluation") },
        { id: "reflection", label: "Reflection", num: true, on: !hidden.has("reflection") },
        { id: "next", label: "Next project", on: !!v("nextTitle") },
    ]
    let counter = 0
    const secs = defs
        .filter((d) => d.on)
        .map((d) => ({
            ...d,
            n: d.num ? String(++counter).padStart(2, "0") : "",
        }))
    const sec = (id: string) => secs.find((s) => s.id === id)
    const idsKey = secs.map((s) => s.id).join(",")

    const sp = (id: string, fallback?: string) => ({
        id: "cs-" + id,
        "data-sec": id,
        tabIndex: -1,
        "aria-label": sec(id)?.label || fallback || id,
    })

    const Eyebrow = ({ id }: { id: string }) => {
        const s = sec(id)
        return (
            <div className="lm-eyebrow">
                {s && s.n && <b>{s.n}</b>}
                <span>{s ? s.label : id}</span>
            </div>
        )
    }

    React.useEffect(() => {
        const el = rootRef.current
        if (!el || typeof ResizeObserver === "undefined") return
        const ro = new ResizeObserver((e) =>
            setCompact(e[0].contentRect.width < 900)
        )
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    React.useEffect(() => {
        const release = () => {
            pinned.current = false
        }
        const evts = ["wheel", "touchstart", "keydown", "pointerdown"]
        evts.forEach((e) =>
            window.addEventListener(e, release, { passive: true })
        )
        return () =>
            evts.forEach((e) => window.removeEventListener(e, release))
    }, [])

    React.useEffect(() => {
        if (isCanvas || navStyle === "hidden") return
        const ids = idsKey.split(",")
        const onScroll = () => {
            const root = rootRef.current
            if (!root) return
            const r = root.getBoundingClientRect()
            const total = r.height - window.innerHeight
            setProgress(
                total > 0
                    ? Math.min(
                          100,
                          Math.max(0, Math.round((-r.top / total) * 100))
                      )
                    : 0
            )
            if (pinned.current) return
            let cur = ids[0]
            ids.forEach((id) => {
                const n = root.querySelector(
                    `[data-sec="${id}"]`
                ) as HTMLElement | null
                if (
                    n &&
                    n.getBoundingClientRect().top <= window.innerHeight * 0.35
                )
                    cur = id
            })
            if (
                window.scrollY > 0 &&
                window.innerHeight + window.scrollY >=
                    document.documentElement.scrollHeight - 4
            )
                cur = ids[ids.length - 1]
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

    /* sticky storytelling: the screen follows whichever step is in the middle of the viewport */
    React.useEffect(() => {
        if (isCanvas || compact || typeof IntersectionObserver === "undefined")
            return
        const root = rootRef.current
        if (!root) return
        const els = Array.from(
            root.querySelectorAll("[data-step]")
        ) as HTMLElement[]
        if (!els.length) return
        const io = new IntersectionObserver(
            (entries) =>
                entries.forEach((e) => {
                    if (e.isIntersecting)
                        setStep(Number((e.target as HTMLElement).dataset.step))
                }),
            { rootMargin: "-45% 0px -45% 0px" }
        )
        els.forEach((el) => io.observe(el))
        return () => io.disconnect()
    }, [isCanvas, compact, idsKey])

    React.useEffect(() => {
        if (!compact) return
        const bar = barRef.current
        const el = bar?.querySelector("a.on") as HTMLElement | null
        if (bar && el)
            bar.scrollTo({
                left: el.offsetLeft - bar.clientWidth / 2 + el.clientWidth / 2,
                behavior: prefersReduced() ? "auto" : "smooth",
            })
    }, [active, compact])

    const go = (id: string) => {
        const n = rootRef.current?.querySelector(
            `[data-sec="${id}"]`
        ) as HTMLElement | null
        if (!n) return
        pinned.current = true
        setActive(id)
        n.scrollIntoView({
            behavior: prefersReduced() ? "auto" : "smooth",
            block: "start",
        })
        try {
            n.focus({ preventScroll: true })
        } catch (e) {}
    }

    const links = (chips: boolean) =>
        secs.map((s) => (
            <a
                key={s.id}
                href={"#cs-" + s.id}
                className={active === s.id ? "on" : ""}
                aria-current={active === s.id ? "location" : undefined}
                onClick={(e) => {
                    e.preventDefault()
                    go(s.id)
                }}
            >
                {!chips && <span className="n">{s.n}</span>}
                <span>{s.label}</span>
            </a>
        ))

    const accent = props.accent || "#E2798D"
    const muted = props.muted || "#2B2F8F"
    const screens = [
        props.screen1,
        props.screen2,
        props.screen3,
        props.screen4,
        props.screen5,
    ]
    const stageImg = screens[step]

    const metaRows: [string, React.ReactNode, boolean?][] = [
        ["Project type", "Academic project"],
        ["Domain", "Healthcare, mental health"],
        ["Timeline", v("timeline")],
        ["Role", [v("role"), v("roleNote")].filter(Boolean).join(" · ")],
        [
            "Team",
            v("team") || <Todo on={todos}>team members, or note solo work</Todo>,
        ],
        ["Tools", v("tools")],
        ["Scope", v("scope"), true],
        ["Status", v("status"), true],
    ]

    const evalFields: [string, string, string][] = [
        ["What was tested", v("evalTested"), "prototype version, tasks and setting"],
        ["With whom", v("evalParticipants"), "number and type of participants"],
        ["What was learned", v("evalLearned"), "observations and feedback"],
        ["What changed as a result", v("evalChanged"), "design changes made after testing"],
    ]

    return (
        <div
            ref={rootRef}
            className={"cs nav-" + navStyle + (compact ? " compact" : "")}
            style={{
                ["--a" as any]: accent,
                ["--m" as any]: muted,
                ...(props.style || {}),
            }}
        >
            <style>{CSS}</style>

            {navStyle !== "hidden" && (
                <aside className="cs-side">
                    <div className="cs-title">{v("title")}</div>
                    {v("role") && (
                        <div className="cs-meta">
                            <div className="cs-label">Role</div>
                            <div className="cs-val">{v("role")}</div>
                            {v("roleNote") && (
                                <div className="cs-note">{v("roleNote")}</div>
                            )}
                        </div>
                    )}
                    {v("timeline") && (
                        <div className="cs-meta">
                            <div className="cs-label">Timeline</div>
                            <div className="cs-val">{v("timeline")}</div>
                        </div>
                    )}
                    <div
                        className="cs-label cs-clabel"
                        style={{ marginTop: 36 }}
                    >
                        Contents
                    </div>
                    <nav className="cs-nav" aria-label="Case study contents">
                        {links(false)}
                    </nav>
                    <div className="cs-prog">
                        <i>
                            <b style={{ width: progress + "%" }} />
                        </i>
                        <span>{progress}%</span>
                    </div>
                </aside>
            )}

            {navStyle !== "hidden" && (
                <nav
                    className="cs-bar"
                    ref={barRef}
                    aria-label="Case study contents"
                >
                    {links(true)}
                </nav>
            )}

            <main className="cs-main">
                <div className="cs-top">
                    <a className="cs-pill" href={props.backLink || "/"}>
                        ← {v("backLabel")}
                    </a>
                    <a className="cs-menu" href={props.menuLink || "/"}>
                        {v("menuLabel")}
                        <i />
                    </a>
                </div>

                {/* video hero: first visual, outside every contents target */}
                {showHero && (
                    <section className="cs-sec" {...sp("preview", "Video preview")}>
                        <CaseStudyVideoHero
                            src={props.heroVideo}
                            poster={props.heroPoster}
                            title={v("vhTitle")}
                            captions={props.heroCaptions}
                            transcript={v("vhTranscript")}
                            name={v("title")}
                        />
                    </section>
                )}

                {/* 00 overview */}
                <section className="cs-sec lm-sec" {...sp("overview")}>
                    <Eyebrow id="overview" />
                    <h1 className="lm-h1">
                        Rethinking postpartum care as a system of support.
                    </h1>
                    <p className="lm-lead">
                        Lumi explores how a digital experience can help mothers
                        recognise and express postpartum emotional difficulty,
                        while giving partners and family a clearer, more
                        compassionate way to support her.
                    </p>
                    <div className="lm-ov">
                        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                            <dl className="lm-meta">
                                {metaRows.map((r, i) => (
                                    <div key={i} className={r[2] ? "wide" : ""}>
                                        <dt>{r[0]}</dt>
                                        <dd>{r[1]}</dd>
                                    </div>
                                ))}
                            </dl>
                            <div className="lm-disc">
                                <span aria-hidden="true">◐</span>
                                <span>
                                    Lumi is a design concept. It does not
                                    diagnose, treat or replace professional
                                    care, and it has not been clinically
                                    validated.
                                </span>
                            </div>
                        </div>
                        <div className="lm-phone">
                            <img
                                src={A.hero}
                                alt="Lumi app screen from the high-fidelity prototype"
                                width={850}
                                height={1712}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </section>

                {/* 01 context */}
                {sec("context") && (
                    <section className="cs-sec lm-sec" {...sp("context")}>
                        <Eyebrow id="context" />
                        <h2 className="lm-h2">
                            Postpartum care happens in a home, not on a screen.
                        </h2>
                        <div className="lm-cream">
                            <div className="lm-ctx">
                                <p className="lm-epi">
                                    “Neha just became a mother. This is
                                    supposed to be the happiest time of her
                                    life. <em>But something doesn’t feel right.</em>”
                                    <small>The scenario the project follows</small>
                                </p>
                                <div className="lm-p">
                                    <p>
                                        Postpartum depression (PPD) is a
                                        treatable medical condition that can
                                        follow childbirth. Many new mothers
                                        experience short-lived “baby blues”;
                                        PPD is more intense, lasts longer, and
                                        does not go away on its own.
                                    </p>
                                    <p>
                                        What happens next depends on more than
                                        the mother. A partner decides how to
                                        respond, relatives shape whether she
                                        feels believed, and a healthcare
                                        provider may only see her at periodic
                                        visits. Any one screen can help, but
                                        none of them is the whole answer.
                                    </p>
                                    <p>
                                        That is why Lumi treats postpartum
                                        support as a{" "}
                                        <strong>shared problem in a home</strong>,
                                        not a private task for one person.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* 02 problem */}
                {sec("problem") && (
                    <section className="cs-sec lm-sec" {...sp("problem")}>
                        <Eyebrow id="problem" />
                        <div className="lm-char" style={{ display: "flex", flexDirection: "column", gap: 34 }}>
                            <p className="lm-prob-q">
                                The problem isn’t absence of support. It’s{" "}
                                <em>absence of emotional understanding.</em>
                            </p>
                            <div>
                                <p className="lm-prob-l">Problem statement</p>
                                <p className="lm-prob-s">
                                    Family members are key to early
                                    recognition and recovery from postpartum
                                    depression: they shape emotional safety,
                                    validate experiences and share the
                                    caregiving load. But low mental-health
                                    literacy, stigma and a lack of guidance
                                    often stop them from identifying symptoms
                                    or responding well. Many women hesitate to
                                    share their struggles or to use tools like
                                    the Edinburgh Postnatal Depression Scale,
                                    which leads to delayed detection and
                                    worsening outcomes.
                                </p>
                            </div>
                            <div>
                                <p className="lm-prob-l">The pattern Lumi set out to interrupt</p>
                                <div className="lm-cycle">
                                    <span>Normalisation</span><i>→</i>
                                    <span>Delay</span><i>→</i>
                                    <span>Crisis</span>
                                </div>
                            </div>
                            <div>
                                <p className="lm-prob-l">Barriers to recognition identified</p>
                                <div className="lm-chips">
                                    <span>Stigma</span>
                                    <span>Low mental-health literacy</span>
                                    <span>No guidance</span>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* 03 research */}
                {sec("research") && (
                    <section className="cs-sec lm-sec" {...sp("research")}>
                        <Eyebrow id="research" />
                        <h2 className="lm-h2">
                            Three findings that shaped the design.
                        </h2>
                        <div className="lm-methods">
                            <div className="lm-glass">
                                <h3 className="lm-h3">Conversations</h3>
                                <ul>
                                    <li>Interviews with mothers, fathers and caregivers</li>
                                    <li>Domain understanding from doctors and psychiatrists</li>
                                </ul>
                            </div>
                            <div className="lm-glass">
                                <h3 className="lm-h3">Reading</h3>
                                <ul>
                                    <li>Research papers and articles</li>
                                    <li>Existing studies, screening frameworks and postpartum mental-health data, to understand emotional patterns, early symptoms and support gaps</li>
                                </ul>
                            </div>
                        </div>
                        <p className="lm-small">
                            Findings were grouped with card sorting. These are
                            the three themes that carried through to the design.
                        </p>

                        <div className="lm-eio" role="list" aria-label="Evidence, insight and design opportunity">
                            <div className="lm-eio-h" aria-hidden="true">
                                <span>Evidence</span><span /><span>Insight</span><span /><span>Design opportunity</span>
                            </div>
                            {[
                                [
                                    "Interviews and literature, grouped by card sorting",
                                    "Mothers hesitate to express distress.",
                                    "Safe ways to express feelings without fear of judgement or labelling.",
                                ],
                                [
                                    "Interviews and literature, grouped by card sorting",
                                    "Families miss emotional warning signs.",
                                    "A shared understanding of symptoms, and ways to recognise distress without dismissing it.",
                                ],
                                [
                                    "Interviews and literature, grouped by card sorting",
                                    "Emotional support often comes too late.",
                                    "Reduce the gap between noticing and acting, including when and how to seek professional help.",
                                ],
                            ].map((r, i) => (
                                <div className="lm-eio-r" role="listitem" key={i}>
                                    <div>{r[0]}</div>
                                    <i aria-hidden="true">→</i>
                                    <div className="ins">{r[1]}</div>
                                    <i aria-hidden="true">→</i>
                                    <div className="opp">{r[2]}</div>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h3 className="lm-h3" style={{ marginBottom: 16 }}>
                                Three roles in one home
                            </h3>
                            <div className="lm-persons">
                                {PERSONAS.map((p) => (
                                    <div className="lm-person" key={p.name}>
                                        <figure>
                                            <img
                                                src={p.src}
                                                alt={"Persona: " + p.name}
                                                width={p.w}
                                                height={p.h}
                                                loading="lazy"
                                            />
                                        </figure>
                                        <small>{p.who} · {p.stage}</small>
                                        <h3 className="lm-h3" style={{ margin: 0 }}>{p.name}</h3>
                                        <p>{p.tag}.</p>
                                        <q>“{p.mind}”</q>
                                    </div>
                                ))}
                            </div>
                            <p className="lm-small" style={{ marginTop: 14 }}>
                                Personas are research syntheses. The lines in
                                quotation marks are persona mindsets, not
                                participant quotes.
                            </p>
                        </div>

                        <details className="lm-det">
                            <summary>Method, participants and limitations</summary>
                            <div className="in">
                                {v("methodDetail") ? (
                                    <div className="lm-p">{paras(v("methodDetail"))}</div>
                                ) : (
                                    <Todo on={todos}>
                                        number of interviews, who took part, how they were recruited, and how findings were analysed
                                    </Todo>
                                )}
                                <ul className="lm-list">
                                    <li>Academic project with a 12-week scope.</li>
                                    <li>Personas synthesise findings; they are not individual participants.</li>
                                    <li>Literature and domain conversations informed the clinical framing; none of it makes Lumi a clinical tool.</li>
                                </ul>
                            </div>
                        </details>
                    </section>
                )}

                {/* 04 ecosystem */}
                {sec("ecosystem") && (
                    <section className="cs-sec lm-sec" {...sp("ecosystem")}>
                        <Eyebrow id="ecosystem" />
                        <h2 className="lm-h2">
                            Support is shared. Understanding isn’t.
                        </h2>
                        <p className="lm-lead">
                            Mapping the people around a new mother showed
                            where information and care break down. The map
                            below uses only the actors and relationships
                            identified in the project’s research.
                        </p>
                        <EcosystemMap />
                        <div className="lm-legend">
                            <div className="lm-glass">
                                <h3 className="lm-h3">The mother’s needs</h3>
                                <ul className="lm-list">
                                    <li>A safe way to express feelings without fear of judgement or labels</li>
                                    <li>To tell baby blues from early signs of PPD without panic</li>
                                </ul>
                            </div>
                            <div className="lm-glass">
                                <h3 className="lm-h3">The partner’s needs</h3>
                                <ul className="lm-list">
                                    <li>Clear, actionable understanding beyond generic internet information</li>
                                    <li>A way to support emotionally instead of trying to fix</li>
                                </ul>
                            </div>
                            <div className="lm-glass">
                                <h3 className="lm-h3">The wider family’s role</h3>
                                <ul className="lm-list">
                                    <li>Recognise distress without dismissing it as weakness</li>
                                    <li>Share an understanding of symptoms with the mother and partner</li>
                                </ul>
                            </div>
                            <div className="lm-glass wide">
                                <div>
                                    <h3 className="lm-h3">Information and support already in the system</h3>
                                    <ul className="lm-list">
                                        <li>Healthcare providers (OB-GYN, midwife, GP), who see her only periodically</li>
                                        <li>The EPDS screening tool, an early-detection instrument mothers may avoid or delay</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="lm-h3">What a digital product can and can’t do</h3>
                                    <ul className="lm-list">
                                        <li><strong>Can:</strong> make expression easier, surface patterns, give partners and family a shared picture, and point to professional help.</li>
                                        <li><strong>Can’t:</strong> diagnose, treat, replace screening or clinical care, or change family attitudes on its own.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* 05 strategy */}
                {sec("strategy") && (
                    <section className="cs-sec lm-sec" {...sp("strategy")}>
                        <Eyebrow id="strategy" />
                        <h2 className="lm-h2">Five principles, each tied to evidence.</h2>
                        <div className="lm-princ">
                            {PRINCIPLES.map((p, i) => (
                                <div className="lm-pr" key={p.t}>
                                    <span className="no">{String(i + 1).padStart(2, "0")}</span>
                                    <div>
                                        <h3>{p.t}</h3>
                                        <p>{p.d}</p>
                                    </div>
                                    <div className="g">{p.g}</div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h3 className="lm-h3" style={{ marginBottom: 14 }}>
                                Trade-offs in the design
                            </h3>
                            <div className="lm-trade">
                                {TRADEOFFS.map((t) => (
                                    <div key={t.t}>
                                        <h3 className="lm-h3">{t.t}</h3>
                                        <p>{t.d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <details className="lm-det">
                            <summary>Selected “How might we” questions</summary>
                            <div className="in">
                                <ul className="lm-list">
                                    {HMW.map((h) => (
                                        <li key={h}>{h}</li>
                                    ))}
                                </ul>
                                <p className="lm-small">A selection from the full ideation set.</p>
                            </div>
                        </details>
                    </section>
                )}

                {/* 06 solution */}
                {sec("solution") && (
                    <section className="cs-sec lm-sec" {...sp("solution")}>
                        <Eyebrow id="solution" />
                        <h2 className="lm-h2">
                            One app, three people, one shared picture.
                        </h2>
                        <p className="lm-lead">
                            Lumi is organised around who needs what: the
                            mother, her partner, and the wider family. Scroll
                            through each part of the experience.
                        </p>

                        <div className="lm-story">
                            <div className="lm-stage">
                                <div className="lm-stagebox">
                                    {stageImg?.src ? (
                                        <img
                                            src={stageImg.src}
                                            srcSet={stageImg.srcSet}
                                            alt={stageImg.alt || STEPS[step].title}
                                        />
                                    ) : (
                                        <div className="lm-stageph">
                                            <b>Screen placeholder</b>
                                            <span>{STEPS[step].title}</span>
                                            <small>
                                                Upload in “Screens · {step + 1}”
                                            </small>
                                        </div>
                                    )}
                                </div>
                                <div className="lm-stagecap">
                                    {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")} · {STEPS[step].title}
                                </div>
                            </div>
                            <div>
                                {STEPS.map((s, i) => (
                                    <article
                                        className={"lm-step" + (step === i ? " on" : "")}
                                        data-step={i}
                                        key={s.title}
                                    >
                                        <small>{s.tag}</small>
                                        <h3>{s.title}</h3>
                                        <p>{s.text}</p>
                                        <ul className="lm-list">
                                            {s.notes.map((n) => (
                                                <li key={n}>{n}</li>
                                            ))}
                                        </ul>
                                        <div className="lm-inline">
                                            {screens[i]?.src ? (
                                                <img
                                                    src={screens[i].src}
                                                    srcSet={screens[i].srcSet}
                                                    alt={screens[i].alt || s.title}
                                                />
                                            ) : (
                                                <div className="lm-inph">
                                                    <b>Screen placeholder</b>
                                                    <span>{s.title}</span>
                                                    <small>Upload in “Screens · {i + 1}”</small>
                                                </div>
                                            )}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <p className="lm-small" style={{ maxWidth: 680 }}>
                            The Support tab also holds expert advice (verified
                            articles) and an appointment card for a perinatal
                            psychiatrist. Both use sample content in the
                            prototype.
                        </p>

                        {v("prototypeLink") && (
                            <a
                                className="lm-btn"
                                href={v("prototypeLink")}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Open the interactive prototype in Figma ↗
                            </a>
                        )}

                        <div>
                            <h3 className="lm-h3" style={{ marginBottom: 6 }}>
                                The experience as a scenario
                            </h3>
                            <p className="lm-small" style={{ marginBottom: 18 }}>
                                A storyboard following Neha, a new mother, and
                                Rohan, her partner.
                            </p>
                            <div className="lm-sb">
                                {STORYBOARD.map((s, i) => (
                                    <figure key={s.t}>
                                        <img
                                            src={s.src}
                                            alt={"Storyboard frame: " + s.t}
                                            width={1332}
                                            height={1320}
                                            loading="lazy"
                                        />
                                        <figcaption>
                                            <span className="no">{String(i + 1).padStart(2, "0")}</span>
                                            <b>{s.t}</b>
                                            <br />
                                            {s.d}
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="lm-h3" style={{ marginBottom: 12 }}>
                                Visual language
                            </h3>
                            <div className="lm-pal" role="list">
                                {[
                                    ["#E2798D", "Rose"],
                                    ["#30373B", "Charcoal"],
                                    ["#FCE5BB", "Cream"],
                                    ["#5F6C72", "Slate"],
                                    ["#CAD0D3", "Mist"],
                                ].map((c) => (
                                    <div role="listitem" key={c[0]}>
                                        <i style={{ background: c[0] }} />
                                        {c[1]} {c[0]}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* 07 evaluation */}
                {sec("evaluation") && (
                    <section className="cs-sec lm-sec" {...sp("evaluation")}>
                        <Eyebrow id="evaluation" />
                        <h2 className="lm-h2">What has, and hasn’t, been tested.</h2>
                        <div className="lm-disc">
                            <span aria-hidden="true">◐</span>
                            <span>
                                Usability-testing material has not been added to
                                this page yet. Until it is, every feature in the
                                Solution is an <strong>unvalidated design proposal</strong>,
                                and nothing here claims an effect on wellbeing or
                                depression.
                            </span>
                        </div>
                        <div className="lm-evalg">
                            {evalFields
                                .filter((f) => f[1] || todos)
                                .map((f) => (
                                    <div className="lm-glass" key={f[0]}>
                                        <h3 className="lm-h3">{f[0]}</h3>
                                        {f[1] ? (
                                            <div className="lm-p">{paras(f[1])}</div>
                                        ) : (
                                            <Todo on={todos}>{f[2]}</Todo>
                                        )}
                                    </div>
                                ))}
                        </div>
                        <div>
                            <p className="lm-prob-l" style={{ color: "var(--quiet)" }}>
                                Design proposals not yet validated
                            </p>
                            <div className="lm-chips">
                                <span>Emotional check-in</span>
                                <span>Pattern notice</span>
                                <span>Voice and text journal</span>
                                <span>Shared check-ins</span>
                                <span>Partner guidance and “Ask Lumi”</span>
                                <span>Family Awareness Card</span>
                            </div>
                        </div>
                    </section>
                )}

                {/* 08 reflection */}
                {sec("reflection") && (
                    <section className="cs-sec lm-sec" {...sp("reflection")}>
                        <Eyebrow id="reflection" />
                        <h2 className="lm-h2">A concept with an honest scope.</h2>
                        <Todo on={todos}>
                            draft reflection, edit into your own voice
                        </Todo>
                        <div className="lm-ref">
                            <div className="lm-glass">
                                <h3 className="lm-h3">Decisions that shaped Lumi</h3>
                                <ul className="lm-list">
                                    <li>A private journal alongside opt-in shared check-ins.</li>
                                    <li>A pattern notice that points to people instead of naming a condition.</li>
                                    <li>Partner guidance framed as presence over problem-solving.</li>
                                </ul>
                            </div>
                            <div className="lm-glass">
                                <h3 className="lm-h3">Limitations</h3>
                                <ul className="lm-list">
                                    <li>Academic scope of 12 weeks, a concept and prototype only.</li>
                                    <li>No clinical validation; guidance copy in the prototype is illustrative.</li>
                                    <li>Testing results are not yet documented on this page.</li>
                                </ul>
                            </div>
                            <div className="lm-glass">
                                <h3 className="lm-h3">Still unresolved</h3>
                                <ul className="lm-list">
                                    <li>How much should a partner or relative see by default?</li>
                                    <li>What threshold and wording should a pattern notice use?</li>
                                    <li>How would “Ask Lumi” stay accurate, cautious and safe?</li>
                                </ul>
                            </div>
                            <div className="lm-glass">
                                <h3 className="lm-h3">What I would investigate next</h3>
                                <ul className="lm-list">
                                    <li>Test check-ins and the pattern notice with mothers, under appropriate ethical oversight and clinical input.</li>
                                    <li>Test whether partner guidance changes what fathers say and do.</li>
                                    <li>Observe how families respond to the awareness card.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="lm-glass" style={{ gap: 10, display: "flex", flexDirection: "column" }}>
                            <h3 className="lm-h3">Ethical considerations</h3>
                            <p className="lm-p" style={{ margin: 0 }}>
                                This is a sensitive context. Lumi is not a
                                diagnostic or treatment tool, shared mood data
                                raises privacy questions, and any real use would
                                need clinical review and ethics oversight.
                            </p>
                        </div>
                        <div className="lm-glass" style={{ gap: 10, display: "flex", flexDirection: "column" }}>
                            <h3 className="lm-h3">How Lumi shaped my UX and HCI thinking</h3>
                            {v("reflectionPersonal") ? (
                                <div className="lm-p">{paras(v("reflectionPersonal"))}</div>
                            ) : (
                                <Todo on={todos}>
                                    two or three sentences in your own words on designing for emotional wellbeing, family support and complex care systems
                                </Todo>
                            )}
                        </div>
                    </section>
                )}

                {/* 09 next */}
                {sec("next") && (
                    <section className="cs-sec" {...sp("next")}>
                        <a className="cs-next" href={props.nextLink || "/encora"}>
                            <div>
                                <small>{v("nextLabel")}</small>
                                <b>{v("nextTitle")}</b>
                            </div>
                            <span aria-hidden="true">→</span>
                        </a>
                    </section>
                )}
            </main>
        </div>
    )
}

LumiCaseStudy.displayName = "Lumi Case Study"
export default LumiCaseStudy

const controls: any = {}
FIELDS.forEach(([key, title, def, long]) => {
    controls[key] = {
        type: ControlType.String,
        title,
        defaultValue: def,
        displayTextArea: !!long,
    }
})
Object.assign(controls, {
    navStyle: {
        type: ControlType.Enum,
        title: "Nav style",
        defaultValue: "glass",
        options: ["glass", "minimal", "hidden"],
        optionTitles: ["Glass", "Minimal", "Hidden"],
        displaySegmentedControl: true,
    },
    showTodos: {
        type: ControlType.Boolean,
        title: "Show to-do markers",
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    showVideoHero: {
        type: ControlType.Boolean,
        title: "Video hero · Show",
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    videoHeroInNav: {
        type: ControlType.Boolean,
        title: "Video hero · In contents",
        defaultValue: false,
        enabledTitle: "Listed",
        disabledTitle: "Not listed",
    },
    heroVideo: {
        type: ControlType.File,
        title: "Video hero · Video file",
        allowedFileTypes: ["mp4", "webm", "mov"],
    },
    heroPoster: {
        type: ControlType.ResponsiveImage,
        title: "Video hero · Poster",
    },
    heroCaptions: {
        type: ControlType.File,
        title: "Video hero · Captions (.vtt)",
        allowedFileTypes: ["vtt"],
    },
    screen1: { type: ControlType.ResponsiveImage, title: "Screens · 1 Check-in" },
    screen2: { type: ControlType.ResponsiveImage, title: "Screens · 2 Pattern notice" },
    screen3: { type: ControlType.ResponsiveImage, title: "Screens · 3 Journal" },
    screen4: { type: ControlType.ResponsiveImage, title: "Screens · 4 Partner guidance" },
    screen5: { type: ControlType.ResponsiveImage, title: "Screens · 5 Family" },
    backLink: { type: ControlType.Link, title: "Top bar · Back link" },
    menuLink: { type: ControlType.Link, title: "Top bar · Menu link" },
    nextLink: { type: ControlType.Link, title: "Next · Link" },
    accent: {
        type: ControlType.Color,
        title: "Style · Lumi rose",
        defaultValue: "#E2798D",
    },
    muted: {
        type: ControlType.Color,
        title: "Style · Sidebar indigo",
        defaultValue: "#2B2F8F",
    },
})
addPropertyControls(LumiCaseStudy, controls)
