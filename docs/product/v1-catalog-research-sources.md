# V1 Catalog — Research Sources & Discrepancy Log

> Status: Research pass complete (August 2026), pending Tommy's confirmation on flagged naming/location corrections. Companion to `docs/product/v1-editorial-catalog.md`. This is the audit trail for every fact populated in `src/data/developers.ts` and `src/data/projects.ts` — condensed from seven parallel research passes (one per developer), each using WebSearch/WebFetch against official developer sites, DLD/RERA where relevant, and reliable portals (Property Finder, Bayut, Gulf News, Khaleej Times, Arabian Business, Construction Week, Zawya).

## Rule applied when compiling data files

A fact was used as-is when a real source (official page or a reliable portal) stated it without contradiction. Where two sources genuinely disagreed on a number (price, payment split, handover date), the field was left empty/pending in the data files rather than guessing between them — flagged below. Nothing was invented.

## Naming/location corrections found (confirm before publishing)

| Catalog said | Confirmed official | Source |
|---|---|---|
| Enara Residence (Imtiaz) | **Enre Residence** (launched as "Inara Residence," renamed) | imtiaz.ae — old URL 301-redirects to the new name |
| Raw District 2 — Dubai South | **Downtown Jebel Ali, Sheikh Zayed Road** | imtiaz.ae official project page, Property Finder |
| The Meria Collection (Ellington) | **The Meriva Collection** | ellingtonproperties.ae |
| Everly Palace — Ras Al Khor (Ellington) | **Everly Place** — official location **MBR City / Meydan Horizon** | ellingtonproperties.ae; Zawya |
| DAMAC Islands 2 — location "DAMAC Islands," type "Townhouses" | Location **Dubailand**; type **Townhouses & Villas** | damacproperties.com, Bayut |

## Developer profiles — key sources

**Emaar** — emaar.com (about, founders-message, contact-us, brand page, FY2024 press release), en.wikipedia.org/wiki/Emaar_Properties. Pricing/payment-plan data on Valia, AEON and Park Lane was the weakest-verified area — Emaar's own project pages are JS-heavy and didn't reliably render pricing to a text fetch; Valia's price and payment plan are genuinely conflicting across sources and left MISSING.

**DAMAC** — damacproperties.com (via r.jina.ai proxy after Cloudflare 403s on direct fetch), damacgroup.com/mission-and-values, en.wikipedia.org/wiki/DAMAC_Properties, en.wikipedia.org/wiki/Hussain_Sajwani, Gulf News, Zawya. Note: DAMAC Group (parent) states 1982; DAMAC Properties (the actual developer entity) states 2002 on its own about page — 2002 used, since that's the entity in our catalog.

**Ellington** — ellingtonproperties.ae (about-us, contact-us, media-center news releases), Khaleej Times, Zawya, cbnme.com. Pricing/payment/handover for both Meriva Collection and Everly Place: not published by Ellington at research time (both are recent launches) — left MISSING rather than using unofficial broker estimates the sources themselves flagged as unofficial.

**Binghatti** — binghatti.com (about-us, project pages for Aquarise and Wraith, PR pages), Forbes, Forbes Middle East, mena.entrepreneur.com, en.wikipedia.org/wiki/Burj_Binghatti_Jacob_%26_Co_Residences. Aquarise pricing/payment/handover confirmed directly on Binghatti's own official project page. Wraith's payment plan and handover date are not on Binghatti's own page — sourced from Property Finder instead (no contradiction found).

**Imtiaz** — imtiaz.ae (about-us, contact-us, project pages, news/press), Khaleej Times, Gulf News, Construction Week Online, offplan-dubai.com, Property Finder, propsearch.ae. Two internal inconsistencies found on Imtiaz's own site: headquarters suite number ("204" vs "303," both on official pages) and DLRC spelled two ways — noted, not resolved. Enre Residence starting price genuinely conflicts (AED 673,000 vs AED 1,353,001 across sources) — left MISSING.

**Object 1** — object-1.com (confirmed as the correct domain over the similarly-named object1.com, which lists a different portfolio), gulfbusiness.com, mena.entrepreneur.com, cbnme.com, crunchbase.com, propsearch.ae, Property Finder, Bayut. Year founded is genuinely unresolved (2010/TSZ Group vs. 2022/Egor Maslennikov vs. March 2024 DLD registration) — left unset rather than picking one. No official logo file was locatable.

**Samana** — samanadevelopers.com (about, projects, press), gulfbusiness.com, entrepreneur.com, biztoday.news. Founding year unresolved (2018 project-launch narrative vs. third-party 2014/2016 claims vs. parent group's 1996) — left unset. SAMANA South Haven pricing and payment plan confirmed directly on Samana's own official project page.

## Fields intentionally left empty (not researchable, by design)

`whyITrustThem` (all 7 developers) and `whyIRecommend` (all 15 projects) are Tommy's personal judgment — no research substitutes for them. See `docs/design/projects-information-architecture.md` content integrity guardrails.

## Internal linking opportunities (compiled centrally, not per-developer)

- Each developer page → its own projects (`developerId` already models this)
- Each project page → its developer page, plus related projects sharing a `bestFor` tag (already built — see `getRelatedProjects` in `src/lib/projects.ts`)
- Homepage "Why Dubai" section (Golden Visa, RERA/DLD regulation) ↔ project pages with Golden Visa-eligible price points, once `bestFor` tags are populated per project
- About page (personal credibility, RERA-licensed brokerage) ↔ every developer page, since Tommy's `whyITrustThem` notes will reference the same licensing context
- Future Market Insights articles about specific districts (Dubai Creek Harbour, Business Bay, etc.) ↔ projects located there
