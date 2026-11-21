// "What I did" starts with the work that led to the final screens: sketches, lo-fi screens, the style guide and the UI elements.
// Sources: the projects' Figma files (KG Hub, Lumi, Co-Pilot), the KG Hub sketchbook, Pip's research figures and the Dentigo Behance board.
// 3TFlow has none: it is under an NDA, so its page shows only the public product screens.
const site = (p) => `../../assets/images/${p}`
const fr = (id) => `https://framerusercontent.com/images/${id}.png`
const shot = (src, label) => ({ src, label })

export const kgBuild = [
    {
        tag: "Sketches",
        lead: "I went back to the sketchbook:",
        text: "the first version was graph-first, so you had to know what to search for. These eight pages turn it around. Every flow starts from a research question, and the ideas I dropped stay crossed out.",
        strip: [
            shot(site("kg/build/sketch-0.jpg"), "From graph-first to question-first"),
            shot(site("kg/build/sketch-1.jpg"), "A1 · Start with a question"),
            shot(site("kg/build/sketch-2.jpg"), "A2 · Query results"),
            shot(site("kg/build/sketch-3.jpg"), "B1 · How do two things connect?"),
            shot(site("kg/build/sketch-4.jpg"), "B2 · Compare without a verdict"),
            shot(site("kg/build/sketch-5.jpg"), "C1 · Capture the finding, with its proof"),
            shot(site("kg/build/sketch-6.jpg"), "D1 · D2 · Projects start from a question"),
            shot(site("kg/build/sketch-7.jpg"), "D3 · D4 · Insights and conversations"),
        ],
    },
    {
        tag: "Style guide",
        lead: "Then a small visual system:",
        text: "deep violet for structure and actions, lime as the one highlight, and Manrope at every size.",
        style: {
            colors: [
                {
                    group: "Violet",
                    swatches: [
                        { hex: "#201E4B", name: "950 · Ink" },
                        { hex: "#4C2A85", name: "800" },
                        { hex: "#6F3FD1", name: "600 · Primary" },
                        { hex: "#9156F1", name: "500" },
                        { hex: "#B985F6", name: "300" },
                        { hex: "#EADCF7", name: "100" },
                    ],
                },
                {
                    group: "Accent and surfaces",
                    swatches: [
                        { hex: "#C8F26B", name: "Lime" },
                        { hex: "#F8F6FB", name: "Canvas" },
                        { hex: "#E4DDF0", name: "Border" },
                        { hex: "#6D6780", name: "Text 2" },
                    ],
                },
                {
                    group: "Status",
                    swatches: [
                        { hex: "#2E8B57", name: "Success" },
                        { hex: "#F2A93B", name: "Warning" },
                        { hex: "#D64550", name: "Danger" },
                    ],
                },
            ],
            type: [
                {
                    family: "Manrope",
                    css: "Manrope, sans-serif",
                    google: "Manrope:wght@400;500;600;700",
                    note: "One family for every size",
                    scale: [
                        { name: "Display", size: 36, weight: 700 },
                        { name: "Heading 1", size: 28, weight: 700 },
                        { name: "Heading 2", size: 22, weight: 600 },
                        { name: "Heading 3", size: 18, weight: 600 },
                        { name: "Body", size: 15, weight: 400 },
                        { name: "Label", size: 14, weight: 600 },
                        { name: "Caption", size: 11, weight: 500 },
                    ],
                },
            ],
        },
    },
    {
        tag: "UI elements",
        lead: "And the parts every screen shares:",
        text: "buttons, tags, avatars and the top bar in each of its states.",
        wide: { ...shot(site("kg/build/components.png"), "KG Hub components: buttons, tags, avatars and the navigation bar"), clear: true },
    },
]

export const copilotBuild = [
    {
        tag: "Sketches",
        lead: "I sketched twelve moments first:",
        text: "where the sensors live, what the driver can read in a glance, and how a cue gets louder only if tiredness persists. Yellow marks the part that carries the idea.",
        captioned: true,
        strip: [
            ["s01", "S1 · Steering wheel sensing"],
            ["s02", "S2 · Instrument cluster vitals chip"],
            ["s03", "S3 · Drowsy: co-pilot steps in"],
            ["s04", "S4 · Rising stress: calm-down moment"],
            ["s05", "S5 · Driver monitoring view"],
            ["s06", "S6 · Privacy and sensitivity controls"],
            ["s07", "S7 · IR camera: side view of the cabin"],
            ["s08", "S8 · Where can the camera live?"],
            ["s09", "S9 · Grip zones and sensor pads"],
            ["s10", "S10 · Thumb actions on the wheel"],
            ["s11", "S11 · What the eye can read without looking"],
            ["s12", "S12 · Heat escalates with persistence"],
        ].map(([n, l]) => shot(site(`copilot/build/${n}.jpg`), l)),
    },
    {
        tag: "Lo-fi",
        lead: "Then nine wireframes, in three moments of the drive:",
        text: "parked, driving and deciding. Each one asks the driver for a single decision at a time.",
        wide: shot(site("copilot/initial.png"), "Nine wireframes, in three moments of the drive"),
    },
    {
        tag: "Iteration",
        lead: "I checked them against Nielsen's heuristics:",
        text: "six findings, each with the fix it carried into the hi-fi screens. Drowsy moved from amber to red, for one.",
        wide: shot(site("copilot/usability.png"), "A heuristic review of the initial screens"),
    },
    {
        tag: "Style guide",
        lead: "Then a calm, dark visual language:",
        text: "one colour per driver state, glass surfaces and one typeface, made for a dark cabin at night.",
        wide: shot(site("copilot/style.png"), "UI style guide"),
    },
    {
        tag: "UI elements",
        lead: "And one visual grammar for six alerts:",
        text: "colour names the state, intensity shows how sure the system is, and position shows which sensor saw it.",
        wide: shot(site("copilot/library.jpg"), "Alert-type heat-map library"),
    },
]

