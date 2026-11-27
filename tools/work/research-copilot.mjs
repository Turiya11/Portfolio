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
        hint: "Crash data, safety rules, driver posts",
        blocks: [
            { p: "Tiredness causes a real share of crashes, safety rules now make cars watch for it, and ==drivers already switch the warnings off==." },
            {
                stats: [
                    { n: "7%", l: "of all crashes involve a tired driver (AAA)" },
                    { n: "21%", l: "of fatal crashes involve a tired driver (AAA)" },
                    { n: "3 of 6", l: "cars tested had driver warnings likely to be switched off (Fleet News / What Car?)" },
                    { n: "2 s", l: "longest a driver should look away from the road at once; 12 s in total (US guidance)" },
                ],
            },
            {
                h: "Where the data came from",
                cards: [
                    { t: "Studies and rules", items: ["Crash data on tired driving (AAA)", "EU and US rules for watching the driver", "Euro NCAP 2026, the safety rating test"] },
                    { t: "Human factors", items: ["How long a driver can look away", "Light at the edge of vision, and the mental effort it costs", "Where hands grip, what thumbs reach, where a camera can sit"] },
                    { t: "Drivers in their own words", items: ["13 public posts from driver forums", "About tiredness, warnings, trust and road stress", "Quoted exactly as written"] },
                ],
            },
            {
                h: "What else shaped the concept",
                table: {
                    head: ["Finding", "Why it matters", "Source"],
                    rows: [
                        ["Since July 2024, every new car sold in the EU must warn a drowsy driver", "Watching the driver is now required, so it should be done well", "EU General Safety Regulation"],
                        ["Euro NCAP 2026 gives up to 25 safety-rating points for driver monitoring, up from 2", "Carmakers now have a strong reason to get it right", "Euro NCAP 2026, via Smart Eye"],
                        ["Light at the edge of vision made drivers react faster, with no extra mental effort", "==A calm glow can work without a single word==", "Leeds Lightband study, AutoUI ’21"],
                    ],
                },
            },
        ],
    },
    {
        title: "User pain points",
        hint: "Late, loud and hard to trust",
        blocks: [
            { p: "Warnings come too late, too loud and too often, so drivers stop trusting them, and ==stress gets no help at all==." },
            {
                h: "Five problems, and the evidence for each",
                table: {
                    head: ["What goes wrong", "The evidence"],
                    rows: [
                        ["Warnings arrive late", "==Drivers describe near-misses before any alert== (driver forum posts)"],
                        ["Alerts nag, then get switched off", "Beeps repeat; in 3 of 6 cars tested, the alerts were likely to be turned off"],
                        ["Drivers doubt the camera", "They wonder if sunglasses, a smudge or oversensitivity is the problem (owner forums)"],
                        ["Stress has no outlet", "Anger builds on the road with nothing in the car to ease it (city forums)"],
                        ["Screens compete with the road", "Each look should stay under 2 s, and under 12 s in total (US guidance)"],
                    ],
                },
            },
            {
                h: "What drivers said",
                cards: [
                    { t: "They fight sleep alone", items: ["Improvised tricks to stay awake, with ==nothing in the car helping=="] },
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
                h: "Each problem, and what the design does about it",
                table: {
                    head: ["Problem", "Design move", "How"],
                    rows: [
                        ["Warnings arrive late", "Show the driver's state early and quietly", "==Colour at the edge of vision, not words in the middle=="],
                        ["Alerts nag", "Step up only if it continues", "Each cue earns attention, and the loudest one is rare"],
                        ["Drivers doubt the camera", "Say what the car can and can't see", "A grey “sensing limited” state, ==never a silent guess=="],
                        ["Stress has no outlet", "Treat stress as a state too", "Ease it with cabin light and sound, never a scolding"],
                        ["Screens compete with the road", "Keep decisions away from the road", "One-tap answers, and a stop that's easy to accept"],
                    ],
                },
            },
            {
                h: "How might we…",
                cards: [
                    { t: "Notice and adapt", items: ["Spot early tiredness or stress with nothing new to operate", "Change light, sound and voice so the driver calms down or wakes up", "Learn what's normal for each driver"] },
                    { t: "Earn trust", items: ["Step in without sounding judgemental", "Show what it sees, and why", "==Keep camera and body data in the car==", "Avoid false alarms"] },
                    { t: "Stay out of the way", items: ["Accept help with one word or one glance", "Make tiredness and stress readable at a glance", "Answer with one press on the wheel"] },
                ],
            },
            {
                h: "Decisions, and what each one costs",
                table: {
                    head: ["Decision", "Because", "Trade-off"],
                    rows: [
                        ["Show state as a glow at the screen edge", "==Colour at the edge of vision needs no glance==", "Less precise than words, so a word and an icon sit beside it"],
                        ["Colour, word and icon for every state", "Colour alone isn't reliable in every light", "More to fit on screen"],
                        ["Step up only when it continues, and when two sensors agree", "Alerts get switched off, and false alarms add stress", "The first cue can come a little later"],
                        ["Show a grey “sensing limited” state", "Owners doubt the camera with sunglasses or a smudge", "Admitting limits can feel weaker"],
                        ["Infrared camera plus wheel grip, processed in the car", "Works at night, and footage never leaves the car", "Extra hardware"],
                        ["Offer a rest stop, not only a warning", "The fix drivers name is stopping", "Needs good map data"],
                    ],
                },
            },
        ],
    },
    {
        title: "Car and wheel ergonomics",
        hint: "What shows where, and for how long",
        blocks: [
            { p: "Three boards turn safety rules and human-factors studies into rules for the car. Two ideas run through all of them: ==every look away from the road has a time limit, and the hands never have to leave the wheel==. Cars in India have the steering wheel on the right, so every layout is mirrored for that." },
            {
                h: "The four levels of the co-pilot",
                cards: [
                    { t: "L0 · Watch quietly", items: ["Always on, mostly invisible: a soft colour and a small badge"] },
                    { t: "L1 · Nudge", items: ["A slow colour change you might notice, and the badge names the state"] },
                    { t: "L2 · Suggest", items: ["One question with two equal answers, asked once"] },
                    { t: "L3–L4 · Assist", items: ["Stays until answered, and guides the driver to a safe stop"] },
                ],
            },
            {
                h: "What each part of the car does at each level",
                p: "The camera leads and the wheel's grip sensors confirm. ==Both must agree before the co-pilot asks anything==, and everything is processed in the car, with no video stored.",
                table: {
                    head: ["Part of the car", "L0 · Watch", "L1 · Nudge", "L2 · Suggest", "L3–L4 · Assist"],
                    rows: [
                        ["Wheel rim light", "Steady, dim colour", "Colour shifts slowly, over about 10 s", "Slow pulse at breathing pace", "Brighter pulse that points the eyes, ==never the only alert=="],
                        ["Instrument cluster", "Small state badge", "Badge names the state", "A banner: one message, one action", "Banner stays until answered; red glow at the edges"],
                        ["Windscreen display", "Speed and directions only", "Small state dot", "One line, four words at most", "Same line, plus an arrow towards the stop"],
                        ["Centre screen", "Navigation as normal", "No change", "A card with the reason and two equal choices", "Full-screen guidance to the nearest safe stop"],
                        ["Wheel keys and squeeze", "Idle", "Idle", "Accept (round) and Later (flat) work; a double squeeze says “got it”", "Same keys; ==Later just snoozes, it's never penalised=="],
                        ["Voice and sound", "Silent", "Music slows and softens, after asking", "Speaks once, then waits for Yes or Later", "One short repeat if unanswered, then silent; calls and media turned down"],
                    ],
                },
            },
            { note: "The four levels are my proposal: no published source says exactly when each should start." },
            {
                h: "The limits I designed to",
                stats: [
                    { n: "1.5 s", l: "longest single look away from the road (US guidance allows 2 s)" },
                    { n: "8 s", l: "longest a whole task may take, across all looks (US guidance allows 12 s)" },
                    { n: "3.5 s", l: "EU cars warn if the eyes stay well below the road this long, at 50 km/h or more" },
                    { n: "17.5 mm", l: "smallest touch button; 20–24 mm for buttons used often" },
                    { n: "4.1 mm", l: "default text height on the cluster, read from about 70 cm away" },
                    { n: "2 steps", l: "deepest a menu can go; the basics get physical keys" },
                ],
            },
            {
                h: "Where the eyes and hands can go",
                cards: [
                    { t: "Eyes on the road · within 5°", items: ["Nothing here needs a deliberate look: the edge of vision is enough", "==Shapes are noticed faster than words== (about 1.3–1.9 s to react)", "The rim light and windscreen cue never carry a warning on their own", "Urgent cues flash 3–4 times a second; 1–2 a second looks like a turn signal"] },
                    { t: "Cluster · within 15°, below the road", items: ["One look of 1.5 s or less; the full picture in two", "Every state is a colour, an icon and 3–4 words", "High contrast: aiming for 7:1, never below 3:1"] },
                    { t: "Centre screen · to the driver's left", items: ["1.5 s a look, 2 s at most, 8 s for the whole task", "No scrolling or typing while driving", "Anything beyond on/off switches waits until the car is parked", "Drivers can change warning style, volume and privacy, but ==not how sensitive detection is=="] },
                    { t: "Hands on the wheel · grip and thumbs", items: ["Answering needs no look: physical Accept and Later keys that feel different", "Grip zones at about 8–11 and 1–4 o'clock; either hand is enough", "==Only 6–25% of drivers hold the wheel evenly with both hands==", "Heart readings from the rim work only 45.62% of the time, so they confirm and never trigger"] },
                    { t: "Voice · its own button", items: ["One short offer, answered in one word", "If ignored, no repeat for 15 minutes", "Talking takes effort too: 1.88–4.14 out of 5, depending on the task", "Always an equal way to answer without speaking"] },
                ],
            },
            {
                h: "Every interface at a glance",
                table: {
                    head: ["Part of the car", "Where it is", "Time for the eyes", "What it does, and the numbers behind it"],
                    rows: [
                        ["Grip sensors", "On the rim, at about 8–11 and 1–4 o'clock; either hand", "None: it senses on its own", "Confirms what the camera sees. Drivers keep one hand on the wheel for 33–40%+ of a drive; hands-off must be flagged within 15 s (UN R79)"],
                        ["Rim light", "Top of the rim, at the edge of vision; hands may cover it", "No deliberate look", "Brightness, position and rhythm, ==never colour alone==: breathes 10–12 times a minute when calm, flashes 3–4 times a second when urgent"],
                        ["Cluster badge", "Within 15° of the road, below it", "1.2–1.5 s; the full picture in two looks", "An icon and 3–4 words; text about 4.1 mm tall; contrast 7:1"],
                        ["Windscreen cue", "About 5° from the line of sight", "Shorter than the cluster", "Shape first, words last: a shape is read in 1.3–1.5 s, text in 1.9 s"],
                        ["Centre screen prompt", "Driver's left, within reach of the left hand", "1.5 s a look, 2 s at most, 8 s per task", "A card answered with the wheel keys; no scrolling or typing; buttons at least 17.5 mm"],
                        ["Thumb keys", "Under the thumbs on a gripped wheel; to be tested with small and large hands", "None; they respond within 0.25 s", "Keys that differ in place, shape and feel, at least 15 mm wide"],
                        ["Double squeeze", "The rim, either hand", "None", "Only confirms while a question is open; the strength is tuned to each driver"],
                        ["Infrared camera", "In or behind the cluster", "None: it watches on its own", "Works at night and through clear sunglasses; says so within 10 s if it's covered"],
                        ["Voice", "Anywhere in the cabin, with its own button", "About none", "One short offer, a one-word answer, no repeat for 15 minutes"],
                    ],
                },
            },
            { note: "On the boards, every number is marked as sourced, calculated, a design assumption or still unverified. Thumb-key size, travel and force, squeeze force and how well the glow works are still unverified." },
            { h: "The original boards", image: { src: img("screen-map.jpg"), alt: "Screen map board: six parts of the car across four levels, from Monitor to Assist", caption: "Screen map: what shows where, at each level" } },
            { image: { src: img("glance-zones.jpg"), alt: "Glance and reach zones board: six limits and five zones, from eyes forward to voice", caption: "Glance and reach zones" } },
            { image: { src: img("ergonomics-table.jpg"), alt: "Interaction ergonomics table: one row per interface with reach zone, glance budget, modality, levels, numbers and evidence", caption: "Interaction ergonomics table" } },
        ],
    },
    {
        title: "Competitive analysis",
        hint: "Tesla, GM, Ford, Euro NCAP 2026",
        blocks: [
            { p: "Today's systems watch attention and warn with beeps or lights. ==None of them read stress, or warn calmly==." },
            {
                table: {
                    head: ["", "Tesla today", "GM Super Cruise · Ford BlueCruise", "What Euro NCAP 2026 asks for", "This concept"],
                    rows: [
                        ["How it senses", "Cabin camera since May 2021; before that, pressure on the wheel", "A camera facing the driver; hands-free driving allowed", "Direct tracking of the eyes and head", "Infrared camera plus grip sensors in the wheel"],
                        ["What it notices", "Attention; reportedly yawns, blinks and leaning too", "Whether the eyes are on the road", "Drowsiness, quick repeated glances, phone use, impairment", "Tiredness, stress, distraction, and when it can't see well"],
                        ["How it warns", "Beeps and messages on screen", "A light bar on the wheel (GM); cluster alerts (Ford)", "Warnings are required", "A glow at the screen edge, wheel vibration, voice"],
                        ["How it steps up", "Strikes after repeated nags (owner reports)", "Not reviewed in depth", "Stronger warnings, then the car acts or stops safely", "Only if it continues; ends with a rest-stop offer"],
                        ["Stress", "Not in public descriptions", "Not in public descriptions", "Not in scope", "Yes: ==the cabin eases tension=="],
                    ],
                },
            },
            { h: "Where nobody plays yet", image: { src: img("gap.png"), alt: "Map of competitors by what they sense and how they warn, with this concept alone in sensing state and warning calmly", caption: "Nobody yet senses state and warns calmly" } },
            { note: "Based on public descriptions only, read by me. No internal data, and the positions are judgements, not measurements." },
        ],
    },
    {
        title: "System mapping",
        hint: "Why tiredness spirals",
        blocks: [
            { p: "The co-pilot only works if it's designed with everything around it: the driver, the car, the road, the data and the rules." },
            { image: { src: img("system-map.svg"), alt: "System map of the co-pilot: the driver and the road on the left, the vehicle sensors and the cabin displays on the right, the loop of watch, nudge, suggest and assist in the middle, and the cloud, the rules and the research underneath", caption: "One co-pilot inside a larger system" } },
            { image: { src: img("loop.png"), alt: "Causal loop diagram of driver fatigue, misjudged alertness, early cues and alerts being switched off", caption: "Three loops, all around one thing: driver tiredness" } },
            {
                h: "How to read the loops",
                cards: [
                    { t: "The tiredness spiral", items: ["Tired drivers misjudge how tired they are, so they keep going and get more tired"] },
                    { t: "The early cue", items: ["==A cue that arrives early breaks the spiral== before it takes hold"] },
                    { t: "When nagging backfires", items: ["Annoying alerts get switched off, so ==quiet cues that step up slowly are the lever=="] },
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
        statement: "In a car the body sets the rules. Eyes stay on the road and hands stay on the wheel, so every cue has a time limit for the eyes and a place the hands can reach.",
        points: [
            { label: "Where the eyes can go", text: "The critical cue sits within 5° of the road. The cluster sits within 15° of the line of sight, readable in one look of 1.5 s or less (US guidance allows 2 s)." },
            { label: "What the thumbs can reach", text: "Accept and Later sit in the thumb zone of a gripped rim. They differ in place, shape and feel: convex to accept, concave and ridged to defer." },
            { label: "What the hands already feel", text: "Grip zones at about 8–11 and 1–4 o'clock sense on their own, and either hand is enough, because only 6–25% of drivers hold the wheel evenly with both hands. Vibration starts subtle and grows only if needed." },
        ],
    },
    didNote: "Prototype walkthroughs of the real screens with sample data, then the same design in realistic cockpit mockups.",
    did: [
        { lead: "Early on, it stays quiet:", text: "the word and confidence lead, and heat rises from the screen edge.", clips: [clip("cp-states", "The cluster moving from clear to stress, then undoing the cabin change", CLUSTER)] },
        { lead: "It says what it can and cannot see:", text: "heat sits on the signal source, and a grey state admits its limits.", clips: [clip("cp-faces", "Heat maps for each state on two stock portraits", 1880 / 780)] },
        { lead: "Before any alarm, it nudges:", text: "when tiredness builds, it offers a rest stop with the reason one line away, asks once by voice, and waits.", clips: [clip("cp-nudge-drowsy", "Hi-fi S3, drowsy: the route to Hillview Rest Area, You look tired, why it is asking, and Take me or Not now", 16 / 9)] },
        { lead: "When stress rises, it offers calm:", text: "a breathing ring paces the driver, calmer music is one yes away, and calls wait until the moment passes.", clips: [clip("cp-nudge-tense", "Hi-fi S4, rising stress: the breathing ring, Traffic is heavy, Want calmer music, Yes or Not now, and the cabin light softening", 16 / 9)] },
        { lead: "If tiredness persists, it escalates in steps:", text: "each cue earns attention, and the loudest is rare.", clips: [clip("cp-escalate", "The cluster escalating from drowsy to critical", CLUSTER)] },
        { lead: "Then it asks one question:", text: "the map stays first until a decision is needed.", clips: [clip("cp-centre", "The centre display moving from the map to a rest-stop question", CENTRE)] },
        { lead: "The driver answers without looking:", text: "keys you can tell apart by touch, right on the wheel.", clips: [clip("cp-wheel-boards", "Hi-fi S1, S9 and S10: the rim light and grip sensing, the grip pads and thumb zones, then Accept, Later, the voice key and the double squeeze", 16 / 9)] },
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
