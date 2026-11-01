// Case-study content passed to the Framer components as props (see pages.mjs).
// Sources: the earlier case studies on turiya.framer.website (Dentigo, Encora), the CV, and the Pip research paper.
// Leave a field "" to hide it; arrays left [] hide their block.

const fr = (id) => ({ src: `https://framerusercontent.com/images/${id}` })
const local = (p) => ({ src: `../../assets/images/${p}` })

/* ------------------------------ Dentigo ------------------------------ */

export const dentigo = {
    team: "",
    tools: "",
    scope: "System and stakeholder mapping, user interviews and surveys, secondary research, competitive analysis, affinity mapping, personas and empathy maps, How Might We, MoSCoW, storyboards, user flows, sitemap, information architecture, style guide, high-fidelity screens",
    status: "Academic concept with high-fidelity screens. Not a launched product.",
    ovChallenge:
        "Dental clinics and specialised labs in India coordinate restorations and supplies through calls, paper slips, WhatsApp and email. Instructions arrive incomplete, nobody can see where a case is, and every remake costs chair time and patient trust.",
    ovNote: "Dentigo is an academic UX project and platform concept, not a launched product. Labs, ratings, prices and orders in the screens are sample data.",
    ovImage: fr("SVD6qNv1XzfymXUBWWUg8bi7yWs.png"),

    ctxIntro:
        "A single crown passes through several hands: the dentist takes the case, the lab fabricates it, suppliers deliver materials and someone coordinates pickups. Most of that runs on calls and chats, so the problem is coordination across people, not one screen.",
    ctxMap: fr("Pr71ZCPIuMfJe9KqjzeAJzZOqE.png"),
    ctxMapNote: "The core workflow runs sourcing → ordering → production → delivery → verification → payment.",
    handoffs: [
        { between: "Dentist → lab", exchange: "Case requirements, shade, photos, scans and deadlines", failure: "Instructions arrive incomplete or unclear, so technicians call back to clarify and remakes follow." },
        { between: "Lab → clinic", exchange: "Progress, delivery dates and changes", failure: "There is no shared status, so clinics chase updates by phone and reschedule patients when work runs late." },
        { between: "Pickups and delivery", exchange: "Collection times and the hand-over of finished work", failure: "Collections run late, and cases stall when the one contact person at the lab is unavailable." },
    ],

    probQuote: "Clinics and labs run on *fragmented, manual workflows*, and small miscommunications turn into remakes and delays.",
    probStatement:
        "Dental clinics and specialised labs in India rely on fragmented, manual workflows for restorations and supplies, causing miscommunication, high staff workload, costly remakes and delays, ultimately harming patient experience, professional relationships and profitability.",
    issuesNote: "",
    challenges: [
        { title: "No single source of case status", text: "Manual tracking makes real-time status hard to know, which causes delays and constant follow-up calls.", source: "Secondary research" },
        { title: "Everything hangs on one contact", text: "Clinics depend on a main technician at the lab. When that person is unavailable, the case stalls with no backup.", source: "User-reported" },
        { title: "Finding a trusted lab is hard", text: "New dentists have no network of technicians, and pricing, ratings and specialisations are hard to compare.", source: "User-reported" },
    ],

    resHeading: "What the research showed",
    resIntro: "Primary research through user interviews and surveys, alongside secondary research, a competitive analysis and affinity mapping of the findings.",
    findings: [
        { evidence: "Dental practices order through calls, paper slips and emails.", insight: "Order details get lost between people and channels.", opportunity: "Structured order creation, with photos, shade and files attached to the case.", source: "Secondary research" },
        { evidence: "Manual tracking makes real-time case status hard to know.", insight: "Clinics spend time chasing updates and rescheduling patients.", opportunity: "Order tracking as simple as tracking a parcel, with clear statuses.", source: "Secondary research" },
        { evidence: "Dentists asked for lab ratings, reviews, price transparency and quality checks.", insight: "Trust and transparency decide which lab gets the work.", opportunity: "Lab discovery and side-by-side comparison of quotes, timelines and performance.", source: "User-reported" },
        { evidence: "Miscommunication about design, shade or fit leads to repeat work.", insight: "Visual information is the hardest thing to share by text or phone.", opportunity: "Annotate directly on 3D models or images inside the case chat.", source: "User-reported" },
    ],
    artifacts: [
        { title: "Stakeholder mapping", note: "Interest and influence of dentists, technicians, assistants, suppliers and patients.", image: fr("600AM7vuVugdK4bghpSttVSms.png") },
        { title: "Core workflow", note: "The six stages every restoration passes through.", image: fr("r0TJpemDNu7JEjdSuoO3EFpcXH8.png") },
        { title: "Storyboard: a complex anterior crown", note: "Dr. Pooja's assistant handles the order and tracks it, so nothing is lost before the patient returns.", image: fr("uXPJgRLEWSqCP4qHKmhIWdup4Ek.png") },
        { title: "Storyboard: a new clinic in Pune", note: "Dr. Arjun needs to find a lab he can trust without an existing network.", image: fr("V01SGxeBv0uyPg1sregW9INR50o.png") },
    ],

    usrHeading: "Two sides of the same order",
    usrIntro: "Clinics and labs share every case but see different halves of it. Dentists carry the patient and the final fit; technicians need complete, visual instructions to get it right the first time. The personas are composites built from the interviews.",
    perspectives: [
        {
            name: "Dentists and clinic staff",
            summary: "Dr. Pooja Sharma, 45, a general dentist specialising in prosthodontics, with two assistants and a receptionist. “My reputation is built on the final fit.”",
            needs: "Communicate accurate restoration requirements\nFind suitable laboratory partners\nSee active orders and delivery expectations\nCoordinate appointments around case progress\nReview pricing, quotes and prior orders",
            observed: "Juggles several WhatsApp chats and calls to track different cases\nRelies on memory for which lab has which patient's case\nLoses chair time grinding down a crown that doesn't fit",
            assumptions: "",
        },
        {
            name: "Lab technicians and laboratories",
            summary: "Ravi Kumar, 32, runs an independent lab making custom dentures and ceramic restorations. “I can create a perfect crown, but I need clear instructions and good photos.”",
            needs: "Receive complete, understandable case specifications\nAccess reference images and digital files\nShare clarifications and progress without phone calls\nManage urgent and scheduled work together\nReduce rework from misunderstood instructions",
            observed: "Calls dentists to clarify specifications\nJuggles orders across WhatsApp, email and calls\nReworks prosthetics when expectations change at the last minute",
            assumptions: "",
        },
    ],

    opHeading: "From problems to a platform",
    opIntro: "How Might We questions turned the research into opportunities, and MoSCoW decided what the first version had to include.",
    hmw: [
        "How might we help a dentist find the right technician for a specific case?",
        "How might we make sharing complex visual information, like shade and fit, as easy as sending a text?",
        "How might we make tracking a dental case as simple and transparent as tracking a parcel?",
        "How might we streamline approvals of digital designs to prevent bottlenecks?",
        "How might we empower clinics to negotiate better pricing, warranties and bulk discounts?",
        "How might we simplify discovering and comparing prices for everyday dental supplies?",
    ],
    features: [
        { feature: "Dashboard", priority: "Must have", reasoning: "One place for active orders, schedules and lab messages." },
        { feature: "Unified case chat", priority: "Must have", reasoning: "Replaces scattered calls and WhatsApp threads with one thread per case." },
        { feature: "AI-powered lab comparison", priority: "Must have", reasoning: "Finding a trusted lab was a core pain for new dentists." },
        { feature: "In-app invoicing and payments", priority: "Must have", reasoning: "Quotes and payments sit with the order instead of in a separate channel." },
        { feature: "Annotate on 3D models or images", priority: "Should have", reasoning: "Shade and fit are visual; marking them up avoids remakes." },
        { feature: "Real-time alerts and approvals", priority: "Should have", reasoning: "Keeps cases moving without follow-up calls." },
        { feature: "Video notes for complex instructions", priority: "Could have", reasoning: "Useful for tricky cases, smaller overall impact." },
        { feature: "Post-remake analysis", priority: "Could have", reasoning: "Learns from errors once enough orders exist." },
    ],
    deferred: "Patient-facing portal: no patient logins or communication\nManaging patient records, appointments or internal billing\n3D voice assistant for prosthetic simulation",

    flHeading: "How the experience is organised",
    flIntro: "Two storyboards led to five user flows, a sitemap and an information architecture built around orders, labs and payments.",
    flSitemap: fr("ImQHPo0mCnfM7uKxW0FLOqViNU.png"),
    flows: [
        { name: "Find trusted lab partners", start: "A dentist without a lab network", end: "A lab chosen for the case", summary: "Browse featured labs, filter by specialty and compare quotes, timelines and performance.", tradeoffs: "", diagram: fr("NOKQBUtvyue0Pp4S3a3Zu3fXgsY.png") },
        { name: "Place a new order with complex information", start: "A case ready to send", end: "Order sent with files, shade and notes", summary: "A structured form with AI lab suggestions and clear turnaround times.", tradeoffs: "", diagram: fr("a6jnaF4nBxwKrkxtFkJlS9sMVg.png") },
        { name: "Manage payment with the lab", start: "A quote received", end: "Invoice paid", summary: "Quotes, invoices and payment status stay attached to the order.", tradeoffs: "", diagram: fr("s3lQJum6CNwkB4S046AjUN5Px4.png") },
        { name: "Track active and past orders", start: "An order in progress", end: "Delivered, reviewed or re-ordered", summary: "Statuses like “Awaiting shipment”, delivery estimates and one-tap re-ordering.", tradeoffs: "", diagram: fr("Z1xwcYrwuwtxdZB7TXJAqokg4k.png") },
    ],

    exHeading: "The core experience",
    exIntro: "High-fidelity screens carry the clinic side of the workflow, from the dashboard to payments.",
    screens: [
        { title: "Dashboard", state: "Proposed in design", need: "See every active case and what needs attention, at a glance.", decision: "A central hub for active orders, schedules and lab communication in real time.", notes: "", image: fr("IXXgoARlVZjdyuCglkzrsFoI.png") },
        { title: "Place a new order", state: "Proposed in design", need: "Send complete instructions the first time.", decision: "A structured form with AI lab recommendations and clear turnaround times.", notes: "", image: fr("4SAiQVEp7MxCBaSUaxa7IlneaNQ.png") },
        { title: "3D model viewer", state: "Proposed in design", need: "Check a design precisely before approving it.", decision: "Measurements, annotations and layer controls on the digital scan streamline approval.", notes: "", image: fr("vwjL0QlUitEvn7usHSlEzklj0.png") },
        { title: "Browse labs", state: "Proposed in design", need: "Find a lab you can trust.", decision: "Featured labs with ratings, specialties and delivery metrics, filterable by specialty such as implants.", notes: "", image: fr("2L88DS1Mt8eFnU0W98lX7MTZyI.png") },
        { title: "Compare labs", state: "Proposed in design", need: "Choose between quotes with confidence.", decision: "Side-by-side pricing, timelines, performance scores, material quality and warranty terms.", notes: "", image: fr("82uO0J6N7Z8AQoYqBnyU9nlu2A.png") },
        { title: "Quotations", state: "Proposed in design", need: "Keep track of quote requests.", decision: "Status chips (All, Pending, Received, Expired) and progress indicators.", notes: "", image: fr("qMHk3sI5MzVZU1ondT4PLwc37g.png") },
        { title: "Active orders", state: "Proposed in design", need: "Know where every case is.", decision: "Clear statuses such as “Awaiting shipment”, delivery estimates and tooth selections.", notes: "", image: fr("MoZycCHj5SGcq1PAW7zziIg06oU.png") },
        { title: "Pending orders", state: "Proposed in design", need: "Catch problems before they delay treatment.", decision: "Highlights orders that need action, such as missing scans.", notes: "", image: fr("T12mMFSWfBTCSxEMg1NvwYtY0.png") },
        { title: "Past orders", state: "Proposed in design", need: "Review history and spending.", decision: "Completed cases, invoice status, total spend and a Re-order button.", notes: "", image: fr("zd0xpAqOkMPfQKxms2YXCCnCyA.png") },
    ],
    details: [],
    dtIntro: "",

    evProposed: "A dashboard for every active case\nStructured ordering with files, shade and AI lab suggestions\nLab discovery and quote comparison\nOrder tracking, quotations and payments in one place",
    evPrototyped: "High-fidelity screens for the clinic side of the workflow",
    evTested: "",
    evUnvalidated: "Fit with real clinic and lab workflows\nWhether structured orders reduce remakes\nWhether comparison builds enough trust to switch labs",
    rfHeading: "",
    rfA: "",
    rfB: "",
    rfC: "",
    rfNext: "",
    hiddenSections: "details, reflection",
}