export const lumiBuild = [
    {
        tag: "Sketches",
        lead: "I storyboarded it first:",
        text: "six panels, from Neha awake at 3 AM with the baby to the family starting to understand.",
        grid: [
            ["1", "1 · 3 AM, alone"],
            ["2", "2 · The gentle check-in"],
            ["3", "3 · Lumi notices the pattern"],
            ["4", "4 · Rohan gets a signal"],
            ["5", "5 · Support through presence"],
            ["6", "6 · Family understanding begins"],
        ].map(([n, l]) => ({ ...shot(site(`lumi/build/story/${n}.jpg`), l), clear: true })),
    },
    {
        tag: "Lo-fi",
        lead: "Then grey wireframes for each role:",
        text: "choosing a role, the daily check-in, mood patterns and the partner's dashboard, before any colour.",
        phones: true,
        strip: [
            ["01", "01 · Welcome"],
            ["02", "02 · Support, not diagnosis"],
            ["03", "03 · Invite your support circle"],
            ["04", "04 · Good morning"],
            ["05", "05 · Daily check-in"],
            ["06", "06 · Your mood patterns"],
            ["07", "07 · Should I seek help?"],
            ["08", "08 · Partner dashboard"],
            ["09", "09 · Understanding postpartum"],
            ["10", "10 · Share observations"],
            ["11", "11 · How to support"],
            ["12", "12 · Caregiving load"],
            ["13", "13 · Shared updates"],
            ["14", "14 · Invite the support circle"],
        ].map(([n, l]) => shot(site(`lumi/build/lofi/${n}.png`), l)),
    },
    {
        tag: "Style guide",
        lead: "Then a soft palette:",
        text: "blush, peach and cream over slate text, set in Avenir, so the app feels gentle and never clinical.",
        style: {
            colors: [
                {
                    group: "Brand",
                    swatches: [
                        { hex: "#EBA3B1", name: "Primary" },
                        { hex: "#E2798D", name: "Primary 10" },
                        { hex: "#F2C2B0", name: "Secondary" },
                        { hex: "#EBA084", name: "Secondary 10" },
                        { hex: "#FEF7EA", name: "Accent" },
                        { hex: "#FCE5BB", name: "Accent 10" },
                    ],
                },
                {
                    group: "Text",
                    swatches: [
                        { hex: "#30373B", name: "Text" },
                        { hex: "#485257", name: "Text 10" },
                        { hex: "#5F6C72", name: "Text 20" },
                        { hex: "#76868E", name: "Text 30" },
                        { hex: "#CAD0D3", name: "Text 60" },
                    ],
                },
            ],
            type: [
                {
                    family: "Avenir",
                    css: '"Avenir Next", Avenir, "Nunito Sans", sans-serif',
                    google: "Nunito+Sans:wght@300;400;500;800",
                    note: "Five weights, from Light to Heavy",
                    scale: [
                        { name: "Heavy", size: 30, weight: 800 },
                        { name: "Medium", size: 24, weight: 500 },
                        { name: "Roman", size: 20, weight: 400 },
                        { name: "Book", size: 18, weight: 400 },
                        { name: "Light", size: 18, weight: 300 },
                    ],
                },
            ],
        },
    },
    {
        tag: "UI elements",
        lead: "And the pieces a mother touches most:",
        text: "fourteen mood characters for the check-in, task cards that lighten the day when she's tired, and grounding prompts.",
        grid: [
            { ...shot(site("lumi/build/moods.png"), "Mood characters for the daily check-in"), clear: true },
            { ...shot(site("lumi/build/tasks.png"), "Task cards that adapt to how she feels"), clear: true },
            { ...shot(site("lumi/build/grounding.png"), "Grounding prompts"), clear: true },
            { ...shot(site("lumi/build/nav.png"), "Tab bar, in each state"), clear: true },
        ],
    },
]

