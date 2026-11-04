// Adaptive Emotional AI Co-Pilot: page content, from the "Case Study Slides — Tesla" page of the Automobile Design Expo Figma file.
// The deck's interview slide is an unfilled placeholder and its usability map is a heuristic review, so nothing here claims interviews or user testing.
const img = (n) => `../../assets/images/copilot/${n}`
const clip = (id, label, ratio) => ({ src: `../../assets/video/work/${id}.mp4`, poster: `../../assets/video/work/${id}.jpg`, label, ratio })
const CLUSTER = 1760 / 660
const CENTRE = 1280 / 800

const nadia = {
    name: "Nadia Rao",
    role: "The long-haul highway driver",
    meta: "34 · product manager · a 3–4 hour highway run, two or three times a month, often after a full day of work",
    quote: "“Notice before I do, and tell me kindly.”",
    traits: ["Electric car", "Driver assistance", "Camera facing her"],
    goals: ["Arrive alert and unhurried", "Keep driver assist without being nagged", "Know early when to stop"],
    columns: [
        { t: "Frustrations", items: ["Warnings that come late, then repeat", "Not sure the camera can see her with sunglasses on", "Road stress builds with nothing to release it"] },
        { t: "Behaviours", items: ["Pushes on when tired", "Silences alerts that nag", "Trusts one fix: stopping"] },
        { t: "Needs from the co-pilot", items: ["Early, gentle, graded cues", "Glanceable, no reading at speed", "Says what it can and cannot see", "Footage stays in the car"] },
    ],
}

