// Research methods for every case study (drawn by src/ResearchMethods.tsx).
// Every method, count and finding here is one the project's own research already records (briefs.mjs, content.mjs,
// research-*.mjs and the 3TFlow deck). Where a sample size was never recorded, no number is given.
// x: 0 qualitative … 1 quantitative · y: 0 attitudinal (what people say) … 1 behavioural (what people do)

export const methods = {
    lumi: {
        statement: "I listened to families and doctors, read the papers, and narrowed it all down to one problem.",
        used: [
            { name: "Interviews with mothers, fathers and caregivers", src: "Primary", kind: "Qualitative", asked: "How does a family notice distress after a birth, and where does it get missed?", x: 0.14, y: 0.24 },
            { name: "Conversations with doctors and psychiatrists", src: "Primary", kind: "Qualitative", asked: "What do clinicians see that families don't, and where does screening fall short?", x: 0.24, y: 0.12 },
            { name: "Literature review", src: "Secondary", kind: "Mixed", n: "Papers on postpartum mental health, screening frameworks and PPD data", asked: "How common is it, what protects against it, and why do mothers still not seek help?", x: 0.62, y: 0.4 },
            { name: "Competitive analysis", src: "Secondary", kind: "Qualitative", asked: "What does a family fall back on today, and where does each option fall short?", x: 0.36, y: 0.6 },
        ],
        forage: [
            { step: "Collect", did: "Interview notes, clinicians' input and findings from the papers, kept as raw quotes and facts.", out: "One pool of evidence from three sources" },
            { step: "Split by role and stage", did: "Pain points sorted for the mother, the partner and the in-laws, and along the weeks after birth.", out: "Pain points by role and by journey stage" },
            { step: "Card sort", did: "Findings grouped and regrouped until the clusters held.", out: "Four clusters: symptoms, screening, system, family" },
        ],
        sense: [
            { step: "Journey map", did: "Actions and emotion curves for three roles side by side.", out: "Emotional support often comes too late" },
            { step: "System map and loops", did: "Who shapes a mother's recovery at home, with three causal loops.", out: "The silence spiral, and where Lumi steps in" },
            { step: "Insight and problem statement", did: "Three themes carried into design, written as one problem.", out: "Missing at home: emotional understanding" },
            { step: "Personas and storyboard", did: "Neha, Rohan, Sarita and Mohan, then six panels of the concept.", out: "A check-in that notices patterns and signals the partner" },
        ],
        chain: {
            saw: "Mothers may recognise their symptoms and still not seek help, and families often treat suffering as normal.",
            means: "What's missing at home is emotional understanding, so distress goes unnoticed.",
            could: "Reduce the gap between noticing and acting, for the mother and the people around her.",
            did: "A gentle daily check-in that notices a pattern over days and sends the partner a quiet signal.",
        },
    },

    dentigo: {
        statement: "I followed one crown from the clinic to the lab and back.",
        used: [
            { name: "User interviews with dentists and lab technicians", src: "Primary", kind: "Qualitative", asked: "How does a case move between clinic and lab, and where does it stall?", x: 0.14, y: 0.26 },
            { name: "Surveys", src: "Primary", kind: "Quantitative", asked: "How widespread are delays, remakes and unclear pricing?", x: 0.82, y: 0.18 },
            { name: "Desk research", src: "Secondary", kind: "Mixed", asked: "How do clinics and labs work today, and what do cloud tools change?", x: 0.6, y: 0.46 },
            { name: "Competitive analysis", src: "Secondary", kind: "Qualitative", asked: "What do clinics rely on for orders today, and where does it fall short?", x: 0.34, y: 0.62 },
        ],
        forage: [
            { step: "Collect", did: "Interview notes, survey answers and desk findings in one place.", out: "Raw notes from both sides of the order" },
            { step: "Empathy maps", did: "What dentists and technicians say, think, feel and do.", out: "Say, think, feel and do, for each side" },
            { step: "Affinity map", did: "Notes clustered bottom-up, then named.", out: "In the clinic · between people · vendors and supply" },
        ],
        sense: [
            { step: "Pain points", did: "The clusters read as the problems that stall a case.", out: "Three biggest problems, led by no single source of case status" },
            { step: "Journey and system map", did: "Dr. Pooja's day, and who touches a single crown, with four causal loops.", out: "The remake loop, and status chasing" },
            { step: "Insight and HMW", did: "One insight, then How Might We questions for the clinic and the lab.", out: "Small miscommunications turn into remakes and delays" },
            { step: "MoSCoW", did: "Ideas sorted into must, should, could and won't for the first version.", out: "Four must-haves: dashboard, case chat, lab comparison, invoicing" },
        ],
        chain: {
            saw: "Orders run on calls, paper slips and emails, and case status is chased by phone.",
            means: "Clinics and labs run on fragmented, manual workflows, so small miscommunications become remakes.",
            could: "Make tracking a case as simple as tracking a parcel.",
            did: "A dashboard with live case status and one chat thread per case, shared by the clinic and the lab.",
        },
    },

    encora: {
        statement: "I had to learn a research field from scratch, then check the design with the people who work in it.",
        used: [
            { name: "Literature review", src: "Secondary", kind: "Qualitative", n: "Academic papers and research articles", asked: "How do clinical researchers and translational scientists work with data?", x: 0.32, y: 0.36 },
            { name: "Online data mining", src: "Secondary", kind: "Mixed", n: "Websites, blogs and social media", asked: "What do researchers complain about, and what is changing in the field?", x: 0.62, y: 0.44 },
            { name: "Competitive analysis", src: "Secondary", kind: "Qualitative", n: "10 platforms", asked: "What do knowledge-graph tools already do, and what do they leave out?", x: 0.3, y: 0.62 },
            { name: "Dot voting", src: "Primary", kind: "Quantitative", n: "Interns, a UX designer, a PM and a domain expert", asked: "Which features should come first?", x: 0.78, y: 0.12 },
            { name: "Usability testing", src: "Primary", kind: "Mixed", n: "6 users", asked: "Do the visualisations make the data faster and safer to read?", x: 0.44, y: 0.86 },
        ],
        forage: [
            { step: "Collect", did: "Papers, online sources and ten platforms reviewed side by side.", out: "Ten platforms compared" },
            { step: "Trend scan", did: "Where AI, regulation and data sources are pushing the field.", out: "Six trends, each with what KG Hub does about it" },
            { step: "Personas and journeys", did: "Two roles mapped through the pre-clinical and clinical phases.", out: "Pain points consolidated by phase" },
        ],
        sense: [
            { step: "Insight", did: "The pain points boiled down to one sentence.", out: "The data exists, but nothing shows how it connects" },
            { step: "System map and loops", did: "How entities, sources and the team connect, with three causal loops.", out: "Evidence has to sit at the question" },
            { step: "Dot voting", did: "Candidate features voted on by the team.", out: "Three core features: query, compare graphs, collaborate" },
            { step: "Test and present", did: "Five visualisation concepts across four data types tested with 6 users, then shown to 10+ stakeholders.", out: "~30% faster interpretation, ~20% fewer misreads" },
        ],
        chain: {
            saw: "Datasets are diverse and hard to integrate, and disconnected data slows go/no-go decisions.",
            means: "Researchers have the data, but no single place to see how it connects.",
            could: "Put the sources on every relation, and let teams compare two graphs directly.",
            did: "Compare graphs, with source counts on each relation. In testing, interpretation was about 30% faster.",
        },
    },

    pip: {
        statement: "First I measured forgetting. Then I looked for the moment to step in.",
        used: [
            { name: "Survey", src: "Primary", kind: "Quantitative", n: "46 college students in India, aged 18–25", asked: "How often do intentions slip, and what brings them back?", x: 0.84, y: 0.2 },
            { name: "Semi-structured interviews", src: "Primary", kind: "Qualitative", n: "18 interviews", asked: "How do students remember today, and where does it break?", x: 0.14, y: 0.26 },
            { name: "Recall experiment", src: "Primary", kind: "Mixed", n: "4 participants, four task flows", asked: "Does visual clutter while encoding change what is recalled later?", x: 0.6, y: 0.86 },
            { name: "Literature review", src: "Secondary", kind: "Quantitative", n: "Prospective memory and offloading studies", asked: "What does the science say about reminders, cues and interruptions?", x: 0.72, y: 0.52 },
            { name: "Online community scan", src: "Secondary", kind: "Qualitative", n: "8 Reddit threads", asked: "What do people say about their own tools when nobody asks?", x: 0.2, y: 0.5 },
        ],
        forage: [
            { step: "Collect", did: "Survey answers, interview notes, experiment recall and quotes from the threads.", out: "Numbers and words for the same problem" },
            { step: "Count", did: "Survey answers tallied, so every claim has an n of 46.", out: "43 of 46 say things slip their mind" },
            { step: "Affinity map", did: "Quotes and observations grouped across all four sources.", out: "Seven themes, A to G" },
        ],
        sense: [
            { step: "Insights", did: "Each theme written as observed, what it means and the opportunity.", out: "Saving is not recalling" },
            { step: "Requirements", did: "The insights turned into rules a design must follow.", out: "Eight requirements, starting with one cue, not a list" },
            { step: "Concept comparison", did: "Six directions scored on the right moment, reminder load and how easy they are to test.", out: "Pip went forward, with its cheapest non-AR twin as the baseline" },
            { step: "System map and loops", did: "Where a thought goes, with three causal loops.", out: "Badly timed reminders get swiped away" },
        ],
        chain: {
            saw: "43 of 46 students say things slip their mind even with systems, and a related object brings an intention back for 38 of 46.",
            means: "Retrieval, not storage, is the gap. The gist survives; the details fade.",
            could: "Act at the moment of retrieval, and point to one thing anchored to something in view.",
            did: "Orbs with a letter and a short title that resurface one thought at a time, in mixed reality.",
        },
    },

    copilot: {
        statement: "I built the case from crash data, the rules and drivers' own words.",
        used: [
            { name: "Crash and fatigue data", src: "Secondary", kind: "Quantitative", n: "AAA, via arXiv", asked: "How big is the problem?", x: 0.86, y: 0.62 },
            { name: "Standards and regulation review", src: "Secondary", kind: "Qualitative", n: "EU safety rules, US glance guidelines, Euro NCAP 2026", asked: "What must a driver-monitoring system do, and what will be scored?", x: 0.42, y: 0.36 },
            { name: "Human factors literature", src: "Secondary", kind: "Mixed", n: "Glance limits, ambient displays, grip and reach", asked: "How much attention can a warning take from the road?", x: 0.66, y: 0.78 },
            { name: "Public driver discussions", src: "Secondary", kind: "Qualitative", n: "13 posts, quoted as written", asked: "How do drivers fight tiredness, and how do they feel about alerts?", x: 0.14, y: 0.3 },
            { name: "Competitive analysis", src: "Secondary", kind: "Qualitative", n: "Tesla, GM Super Cruise, Ford BlueCruise", asked: "How does driver monitoring work today, and where does it stop?", x: 0.3, y: 0.6 },
        ],
        forage: [
            { step: "Collect", did: "Figures, rules, human-factors limits and driver posts in one table.", out: "Six numbers that shaped the concept" },
            { step: "Code the posts", did: "Driver posts grouped by what they say about tiredness, alerts and trust.", out: "Three themes, starting with drivers fighting sleep alone" },
            { step: "Pair problems with evidence", did: "Each problem paired with the figure or post behind it.", out: "Five problems, each with its evidence" },
        ],
        sense: [
            { step: "Problem to design move", did: "Each problem answered with one move and how it works.", out: "Five problems, five design moves" },
            { step: "How Might We", did: "Questions grouped into sense and adapt, earn trust, and stay out of the way.", out: "Keep camera and body data in the car" },
            { step: "Gap map", did: "Competitors placed by what they sense and how they warn.", out: "Nobody yet senses state and warns calmly" },
            { step: "Decisions and trade-offs", did: "Each decision written with its reason and what it costs.", out: "Step up slowly; the loudest cue is rare" },
        ],
        chain: {
            saw: "Near-misses come before any alert does, and in 3 of 6 cars tested the alerts were likely to be switched off.",
            means: "Fatigue is spotted late, and alerts that nag get turned off.",
            could: "Show the driver's state early and quietly, and step up only when it matters.",
            did: "Colour at the edge of vision first; a wheel pulse, voice and a rest-stop offer only at peak fatigue.",
        },
    },

    doodleverse: {
        statement: "Published research on children, drawing and VR set the rules for this game.",
        used: [
            { name: "Child development literature", src: "Secondary", kind: "Qualitative", n: "Lowenfeld & Brittain; Ryan & Deci (2000)", asked: "How do children around 12 feel about their drawings, and what keeps them motivated?", x: 0.28, y: 0.3 },
            { name: "Children and XR research", src: "Secondary", kind: "Mixed", n: "Radu (2016); Stanford VHIL studies", asked: "How do children select, move and respond to characters in AR and VR?", x: 0.58, y: 0.72 },
            { name: "Safety and age guidance", src: "Secondary", kind: "Qualitative", n: "Meta policy, Common Sense Media", asked: "What age, session length and setting are safe?", x: 0.46, y: 0.48 },
            { name: "Competitive analysis", src: "Secondary", kind: "Qualitative", n: "2D drawing apps, VR painting apps", asked: "Where does a child's drawing usually live, and what does it turn into?", x: 0.22, y: 0.64 },
        ],
        forage: [
            { step: "Collect", did: "Eight sources on child development, XR use and VR safety.", out: "What each source says" },
            { step: "Extract", did: "Every finding paired with what it means for the design.", out: "A finding-to-decision table" },
            { step: "Pain points and needs", did: "The findings turned into the target player's pains.", out: "Three pain points, three needs" },
        ],
        sense: [
            { step: "How Might We", did: "One question for the whole experience.", out: "Create, meet and touch your own 3D drawing" },
            { step: "Principles", did: "The needs condensed into rules every screen follows.", out: "Bare-hand input · instant magic · no fail state" },
            { step: "System map and loops", did: "States, the room and the people around the player, with three causal loops.", out: "Fear of getting it wrong, and how the magic pays off" },
            { step: "Decisions", did: "Each build decision written with its reason.", out: "The whole loop takes about 2.5 minutes" },
        ],
        chain: {
            saw: "Around ages 11 to 14, children judge drawings by how realistic they look, and many decide they can't draw.",
            means: "A drawing that looks “wrong” ends the fun before it starts.",
            could: "Take away the fail state.",
            did: "Any doodle comes alive as a 3D character, however it looks, and the room becomes its meadow.",
        },
    },

    "3tflow": {
        statement: "I learnt the domain first, then turned it into rules the product could run on.",
        used: [
            { name: "ITIL and vendor documentation", src: "Secondary", kind: "Qualitative", n: "ITIL guides, ServiceNow and Zendesk docs", asked: "What are tickets, SLAs and escalations, in the industry's own words?", x: 0.3, y: 0.42 },
            { name: "Competitive audit", src: "Secondary", kind: "Qualitative", n: "6 ITSM and MSP tools, public information", asked: "What is table stakes, and where is the market weak?", x: 0.36, y: 0.64 },
            { name: "Market desk research", src: "Secondary", kind: "Quantitative", n: "Freshworks, Zendesk, Atlassian surveys; Gloria Mark", asked: "How much does tool sprawl and repetition cost support teams?", x: 0.84, y: 0.38 },
            { name: "Audit of the old “Create Task” form", src: "Primary", kind: "Qualitative", asked: "Where does the current tool fail the person filling it in?", x: 0.22, y: 0.82 },
            { name: "Stakeholder sessions", src: "Primary", kind: "Qualitative", n: "Product owner and developers, every sprint", asked: "What does the business need, and what can be built?", x: 0.12, y: 0.18 },
            { name: "Support admins' and clients' workflows", src: "Primary", kind: "Qualitative", asked: "How do SLAs, contracts, licences and timesheets really work?", x: 0.18, y: 0.6 },
            { name: "Sprint reviews", src: "Primary", kind: "Qualitative", n: "Product owner, a developer, my mentor and a user", asked: "Does the flow make sense before it reaches hi-fi?", x: 0.4, y: 0.88 },
        ],
        forage: [
            { step: "Learn the domain", did: "ITIL vocabulary first: ticket types, SLA and OLA, the lifecycle, escalation.", out: "3 ticket types · SLA vs OLA · one lifecycle" },
            { step: "Map how support works today", did: "A swimlane of the four roles, from setting up a client to closing a ticket.", out: "Six points where it breaks" },
            { step: "Audit the market", did: "Nine capabilities rated across six tools and 3TFlow.", out: "The open lane: partners serving many clients on contracts" },
        ],
        sense: [
            { step: "Pain points by role", did: "Everything sorted under the four roles who feel it.", out: "17 pain points across 4 roles" },
            { step: "Journey map", did: "Aarav's shift in six stages, with feelings and opportunities.", out: "The agent is overloaded before the real work starts" },
            { step: "Problem statement and HMW", did: "One problem statement, then How Might We questions per role.", out: "70+ HMWs written" },
            { step: "Ideas and rules", did: "Six ideas, one principle, and the business rules each screen encodes.", out: "Suggest, don't decide · 6 business decisions shipped" },
        ],
        chain: {
            saw: "Agents lose 20–40 s per ticket gathering context from the CRM, past tickets, emails and notes.",
            means: "Fragmented context and reactive prioritisation overload the agent before the real work starts.",
            could: "Put the context in one place, and tell high priority from high impact.",
            did: "One queue routed by category and contract, with the SLA time left on every ticket.",
        },
    },
}
