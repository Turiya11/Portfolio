// Lumi's research folders and journey map. All of it is taken from the Lumi Figma file (deck page 80:2266, persona and journey page 0:1).
// The file has no competitor comparison, so "Competitive analysis" compares what people rely on today, as documented in the research.
const img = (n) => `../../assets/images/lumi/research/${n}.png`

const neha = {
    name: "Neha",
    role: "The Silent Struggler · mother",
    meta: "32 · first-time mother, 10 weeks postpartum · working professional, Pune",
    quote: "“If I say I'm struggling, they'll think I'm a bad mother.”",
    traits: ["Emotionally withdrawn", "Internalises stress", "Avoids confrontation", "High guilt orientation"],
    background: ["Husband: caring, but avoids “heavy conversations”", "In-laws: live together, traditional, expect her to manage household and baby", "Family mindset: “Good mothers adjust and don't complain”"],
    pain: ["No safe space to express emotions", "Fear of judgment or criticism", "Physical exhaustion with no relief", "Fear of being seen as a “weak mother”", "Exhaustion without validation"],
    goals: ["Express feelings without consequences", "Feel understood without being labelled", "Feel emotionally safe and heard", "Reduce internal guilt", "Get support without confrontation"],
    needs: ["Private, stigma-free support channels", "Anonymous screening tools", "Language to articulate feelings safely", "Indirect, non-verbal ways to communicate distress", "Family sensitisation to emotional needs"],
}

const rohan = {
    name: "Rohan",
    role: "The Hyper-Responsible Fixer · partner",
    meta: "34 · first-time father · product manager, Pune",
    quote: "“I need to fix this for her.”",
    traits: ["Problem solver", "Stressed", "Suppresses own emotion", "Anxious", "Constant research", "Helpless seeing his wife"],
    background: ["No nearby family support", "Wife was independent before pregnancy", "Sudden role shift: caregiver and provider"],
    pain: ["Feels helpless watching his wife suffer", "Doesn't know how to talk about it", "Scared of pushing her toward a breakdown", "Misinterprets PPD as a “mood problem”", "Fear of “losing control” of the situation", "No support system for his own stress"],
    goals: ["Understand what his wife is going through", "Know exactly how and when to intervene", "Feel less alone in this experience"],
    needs: ["Clear guidance: what to do and what not to do", "Early warning signs explained simply", "Scripts for starting difficult conversations", "Space to process his own fear and guilt", "Reassurance that this is manageable"],
}

const sarita = {
    name: "Sarita & Mohan",
    role: "The Well-Meaning Minimizer · in-laws",
    meta: "Retired · Nagpur · call daily and travel often to stay with their son's family",
    quote: "“In our time, nobody went to doctors for sadness. You just prayed and kept going.”",
    traits: ["Care and concern", "Emotionally withdrawn", "Internalise stress", "Avoid confrontation"],
    background: ["Raised 2 children without outside help", "Believe strong women push through difficulties", "Often say “I went through the same thing”", "Mean well, but dismiss her without intending to"],
    pain: ["Don't understand why she “isn't coping”", "Feel excluded from their daughter-in-law's care", "Fear the stigma of mental illness in the family", "Get conflicting information from their son and her"],
    goals: ["Be seen as helpful, respected elders", "See their son's family happy and healthy", "Understand the “new-generation” experience"],
    needs: ["Stigma-free, culturally sensitive PPD education", "A simple guide to helpful and harmful behaviours", "Reassurance that seeking help is strength"],
}

