// The detailed reflection for every case study: each gap the research found, what was designed for it, and how that closes it.
// Every gap, piece of evidence and feature here is one the page already records (research folders, briefs, What I did).
// Drawn by src/GapBridge.tsx at the top of the Reflection section.

export const gaps = {
    lumi: {
        statement: "Lumi set out to shorten the time between a mother struggling and someone around her noticing.",
        rows: [
            {
                gap: "Mothers recognise their symptoms and still stay quiet.",
                seen: "Fear of judgement and doubts about coping, in the interviews and the papers.",
                fix: "A check-in that takes a few taps, beside a private journal.",
                how: "She can name a feeling without being labelled. She gets validation instead of a diagnosis, and what she writes stays hers.",
            },
            {
                gap: "Families miss the warning signs, or call them normal.",
                seen: "Low mental-health literacy, and “this is normal, deal with it”.",
                fix: "A partner view with “What can I do?” and “What do I say?”, and a family guide to modern PPD.",
                how: "The people around her learn what distress looks like and get the words and actions to respond, so understanding comes before fixing.",
            },
            {
                gap: "Support arrives too late.",
                seen: "Screening leaves the family out and has no follow-up.",
                fix: "A pattern notice that points to people, not a condition, and “Should I seek help?”.",
                how: "When her check-ins show a pattern over days, her partner gets a gentle signal and the next step towards help is clear.",
            },
        ],
    },

    dentigo: {
        statement: "Dentigo set out to replace calls, paper slips and guesswork with one shared view of every case.",
        rows: [
            {
                gap: "Nobody can see where a case is.",
                seen: "Status is chased by phone, and manual tracking causes delays and follow-ups.",
                fix: "Tracking like a parcel: status, ETA and one-tap messaging for every active case.",
                how: "The clinic checks instead of calling, and the lab works from the same status.",
            },
            {
                gap: "Everything hangs on one contact at the lab.",
                seen: "When the main technician is away, the case stalls.",
                fix: "A dashboard of active orders and pending actions, with one chat thread per case.",
                how: "The conversation lives with the case, so it isn't stuck in one person's phone.",
            },
            {
                gap: "Finding a lab to trust is hard, especially for new dentists.",
                seen: "No network of technicians, and prices, ratings and specialities that are hard to compare.",
                fix: "Lab profiles with ratings, specialities and on-time rates, and quotes side by side.",
                how: "A dentist can choose a lab on evidence rather than word of mouth.",
            },
            {
                gap: "Small miscommunications turn into remakes.",
                seen: "Shade and fit details lost between calls, slips and emails.",
                fix: "A guided order form, and measurements and annotations on the scan before approval.",
                how: "Details are agreed on the scan before the lab starts, which is where remakes begin.",
            },
        ],
    },

    encora: {
        statement: "KG Hub set out to give researchers one place to see how their data connects, and why to believe it.",
        rows: [
            {
                gap: "Data sits in separate tools and gets stitched together by hand.",
                seen: "Diverse datasets that are hard to integrate, and disconnected data that slows decisions.",
                fix: "A plain-language question, answered as one graph.",
                how: "Genes, drugs, diseases and trial data come back connected in a single view.",
            },
            {
                gap: "A relation can't be trusted without checking where it came from.",
                seen: "Conflicting biomarker data, and regulators asking for documented provenance.",
                fix: "Sources on every relation, and paths traced hop by hop with their evidence.",
                how: "Doubt is settled where it starts, with no invented confidence scores.",
            },
            {
                gap: "Findings get lost between people.",
                seen: "Research, admin and collaboration all happening at once.",
                fix: "Saved insights that keep their graph and sources, with threaded comments and sharing by role.",
                how: "The team builds on one record instead of running the same query again.",
            },
        ],
        note: "In testing with 6 users on the internship prototypes, interpretation was about 30% faster and misreads about 20% fewer.",
    },

    pip: {
        statement: "Pip set out to close the gap between saving a thought and getting it back when you can act on it.",
        rows: [
            {
                gap: "Saving isn't recalling.",
                seen: "43 of 46 students say things slip their mind, even with systems.",
                fix: "Thoughts that come back one at a time, as orbs around Pip.",
                how: "Pip steps in at the moment of retrieval and points to one thing, instead of adding another list to check.",
            },
            {
                gap: "Reminders turn into noise.",
                seen: "“A long list gives me anxiety”, and snoozing called “the killer”.",
                fix: "Park a thought in seconds, then drop one orb into the ring while everything else dims.",
                how: "Only one thought asks for attention at a time, as a check-in rather than an alarm.",
            },
            {
                gap: "Thoughts lose their details.",
                seen: "The gist survives while times and details fade. A related object cues 38 of 46.",
                fix: "Orbs with a letter, a title and a colour, orbiting in your own room, and a glass board for the first step.",
                how: "The gist stays visible and anchored to where you are, and the board turns it into something to start on.",
            },
        ],
    },

    copilot: {
        statement: "The co-pilot set out to notice tiredness early and help without nagging.",
        rows: [
            {
                gap: "Warnings arrive late.",
                seen: "Near-misses come before any alert does.",
                fix: "State shown early and quietly, as heat rising from the edge of the screen.",
                how: "The driver sees it building before it's dangerous, without reading a word.",
            },
            {
                gap: "Alerts nag, then get switched off.",
                seen: "In 3 of 6 cars tested, the alerts were likely to be turned off.",
                fix: "Cues that escalate in steps, where the loudest one is rare.",
                how: "Each cue earns its attention, so there's less reason to silence the system.",
            },
            {
                gap: "Drivers don't trust what they can't read.",
                seen: "Drivers want help they can trust, not a scolding.",
                fix: "It says what it can and can't see, asks one question, and takes answers from keys on the wheel.",
                how: "The driver stays in control, and a rest stop becomes an easy yes. After parking, a heat map shows when alertness dipped.",
            },
        ],
    },

    doodleverse: {
        statement: "Doodleverse set out to make drawing in mixed reality easy for a first-timer, and worth it every time.",
        rows: [
            {
                gap: "Controllers and buttons are hard for young players.",
                seen: "Children's selection skills change with age, and controllers mean buttons to learn first.",
                fix: "Bare-hand touch and pinch, with chunky crayons on a board at table height.",
                how: "There's nothing to learn before drawing: point, touch and grab, like on paper.",
            },
            {
                gap: "Flat drawings give no payoff.",
                seen: "A drawing on a screen stays a drawing.",
                fix: "One wave of the wand, and the drawing wakes up as a 3D character in a meadow.",
                how: "Every drawing ends in a surprise to play with: throw the ball, and your doodle fetches it.",
            },
            {
                gap: "Around 12, many children decide they can't draw.",
                seen: "Lowenfeld and Brittain: children this age judge drawings by how realistic they look.",
                fix: "No fail state. Any doodle comes alive, and the eraser starts something new.",
                how: "How the drawing looks never decides whether it works, and the whole loop takes about 2.5 minutes.",
            },
        ],
    },

    "3tflow": {
        statement: "3TFlow set out to keep each ticket in one place, against one SLA clock everyone can see.",
        rows: [
            {
                gap: "Users can't tell where to ask, or which form to pick.",
                seen: "No single entry point, long forms and the wrong category.",
                fix: "Guided intake: “Broken? Need something? Question?” before the form, with drafts that save themselves.",
                how: "Tickets start in the right category, so fewer bounce between teams.",
            },
            {
                gap: "Agents lose 20–40 s per ticket, and everything feels urgent.",
                seen: "Context spread across the CRM, past tickets, emails and notes.",
                fix: "One queue routed by category and contract, with the SLA time left on every ticket.",
                how: "Urgency is read from the clock rather than from tags, and assigning a ticket went from 6 steps to 3.",
            },
            {
                gap: "SLAs are agreed over email and slip quietly.",
                seen: "Contracts in a separate module, and negotiation handled offline.",
                fix: "SLA tiers set by each client's contract, negotiated in the product, with reports and an audit log.",
                how: "Client and partner see the same terms and the same clock, and every change is recorded.",
            },
        ],
    },
}
