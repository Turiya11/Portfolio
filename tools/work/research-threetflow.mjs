// 3TFlow research folders and the agent's journey, from Turiya's own internship case study deck in Figma
// (file WP1hndyh3fgIslTYIS6fXn, page 351:2, slides 02 to 15). Only the synthesis is shown: no internal screens,
// client names or data. The competitor rows are Turiya's reading of public product information (2026).
const site = (n) => `../../assets/images/${n}`

export const tfFaces = {
    priya: { skin: "#c58a62", hair: "ponytail", hairColor: "#1f140e", bg: "#d3e8ff", top: "#6c7bd9", earrings: true },
    aarav: { skin: "#b97c55", hair: "short", hairColor: "#1b120c", bg: "#ffe2a8", top: "#4f52d6", hoodie: true },
    rohan: { skin: "#a8714d", hair: "side", hairColor: "#22170f", bg: "#d9f3cf", top: "#3d5a80", glasses: true, beard: "stubble" },
}

const priya = {
    name: "Priya Sharma",
    role: "End user · software engineer, 5 years",
    face: tfFaces.priya,
    meta: "27 · Pune · high tech fluency",
    quote: "“I just need someone to action it, ==not ask me to start over==.”",
    goals: ["Submit the full context once", "Go straight to a specialist", "See real status, not “in progress”"],
    pain: ["Agents re-ask what she already wrote", "Blockers queue behind password resets", "“Resolved” with no explanation"],
}
const aarav = {
    name: "Aarav Mehta",
    role: "Support agent · IT service desk, 3 years",
    face: tfFaces.aarav,
    meta: "26 · Pune · 40–60 tickets a day",
    quote: "“I spend more time ==figuring out what's going on== than actually solving the problem.”",
    goals: ["All context in one place", "Meet SLAs without panic", "No duplicate work"],
    pain: ["Everything feels urgent", "Context split across CRM, notes and history", "No view of his own performance"],
}
const rohan = {
    name: "Rohan Kulkarni",
    role: "Support admin · IT infra lead, 9 years",
    face: tfFaces.rohan,
    meta: "38 · Bangalore · manages 12+ organisations",
    quote: "“The system gives me ==almost no signal== about whether anything is actually working.”",
    goals: ["Know the impact before a change", "Define roles once, correctly", "An audit trail he can defend"],
    pain: ["No impact preview on permissions", "Changes go live instantly", "The audit log is a flat list"],
}