export const lumiResearch = [
    {
        title: "Primary & secondary research data",
        hint: "Interviews, doctors, papers",
        blocks: [
            {
                h: "How the data was gathered",
                cards: [
                    { t: "Primary research", items: ["Interviews with mothers, fathers and caregivers", "Domain understanding from doctors and psychiatrists"] },
                    { t: "Secondary research", items: ["Research papers and articles on postpartum mental health", "Existing studies, screening frameworks and PPD data, to understand emotional patterns, early symptoms and support gaps within families"] },
                ],
            },
            {
                h: "The scale of it",
                stats: [
                    { n: "~80%", l: "of mothers experience temporary baby blues" },
                    { n: "~1 in 5", l: "women experience postnatal depression or anxiety globally" },
                    { n: "23.2M", l: "annual births in India" },
                ],
            },
            { h: "What the papers showed", image: { src: img("synthesis-1"), alt: "Research notes on screening and diagnostic tool limitations", caption: "Screening and diagnostic tool limitations" } },
            { image: { src: img("synthesis-2"), alt: "Research notes on partner and paternal mental health neglect", caption: "Partner and paternal mental health neglect" } },
            { image: { src: img("synthesis-3"), alt: "Research notes on social support quality and its protective effects", caption: "Social support quality and its protective effects" } },
            {
                cards: [
                    { t: "Self-efficacy and help-seeking", items: ["Mothers may recognise symptoms but still don't seek help", "Mothers doubt their ability to cope, care for the baby and seek help", "Poor prioritisation of self-care"] },
                    { t: "Isolation and family dynamics", items: ["Low perceived support is strongly linked to PPD", "Maternal mental health is co-created by the family system", "Unequal caregiving burden and poor communication patterns"] },
                    { t: "Culture and literacy", items: ["Cultural normalisation of suffering", "Low mental-health literacy in families", "Emotional invalidation: “this is normal, deal with it”"] },
                ],
            },
            { note: "Personas and quotes elsewhere on this page are research syntheses, not individual participants." },
        ],
    },
    {
        title: "User pain points",
        hint: "Across all three roles",
        blocks: [
            {
                h: "By role",
                cards: [
                    { t: "Mother", items: neha.pain },
                    { t: "Partner", items: rohan.pain },
                    { t: "In-laws and family", items: sarita.pain },
                ],
            },
            {
                h: "By stage of the journey",
                table: {
                    head: ["Stage", "What goes wrong"],
                    rows: [
                        ["“This is just baby blues”", "No distinction between baby blues and PPD · early signals dismissed · over-normalisation by family"],
                        ["“Something feels off”", "Conflicting information, internet against family · no shared understanding of severity · mother lacks validation"],
                        ["Conflict triangle", "Misaligned mental models · mother unheard · conflict between father and family · stigma around diagnosis"],
                        ["Delayed intervention", "No clear decision-making pathway · delay in professional help · no coordinated support · worsening symptoms"],
                        ["Mother feels helpless", "Intervention happens too late · severe emotional deterioration · high stress across the system"],
                    ],
                },
            },
            { h: "The journey map", image: { src: img("journey"), alt: "Lumi journey map with emotion curves for mother, father and in-laws", caption: "The full map: actions, emotion curves, pain points and opportunities" } },
        ],
    },
    {
        title: "Key insights",
        hint: "The invisible emotional burden",
        blocks: [
            { quote: "The problem isn't absence of support. It's absence of emotional understanding." },
            {
                h: "The invisible emotional burden",
                cards: [
                    { t: "Emotional symptoms", items: ["Intrusive thoughts, emotional flatness and disconnection from the baby", "Crying without triggers brings no relief, with persistent chest heaviness", "Diagnosis brings validation, but many cases remain undiagnosed"] },
                    { t: "EPDS screening problems", items: ["False alarms from normal maternal guilt and hormonal changes", "Misses modern stressors like work anxiety and emotional numbness", "No validated alternatives, despite a thin evidence base"] },
                    { t: "System failures", items: ["Assumes mothers recognise symptoms and willingly report them", "Excludes family from screening despite their motivational role", "No clinical follow-up when results indicate problems"] },
                    { t: "Family impact", items: ["Affects the whole family, including partners who develop secondary depression", "Infants experience developmental delays and bonding disruption", "Drains clinic resources while raising maternal anxiety"] },
                ],
            },
            {
                h: "The three themes carried into design",
                table: {
                    head: ["Insight", "Design opportunity"],
                    rows: [
                        ["Mothers hesitate to express distress", "Safe ways to express feelings without fear of judgement or labelling"],
                        ["Families miss emotional warning signs", "A shared understanding of symptoms, and ways to recognise distress without dismissing it"],
                        ["Emotional support often comes too late", "Reduce the gap between noticing and acting, including when and how to seek professional help"],
                    ],
                },
            },
            { h: "Sorting the findings", image: { src: img("card-sort"), alt: "Card sort grouping research findings into themes", caption: "Card sorting: findings grouped into themes" } },
            { h: "Problem statement", p: "Family members are key to early recognition and recovery from postpartum depression, as they shape emotional safety, validate experiences and share the caregiving load. However, low mental health literacy, stigma and lack of guidance often prevent them from identifying symptoms or responding effectively. This leads many women to hesitate in sharing their struggles or using tools like the Edinburgh Postnatal Depression Scale, resulting in delayed detection and worsening outcomes." },
        ],
    },
    {
        title: "Competitive analysis",
        hint: "What people rely on today",
        blocks: [
            { p: "What a family falls back on today, and where each option falls short, as the research documented it." },
            {
                table: {
                    head: ["Alternative", "What it offers", "Where it falls short", "What Lumi does instead"],
                    rows: [
                        ["EPDS screening", "The main tool for early detection of PPD", "False alarms from normal guilt · misses work stress and numbness · excludes the family · no follow-up", "Gentle check-ins that point to people, not a verdict"],
                        ["Paternal depression scales", "13 instruments identified for fathers", "The most reliable scale still lacks full validation for fathers · partners invisible in screening", "A companion mode that supports the partner too"],
                        ["Searching online", "Instant, private answers", "Conflicting information and overload · generic advice · no sense of severity", "Clear, situation-based guidance on what to do and say"],
                        ["Family advice", "Lived experience and daily presence", "“This is normal” dismisses distress · stigma · pushback against doctors", "Non-clinical awareness cards for the wider family"],
                        ["Periodic healthcare visits", "OB-GYN, midwife or GP expertise", "Only periodic contact · help is often sought late", "Daily support, with a clear route to a professional"],
                    ],
                },
            },
            { note: "This covers existing behaviours and tools. Other postpartum apps were not compared in this project." },
        ],
    },
    {
        title: "System mapping",
        hint: "Same home, different experiences",
        blocks: [
            { quote: "Shared disconnect. Same home, different experiences." },
            { image: { src: img("system-map"), alt: "System map of the mother, father, in-laws, newborn and healthcare provider, with the breakdowns between them", caption: "The people around a new mother, and where communication breaks down" } },
            {
                h: "What the map shows",
                cards: [
                    { t: "Barriers to recognition", items: ["Stigma", "Low mental-health literacy", "No guidance"] },
                    { t: "Breakdowns between people", items: ["Father and mother: no clear communication", "Mother to family: limited sharing, for fear of judgement", "Family to mother: indifference in behaviour", "Mother to provider: periodic contact, help sought late"] },
                    { t: "Outcome", items: ["Delayed detection", "Worse outcomes", "Bonding and care affected, with a shared caregiving load"] },
                ],
            },
        ],
    },
    {
        title: "User persona",
        hint: "Neha, Rohan, Sarita & Mohan",
        blocks: [{ persona: neha }, { persona: rohan }, { persona: sarita }, { note: "Personas are research syntheses, and their quotes are mindsets, not participant quotes." }],
    },
]

