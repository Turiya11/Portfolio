// Research folders for Dentigo, KG Hub and Pip. Lumi's are in research-lumi.mjs.
// Sources: the old Framer case studies and content.mjs (Dentigo, KG Hub), and the research deck (Pip).
// KG Hub: only what was already cleared for the public Encora case study. The Figma deck is marked confidential, so nothing comes from it.
// None of the three has a competitor comparison on file except KG Hub. Dentigo and Pip compare what people rely on today instead.
const fr = (id) => `https://framerusercontent.com/images/${id}.png?scale-down-to=2048`
const site = (p) => `../../assets/images/${p}`

/* ------------------------------ Dentigo ------------------------------ */

export const dentigoResearch = [
    {
        title: "Primary & secondary research data",
        hint: "Interviews, surveys, desk research",
        blocks: [
            {
                h: "How the data was gathered",
                cards: [
                    { t: "Primary research", items: ["User interviews with dentists and lab technicians", "Surveys", "Empathy maps of what they say, think, feel and do"] },
                    { t: "Secondary research", items: ["Desk research into how clinics and labs work today", "Findings grouped by affinity mapping"] },
                ],
            },
            {
                h: "What the secondary research showed",
                cards: [
                    { t: "How work happens", items: ["Practices rely on calls, paper slips and emails for orders, which leads to miscommunication", "Manual tracking makes real-time case status hard to know, causing delays and follow-ups"] },
                    { t: "What it costs", items: ["Inefficient workflows and poor coordination cause bottlenecks, longer turnaround times and costly remakes", "Many clinics use generic tools or websites that lack dental-specific data"] },
                    { t: "What could help", items: ["Cloud-based systems improve visibility, errors and scheduling in clinics and labs", "Dental procurement platforms save cost and time, especially for smaller clinics and labs"] },
                ],
            },
        ],
    },
    {
        title: "User pain points",
        hint: "Clinics, labs and everything between",
        blocks: [
            {
                h: "The biggest problems",
                cards: [
                    { t: "No single source of case status", items: ["Real-time status is hard to know", "Delays and constant follow-up calls"] },
                    { t: "Everything hangs on one contact", items: ["Clinics depend on a main technician at the lab", "When that person is unavailable, the case stalls"] },
                    { t: "Finding a trusted lab is hard", items: ["New dentists have no network of technicians", "Pricing, ratings and specialisations are hard to compare"] },
                ],
            },
            {
                h: "Where it breaks between people",
                table: {
                    head: ["Between", "What is exchanged", "What goes wrong"],
                    rows: [
                        ["Dentist → lab", "Case requirements, shade, photos, scans and deadlines", "Instructions arrive incomplete, so technicians call back and remakes follow"],
                        ["Lab → clinic", "Progress, delivery dates and changes", "No shared status, so clinics chase updates and reschedule patients"],
                        ["Pickups and delivery", "Collection times and handing over finished work", "Collections run late, and cases stall when the one contact is away"],
                    ],
                },
            },
            {
                h: "From the affinity map",
                cards: [
                    { t: "In the clinic", items: ["Patients rescheduled because of lab delays and remakes", "Time-consuming chairside adjustments", "No standard way to track an order's progress"] },
                    { t: "Vendors and supply", items: ["Hidden costs and unclear pricing", "Unpredictable delivery schedules", "Poor communication about delays"] },
                ],
            },
        ],
    },
    {
        title: "Key insights",
        hint: "From evidence to opportunity",
        blocks: [
            { quote: "Clinics and labs run on fragmented, manual workflows, and small miscommunications turn into remakes and delays." },
            {
                table: {
                    head: ["What we found", "What it means", "Design opportunity"],
                    rows: [
                        ["Practices order through calls, paper slips and emails", "Order details get lost between people and channels", "Structured orders, with photos, shade and files on the case"],
                        ["Manual tracking hides real-time status", "Clinics chase updates and reschedule patients", "Order tracking as simple as tracking a parcel"],
                        ["Dentists asked for ratings, reviews and price transparency", "Trust decides which lab gets the work", "Lab discovery and side-by-side comparison"],
                        ["Miscommunication about design, shade or fit causes repeat work", "Visual information is hardest to share by text or phone", "Annotate directly on 3D models or images"],
                    ],
                },
            },
            {
                h: "How might we",
                cards: [
                    { t: "For the clinic", items: ["Help a dentist find the right technician for a specific case?", "Make tracking a case as simple as tracking a parcel?", "Simplify comparing prices for everyday supplies?"] },
                    { t: "Between clinic and lab", items: ["Make sharing shade and fit as easy as sending a text?", "Streamline approvals of digital designs?", "Empower clinics to negotiate pricing, warranties and bulk discounts?"] },
                ],
            },
            {
                h: "What made the first version",
                cards: [
                    { t: "Must have", items: ["Dashboard", "Unified case chat", "AI-powered lab comparison", "In-app invoicing and payments"] },
                    { t: "Should have", items: ["Annotation on 3D models or images", "Real-time alerts and approvals", "Lab work portfolios"] },
                    { t: "Could have", items: ["Video notes for complex instructions", "Post-remake analysis", "AI order suggestions"] },
                    { t: "Won't have", items: ["Patient-facing portal", "Patient records and appointments", "3D voice assistant"] },
                ],
            },
        ],
    },
    {
        title: "Competitive analysis",
        hint: "What clinics rely on today",
        blocks: [
            { p: "How clinics and labs handle orders today, and where each option falls short, from the project's research." },
            {
                table: {
                    head: ["Alternative", "What it offers", "Where it falls short", "What Dentigo does instead"],
                    rows: [
                        ["Phone calls", "Fast, direct contact with the lab", "Details get lost · depends on one contact · constant follow-ups", "One thread per case, in unified case chat"],
                        ["WhatsApp and email", "Easy sharing of photos and notes", "Several chats per case · nothing tied to the order · relies on memory", "Files, shade and notes attached to the order"],
                        ["Paper slips", "Familiar, needs no setup", "Incomplete instructions · no visibility once sent", "A structured form, with clear turnaround times"],
                        ["Generic tools and websites", "Available and low effort", "Lack dental-specific data · limit standardisation and quality", "Built around dental cases, labs and materials"],
                        ["Personal lab networks", "Trust built over time", "New dentists don't have one · hard to compare price and quality", "Lab discovery with ratings and side-by-side quotes"],
                    ],
                },
            },
            { note: "This compares existing ways of working. Named products are not included." },
        ],
    },
    {
        title: "System mapping",
        hint: "Who touches a single crown",
        blocks: [
            { p: "A single crown passes through several hands, so the problem is coordination across people, not one screen." },
            { image: { src: fr("Pr71ZCPIuMfJe9KqjzeAJzZOqE"), alt: "System map of the patient, receptionist, dentist, assistant and their actions", caption: "System map: who does what around a case" } },
            { image: { src: fr("600AM7vuVugdK4bghpSttVSms"), alt: "Stakeholder map of interest and influence", caption: "Stakeholder map: interest and influence" } },
            { image: { src: fr("r0TJpemDNu7JEjdSuoO3EFpcXH8"), alt: "Core workflow from sourcing to payment", caption: "Core workflow: sourcing, ordering, production, delivery, verification, payment" } },
        ],
    },
    {
        title: "User persona",
        hint: "Dr. Pooja Sharma, Ravi Kumar",
        blocks: [
            {
                persona: {
                    name: "Dr. Pooja Sharma",
                    role: "Dentist",
                    meta: "45 · general dentistry, specialising in prosthodontics · 2 assistants and a receptionist",
                    quote: "“My reputation is built on the final fit. Every remake costs me chair time and patient trust.”",
                    traits: ["Budget conscious", "Tech savvy"],
                    columns: [
                        { t: "Goals", items: ["A unified view of all her lab cases", "A perfect fit on the first try", "Fewer costly remakes and less wasted chair time"] },
                        { t: "Frustrations", items: ["Juggles chats and calls to track different cases", "Has to remember which lab has which patient's case", "Reschedules appointments because of unpredictable lab delays"] },
                        { t: "Says", items: ["“I want to deliver perfect-fitting dentures with fewer adjustments.”", "“This shade is slightly off. Please send a clear photo next time.”"] },
                        { t: "Thinks", items: ["“Why do I have to personally remember all of this?”", "“This 20-minute adjustment just cost me a new patient slot.”"] },
                        { t: "Feels", items: ["Overwhelmed by the mental load", "Frustrated by delays and corrections", "Relieved after successful first-time fits"] },
                        { t: "Does", items: ["Juggles WhatsApp chats for different cases", "Relies on memory to track specialists", "Grinds down crowns that don't fit"] },
                    ],
                },
            },
            {
                persona: {
                    name: "Ravi Kumar",
                    role: "Lab technician",
                    meta: "32 · independent dental lab · custom dentures and ceramic restorations",
                    quote: "“I can create a perfect crown, but I need clear instructions and good photos.”",
                    traits: ["Budget conscious", "Tech savvy"],
                    columns: [
                        { t: "Goals", items: ["Prosthetics that fit with zero adjustments", "A predictable workflow with fewer remakes"] },
                        { t: "Frustrations", items: ["Incomplete instructions force remakes", "Frequent calls from clinics for status updates", "Orders spread across WhatsApp, email and calls"] },
                        { t: "Says", items: ["“Dentists often send unclear instructions and rush orders.”", "“Matching shades and shapes without photos is difficult.”"] },
                        { t: "Thinks", items: ["Many cases have incomplete details", "Time pressure from urgent jobs impacts quality", "Transparency could reduce waste"] },
                        { t: "Feels", items: ["Apprehensive about incomplete instructions", "Stressed by rushed demands", "Proud when cases need no revisions"] },
                        { t: "Does", items: ["Calls dentists to clarify specifications", "Juggles scheduled work with rush orders", "Reworks prosthetics when expectations change"] },
                    ],
                },
            },
            { note: "Personas are composites built from the interviews." },
        ],
    },
]