/* ------------------------------ Encora ------------------------------ */

export const encora = {
    role: "UX design intern",
    roleNote: "Encora Inc. · internship",
    timeline: "Feb – May 2025",
    projectType: "Desktop · life sciences",
    domain: "Biomedical data · knowledge graphs",
    team: "Guided by Amit Marathe, Principal Product Designer, with fellow interns, a PM and a domain expert",
    tools: "",
    scope: "Secondary research, competitive analysis, personas, user journey maps, pain-point synthesis, feature voting, information architecture, wireframes, mood board and brand guidelines, prototype",
    status: "Designed and prototyped during the internship, and tested with 6 users.",
    ovHeadline: "From data to discovery: biomedical visualisation powered by a knowledge graph.",
    ovLead: "During my internship at Encora I designed interactive visualisations that turn complex biomedical data into insight for clinical researchers. I prototyped 5 concepts across 4 data types and tested them with 6 users.",
    ovChallenge:
        "Clinical researchers struggle to integrate complex biomedical data. Current tools lack automation, visualisation and one cohesive platform, which slows translational research and delays personalised therapies.",
    ovNote: "Shared under a confidentiality agreement with Encora: proprietary names are changed, sensitive details are left out and some visuals are blurred. Happy to walk through the work at itsturiyajoshi11@gmail.com.",
    ovImage: fr("c3OFiHP4Ds0TxBmkE1mSSpoU9hA.png"),

    ctxHeading: "How biomedical data supports clinical insight",
    ctxIntro:
        "Patient, genetic and trial data reveal patterns clinicians use for diagnosis and personalised treatment, and give researchers a window into disease mechanisms and drug targets. The value only appears when the data is connected.",
    ctxPartLabel: "Who is involved",
    participants: ["Clinical researchers", "Translational scientists", "Pharma R&D teams", "Clinicians", "Domain experts"],
    ctxMapLabel: "Knowledge graph",
    ctxMap: fr("C2GzI43bQ1qPDtSYKoWgWzxfaQQ.png"),
    ctxMapNote: "A knowledge graph links genes, drugs, diseases and side effects, so researchers can follow pathways instead of reading tables.",
    handoffs: [],

    probQuote: "Researchers have the data, but *no single place to see how it connects*.",
    probStatement:
        "Clinical researchers in healthcare face challenges in integrating complex biomedical data. Current tools lack automation, visualisation and cohesive platforms, hindering translational research and delaying personalised therapies. A unified, AI-driven knowledge graph platform is needed for real-time insights in clinical research and pharmaceutical R&D.",
    issuesLabel: "Pain points across the research journey",
    issues: [
        "Turning large datasets into clear hypotheses",
        "No integrated platform for visualisation and analysis",
        "Identifying, validating and integrating biomarkers",
        "Saving searches and sessions to come back to",
        "Research work competing with admin and collaboration",
        "Keeping up with the latest scientific literature",
        "Summarising results and data outputs",
    ],
    issuesNote: "Consolidated from journey maps of a clinical researcher (pre-clinical) and a translational scientist (clinical).",
    challenges: [],

    resHeading: "What the research showed",
    resIntro: "Secondary research (literature review and online data mining), a competitive analysis of ten platforms, two personas and journey maps for each.",
    findings: [
        { evidence: "Data4Cure, BioCypher, Graphster, Ontotext, Stardog and Qiagen lead on semantic search, knowledge graphs, pipelines, curation and real-time notifications.", insight: "Semantic search and live knowledge graphs are expected, not extras.", opportunity: "A search-first home, with knowledge-graph creation one step away.", source: "Secondary research" },
        { evidence: "Neo4j shows gaps in semantic integration, curation, collaboration and biomedical features such as multi-omics and target discovery.", insight: "General graph tools miss what biomedical teams need.", opportunity: "Domain features: pathways, entities and comparisons built for biomedicine.", source: "Secondary research" },
        { evidence: "EmBiology, GlyGen and NIH lack uploads, onboarding, visual exports and notifications.", insight: "Interaction basics decide whether researchers adopt a tool.", opportunity: "Uploads, exports, comments and notifications built in from the start.", source: "Secondary research" },
    ],
    artifacts: [
        { title: "Competitive analysis", note: "Ten platforms compared on search, graphs, curation, collaboration and export.", image: fr("0kE3ZMhLpUn3pFdl20XnA53LSsE.png") },
        { title: "Personas", note: "A clinical researcher and a translational scientist.", image: fr("atZX13o6Os8KOxRgUnWJoeySSPQ.png") },
        { title: "Journey map: clinical researcher", note: "From target identification to data-driven insight.", image: fr("Ubw2vjh1bItWdlQQA7rULzOAVSg.png") },
        { title: "Journey map: translational scientist", note: "From awareness and research to decision-making.", image: fr("zd1ZXEZ9oA7UmtviTGuZ7jW87rs.png") },
        { title: "Dot voting", note: "Interns, a UX designer, a PM and a domain expert voted on features.", image: fr("WCL7cM5MbJxZChXgeW6QGnFC9c.png") },
    ],

    usrHeading: "Two research roles, two journeys",
    usrIntro: "The personas represent the stakeholders whose goals and workflows guided the design.",
    perspectives: [
        { name: "Clinical researcher", summary: "Works in the pre-clinical phase, turning large datasets into hypotheses.", needs: "Interpret large datasets and form clear hypotheses\nOne platform for visualisation and analysis\nIdentify and validate biomarkers\nSave searches and sessions", observed: "", assumptions: "" },
        { name: "Translational scientist", summary: "Moves findings toward the clinic, balancing research with collaboration.", needs: "Summarise results and outputs quickly\nIntegrate the latest literature into analysis\nCollaborate with the wider team\nSpend less time on admin", observed: "", assumptions: "" },
    ],

    opHeading: "From pain points to features",
    opIntro: "The team dot-voted a long list of features, from data integration and query search to an AI chatbot. Three became the product's core.",
    hmw: [],
    prioLabel: "The three core features",
    features: [
        { feature: "Advanced query search and filtering", priority: "Must have", reasoning: "Search is where every research session starts." },
        { feature: "Compare knowledge graphs", priority: "Must have", reasoning: "Researchers reason by comparing diseases, drugs and pathways." },
        { feature: "Real-time collaboration", priority: "Must have", reasoning: "Comments and a change timeline keep teams on the same graph." },
    ],
    deferred: "",

    flHeading: "How the experience is organised",
    flIntro: "The information architecture puts query search and filtering, knowledge-graph comparison and real-time collaboration at the centre.",
    flSitemapLabel: "Information architecture",
    flSitemap: fr("8J9dvoXJdUEIx0PFRbvU8jg4Zo.png"),
    flows: [],

    exHeading: "The core experience",
    exIntro: "Wireframes mapped structure and flows before any visual design. Interface details are blurred to respect the NDA.",
    screens: [
        { title: "Dashboard", state: "Prototyped", need: "Start from a question, not a file.", decision: "A search bar, quick access to compare graphs, data and favourites, and recent queries.", notes: "", image: fr("jsKP2nT419QKysjJgFsmPUrMzI.png") },
        { title: "Create a knowledge graph", state: "Prototyped", need: "See how a disease connects to genes, drugs and side effects.", decision: "An interactive graph (here, lung cancer) with search, filters, pathways, comparison, comments and a timeline of changes.", notes: "", image: fr("gdhJ2uievqnpWSMQC1NeB5qyQM.svg") },
        { title: "Edit nodes and add comments", state: "Prototyped", need: "Refine the graph together.", decision: "Edit nodes, find pathways and discuss relationships in context.", notes: "", image: fr("ikdiuimDf8nUNL0ctcOz523yb4A.svg") },
    ],
    details: [],
    dtIntro: "",

    evHeading: "What was designed, and what was tested",
    evProposed: "A search-first dashboard for knowledge graphs\nCreating, editing and comparing knowledge graphs\nComments and a change timeline for collaboration",
    evPrototyped: "5 visualisation concepts across 4 complex data types",
    evTested: "Prototypes tested with 6 users",
    evUnvalidated: "",
    evMethod: "Usability testing of the prototypes with 6 users, with outcomes presented to 10+ stakeholders.",
    evFindings: "~30% faster data interpretation\n~20% fewer misreads",
    evChanged: "",
    rfHeading: "",
    rfA: "",
    rfB: "",
    rfC: "",
    rfNext: "",
    hiddenSections: "details, flows, reflection",
}

