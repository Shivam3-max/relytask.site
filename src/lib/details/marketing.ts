import type { ServiceDetail } from "../service-detail";

export const MARKETING_DETAILS: ServiceDetail[] = [
  // ── 01 ────────────────────────────────────────────────────────
  {
    slug: "content-strategy",
    pillar: "marketing",
    title: "Content Strategy",
    summary:
      "The plan that decides what gets made, for whom, and what it is supposed to do.",
    lede:
      "Most brands don't have a content problem. They have a decision problem — nobody has decided who the content is for, what it should make that person believe, or how anyone will know whether it worked. So the calendar fills with whatever is easiest to shoot that week, and twelve months later there is a lot of content and no compounding.",
    pain: [
      {
        title: "You're producing on instinct, not on a thesis",
        body:
          "Posting resumes every time someone notices the feed has gone quiet. There is no through-line, so nothing accumulates — each post starts the argument from zero instead of building on the last one.",
      },
      {
        title: "Reach keeps falling and volume doesn't fix it",
        body:
          "Organic reach has been squeezed hard enough that pushing more posts through the same strategy just produces more posts nobody sees. Format and premise now decide performance far more than frequency does.",
        stat: {
          value: "~3.5%",
          note: "of followers reached by the average Instagram post, down from 10–15% in 2020",
          source: "outfame",
        },
      },
      {
        title: "Nobody can say what content is for",
        body:
          "Ask three people in the business what a post is meant to achieve and you get three answers: awareness, recruitment, and 'the founder wanted it up'. Without an assigned job per format, you cannot judge anything and you cannot cut anything.",
      },
    ],
    approach: [
      {
        title: "Audience and belief mapping",
        body:
          "We write down exactly who we are talking to, what they currently believe, and the one belief we need to shift. Everything downstream is judged against that shift — not against likes.",
      },
      {
        title: "Pillar and format architecture",
        body:
          "Three to five content pillars, each with a defined job: attract, prove, convert, or retain. Each pillar gets the formats that actually suit it, so proof pieces are not fighting for attention as fifteen-second hooks.",
      },
      {
        title: "A calendar built around production reality",
        body:
          "We plan to the shoot days you can genuinely staff. A quarter of content is batched from a handful of sessions, which is what makes consistency survive a busy month.",
      },
      {
        title: "Distribution written into the plan",
        body:
          "Every asset ships with its cutdowns, captions, and the channels it will be repurposed into. Content that is planned to be distributed four ways costs barely more than content planned once.",
      },
      {
        title: "Quarterly review against the thesis",
        body:
          "We keep what earns its place and kill what doesn't — publicly, in a document, with the reasoning recorded so the same idea doesn't come back in six months.",
      },
    ],
    deliverables: [
      "Audience and belief map, written",
      "Content pillars with an assigned job per pillar",
      "Format matrix — what gets made, in what shape, how often",
      "Rolling 90-day calendar, batched to real shoot days",
      "Hook and headline bank per pillar",
      "Distribution and repurposing rules per asset",
      "Measurement sheet with the metric that matters per pillar",
      "Quarterly strategy review and rewrite",
    ],
    different: [
      {
        title: "The strategy names what we will not do",
        body:
          "A plan that only adds is not a plan. Ours specifies the formats, topics and channels we are deliberately skipping, so the team stops relitigating them every month.",
      },
      {
        title: "It is costed before it is approved",
        body:
          "Every pillar carries a production cost and a time cost. You approve a plan you can actually afford to run, not an aspirational one that collapses in week six.",
      },
      {
        title: "Same roof as the people who execute it",
        body:
          "Our strategists sit beside the team shooting and editing. Strategy that cannot be produced gets caught in the room, not three weeks into the quarter.",
      },
    ],
    signals: [
      { label: "Instagram engagement rate, all formats", value: "0.45% average", source: "socialinsider" },
      { label: "Carousels vs Reels engagement", value: "0.55% vs 0.52%", source: "socialinsider" },
      { label: "Static image engagement", value: "0.37% — lowest format", source: "socialinsider" },
      { label: "Planning horizon we work to", value: "90 days, batched" },
    ],
    faqs: [
      {
        q: "How long before a content strategy shows results?",
        a: "Distribution and format fixes usually move within four to six weeks because they change what the algorithm is given to work with. The belief-shift work — being the brand a buyer already trusts before the first call — takes two to three quarters. We report both separately so you are not told a slow number is a fast one.",
      },
      {
        q: "Do you write the content too, or only the plan?",
        a: "Either. Some clients take the strategy and run it with an in-house team, and we review quarterly. Most have us produce as well, because the plan survives contact with reality better when the people who wrote it also have to shoot it.",
      },
      {
        q: "We already post every day. Why would we need this?",
        a: "Frequency is rarely the constraint. If daily posting isn't compounding, the usual causes are that every post is doing the same job, that the formats don't match the intent, or that nothing is being repurposed. A strategy audit finds which of the three it is before you spend more.",
      },
    ],
    cta: {
      headline: "Get the thesis on paper first.",
      body:
        "We'll audit what you have been publishing, tell you what it is actually doing, and show you the plan we would run instead.",
    },
    related: ["production", "social-media", "organic-growth", "seo"],
    sources: ["outfame", "socialinsider"],
  },

  // ── 02 ────────────────────────────────────────────────────────
  {
    slug: "production",
    pillar: "marketing",
    title: "Production & Shoots",
    summary:
      "Studio, product, founder and event content — batched so the calendar never runs dry.",
    lede:
      "The reason most content calendars fail is not creative. It is logistics. One shoot gets postponed, the buffer runs out, and the brand goes quiet for three weeks. We produce in batches with a working buffer, so a bad week never becomes a silent month.",
    pain: [
      {
        title: "One expensive asset, nothing to test with",
        body:
          "A single polished film eats the quarter's budget and gives the algorithm exactly one thing to learn from. Volume and variety are what let paid media find a winner; one hero asset cannot.",
      },
      {
        title: "Polished brand film reads as an advertisement",
        body:
          "Audiences scroll past anything that looks like a commercial. Creator-style and founder-led footage keeps performing while the studio spot stalls — which is why creator content is now bought as performance creative, not as sponsorship.",
        stat: {
          value: "79%",
          note: "higher conversion for user-generated content than brand-created content",
          source: "nprdesign",
        },
      },
      {
        title: "Nothing gets repurposed, so everything gets reshot",
        body:
          "Footage is shot for one placement and then abandoned. The same day of shooting could have produced a month of verticals, stills, carousels and ad cutdowns if it had been planned that way on the callsheet.",
      },
    ],
    approach: [
      {
        title: "Shot list built backwards from the calendar",
        body:
          "We start from the posts and ads that need to exist next quarter, then design the shoot day that produces all of them. The callsheet is a manifest, not a mood.",
      },
      {
        title: "Batch days, not one-offs",
        body:
          "Four to six weeks of content per session. Setup, crew and travel are the expensive parts — amortising them across a batch is what brings the per-asset cost down without cheapening the output.",
      },
      {
        title: "Two registers on every shoot",
        body:
          "Polished brand footage for the places that need authority, and raw, creator-style capture for the places that need to feel human. Shot on the same day, cut differently.",
      },
      {
        title: "Cutdowns planned on the day",
        body:
          "Every hero asset ships with its 9:16, 1:1, 6-second and static derivatives. Framing accounts for all of them while the subject is still in front of the camera.",
      },
      {
        title: "Delivered into an organised library",
        body:
          "Named, tagged, and handed over in a structure your team can search a year later. You own the raw files, not just the exports.",
      },
    ],
    deliverables: [
      "Pre-production: shot list, callsheet, props and location",
      "Batch shoot days — studio, product, founder or event",
      "Hero edits in your brand's grade and type system",
      "Vertical, square and static cutdowns of every asset",
      "Paid-media variants built for testing, not just for looks",
      "Subtitled and sound-off-safe versions",
      "Organised, tagged asset library with raw footage handed over",
      "Usage rights, fully yours, in writing",
    ],
    different: [
      {
        title: "We shoot for the media plan, not the showreel",
        body:
          "Every asset is briefed against where it will run and what it has to beat. Beautiful footage that no channel asked for is a cost, not an achievement.",
      },
      {
        title: "Cost per usable asset, not cost per day",
        body:
          "We quote against how many finished, publishable pieces you end up with. It is the only number that lets you compare production quotes honestly.",
      },
      {
        title: "You keep the raws",
        body:
          "Everything shot for you is handed over. No hostage footage, no re-licensing conversation in eighteen months.",
      },
    ],
    signals: [
      { label: "Content produced per batch day", value: "4–6 weeks of calendar" },
      { label: "Nano creator rate, India", value: "₹2,000–10,000 per post", source: "nprdesign" },
      { label: "Micro creator rate, India", value: "₹10,000–50,000 per post", source: "nprdesign" },
      { label: "Formats delivered per hero asset", value: "9:16, 1:1, 6s, static" },
    ],
    faqs: [
      {
        q: "Do we need a studio, or can you shoot at our office?",
        a: "Both work. Founder-led and creator-style content often performs better shot in your real space — it reads as true. We use a studio when the product needs controlled light, or when the brand needs footage that will still look current in two years.",
      },
      {
        q: "How far in advance do you need to plan a shoot?",
        a: "Two to three weeks for a standard batch day, longer if we are casting creators, building sets or shooting on location. Event coverage we can turn around faster.",
      },
      {
        q: "Can you work with footage we already have?",
        a: "Yes. A surprising amount of what clients need already exists as unused footage. We will audit the library first — it is usually cheaper to cut what you have than to reshoot it.",
      },
    ],
    cta: {
      headline: "Book one batch day and see the difference.",
      body:
        "Tell us what the next quarter needs to look like. We'll come back with a shot list and a cost per finished asset.",
    },
    related: ["content-strategy", "influencer-ugc", "social-media", "performance-marketing"],
    sources: ["nprdesign", "influentials"],
  },

  // ── 03 ────────────────────────────────────────────────────────
  {
    slug: "social-media",
    pillar: "marketing",
    title: "Social Media Management",
    summary:
      "Daily operations end to end — planning, publishing, community and reporting.",
    lede:
      "Social media management is an operations job wearing a creative costume. The creative is maybe a third of it. The rest is scheduling, approvals, replying inside the window that matters, catching the comment that is actually a sales enquiry, and reporting honestly at the end of the month.",
    pain: [
      {
        title: "Consistency collapses first",
        body:
          "Everyone can post for three weeks. The brands that compound are the ones still posting in month nine, at the same cadence, through a launch and a bad quarter. Consistency beats volume, and it is an operational problem, not a motivational one.",
      },
      {
        title: "Comments and DMs are where the leads leak out",
        body:
          "The most valuable thing on a post is often a buying question in the replies. If nobody owns that inbox with a response-time target, those enquiries quietly go to a competitor who answered faster.",
        stat: {
          value: "21x",
          note: "more likely to qualify a lead when the first response lands inside five minutes",
          source: "insidesales",
        },
      },
      {
        title: "Reporting measures the wrong things",
        body:
          "Follower count and impressions make a nice slide and tell you almost nothing. Saves, shares, profile visits and DMs are the metrics that actually precede revenue, and most reports don't carry them.",
      },
    ],
    approach: [
      {
        title: "One calendar, visible to everyone",
        body:
          "Planned a month ahead, with approvals built into the flow. You always know what is going out on Thursday and who signed it off.",
      },
      {
        title: "Format-led planning",
        body:
          "We plan by what each format is good at — carousels to teach and convert, Reels to reach, stories to stay present — rather than filling slots and hoping.",
      },
      {
        title: "Community managed to a response-time target",
        body:
          "Comments and DMs answered inside a committed window during working hours, with buying enquiries routed straight to your sales channel rather than parked in an inbox.",
      },
      {
        title: "Always-on listening for the obvious wins",
        body:
          "Tagged posts, competitor mentions, recurring questions. The questions your audience keeps asking are next month's content, for free.",
      },
      {
        title: "Monthly report you can argue with",
        body:
          "What we published, what performed, what we got wrong, and what changes next month. Including the posts that failed and why.",
      },
    ],
    deliverables: [
      "Monthly content calendar with approval flow",
      "Publishing across Instagram, LinkedIn, Facebook and YouTube",
      "Copywriting, captions, hashtags and alt text",
      "Story and short-form scheduling",
      "Community management to a stated response time",
      "Lead routing from comments and DMs into your CRM or WhatsApp",
      "Monthly performance report with commentary, not just charts",
      "Quarterly format and cadence review",
    ],
    different: [
      {
        title: "We treat DMs as pipeline, not admin",
        body:
          "Buying enquiries get routed to sales the same hour. Most agencies report on engagement while the enquiry sits unread — we instrument the handoff instead.",
      },
      {
        title: "We report our own misses",
        body:
          "Every monthly report names the posts that underperformed and what we changed because of them. An agency that never reports a miss is not measuring.",
      },
      {
        title: "One team, so content and ads share a brain",
        body:
          "Organic posts that perform get promoted into paid the same week, because the people running both sit together.",
      },
    ],
    signals: [
      { label: "Healthy Instagram engagement, niche accounts", value: "1.5–3%", source: "socialinsider" },
      { label: "Platform-average engagement", value: "0.45%", source: "socialinsider" },
      { label: "Reach trend, year on year", value: "−12%", source: "socialinsider" },
      { label: "What we commit to", value: "Same-day replies, working hours" },
    ],
    faqs: [
      {
        q: "Which platforms should we actually be on?",
        a: "Usually fewer than you are on now. We would rather run two channels properly than five badly. Which two depends on where your buyers already are — for most B2B that is LinkedIn plus one visual channel; for D2C it is Instagram plus YouTube.",
      },
      {
        q: "Do you handle replies outside working hours?",
        a: "Standard cover is working hours, IST, with a committed response window. Extended or weekend cover is available where the volume justifies it — for most clients an auto-acknowledgement plus a fast morning reply performs about as well.",
      },
      {
        q: "Who owns the accounts?",
        a: "You do, always. We work inside your accounts with delegated access. Nothing is held in an agency-owned asset that you would have to negotiate for later.",
      },
    ],
    cta: {
      headline: "Hand over the calendar.",
      body:
        "We'll take the planning, publishing, replies and reporting — and give you back the hours you currently spend chasing posts.",
    },
    related: ["content-strategy", "production", "organic-growth", "influencer-ugc"],
    sources: ["socialinsider", "insidesales"],
  },

  // ── 04 ────────────────────────────────────────────────────────
  {
    slug: "organic-growth",
    pillar: "marketing",
    title: "Organic Growth",
    summary: "Reach that compounds instead of resetting every time you stop paying.",
    lede:
      "Paid media rents attention. The moment the card stops, so does the traffic. Organic growth is the slower, cheaper asset underneath it — the searches, the saves, the shares, the people who already know who you are before the ad reaches them. It takes longer and it does not stop.",
    pain: [
      {
        title: "Everything you have is rented",
        body:
          "If every lead comes from paid, your cost of acquisition is set by an auction you don't control — and Meta CPMs in India have been climbing hard enough to make that a structural risk, not a quarterly annoyance.",
        stat: {
          value: "+23%",
          note: "year-on-year rise in Meta CPMs in India",
          source: "wittelsbach",
        },
      },
      {
        title: "Organic is treated as whatever is left over",
        body:
          "It gets the budget and attention that paid didn't use, which guarantees it never reaches the threshold where compounding starts. Organic under-resourced is organic wasted.",
      },
      {
        title: "No owned audience to fall back on",
        body:
          "No list, no community, no search presence. When the ad account gets restricted or costs spike, there is nothing underneath — and that is exactly when you need it.",
      },
    ],
    approach: [
      {
        title: "Find the demand that already exists",
        body:
          "Search volume, forum questions, comment sections, sales-call transcripts. We start with what people are already trying to find rather than what we would like them to want.",
      },
      {
        title: "Build the assets that answer it",
        body:
          "Pages, posts and video mapped to real queries and real objections — the ones your sales team hears in every second call.",
      },
      {
        title: "Compound formats first",
        body:
          "We prioritise formats with a long tail — search pages, evergreen carousels, YouTube — over formats that die in 48 hours, then use short-form to feed them.",
      },
      {
        title: "Build the owned list alongside it",
        body:
          "Email and WhatsApp opt-ins on the assets that earn attention, so reach you paid for once turns into reach you own.",
      },
      {
        title: "Double down on what earns",
        body:
          "Monthly, we cut the formats that aren't compounding and put the hours into the ones that are. Organic rewards concentration, not spread.",
      },
    ],
    deliverables: [
      "Demand and query research mapped to your funnel",
      "Evergreen content plan with a compounding-asset bias",
      "Search-mapped pages and posts",
      "Short-form programme that feeds the long-form assets",
      "Owned-list capture — email and WhatsApp opt-in",
      "Community and comment strategy",
      "Monthly compounding report: what is still earning from months ago",
      "Quarterly cut-and-concentrate review",
    ],
    different: [
      {
        title: "We report on the tail, not the spike",
        body:
          "Our monthly report shows what old content is still earning traffic and leads. That number is the whole point of organic and almost nobody reports it.",
      },
      {
        title: "Organic and paid are planned together",
        body:
          "Organic winners get paid budget; paid learnings tell organic what to make next. Run separately, both are worse.",
      },
      {
        title: "We build the list from day one",
        body:
          "Reach that you cannot contact again is a rental too. Capture is designed into every asset, not bolted on when someone remembers.",
      },
    ],
    signals: [
      { label: "Zero-click Google searches, early 2026", value: "68%", source: "searchengineland" },
      { label: "Meta CPM rise since 2023", value: "40–60%", source: "adamigo" },
      { label: "Instagram reach, average post", value: "~3.5% of followers", source: "outfame" },
      { label: "Horizon we plan against", value: "2–3 quarters" },
    ],
    faqs: [
      {
        q: "How long until organic replaces our ad spend?",
        a: "It usually doesn't replace it — it lowers what the ads have to carry. Expect measurable search and referral movement from month three, and a genuine dent in blended acquisition cost between months six and nine. Anyone promising faster is selling you paid results with an organic label.",
      },
      {
        q: "Is organic still worth it when most searches end without a click?",
        a: "Yes, but the goal shifts. With most searches ending on the results page, being the source that gets summarised and cited matters as much as being the link that gets clicked. We plan for both — see AI Search (GEO).",
      },
      {
        q: "Can you do this without us producing content every week?",
        a: "To a point. We can get a lot from restructuring what exists, capturing better, and fixing search. But compounding needs new material eventually — usually far less than people fear, provided it is the right material.",
      },
    ],
    cta: {
      headline: "Start building the asset you own.",
      body:
        "We'll show you which queries you could realistically win this year, and what it takes to hold them.",
    },
    related: ["seo", "ai-search", "content-strategy", "social-media"],
    sources: ["searchengineland", "adamigo", "wittelsbach", "outfame"],
  },

  // ── 05 ────────────────────────────────────────────────────────
  {
    slug: "performance-marketing",
    pillar: "marketing",
    title: "Performance Marketing",
    summary: "Meta and Google, run against contribution margin rather than vanity ROAS.",
    lede:
      "Media buying is now mostly a creative job. The platforms handle targeting and bidding better than any manual setup will, which means the variables you still control are the offer, the creative, and the page the click lands on. Agencies that only touch the ad account are optimising the smallest lever in the room.",
    pain: [
      {
        title: "Costs rise faster than conversion improves",
        body:
          "You are paying more for the same impressions every year. Without a creative pipeline producing genuinely new angles, the account slowly grinds down no matter how well it is managed.",
        stat: {
          value: "₹50–90",
          note: "typical Meta CPM in India — ₹100–200 for new D2C brands, with CPCs of ₹5–15",
          source: "wittelsbach",
        },
      },
      {
        title: "ROAS looks fine and the business isn't making money",
        body:
          "Reported ROAS counts returning customers, ignores returns, and takes credit for sales that would have happened anyway. Contribution margin after cost of goods, shipping and returns is the number that decides whether to scale.",
      },
      {
        title: "The landing page is nobody's job",
        body:
          "Ad spend is optimised to two decimal places while the page it points at loads slowly and buries the offer. The cheapest conversion-rate win almost always sits after the click, not before it.",
        stat: {
          value: "3x",
          note: "higher conversion for a page loading in 1 second versus 5 seconds",
          source: "solve",
        },
      },
    ],
    approach: [
      {
        title: "Fix the measurement before touching the budget",
        body:
          "Server-side events, deduplication, a defined attribution window, and a blended target you and we both agree on. If we cannot trust the numbers, everything after is guesswork with a spreadsheet.",
      },
      {
        title: "Structure the account simply",
        body:
          "Consolidated campaigns, broad targeting, clean exclusions. The platform learns faster when it isn't fighting fifteen overlapping audiences you built in 2022.",
      },
      {
        title: "Run a creative pipeline, not a creative event",
        body:
          "A fixed number of genuinely new angles into testing every month — different promise, different proof, different format. Not the same ad in a new colour.",
      },
      {
        title: "Own the landing experience",
        body:
          "We build and test the page too. Speed, offer clarity, form length, proof placement — the things that decide whether the click was worth buying.",
      },
      {
        title: "Scale on margin, cut on evidence",
        body:
          "Budget moves when contribution margin supports it, with agreed rules for when we scale and when we stop. No heroic overrides on a Friday.",
      },
    ],
    deliverables: [
      "Tracking and server-side event audit and rebuild",
      "Account restructure with clean naming and exclusions",
      "Monthly creative testing pipeline with new angles",
      "Landing pages built and iterated by us",
      "Offer and pricing-presentation testing",
      "Weekly optimisation and written commentary",
      "Blended acquisition-cost reporting, not just platform ROAS",
      "Monthly margin review and scale-or-stop decisions",
    ],
    different: [
      {
        title: "We are accountable for the page, not just the click",
        body:
          "Because we build the site, the funnel and the CRM, we can fix what happens after the ad. Most media buyers can only send you an email about it.",
      },
      {
        title: "We report blended, not just in-platform",
        body:
          "Platform ROAS flatters everyone. We show blended acquisition cost and contribution margin, including the months where the honest number is worse than the dashboard's.",
      },
      {
        title: "Creative volume is contractual",
        body:
          "A stated number of new concepts per month, produced in-house. The single most reliable predictor of account performance is how many real ideas get tested.",
      },
    ],
    signals: [
      { label: "E-commerce ROAS, typical", value: "3–5x; top performers 8x+", source: "wittelsbach" },
      { label: "Realistic first-month ROAS, new brand", value: "1.5–2.5x", source: "wittelsbach" },
      { label: "CPM saving, tier-2/3 geo expansion", value: "30–50%", source: "wittelsbach" },
      { label: "Conversion cost of load time", value: "~1% per 100ms", source: "digitalappliedSpeed" },
    ],
    faqs: [
      {
        q: "What is a realistic ROAS for us?",
        a: "It depends entirely on margin — an 8x ROAS on a thin-margin product can lose money while a 2.5x on a high-margin service prints it. We work backwards from your contribution margin to a target that means something, then hold ourselves to it.",
      },
      {
        q: "How much budget do we need to start?",
        a: "Enough for the platform to exit learning and for us to test honestly. Below roughly ₹1.5–2 lakh a month on a single channel, results are mostly noise and you are better off putting the money into offer and creative first.",
      },
      {
        q: "Will you work with our existing creative?",
        a: "Yes, and we will tell you which of it is worth running. But if the creative pipeline stops, the account plateaus — that is the constraint in nearly every underperforming account we inherit.",
      },
    ],
    cta: {
      headline: "Get an honest read on the account.",
      body:
        "We'll audit tracking, structure, creative and landing pages, and tell you which of the four is actually costing you money.",
    },
    related: ["cro", "production", "seo", "websites"],
    sources: ["wittelsbach", "adamigo", "solve", "digitalappliedSpeed"],
  },

  // ── 06 ────────────────────────────────────────────────────────
  {
    slug: "brand-identity",
    pillar: "marketing",
    title: "Brand & Identity",
    summary: "Name, mark, system and voice — built to be used, not admired.",
    lede:
      "A brand identity is not a logo. It is a set of decisions that stop your team arguing: what we are called, what we look like, what we sound like, and what we refuse to be. Made well, it makes every future piece of work faster. Made badly, it becomes a PDF nobody opens.",
    pain: [
      {
        title: "Every asset looks like a different company",
        body:
          "Three designers, four fonts, an unknown number of blues. The cumulative effect is a brand that never becomes recognisable, no matter how much you spend putting it in front of people.",
      },
      {
        title: "The guidelines exist and nobody follows them",
        body:
          "Usually because they were written for a design audience, not for the intern doing Tuesday's story. If the system doesn't come with templates and actual files, it will not survive contact with a deadline.",
      },
      {
        title: "You sound like your category, not like yourself",
        body:
          "Same three adjectives as every competitor. In a feed, indistinct positioning is indistinguishable from an ad, and gets scrolled past at the same rate.",
      },
    ],
    approach: [
      {
        title: "Position before you decorate",
        body:
          "Who it is for, what it replaces, what it costs you to say. We settle positioning first, because visual work made before that decision is just taste.",
      },
      {
        title: "Naming, where it's needed",
        body:
          "Candidate names screened for meaning, pronunciation across Indian languages, domain and trademark viability before anyone falls in love with one.",
      },
      {
        title: "Mark and system",
        body:
          "Logo, type scale, colour with contrast checked, grid, iconography, photography direction, motion behaviour. Designed as a system that generates work, not a hero lockup with a mood board attached.",
      },
      {
        title: "Voice, written as rules",
        body:
          "Not 'friendly yet professional'. Actual rules with real examples — how we open, what we never claim, how we handle a complaint, how we price in writing.",
      },
      {
        title: "Ship it as usable files",
        body:
          "Templates in the tools your team actually uses, exports in every format, and a guideline document short enough to be read.",
      },
    ],
    deliverables: [
      "Positioning statement and messaging hierarchy",
      "Naming exploration with trademark and domain screening",
      "Primary logo, variants and clear-space rules",
      "Colour system with accessibility contrast checked",
      "Type scale and pairing, with licensed webfonts",
      "Iconography, grid, photography and motion direction",
      "Voice and tone guide with worked examples",
      "Editable templates: social, deck, document, invoice, signage",
    ],
    different: [
      {
        title: "The system ships with templates",
        body:
          "A brand your team cannot execute at 6pm on a Friday is a brand that will quietly be abandoned. We hand over working files, not just rules about them.",
      },
      {
        title: "We check it against the places it will live",
        body:
          "Marks are tested at favicon size, on a delivery box, on a WhatsApp display picture and in a dark-mode feed before they are signed off.",
      },
      {
        title: "Voice is written by people who write your ads",
        body:
          "The tone guide is authored by the same team producing campaigns and outbound copy, so it survives contact with a sales sequence.",
      },
    ],
    signals: [
      { label: "Deliverable format", value: "Editable templates, not just PDFs" },
      { label: "Contrast standard", value: "WCAG AA on all core pairings" },
      { label: "Typical engagement", value: "4–7 weeks" },
      { label: "Handover", value: "Full source files, yours" },
    ],
    faqs: [
      {
        q: "Do we need a rebrand or a refresh?",
        a: "Refresh if the positioning is right and the execution has drifted — that is most cases, and it is far cheaper. Rebrand if the business has genuinely changed what it sells or who it sells to. We will tell you honestly which one you are looking at, including when the answer is neither.",
      },
      {
        q: "Can you work with our existing logo?",
        a: "Often that is the right call. A coherent system built around an established mark usually buys more recognition than a new mark that resets it.",
      },
      {
        q: "What happens after handover?",
        a: "You own everything outright. Most clients keep us on for the first quarter of application work — that is when the awkward cases surface and the system either holds or needs a decision.",
      },
    ],
    cta: {
      headline: "Make the brand usable.",
      body:
        "Send us what you have. We'll show you where it breaks, and what a system that holds together would look like.",
    },
    related: ["content-strategy", "websites", "production", "cro"],
    sources: [],
  },

  // ── 07 ────────────────────────────────────────────────────────
  {
    slug: "seo",
    pillar: "marketing",
    title: "SEO & Local SEO",
    summary: "Found where it counts — in the map pack, and in the searches that convert.",
    lede:
      "Search changed shape. Most queries now end without a click, AI summaries sit above the results, and for local businesses the three map results take the majority of the attention. Chasing generic rankings is the wrong game. Owning the searches with intent behind them, and the map pack in your city, is still very much the right one.",
    pain: [
      {
        title: "Rankings hold and traffic still falls",
        body:
          "You are position three and the clicks have gone anyway, because the answer now appears above you. Position is no longer a proxy for traffic and reporting on it hides the problem.",
        stat: {
          value: "68%",
          note: "of Google searches ended without a click in early 2026",
          source: "searchengineland",
        },
      },
      {
        title: "You are invisible in the map pack",
        body:
          "For anything local, the top three map results take most of the attention. If you are not in them, you are competing for what's left below the fold.",
        stat: {
          value: "42%",
          note: "of local search goes to the top three businesses in the Maps pack",
          source: "thestaccLocal",
        },
      },
      {
        title: "Traffic that was never going to buy",
        body:
          "Blog visits from queries with no commercial intent flatter a dashboard and fill no pipeline. Volume without intent is a vanity metric with extra steps.",
      },
    ],
    approach: [
      {
        title: "Technical foundation first",
        body:
          "Crawlability, indexation, site speed, structured data, internal linking. Unglamorous, and it caps everything else until it is fixed.",
      },
      {
        title: "Map to intent, not to volume",
        body:
          "We prioritise queries where someone is trying to buy, hire or compare. Fewer keywords, better ones, ranked against what they are actually worth to you.",
      },
      {
        title: "Google Business Profile run properly",
        body:
          "Categories, services, photos, posts, Q&A and a review engine that runs continuously. Profiles that stay active show up in the top three far more often than dormant ones.",
      },
      {
        title: "Pages that deserve the position",
        body:
          "Real answers, real specifics, real proof — including the pricing and comparison pages most competitors are too nervous to publish.",
      },
      {
        title: "Built to be cited, not just ranked",
        body:
          "Clean structure, quotable statistics and clear sourcing, so the AI summary sitting above the results has something to lift from you.",
      },
    ],
    deliverables: [
      "Technical SEO audit and fixes, implemented not just listed",
      "Intent-mapped keyword and page plan",
      "On-page optimisation across the money pages",
      "Google Business Profile optimisation and weekly posts",
      "Review generation workflow with request automation",
      "Local citation and NAP consistency cleanup",
      "Schema markup for organisation, service, FAQ and reviews",
      "Monthly reporting on rankings, map-pack position, calls and enquiries",
    ],
    different: [
      {
        title: "We report enquiries, not impressions",
        body:
          "Calls, direction requests, form fills. Impression counts go in the appendix where they belong.",
      },
      {
        title: "We implement, we don't file tickets",
        body:
          "Because we build sites too, the technical fixes actually ship. Most SEO retainers stall waiting on a developer who was never briefed.",
      },
      {
        title: "Local and AI search are treated as one job",
        body:
          "The structure that wins a map pack and the structure that gets cited by an AI answer overlap heavily. We do them together rather than selling them twice.",
      },
    ],
    signals: [
      { label: "Local pack CTR, top three", value: "~43%", source: "thestaccLocal" },
      { label: "Traffic uplift, 3-pack vs positions 4–10", value: "+126%", source: "digitalappliedLocal" },
      { label: "Profiles posting regularly", value: "3.1x more likely in top-3 maps", source: "digitalappliedLocal" },
      { label: "50+ reviews at 4.5★", value: "61% higher top-ranking chance", source: "digitalappliedLocal" },
    ],
    faqs: [
      {
        q: "How long does SEO take?",
        a: "Local and map-pack work often moves in four to eight weeks because the levers are direct. Competitive organic rankings take two to three quarters. Anyone quoting faster on a competitive term is either bidding on your brand name or buying links you will regret.",
      },
      {
        q: "Is SEO dead now that AI answers everything?",
        a: "The click-through game got much harder; the visibility game got more valuable. Brands cited in AI Overviews have been shown to earn meaningfully more organic clicks, not fewer. The work shifts from ranking pages to becoming the source that gets quoted.",
      },
      {
        q: "Do you buy backlinks?",
        a: "No. We earn coverage with content worth citing, digital PR, and genuine partnerships. Bought link networks are a liability with a delayed fuse, and we are not interested in handing you one.",
      },
    ],
    cta: {
      headline: "Find out what you could actually rank for.",
      body:
        "We'll audit the site and the map listing, and come back with the searches worth winning this year.",
    },
    related: ["ai-search", "organic-growth", "websites", "content-strategy"],
    sources: ["searchengineland", "thestaccLocal", "digitalappliedLocal", "dataslayer"],
  },

  // ── 08 ────────────────────────────────────────────────────────
  {
    slug: "ai-search",
    pillar: "marketing",
    title: "AI Search (GEO)",
    summary: "Getting cited by ChatGPT, Perplexity and Google's AI answers.",
    lede:
      "A growing share of buyers now ask an assistant instead of running a search. They get one answer with a handful of sources, and the brands inside that answer make the shortlist. Generative engine optimisation is the work of becoming one of those sources — different from SEO in what it optimises for, overlapping in how it is built.",
    pain: [
      {
        title: "You do not know whether you're being recommended",
        body:
          "Nobody in the business has checked what ChatGPT or Perplexity says when asked to recommend a provider in your category. If a competitor is named and you are not, you never find out — the buyer simply doesn't call.",
      },
      {
        title: "The answer replaces the visit",
        body:
          "Most AI search sessions end without anyone clicking through to a website. If your only strategy is ranking a page for a click that no longer happens, the strategy is already out of date.",
        stat: {
          value: "~93%",
          note: "of AI search sessions end without a click to a website",
          source: "superlines",
        },
      },
      {
        title: "Your content isn't shaped to be quoted",
        body:
          "Long, unsourced, undated pages built for a 2019 reader. Models lift specifics — figures, definitions, comparisons with clear attribution — and skip prose that commits to nothing.",
        stat: {
          value: "30–40%",
          note: "higher visibility in AI responses for content carrying statistics and citations",
          source: "demandlocal",
        },
      },
    ],
    approach: [
      {
        title: "Measure your current citation share",
        body:
          "We run the prompts your buyers would run, across ChatGPT, Perplexity and Google AI Overviews, and record who gets named. That baseline is the whole basis of the programme.",
      },
      {
        title: "Fix the citable substrate",
        body:
          "Clear headings, direct answers up top, defined terms, visible dates, sourced numbers, and schema. Make the page easy to quote correctly.",
      },
      {
        title: "Build the consensus signal",
        body:
          "Models look for agreement across independent sources before naming a brand confidently. Directories, comparison sites, forums, review platforms and earned coverage all feed that.",
      },
      {
        title: "Publish the pages nobody else will",
        body:
          "Honest comparisons, pricing, limitations, and 'who this is not for'. These are disproportionately what assistants quote, because they answer the question directly.",
      },
      {
        title: "Track it monthly and keep it fresh",
        body:
          "Citation share by prompt and platform, tracked over time. Recently updated pages earn noticeably more citations, so freshness is a scheduled task rather than an afterthought.",
      },
    ],
    deliverables: [
      "Citation baseline across ChatGPT, Perplexity and Google AI Overviews",
      "Prompt set covering how your buyers actually ask",
      "Answer-first restructuring of key pages",
      "Statistic, source and date layer added to core content",
      "Schema and structured-data implementation",
      "Comparison, pricing and alternatives pages",
      "Third-party presence plan — directories, reviews, forums, PR",
      "Monthly citation-share report by platform and prompt",
    ],
    different: [
      {
        title: "We measure citation share, not 'AI readiness'",
        body:
          "There is a lot of consultancy in this space that cannot show whether anything changed. We report the named-in-answer rate for a fixed prompt set, month over month.",
      },
      {
        title: "We publish the uncomfortable pages",
        body:
          "Pricing, honest comparisons, who you are wrong for. They are what gets quoted, and most competitors will not run them.",
      },
      {
        title: "Same team as your SEO",
        body:
          "The structural work overlaps heavily. Doing both together costs less than buying them from two vendors who each blame the other.",
      },
    ],
    signals: [
      { label: "ChatGPT share of AI referral traffic", value: "~78%", source: "superlines" },
      { label: "Perplexity growth, year on year", value: "+243%", source: "superlines" },
      { label: "Citations per response", value: "Perplexity 21.9 vs ChatGPT 10.4", source: "superlines" },
      { label: "Pages updated within 2 months", value: "28% more citations", source: "demandlocal" },
    ],
    faqs: [
      {
        q: "Is this just SEO with a new name?",
        a: "The plumbing overlaps — structure, schema, authority. The objective doesn't. SEO optimises to be clicked; GEO optimises to be quoted, including in answers that never send a visitor. You need both, and they are cheaper bought together.",
      },
      {
        q: "How do you prove it is working?",
        a: "A fixed set of buyer prompts, run monthly across the major assistants, with your named-in-answer rate tracked over time. It is not a perfect measure — model answers vary between runs — so we sample repeatedly and report the trend rather than a single lucky result.",
      },
      {
        q: "Can you guarantee we'll be recommended?",
        a: "No, and be wary of anyone who does. There is no submission form and no ranking to buy. What we can do is make you the easiest brand in your category to cite correctly, and show you whether that is moving.",
      },
    ],
    cta: {
      headline: "Find out what the assistants say about you.",
      body:
        "We'll run your category's buying prompts and send you the answers, with who got named and why.",
    },
    related: ["seo", "content-strategy", "organic-growth", "websites"],
    sources: ["superlines", "demandlocal", "dataslayer", "searchengineland"],
  },

  // ── 09 ────────────────────────────────────────────────────────
  {
    slug: "influencer-ugc",
    pillar: "marketing",
    title: "Influencer & UGC",
    summary: "Creators sourced, briefed, licensed and measured like a media buy.",
    lede:
      "Creator marketing stopped being a PR activity and became a creative supply chain. The brands winning at it are not the ones paying the biggest names — they are the ones running many small creators, licensing the good footage, and putting paid budget behind whatever performs.",
    pain: [
      {
        title: "Big-name deals that can't be measured",
        body:
          "One large fee, one post, a spike in impressions and no way to tell whether anything sold. Unrepeatable, unattributable, and impossible to justify twice.",
      },
      {
        title: "You paid for content you can't run as an ad",
        body:
          "The contract covered an organic post and nothing else. The best-performing asset of the quarter cannot legally be put behind paid spend, which is where nearly all of its value was.",
      },
      {
        title: "Sourcing and chasing eats the whole team",
        body:
          "Finding creators, negotiating, briefing, chasing drafts, collecting invoices. Done manually it is a full-time job, which is why most programmes quietly stop after one round.",
        stat: {
          value: "45.5%",
          note: "of influencer marketing spend expected to go to nano and micro creators in 2026",
          source: "nprdesign",
        },
      },
    ],
    approach: [
      {
        title: "Cast against the audience, not the follower count",
        body:
          "We shortlist on audience overlap, comment quality and past brand work. Nano and micro creators usually deliver better engagement per rupee than a mega name.",
      },
      {
        title: "Brief for a hypothesis",
        body:
          "Each creator is briefed on a specific angle we want to test, not a general vibe. That is what makes a batch of creator content readable as data rather than noise.",
      },
      {
        title: "License up front, always",
        body:
          "Paid usage rights, whitelisting and term negotiated before the shoot. Every asset we commission can legally be run as an ad on day one.",
      },
      {
        title: "Promote the winners",
        body:
          "The content that performs organically goes into paid the same week, run from the creator's handle where the rights allow. This is where most of the return actually comes from.",
      },
      {
        title: "Run it as a programme",
        body:
          "A standing roster, monthly cohorts, tracked performance per creator, and a clear renew-or-drop call. Not a one-off campaign that has to be rebuilt each time.",
      },
    ],
    deliverables: [
      "Creator sourcing, vetting and audience-quality checks",
      "Rate negotiation and contracting",
      "Angle-led creative briefs per creator",
      "Paid usage rights and whitelisting secured up front",
      "Draft review, revisions and approvals managed",
      "Performance tracking per creator and per angle",
      "Paid amplification of winning assets",
      "Monthly cohort report with renew-or-drop calls",
    ],
    different: [
      {
        title: "Every asset is licensed for paid",
        body:
          "We do not commission content we cannot advertise with. It is the single biggest source of wasted spend in creator programmes.",
      },
      {
        title: "We run it as media, not PR",
        body:
          "Cost per licensed asset and cost per acquisition, tracked per creator. Impressions are context, not the result.",
      },
      {
        title: "Roster, not one-offs",
        body:
          "Creators who perform get booked again. Rates improve, briefing gets faster, and output quality rises — none of which happens in one-off campaigns.",
      },
    ],
    signals: [
      { label: "UGC vs brand-created conversion", value: "+79%", source: "nprdesign" },
      { label: "Nano creator rate, India", value: "₹2,000–10,000 per post", source: "nprdesign" },
      { label: "Micro creator rate, India", value: "₹10,000–50,000 per post", source: "nprdesign" },
      { label: "What we license", value: "Paid usage on 100% of commissions" },
    ],
    faqs: [
      {
        q: "How many creators should we start with?",
        a: "Eight to twelve nano and micro creators in the first cohort. Enough to read a real signal on which angles work, cheap enough that a weak cohort is a lesson rather than a write-off.",
      },
      {
        q: "Do creators have to disclose paid partnerships?",
        a: "Yes. India's ASCI guidelines require clear, prominent disclosure on paid promotions, and we brief and check for it. Undisclosed advertising is a risk we will not take on your behalf.",
      },
      {
        q: "What if a creator's content underperforms?",
        a: "It is priced in — that is why we run cohorts rather than single bets. Underperformers are dropped at the end of the cycle and the budget shifts to whoever earned it.",
      },
    ],
    cta: {
      headline: "Build a creator roster that pays for itself.",
      body:
        "We'll cast a first cohort in your category and show you the angles worth testing.",
    },
    related: ["production", "performance-marketing", "social-media", "content-strategy"],
    sources: ["nprdesign", "influentials", "storika"],
  },

  // ── 10 ────────────────────────────────────────────────────────
  {
    slug: "cro",
    pillar: "marketing",
    title: "Conversion Optimisation",
    summary: "Fixing what happens after the click — the cheapest growth you can buy.",
    lede:
      "Doubling your conversion rate has exactly the same effect as doubling your traffic, and usually costs a fraction as much. Yet almost every budget goes into getting more people to a page nobody has seriously examined. CRO is the discipline of examining it.",
    pain: [
      {
        title: "The page is slow and it is costing sales",
        body:
          "Speed is not a technical nicety, it is a conversion input. The gap between a one-second and a five-second page is the difference between a working funnel and a leaking one.",
        stat: {
          value: "+32%",
          note: "increase in bounce probability when load time goes from 1s to 3s",
          source: "solve",
        },
      },
      {
        title: "The form asks for more than it has earned",
        body:
          "Eleven fields, a phone number, and a company size dropdown before anyone has been told the price. Every additional field is a chance to leave.",
        stat: {
          value: "2.4%",
          note: "average B2B contact-form conversion rate; strong performers exceed 5%",
          source: "digitalappliedLanding",
        },
      },
      {
        title: "Changes get made on opinion",
        body:
          "The loudest person in the meeting picks the headline. Without a test, you never learn anything — you just accumulate changes and hope.",
      },
    ],
    approach: [
      {
        title: "Instrument before you theorise",
        body:
          "Funnel analytics, session recordings, heatmaps and form-field drop-off. Most teams are guessing because nothing is actually measured at the step that fails.",
      },
      {
        title: "Fix the mechanical problems first",
        body:
          "Speed, mobile layout, broken states, error handling, form length. These are not tests, they are repairs, and they usually deliver the largest single jump.",
      },
      {
        title: "Rebuild the argument on the page",
        body:
          "Clear promise above the fold, proof next to the claim, pricing visible or honestly explained, objections handled in order. Most pages describe the product and never argue for it.",
      },
      {
        title: "Test the things worth testing",
        body:
          "Offer, headline, pricing presentation, form length, proof placement. Not button colours — at your traffic volume that test will never reach significance.",
      },
      {
        title: "Log every result, win or lose",
        body:
          "A running record of what we tried, what happened, and what we concluded. It is the asset that makes month twelve smarter than month one.",
      },
    ],
    deliverables: [
      "Analytics, heatmap and session-recording setup",
      "Funnel drop-off analysis by step and device",
      "Page speed and Core Web Vitals remediation",
      "Rewritten and rebuilt key landing pages",
      "Form and checkout simplification",
      "Prioritised test roadmap with expected impact",
      "A/B tests run to significance, with honest calls",
      "Running experiment log with conclusions",
    ],
    different: [
      {
        title: "We can ship the fix ourselves",
        body:
          "Most CRO consultancies hand you a report. We build the page, deploy it and test it — the recommendation and the implementation are the same invoice.",
      },
      {
        title: "We tell you when you can't test",
        body:
          "Below a certain traffic volume, A/B testing is theatre. We will say so, and put the effort into research and repairs that do not need significance to pay off.",
      },
      {
        title: "Losses are reported as loudly as wins",
        body:
          "Most tests fail — that is normal and it is how you learn. An agency showing you only winners is hiding the denominator.",
      },
    ],
    signals: [
      { label: "Strong B2B form conversion", value: "5%+", source: "digitalappliedLanding" },
      { label: "1s vs 5s page load", value: "3x conversion difference", source: "solve" },
      { label: "Mobile sites passing Core Web Vitals", value: "42%", source: "digitalappliedSpeed" },
      { label: "Conversion cost per 100ms", value: "~1%", source: "digitalappliedSpeed" },
    ],
    faqs: [
      {
        q: "How much traffic do we need for A/B testing?",
        a: "As a rough floor, a few hundred conversions a month per variant before results mean much. Below that we do research-led CRO — recordings, interviews, speed and clarity fixes — which does not need statistical power to be right.",
      },
      {
        q: "What kind of uplift is realistic?",
        a: "On a page that has never been optimised, the mechanical fixes alone often move things by a meaningful double-digit percentage. After that, gains get smaller and slower. Anyone promising a fixed multiple before looking at your funnel is guessing.",
      },
      {
        q: "Will you work on our existing site or rebuild it?",
        a: "We start where you are. If the platform makes speed or testing impossible, we will say so and cost a rebuild — but only after we have exhausted the cheaper fixes.",
      },
    ],
    cta: {
      headline: "Find where the funnel leaks.",
      body:
        "Send us the page and the analytics access. We'll come back with the drop-off, the cause, and what we'd change first.",
    },
    related: ["performance-marketing", "websites", "seo", "dashboards"],
    sources: ["solve", "digitalappliedSpeed", "digitalappliedLanding"],
  },
];