const folders = [
    {
        title: "Primary & secondary research data",
        hint: "Standards, human factors, driver posts",
        blocks: [
            {
                h: "How the data was gathered",
                cards: [
                    { t: "Secondary research", items: ["Fatigue and crash data (AAA)", "EU and US rules for driver monitoring", "The Euro NCAP 2026 protocol"] },
                    { t: "Human factors", items: ["Glance limits: 2 s each, 12 s total", "Ambient displays against workload", "Wheel grip, reach and camera placement"] },
                    { t: "Public driver voices", items: ["13 real posts from public driver discussions", "Tired driving, alerts, trust and road stress", "Quoted as written, labelled by community"] },
                ],
            },
            {
                h: "The numbers that shaped the concept",
                table: {
                    head: ["Figure", "What it means", "Source"],
                    rows: [
                        ["7% · 21%", "Of all crashes, and of fatal crashes, involve driver fatigue", "AAA, via arXiv 2401.10213"],
                        ["Jul 2024", "Drowsiness and attention warning became mandatory on all new EU registrations", "EU General Safety Regulation, via Seeing Machines"],
                        ["2 s · 12 s", "Maximum single glance, and total glance time away from the road", "US DOT / NHTSA visual-manual guideline"],
                        ["3 of 6", "Cars tested had driver-monitoring alerts likely to be switched off", "Fleet News / What Car?"],
                        ["25 vs 2", "Euro NCAP 2026 gives driver engagement up to 25 points; the 2023 rules gave 2 for monitoring", "Euro NCAP 2026, via Smart Eye"],
                        ["Shorter", "Reaction times with ambient displays, with no rise in workload", "Leeds Lightband study, AutoUI ’21"],
                    ],
                },
            },
        ],
    },
    {
        title: "User pain points",
        hint: "Late, loud and hard to trust",
        blocks: [
            {
                h: "Five problems",
                table: {
                    head: ["What goes wrong", "The evidence"],
                    rows: [
                        ["Warnings arrive late", "Near-misses come before any alert (r/IBEW, r/ADHD)"],
                        ["Alerts nag, then get switched off", "Beeps repeat; 3 of 6 cars' alerts likely to be turned off"],
                        ["Drivers doubt the sensing", "Sunglasses, smudges and sensitivity (r/TeslaLounge, r/cybertruck)"],
                        ["Stress is invisible", "Anger builds with nothing to release it (r/delhi, r/melbourne)"],
                        ["Screens compete with the road", "2 s per glance, 12 s total (US DOT / NHTSA)"],
                    ],
                },
            },
            {
                h: "What drivers said",
                cards: [
                    { t: "Drivers fight sleep alone", items: ["They use improvised tricks, with nothing in the car helping"] },
                    { t: "Tiredness shows up as near-misses", items: ["The warning signs come before any alert does"] },
                    { t: "The fix they trust is stopping", items: ["So the co-pilot should make a rest stop easy to say yes to"] },
                ],
            },
        ],
    },
    {
        title: "Key insights",
        hint: "Five problems, five design moves",
        blocks: [
            { quote: "Fatigue is spotted late. Alerts that nag get switched off. Drivers want help they can trust, not a scolding." },
            {
                table: {
                    head: ["Problem", "Design move", "How"],
                    rows: [
                        ["Warnings arrive late", "Show state early and quietly", "Colour at the edge of vision, not words in the centre"],
                        ["Alerts nag", "Escalate in steps with persistence", "Each cue earns attention; the loudest is rare"],
                        ["Drivers doubt the sensing", "Say what the car can and cannot see", "A grey “sensing limited” state, never a silent guess"],
                        ["Stress is invisible", "Treat stress as a state too", "Respond with cabin light and sound, not a scolding"],
                        ["Screens compete with the road", "Keep decisions off the road", "One-tap answers; make stopping easy to accept"],
                    ],
                },
            },
            {
                h: "How might we",
                cards: [
                    { t: "Sense and adapt", items: ["Detect early drowsiness or stress with nothing new to operate", "Change light, sound and voice so the driver calms or wakes", "Learn each driver's own baseline"] },
                    { t: "Earn trust", items: ["Step in without sounding judgemental", "Make the reading visible and explainable", "Keep camera and biometric data on the car", "Avoid false alarms"] },
                    { t: "Stay out of the way", items: ["Accept help with one word or one glance", "Make drowsiness and stress legible in a glance", "Respond with one press from the wheel"] },
                ],
            },
            {
                h: "Decisions, and what each one costs",
                table: {
                    head: ["Decision", "Because", "Trade-off"],
                    rows: [
                        ["Show state as heat at the screen edge", "Peripheral colour needs no glance", "Less precise than text, so a word and an icon sit beside it"],
                        ["Colour, word and icon for every state", "Colour alone isn't reliable in every light", "More elements per state"],
                        ["Escalate by persistence, with two sensors agreeing", "Alerts get switched off, and false alarms add stress", "The first cue can come a little later"],
                        ["Show a grey “sensing limited” state", "Owners doubt the camera with sunglasses or a smudge", "Admitting limits can feel weaker"],
                        ["IR camera plus wheel grip, processed on the car", "Works at night, and footage never leaves the car", "Extra hardware"],
                        ["Offer a rest stop, not only a warning", "The fix drivers name is stopping", "Needs good map data"],
                    ],
                },
            },
        ],
    },
    {
        title: "Competitive analysis",
        hint: "Tesla, GM, Ford, Euro NCAP 2026",
        blocks: [
            { p: "How driver monitoring works today, and where it stops." },
            {
                table: {
                    head: ["", "Tesla today", "GM Super Cruise · Ford BlueCruise", "Euro NCAP 2026 bar", "This concept"],
                    rows: [
                        ["Sensing", "Cabin camera since May 2021; wheel torque before", "Driver-facing camera; hands-free allowed", "Direct eye and head tracking required", "IR camera plus wheel grip sensing"],
                        ["What it detects", "Attention; reportedly also yawns, blinks, leaning", "Attention on the road", "Drowsiness, short repeated glances, phone use, impairment", "Fatigue, stress, distraction, and when sensing is limited"],
                        ["How it warns", "Beeps and on-screen nags", "Wheel light bar (GM); cluster alerts (Ford)", "Warnings required", "Edge heat map, wheel haptics, voice"],
                        ["Escalation", "Strikes after repeated nags (owner reports)", "Not reviewed in depth", "Escalating warnings, then intervention or safe stop", "Graded by persistence; ends with a rest-stop offer"],
                        ["Stress and state", "Not addressed in public descriptions", "Not addressed in public descriptions", "Not in scope", "Yes: the cabin eases tension"],
                    ],
                },
            },
            { h: "Where nobody plays yet", image: { src: img("gap.png"), alt: "Map of competitors by what they sense and how they warn, with this concept alone in sensing state and warning calmly", caption: "Nobody yet senses state and warns calmly" } },
            { note: "Public descriptions, read by the designer. No internal data, and positions are qualitative." },
        ],
    },
    {
        title: "System mapping",
        hint: "Why fatigue spirals",
        blocks: [
            { p: "The co-pilot only works if it is designed with everything around it: the driver, the car, the road, the data and the rules." },
            { image: { src: img("system.png"), alt: "System map of the co-pilot with the driver, vehicle sensors, cabin and displays, environment, other road users, cloud and regulators", caption: "One co-pilot inside a larger system" } },
            { image: { src: img("loop.png"), alt: "Causal loop diagram of driver fatigue, misjudged alertness, early cues and alerts being switched off", caption: "Three loops share one variable: driver fatigue" } },
            {
                cards: [
                    { t: "The fatigue spiral", items: ["Tired drivers misjudge themselves and keep going"] },
                    { t: "The early cue", items: ["A cue that arrives early breaks the spiral"] },
                    { t: "When nagging backfires", items: ["Annoying alerts get switched off, so quiet, graded cues are the lever"] },
                ],
            },
        ],
    },
    {
        title: "User persona",
        hint: "Nadia, the long-haul driver",
        blocks: [{ persona: nadia }],
    },
]