/* ------------------------------ Pip (uses the Encora layout) ------------------------------ */

export const pip = {
    title: "Pip",
    role: "UX research · AR interaction design",
    roleNote: "academic research",
    timeline: "2026",
    projectType: "Academic research · AR prototype",
    domain: "Prospective memory · intention offloading",
    team: "",
    tools: "Three.js, WebXR, Meta Immersive Web SDK, FigJam",
    scope: "Survey (n = 46), 18 interviews, a clutter and colour-cue experiment, an online community scan, six concepts and two working AR prototypes",
    status: "Two working AR prototypes, on the web and on Meta Quest. Not yet tested with users.",
    ovHeadline: "A space to park your thoughts, and a friend who brings them back.",
    ovLead: "Pip is an AR companion that helps design students offload intentions and return to them at the right moment. Thoughts become glowing orbs around a friendly astronaut, and one at a time can be pulled into Focus Mode and broken into a first step.",
    ovChallenge:
        "College students aged 18 to 25 in India struggle to remember and act on everyday intentions at the right time, as competing responsibilities and fragmented storage make retrieval difficult. Existing reminders can add to the overload instead of bringing back what matters.",
    ovNote: "Academic research project. Study samples are small and the findings are preliminary; the prototypes have not been tested with users yet.",
    heroVideo: "../../assets/video/pip-focus.mp4", // Pip Focus Mode on Meta Quest
    heroPoster: local("pip/ar-pip.jpg"),
    heroAutoplay: true,
    ovImage: local("pip/ar-pip.jpg"),

    ctxHeading: "Remembering to act is its own kind of memory",
    ctxIntro:
        "Prospective memory is remembering to do something at the right future moment, and diary studies suggest 50 to 70% of everyday memory failures are of this kind. Design students juggle two to four projects alongside internships, businesses and coursework, switching contexts many times a day.",
    ctxPartLabel: "Where intentions live today",
    participants: ["Memory alone", "WhatsApp messages to self", "Notes apps", "Lists and notebooks", "Alarms", "Family and friends who check in"],
    ctxMapLabel: "Design process: Double Diamond",
    ctxMap: local("pip/slide-03.jpg"),
    ctxMapNote: "Discover (literature, survey, interviews, experiment) → Define (themes, archetypes, personas, journey) → Develop (six concepts) → Deliver (two AR prototypes).",
    handoffs: [],

    probQuote: "Students don't lack places to store intentions. They lack *a way to bring the right one back* when they can act on it.",
    probStatement:
        "How do the organisation and level of competing visual information during encoding influence how everyday intentions are formed and later retrieved, and how can a design support that step without adding to the reminders students already ignore?",
    issuesLabel: "What the survey showed (n = 46)",
    issues: [
        "91% often hold several things to remember at once",
        "93% say intentions slip despite their systems",
        "Seeing something related brings an intention back for 83%",
        "Someone mentioning it works for 72%",
        "Going to a particular place works for only 17%",
        "“A long list gives me anxiety. Reduce it.”",
    ],
    issuesNote: "",
    challengesLabel: "What the interviews added",
    challenges: [
        { title: "Recording isn't remembering", text: "Writing something down makes it feel safe, but doesn't make you act on it at the right moment.", source: "User-reported" },
        { title: "The middle slips", text: "High-stakes items hold attention on their own; mid-importance ones (birthdays, assignments) get “I'll do it later”.", source: "User-reported" },
        { title: "A check-in beats an alarm", text: "A parent asking “have you done it?” checks the outcome. One student wanted “someone who is actually checking in”.", source: "User-reported" },
    ],

    resHeading: "Gist survives, details fade",
    resIntro: "A mixed-methods formative study: a survey of 46 students, 18 semi-structured interviews, a scan of eight Reddit threads, and an experiment with 4 participants that varied visual clutter during encoding and tested recall from plain colour cards.",
    resMethod: "",
    findings: [
        { evidence: "Participants struggled with the most cluttered screen: “very cluttered, didn't understand what to focus on”.", insight: "Competing information weakens how an intention is encoded.", opportunity: "Show one thought at a time and dim everything else.", source: "User-reported" },
        { evidence: "Colour became a task-level cue for 3 of 4 participants, but times and details faded.", insight: "A visual anchor carries the gist; text has to carry the detail.", opportunity: "Each thought is a distinct orb with a title, opening into context and a next step.", source: "User-reported" },
        { evidence: "Reddit posters described “list blindness” and called snoozing “the killer”.", insight: "A tool you have to remember to open has already failed.", opportunity: "Resurface a thought when it can be acted on, and treat “Not now” as “later, when I can”.", source: "Secondary research" },
    ],
    artifactsLabel: "From the research deck",
    artifacts: [
        { title: "Three methods", note: "A survey of 46 students, 18 interviews and an experiment with 4 participants.", image: local("pip/slide-07.jpg") },
        { title: "What participants told me", note: "Survey results and quotes from the open responses and interviews.", image: local("pip/slide-08.jpg") },
        { title: "Seven themes", note: "Synthesis of the survey and interviews into themes A to G.", image: local("pip/slide-09.jpg") },
        { title: "Three ways of losing a thought", note: "Archetypes: the multi-project juggler, the rapid ideator and the forgotten collector.", image: local("pip/slide-11.jpg") },
        { title: "Personas", note: "Three composites built from the research.", image: local("pip/slide-12.jpg") },
        { title: "Intention journey", note: "From an idea to action, and where it gets lost.", image: local("pip/slide-13.jpg") },
        { title: "Insights and opportunity areas", note: "Each insight paired with where a design could help.", image: local("pip/slide-14.jpg") },
        { title: "Six directions, Pip compared", note: "Concepts scored on evidence, capture effort, reminder load and ease of testing.", image: local("pip/slide-15.jpg") },
    ],

    usrHeading: "Eight design requirements",
    usrIntro: "The findings became requirements: one cue, not a list · a check-in, not an alarm · anchor to something in view · visual identity, gist first · capture in seconds · protect the middle · done or not now, without judgement · surface what students already trust.",
    perspectives: [],

    opHeading: "Six concepts, one carried forward",
    opIntro: "Pip was compared against five alternatives (Check-in Buddy, Colour Anchor, Park-it Pebble, Only the Middle and Study Pair) instead of being assumed. Pip went forward, with its cheapest non-AR twin as the baseline to test against.",
    hmw: [],
    prioLabel: "Why each part of Pip exists",
    features: [
        { feature: "A friend asking “Done or Not now?”", priority: "Must have", reasoning: "A person mentioning it cued 72%, and students asked for a check-in rather than an alarm." },
        { feature: "Each thought as a titled, glowing orb", priority: "Must have", reasoning: "A related object cued 83%, and colour anchored 3 of 4 participants." },
        { feature: "Thoughts orbit one at a time", priority: "Must have", reasoning: "Long lists caused anxiety; clutter weakened encoding." },
        { feature: "No streaks, no sad character", priority: "Must have", reasoning: "Companion apps make people feel guilty when a streak breaks." },
    ],
    deferred: "",

    flHeading: "How the experience is organised",
    flIntro: "Four parts: onboarding, capture and park, find and revisit, and Pip in AR. The scope lists 42 features across eight capabilities, from capture to resolve.",
    flSitemapLabel: "Experience architecture and user flow",
    flSitemap: local("pip/slide-17.jpg"),
    flows: [],

    exHeading: "Pip, and Pip Focus Mode",
    exIntro: "The first prototype (Three.js + WebXR) parks thoughts as orbs around Pip. Focus Mode, built with Meta's Immersive Web SDK, runs in passthrough AR on Meta Quest with hand tracking and moves from storing a thought to working on it.",
    screens: [
        { title: "Lo-fi wireframes", state: "Prototyped", need: "Test the structure before the visuals.", decision: "Capture, the orbit, the card and the AR check-in, sketched as mobile flows.", notes: "", image: local("pip/slide-19.jpg") },
        { title: "The final experience", state: "Prototyped", need: "From opening Pip to offloading a thought.", decision: "Deep-space visuals, purple glass panels, pink glowing orbs and a white astronaut.", notes: "", image: local("pip/slide-22.jpg") },
        { title: "Capture in seconds", state: "Prototyped", need: "Park a thought before it slips, without organising it.", decision: "Type a thought and press Park; context and a next step are optional.", notes: "", image: local("pip/capture.jpg") },
        { title: "Step into the space", state: "Prototyped", need: "Give thoughts a place in the room.", decision: "Pip appears about 85 cm in front of you with your thoughts orbiting as glowing orbs.", notes: "", image: local("pip/step-in.jpg") },
        { title: "The card brings it back", state: "Prototyped", need: "Remember why the thought mattered.", decision: "Point or pinch an orb to open its card: the thought, what you were doing and the smallest next step.", notes: "", image: local("pip/card.jpg") },
        { title: "Pip in passthrough AR", state: "Prototyped", need: "A companion that feels present, not another app.", decision: "Pip greets you, “Welcome back! Thoughts are orbiting me”, with Not yet and Show me.", notes: "", image: local("pip/ar-pip.jpg") },
        { title: "Drop an orb into the ring", state: "Prototyped", need: "Focus on one thing.", decision: "Grab an orb and drop it into the ring at Pip's chest; Pip, the other orbs and the sky dim.", notes: "", image: local("pip/ring.jpg") },
        { title: "The thinking board", state: "Prototyped", need: "Turn a thought into a first step.", decision: "Stickies, links, sub-tasks and Break Down on a glass board; every change saves to the thought.", notes: "", image: local("pip/board.jpg") },
        { title: "Done thoughts become stars", state: "Prototyped", need: "Finish without guilt.", decision: "Completed thoughts join a constellation; Undo instead of confirmation prompts.", notes: "", image: local("pip/stars.jpg") },
    ],
    details: [],
    dtIntro: "",

    evHeading: "What works today, and what's next",
    evProposed: "One thought at a time, everything else dimmed\nA check-in tone, with “Not now” always allowed\nScheduled resurfacing when a thought becomes relevant",
    evPrototyped: "Capture, parking, context and next step, completion\nHand tracking and controller selection\nFocus Mode with stickies, sub-tasks and Break Down\nResurfacing through browser notifications",
    evTested: "",
    evUnvalidated: "Whether an AR companion beats a well-worded notification\nWhether it keeps working once the novelty fades (about four weeks)\nHow a character feels in a shared room",
    rfHeading: "What I'd do next",
    rfALabel: "A longer study",
    rfA: "A six to eight week diary study comparing Pip in AR, Pip in 2D, a phone notification and a sticky note, measuring whether intentions were acted on at the right moment.",
    rfBLabel: "Smaller tests",
    rfB: "A one-week Wizard-of-Oz Check-in Buddy with five or six students, and a card sort of 20 recent intentions to see which tier really gets forgotten.",
    rfCLabel: "The prototype",
    rfC: "Voice capture, search, more than three active thoughts and surface placement in the web build.",
    rfNext: "",
    hiddenSections: "details",
}

