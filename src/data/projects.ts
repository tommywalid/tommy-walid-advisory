import type { Project } from "@/types/projects";

/**
 * Curated project listings (target: ~20–30 published at a time — see
 * docs/design/projects-information-architecture.md). This is a personal
 * recommendation list, not a market feed: every entry here should be one
 * Tommy has personally chosen to put in front of clients.
 *
 * Facts researched from official/reliable sources — full sourcing and every
 * flagged discrepancy in docs/product/v1-catalog-research-sources.md. Where
 * two sources genuinely conflicted on a number (price/payment/handover),
 * the field was left pending rather than guessing — never invented.
 *
 * Every entry is `published: false`. Nothing goes live until `whyIRecommend`
 * (and, for the developer, `whyITrustThem`) are written by Tommy — that's
 * personal judgment, not something research substitutes for — plus any
 * remaining pending facts are confirmed and real media is added.
 *
 * Renamed from the original catalog list per research (see corrections log
 * in docs/product/v1-catalog-research-sources.md): "Enara Residence" →
 * "Enre Residence"; "The Meria Collection" → "The Meriva Collection";
 * "Everly Palace" → "Everly Place"; Raw District 2's location corrected to
 * Downtown Jebel Ali (not Dubai South); DAMAC Islands 2's location
 * corrected to Dubailand with property type Townhouses & Villas.
 */

const emptyText = { fr: "", en: "" };
const pendingPrice = { amount: 0, currency: "AED" as const };
const pendingMedia = { cover: { url: "", type: "photo" as const }, gallery: [] };

function draftProject(
  overrides: Pick<Project, "slug" | "name" | "developerId" | "location" | "tier"> &
    Partial<Project>,
): Project {
  return {
    whyThisLocationMatters: emptyText,
    propertyTypes: [],
    startingPrice: pendingPrice,
    paymentPlan: emptyText,
    handover: "",
    bestFor: [],
    keyHighlights: [],
    whyIRecommend: emptyText,
    media: pendingMedia,
    featured: false,
    published: false,
    ...overrides,
  };
}