/* ------------------------------ KG Hub ------------------------------ */

export const kgResearch = [
    {
        title: "Primary & secondary research data",
        hint: "Literature, data mining, testing",
        blocks: [
            {
                h: "How the data was gathered",
                cards: [
                    { t: "Secondary research", items: ["Literature review of academic papers and research articles", "Online data mining from websites, blogs and social media", "Competitive analysis of ten platforms"] },
                    { t: "Primary research", items: ["Usability testing of the internship prototypes with 6 users", "Dot voting with interns, a UX designer, a PM and a domain expert", "Outcomes presented to 10+ stakeholders"] },
                ],
            },
            {
                h: "What testing showed",
                stats: [
                    { n: "~30%", l: "faster data interpretation" },
                    { n: "~20%", l: "fewer misreads" },
                    { n: "5", l: "visualisation concepts across 4 data types" },
                ],
            },
            {
                h: "What is changing in the field",
                table: {
                    head: ["Trend", "What is happening", "What KG Hub does about it"],
                    rows: [
                        ["AI credibility", "Regulators ask for defined context, documented data provenance and human oversight", "Research question and context travel with every query; insights store linked sources"],
                        ["Knowledge graphs as a trust layer", "Teams connect literature, trials and omics, and need to see how sources differ", "Compare graphs shows shared and unique entities"],
                        ["Multi-marker biomarkers", "Work favours panels and pathways over single markers", "A path finder with hop limits and evidence per relation"],
                        ["Independent validation", "Findings need replication and review before they inform decisions", "Source counts, comments and review status. No invented confidence scores"],
                        ["Real-world data", "Evidence arrives from more places, in varied quality", "Teams choose sources and minimum evidence thresholds"],
                        ["Cross-team work", "Discovery runs across organisations and functions", "Projects with roles, presence, threaded comments and sharing"],
                    ],
                },
            },
            { note: "Shared under an NDA with Encora. The product is presented as KG Hub, proprietary names are changed and sensitive details are left out." },
        ],
    },
    {
        title: "User pain points",
        hint: "Pre-clinical and clinical",
        blocks: [
            {
                h: "Consolidated from the journey maps",
                cards: [
                    { t: "Pre-clinical phase", items: ["Interpreting large datasets and turning them into clear hypotheses", "No integrated platform for visualisation and analysis", "Identifying, validating and integrating biomarkers", "Saving searches and sessions to come back to"] },
                    { t: "Clinical phase", items: ["Balancing research with admin and collaboration", "Integrating the latest scientific literature into analysis", "Summarising results and data outputs"] },
                ],
            },
            {
                h: "Along the researcher's journey",
                table: {
                    head: ["Phase", "What gets in the way"],
                    rows: [
                        ["Discovery", "Accessing and integrating diverse datasets · keeping up with literature"],
                        ["Preclinical research", "Integrating across platforms · finding biomarkers with clinical relevance"],
                        ["Translational research", "Biomarker expression varies across populations · regulatory hurdles"],
                        ["Clinical operations", "Maintaining data continuity · disconnected systems slow real-time decisions"],
                        ["Clinical execution", "Real-time integration creates data silos and delays trial decisions"],
                        ["Data-driven insights", "Multi-modal data slows decisions · preclinical and clinical gaps create inconsistencies"],
                    ],
                },
            },
        ],
    },
    {
        title: "Key insights",
        hint: "From evidence to opportunity",
        blocks: [
            { quote: "Researchers have the data, but no single place to see how it connects." },
            {
                table: {
                    head: ["What we found", "What it means", "Design opportunity"],
                    rows: [
                        ["Leading platforms offer semantic search, live graphs, curation and notifications", "Semantic search and live graphs are expected, not extras", "A search-first home, with graph creation one step away"],
                        ["General graph tools miss curation, collaboration and multi-omics", "They miss what biomedical teams need", "Pathways, entities and comparisons built for biomedicine"],
                        ["Several tools lack uploads, onboarding, exports and notifications", "Interaction basics decide whether researchers adopt a tool", "Uploads, exports, comments and notifications from the start"],
                    ],
                },
            },
            {
                h: "What the team voted for",
                cards: [
                    { t: "The three core features", items: ["Advanced query search and filtering", "Compare knowledge graphs", "Real-time collaboration"] },
                    { t: "Also in the vote", items: ["Data integration and unification", "Notebook integration", "Timeline and history navigation", "AI insight mapping", "AI chatbot", "Notifications and saved sessions"] },
                ],
            },
        ],
    },
    {
        title: "Competitive analysis",
        hint: "Ten platforms compared",
        blocks: [
            { p: "Ten platforms compared on search, graphs, curation, collaboration and export, to understand use cases and features in the organisation's context." },
            {
                table: {
                    head: ["Platforms", "Where they stand", "What it meant for KG Hub"],
                    rows: [
                        ["Data4Cure, BioCypher, Graphster, Ontotext, Stardog, Qiagen", "Lead on semantic search, knowledge graphs, customisable pipelines, curation and real-time notifications", "These are the baseline, so search comes first"],
                        ["Neo4j", "Major gaps in semantic integration, curation, collaboration and biomedical features like multi-omics and target discovery", "Build features specifically for biomedicine"],
                        ["EmBiology, GlyGen, NIH", "Lack interaction tools such as uploads and onboarding, visual exports and notifications", "Treat interaction basics as part of the core"],
                    ],
                },
            },
        ],
    },
    {
        title: "System mapping",
        hint: "How entities and work connect",
        blocks: [
            {
                cards: [
                    { t: "Who is involved", items: ["Clinical researchers", "Translational scientists", "Pharma R&D teams", "Clinicians", "Domain experts"] },
                    { t: "Why it matters", items: ["Patient, genetic and trial data reveal patterns for diagnosis and treatment", "The value only appears when the data is connected"] },
                ],
            },
            { image: { src: fr("C2GzI43bQ1qPDtSYKoWgWzxfaQQ"), alt: "Knowledge graph linking genes, drugs, diseases and side effects", caption: "The knowledge graph: genes, drugs, diseases and side effects" } },
            { image: { src: site("kg/flow.jpg"), alt: "Flow map from query to map and compare, save insight, project and collaborate", caption: "The core journey: query, map and compare, save insight, project, collaborate" } },
            { image: { src: fr("8J9dvoXJdUEIx0PFRbvU8jg4Zo"), alt: "Information architecture of the platform", caption: "Information architecture" } },
        ],
    },
    {
        title: "User persona",
        hint: "Researcher and scientist",
        blocks: [
            {
                persona: {
                    name: "Clinical researcher",
                    role: "Pre-clinical phase",
                    meta: "Turns large datasets into hypotheses",
                    columns: [
                        { t: "Needs", items: ["Interpret large datasets and form clear hypotheses", "One platform for visualisation and analysis", "Identify and validate biomarkers", "Save searches and sessions"] },
                        { t: "Does", items: ["Validates targets and analyses multi-omics data", "Builds biomarker strategy", "Analyses trial data and makes go/no-go decisions"] },
                        { t: "Pain points", items: ["Diverse datasets that are hard to integrate", "Disconnected data that slows decisions", "Multi-modal data that slows decision-making"] },
                    ],
                },
            },
            {
                persona: {
                    name: "Translational scientist",
                    role: "Moving findings toward the clinic",
                    meta: "Balances research with collaboration",
                    columns: [
                        { t: "Needs", items: ["Summarise results and outputs quickly", "Integrate the latest literature into analysis", "Collaborate with the wider team", "Spend less time on admin"] },
                        { t: "Does", items: ["Reviews literature and early data", "Refines patient selection and biomarker strategy", "Interprets early human data"] },
                        { t: "Pain points", items: ["An overwhelming number of compounds", "Animal models with limited translatability", "Conflicting or inconclusive biomarker data"] },
                    ],
                },
            },
            { note: "The personas represent the stakeholders whose goals and workflows guided the design." },
        ],
    },
]