// level: how low the emotion line sits at that stage, 0 positive to 1 negative, read from the journey slide. Times are illustrative.
const ecosystem = {
    statement: "On a four-hour drive, this is where it goes wrong, and where a co-pilot could step in.",
    hubLabel: "Co-pilot",
    personas: [
        {
            role: "Nadia Rao",
            mark: "NR",
            tagline: "The long-haul highway driver, often setting off after a full day of work.",
            wants: "To know early when to stop.",
            stuck: "Warnings that come late, then repeat.",
            phases: [
                { name: "Set off · 0:00", does: "Plans the route after a long day.", feel: "Focused, a little tired", level: 0.42, pain: "The car has no idea she is already tired", hub: "Quick state check" },
                { name: "Cruise · 0:45", does: "Assist on, music playing.", feel: "Comfortable", level: 0.25, pain: "Nothing says how she is doing", hub: "Calm teal read-out" },
                { name: "Lull · 2:00", does: "Blinks lengthen; drifts slightly.", feel: "Drifting, unaware", level: 0.54, pain: "The first sign is a late, loud beep", hub: "Amber glow at the edge" },
                { name: "Peak fatigue · 2:45", does: "Fights sleep; grips harder.", feel: "Anxious", level: 0.88, pain: "Nags repeat, so she silences them", hub: "Wheel pulse, voice, stop offer" },
                { name: "Rest stop · 3:10", does: "Pulls over and rests.", feel: "Relief", level: 0.47, pain: "Unsure how long to rest", hub: "Suggests a 15-minute break" },
                { name: "Arrive · 4:00", does: "Reaches the destination.", feel: "Reassured", level: 0.22, pain: "The trip teaches her nothing", hub: "Trip heat map" },
            ],
        },
    ],
}