export const projects: Project[] = [
  // Tier A — Emaar
  draftProject({
    slug: "valia",
    name: "Valia",
    developerId: "emaar",
    location: "Dubai Creek Harbour",
    tier: "A",
    featured: true,
    propertyTypes: ["1-bed", "2-bed", "3-bed", "4-bed"],
    // startingPrice/paymentPlan left pending — sources conflict (AED 1.96M vs 2.06M; payment plan unconfirmed)
    handover: "Q4 2030",
    keyHighlights: [
      "Premium finishes",
      "Floor-to-ceiling glazing",
      "Individual balconies",
      "Dubai Creek and skyline views",
    ],
    amenities: [
      "Adult and kids' swimming pools",
      "Yoga deck",
      "BBQ area",
      "Private cabanas",
      "Outdoor fitness area",
      "Padel court",
      "Splash pad",
    ],
    nearbyLandmarks: [
      "Ras Al Khor Wildlife Sanctuary",
      "Vida Creek Harbour hotel",
      "Central Park",
      "Dubai Square Mall",
    ],
    overview: {
      fr: "",
      en: "A 56-storey residential tower in Dubai Creek Harbour, described by Emaar as a sophisticated landmark of contemporary living rising from a mixed-use podium, emphasizing wellbeing and connection to nature.",
    },
    officialSourceUrl: "https://www.emaar.com/en/properties/valia-at-dubai-creek-harbour",
  }),
  draftProject({
    slug: "aeon",
    name: "AEON",
    developerId: "emaar",
    location: "Dubai Creek Harbour",
    tier: "A",
    featured: true,
    propertyTypes: ["1-bed", "2-bed", "3-bed"],
    startingPrice: { amount: 1710000, currency: "AED" },
    paymentPlan: {
      fr: "",
      en: "10% down payment, 80% during construction (milestone instalments), 10% at handover.",
    },
    handover: "Q2 2028",
    keyHighlights: [
      "Architecture reinterpreting Dubai's heritage using raw materials",
      "Panoramic canal and skyline views",
      "Proximity to 4 metro stations and an RTA ferry terminal",
    ],
    amenities: [
      "Clubhouse and wellness hubs",
      "Gymnasium",
      "Beach Boulevard access",
      "Dual swimming pools",
      "Skate park",
      "Cycling track",
      "Sports courts",
      "EV charging",
    ],
    nearbyLandmarks: [
      "Ras Al Khor Wildlife Sanctuary",
      "Vida Creek Harbour hotel",
      "Address Creek Harbour",
      "Central Park",
      "Dubai Creek Marina",
    ],
    overview: {
      fr: "",
      en: "A twin-tower waterfront residential development in the Creek Beach district of Dubai Creek Harbour, marketed by Emaar as 'The Epitome of Urban Evolution.'",
    },
    officialSourceUrl: "https://www.emaar.com/en/properties/aeon",
  }),
  draftProject({
    slug: "park-lane",
    name: "Park Lane",
    developerId: "emaar",
    location: "Dubai Hills Estate",
    tier: "A",
    featured: true,
    propertyTypes: ["1-bed", "2-bed", "3-bed", "townhouse"],
    startingPrice: { amount: 1400000, currency: "AED" },
    paymentPlan: {
      fr: "",
      en: "10% down payment, approximately 70% during construction, 20% at handover.",
    },
    handover: "Q4 2028",
    keyHighlights: [
      "Vida-branded interiors",
      "Overlooks a championship golf course",
      "Positioned between Downtown Dubai and Dubai Marina",
    ],
    amenities: [
      "Infinity pool and pool deck",
      "Indoor/outdoor fitness centre",
      "Children's play area",
      "BBQ communal spaces",
      "Landscaped podium deck",
      "24-hour security",
    ],
    nearbyLandmarks: [
      "18-hole Championship Golf Course",
      "Dubai Hills Park",
      "Dubai Hills Mall",
      "54km community bicycle route",
    ],
    overview: {
      fr: "",
      en: "Park Lane – Interiors by Vida is a multi-building development in Dubai Hills Estate featuring Vida-branded interior design, positioned between Downtown Dubai and Dubai Marina.",
    },
    officialSourceUrl: "https://www.emaar.com/en/properties/park-lane",
  }),

  // Tier B — DAMAC
  draftProject({
    slug: "chelsea-residences",
    name: "Chelsea Residences",
    developerId: "damac",
    location: "Dubai Maritime City",
    tier: "B",
    propertyTypes: ["1-bed", "2-bed", "3-bed"],
    startingPrice: { amount: 2300000, currency: "AED" },
    paymentPlan: { fr: "", en: "20% down payment, 40% during construction, 40% on handover." },
    handover: "December 2029",
    keyHighlights: [
      "First Chelsea FC-branded residences",
      "Waterfront location with Arabian Gulf views",
      "Freehold ownership, Golden Visa eligible for qualifying purchases",
    ],
    amenities: [
      "Chelsea Lion Beach (blue-sand beach)",
      "Stamford Summit rooftop pitch",
      "Football Simulation Room",
      "Chelsea Athlete Performance Training Centre",
      "Infinity pools",
      "Underwater-themed kids play area",
      "Serenity Spa",
      "Outdoor gym",
    ],
    nearbyLandmarks: ["Port Rashid", "DIFC", "Downtown Dubai", "Bur Dubai"],
    overview: {
      fr: "",
      en: "The first football-branded residences developed in partnership with Chelsea Football Club — over 1,400 sea-facing apartments in Dubai Maritime City.",
    },
    officialSourceUrl: "https://www.damacproperties.com/en/projects/chelsea-residences/",
  }),
  draftProject({
    slug: "damac-islands-2",
    name: "DAMAC Islands 2",
    developerId: "damac",
    location: "Dubailand",
    tier: "B",
    propertyTypes: ["townhouse", "villa"],
    startingPrice: { amount: 2750000, currency: "AED" },
    paymentPlan: { fr: "", en: "20% at booking, 55% during construction, 25% on handover." },
    handover: "Q2 2030",
    keyHighlights: [
      "Set a reported Guinness World Record for single-day launch revenue (Nov 2025)",
      "Golden Visa eligible for qualifying purchases",
      "8 island-themed clusters",
    ],
    amenities: [
      "Tranquil Lake & Eco Park",
      "Whispering Waterfall",
      "Botanic Garden",
      "Island Vida Wellness",
      "Sky Woods Adventure",
      "Eco Lodge Hospitality",
      "Private beaches",
    ],
    nearbyLandmarks: [
      "Village Community Mall",
      "Dubai Polo & Equestrian Club",
      "Global Village",
      "Al Qudra Desert",
      "Expo City",
    ],
    overview: {
      fr: "",
      en: "Phase 2 of DAMAC's island-themed waterfront master community in Dubailand — an 'eco-luxury' community of 8 island-themed clusters, offering 4–6 bedroom townhouses and villas.",
    },
    officialSourceUrl:
      "https://www.damacproperties.com/en/communities/damac-islands-2-community/projects/damac-islands-2/",
  }),

  // Tier B — Ellington
  draftProject({
    slug: "the-meriva-collection",
    name: "The Meriva Collection",
    developerId: "ellington",
    location: "Dubai Islands",
    tier: "B",
    propertyTypes: ["1-bed", "2-bed", "3-bed", "4-bed"],
    // startingPrice/paymentPlan/handover left pending — not published (recent Feb 2026 launch)
    keyHighlights: [
      "Direct beach access across all components",
      "Low-density waterfront master plan",
      "3- and 5-bedroom signature beachfront residences with private pools",
    ],
    amenities: [
      "Adult and kids' pools",
      "Dining areas and BBQ facilities",
      "Kids' play areas",
      "Lagoon water features",
      "Mini golf",
      "Paddle tennis court",
      "Pet park",
      "Jazz club",
    ],
    nearbyLandmarks: [
      "Dubai Islands Mall",
      "Dubai International Airport",
      "Museum of the Future",
      "Burj Khalifa / Dubai Mall",
    ],
    overview: {
      fr: "",
      en: "Ellington's first hospitality-led development — a beachfront residential community on Island B, Dubai Islands, combining residences with an integrated hotel component.",
    },
    officialSourceUrl:
      "https://ellingtonproperties.ae/en/property-for-sale/the-meriva-collection-dubai-islands",
  }),
  draftProject({
    slug: "everly-place",
    name: "Everly Place",
    developerId: "ellington",
    location: "Mohammed Bin Rashid City",
    tier: "B",
    propertyTypes: ["1-bed", "2-bed", "3-bed"],
    // startingPrice/paymentPlan/handover left pending — not published
    keyHighlights: [
      "Positioned around a crystal lagoon with amenities deck",
      "Curated art installations by local artists",
      "209 total residences",
    ],
    amenities: [
      "Bowling alley",
      "Sun loungers and cabanas",
      "Indoor and outdoor children's play areas",
      "Sauna with chromotherapy shower",
      "Fitness studio",
      "Yoga studio",
      "Club lounge overlooking the lagoon",
      "Outdoor cinema",
    ],
    nearbyLandmarks: [
      "Downtown Dubai",
      "Business Bay",
      "Dubai International Airport",
      "Burj Khalifa",
      "Ras Al Khor Wildlife Sanctuary",
    ],
    overview: {
      fr: "",
      en: "A 13-storey residential tower of 209 residences positioned around a crystal lagoon in Mohammed Bin Rashid City's Meydan Horizon sub-district.",
    },
    officialSourceUrl:
      "https://ellingtonproperties.ae/en/property-for-sale/everly-place-mohammed-bin-rashid-city",
  }),

  // Tier B — Binghatti
  draftProject({
    slug: "aquarise",
    name: "Aquarise",
    developerId: "binghatti",
    location: "Business Bay",
    tier: "B",
    propertyTypes: ["studio", "1-bed", "2-bed", "3-bed", "4-bed"],
    startingPrice: { amount: 1150999, currency: "AED" },
    paymentPlan: { fr: "", en: "20% on booking, 50% during construction, 30% on completion." },
    handover: "Q1 2027",
    keyHighlights: ["Direct Dubai Water Canal frontage", "Artificial beach", "Royal Suites available"],
    amenities: [
      "Rooftop infinity pool with skyline views",
      "Yoga and fitness studio",
      "Children's indoor and outdoor play zones",
      "Spa and sauna",
      "Tranquil gardens",
      "Co-working areas",
      "24/7 smart security",
    ],
    nearbyLandmarks: ["Downtown Dubai", "Dubai Mall", "Sheikh Zayed Road corridor", "DIFC"],
    overview: {
      fr: "",
      en: "A waterfront residential tower on the Dubai Water Canal in Business Bay, with 29 total floors and design 'inspired by the clear shores of the sea.'",
    },
    officialSourceUrl: "https://www.binghatti.com/en/projects/binghatti-aquarise",
  }),
  draftProject({
    slug: "wraith",
    name: "Wraith",
    developerId: "binghatti",
    location: "Al Jaddaf",
    tier: "B",
    propertyTypes: ["studio", "1-bed", "2-bed", "3-bed"],
    startingPrice: { amount: 799999, currency: "AED" },
    paymentPlan: { fr: "", en: "50% down payment at sales launch, 50% on handover." },
    handover: "Q4 2027",
    keyHighlights: ["Crystalline glass façades", "Cantilevered balconies", "Views of Burj Khalifa and Dubai Frame"],
    amenities: [
      "Infinity pool",
      "Jacuzzi",
      "Private cabanas",
      "Spa and wellness center",
      "Gym",
      "Padel court",
      "Half basketball court",
      "EV charging stations",
    ],
    nearbyLandmarks: [
      "Mohammed Bin Rashid Library",
      "Dubai Design District (D3)",
      "Al Jaddaf Metro Station",
      "Dubai Healthcare City",
    ],
    overview: {
      fr: "",
      en: "A residential tower in Al Jaddaf with crystalline glass façades and views toward Burj Khalifa and Dubai Frame.",
    },
    officialSourceUrl: "https://www.binghatti.com/en/projects/binghatti-wraith",
  }),

  // Tier C — Imtiaz
  draftProject({
    slug: "the-archive",
    name: "The Archive",
    developerId: "imtiaz",
    location: "DLRC",
    tier: "C",
    propertyTypes: ["studio", "1-bed", "2-bed", "3-bed"],
    startingPrice: { amount: 666000, currency: "AED" },
    paymentPlan: { fr: "", en: "50% during construction, 50% on handover." },
    handover: "Q3 2028",
    keyHighlights: [
      "Library-inspired design concept",
      "BOSCH kitchen appliances",
      "Smart home technology",
      "Fully furnished units",
    ],
    amenities: [
      "Shallow water feature lounge with sunken seating",
      "Floating cabanas",
      "Mini golf",
      "Signature library with residential gallery",
      "Reading lounge",
      "Kids' play area",
      "Pets' area",
      "Outdoor cinema",
    ],
    nearbyLandmarks: ["Dubai Silicon Oasis", "Academic City", "Sheikh Mohammed Bin Zayed Road access"],
    overview: {
      fr: "",
      en: "A 17-floor residential development within Dubai Land Residence Complex (DLRC), built around a library concept with a working two-storey library.",
    },
    officialSourceUrl: "https://imtiaz.ae/property/the-archive-by-imtiaz",
  }),
  draftProject({
    slug: "enre-residence",
    name: "Enre Residence",
    developerId: "imtiaz",
    location: "Dubai South",
    tier: "C",
    propertyTypes: ["studio", "1-bed", "2-bed"],
    // startingPrice left pending — sources conflict (AED 673,000 vs AED 1,353,001)
    paymentPlan: {
      fr: "",
      en: "20% on booking, 40% during construction, 40% on handover (interest-free).",
    },
    handover: "Q1 2028",
    keyHighlights: [
      "~170 units across 10 storeys",
      "Smart home features with Alexa integration",
      "Fully furnished, move-in-ready units",
    ],
    amenities: [
      "Adult pool",
      "Kids' pool",
      "Gym",
      "Yoga deck",
      "Jogging track",
      "BBQ pit",
      "Kids' playground",
      "Rooftop open-air cinema",
      "Co-working spaces",
    ],
    nearbyLandmarks: ["Al Maktoum International Airport", "Expo City Dubai", "Downtown Dubai / Burj Khalifa"],
    overview: {
      fr: "",
      en: "A 10-storey residential building of ~170 units in Dubai South, launched as 'Inara Residence' and renamed 'Enre Residence.' Described by the developer as where 'contemporary architecture meets the quiet rhythm of nature.'",
    },
    officialSourceUrl: "https://imtiaz.ae/property/enre-residence-by-imtiaz",
  }),
  draftProject({
    slug: "raw-district-2",
    name: "Raw District II",
    developerId: "imtiaz",
    location: "Downtown Jebel Ali",
    tier: "C",
    propertyTypes: ["studio", "1-bed", "2-bed", "3-bed", "office", "retail"],
    startingPrice: { amount: 666000, currency: "AED" },
    // paymentPlan left pending — two conflicting variants reported
    handover: "Q2 2029",
    keyHighlights: [
      "AED 1.5 billion project value",
      "Reported sold out on launch day",
      "Combines residential, office and retail",
    ],
    amenities: [
      "Outdoor gym",
      "Padel court",
      "Half basketball court",
      "Family pool",
      "Hydrotherapy pool",
      "Indoor/outdoor co-working spaces",
      "Sensory garden",
      "Outdoor cinema lawn",
    ],
    nearbyLandmarks: ["Dubai Marina", "Expo City Dubai", "Palm Jebel Ali", "Al Maktoum International Airport"],
    overview: {
      fr: "",
      en: "A mixed-use development on Sheikh Zayed Road in Downtown Jebel Ali, pairing fully furnished residential apartments with modular offices, co-working space, and ground-floor retail. Reported sold out on launch day.",
    },
    officialSourceUrl: "https://imtiaz.ae/property/raw-district-ii-by-imtiaz",
  }),

  // Tier C — Object 1
  draftProject({
    slug: "elar1s-rise",
    name: "ELAR1S Rise",
    developerId: "object-1",
    location: "JVT",
    tier: "C",
    propertyTypes: ["studio", "1-bed", "2-bed"],
    startingPrice: { amount: 1300000, currency: "AED" },
    paymentPlan: { fr: "", en: "20% booking, 50% during construction, 30% on handover." },
    handover: "Q3 2028",
    keyHighlights: [
      "Contemporary architecture with optimized layouts",
      "Private balconies",
      "Sustainability-focused design",
    ],
    amenities: [
      "Lobby",
      "Swimming pool",
      "Kids playroom",
      "Outdoor lounge",
      "BBQ area",
      "Clubhouse",
      "Pool deck with sun loungers",
      "Gym",
    ],
    overview: {
      fr: "",
      en: "A residential tower in Jumeirah Village Triangle (JVT), District 3, described by the developer as capturing 'the essence of air, light, and life.'",
    },
    officialSourceUrl: "https://object-1.com/project/elar1s-rise/",
  }),
  draftProject({
    slug: "aurel1a-residence",
    name: "AUREL1A Residence",
    developerId: "object-1",
    location: "Dubai Sports City",
    tier: "C",
    propertyTypes: ["studio", "1-bed", "2-bed", "3-bed"],
    startingPrice: { amount: 598000, currency: "AED" },
    paymentPlan: { fr: "", en: "64% during construction, 36% on handover." },
    handover: "Q1 2028",
    keyHighlights: [
      "Dynamic architectural design with large windows",
      "Positioned for professionals, families and active-lifestyle residents",
      "Established community with strong rental demand",
    ],
    amenities: [
      "Lobby",
      "Swimming pool",
      "Kids' swimming pool",
      "Gym",
      "Kids playroom",
      "Clubhouse",
      "Outdoor lounge",
      "BBQ area",
    ],
    overview: {
      fr: "",
      en: "A residential building in the established Dubai Sports City community offering studio to 3.5-bedroom apartments designed for an active, balanced lifestyle.",
    },
    officialSourceUrl: "https://object-1.com/project/aurel1a-residence/",
  }),

  // Tier C — Samana
  draftProject({
    slug: "samana-south-haven",
    name: "SAMANA South Haven",
    developerId: "samana",
    location: "Dubai South",
    tier: "C",
    propertyTypes: ["studio", "1-bed", "2-bed"],
    startingPrice: { amount: 599000, currency: "AED" },
    paymentPlan: {
      fr: "",
      en: "10–15% down payment, then 5% at month 4, 10% at month 12, then 1% monthly instalments (70–75 months).",
    },
    handover: "Q2 2029",
    keyHighlights: [
      "200 units total",
      "Positioned in a fast-growing southern Dubai expansion corridor",
      "Follows the earlier SAMANA Hills South 1, 2 and 3 projects",
    ],
    amenities: [
      "Sauna & steam room",
      "Outdoor cinema",
      "Kids' pool",
      "Library/lounge",
      "Pilates studio",
      "BBQ area",
      "Landscaped walking & jogging track",
      "Jacuzzi",
    ],
    nearbyLandmarks: [
      "Al Maktoum International Airport",
      "Expo City",
      "Ibn Battuta Mall",
      "Dubai Investment Park",
      "Dubai Marina",
    ],
    overview: {
      fr: "",
      en: "A six-floor residential development of 200 units in Dubai Industrial City (Dubai South), emphasizing resort-inspired amenities and modern architecture.",
    },
    officialSourceUrl: "https://www.samanadevelopers.com/projects/samana-south-haven",
  }),
];
