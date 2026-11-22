// 3TFlow: under an NDA with SSK Technologies. Everything here is either already public on https://3tflow.com
// (the landing page and the three product screens it shows) or the headline numbers from the earlier NDA page.
// No internal screens, research or flows. The screens are stills, so they sit in the same frames as the other pages' videos.
const img = (n) => `../../assets/images/3tflow/${n}`
const still = (n, label, ratio) => ({ src: img(n), label, ratio })

const LOCK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10.5" width="16" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.5" r="1.3" fill="currentColor" stroke="none"/></svg>`

// arriving from the home card's glass lock: the same glass dissolves into the page
export const ndaVeil = {
    css: ".veil{position:fixed;inset:0;z-index:10;display:grid;place-items:center;background:rgba(234,243,255,.55);backdrop-filter:blur(22px) saturate(160%);-webkit-backdrop-filter:blur(22px) saturate(160%);pointer-events:none;animation:veil-out .6s .1s cubic-bezier(.2,.8,.25,1) forwards}.veil svg{width:56px;height:56px;color:rgb(58,61,170);animation:lock-out .5s cubic-bezier(.2,.8,.25,1) forwards}@keyframes veil-out{to{opacity:0;backdrop-filter:blur(0);-webkit-backdrop-filter:blur(0)}}@keyframes lock-out{to{opacity:0;transform:scale(.7)}}@media (prefers-reduced-motion:reduce){.veil{display:none}}",
    pre: `        <script>try{if(sessionStorage.getItem("nda-lock")==="1"&&!matchMedia("(prefers-reduced-motion: reduce)").matches){sessionStorage.removeItem("nda-lock");document.write('<div class="veil" aria-hidden="true">${LOCK}</div>')}}catch(e){}</script>`,
}

export const threetflow = {
    title: "3TFlow",
    meta: "Product design intern · SSK Technologies · March 2026 to now",
    company: { name: "SSK Technologies", logo: "../../assets/images/logos/ssk.png" },
    headline: "One place for a support team's tickets, tasks and hours, run against every client's SLA.",
    accent: "rgb(79, 82, 214)",
    nda: true,
    note: "This project is under an NDA with SSK Technologies. The screens on this page are the ones already public on 3tflow.com. Happy to walk through the work at itsturiyajoshi11@gmail.com.",
    ratio: 1321 / 728,
    hero: { ...still("landing.jpg", "The 3TFlow landing page: “Three touchpoints. Infinite flow.”, with tickets in open, in progress and review states", 1440 / 740), title: "Live at 3tflow.com", link: "https://3tflow.com" },
    brief: {
        context: "My internship at SSK Technologies, designing an IT service management platform end to end for 5 user roles.",
        background: "Support teams closed one ticket across spreadsheets, chat and several other tools. SLAs slipped quietly, and status was chased by hand.",
        impact: [
            { n: "2000+", l: "screens designed" },
            { n: "6 → 3", l: "steps to assign a ticket" },
            { n: "4000+", l: "design system components" },
        ],
        impactNote: "The product is live, with a Reports module and SLA tracking.",
    },
    understanding: {
        quote: "Closing one ticket took five tools, and nobody could see the SLA clock.",
        method: "From the product's public story. The research behind it stays under the NDA.",
        stickiesTitle: "What support teams were dealing with",
        stickies: [
            { label: "Scattered tools", notes: ["Requests spread across inboxes and chat threads", "Spreadsheets as the tracker", "Five tools to close one ticket"] },
            { label: "SLA blind spots", notes: ["Tickets quietly age out", "Status updates chased by hand"] },
            { label: "Time and billing", notes: ["Hours logged away from the ticket", "Invoices that are hard to defend"] },
        ],
    },
    story: {
        did: "So the platform keeps the whole job in one place, from the client's request to the invoice.",
        reflection: "What I can share.",
    },
    why: {
        title: "Who it's for",
        statement: "The people doing the work, from the first ticket routed in the morning to the last one closed.",
        points: [
            { label: "Support admin", text: "Routes incoming tickets to the right team and keeps every client inside their SLA." },
            { label: "Support agent", text: "Works through the tasks, logs the hours and closes the ticket." },
            { label: "The client", text: "Raises requests through a portal, with priority and SLA set from the start." },
        ],
    },
    didNote: "These are the product screens shown on the public website. The flows behind them stay under the NDA.",
    did: [
        { lead: "Every ticket in one queue:", text: "what's unresolved, what's unassigned, and how close each one is to its SLA.", clips: [still("tickets.jpg", "3TFlow dashboard: unresolved and unassigned tickets, a status breakdown, open tickets per project and recent tickets with SLA progress", 1321 / 812)] },
        { lead: "One ticket, many tasks:", text: "the work splits across teams on a board, and every card shows its owner and the SLA time left.", clips: [still("tasks.jpg", "3TFlow task board with To Do, In Progress, Review and Done columns")] },
        { lead: "Time sits on the work:", text: "hours are logged against the task, billable or not, and roll up into reports and invoices.", clips: [still("timesheets.jpg", "3TFlow timesheet with hours logged today and this week, and a billable tag on each entry")] },
    ],
    process: [],
    reflection: [
        { label: "Designing at scale", text: "Across 2000+ screens, the design system had to carry most of the decisions. It grew to 4000+ components." },
        { label: "Fewer steps", text: "Assigning a ticket went from 6 steps to 3." },
        { label: "Under NDA", text: "The flows, research and decisions are private. I'm happy to walk through them on a call." },
    ],
}