/* ------------------------------ research walls (sticky notes in the research section) ------------------------------ */

dentigo.stickiesTitle = "Affinity mapping: what the research surfaced"
dentigo.stickies = [
    { label: "Clinic pain points", notes: ["Patients rescheduled because of lab delays and remakes", "Pickups don't happen on time", "Cases stall when the one lab contact is unavailable", "Shade or fit misunderstood → repeat work"] },
    { label: "Dentist workflow", notes: ["Different technicians for different restorations", "New dentists have no network of technicians", "Time-consuming chairside adjustments", "No standard way to track an order's progress"] },
    { label: "Vendors & supply", notes: ["Hidden costs and unclear pricing", "Unpredictable delivery schedules", "Poor communication about delays", "Materials bought through reps, expos and traders"] },
    { label: "Empathy maps: says", notes: ["“Dentists often send unclear instructions and rush orders.”", "“Matching shades and shapes without photos is difficult.”", "“Just tell my assistant to call the lab and ask where Mr. Singh's case is.”", "“Every remake costs me chair time and patient trust.”"] },
    { label: "Trust & transparency", notes: ["Clear vendor rates would help", "Ratings, reviews and quality checks for labs", "Cloud-based records", "No fixed procurement process"] },
]

encora.stickiesTitle = "Pain points and dot voting"
encora.stickies = [
    { label: "Pre-clinical phase", notes: ["Turning large datasets into clear hypotheses", "No integrated platform for visualisation and analysis", "Identifying and validating biomarkers", "Saving searches and sessions to come back to"] },
    { label: "Clinical phase", notes: ["Research, admin and collaboration all at once", "Integrating the latest scientific literature", "Summarising results and data outputs"] },
    { label: "Competitive gaps", notes: ["General graph tools miss semantic integration and curation", "No uploads or onboarding in several tools", "Few visual exports or notifications"] },
    { label: "Dot-voted features", notes: ["Data integration & unification", "Query search & filtering", "Compare knowledge graphs", "Timeline / history navigation", "Collaboration for scientific discussion", "AI insight mapping"] },
]

