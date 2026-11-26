// Adaptive Emotional AI Co-Pilot: page content, from the "Case Study Slides — Tesla" page of the Automobile Design Expo Figma file.
// The deck's interview slide is an unfilled placeholder and its usability map is a heuristic review, so nothing here claims interviews or user testing.
const img = (n) => `../../assets/images/copilot/${n}`
const clip = (id, label, ratio) => ({ src: `../../assets/video/work/${id}.mp4`, poster: `../../assets/video/work/${id}.jpg`, label, ratio })
const CLUSTER = 1760 / 660
const CENTRE = 1280 / 800

const nadia = {
    name: "Nadia Rao",
    role: "The long-haul highway driver",
    face: { skin: "#e3a982", hair: "bob", hairColor: "#3a2418", bg: "#a9d8ea", top: "#e98aa5", shades: true },
    meta: "34 · product manager · a 3–4 hour highway run, two or three times a month, often after a full day of work",
    quote: "“==Notice before I do, and tell me kindly.==”",
    traits: ["Electric car", "Driver assistance", "Camera facing her"],
    goals: ["Arrive alert and unhurried", "Keep driver assist without being nagged", "Know early when to stop"],
    columns: [
        { t: "Frustrations", items: ["==Warnings that come late, then repeat==", "Not sure the camera can see her with sunglasses on", "Road stress builds with nothing to release it"] },
        { t: "Behaviours", items: ["Pushes on when tired", "Silences alerts that nag", "Trusts one fix: stopping"] },
        { t: "Needs from the co-pilot", items: ["==Early, gentle, graded cues==", "Glanceable, no reading at speed", "Says what it can and cannot see", "Footage stays in the car"] },
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
                        ["7% · 21%", "Of all crashes, and of fatal crashes, ==involve driver fatigue==", "AAA, via arXiv 2401.10213"],
                        ["Jul 2024", "Drowsiness and attention warning became mandatory on all new EU registrations", "EU General Safety Regulation, via Seeing Machines"],
                        ["2 s · 12 s", "Maximum single glance, and total glance time away from the road", "US DOT / NHTSA visual-manual guideline"],
                        ["3 of 6", "Cars tested had driver-monitoring alerts ==likely to be switched off==", "Fleet News / What Car?"],
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
                        ["Warnings arrive late", "==Near-misses come before any alert== (r/IBEW, r/ADHD)"],
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
                    { t: "Drivers fight sleep alone", items: ["They use improvised tricks, with ==nothing in the car helping=="] },
                    { t: "Tiredness shows up as near-misses", items: ["The warning signs come before any alert does"] },
                    { t: "The fix they trust is stopping", items: ["So the co-pilot should ==make a rest stop easy to say yes to=="] },
                ],
            },
        ],
    },
    {
        title: "Key insights",
        hint: "Five problems, five design moves",
        blocks: [
            { quote: "Fatigue is spotted late. ==Alerts that nag get switched off.== Drivers want help they can trust, not a scolding." },
            {
                table: {
                    head: ["Problem", "Design move", "How"],
                    rows: [
                        ["Warnings arrive late", "Show state early and quietly", "==Colour at the edge of vision, not words in the centre=="],
                        ["Alerts nag", "Escalate in steps with persistence", "Each cue earns attention; the loudest is rare"],
                        ["Drivers doubt the sensing", "Say what the car can and cannot see", "A grey “sensing limited” state, ==never a silent guess=="],
                        ["Stress is invisible", "Treat stress as a state too", "Respond with cabin light and sound, not a scolding"],
                        ["Screens compete with the road", "Keep decisions off the road", "One-tap answers; make stopping easy to accept"],
                    ],
                },
            },
            {
                h: "How might we",
                cards: [
                    { t: "Sense and adapt", items: ["Detect early drowsiness or stress with nothing new to operate", "Change light, sound and voice so the driver calms or wakes", "Learn each driver's own baseline"] },
                    { t: "Earn trust", items: ["Step in without sounding judgemental", "Make the reading visible and explainable", "==Keep camera and biometric data on the car==", "Avoid false alarms"] },
                    { t: "Stay out of the way", items: ["Accept help with one word or one glance", "Make drowsiness and stress legible in a glance", "Respond with one press from the wheel"] },
                ],
            },
            {
                h: "Decisions, and what each one costs",
                table: {
                    head: ["Decision", "Because", "Trade-off"],
                    rows: [
                        ["Show state as heat at the screen edge", "==Peripheral colour needs no glance==", "Less precise than text, so a word and an icon sit beside it"],
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
        title: "Car and wheel ergonomics",
        hint: "Screen map, glance zones, ergonomics",
        blocks: [
            { p: "The standards, human-factors numbers and sketches, synthesised into three boards: what shows where at each level, how long each zone may hold the eyes, and how every interface is reached. India is right-hand drive, so every layout is mirrored for RHD." },
            {
                h: "Screen map: what shows where, at each level",
                p: "Rows are surfaces, columns are escalation levels. Sensing is always on: the IR camera and the wheel grip pads read continuously, the camera leads on drowsiness and the wheel corroborates. ==Two signals must agree before L2==, and everything is processed on the car, with no video stored.",
                table: {
                    head: ["Surface", "Monitor · L0", "Nudge · L1", "Suggest · L2", "Assist · L3–L4"],
                    rows: [
                        ["Wheel rim", "Steady state colour at low brightness", "Colour shifts slowly over about 10 s", "Slow pulse at a breathing pace", "Pulse at higher brightness. Orients only, ==never the sole alert=="],
                        ["Instrument cluster", "Vitals chip only", "Chip names the state", "Banner: one message, one action", "Banner stays until answered; edge heat in the periphery"],
                        ["HUD and periphery", "Speed and navigation only", "Small state dot", "One line, four words at most", "Same line, plus a direction cue towards the stop"],
                        ["Centre display", "Navigation as normal; monitoring view and settings at rest", "No change", "Co-pilot card with the reason and two equal actions", "Full-width guidance to the nearest safe stop"],
                        ["Wheel keys and squeeze", "Idle", "Idle", "Accept (round) and Later (flat) live; double squeeze acknowledges", "Same keys; ==Later snoozes, never penalised=="],
                        ["Voice and sound", "Silent", "Music eases in tempo and volume, after asking", "Speaks once, then waits for Yes or Later", "One short repeat if unanswered, then silent; calls and media lowered"],
                    ],
                },
            },
            { note: "The ladder is a design proposal: no source publishes escalation thresholds or persistence times." },
            {
                h: "Glance and reach zones",
                stats: [
                    { n: "1.5 s", l: "single-glance ceiling designed to (NHTSA allows 2 s)" },
                    { n: "8 s", l: "total task time (JAMA); NHTSA allows 12 s" },
                    { n: "3.5 s", l: "EU distraction warning trips at this gaze below 30° (50 km/h+)" },
                    { n: "17.5 mm", l: "touch target floor; 20–24 mm for frequent actions" },
                    { n: "20 arcmin", l: "default text size; 16 for time-critical, icons 41+" },
                    { n: "2 steps", l: "maximum menu depth; physical keys for the basics" },
                ],
            },
            {
                cards: [
                    { t: "Eyes forward · within 5° of the road", items: ["0 deliberate glances; orienting only", "Peripheral response 1.3–1.9 s; ==shapes are read faster than text==", "Rim light and HUD edge cue never carry a warning alone", "Flash 3–4 Hz for urgency; avoid 60–120 a minute, which reads as an indicator"] },
                    { t: "Cluster · within 15° of sight, under 30° down", items: ["One glance of 1.5 s or less; full status in 2 glances", "Colour + icon + a label of 3–4 words", "Contrast 7:1 target, never under 3:1", "At 700 mm eye distance, 20 arcmin is a 4.1 mm cap height"] },
                    { t: "Centre display · driver's left in RHD", items: ["Glance 1.5 s, hard ceiling 2 s, task 8 s", "No scrolling or text entry while driving", "Settings beyond toggles only when parked", "Expose warning style, volume and privacy, ==not detection sensitivity=="] },
                    { t: "Hands on the wheel · rim grip and thumb zone", items: ["0 s eyes off: physical Accept and Later keys that differ in place, shape and feel", "Grip zones about 8–11 and 1–4 o'clock, either hand enough", "==Symmetric two-hand grip: only 6–25% of drivers==", "Rim ECG usable 45.62% of drive time: corroborate, never trigger"] },
                    { t: "Voice · cabin-wide, dedicated button", items: ["One short offer, answerable by one word", "No repeat for 15 minutes at L2", "Workload 1.88–4.14 of 5, depending on task and errors", "Always an equal non-voice path"] },
                ],
            },
            {
                h: "Interaction ergonomics table",
                table: {
                    head: ["Interface", "Reach zone", "Glance budget", "Modality and levels", "Numbers to design to"],
                    rows: [
                        ["Rim grip sensing", "On the rim, about 8–11 and 1–4 o'clock, rotating with the wheel; either hand enough", "0 s, passive", "Capacitive, 3–4 electrodes · L0–L2 input, corroborating only", "One hand 33–40%+ of driving; hands-off warning at latest 15 s (UN R79)"],
                        ["Rim light", "Low peripheral field; hands may cover the upper arc", "0 deliberate glances; response 1.3–1.9 s", "Luminance, position, rhythm, ==never colour alone== · L0–L2, with L3", "Flash 3–4 Hz; breathing pulse about 10–12 a minute"],
                        ["Cluster vitals chip", "Within 15° of sight, under 30° down; critical state within 5°", "One glance 1.2–1.5 s; full status in 2", "Icon + 3–4 word label, 4 info units · L0 state to L3 message", "Text 20 arcmin; state icon 86 arcmin; contrast 7:1"],
                        ["HUD critical and edge cue", "About 5° off and 5° below the line of sight, mirrored for RHD", "Shorter than the cluster; counts toward the 8 s task", "Shape or symbol first, text slowest · L3–L4", "Shape response 1.3–1.5 s against 1.9 s for text"],
                        ["Centre display prompts", "Driver's left, within 30° down, reachable by the left hand", "1.5 s a glance, 2 s ceiling, 8 s task", "Visual card + wheel-key response; no scroll, no text entry · L2, never L4", "Touch 17.5 mm floor; 2 menu steps at most"],
                        ["Wheel thumb keys", "Thumb zone from a gripped rim; test P5 female and P95 male", "0 s eyes; feedback within 0.25 s", "Physical keys that differ in place, shape and feel · L2–L3", "P95 fingertip 22 mm; keycap 15 mm+"],
                        ["Squeeze gesture", "Rim, either hand", "0 s", "Pressure or grip pattern · confirm only, while a prompt is open", "Calibrated per-driver threshold"],
                        ["IR driver camera", "In or behind the cluster; a covered camera must say so", "None, passive", "NIR, 30 fps+, 1 MP+ · source for L1–L4", "Occlusion alert within 10 s; clear sunglasses must work"],
                        ["Voice", "Cabin-wide, dedicated button", "About 0 s eyes", "One short offer, one-word answer · L2–L4", "One prompt, no repeat for 15 min"],
                    ],
                },
            },
            { note: "Status of every number is tracked on the boards: V sourced, C calculated, A a design assumption, U unverified. Thumb-key size, travel and force, squeeze force and glow efficacy are still unverified." },
            { h: "The boards", image: { src: img("screen-map.jpg"), alt: "Screen map board: six surfaces across four escalation levels, from Monitor to Assist", caption: "Screen map: what shows where, at each level" } },
            { image: { src: img("glance-zones.jpg"), alt: "Glance and reach zones board: six budgets and five zones from eyes forward to voice", caption: "Glance and reach zones" } },
            { image: { src: img("ergonomics-table.jpg"), alt: "Interaction ergonomics table: one row per interface with reach zone, glance budget, modality, levels, numbers and evidence", caption: "Interaction ergonomics table" } },
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
                        ["Stress and state", "Not addressed in public descriptions", "Not addressed in public descriptions", "Not in scope", "Yes: ==the cabin eases tension=="],
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
            { image: { src: img("system-map.svg"), alt: "System map of the co-pilot: the driver and the road on the left, the vehicle sensors and the cabin displays on the right, the escalation loop of monitor, nudge, suggest and assist in the middle, and the cloud, the rules and the research underneath", caption: "One co-pilot inside a larger system" } },
            { image: { src: img("loop.png"), alt: "Causal loop diagram of driver fatigue, misjudged alertness, early cues and alerts being switched off", caption: "Three loops share one variable: driver fatigue" } },
            {
                cards: [
                    { t: "The fatigue spiral", items: ["Tired drivers misjudge themselves and keep going"] },
                    { t: "The early cue", items: ["==A cue that arrives early breaks the spiral=="] },
                    { t: "When nagging backfires", items: ["Annoying alerts get switched off, so ==quiet, graded cues are the lever=="] },
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
            face: nadia.face,
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
    meta: "Automotive HMI · Car and steering wheel ergonomics · Independent concept",
    headline: "A co-pilot designed around the driver's eyes and hands: it notices fatigue early, and speaks through light, touch and a single glance.",
    accent: "rgb(10, 128, 112)",
    ratio: CENTRE,
    hero: { ...clip("cp-hero", "The driver display moving from clear to stress, drowsy and critical", CLUSTER), ratio: CLUSTER },
    brief: {
        context: "A concept for the car itself: an infrared cabin camera and grip sensors in the steering wheel feed a calm read-out, placed where the eyes and hands already are.",
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
        did: "So I designed a co-pilot that stays calm, steps up only as tiredness or stress persists, and fits the driver's eyes and hands.",
        process: "The work behind those screens.",
        reflection: "What I expect, and how I'd find out.",
    },
    why: {
        title: "Designed around the driver's body",
        statement: "In a car the body sets the rules: eyes stay on the road and hands stay on the wheel, so every cue has a glance budget and a reach zone.",
        points: [
            { label: "Where the eyes can go", text: "The critical cue sits within 5° of the road. The cluster sits within 15° of the line of sight, readable in one glance of 1.5 s or less (NHTSA allows 2 s)." },
            { label: "What the thumbs can reach", text: "Accept and Later sit in the thumb zone of a gripped rim. They differ in place, shape and feel: convex to accept, concave and ridged to defer." },
            { label: "What the hands already feel", text: "Grip zones at about 8–11 and 1–4 o'clock sense passively, and either hand is enough: only 6–25% of drivers hold the wheel symmetrically. Haptics stay subtle and escalate." },
        ],
    },
    didNote: "Prototype walkthroughs of the real screens with sample data, then the same design in realistic cockpit mockups.",
    did: [
        { lead: "Early on, it stays quiet:", text: "the word and confidence lead, and heat rises from the screen edge.", clips: [clip("cp-states", "The cluster moving from clear to stress, then undoing the cabin change", CLUSTER)] },
        { lead: "It says what it can and cannot see:", text: "heat sits on the signal source, and a grey state admits its limits.", clips: [clip("cp-faces", "Heat maps for each state on two stock portraits", 1880 / 780)] },
        { lead: "If tiredness persists, it escalates in steps:", text: "each cue earns attention, and the loudest is rare.", clips: [clip("cp-escalate", "The cluster escalating from drowsy to critical", CLUSTER)] },
        { lead: "Then it asks one question:", text: "the map stays first until a decision is needed.", clips: [clip("cp-centre", "The centre display moving from the map to a rest-stop question", CENTRE)] },
        { lead: "The driver answers without looking:", text: "keys you can tell apart by touch, right on the wheel.", clips: [clip("cp-wheel", "Steering wheel light and thumb controls", 1.6)] },
        { lead: "After parking, the trip explains itself:", text: "a heat map shows when alertness dipped.", clips: [clip("cp-trip", "Reviewing the trip heat map by signal", CENTRE)] },
        { lead: "Then I put it in a real car:", text: "a realistic cockpit on a highway drive, from the rim light and grip zones to the cluster and the thumb keys.", clips: [clip("cp-cockpit", "Realistic cockpit mockup: the rim light, grip zones, cluster state and thumb keys, one at a time", 16 / 9)] },
        { lead: "The car and wheel ergonomics behind it:", text: "where the eyes can go, what the thumbs press and what the wheel feels.", clips: [clip("cp-ergonomics", "Car and steering wheel ergonomics on the same cockpit: the 5° and 15° glance zones, the Accept and Later thumb keys, grip sensing with haptics, and the driving posture", 16 / 9)] },
        { lead: "And when it's an emergency:", text: "the rim flashes, the cluster and the centre screen offer one decision, the camera shows why, and the wheel pulses under both hands.", clips: [clip("cp-emergency", "High-alert scenario in the realistic cockpit: the rim flashing red, Take a break on the cluster, Driver Fatigue Detected with Take a break and Later on the centre screen, the camera view, and both hands on the wheel", 16 / 9)] },
    ],
    process: [
        { label: "System map", image: img("system-map.svg") },
        { label: "Where nobody plays yet", image: img("gap.png") },
        { label: "Causal loops of driver fatigue", image: img("loop.png") },
    ],
    reflection: [
        { label: "What I expect", text: "Graded cues get dismissed less often than one loud alert, and a rest-stop offer is accepted more than a plain warning. These are hypotheses, not results." },
        { label: "How I'd find out", text: "A night-drive simulator with 8–12 drivers, eye tracking on every glance, and shadow mode logging when it would have alerted." },
        { label: "Risks to watch", text: "False alarms add stress, a blocked camera must say so, and drivers must feel in control of their own data." },
    ],
}