export const threetflowResearch = [
    {
        title: "Primary & secondary research data",
        hint: "ITIL, stakeholders, the market",
        blocks: [
            {
                h: "How the data was gathered",
                cards: [
                    { t: "Secondary research", items: ["ITIL guides, ServiceNow and Zendesk documentation, to learn the vocabulary ==before designing a single screen==", "A competitive audit of six ITSM and MSP tools from public product information", "An audit of the existing 3TFlow “Create Task” form"] },
                    { t: "Primary research", items: ["Working sessions with the product owner and developers on every story", "Support admins' and clients' workflows, which ==defined the SLA, contract, licence and timesheet rules==", "Sprint reviews with the product owner, a developer, my mentor and a user"] },
                ],
            },
            {
                h: "ITIL, as a system",
                cards: [
                    { t: "Three kinds of ticket", items: ["Incident: something broke, restore it fast", "Service request: someone needs something, fulfil it", "Change request: modify a system, needs approval"] },
                    { t: "Two kinds of promise", items: ["SLA: the clock runs from queue to resolution", "Gold 15 min / 4 h · Silver 1 h / 8 h · Bronze 4 h / 24 h", "OLA: internal promises between teams, helpdesk → network → server"] },
                    { t: "One lifecycle", items: ["Open → In progress → Waiting for user → Resolved → Closed", "L1 agents diagnose; ==L2 and L3 specialists take escalations==", "Closed tickets ask for feedback"] },
                ],
            },
            {
                h: "How support worked before 3TFlow",
                table: {
                    head: ["Role", "What they did", "Where it broke"],
                    rows: [
                        ["Super admin + support partner", "Create the client org, onboard its admin, set the SLA tier and contract, assign a team", "Settings changed org by org"],
                        ["End user", "Hunt for where to ask (intranet, email, portal), fill an Incident / Service / Change form, wait, chase", "==No single, known entry point==; long forms, wrong category"],
                        ["Org admin", "Triage and assign to a team, monitor SLAs, handle escalations", "Wrong team, so the ticket is reassigned again and again"],
                        ["Agent", "Pick from one mixed queue, gather context from CRM, past tickets, emails and notes, resolve or escalate", "==20–40 s per ticket just gathering context=="],
                    ],
                },
            },
            {
                h: "What the wider market says",
                table: {
                    head: ["Figure", "What it means", "Source"],
                    rows: [
                        ["7 h 19 min", "A week lost by IT professionals to bloated software; ==63% want a single ITSM tool==", "Freshworks, 2022 (n = 2,001, vendor survey)"],
                        ["74%", "Of customers are frustrated when they have to repeat information", "Zendesk CX Trends 2026 (vendor survey)"],
                        ["25%+", "Of the week teams spend searching for information", "Atlassian State of Teams 2025 (vendor survey)"],
                        ["47 s", "Average attention on one screen, and almost half an hour to recover from an interruption", "Gloria Mark, UC Irvine"],
                    ],
                },
            },
            { p: "It matched what the swimlane showed: ==20–40 s per ticket just gathering context==, before any real work." },
            { note: "My deck holds the full board. This page shows the synthesis only: no client data, internal screens or names." },
        ],
    },
    {
        title: "User pain points",
        hint: "Four roles, one broken ticket",
        blocks: [
            {
                h: "Where it breaks today",
                cards: [
                    { t: "Getting in", items: ["No single, known entry point for IT support", "Long forms; users ==pick the wrong category=="] },
                    { t: "Getting it to the right person", items: ["Wrong team, so the ticket is reassigned many times", "20–40 s per ticket just gathering context"] },
                    { t: "Getting it closed", items: ["Escalations happen late, when users are already upset", "==No real-time status==; users chase by email"] },
                ],
            },
            {
                h: "Pain points by role",
                cards: [
                    { t: "End user", items: ["No single entry point for support", "Incident or request? Can't tell", "Form lost on refresh", "No owner, SLA or real status", "Closed, but not fixed"] },
                    { t: "Agent", items: ["==Everything feels urgent==", "20–40 s lost per ticket", "Duplicates not linked", "SLA noticed too late"] },
                    { t: "Org admin", items: ["Lots of data, no direction", "Wrong team, reassigned again", "No root-cause view", "Escalations come late"] },
                    { t: "Super admin", items: ["==No impact preview on changes==", "No org-health signal", "Settings changed org by org", "Risky actions buried in logs"] },
                ],
            },
        ],
    },
    {
        title: "Key insights",
        hint: "From pain points to 70+ HMWs",
        blocks: [
            { quote: "Fragmented context, reactive prioritisation and repetitive work ==overload the agent before the real work starts==." },
            {
                h: "Problem statement",
                p: "End users can't raise, track and resolve IT tickets confidently: the experience is fragmented, opaque and unguided, so they ==contact support again and stop trusting it==.",
            },
            {
                h: "How might we…",
                table: {
                    head: ["Role", "How might we…"],
                    rows: [
                        ["End user", "get every ticket right the first time? · keep users updated without chasing?"],
                        ["Agent", "==tell high priority from high impact?== · warn before an SLA breach? · group duplicate tickets?"],
                        ["Org admin", "turn SLA data into decisions? · route to the right team first time?"],
                        ["Super admin", "preview impact before a change? · pilot changes on one org first?"],
                    ],
                },
            },
            { stats: [{ n: "70+", l: "How Might We questions written" }, { n: "5", l: "roles · 3 ticket types · many tenants" }, { n: "6", l: "ideas taken forward" }] },
            {
                h: "From insight to idea",
                table: {
                    head: ["Idea", "What it does", "The pain it answers"],
                    rows: [
                        ["Smart triage", "“Broken? Need something? Question?” before the form", "Users pick the wrong category"],
                        ["Conversational creation", "An assistant asks, fills the form, the user reviews", "Long forms, lost on refresh"],
                        ["Playground board", "Link tickets on a canvas to find the root cause", "No root-cause view"],
                        ["Pilot-org rollout", "Try a change on one org for 24–48 h first", "No impact preview on changes"],
                        ["Tenant templates", "“Gold images” pre-set SLAs and roles", "Settings changed org by org"],
                        ["Agent gamification", "Points for fixes, minus points if a ticket reopens", "No view of own performance"],
                    ],
                },
            },
            { note: "The principle I kept: ==suggest, don't decide==. Prioritisation isn't fully automated, so agents stay in control." },
        ],
    },
    {
        title: "Competitive analysis",
        hint: "Six tools, one open lane",
        blocks: [
            {
                h: "3TFlow against the market",
                table: {
                    head: ["Capability", "ServiceNow", "Jira SM", "Freshservice", "Zendesk", "HaloITSM", "ManageEngine MSP", "3TFlow"],
                    rows: [
                        ["Incident, request and change in one place", "●", "●", "◐", "◐", "●", "●", "●"],
                        ["One partner serving many client orgs", "◐", "◐", "◐", "◐", "●", "●", "●"],
                        ["SLA tiers set by each client's contract", "◐", "◐", "◐", "◐", "●", "●", "●"],
                        ["Contract negotiation in the product", "◐", "○", "○", "○", "◐", "◐", "●"],
                        ["Visual root-cause board", "◐", "◐", "◐", "◐", "◐", "◐", "●"],
                        ["Guided intake and autosaved drafts", "●", "◐", "◐", "◐", "◐", "◐", "●"],
                        ["Auto-routing and duplicate merge", "●", "●", "●", "●", "●", "●", "●"],
                        ["Timesheets tied to client billing", "◐", "○", "◐", "○", "●", "●", "●"],
                        ["Reports, audit log and CSAT", "●", "●", "●", "●", "●", "●", "●"],
                    ],
                    hl: 3,
                    tag: "The gap",
                },
            },
            { p: "● full · ◐ partial · ○ none. My reading of public product information in 2026." },
            {
                cards: [
                    { t: "Table stakes", items: ["Routing, duplicate merge, reports, audit log and CSAT: every tool has them"] },
                    { t: "Where the market is weak", items: ["==Client contracts, in-product negotiation and a visual root-cause board=="] },
                    { t: "3TFlow's lane", items: ["Support partners serving many client orgs on negotiated contracts", "Competitors are powerful but dense; ==3TFlow could win on clarity=="] },
                ],
            },
            {
                h: "Where 3TFlow stands out",
                table: {
                    head: ["", "3TFlow", "Others"],
                    rows: [
                        ["Contracts drive SLAs", "A Gold · Silver · Bronze matrix in minutes, hours or days, with a preview before go-live", "Admins set SLA rules; contracts live in a separate module"],
                        ["SLA negotiation, built in", "The client requests terms, the admin approves or declines, the client can ask again", "Handled over email or offline"],
                        ["Root-cause playground", "Link related tickets on a shared canvas and comment together", "Problem records and ticket links, no visual board"],
                        ["Billing-safe timesheets", "Edit one day, not a whole week, so client billing stays accurate", "Standard in MSP suites; missing in Jira SM and Zendesk"],
                    ],
                },
            },
        ],
    },
    {
        title: "System mapping",
        hint: "Five roles, one ticket's life",
        blocks: [
            { image: { src: site("3tflow/system-map.svg"), alt: "System map of 3TFlow: the end user and the support agent on the left, the org admin and the support partner on the right, the ticket loop of raise, route, resolve and review in the middle, and the contract, the rules and the research underneath", caption: "Who and what one ticket's life depends on" } },
            {
                h: "One platform, five roles",
                p: "Client orgs raise tickets. Support-partner orgs resolve them. ==Everyone sees only what they need.==",
                cards: [
                    { t: "More control", items: ["Super admin: configures the platform", "Support partner admin: contracts, SLAs, teams", "Org / client admin: oversees their org"] },
                    { t: "Closer to the issue", items: ["Agent: resolves tickets", "End user: raises tickets"] },
                    { t: "Rules I designed around", items: ["Only client orgs raise tickets and get an SLA", "Org admins see SLAs, can't edit them", "Plans gate modules: Basic · Pro · Enterprise", "Swap a client's support partner anytime", "==Every important change is audited=="] },
                ],
            },
            {
                h: "Causal loops",
                loops: [
                    { name: "The chasing spiral", note: "Users who can't see status chase by email; every chase interrupts an agent and slows the next fix.", vars: [{ t: "Users chasing by email", lever: true }, { t: "Agent interruptions" }, { t: "Time to resolve" }], signs: ["+", "+", "+"], lever: "Real-time status steps in" },
                    { name: "Everything is urgent", note: "When every ticket looks urgent, agents fall behind, SLAs slip and late escalations make more tickets urgent.", vars: [{ t: "Tickets marked urgent" }, { t: "Agent overload" }, { t: "SLA breaches", lever: true }, { t: "Late escalations" }], signs: ["+", "+", "+", "+"], lever: "Breach warnings step in" },
                    { name: "Routing learns", note: "SLA data shows the org admin where tickets bounce; better routing means fewer reassignments and fewer breaches.", vars: [{ t: "SLA breaches" }, { t: "Routing fixes", lever: true }, { t: "Reassignments" }], signs: ["+", "-", "+"], lever: "SLA reports step in" },
                ],
            },
        ],
    },
    {
        title: "User persona",
        hint: "Priya, Aarav and Rohan",
        blocks: [{ persona: priya }, { persona: aarav }, { persona: rohan }, { note: "Personas are research syntheses of the roles, not individual participants." }],
    },
]