/* ------------------------------ Pip ------------------------------ */

export const pipResearch = [
    {
        title: "Primary & secondary research data",
        hint: "Survey, interviews, experiment",
        blocks: [
            {
                h: "Primary research",
                stats: [
                    { n: "46", l: "survey responses: college students in India, aged 18–25" },
                    { n: "18", l: "interviews on how they remember and where it breaks" },
                    { n: "4", l: "experiment participants: four task flows, then recall from colour cards" },
                ],
            },
            {
                h: "What brings an intention back (n = 46, multiple answers)",
                table: {
                    head: ["Cue", "Responses", "Share"],
                    rows: [
                        ["Seeing something related", "38 / 46", "83%"],
                        ["Someone mentioning it", "33 / 46", "72%"],
                        ["Looking at notes or a to-do list", "16 / 46", "35%"],
                        ["Checking their phone", "11 / 46", "24%"],
                        ["Going to a particular place", "8 / 46", "17%"],
                    ],
                },
            },
            {
                h: "In their words",
                cards: [
                    { t: "From the survey", items: ["“A long list gives me anxiety. Reduce it.”", "“i don't like 35,000 reminders also popping on my phone or around me”", "“I hate it when I tend to do everything at once because if I don't then I'll forget about it”"] },
                    { t: "From the interviews", items: ["“...someone who is actually checking in, have you done it.”", "“Too many things going on, no time to jot down.”"] },
                    { t: "From the experiment", items: ["Colour became a task-level anchor for 3 of 4 participants", "The task survived; time and details did not"] },
                ],
            },
            {
                h: "Secondary research",
                cards: [
                    { t: "Published studies", items: ["Diary studies suggest 50 to 70% of everyday memory failures are prospective memory failures", "Gilbert (2015): four online experiments (N = 1,196). Setting external reminders improved performance on delayed intentions", "Altmann & Trafton (2004): resumption lag was about 3.8 s against 1.9 s uninterrupted, and cues just before an interruption reduced it", "Risko & Gilbert (2016) and Gilbert et al. (2023): reviews of cognitive and intention offloading"] },
                    { t: "Online community scan", items: ["Eight Reddit threads", "“List blindness”: forgetting the list exists", "Snoozing called “the killer”", "New tools stop working after a few weeks"] },
                ],
            },
            { note: "Study samples are small and the findings are preliminary." },
        ],
    },
    {
        title: "User pain points",
        hint: "Seven themes, seven moments",
        blocks: [
            {
                h: "Seven themes from the research",
                cards: [
                    { t: "A · Many parallel intentions", items: ["42 / 46 (91%) often or almost every day have multiple things to remember"] },
                    { t: "B · Fragmented storage", items: ["8 overlapping approaches: memory 33, WhatsApp to self 23, notes apps 19", "A participant still forgets despite multiple systems"] },
                    { t: "C · Capture doesn't guarantee retrieval", items: ["43 / 46 (93%) say something they wanted to remember slips their mind"] },
                    { t: "D · Context can prompt recall", items: ["Related object 83%, someone mentioning it 72%, a place 17%", "Someone close seemed to speed up one participant's recall"] },
                    { t: "E · Reminder fatigue and effort", items: ["“i don't like 35,000 reminders”", "“A long list gives me anxiety.”"] },
                    { t: "F · Fear of forgetting changes behaviour", items: ["“I wish I did the task then and there so that I won't need to remember (forget) later.”"] },
                    { t: "G · Dependable retrieval contexts", items: ["“I would write them down in a place where I know I would remember to check”"] },
                ],
            },
            {
                h: "Friction along the way",
                table: {
                    head: ["Moment", "What gets in the way"],
                    rows: [
                        ["Idea emerges", "Hands and attention are busy"],
                        ["Capture", "Slower than a WhatsApp message to self"],
                        ["Contextualise", "Forms at the moment of capture"],
                        ["Park", "Doubt that it is really saved"],
                        ["Resurface", "An alert mid-task gets swiped away"],
                        ["Retrieve", "Cannot recall why she saved it"],
                        ["Act or continue", "Repeated snoozes feel like nagging"],
                    ],
                },
            },
        ],
    },
    {
        title: "Key insights",
        hint: "Gist survives, details fade",
        blocks: [
            { quote: "Gist survives, details fade. A related object or a person is the strongest cue." },
            {
                table: {
                    head: ["Insight", "What we observed", "What it means", "Design opportunity"],
                    rows: [
                        ["Saving is not recalling", "43 / 46 say things slip, even with systems", "Retrieval, not storage, is the gap", "Act at retrieval. Point to one thing"],
                        ["Gist first, detail on tap", "Related object cues 38 / 46. Colour anchored 3 of 4", "Gist survives; detail fades", "A visual anchor with a short title"],
                        ["A person is the cue, not an alarm", "A person cues 33 / 46. Interviewees rely on one", "A check-in is not an alarm", "A friend with Done / Not now"],
                        ["Overload blocks both ends", "“35,000 reminders”. “A long list gives me anxiety.”", "Too many cues harm recall", "One quiet cue. Capture in seconds"],
                    ],
                },
            },
            {
                h: "Eight design requirements",
                cards: [
                    { t: "What to bring back", items: ["One cue, not a list", "Protect the middle", "Visual identity, gist first", "Anchor to something in view"] },
                    { t: "How to behave", items: ["A check-in, not an alarm", "Capture in seconds", "Done or not now, without judgement", "Surface what students already trust"] },
                ],
            },
        ],
    },
    {
        title: "Competitive analysis",
        hint: "What students rely on today",
        blocks: [
            { p: "Students don't lack tools. They layer eight overlapping approaches, so this compares those, then the six concepts weighed against them." },
            {
                table: {
                    head: ["Alternative", "What it offers", "Where it falls short", "What Pip does instead"],
                    rows: [
                        ["Memory alone", "Used by 33 of 46, with no effort", "43 of 46 say things slip anyway", "Gives a thought somewhere to go, in seconds"],
                        ["WhatsApp to self", "Used by 23 of 46, and very fast", "Saved isn't remembered · buried in chat", "Park is just as quick, and the thought stays visible"],
                        ["Notes apps", "Used by 19 of 46, and always to hand", "Looking at notes or a list cues only 35%", "A visual orb with a short title, not a list"],
                        ["Lists and notebooks", "Everything in one known place", "“List blindness” · long lists cause anxiety", "One thought at a time"],
                        ["Alarms and reminders", "Fires at a set time", "Swiped away mid-task · snoozing “the killer”", "A check-in, with “Not now” always allowed"],
                        ["Family and friends", "A person mentioning it cues 72%", "Depends on someone being there", "A companion that asks “Done or Not now?”"],
                    ],
                },
            },
            {
                h: "Six directions, Pip compared",
                table: {
                    head: ["Concept", "Idea", "Right moment", "Low reminder load", "Easy to test"],
                    rows: [
                        ["Pip (AR), lead", "A friend that checks in", "●●●", "●●●", "●●●"],
                        ["Check-in Buddy", "A chat check-in", "●●●", "●●○", "●●●"],
                        ["Colour Anchor", "A colour that follows you", "●●○", "●●●", "●●●"],
                        ["Park-it Pebble", "A token for a thought", "●●○", "●●●", "●●○"],
                        ["Only the Middle", "Protect only what needs it", "●●○", "●●●", "●●●"],
                        ["Study Pair", "Trade nudges with a friend", "●●○", "●●○", "●●○"],
                    ],
                },
            },
            { note: "Scores are first-pass judgements to prompt discussion, not validated scores. Named apps were not compared." },
        ],
    },
    {
        title: "System mapping",
        hint: "Where a thought goes",
        blocks: [
            {
                h: "Where intentions live today",
                cards: [
                    { t: "On their own", items: ["Memory alone", "WhatsApp messages to self", "Notes apps", "Lists and notebooks"] },
                    { t: "From outside", items: ["Alarms", "Family and friends who check in"] },
                ],
            },
            {
                h: "How a thought moves, from idea to action",
                table: {
                    head: ["Step", "When", "What she does", "How Pip responds"],
                    rows: [
                        ["1 · Idea emerges", "In the moment", "Has a thought on the bus, in a lecture or while browsing", "Open Pip in one tap"],
                        ["2 · Capture", "Seconds", "Types or speaks one line", "Park saves instantly, no extra fields"],
                        ["3 · Contextualise", "Optional", "Adds what she was doing and the next small step", "Everything beyond the thought is optional"],
                        ["4 · Park", "Moments later", "Watches the thought become an orb around Pip", "Orb with letter and title; persists after closing"],
                        ["5 · Resurface", "Hours to days", "Gets a reminder, or opens her orbit herself", "Quiet cue at the chosen time; revisit any time"],
                        ["6 · Retrieve", "On return", "Recognises the orb and reads the context", "Shows the original thought, context and next step"],
                        ["7 · Act or continue", "After", "Starts, snoozes, completes or archives", "Done or Not now, no judgement"],
                    ],
                },
            },
            {
                h: "How the experience is organised",
                cards: [
                    { t: "Onboarding", items: ["Welcome brief", "Choose your Pip"] },
                    { t: "Capture and park", items: ["Home and orbit", "Text or voice capture", "Optional details", "Choose a revisit time"] },
                    { t: "Find and revisit", items: ["All thoughts library", "Search and filters", "Thought detail"] },
                    { t: "Pip in AR", items: ["Camera permission", "Detect and place Pip", "Placed AR orbit", "Pip's reminder in AR"] },
                ],
            },
        ],
    },
    {
        title: "User persona",
        hint: "Anaya, Riya, Kabir",
        blocks: [
            {
                persona: {
                    name: "Anaya",
                    role: "Systems Builder",
                    quote: "“... needs someone who is actually checking in.”",
                    traits: ["Notes app", "WhatsApp to self", "Her mother"],
                    columns: [
                        { t: "Goal", items: ["Never lose something that matters, and keep a sense of control"] },
                        { t: "Pain points", items: ["A notification pulls her away mid-task", "One thing reminding her of another opens “hundreds of tabs”"] },
                        { t: "Where it breaks", items: ["Mid-importance things slip: “I'll do it later.”"] },
                    ],
                },
            },
            {
                persona: {
                    name: "Riya",
                    role: "Deadline Juggler",
                    quote: "“Too many things going on, no time to jot down.”",
                    traits: ["Notes app", "WhatsApp to self", "Someone calling"],
                    columns: [
                        { t: "Goal", items: ["Keep every project moving without dropping the recurring commitments"] },
                        { t: "Pain points", items: ["Loses track of which stage each project is at", "A morning routine task gets half-forgotten"] },
                        { t: "Where it breaks", items: ["Fixed-time posts missed while driving"] },
                    ],
                },
            },
            {
                persona: {
                    name: "Kabir",
                    role: "Minimalist Completer",
                    quote: "Wants capture to be easier than “making another note section or searching for pen paper.”",
                    traits: ["Avoids lists", "Does it now"],
                    columns: [
                        { t: "Goal", items: ["Keep the list short and the head clear"] },
                        { t: "Pain points", items: ["Feels anxious after looking at long lists", "Gets overwhelmed"] },
                        { t: "Where it breaks", items: ["The effort of capture"] },
                    ],
                },
            },
            { note: "Three composites built from the research." },
        ],
    },
]
