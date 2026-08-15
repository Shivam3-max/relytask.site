import type { ServiceDetail } from "../service-detail";

export const OUTREACH_DETAILS: ServiceDetail[] = [
  // ── 01 ────────────────────────────────────────────────────────
  {
    slug: "icp-research",
    pillar: "outreach",
    title: "ICP & Market Research",
    summary: "Deciding precisely who to go after, before spending a rupee chasing them.",
    lede:
      "Almost every failed outbound programme fails at the list, not the copy. If the ideal customer profile is 'B2B companies in India', no amount of clever sequencing will save it. The research phase is where outbound is won — it is also the phase everyone skips because it produces no sends.",
    pain: [
      {
        title: "Your ICP is a description, not a filter",
        body:
          "'Mid-sized manufacturers who care about quality' cannot be turned into a search. A usable ICP is a set of filters — headcount, geography, tech stack, trigger events — that returns an actual list of companies.",
      },
      {
        title: "You are selling to the wrong seat",
        body:
          "The person who feels the pain, the person who owns the budget and the person who blocks the deal are frequently three different people. Sequences written to only one of them stall in month two.",
      },
      {
        title: "Nobody has asked why the wins actually closed",
        body:
          "The pattern in your best twenty customers is sitting in your own CRM, and almost nobody mines it before buying a new data tool.",
      },
    ],
    approach: [
      {
        title: "Mine the wins you already have",
        body:
          "We work backwards from your closed-won accounts: what they had in common, what triggered the purchase, who signed, and how long it took. Your own history is the best data you will buy this year.",
      },
      {
        title: "Turn the profile into filters",
        body:
          "Industry codes, headcount bands, revenue proxies, location, hiring signals, technologies in use. Everything expressed as something a database can actually return.",
      },
      {
        title: "Map the buying committee",
        body:
          "Champion, economic buyer, blocker and end user — named by title, with the message each one needs to hear and the objection each one raises.",
      },
      {
        title: "Size the market honestly",
        body:
          "How many accounts genuinely match, not a total-addressable-market slide. If the real number is 400 companies, the programme should be built for 400 companies, not for a scale it will never reach.",
      },
      {
        title: "Define the triggers worth waiting for",
        body:
          "Funding, hiring, expansion, leadership change, new compliance requirement. Timing is the difference between a cold email and a well-timed one.",
      },
    ],
    deliverables: [
      "Closed-won analysis from your existing CRM or records",
      "Written ICP with database-ready filters",
      "Buying-committee map with titles and objections",
      "Realistic account count by segment",
      "Trigger-event list with monitoring sources",
      "Segment-level messaging angles",
      "Disqualification criteria — who we will not contact",
      "Prioritised tier list: A, B and C accounts",
    ],
    different: [
      {
        title: "We write the disqualification rules too",
        body:
          "Knowing who to leave out is what keeps a list clean and a reply rate honest. It is also the part that saves the most money.",
      },
      {
        title: "Research is billed once, not embedded forever",
        body:
          "This is a defined piece of work with a deliverable you keep, whether or not you run the campaigns with us.",
      },
      {
        title: "We size it before you commit",
        body:
          "If the addressable list is too small for outbound to work, we would rather tell you at the research stage than take a twelve-month retainer.",
      },
    ],
    signals: [
      { label: "Typical research window", value: "2–3 weeks" },
      { label: "Inputs used", value: "Your CRM, calls, market data" },
      { label: "Output", value: "Filters, not adjectives" },
      { label: "Reviewed", value: "Quarterly, against what closed" },
    ],
    faqs: [
      {
        q: "We already know who our customers are. Do we need this?",
        a: "You may well know. The question is whether it is written down as something a database can execute, and whether it matches what actually closed rather than who you enjoy selling to. The gap between those two is where most outbound budget disappears.",
      },
      {
        q: "What if we have no CRM history to analyse?",
        a: "Then we build the profile from interviews with your sales and delivery teams, plus competitor and market research, and treat the first outbound cohort as a deliberate learning exercise with a smaller list.",
      },
      {
        q: "Can you research a market we haven't entered yet?",
        a: "Yes — that is one of the more useful versions of this work. We size the segment, map the committee and test messaging on a small cohort before you commit to hiring or a full programme.",
      },
    ],
    cta: {
      headline: "Get the list right before you send anything.",
      body:
        "We'll analyse your best accounts and come back with an ICP you can actually run a search on.",
    },
    related: ["database-building", "cold-email", "meeting-booking", "pipeline-reporting"],
    sources: [],
  },

  // ── 02 ────────────────────────────────────────────────────────
  {
    slug: "database-building",
    pillar: "outreach",
    title: "Database Building",
    summary: "Built lists, not bought ones — assembled from Apollo, Lusha, Fetcher and manual research.",
    lede:
      "There is a difference between a list you bought and a list you built. Bought lists are stale, shared with your competitors, and full of people who left two years ago. Built lists are assembled against your filters, enriched from several sources, checked by a person, and refreshed on a schedule.",
    pain: [
      {
        title: "Contact data goes stale faster than you replace it",
        body:
          "A list bought in January is materially wrong by December. Job changes alone rewrite a large share of it, and nothing about your campaign will tell you which rows went bad.",
        stat: {
          value: "22.5%",
          note: "of B2B contact data decays every year — around 23% of email addresses go bad annually",
          source: "cleanlist",
        },
      },
      {
        title: "Reps burn their week working around bad rows",
        body:
          "Wrong numbers, bounced addresses, and researching people who have already left. It is invisible on a dashboard and enormous in hours.",
        stat: {
          value: "27.3%",
          note: "of a rep's working week lost to admin caused by inaccurate contact data",
          source: "cleanlist",
        },
      },
      {
        title: "One tool, one view, big gaps",
        body:
          "Every provider has blind spots, and they are worst in exactly the Indian mid-market segments most of our clients sell into. A single-source list quietly omits a third of the market.",
      },
    ],
    approach: [
      {
        title: "Build the account list first",
        body:
          "Companies before contacts. We assemble and dedupe the account universe against your ICP filters, then decide who inside each account matters.",
      },
      {
        title: "Enrich from several sources",
        body:
          "Apollo, Lusha, Fetcher and public sources cross-referenced, because coverage differs sharply by segment and geography. Conflicts are resolved, not averaged.",
      },
      {
        title: "Human checking on the tier that matters",
        body:
          "For A-tier accounts, a person confirms the role is current and the company still fits. Automation gets you 80% — the last 20% is where the meetings are.",
      },
      {
        title: "Structure it so it stays usable",
        body:
          "Consistent field naming, source tracking per row, a last-verified date, and clean segmentation. A list you cannot audit is a list you will re-buy.",
      },
      {
        title: "Refresh on a cycle",
        body:
          "Standing re-verification so decay is caught continuously instead of discovered by a bounce spike halfway through a campaign.",
      },
    ],
    deliverables: [
      "Deduplicated account universe against your ICP",
      "Contacts mapped to the buying committee per account",
      "Multi-source enrichment with conflict resolution",
      "Manual verification of A-tier records",
      "Source and last-verified date stamped per row",
      "Clean segmentation and tiering",
      "CRM-ready import, or direct write into your CRM",
      "Scheduled refresh cycle",
    ],
    different: [
      {
        title: "Every row carries its provenance",
        body:
          "You can see where a record came from and when it was last checked. That is what lets you trust the list a year later — or know precisely which part to redo.",
      },
      {
        title: "We build to your filters, not from a catalogue",
        body:
          "No resold list that four competitors are already mailing. It is assembled for your ICP and it is yours.",
      },
      {
        title: "The list is yours to keep",
        body:
          "Exportable, documented, with no dependency on us. If you stop working with us the asset does not evaporate.",
      },
    ],
    signals: [
      { label: "Annual B2B data decay", value: "22.5%", source: "cleanlist" },
      { label: "Job-title change rate", value: "65.8% annually", source: "cleanlist" },
      { label: "Manual verification", value: "100% of A-tier records" },
      { label: "Refresh cadence", value: "Quarterly, or monthly at volume" },
    ],
    faqs: [
      {
        q: "Why not just buy a list?",
        a: "Because you are buying someone else's staleness, and usually sharing it with your competitors. A built list costs more up front and produces materially better deliverability and reply rates — which is where the money actually is.",
      },
      {
        q: "Is this compliant?",
        a: "We build from business contact data and legitimate business-interest outreach, with suppression lists, honoured opt-outs and clear identification in every message. For EU or UK targets we apply the stricter standard by default.",
      },
      {
        q: "How big should the list be?",
        a: "Smaller than instinct suggests. A tightly-filtered 800-account list with real personalisation reliably beats 8,000 generic rows — and it will not wreck your sending domains on the way.",
      },
    ],
    cta: {
      headline: "Get a list worth sending to.",
      body:
        "Give us your ICP filters and we'll build, enrich and verify the first segment so you can judge the quality yourself.",
    },
    related: ["icp-research", "list-verification", "cold-email", "linkedin-outreach"],
    sources: ["cleanlist", "landbase"],
  },

  // ── 03 ────────────────────────────────────────────────────────
  {
    slug: "list-verification",
    pillar: "outreach",
    title: "List Verification",
    summary: "Clean data and low bounce rates — the thing that keeps your domain alive.",
    lede:
      "Verification is not housekeeping. Bounce rate is a signal mailbox providers use to decide whether your domain deserves the inbox, and a single unverified campaign can undo months of careful warming. It is the cheapest insurance in outbound and the most commonly skipped.",
    pain: [
      {
        title: "One bad send damages every future send",
        body:
          "Providers read a bounce spike as a sign you are mailing a purchased or stale list. The penalty lands on the domain, not the campaign, and it outlives the mistake.",
        stat: {
          value: "2%",
          note: "sustained hard-bounce rate is treated as grounds for delivery deferral and domain-level blocking",
          source: "emailaddress",
        },
      },
      {
        title: "Catch-all domains hide the problem",
        body:
          "Catch-all servers accept everything, so a verifier returns 'valid' and the mail still goes nowhere. Treating catch-alls as clean is how a list passes verification and fails anyway.",
      },
      {
        title: "Verified once, then left to rot",
        body:
          "Lists are checked at import and never again. With decay running continuously, a list verified in March is a liability by September.",
        stat: {
          value: "~3.6%",
          note: "monthly email decay observed on B2B contact data",
          source: "landbase",
        },
      },
    ],
    approach: [
      {
        title: "Syntax, domain and MX checks first",
        body:
          "The cheap eliminations before anything expensive runs: malformed addresses, dead domains, missing mail records.",
      },
      {
        title: "SMTP validation with a second opinion",
        body:
          "Mailbox-level checks run through more than one provider, because verifiers disagree more often than their marketing suggests.",
      },
      {
        title: "Catch-alls segmented, never assumed",
        body:
          "Catch-all domains are separated into their own risk tier and sent to at low volume from a dedicated pool, so an unknown never threatens your main sending domains.",
      },
      {
        title: "Role, spam-trap and suppression filtering",
        body:
          "info@, sales@, known trap patterns, previously bounced records, unsubscribes and current customers all stripped before a campaign starts.",
      },
      {
        title: "Re-verify on a schedule",
        body:
          "Standing re-checks before each cycle, so decay is caught before it becomes a bounce rate.",
      },
    ],
    deliverables: [
      "Full syntax, domain and MX validation",
      "Multi-provider SMTP verification",
      "Catch-all identification and risk tiering",
      "Role-account and spam-trap removal",
      "Suppression list build and enforcement",
      "Duplicate detection across accounts and domains",
      "Verification report with expected bounce rate before you send",
      "Scheduled re-verification cycle",
    ],
    different: [
      {
        title: "We forecast the bounce rate before the send",
        body:
          "You get an expected bounce figure with the cleaned file. If it is above target we fix the list rather than launching and hoping.",
      },
      {
        title: "Catch-alls get their own infrastructure",
        body:
          "They are never mixed into your primary sending pool. This one decision prevents most avoidable domain damage.",
      },
      {
        title: "Suppression is enforced, not filed",
        body:
          "Opt-outs, current customers and live opportunities are blocked at the sending layer. Nobody gets prospected by us while your AE is closing them.",
      },
    ],
    signals: [
      { label: "Acceptable hard bounce, B2B", value: "under 0.5%", source: "emailaddress" },
      { label: "Caution range", value: "0.5–2%", source: "emailaddress" },
      { label: "Good cold-email bounce rate", value: "under 3%; best-in-class under 1.5%", source: "amplemarket" },
      { label: "Our pre-send target", value: "under 1.5%" },
    ],
    faqs: [
      {
        q: "Isn't verification built into our sending tool?",
        a: "Most tools do a basic syntax and domain check. That catches obvious errors and misses catch-alls, traps and role accounts — which are the ones that actually hurt you.",
      },
      {
        q: "Should we ever mail catch-all domains?",
        a: "Sometimes, carefully. Plenty of legitimate mid-market Indian companies run catch-all servers, so excluding them entirely can remove a chunk of your market. We mail them at low volume from separate infrastructure and watch engagement closely.",
      },
      {
        q: "How often should a list be re-verified?",
        a: "Before every campaign cycle, and no less than quarterly for a list in active use. With decay compounding monthly, anything slower means you are sending to records you already know are questionable.",
      },
    ],
    cta: {
      headline: "Check the list before it costs you a domain.",
      body:
        "Send us a sample. We'll verify it, forecast the bounce rate, and show you what would have failed.",
    },
    related: ["database-building", "email-infrastructure", "cold-email", "icp-research"],
    sources: ["emailaddress", "landbase", "amplemarket", "cleanlist"],
  },

  // ── 04 ────────────────────────────────────────────────────────
  {
    slug: "email-infrastructure",
    pillar: "outreach",
    title: "Email Infrastructure",
    summary: "Domains, authentication, warmup and deliverability — the part nobody sees until it breaks.",
    lede:
      "You can write the best cold email in your category and never find out, because it landed in spam. Infrastructure is what decides whether a campaign gets a hearing: separate domains, correct authentication, patient warmup, and volume discipline. It is unglamorous, it takes weeks, and it is the highest-leverage work in outbound.",
    pain: [
      {
        title: "Sending from your primary domain",
        body:
          "Cold outreach from the same domain as your invoices and support mail puts the entire company's email at risk. When reputation goes, it takes the mail your business runs on with it.",
      },
      {
        title: "No warmup, so nothing lands",
        body:
          "A brand-new domain sending campaign volume on day one is the clearest spam pattern there is. The difference between a warmed domain and a cold one is not marginal.",
        stat: {
          value: "87% vs 12%",
          note: "inbox placement for a properly warmed domain versus a new domain with no warmup",
          source: "instantly",
        },
      },
      {
        title: "Authentication is half-configured",
        body:
          "SPF present, DKIM missing, DMARC on p=none and nobody reading the reports. Google, Yahoo and Microsoft now enforce this, and partial compliance is treated as non-compliance.",
        stat: {
          value: "22–34%",
          note: "of non-compliant senders' mail routed to spam, against 89% inbox placement for compliant senders",
          source: "powerdmarc",
        },
      },
    ],
    approach: [
      {
        title: "Separate sending domains",
        body:
          "Lookalike domains dedicated to outbound, isolated from your corporate mail. If something goes wrong, it stays contained.",
      },
      {
        title: "Authentication done completely",
        body:
          "SPF, DKIM and DMARC configured, aligned and monitored — with DMARC actually progressing to enforcement rather than sitting on p=none forever.",
      },
      {
        title: "Warm properly, then ramp slowly",
        body:
          "Two to four weeks of warmup per mailbox, then a controlled ramp with per-mailbox daily caps. Volume comes from more mailboxes, never from pushing one harder.",
      },
      {
        title: "Compliance built in",
        body:
          "One-click unsubscribe headers, honoured within the required window, physical identification in the footer, and complaint-rate monitoring against the 0.3% ceiling.",
      },
      {
        title: "Monitor and rotate",
        body:
          "Blocklist checks, placement testing, engagement tracking per mailbox. Mailboxes that degrade are rested and replaced before they drag the pool down.",
      },
    ],
    deliverables: [
      "Sending domain strategy and registration",
      "SPF, DKIM and DMARC configuration with alignment testing",
      "DMARC monitoring and progression to enforcement",
      "Mailbox provisioning and 2–4 week warmup",
      "Per-mailbox volume caps and ramp schedule",
      "One-click unsubscribe and RFC 8058 compliance",
      "Blocklist and inbox-placement monitoring",
      "Mailbox rotation and replacement as reputation shifts",
    ],
    different: [
      {
        title: "We will not let you send early",
        body:
          "Warmup is not negotiable, even when the quarter is ending. Skipping it costs more than the campaign was worth, and we would rather have that argument in week one.",
      },
      {
        title: "Your primary domain is never used",
        body:
          "Outbound runs on isolated infrastructure. Your invoices keep landing regardless of how a campaign performs.",
      },
      {
        title: "Placement is monitored continuously",
        body:
          "We test where mail is actually landing rather than assuming delivery equals inbox. Delivered and read are very different numbers.",
      },
    ],
    signals: [
      { label: "Spam complaint ceiling", value: "0.3% enforced; target under 0.1%", source: "lacleo" },
      { label: "Bulk sender rules apply from", value: "5,000 emails/day per domain", source: "redsift" },
      { label: "Warmup period per mailbox", value: "2–4 weeks" },
      { label: "Unsubscribe honoured within", value: "2 days, per provider rules", source: "powerdmarc" },
    ],
    faqs: [
      {
        q: "How long before we can send at volume?",
        a: "Three to five weeks from a standing start: domain registration and DNS propagation, then two to four weeks of warmup, then a controlled ramp. Anyone offering same-week volume is setting your domains on fire.",
      },
      {
        q: "How many mailboxes do we need?",
        a: "Work backwards from target volume at a conservative per-mailbox daily cap. Scale comes from adding mailboxes, not from raising caps — the caps are what keep reputation intact.",
      },
      {
        q: "What happens if a domain gets burned anyway?",
        a: "We rest it, diagnose the cause — usually list quality or a copy pattern rather than the infrastructure — and rotate to healthy mailboxes while it recovers. Because outbound is isolated, your corporate mail is unaffected throughout.",
      },
    ],
    cta: {
      headline: "Build the infrastructure before the campaign.",
      body:
        "We'll audit your current setup, show you where mail is really landing, and put the right foundation in.",
    },
    related: ["cold-email", "list-verification", "database-building", "pipeline-reporting"],
    sources: ["instantly", "powerdmarc", "redsift", "lacleo", "amplemarket"],
  },

  // ── 05 ────────────────────────────────────────────────────────
  {
    slug: "cold-email",
    pillar: "outreach",
    title: "Cold Email Campaigns",
    summary: "Sequenced, tested and tracked — written to be answered, not admired.",
    lede:
      "Cold email still works, but the bar moved. Generic mass sending is now both less effective and actively dangerous to your domain. What works is a tight list, a specific reason for writing, a short message, and the discipline to stop when a variant is not performing.",
    pain: [
      {
        title: "Reply rates are structurally lower than you were told",
        body:
          "Benchmarks quoted in sales decks tend to be flattering. Knowing the real distribution matters, because it changes how many accounts you need in the programme for the maths to work.",
        stat: {
          value: "3.4%",
          note: "average 2026 cold email reply rate; strong performers clear 5% and elite programmes reach 8–12%",
          source: "instantly",
        },
      },
      {
        title: "Personalisation that fools nobody",
        body:
          "'Loved your recent post' merged from a field. Recipients recognise the pattern instantly, and it performs worse than an honest, well-argued generic email.",
      },
      {
        title: "Volume is used to paper over relevance",
        body:
          "When replies drop, the instinct is to send more. That raises complaint rates, damages the domain, and accelerates the decline it was meant to fix.",
      },
    ],
    approach: [
      {
        title: "Segment before writing",
        body:
          "One sequence per segment and per persona. The specificity that makes an email worth answering is impossible when one message has to serve everyone.",
      },
      {
        title: "Write short, with a real reason",
        body:
          "Under 120 words, one idea, one ask, a genuine trigger for why we are writing now. No attachments, minimal links, plain text.",
      },
      {
        title: "Sequence with restraint",
        body:
          "Three to five touches with varied angles, spaced properly, and a clean break-up. Chasing eight times is how you generate complaints rather than meetings.",
      },
      {
        title: "Test one variable at a time",
        body:
          "Subject, opening line, offer or call to action — isolated, with enough volume behind each to mean something. Then keep what wins.",
      },
      {
        title: "Route replies like leads",
        body:
          "Positive replies land in your CRM or WhatsApp immediately, with context attached. Speed of response is often the whole difference between a reply and a meeting.",
      },
    ],
    deliverables: [
      "Segment-level sequence copy, written not templated",
      "Subject-line and opening-line test sets",
      "Trigger-based personalisation that a human would recognise as real",
      "Sending schedule with per-mailbox caps",
      "Reply classification: interested, not now, wrong person, unsubscribe",
      "Instant routing of positive replies into CRM or WhatsApp",
      "Weekly performance readout by segment and variant",
      "Break-up sequences and re-engagement cycles",
    ],
    different: [
      {
        title: "We report by segment, not in aggregate",
        body:
          "A blended reply rate hides which segment is working. Ours is broken out so you can see where to concentrate — and where to stop.",
      },
      {
        title: "We cap volume on purpose",
        body:
          "We will refuse to raise sending volume to hit a meeting target if the complaint rate says otherwise. Protecting the channel is part of the job.",
      },
      {
        title: "Copy is written, not generated",
        body:
          "By people who have read your sales calls. Sequences that sound like everyone else's get treated like everyone else's.",
      },
    ],
    signals: [
      { label: "2026 average reply rate", value: "3.4%", source: "instantly" },
      { label: "Strong / elite programmes", value: "5% / 8–12%", source: "lacleo" },
      { label: "Bounce target", value: "under 1.5%", source: "amplemarket" },
      { label: "Complaint ceiling", value: "0.3% — we run under 0.1%", source: "lacleo" },
    ],
    faqs: [
      {
        q: "How many meetings can we expect per month?",
        a: "It follows arithmetic, not optimism: contactable accounts, reply rate, positive-reply share, and show-up rate. We will model it from your list size before you sign, and if the numbers don't support the target we will say so.",
      },
      {
        q: "Is cold email legal in India?",
        a: "B2B outreach to business contacts is permitted, with obligations: identify yourself, provide a working opt-out, honour it promptly, and keep suppression lists. For EU and UK recipients we apply the stricter GDPR and PECR standard by default.",
      },
      {
        q: "How long before we see results?",
        a: "First replies inside two weeks of the first send, but the first month is calibration — segment performance, which angle lands, which titles answer. Judge a programme at ninety days, not at thirty.",
      },
    ],
    cta: {
      headline: "See the maths before you commit.",
      body:
        "Tell us your ICP and target. We'll model the list size, reply rate and meetings it would realistically produce.",
    },
    related: ["email-infrastructure", "list-verification", "meeting-booking", "linkedin-outreach"],
    sources: ["instantly", "amplemarket", "lacleo", "powerdmarc"],
  },

  // ── 06 ────────────────────────────────────────────────────────
  {
    slug: "whatsapp-outreach",
    pillar: "outreach",
    title: "WhatsApp Outreach",
    summary: "The channel India actually answers — run on the official API, not a burner phone.",
    lede:
      "In India, WhatsApp is where business conversations happen. It is also where the most damage gets done, because the temptation to blast from a personal number is enormous and the consequence — a banned number, mid-quarter — is severe. Done properly, on the Business API with approved templates, it is the most responsive channel you have.",
    pain: [
      {
        title: "Blasting from a personal number gets you banned",
        body:
          "Bulk sending from an unofficial number ends one way. The number carries your existing customer conversations, and losing it costs far more than the campaign ever earned.",
      },
      {
        title: "Template rejections stall the campaign",
        body:
          "Meta reviews and rejects marketing templates for reasons that are not obvious until you have had a few rejected. Teams learn this in the middle of a launch.",
      },
      {
        title: "Costs are misunderstood until the invoice lands",
        body:
          "Per-message billing replaced conversation billing, and marketing messages cost several times what utility messages do. Sending the wrong category at volume is an expensive way to learn the difference.",
        stat: {
          value: "₹0.86 vs ₹0.11",
          note: "approximate India rate per marketing message versus utility or authentication message, 2026",
          source: "chati",
        },
      },
    ],
    approach: [
      {
        title: "Set up on the official Business API",
        body:
          "Business verification, a display name that will pass review, quality-rating monitoring, and a number strategy that keeps marketing separate from support.",
      },
      {
        title: "Design templates that get approved",
        body:
          "Written for Meta's policy the first time — correct category, clear opt-out, no prohibited claims — with variants held in reserve.",
      },
      {
        title: "Use the free windows deliberately",
        body:
          "Service replies inside the 24-hour window cost nothing, and click-to-WhatsApp ad traffic opens a longer free window. Campaign structure should be built around those windows, not around them.",
      },
      {
        title: "Route into a real inbox",
        body:
          "A shared team inbox with assignment, tags and response-time targets. WhatsApp generates replies quickly and they are worthless if nobody owns them.",
      },
      {
        title: "Watch the quality rating like a hawk",
        body:
          "Block and report rates drive your quality tier, which drives your messaging limits. We monitor and slow down before Meta does it for us.",
      },
    ],
    deliverables: [
      "WhatsApp Business API setup and business verification",
      "Number strategy separating marketing from support",
      "Template design, submission and approval management",
      "Opt-in capture flows for web, ads and offline",
      "Campaign scheduling with category-cost planning",
      "Shared team inbox with routing and response targets",
      "Click-to-WhatsApp ad integration",
      "Quality-rating and messaging-limit monitoring",
    ],
    different: [
      {
        title: "We plan around the cost model",
        body:
          "Utility and authentication messages cost a fraction of marketing messages. Structuring a campaign to use the right category legitimately is often the largest saving available.",
      },
      {
        title: "Opt-in is built properly from day one",
        body:
          "Captured, logged and provable. It is what keeps quality rating high and keeps the number alive.",
      },
      {
        title: "We connect it to your CRM",
        body:
          "Conversations land against the contact record. Because we build the CRM too, WhatsApp is not a separate island of history nobody can search.",
      },
    ],
    signals: [
      { label: "India marketing message", value: "~₹0.86", source: "chati" },
      { label: "Utility / authentication message", value: "~₹0.11", source: "chati" },
      { label: "Service window", value: "24 hours, free", source: "aisensy" },
      { label: "Click-to-WhatsApp ad window", value: "72 hours, free", source: "aisensy" },
    ],
    faqs: [
      {
        q: "Can we message people who haven't opted in?",
        a: "Not on the official API, and you should not want to. Opt-in is what protects the quality rating that determines your messaging limits. We build capture into ads, the website, checkout and offline touchpoints so the list grows legitimately.",
      },
      {
        q: "How is this different from what our team does on WhatsApp Web now?",
        a: "Multiple agents on one number, templates that can be sent at scale legally, message history against the CRM record, automation, and analytics. Plus the number does not get banned.",
      },
      {
        q: "What does it cost to run?",
        a: "Per-message charges from Meta, plus a Business Solution Provider fee, plus our management. We model expected monthly spend by message category before launch so there are no surprises on the first invoice.",
      },
    ],
    cta: {
      headline: "Get on the official API properly.",
      body:
        "We'll handle verification, templates and opt-in, and model what your monthly message spend will actually be.",
    },
    related: ["cold-email", "meeting-booking", "ai-agents", "automation"],
    sources: ["chati", "aisensy"],
  },

  // ── 07 ────────────────────────────────────────────────────────
  {
    slug: "linkedin-outreach",
    pillar: "outreach",
    title: "LinkedIn Outreach",
    summary: "Warming the decision maker — connection, context, then conversation.",
    lede:
      "LinkedIn is where the buying committee is verifiable and where a message can be tied to a real professional identity. It is also heavily rate-limited and heavily automated by everyone else, which means the winning approach is fewer, better-targeted touches from a profile that looks like a person worth knowing.",
    pain: [
      {
        title: "Connection requests get ignored",
        body:
          "Especially at senior level. Acceptance falls sharply the more senior the target, which means volume tactics fail hardest exactly where the budget sits.",
        stat: {
          value: "15–19%",
          note: "connection acceptance rate for C-suite targets — the lowest of any segment",
          source: "expandi",
        },
      },
      {
        title: "The profile undermines the message",
        body:
          "An empty or corporate-boilerplate profile is checked before anyone replies. If it does not establish credibility in five seconds, the best-written message still fails.",
      },
      {
        title: "Automation set too aggressively",
        body:
          "Tools pushed past safe limits get profiles restricted. The account that gets warned is usually the founder's, and the recovery is slow.",
      },
    ],
    approach: [
      {
        title: "Fix the profiles first",
        body:
          "Headline, banner, about section and featured content rewritten so the profile does the pre-selling. This alone moves acceptance rates before a single message is sent.",
      },
      {
        title: "Warm before asking",
        body:
          "Engage with the target's content for a period before connecting. Familiarity is what turns a cold request into an accepted one.",
      },
      {
        title: "Personalise where it counts",
        body:
          "A note that shows you understand their situation. Requests with a genuine personalised message reply at close to double the rate of bare requests.",
      },
      {
        title: "Stay inside safe limits",
        body:
          "Conservative daily connection and message caps per profile, spread across multiple senders. Scale comes from more profiles, never from pushing one to its limit.",
      },
      {
        title: "Run it alongside email",
        body:
          "Multi-channel sequences where a LinkedIn view or connection precedes an email touch consistently outperform either channel run alone.",
      },
    ],
    deliverables: [
      "Profile optimisation for each sender",
      "Sales Navigator search build and list export",
      "Pre-connection engagement programme",
      "Personalised connection notes by segment",
      "Multi-touch message sequences with clean exits",
      "Safe-limit scheduling across multiple sender profiles",
      "Reply handling and meeting booking",
      "Weekly reporting: acceptance, reply and meeting rates",
    ],
    different: [
      {
        title: "We optimise the profile before the sequence",
        body:
          "It is the highest-leverage change available and almost nobody does it first. The message is judged by the profile behind it.",
      },
      {
        title: "We run under the safe limits, deliberately",
        body:
          "Restricted profiles cost far more than the extra sends were worth. We would rather book fewer meetings than lose a founder's account.",
      },
      {
        title: "Sequenced with email, not against it",
        body:
          "One programme, two channels, one report — rather than two vendors each claiming the same meeting.",
      },
    ],
    signals: [
      { label: "Benchmark acceptance rate", value: "30–45%", source: "cleverly" },
      { label: "Reply with personalised note", value: "9.36% vs 5.44% without", source: "expandi" },
      { label: "Sends converting to a meeting", value: "1–3%", source: "expandi" },
      { label: "Per-sender output", value: "~10–12 meetings/month at 20 connects/day", source: "expandi" },
    ],
    faqs: [
      {
        q: "Do you need access to our personal LinkedIn accounts?",
        a: "We work from dedicated sender profiles wherever possible. Where founder credibility genuinely matters we can operate a founder profile under agreed limits — with the limits set conservatively, because the downside is your account.",
      },
      {
        q: "Do we need Sales Navigator?",
        a: "For serious targeting, yes. The filters and saved-search alerts are what make list building repeatable. It is a small cost relative to the programme.",
      },
      {
        q: "How many meetings will one sender produce?",
        a: "At roughly twenty connections a day with typical acceptance and meeting rates, plan on ten to twelve meetings a month per sender. Scale by adding senders, not by raising volume per profile.",
      },
    ],
    cta: {
      headline: "Start with the profile, then the pipeline.",
      body:
        "We'll audit your senders' profiles and show you the acceptance rate you should be getting.",
    },
    related: ["cold-email", "icp-research", "meeting-booking", "database-building"],
    sources: ["expandi", "cleverly"],
  },

  // ── 08 ────────────────────────────────────────────────────────
  {
    slug: "meeting-booking",
    pillar: "outreach",
    title: "Meeting Booking",
    summary: "SDR-as-a-service — replies worked into calendar invitations that get attended.",
    lede:
      "A reply is not a meeting and a meeting is not an attended meeting. The work between those three states is unglamorous and decisive: answering quickly, qualifying honestly, handling the reschedule, and reducing no-shows. This is the service that turns outbound activity into something your sales team can actually work.",
    pain: [
      {
        title: "Replies go cold while nobody answers",
        body:
          "Interest has a short half-life. A reply answered two days later converts far worse than the same reply answered in minutes — the effect is large and well documented.",
        stat: {
          value: "21x",
          note: "more likely to qualify a lead when the response happens within five minutes",
          source: "insidesales",
        },
      },
      {
        title: "The calendar fills with unqualified meetings",
        body:
          "Booking anything that says yes wastes your most expensive people's time. A meeting with someone who cannot buy is worse than no meeting, because it looks like progress.",
      },
      {
        title: "No-shows quietly eat a third of the pipeline",
        body:
          "Booked and never attended. Without reminders, confirmation and easy rescheduling, the show-up rate silently decides whether the whole programme works.",
      },
    ],
    approach: [
      {
        title: "Answer fast, within working hours",
        body:
          "Positive replies handled inside a committed window. This is the single highest-return operational discipline in outbound.",
      },
      {
        title: "Qualify against agreed criteria",
        body:
          "Budget, authority, need and timing defined with you in advance, so 'qualified' means the same thing to both of us. Anything that fails goes to nurture rather than to your calendar.",
      },
      {
        title: "Book into the calendar directly",
        body:
          "Live availability, no back-and-forth, calendar invite with an agenda and a joining link sent immediately.",
      },
      {
        title: "Work the show-up rate",
        body:
          "Confirmation on booking, reminders on the day, one-click reschedule, and a re-book attempt on every no-show. It is the cheapest pipeline you will ever recover.",
      },
      {
        title: "Hand over with context",
        body:
          "Your AE receives the thread, the qualification notes and the reason the prospect agreed to talk — so the call opens where the email left off.",
      },
    ],
    deliverables: [
      "Reply monitoring and same-hour response, working hours",
      "Qualification against jointly agreed criteria",
      "Direct calendar booking with live availability",
      "Confirmation, reminder and reschedule flows",
      "No-show re-booking attempts",
      "Handover brief per meeting: thread, notes, context",
      "Nurture routing for 'not now' replies with follow-up dates",
      "Weekly reporting on booked, held and qualified meetings",
    ],
    different: [
      {
        title: "We report held meetings, not booked ones",
        body:
          "Booked is an activity metric an agency controls. Held is the one you can build a forecast on, and it is what we are measured against.",
      },
      {
        title: "We will decline to book unqualified meetings",
        body:
          "Even when it makes our numbers look worse. Filling your calendar with the wrong people is the fastest way to have outbound written off internally.",
      },
      {
        title: "Nurture is worked, not archived",
        body:
          "'Not now' is the most common positive reply in outbound. It gets a date and a follow-up rather than a folder.",
      },
    ],
    signals: [
      { label: "Response window we commit to", value: "Same hour, working hours" },
      { label: "Qualification", value: "Agreed with you, in writing" },
      { label: "Reported metric", value: "Held meetings" },
      { label: "No-show recovery", value: "Re-book attempted on every miss" },
    ],
    faqs: [
      {
        q: "How is this different from hiring an SDR?",
        a: "Speed and fixed cost, mainly. A hired SDR takes months to recruit and ramp, and carries salary regardless of pipeline. This starts in weeks and scales up or down. Once volume is consistently high, an in-house team often becomes the better economics — we will tell you when you reach that point.",
      },
      {
        q: "Who runs the actual sales call?",
        a: "You do. We qualify and book; your team sells. We are not pretending to close your deals, and any agency claiming they can usually understands your product less well than they think.",
      },
      {
        q: "What counts as a qualified meeting?",
        a: "Whatever we agree in writing before we start — typically the right title, a real need, a plausible budget and a timeline. Defining this properly at the outset prevents every argument that follows.",
      },
    ],
    cta: {
      headline: "Turn replies into attended meetings.",
      body:
        "Tell us what a qualified meeting looks like for you, and we'll run the layer between the reply and the call.",
    },
    related: ["cold-email", "linkedin-outreach", "pipeline-reporting", "crm"],
    sources: ["insidesales"],
  },

  // ── 09 ────────────────────────────────────────────────────────
  {
    slug: "pipeline-reporting",
    pillar: "outreach",
    title: "Pipeline Reporting",
    summary: "Every reply accounted for, from first touch to closed revenue.",
    lede:
      "Most outbound reporting stops at the meeting, which is precisely where the interesting questions start. Which segment produced revenue, not just replies? Which angle brought deals that closed? Without that loop, you are optimising the top of a funnel with no idea what the bottom did with it.",
    pain: [
      {
        title: "Activity reporting dressed as performance",
        body:
          "Sends, opens, replies. None of them tell you whether the programme made money, and open rates in particular have been unreliable since privacy protections started pre-fetching images.",
      },
      {
        title: "The CRM does not match reality",
        body:
          "Deals sit in stages nobody has updated, because updating them is manual work reps avoid. A forecast built on that data is fiction with a chart.",
        stat: {
          value: "~25%",
          note: "of a rep's working week consumed by manual CRM data entry",
          source: "askelephant",
        },
      },
      {
        title: "Nobody can attribute a closed deal to a campaign",
        body:
          "Six months later the origin of the deal is lost. So the next budget conversation is settled by whoever argues best rather than by what worked.",
      },
    ],
    approach: [
      {
        title: "Define the stages once, properly",
        body:
          "Entry and exit criteria written down for every stage, so 'qualified' and 'proposal' mean the same thing to everyone and a forecast is comparable month to month.",
      },
      {
        title: "Capture the source automatically",
        body:
          "Campaign, segment, sequence and angle stamped on the contact at first touch and carried through to close. No manual tagging that will quietly stop happening.",
      },
      {
        title: "Sync outbound tooling into the CRM",
        body:
          "Replies, meetings and outcomes written back automatically. If a rep has to copy it across, the data will be wrong within a month.",
      },
      {
        title: "Report the full funnel",
        body:
          "Contacted, replied, meeting booked, meeting held, opportunity, closed — with conversion between each step, split by segment.",
      },
      {
        title: "Close the loop into targeting",
        body:
          "Segments that produce revenue get more list; segments that produce meetings and no revenue get cut. That feedback is the entire point of the reporting.",
      },
    ],
    deliverables: [
      "Pipeline stage definitions with entry and exit criteria",
      "Automatic source, campaign and segment attribution",
      "Two-way sync between sending tools and your CRM",
      "Full-funnel dashboard from contacted to closed",
      "Segment-level conversion and revenue reporting",
      "Cohort analysis by month and by campaign",
      "Weekly operating report and monthly review",
      "Data-hygiene rules and duplicate management",
    ],
    different: [
      {
        title: "We report to revenue, not to replies",
        body:
          "The funnel runs all the way to closed-won. It is the only version that tells you whether to spend more.",
      },
      {
        title: "Attribution is automatic",
        body:
          "Because we build the integrations, the data arrives without anyone remembering to record it. Manual attribution always decays.",
      },
      {
        title: "The dashboard is yours",
        body:
          "Built in your CRM or BI tool, not in an agency portal you lose access to when the contract ends.",
      },
    ],
    signals: [
      { label: "CRM projects failing objectives", value: "~55%", source: "johnnygrow" },
      { label: "Rep week lost to manual work", value: "8–13 hours", source: "pintel" },
      { label: "Reporting depth", value: "Contacted → closed-won" },
      { label: "Ownership", value: "In your systems, not ours" },
    ],
    faqs: [
      {
        q: "We already have a CRM. Do we need this?",
        a: "The CRM is the container; this is the discipline that makes what is inside it trustworthy. Most CRMs we inherit have good software and unusable data, because nothing was defined and nothing was automatic.",
      },
      {
        q: "Which CRMs do you work with?",
        a: "HubSpot, Zoho, Pipedrive, Salesforce and Odoo, plus custom builds where the process genuinely does not fit an off-the-shelf pipeline. We would rather adapt to your stack than sell you a migration you did not ask for.",
      },
      {
        q: "How long does it take to set up?",
        a: "Two to four weeks for stage definitions, attribution and dashboards on a standard CRM. Longer if the existing data needs deduplicating and cleaning first, which it usually does.",
      },
    ],
    cta: {
      headline: "See what outbound actually produced.",
      body:
        "We'll connect the tooling to your CRM and build the funnel view from first touch to closed revenue.",
    },
    related: ["crm", "dashboards", "meeting-booking", "cold-email"],
    sources: ["askelephant", "johnnygrow", "pintel"],
  },
];
