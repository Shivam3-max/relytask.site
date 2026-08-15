import type { ServiceDetail } from "../service-detail";

export const TECHNOLOGY_DETAILS: ServiceDetail[] = [
  // ── 01 ────────────────────────────────────────────────────────
  {
    slug: "websites",
    pillar: "technology",
    title: "Websites & Web Apps",
    summary: "Fast, owned and built to convert — not a template with your logo on it.",
    lede:
      "A website is a sales asset with a load time. Most are judged on how they look in a review meeting and never on the two things that decide revenue: how quickly they render on a mid-range Android phone on a patchy connection, and how clearly they make the argument for buying.",
    pain: [
      {
        title: "It is slow, and slow is expensive",
        body:
          "Page weight accumulates — plugins, fonts, unoptimised images, a tag manager full of scripts nobody audits. The cost is paid in bounces before anyone reads a word.",
        stat: {
          value: "~1%",
          note: "of conversions lost per additional 100ms of load time",
          source: "digitalappliedSpeed",
        },
      },
      {
        title: "Mobile was an afterthought",
        body:
          "Designed on a desktop, checked on an iPhone, never tested on the mid-range Android most Indian traffic actually arrives on. Most mobile sites still fail Core Web Vitals outright.",
        stat: {
          value: "42%",
          note: "of mobile sites pass all three Core Web Vitals",
          source: "digitalappliedSpeed",
        },
      },
      {
        title: "You cannot change anything without a developer",
        body:
          "Every price update or new page becomes a ticket, a quote and a two-week wait. So the site slowly goes stale, and marketing routes around it.",
      },
    ],
    approach: [
      {
        title: "Structure around the decision, not the org chart",
        body:
          "Pages arranged the way a buyer moves — problem, proof, price, objections, next step — rather than mirroring your internal departments.",
      },
      {
        title: "Build on a fast, modern stack",
        body:
          "Next.js, static rendering where possible, images optimised at build time, minimal client-side JavaScript. Speed comes from architecture, not from a caching plugin bolted on afterwards.",
      },
      {
        title: "Make it editable by your team",
        body:
          "Content in a CMS with sensible field structures, so copy, pricing and case studies change without a deployment.",
      },
      {
        title: "Instrument it from day one",
        body:
          "Analytics, events, form tracking and server-side conversion capture built in at launch — not retrofitted three months later when someone asks what is working.",
      },
      {
        title: "Ship, measure, iterate",
        body:
          "Launch is the start. We keep testing the pages that carry revenue rather than declaring the project finished at handover.",
      },
    ],
    deliverables: [
      "Information architecture and page-level conversion plan",
      "Design system built from your brand, responsive by default",
      "Next.js build with static rendering and image optimisation",
      "CMS with structured, editable content models",
      "Core Web Vitals passing on mobile and desktop",
      "Analytics, event and server-side conversion tracking",
      "SEO foundations: schema, sitemap, metadata, internal linking",
      "Deployment, hosting setup and handover documentation",
    ],
    different: [
      {
        title: "We are measured on speed and conversion",
        body:
          "Not on how the design looks in a presentation. Core Web Vitals and form conversion are written into the brief.",
      },
      {
        title: "The team that markets it builds it",
        body:
          "The people writing your ads specify the landing pages. The gap between 'what the campaign needs' and 'what the site does' closes because it is the same room.",
      },
      {
        title: "You own everything",
        body:
          "Code, repository, hosting, domain, CMS. No proprietary builder that holds the site hostage, and no licence that expires with the relationship.",
      },
    ],
    signals: [
      { label: "Load time target", value: "LCP under 2.5s on mobile" },
      { label: "1s vs 5s load", value: "3x conversion difference", source: "solve" },
      { label: "Bounce probability, 1s → 3s", value: "+32%", source: "solve" },
      { label: "Handover", value: "Full source, your repository" },
    ],
    faqs: [
      {
        q: "WordPress or a custom build?",
        a: "WordPress is fine for a content-heavy site with a team that already knows it. For anything where speed, conversion or custom logic matters, a modern framework wins clearly. We will recommend against a rebuild if your current platform is not the actual constraint.",
      },
      {
        q: "How long does a site take?",
        a: "Four to eight weeks for a marketing site of moderate size, longer where there is a web app, complex integrations or a lot of content migration. The variable is almost always content readiness, not development.",
      },
      {
        q: "Can you take over a site someone else built?",
        a: "Usually, yes. We start with an audit — performance, code quality, hosting and analytics — and tell you honestly whether it is worth improving or replacing.",
      },
    ],
    cta: {
      headline: "Get a site that earns its traffic.",
      body:
        "Send us your URL. We'll come back with speed scores, conversion gaps and what we would fix first.",
    },
    related: ["cro", "seo", "mobile-apps", "integrations"],
    sources: ["digitalappliedSpeed", "solve"],
  },

  // ── 02 ────────────────────────────────────────────────────────
  {
    slug: "mobile-apps",
    pillar: "technology",
    title: "Mobile Apps",
    summary: "iOS and Android, built when an app genuinely beats a website — and not before.",
    lede:
      "An app is a serious commitment: two platforms, store review, release cycles, and the hardest distribution problem in software. Sometimes it is clearly right — field teams, repeat ordering, offline work, push as a genuine channel. Often a fast mobile web experience does the job for a fraction of the cost. We will tell you which one you are looking at.",
    pain: [
      {
        title: "The app was built before the need was proven",
        body:
          "Commissioned because competitors have one. It launches, gets a few hundred installs, and becomes a maintenance line item nobody can kill.",
      },
      {
        title: "Nobody planned for distribution",
        body:
          "Getting an app installed is far harder than getting a page visited. If there is no answer to why someone would install and return, the build is the easy part and the wrong part.",
      },
      {
        title: "It rots after launch",
        body:
          "OS updates, deprecated SDKs, expiring certificates and store policy changes arrive whether or not anyone is maintaining the app. Unmaintained apps eventually stop working, then stop being listed.",
      },
    ],
    approach: [
      {
        title: "Challenge the premise first",
        body:
          "We start by testing whether a progressive web app or a fast mobile site would meet the need. If it would, we will say so — it is cheaper for you and we would rather build the right thing.",
      },
      {
        title: "Define the two things it must do",
        body:
          "Apps succeed by doing a small number of things extremely well. We cut scope hard before development, because everything shipped has to be maintained forever.",
      },
      {
        title: "Build cross-platform where it fits",
        body:
          "React Native or Flutter for one codebase across iOS and Android; native where the app genuinely needs deep platform capability. Chosen on the requirement, not on preference.",
      },
      {
        title: "Design for real Indian conditions",
        body:
          "Mid-range devices, patchy connectivity, offline states, small app size. An app that assumes a flagship phone on good wifi will fail most of your users.",
      },
      {
        title: "Ship the release pipeline too",
        body:
          "Store listings, certificates, crash reporting, analytics and an update cadence — set up at launch so the app can be maintained rather than rescued.",
      },
    ],
    deliverables: [
      "Build-versus-web assessment with an honest recommendation",
      "Scoped feature set with a defined first release",
      "UI design against your brand system",
      "React Native, Flutter or native build for iOS and Android",
      "Offline handling and low-bandwidth optimisation",
      "Push notification infrastructure",
      "Store submission, listing assets and review management",
      "Crash reporting, analytics and a maintenance plan",
    ],
    different: [
      {
        title: "We will talk you out of it when we should",
        body:
          "A meaningful share of app enquiries are better solved with a fast mobile site. Saying so costs us a project and saves you a recurring liability.",
      },
      {
        title: "Distribution is planned before development",
        body:
          "How installs will be earned is part of the brief. An app with no distribution plan is a very expensive way to reach nobody.",
      },
      {
        title: "Maintenance is quoted up front",
        body:
          "The ongoing cost is in the first proposal, not discovered in year two when something breaks.",
      },
    ],
    signals: [
      { label: "First-release scope", value: "Deliberately small" },
      { label: "Platforms", value: "iOS and Android from one codebase, where suitable" },
      { label: "Tested on", value: "Mid-range Android, throttled network" },
      { label: "Post-launch", value: "Maintenance plan quoted at proposal" },
    ],
    faqs: [
      {
        q: "How much does an app cost?",
        a: "It varies too much for a headline number to be honest — a focused internal tool and a consumer app with payments, chat and social features are different orders of magnitude. We scope to a fixed price after a short discovery, so you get a real number before committing.",
      },
      {
        q: "Do we need separate iOS and Android builds?",
        a: "Rarely. Cross-platform frameworks handle most business apps well from a single codebase. Native becomes worth it when you need heavy device capability — serious camera work, background processing, complex offline sync.",
      },
      {
        q: "What about app store approval?",
        a: "We handle submission and review for both stores, including the privacy declarations and policy questions that cause most first-time rejections.",
      },
    ],
    cta: {
      headline: "Find out whether you need an app at all.",
      body:
        "Tell us what it would do. We'll tell you honestly whether an app or a fast mobile site is the right build.",
    },
    related: ["websites", "crm", "automation", "support"],
    sources: [],
  },

  // ── 03 ────────────────────────────────────────────────────────
  {
    slug: "crm",
    pillar: "technology",
    title: "Custom CRM",
    summary: "Your pipeline, your rules — software shaped around how you actually sell.",
    lede:
      "Most CRM failures are not software failures. The tool is fine; it was configured for a sales process nobody follows, so reps work around it, the data goes stale, and within a year the CRM is a place where deals are recorded after the fact instead of managed. The fix is process first, configuration second.",
    pain: [
      {
        title: "The CRM does not match how you sell",
        body:
          "Stages copied from a template, fields nobody fills, automations that fire at the wrong moment. When the tool fights the process, the process wins and the data loses.",
        stat: {
          value: "~55%",
          note: "of CRM implementations fail to meet their planned business objectives",
          source: "johnnygrow",
        },
      },
      {
        title: "Reps spend a quarter of their week on data entry",
        body:
          "Logging calls, updating stages, copying between tools. It is the most expensive typing in the business and it is why the data is incomplete.",
        stat: {
          value: "~25%",
          note: "of a rep's week spent on manual CRM data entry",
          source: "askelephant",
        },
      },
      {
        title: "Reporting cannot be trusted, so nobody uses it",
        body:
          "Once a forecast is visibly wrong twice, leadership goes back to a spreadsheet — and the CRM becomes an expensive contact list.",
      },
    ],
    approach: [
      {
        title: "Map the real process first",
        body:
          "How deals actually move, including the messy parts nobody documents. We configure to that, then improve it — rather than imposing a theoretical funnel on day one.",
      },
      {
        title: "Configure or build, whichever is honest",
        body:
          "HubSpot, Zoho, Pipedrive or Odoo where they fit; a custom build where your process genuinely does not fit an off-the-shelf pipeline. We are not resellers, so the recommendation is not commission-driven.",
      },
      {
        title: "Automate the typing away",
        body:
          "Calls, emails, WhatsApp and forms logged automatically. Stage movement triggered by real events. Every field a rep does not have to fill is a field that stays accurate.",
      },
      {
        title: "Enforce the rules in the system",
        body:
          "Required fields at stage gates, duplicate prevention, ownership and routing rules. Data quality has to be structural, not a monthly reminder in a team meeting.",
      },
      {
        title: "Train and then check",
        body:
          "Role-based training, then a usage review after four weeks to find where people are already working around it — because they will be, and that is information.",
      },
    ],
    deliverables: [
      "Sales process mapping with stage definitions",
      "Platform recommendation, or a custom build",
      "Pipeline, field and permission configuration",
      "Automatic activity capture from email, calls and WhatsApp",
      "Lead routing, assignment and SLA rules",
      "Duplicate prevention and data-hygiene automation",
      "Dashboards for rep, manager and leadership views",
      "Role-based training and a 30-day adoption review",
    ],
    different: [
      {
        title: "We are platform-agnostic",
        body:
          "No reseller margin steering the recommendation. If your process fits Zoho, we will say Zoho — including when a custom build would have been a bigger project for us.",
      },
      {
        title: "We measure adoption, not delivery",
        body:
          "The project is not finished at go-live. It is finished when reps are using it without being chased, which is the only definition that matters.",
      },
      {
        title: "It connects to the outreach that fills it",
        body:
          "Because we also run the campaigns, the CRM is instrumented from first touch. Attribution works because it was designed together.",
      },
    ],
    signals: [
      { label: "CRM projects missing objectives", value: "~55%", source: "johnnygrow" },
      { label: "Reps saying data entry takes too long", value: "71%", source: "askelephant" },
      { label: "Weekly hours lost to manual work", value: "8–13 per rep", source: "pintel" },
      { label: "Our checkpoint", value: "Adoption review at 30 days" },
    ],
    faqs: [
      {
        q: "Should we build a custom CRM or configure an existing one?",
        a: "Configure, in the large majority of cases. Off-the-shelf CRMs are mature and cheap relative to a build. Custom becomes right when your process is genuinely unusual — complex quoting, multi-party deals, regulated workflows — or when the CRM has to sit inside a larger operational system.",
      },
      {
        q: "Will our team actually use it?",
        a: "That is the whole design problem. Adoption comes from removing typing rather than mandating it: if the CRM makes a rep's week easier, it gets used. We check at thirty days and fix what is being worked around.",
      },
      {
        q: "Can you migrate our existing data?",
        a: "Yes — deduplicated, normalised and mapped, with a validation pass before cutover. Migration is usually where the real cost sits, and we will not pretend otherwise in the estimate.",
      },
    ],
    cta: {
      headline: "Make the CRM match how you sell.",
      body:
        "We'll map your real process and show you what to configure, what to automate, and what to throw away.",
    },
    related: ["erp", "automation", "pipeline-reporting", "integrations"],
    sources: ["johnnygrow", "askelephant", "pintel"],
  },

  // ── 04 ────────────────────────────────────────────────────────
  {
    slug: "erp",
    pillar: "technology",
    title: "Custom ERP",
    summary: "Operations on one spine — quotation to dispatch to payment, in a single system.",
    lede:
      "ERP has an intimidating reputation because most ERP projects are run as replacements: everything at once, eighteen months, enormous risk. It does not have to work that way. Built module by module around the process that hurts most, an operations system pays for itself long before it is finished.",
    pain: [
      {
        title: "Big-bang ERP projects fail at an alarming rate",
        body:
          "Long timelines, frozen requirements and a single cutover date. By the time it goes live the business has moved, and the overrun is measured in years rather than weeks.",
        stat: {
          value: "55–75%",
          note: "of ERP implementations fail to meet their intended outcomes; manufacturing overruns average far higher",
          source: "godlan",
        },
      },
      {
        title: "The business runs on spreadsheets nobody can audit",
        body:
          "Inventory in one file, job cards in another, dispatch in a third, and one person who understands the formulas. It works until they are on leave.",
      },
      {
        title: "The same data is entered three times",
        body:
          "Quotation, work order, invoice — retyped at each step, each time with a fresh chance of error. The reconciliation work at month end exists purely because of it.",
      },
    ],
    approach: [
      {
        title: "Start with the module that hurts",
        body:
          "Not the whole business. One process — usually quotation-to-order or inventory — built, deployed and proven in weeks. Value first, scope second.",
      },
      {
        title: "Build on a project or order spine",
        body:
          "One record that everything else hangs off, so a quotation, its work orders, its material issues, its dispatch and its invoice are the same object at different stages rather than five disconnected files.",
      },
      {
        title: "Model your actual workflow",
        body:
          "Including the approvals, the exceptions and the informal steps that keep things moving. An ERP that forbids how you really work will simply be bypassed.",
      },
      {
        title: "Integrate rather than replace",
        body:
          "Tally stays if Tally works. We integrate accounting, e-way bills, GST filing and banking rather than forcing a rip-and-replace nobody asked for.",
      },
      {
        title: "Roll out module by module",
        body:
          "Each one live, used and stable before the next begins. No single cutover date on which the whole business is betting.",
      },
    ],
    deliverables: [
      "Process mapping across quotation, production, inventory and dispatch",
      "Module roadmap sequenced by pain and payback",
      "Order or project spine linking every downstream record",
      "Inventory, BOM and material-issue tracking",
      "Job cards, work orders and production status",
      "Dispatch, documentation and GST-compliant invoicing",
      "Tally, banking and e-way bill integration",
      "Role-based access, audit trail and reporting",
    ],
    different: [
      {
        title: "Module by module, never big bang",
        body:
          "The first module is live within weeks. You judge us on something working before committing to the rest of the roadmap.",
      },
      {
        title: "We integrate with Tally rather than fighting it",
        body:
          "Your accountant keeps the system they know. Almost every failed Indian ERP rollout we have seen tried to replace it.",
      },
      {
        title: "Built for the shop floor, not the boardroom",
        body:
          "Screens that work on a shared tablet with dusty hands and an intermittent connection. If the floor will not use it, the data is fiction.",
      },
    ],
    signals: [
      { label: "ERP failure rate, industry", value: "55–75%", source: "godlan" },
      { label: "Manufacturing projects missing objectives", value: "73%", source: "jobinandjismi" },
      { label: "Typical cost overrun", value: "50–200%", source: "jobinandjismi" },
      { label: "Our first module live in", value: "Weeks, not quarters" },
    ],
    faqs: [
      {
        q: "Do we have to replace Tally?",
        a: "No, and we usually recommend against it. Tally is good at what your accountant needs and poor at operations. We build the operations layer and integrate the two, which is cheaper and far less disruptive.",
      },
      {
        q: "Why not buy an off-the-shelf ERP?",
        a: "If a standard product fits your process, buy it — we will help you configure it. Custom becomes right when the standard product would force you to change how you manufacture or deliver, which for specialised operations is a real cost.",
      },
      {
        q: "How do you keep an ERP project from overrunning?",
        a: "By refusing to run it as one project. Each module is separately scoped, separately deployed and separately useful. If module three turns out not to be worth building, you stop after two and keep the value.",
      },
    ],
    cta: {
      headline: "Start with the process that hurts most.",
      body:
        "Tell us where the spreadsheets are. We'll scope the first module and get it live before we discuss the rest.",
    },
    related: ["crm", "automation", "integrations", "dashboards"],
    sources: ["godlan", "jobinandjismi"],
  },

  // ── 05 ────────────────────────────────────────────────────────
  {
    slug: "ai-agents",
    pillar: "technology",
    title: "AI Agents & Chatbots",
    summary: "Answer, qualify and route — with an honest handover when the bot is out of its depth.",
    lede:
      "AI support works well within a bounded domain and badly outside one. The teams getting value from it are precise about which questions the agent handles, ruthless about handing over early, and honest in their reporting about resolution rather than deflection. The ones getting complaints deployed a general chatbot and hoped.",
    pain: [
      {
        title: "Enquiries arrive out of hours and go cold",
        body:
          "The window in which interest converts is short. A form submitted at 10pm and answered at 11am the next day has already lost most of its value.",
        stat: {
          value: "21x",
          note: "more likely to qualify a lead when the first response arrives within five minutes",
          source: "insidesales",
        },
      },
      {
        title: "The same twenty questions consume the team",
        body:
          "Pricing, availability, delivery timelines, order status. Answered dozens of times a day by people who should be doing something harder.",
      },
      {
        title: "Bots that deflect rather than resolve",
        body:
          "A deflected ticket is not a solved problem — it is often a frustrated customer who gave up. Deflection rates vary enormously by question type, and a single headline number hides that.",
        stat: {
          value: "15–30%",
          note: "deflection for complex technical troubleshooting, against 70%+ for simple account queries",
          source: "clarityarc",
        },
      },
    ],
    approach: [
      {
        title: "Scope the agent narrowly",
        body:
          "We start from your actual enquiry log and define exactly which intents the agent owns. Everything else routes to a human immediately, by design.",
      },
      {
        title: "Ground it in your own content",
        body:
          "Retrieval over your documented answers, pricing and policies, so responses are traceable to a source rather than generated from thin air.",
      },
      {
        title: "Qualify and route, don't just answer",
        body:
          "The agent's most valuable job is often collecting the right four facts and putting the enquiry in front of the right person with context attached.",
      },
      {
        title: "Design the handover carefully",
        body:
          "Clear escalation triggers, full transcript passed across, and no loop that traps someone asking for a human. This is what separates a useful agent from a complaint generator.",
      },
      {
        title: "Review the transcripts weekly",
        body:
          "Real conversations are the only reliable source of what to fix. We read them, tune the scope, and report what the agent got wrong.",
      },
    ],
    deliverables: [
      "Intent analysis from your real enquiry history",
      "Scoped agent with explicitly defined boundaries",
      "Retrieval grounded in your documentation and pricing",
      "Lead qualification and data capture flows",
      "Escalation rules with full-context human handover",
      "Deployment on website, WhatsApp or both",
      "CRM integration so conversations land on the record",
      "Weekly transcript review and tuning",
    ],
    different: [
      {
        title: "We report resolution, not deflection",
        body:
          "Deflection counts conversations that ended. Resolution counts problems that were solved. We measure the second, including when the number is unflattering.",
      },
      {
        title: "The escape hatch is always visible",
        body:
          "Every conversation offers a human, at every step. Trapping people in a bot loop does more brand damage than the cost it saves.",
      },
      {
        title: "Scoped narrowly on purpose",
        body:
          "A confident wrong answer about pricing or delivery is worse than no answer. We would rather hand over early and often.",
      },
    ],
    signals: [
      { label: "Simple account queries", value: "70%+ deflection", source: "clarityarc" },
      { label: "Billing and order status", value: "50–70% deflection", source: "clarityarc" },
      { label: "Complex troubleshooting", value: "15–30% deflection", source: "clarityarc" },
      { label: "Our reported metric", value: "Resolution rate, with transcripts" },
    ],
    faqs: [
      {
        q: "Will it say something wrong about our pricing?",
        a: "Not if it is scoped and grounded properly — answers come from your documented content, and anything outside that scope escalates rather than improvises. We test adversarially before launch and read transcripts weekly after.",
      },
      {
        q: "Can it work on WhatsApp?",
        a: "Yes, and in India that is usually where it earns most. It runs on the official Business API, inside the free service window, with the same escalation rules as the website agent.",
      },
      {
        q: "Will this replace our support team?",
        a: "It removes the repetitive tier-one volume so the team can handle the harder cases properly. Teams that deploy an agent expecting to cut headcount usually end up with worse support and a worse reputation.",
      },
    ],
    cta: {
      headline: "Start with the twenty questions you answer daily.",
      body:
        "Send us your enquiry log. We'll show you what an agent could safely own and what it should never touch.",
    },
    related: ["whatsapp-outreach", "automation", "crm", "support"],
    sources: ["clarityarc", "insidesales"],
  },

  // ── 06 ────────────────────────────────────────────────────────
  {
    slug: "automation",
    pillar: "technology",
    title: "Workflow Automation",
    summary: "Killing the manual hours between your systems.",
    lede:
      "Every business accumulates a layer of human glue: someone copying an order into a sheet, someone re-entering an invoice, someone forwarding an email so a third person can update a status. It is invisible in the org chart, enormous in aggregate, and almost entirely removable.",
    pain: [
      {
        title: "Data gets typed more than once",
        body:
          "The same order appears in a form, a sheet, an accounting package and a WhatsApp group. Each retyping is a chance for the four versions to disagree.",
      },
      {
        title: "Hand-offs depend on somebody remembering",
        body:
          "A process that works because a specific person always remembers to forward the email is not a process. It is a single point of failure with a name.",
        stat: {
          value: "40–120",
          note: "hours of manual work per month typically removed by SME automation programmes",
          source: "ustech",
        },
      },
      {
        title: "Nobody knows where the time actually goes",
        body:
          "Ask which task consumes the most hours and answers vary wildly. Without measuring first, automation gets pointed at whatever annoys the loudest person.",
      },
    ],
    approach: [
      {
        title: "Measure before automating",
        body:
          "A short audit of where hours actually go — by task, by frequency, by person. Automating a five-minute weekly task feels productive and changes nothing.",
      },
      {
        title: "Fix the process before encoding it",
        body:
          "Automating a bad workflow just makes the mess arrive faster. We simplify the steps first, then build.",
      },
      {
        title: "Connect the systems you already have",
        body:
          "Forms, CRM, WhatsApp, Tally, Zoho, Shopify, payment gateways, sheets. Integration usually beats replacement on both cost and disruption.",
      },
      {
        title: "Build in error handling",
        body:
          "Retries, alerts and a visible failure log. An automation that fails silently is worse than the manual step it replaced, because nobody notices for a week.",
      },
      {
        title: "Document and hand over",
        body:
          "Every automation documented in plain language, with an owner. You should never be dependent on us to understand your own operations.",
      },
    ],
    deliverables: [
      "Time-and-motion audit of manual tasks",
      "Prioritised automation roadmap by hours saved",
      "Integrations between your existing systems",
      "Automated data capture, routing and notification flows",
      "Approval workflows with audit trails",
      "Scheduled reports and reconciliation jobs",
      "Error handling, alerting and a failure log",
      "Plain-language documentation with named owners",
    ],
    different: [
      {
        title: "We quote in hours saved",
        body:
          "Each automation carries an estimate of the time it removes, so you can see payback rather than take it on trust.",
      },
      {
        title: "We refuse the low-value ones",
        body:
          "If a task takes ten minutes a month, we will tell you it is not worth automating — even though building it would be easy money.",
      },
      {
        title: "You are not locked in",
        body:
          "Built on tools you own and documented for handover. If you stop working with us, the automations keep running and someone else can maintain them.",
      },
    ],
    signals: [
      { label: "Hours removed per month, typical SME", value: "40–120", source: "ustech" },
      { label: "Payback on right-fit workflows", value: "60–90 days", source: "ustech" },
      { label: "Finance reconciliation time saved", value: "30–40%", source: "techvaria" },
      { label: "Every automation ships with", value: "An owner and documentation" },
    ],
    faqs: [
      {
        q: "What should we automate first?",
        a: "Whatever is high-frequency, rule-based and currently done by a person copying between two systems. Order entry, lead routing, invoice creation and status notifications are the usual first four — but we measure rather than assume.",
      },
      {
        q: "Do we need to replace our current tools?",
        a: "Almost never. Most of the value comes from connecting what you already have. Replacement is a much bigger project and rarely the actual constraint.",
      },
      {
        q: "What happens when an automation breaks?",
        a: "You get an alert, the failure is logged, and there is a documented manual fallback. Silent failure is the main risk in automation, so we design against it explicitly.",
      },
    ],
    cta: {
      headline: "Find out where the hours go.",
      body:
        "We'll audit your manual work and come back with a ranked list of what to automate and what it saves.",
    },
    related: ["integrations", "crm", "erp", "ai-agents"],
    sources: ["ustech", "techvaria"],
  },

  // ── 07 ────────────────────────────────────────────────────────
  {
    slug: "dashboards",
    pillar: "technology",
    title: "Dashboards & BI",
    summary: "Numbers you can act on, in one place, that everyone agrees are correct.",
    lede:
      "Most reporting problems are not visualisation problems. They are definition problems: two departments count revenue differently, nobody agrees what an active customer is, and the meeting is spent reconciling numbers rather than deciding anything. A dashboard built on undefined metrics just makes the disagreement faster.",
    pain: [
      {
        title: "Every meeting starts by arguing about the numbers",
        body:
          "Sales, finance and marketing each bring a different figure for the same thing. Half the meeting is spent reconciling, and the actual decision gets deferred.",
      },
      {
        title: "The monthly report is assembled by hand",
        body:
          "Someone spends two days a month exporting, pasting and formatting. It is late by the time it arrives, and stale by the time it is read.",
      },
      {
        title: "Dashboards nobody opens",
        body:
          "Built once, full of everything, answering no specific question. A dashboard that does not change a decision is decoration.",
      },
    ],
    approach: [
      {
        title: "Define the metrics before building anything",
        body:
          "Written definitions, agreed across departments, with the calculation stated. This is the unglamorous step that makes everything after it work.",
      },
      {
        title: "Consolidate the sources",
        body:
          "CRM, ads, website, ERP, accounting and sheets pulled into one place on a schedule, with the joins handled properly rather than by VLOOKUP.",
      },
      {
        title: "Build per audience, not per department",
        body:
          "A leadership view answering five questions, an operating view for the people running the week, and detail underneath for whoever needs to dig.",
      },
      {
        title: "Design for decisions",
        body:
          "Every chart has to earn its place by changing something. If nobody can name the decision a number informs, it comes out.",
      },
      {
        title: "Automate the delivery",
        body:
          "Scheduled to inbox or WhatsApp on the cadence the business runs on. The report that arrives is read; the one you have to log in for is not.",
      },
    ],
    deliverables: [
      "Written metric definitions agreed across teams",
      "Data pipeline from CRM, ads, ERP, accounting and sheets",
      "Leadership dashboard answering the five key questions",
      "Operating dashboards for sales, marketing and operations",
      "Cohort, trend and margin views",
      "Alerting on thresholds that matter",
      "Scheduled report delivery to inbox or WhatsApp",
      "Documentation of every source and calculation",
    ],
    different: [
      {
        title: "Definitions before dashboards",
        body:
          "We will not build until the metrics are agreed in writing. It is the step that everyone wants to skip and the one that decides whether the dashboard is trusted.",
      },
      {
        title: "Fewer charts, deliberately",
        body:
          "A leadership view should fit on one screen and answer a handful of questions. Everything else lives one click down.",
      },
      {
        title: "Built in your stack",
        body:
          "Your data warehouse, your BI tool, your credentials. Nothing important lives in an agency account.",
      },
    ],
    signals: [
      { label: "First step", value: "Written metric definitions" },
      { label: "Leadership view", value: "One screen, five questions" },
      { label: "Delivery", value: "Scheduled, not on request" },
      { label: "Ownership", value: "Your tools and credentials" },
    ],
    faqs: [
      {
        q: "Which BI tool should we use?",
        a: "For most mid-sized businesses, Looker Studio or Metabase does everything needed at a fraction of the cost of an enterprise licence. We recommend based on your data volume and who needs access, not on what is fashionable.",
      },
      {
        q: "Do we need a data warehouse?",
        a: "Not always. Below a certain volume, direct connections are simpler and cheaper. Once you are joining several sources with real history, a warehouse stops being optional — we will tell you when you cross that line.",
      },
      {
        q: "How long does this take?",
        a: "Two to five weeks typically. Metric definition and data cleanup take most of it; building the visuals is the fast part. If the underlying data is messy, cleaning comes first and we will say so up front.",
      },
    ],
    cta: {
      headline: "Agree the numbers first.",
      body:
        "We'll run the metric-definition session, connect your sources, and build the view your leadership meeting actually needs.",
    },
    related: ["pipeline-reporting", "erp", "crm", "integrations"],
    sources: [],
  },

  // ── 08 ────────────────────────────────────────────────────────
  {
    slug: "integrations",
    pillar: "technology",
    title: "Integrations",
    summary: "Tally, Zoho, Shopify, payment gateways — connected so data moves once.",
    lede:
      "Indian businesses run on a particular mix: Tally for accounts, WhatsApp for conversations, Shopify or a marketplace for sales, a CRM someone set up in 2021, and a lot of spreadsheets. None of it talks. Integration is the least glamorous work we do and frequently the highest return, because it removes an entire category of manual labour permanently.",
    pain: [
      {
        title: "The same order is entered in four places",
        body:
          "Marketplace, CRM, Tally, dispatch sheet. Each entry costs minutes and introduces the possibility that the four disagree — which is discovered at month end.",
      },
      {
        title: "Reconciliation is a monthly ritual",
        body:
          "Days spent matching payments to orders to invoices because no two systems share an identifier. Finance teams commonly recover a third or more of this time once the systems are properly connected.",
        stat: {
          value: "30–40%",
          note: "reduction in routine reconciliation and reporting time in well-integrated finance environments",
          source: "techvaria",
        },
      },
      {
        title: "Point-to-point patches that break quietly",
        body:
          "A script someone's cousin wrote, a Zapier task that hit its limit, an export nobody realised had stopped. Fragile integrations fail without announcing it.",
      },
    ],
    approach: [
      {
        title: "Map the data, not just the tools",
        body:
          "Which system owns which field, what the shared identifier is, and what happens when two sources disagree. Integrations fail on conflict rules far more often than on connectivity.",
      },
      {
        title: "Pick the right integration pattern",
        body:
          "Real-time where it matters, scheduled batch where it doesn't. Not everything needs to be instant, and pretending otherwise makes systems fragile and expensive.",
      },
      {
        title: "Handle Indian-stack realities",
        body:
          "Tally's connector quirks, GST and e-way bill requirements, payment gateway webhooks and reconciliation formats. We have done these before and know where they bite.",
      },
      {
        title: "Build observability in",
        body:
          "Logging, retries, alerting and a sync status anyone can check. You should know an integration broke before a customer tells you.",
      },
      {
        title: "Document the contract",
        body:
          "What syncs, in which direction, how often, and what to do when it fails. Written for whoever maintains it next.",
      },
    ],
    deliverables: [
      "Systems and data-flow map with field-level ownership",
      "Tally integration for orders, invoices and payments",
      "Zoho, HubSpot or Salesforce CRM sync",
      "Shopify, WooCommerce and marketplace connections",
      "Payment gateway and bank reconciliation flows",
      "WhatsApp Business API integration",
      "GST and e-way bill data handling",
      "Monitoring, alerting and sync-status visibility",
    ],
    different: [
      {
        title: "We define conflict rules explicitly",
        body:
          "When two systems disagree, the behaviour is decided in advance and written down. Most integration bugs are actually undefined conflict rules.",
      },
      {
        title: "Built to be monitored",
        body:
          "Every sync is observable, with alerting on failure. Silent breakage is the defining failure mode of integration work and it is entirely preventable.",
      },
      {
        title: "We know the Indian stack",
        body:
          "Tally, GST, e-way bills, UPI settlement files, marketplace exports. Generic integration shops learn these on your project; we have already paid that tuition.",
      },
    ],
    signals: [
      { label: "Reconciliation time saved", value: "30–40%", source: "techvaria" },
      { label: "Typical SME hours removed monthly", value: "40–120", source: "ustech" },
      { label: "Every sync ships with", value: "Logging and failure alerts" },
      { label: "Conflict rules", value: "Defined before build" },
    ],
    faqs: [
      {
        q: "Can you integrate with Tally?",
        a: "Yes — orders, invoices, payments and ledger entries, in the direction that suits your accountant. It is one of the most common requests we get and we treat Tally as a system to work with rather than replace.",
      },
      {
        q: "Is Zapier enough?",
        a: "For simple, low-volume connections, often yes, and we will happily set that up rather than overbuild. Once volume rises or logic gets conditional, per-task pricing and limited error handling become the constraint, and a proper integration is cheaper.",
      },
      {
        q: "What happens if an API changes?",
        a: "Monitoring catches the failure, we get alerted, and it is fixed under the support arrangement. This is exactly why we build observability in rather than assuming things keep working.",
      },
    ],
    cta: {
      headline: "Stop entering the same data twice.",
      body:
        "Tell us which systems you run. We'll map the flows and show you what can be connected first.",
    },
    related: ["automation", "erp", "crm", "support"],
    sources: ["techvaria", "ustech", "pragyantra"],
  },

  // ── 09 ────────────────────────────────────────────────────────
  {
    slug: "support",
    pillar: "technology",
    title: "AMC & Support",
    summary: "We stay after launch — because software that isn't maintained stops working.",
    lede:
      "The riskiest moment in a software project is three months after handover, when the build team has gone, dependencies have moved on, and nobody owns the thing. An annual maintenance arrangement is not an upsell; it is the difference between an asset and a liability with a countdown on it.",
    pain: [
      {
        title: "The agency that built it has moved on",
        body:
          "Something breaks, and the people who understood it are unreachable or quoting a discovery fee to relearn their own code.",
      },
      {
        title: "Nobody is watching until a customer complains",
        body:
          "No uptime monitoring, no error alerting, no log review. The first signal that something is wrong arrives from the person it went wrong for.",
      },
      {
        title: "Security and dependency debt accumulates silently",
        body:
          "Unpatched packages, expiring certificates, deprecated APIs, an SSL renewal nobody diarised. None of it announces itself until it takes the site down.",
      },
    ],
    approach: [
      {
        title: "Monitor continuously",
        body:
          "Uptime, error rates, performance and certificate expiry watched around the clock, with alerting that reaches a human.",
      },
      {
        title: "Patch on a schedule",
        body:
          "Dependencies and security updates applied on a defined cadence with a staging check first, rather than in a panic after an incident.",
      },
      {
        title: "Respond against a stated SLA",
        body:
          "Severity levels with response and resolution targets written into the agreement, so 'urgent' means the same thing to both of us.",
      },
      {
        title: "Back up and rehearse the restore",
        body:
          "Automated backups, off-site, with periodic restore tests. An untested backup is a hypothesis, not a safety net.",
      },
      {
        title: "Keep a small change budget",
        body:
          "Included hours each month for the small improvements that otherwise queue up behind a formal project and never happen.",
      },
    ],
    deliverables: [
      "Uptime, error and performance monitoring with alerting",
      "Scheduled dependency and security patching",
      "SSL, domain and certificate renewal management",
      "Automated backups with periodic restore testing",
      "Defined SLA by severity level",
      "Included change hours each month",
      "Quarterly health and performance review",
      "Documentation kept current as the system changes",
    ],
    different: [
      {
        title: "We test the restores",
        body:
          "Backups that have never been restored are a guess. We verify them on a schedule and report the result.",
      },
      {
        title: "Included hours, not just firefighting",
        body:
          "Every plan carries change hours, so small improvements actually ship instead of waiting for a project that never gets approved.",
      },
      {
        title: "We support systems we didn't build",
        body:
          "After an audit and a documentation pass. Being stranded by a previous vendor is the single most common reason clients come to us.",
      },
    ],
    signals: [
      { label: "Monitoring", value: "24/7, alerting to a human" },
      { label: "Patching", value: "Scheduled, staged first" },
      { label: "Backups", value: "Automated, restore-tested" },
      { label: "SLA", value: "Defined per severity, in writing" },
    ],
    faqs: [
      {
        q: "What does an AMC actually cover?",
        a: "Monitoring, patching, backups, incident response to an agreed SLA, and a block of change hours each month. New features beyond those hours are quoted separately — we will always tell you which bucket a request falls into before doing the work.",
      },
      {
        q: "Will you support a system another agency built?",
        a: "Usually, yes. We start with an audit and a documentation pass so we understand what we are taking on, and we will be straightforward if we find something we think should be rebuilt rather than maintained.",
      },
      {
        q: "What is your response time?",
        a: "Set by severity in the agreement — critical issues taking a system down are treated very differently from a cosmetic bug. We would rather define that precisely up front than rely on a shared sense of urgency.",
      },
    ],
    cta: {
      headline: "Stop being one incident from a crisis.",
      body:
        "We'll audit what you are running, tell you what is unmonitored or unpatched, and cover it properly.",
    },
    related: ["websites", "integrations", "erp", "mobile-apps"],
    sources: [],
  },
];