pip.stickiesTitle = "From the research wall"
pip.stickies = [
    { label: "Survey · n = 46", notes: ["93%: intentions slip anyway", "83% are reminded by seeing something related", "“i don't like 35,000 reminders also popping on my phone”", "“A long list gives me anxiety. Reduce it.”"] },
    { label: "Interviews", notes: ["Without her notebook it feels like she “lost one of my organs”", "“someone who is actually checking in, have you done it”", "“too many things going on, no time to write or jot down”", "Mid-importance tasks get “I'll do it later”"] },
    { label: "Experiment", notes: ["“very cluttered, didn't understand what to focus on”", "“visuals were the things which made me recall”", "Gist survives; times and details fade", "Colour became a task cue for 3 of 4"] },
    { label: "Reddit scan", notes: ["“List blindness”: forgetting the list exists", "Snoozing is “the killer”", "New tools stop working after a few weeks", "Sticky notes where you always look"] },
]

export const lumiStickies = {
    stickiesTitle: "Card sorting: the people around the mother",
    stickies: [
        { label: "Mother · Silent Struggler", notes: ["“Something is wrong… but I can't say it.”", "Minimises and feels dismissed", "Shares little, for fear of judgement", "Avoids or delays screening"] },
        { label: "Father · Hyper-Responsible Fixer", notes: ["“I need to fix this for her.”", "Wants to fix, can't express", "Observes changes, tries to understand"] },
        { label: "Family · Well-Meaning Minimizer", notes: ["“We've all gone through this. She'll be fine.”", "Believes this phase is temporary", "Shows indifference in behaviour"] },
        { label: "Themes", notes: ["Mothers hesitate to express distress", "Families miss emotional warning signs", "Emotional support often comes too late", "~80% get the baby blues; PPD doesn't go away on its own"] },
    ],
}

/* ------------------------------ Encora → KG Hub (renamed under NDA) ------------------------------ */

encora.title = "KG Hub"
encora.roleNote = "Encora Inc. · internship"
encora.ovHeadline = "KG Hub: from data to discovery, with biomedical visualisation powered by a knowledge graph."
encora.ovNote =
    "**This project has been modified due to an NDA.** The product is presented as KG Hub: proprietary names are changed, sensitive details are left out and some visuals are blurred. Happy to walk through the work at itsturiyajoshi11@gmail.com."