export const copilot = {
    title: "Adaptive Emotional AI Co-Pilot",
    meta: "UX/UI design · Independent concept · Automotive",
    headline: "A driver-monitoring experience that notices fatigue and stress early, and answers with calm instead of alarms.",
    accent: "rgb(10, 128, 112)",
    ratio: CENTRE,
    hero: { ...clip("cp-hero", "The driver display moving from clear to stress, drowsy and critical", CLUSTER), ratio: CLUSTER },
    brief: {
        context: "A concept for the car's own screens: an infrared cabin camera and grip sensors in the wheel feed one calm, colour-coded read-out of how the driver is doing.",
        background: "Fatigue and stress look alike from the outside. Today's monitoring scolds, so drivers silence it.",
        impact: [
            { n: "13", l: "public driver posts read" },
            { n: "12", l: "sketches" },
            { n: "9", l: "wireframes reviewed" },
        ],
    },
    research: { statement: "First, I looked at why fatigue gets noticed so late, and why drivers switch alerts off.", folders },
    understanding: {
        quote: "Fatigue is spotted late. Alerts that nag get switched off. Drivers want help they can trust, not a scolding.",
        method: "Secondary research and standards, human factors, public driver discussions and a competitor review.",
        stickiesTitle: "Public driver posts, quoted as written",
        stickies: [
            { label: "Tired driving", notes: ["“i literally struggle to keep my eyes open behind the wheel”", "“I have to punch my leg to keep myself awake.”", "“Pulling over and taking a nap is the only thing that will save you”"] },
            { label: "Alerts that nag", notes: ["“I'm sure the beeping won't be extremely annoying when it does it 50 times on my way to work as I yawn.”", "“I'm getting way more ‘apply steering force’ nags”"] },
            { label: "Hard to trust", notes: ["“It's still a bit sensitive about looking at the screen.”", "“I thought maybe there was a smudge on the cabin camera”"] },
            { label: "Stress on the road", notes: ["“I got angry in that moment, shouted at him from inside my car”", "“if you were to lose your temper for every event then your mental health will suffer”"] },
        ],
    },
    ecosystem,
    story: {
        did: "So I designed a co-pilot that stays calm, and steps up only as tiredness or stress persists. Here it is across a drive.",
        process: "The work behind those screens.",
        reflection: "What I expect, and how I'd find out.",
    },
    didNote: "Prototype walkthroughs of the real screens, with sample data.",
    did: [
        { lead: "Early on, it stays quiet:", text: "the word and confidence lead, and heat rises from the screen edge.", clips: [clip("cp-states", "The cluster moving from clear to stress, then undoing the cabin change", CLUSTER)] },
        { lead: "It says what it can and cannot see:", text: "heat sits on the signal source, and a grey state admits its limits.", clips: [clip("cp-faces", "Heat maps for each state on two stock portraits", 1880 / 780)] },
        { lead: "If tiredness persists, it escalates in steps:", text: "each cue earns attention, and the loudest is rare.", clips: [clip("cp-escalate", "The cluster escalating from drowsy to critical", CLUSTER)] },
        { lead: "Then it asks one question:", text: "the map stays first until a decision is needed.", clips: [clip("cp-centre", "The centre display moving from the map to a rest-stop question", CENTRE)] },
        { lead: "The driver answers without looking:", text: "keys you can tell apart by touch, right on the wheel.", clips: [clip("cp-wheel", "Steering wheel light and thumb controls", 1.6)] },
        { lead: "After parking, the trip explains itself:", text: "a heat map shows when alertness dipped.", clips: [clip("cp-trip", "Reviewing the trip heat map by signal", CENTRE)] },
    ],
    process: [
        { label: "Sketches: where state shows up", image: img("sketches.png") },
        { label: "Sketches: camera, wheel, escalation", image: img("sketches2.png") },
        { label: "Nine wireframes", image: img("initial.png") },
        { label: "Heuristic usability map", image: img("usability.png") },
        { label: "UI style guide", image: img("style.png") },
        { label: "Alert-type heat-map library", image: img("library.jpg") },
    ],
    reflection: [
        { label: "What I expect", text: "Graded cues get dismissed less often than one loud alert, and a rest-stop offer is accepted more than a plain warning. These are hypotheses, not results." },
        { label: "How I'd find out", text: "A night-drive simulator with 8–12 drivers, eye tracking on every glance, and shadow mode logging when it would have alerted." },
        { label: "Risks to watch", text: "False alarms add stress, a blocked camera must say so, and drivers must feel in control of their own data." },
    ],
}