// level: how low the emotion line sits at each stage, 0 positive to 1 negative. The feelings are from the journey slide; the heights are approximate.
export const threetflowEcosystem = {
    statement: "One shift for Aarav, the support agent: where the time goes, and where 3TFlow steps in.",
    hubLabel: "3TFlow",
    personas: [
        {
            role: "Aarav Mehta",
            mark: "AM",
            face: tfFaces.aarav,
            tagline: "The L1 support agent, working through 40–60 tickets a day.",
            wants: "All the context in one place.",
            stuck: "Everything feels urgent.",
            phases: [
                { name: "Ticket intake", does: "Opens the queue and picks a ticket.", feel: "Overwhelmed", level: 0.66, pain: "Everything feels urgent", hub: "Smart queue, ticket clustering" },
                { name: "Context gathering", does: "Checks the CRM, history and notes.", feel: "Frustrated", level: 0.82, pain: "20–40 s lost per ticket", hub: "One context panel" },
                { name: "Prioritisation", does: "Scans the queue by tags.", feel: "Uncertain", level: 0.6, pain: "Priority isn't impact", hub: "Predictive SLA alerts" },
                { name: "Working on it", does: "Diagnoses, or reassigns.", feel: "Pressured", level: 0.86, pain: "Duplicates, wrong team", hub: "Duplicate detection, skill routing" },
                { name: "Resolution", does: "Writes the reply and closes.", feel: "Rushed", level: 0.68, pain: "Generic replies under SLA", hub: "Reply suggestions" },
                { name: "After", does: "Moves on, or reopens.", feel: "Disconnected", level: 0.55, pain: "No feedback loop", hub: "Performance dashboard" },
            ],
        },
    ],
}