// level: how low the emotion curve sits at that stage, 0 positive to 1 negative, read from the emoji positions on the Figma journey map
export const lumiEcosystem = {
    statement: "One home, but the mother, her partner and her in-laws each live it differently.",
    hubLabel: "Opportunity",
    personas: [
        {
            role: "Mother",
            mark: "N",
            tagline: "Neha, the silent struggler. Something is wrong, but she can't say it.",
            wants: "To be understood without being labelled.",
            stuck: "No safe space to say how she feels.",
            phases: [
                { name: "“This is just baby blues”", does: "Cares for the newborn, sleep-deprived, suppressing discomfort.", emoji: "🥺", feel: "Overwhelmed, confused, fragile", level: 0.46, pain: "No distinction between baby blues and PPD", hub: "Early emotional check-ins" },
                { name: "“Something feels off”", does: "Questions her emotions and searches symptoms secretly.", emoji: "😰", feel: "Anxious, self-doubting", level: 0.76, pain: "Mother lacks validation", hub: "Guided self-assessment" },
                { name: "Conflict triangle", does: "Withdraws, avoids talking about it, reluctant to see a doctor.", emoji: "😣", feel: "Guilt, shame, fear", level: 0.66, pain: "Emotional needs not met", hub: "Safe, anonymous expression" },
                { name: "Delayed intervention", does: "Continues suffering in silence and avoids seeking help.", emoji: "😮‍💨", feel: "Isolated, exhausted, numb", level: 0.66, pain: "Delay in professional help", hub: "When to seek help" },
                { name: "Feels helpless", does: "Emotional breakdown and detachment. Unable to cope.", emoji: "😞", feel: "Helpless, hopeless", level: 0.9, pain: "Intervention happens too late", hub: "Fast crisis support" },
            ],
        },
        {
            role: "Partner",
            mark: "R",
            tagline: "Rohan, the hyper-responsible fixer. He wants to help but feels unsure.",
            wants: "To know exactly how and when to step in.",
            stuck: "Not knowing how to talk about it.",
            phases: [
                { name: "“This is just baby blues”", does: "Helps with chores and baby care, and assumes it's normal.", emoji: "🙂", feel: "Calm, slightly concerned", level: 0.27, pain: "Early signals dismissed", hub: "“Is this normal?” awareness" },
                { name: "“Something feels off”", does: "Notices changes, searches online, tries to understand symptoms.", emoji: "🤔", feel: "Worried, confused", level: 0.58, pain: "Information overload", hub: "Structured info for fathers" },
                { name: "Conflict triangle", does: "Pushes for a doctor and solutions, and faces resistance.", emoji: "😥", feel: "Frustration, helplessness", level: 0.68, pain: "Conflict with family", hub: "How to talk, not fix" },
                { name: "Delayed intervention", does: "Tries inconsistent solutions, between action and confusion.", emoji: "😫", feel: "Burnt out, stressed", level: 0.8, pain: "No clear decision pathway", hub: "Step-by-step action roadmap" },
                { name: "Feels helpless", does: "Urgently seeks help and takes charge of next steps.", emoji: "😨", feel: "Panic, guilt", level: 0.52, pain: "High stress across the system", hub: "Immediate help pathways" },
            ],
        },
        {
            role: "In-laws",
            mark: "S",
            tagline: "Sarita & Mohan, the well-meaning minimizers. They believe she'll be fine.",
            wants: "To help, and to be respected for it.",
            stuck: "The stigma of mental illness in the family.",
            phases: [
                { name: "“This is just baby blues”", does: "Gives advice from experience: “this is normal”.", emoji: "😁", feel: "Confident, dismissive", level: 0.04, pain: "Over-normalisation by family", hub: "Family micro-education" },
                { name: "“Something feels off”", does: "Keeps normalising and dismisses concerns as overthinking.", emoji: "😤", feel: "Neutral, slightly irritated", level: 0.3, pain: "No shared understanding of severity", hub: "Shared awareness content" },
                { name: "Conflict triangle", does: "Resists medical help: “Don't overreact.”", emoji: "😤", feel: "Defensive, judgmental", level: 0.22, pain: "Stigma around diagnosis", hub: "PPD as medical, not weakness" },
                { name: "Delayed intervention", does: "Maintains resistance and delays outside help.", emoji: "😠", feel: "Resistant, rigid", level: 0.65, pain: "No coordinated support", hub: "Family-inclusive nudges" },
                { name: "Feels helpless", does: "Begins to accept how serious it is, and shifts gradually.", emoji: "🥹", feel: "Concern, regret", level: 0.38, pain: "No early prevention", hub: "Recovery tracking, reassurance" },
            ],
        },
    ],
}