export const dentigoBuild = [
    {
        tag: "Sketches",
        lead: "I storyboarded two real cases first:",
        text: "a complex crown order, and a clinic using the platform for the first time.",
        strip: [shot(fr("uXPJgRLEWSqCP4qHKmhIWdup4Ek"), "Storyboard: a complex crown"), shot(fr("V01SGxeBv0uyPg1sregW9INR50o"), "Storyboard: a new clinic")],
    },
    {
        tag: "Style guide",
        lead: "Then the colour palette:",
        text: "a deep green for actions, blush and slate blue in support, and a ten-step neutral scale.",
        style: {
            colors: [
                {
                    group: "Brand",
                    swatches: [
                        { hex: "#366D49", name: "Primary" },
                        { hex: "#F1D3C9", name: "Secondary" },
                        { hex: "#476A8A", name: "Tertiary" },
                    ],
                },
                {
                    group: "Neutrals",
                    swatches: [
                        { hex: "#24292F", name: "900" },
                        { hex: "#32383F", name: "800" },
                        { hex: "#424A53", name: "700" },
                        { hex: "#57606A", name: "600" },
                        { hex: "#6E7781", name: "500" },
                        { hex: "#8C959F", name: "400" },
                        { hex: "#AFB8C1", name: "300" },
                        { hex: "#D0D7DE", name: "200" },
                        { hex: "#EAEEF2", name: "100" },
                        { hex: "#F6F8FA", name: "50" },
                    ],
                },
            ],
            type: [],
        },
    },
]

const dv = (n) => site(`doodleverse/${n}`)
export const doodleverseBuild = [
    {
        tag: "Iteration",
        lead: "The first version had a long how-to-play panel:",
        text: "nine steps that young children skipped. Short pills at the moment of action replaced it.",
        wide: shot(dv("slide-12.jpg"), "From a long panel to pills"),
    },
    {
        tag: "Style guide",
        lead: "And ink that glows:",
        text: "strokes light up in the passthrough room, so every line a child draws pays off straight away.",
        wide: shot(dv("slide-11.jpg"), "Neon glowing ink"),
    },
    {
        tag: "UI elements",
        lead: "Then the things a child can see and touch:",
        text: "a crayon tray, a magic wand, a fingertip dot and short coaching pills, each placed where the action happens.",
        wide: shot(dv("slide-08.jpg"), "Affordances and signifiers"),
    },
]

const pp = (n) => site(`pip/build/${n}`)
export const pipBuild = [
    {
        tag: "Sketches",
        lead: "I started by sketching Pip in VR:",
        text: "where Pip sits in your room, how a pinch pulls a thought closer, and how a reminder slides in from the edge without blocking your work.",
        strip: [
            ["sketch-01.jpg", "01 · Pip at eye level, in your room"],
            ["sketch-02.jpg", "02 · Top-down: thoughts orbit you"],
            ["sketch-03.jpg", "03 · Pinch to pull a thought"],
            ["sketch-04.jpg", "04 · Say it, Pip catches it"],
            ["sketch-05.jpg", "05 · Wrist menu"],
            ["sketch-06.jpg", "06 · Focus mode: Pip naps"],
            ["sketch-07.jpg", "07 · Gentle nudge from the edge"],
            ["sketch-08.jpg", "08 · Comfort distances"],
        ].map(([n, l]) => shot(pp(n), l)),
    },
    {
        tag: "Lo-fi",
        lead: "Next, the structure as mobile flows:",
        text: "capture, the orbit, the thought card and the reminders, in eighteen grey screens.",
        phones: true,
        strip: [
            ["p01.png", "01 · Home and orbit"],
            ["p02.png", "02 · Quick text capture"],
            ["p03.png", "03 · Voice capture"],
            ["p04.png", "04 · Optional details and edit"],
            ["p05.png", "05 · Choose a revisit time"],
            ["p06.png", "06 · All thoughts library"],
            ["p07.png", "07 · Search and filters"],
            ["p08.png", "08 · Thought detail"],
            ["p09.png", "09 · Camera permission"],
            ["p10.png", "10 · Detect and place Pip"],
            ["p11.png", "11 · Placed AR orbit"],
            ["p12.png", "12 · AR unavailable"],
            ["p13.png", "13 · Reminder notification"],
            ["p14.png", "14 · Resurfaced thought"],
            ["p15.png", "15 · Manage reminder"],
            ["p16.png", "16 · Notification preferences"],
            ["p17.png", "17 · Privacy and accessibility"],
            ["p18.png", "18 · Confirm deletion"],
        ].map(([n, l]) => shot(pp(`lofi/${n}`), l)),
    },
    {
        tag: "Style guide",
        lead: "Then a cosmic dark UI:",
        text: "deep purples, glowing accents and Montserrat, so the phone app feels like the night sky Pip floats in.",
        wide: { ...shot(pp("design-system.jpg"), "Design system: cosmic dark UI in Montserrat"), crop: true },
    },
    {
        tag: "UI elements",
        lead: "And you choose your Pip:",
        text: "the classic astronaut by default, with four other characters to try.",
        wide: { ...shot(pp("avatars.png"), "Avatar picker: Pip Classic is the default, with four others to preview"), clear: true },
    },
]
