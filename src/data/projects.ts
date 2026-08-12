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
 * Every entry is `published: false`. Every `whyIRecommend` below is
 * currently an AI-drafted starting point (see `whyIRecommendMeta`,
 * `aiAssisted: true`) — factual synthesis only, no invented claims, written
 * in Tommy's absence rather than by him. Nothing goes live until Tommy has
 * rewritten it in his own voice and approved it (clearing `aiAssisted` /
 * setting `aiReviewedAt`), the developer's `whyITrustThem` is written, any
 * remaining pending facts are confirmed, and real media is added.
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
    published: false,
    developerId: "emaar",
    location: "Dubai Creek Harbour",
    tier: "A",
    media: {
      cover: { url: "/images/projects/valia/1.jpg", type: "render" },
      gallery: [
        { url: "/images/projects/valia/2.jpg", type: "photo" },
        { url: "/images/projects/valia/3.jpg", type: "render" },
        { url: "/images/projects/valia/4.jpg", type: "masterplan" },
      ],
    },
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
      fr: "Une tour résidentielle de 56 étages à Dubai Creek Harbour, décrite par Emaar comme un repère sophistiqué de l'habitat contemporain s'élevant depuis un podium à usage mixte, mettant l'accent sur le bien-être et la connexion à la nature.",
      en: "A 56-storey residential tower in Dubai Creek Harbour, described by Emaar as a sophisticated landmark of contemporary living rising from a mixed-use podium, emphasizing wellbeing and connection to nature.",
    },
    whyIRecommend: {
      fr: "Valia est une tour résidentielle de 56 étages à Dubai Creek Harbour proposant des appartements de 1 à 4 chambres, avec une livraison prévue au T4 2030. Le bâtiment offre des baies vitrées du sol au plafond et des balcons privés, à proximité de Central Park, de l'hôtel Vida Creek Harbour et de la réserve naturelle de Ras Al Khor. Le prix de départ et le plan de paiement ne sont pas encore confirmés par les sources disponibles.",
      en: "Valia is a 56-storey residential tower in Dubai Creek Harbour offering 1- to 4-bedroom apartments, with handover scheduled for Q4 2030. The building features floor-to-ceiling glazing and private balconies, and sits near Central Park, the Vida Creek Harbour hotel and the Ras Al Khor Wildlife Sanctuary. Starting price and payment plan are not yet confirmed from available sources.",
    },
    whyIRecommendMeta: { aiAssisted: true },
    officialSourceUrl: "https://www.emaar.com/en/properties/valia-at-dubai-creek-harbour",
  }),
  draftProject({
    slug: "aeon",
    name: "AEON",
    published: false,
    developerId: "emaar",
    location: "Dubai Creek Harbour",
    tier: "A",
    media: {
      cover: { url: "/images/projects/aeon/1.jpg", type: "render" },
      gallery: [
        { url: "/images/projects/aeon/2.jpg", type: "render" },
        { url: "/images/projects/aeon/3.jpg", type: "render" },
      ],
    },
    propertyTypes: ["1-bed", "2-bed", "3-bed"],
    startingPrice: { amount: 1710000, currency: "AED" },
    paymentPlan: {
      fr: "10 % à la réservation, 80 % durant la construction (versements par étapes), 10 % à la livraison.",
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
      fr: "Un développement résidentiel en bord d'eau composé de deux tours jumelles, dans le quartier de Creek Beach à Dubai Creek Harbour, présenté par Emaar comme « l'apogée de l'évolution urbaine ».",
      en: "A twin-tower waterfront residential development in the Creek Beach district of Dubai Creek Harbour, marketed by Emaar as 'The Epitome of Urban Evolution.'",
    },
    whyIRecommend: {
      fr: "AEON est un développement résidentiel à deux tours dans le quartier de Creek Beach à Dubai Creek Harbour, proposant des appartements de 1 à 3 chambres à partir de 1 710 000 AED, avec une livraison prévue au T2 2028. Le plan de paiement est de 10 % à la réservation, 80 % durant la construction et 10 % à la livraison. L'emplacement offre une proximité avec quatre stations de métro et un terminal de ferry RTA, avec des équipements incluant un club-house, des installations de bien-être, deux piscines et un skate park.",
      en: "AEON is a twin-tower residential development in the Creek Beach district of Dubai Creek Harbour, offering 1- to 3-bedroom apartments from AED 1,710,000, with handover scheduled for Q2 2028. The payment structure is 10% down, 80% during construction and 10% on handover. The location offers proximity to four metro stations and an RTA ferry terminal, with amenities including a clubhouse, wellness facilities, dual pools and a skate park.",
    },
    whyIRecommendMeta: { aiAssisted: true },
    officialSourceUrl: "https://www.emaar.com/en/properties/aeon",
  }),
  draftProject({
    slug: "park-lane",
    name: "Park Lane",
    published: false,
    developerId: "emaar",
    location: "Dubai Hills Estate",
    tier: "A",
    media: {
      cover: { url: "/images/projects/park-lane/1.jpg", type: "render" },
      gallery: [
        { url: "/images/projects/park-lane/2.jpg", type: "render" },
        { url: "/images/projects/park-lane/3.jpg", type: "render" },
      ],
    },
    propertyTypes: ["1-bed", "2-bed", "3-bed", "townhouse"],
    startingPrice: { amount: 1400000, currency: "AED" },
    paymentPlan: {
      fr: "10 % à la réservation, environ 70 % durant la construction, 20 % à la livraison.",
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
      fr: "Park Lane – Interiors by Vida est un développement multi-bâtiments à Dubai Hills Estate, avec une décoration intérieure signée Vida, situé entre Downtown Dubai et Dubai Marina.",
      en: "Park Lane – Interiors by Vida is a multi-building development in Dubai Hills Estate featuring Vida-branded interior design, positioned between Downtown Dubai and Dubai Marina.",
    },
    whyIRecommend: {
      fr: "Park Lane – Interiors by Vida est un développement multi-bâtiments à Dubai Hills Estate proposant des appartements et maisons de ville de 1 à 3 chambres à partir de 1 400 000 AED, avec une livraison prévue au T4 2028. Les unités disposent d'intérieurs signés Vida, et le développement surplombe le golf championship 18 trous de la communauté, entre Downtown Dubai et Dubai Marina. Les équipements incluent une piscine à débordement, un centre de fitness et un podium paysager.",
      en: "Park Lane – Interiors by Vida is a multi-building development in Dubai Hills Estate offering 1- to 3-bedroom apartments and townhouses from AED 1,400,000, with handover scheduled for Q4 2028. Units feature Vida-branded interiors, and the development overlooks the community's 18-hole championship golf course, positioned between Downtown Dubai and Dubai Marina. Amenities include an infinity pool, fitness centre and landscaped podium deck.",
    },
    whyIRecommendMeta: { aiAssisted: true },
    officialSourceUrl: "https://www.emaar.com/en/properties/park-lane",
  }),

  // Tier B — DAMAC
  draftProject({
    slug: "chelsea-residences",
    name: "Chelsea Residences",
    published: false,
    developerId: "damac",
    location: "Dubai Maritime City",
    tier: "B",
    featured: true,
    media: {
      cover: { url: "/images/projects/chelsea-residences/1.jpg", type: "render" },
      gallery: [
        { url: "/images/projects/chelsea-residences/2.jpg", type: "render" },
        { url: "/images/projects/chelsea-residences/3.jpg", type: "render" },
        { url: "/images/projects/chelsea-residences/4.jpg", type: "render" },
      ],
    },
    propertyTypes: ["1-bed", "2-bed", "3-bed"],
    startingPrice: { amount: 2300000, currency: "AED" },
    paymentPlan: {
      fr: "20 % à la réservation, 40 % durant la construction, 40 % à la livraison.",
      en: "20% down payment, 40% during construction, 40% on handover.",
    },
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
      fr: "Les premières résidences de marque football développées en partenariat avec le Chelsea Football Club — plus de 1 400 appartements avec vue sur mer à Dubai Maritime City.",
      en: "The first football-branded residences developed in partnership with Chelsea Football Club — over 1,400 sea-facing apartments in Dubai Maritime City.",
    },
    whyIRecommend: {
      fr: "Chelsea Residences est un développement en bord de mer à Dubai Maritime City, réalisé en partenariat avec le Chelsea Football Club, proposant plus de 1 400 appartements de 1 à 3 chambres avec vue sur mer à partir de 2 300 000 AED. Le plan de paiement est de 20 % à la réservation, 40 % durant la construction et 40 % à la livraison, prévue en décembre 2029. Les équipements à thème football incluent une plage privée, un terrain sur le toit et un centre d'entraînement de performance sportive. Les achats éligibles peuvent donner droit au Golden Visa des Émirats arabes unis.",
      en: "Chelsea Residences is a waterfront development in Dubai Maritime City developed in partnership with Chelsea Football Club, offering over 1,400 sea-facing 1- to 3-bedroom apartments from AED 2,300,000. The payment plan is 20% down, 40% during construction and 40% on handover, with handover scheduled for December 2029. Football-themed amenities include a private beach, a rooftop pitch and an athlete performance training centre. Qualifying purchases may be eligible for the UAE Golden Visa.",
    },
    whyIRecommendMeta: { aiAssisted: true },
    officialSourceUrl: "https://www.damacproperties.com/en/projects/chelsea-residences/",
  }),
  draftProject({
    slug: "damac-islands-2",
    name: "DAMAC Islands 2",
    published: false,
    developerId: "damac",
    location: "Dubailand",
    tier: "B",
    media: {
      cover: { url: "/images/projects/damac-islands-2/1.jpg", type: "render" },
      gallery: [
        { url: "/images/projects/damac-islands-2/2.jpg", type: "render" },
        { url: "/images/projects/damac-islands-2/3.jpg", type: "render" },
        { url: "/images/projects/damac-islands-2/4.jpg", type: "render" },
      ],
    },
    propertyTypes: ["townhouse", "villa"],
    startingPrice: { amount: 2750000, currency: "AED" },
    paymentPlan: {
      fr: "20 % à la réservation, 55 % durant la construction, 25 % à la livraison.",
      en: "20% at booking, 55% during construction, 25% on handover.",
    },
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
      fr: "La phase 2 de la master-community en bord d'eau à thème insulaire de DAMAC à Dubailand — une communauté « éco-luxe » composée de 8 clusters à thème insulaire, proposant des maisons de ville et villas de 4 à 6 chambres.",
      en: "Phase 2 of DAMAC's island-themed waterfront master community in Dubailand — an 'eco-luxury' community of 8 island-themed clusters, offering 4–6 bedroom townhouses and villas.",
    },
    whyIRecommend: {
      fr: "DAMAC Islands 2 est la phase 2 de la master-community à thème insulaire de DAMAC à Dubailand, proposant des maisons de ville et villas de 4 à 6 chambres réparties sur 8 clusters à thème insulaire, à partir de 2 750 000 AED. Le plan de paiement est de 20 % à la réservation, 55 % durant la construction et 25 % à la livraison, prévue au T2 2030. Le promoteur revendique un record du monde Guinness pour les revenus générés en une seule journée de lancement, en novembre 2025. Les équipements sont axés sur la nature et le bien-être, avec un éco-parc, un jardin botanique et des plages privées ; les achats éligibles peuvent donner droit au Golden Visa.",
      en: "DAMAC Islands 2 is phase 2 of DAMAC's island-themed master community in Dubailand, offering 4- to 6-bedroom townhouses and villas across 8 island-themed clusters from AED 2,750,000. The payment plan is 20% at booking, 55% during construction and 25% on handover, with handover scheduled for Q2 2030. The developer reports a Guinness World Record for single-day launch revenue in November 2025. Amenities are nature- and wellness-focused, including an eco park, botanic garden and private beaches; qualifying purchases may be Golden Visa eligible.",
    },
    whyIRecommendMeta: { aiAssisted: true },
    officialSourceUrl:
      "https://www.damacproperties.com/en/communities/damac-islands-2-community/projects/damac-islands-2/",
  }),

  // Tier B — Ellington
  draftProject({
    slug: "the-meriva-collection",
    name: "The Meriva Collection",
    published: false,
    developerId: "ellington",
    location: "Dubai Islands",
    tier: "B",
    media: {
      cover: { url: "/images/projects/the-meriva-collection/1.jpg", type: "render" },
      gallery: [
        { url: "/images/projects/the-meriva-collection/2.jpg", type: "render" },
        { url: "/images/projects/the-meriva-collection/3.jpg", type: "render" },
      ],
    },
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
      fr: "Le premier développement à vocation hôtelière d'Ellington — une communauté résidentielle en front de mer sur l'Island B, Dubai Islands, combinant résidences et une composante hôtelière intégrée.",
      en: "Ellington's first hospitality-led development — a beachfront residential community on Island B, Dubai Islands, combining residences with an integrated hotel component.",
    },
    whyIRecommend: {
      fr: "The Meriva Collection est le premier développement à vocation hôtelière d'Ellington Properties, une communauté résidentielle en front de mer sur l'Island B, Dubai Islands, combinant appartements et penthouses de 1 à 4 chambres avec une composante hôtelière intégrée. Le projet offre un accès direct à la plage au sein d'un plan-masse en bord d'eau à faible densité, ainsi qu'une collection limitée de résidences signature de 3 et 5 chambres en front de mer avec piscines privées. Le prix de départ, le plan de paiement et la date de livraison ne sont pas encore publiés.",
      en: "The Meriva Collection is Ellington Properties' first hospitality-led development, a beachfront residential community on Island B, Dubai Islands, combining 1- to 4-bedroom apartments and penthouses with an integrated hotel component. It offers direct beach access within a low-density waterfront master plan, plus a limited collection of 3- and 5-bedroom signature beachfront residences with private pools. Starting price, payment plan and handover date are not yet published.",
    },
    whyIRecommendMeta: { aiAssisted: true },
    officialSourceUrl:
      "https://ellingtonproperties.ae/en/property-for-sale/the-meriva-collection-dubai-islands",
  }),
  draftProject({
    slug: "everly-place",
    name: "Everly Place",
    published: false,
    developerId: "ellington",
    location: "Mohammed Bin Rashid City",
    tier: "B",
    media: {
      cover: { url: "/images/projects/everly-place/1.jpg", type: "render" },
      gallery: [
        { url: "/images/projects/everly-place/2.jpg", type: "render" },
        { url: "/images/projects/everly-place/3.jpg", type: "render" },
        { url: "/images/projects/everly-place/4.jpg", type: "render" },
        { url: "/images/projects/everly-place/5.jpg", type: "render" },
      ],
    },
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
      fr: "Une tour résidentielle de 13 étages regroupant 209 résidences, organisée autour d'un lagon cristallin dans le sous-quartier Meydan Horizon de Mohammed Bin Rashid City.",
      en: "A 13-storey residential tower of 209 residences positioned around a crystal lagoon in Mohammed Bin Rashid City's Meydan Horizon sub-district.",
    },
    whyIRecommend: {
      fr: "Everly Place est une tour résidentielle de 13 étages et 209 unités dans le sous-quartier Meydan Horizon de Mohammed Bin Rashid City, proposant des appartements de 1 à 3 chambres organisés autour d'un lagon cristallin. Les équipements incluent un bowling, des studios de fitness et de yoga, un club lounge donnant sur le lagon et un cinéma en plein air. Le prix de départ, le plan de paiement et la date de livraison ne sont pas encore publiés.",
      en: "Everly Place is a 13-storey, 209-unit residential tower in Mohammed Bin Rashid City's Meydan Horizon sub-district, offering 1- to 3-bedroom apartments positioned around a crystal lagoon. Amenities include a bowling alley, fitness and yoga studios, a lagoon-facing club lounge and an outdoor cinema. Starting price, payment plan and handover date are not yet published.",
    },
    whyIRecommendMeta: { aiAssisted: true },
    officialSourceUrl:
      "https://ellingtonproperties.ae/en/property-for-sale/everly-place-mohammed-bin-rashid-city",
  }),

  // Tier B — Binghatti
  draftProject({
    slug: "aquarise",
    name: "Aquarise",
    published: false,
    developerId: "binghatti",
    location: "Business Bay",
    tier: "B",
    featured: true,
    media: {
      cover: { url: "/images/projects/aquarise/1.jpg", type: "render" },
      gallery: [
        { url: "/images/projects/aquarise/2.jpg", type: "render" },
        { url: "/images/projects/aquarise/3.jpg", type: "render" },
        { url: "/images/projects/aquarise/4.jpg", type: "render" },
      ],
    },
    propertyTypes: ["studio", "1-bed", "2-bed", "3-bed", "4-bed"],
    startingPrice: { amount: 1150999, currency: "AED" },
    paymentPlan: {
      fr: "20 % à la réservation, 50 % durant la construction, 30 % à l'achèvement.",
      en: "20% on booking, 50% during construction, 30% on completion.",
    },
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
      fr: "Une tour résidentielle en bord d'eau sur le Dubai Water Canal à Business Bay, comptant 29 étages, avec un design « inspiré des rivages clairs de la mer ».",
      en: "A waterfront residential tower on the Dubai Water Canal in Business Bay, with 29 total floors and design 'inspired by the clear shores of the sea.'",
    },
    whyIRecommend: {
      fr: "Aquarise est une tour résidentielle en bord d'eau de 29 étages sur le Dubai Water Canal à Business Bay, proposant des appartements du studio à 4 chambres (ainsi que des Royal Suites) à partir de 1 150 999 AED. Le plan de paiement est de 20 % à la réservation, 50 % durant la construction et 30 % à l'achèvement, avec une livraison prévue au T1 2027. Le développement bénéficie d'un accès direct au canal et d'une plage artificielle, ainsi que d'une piscine à débordement sur le toit, d'un spa et d'espaces de coworking.",
      en: "Aquarise is a 29-floor waterfront residential tower on the Dubai Water Canal in Business Bay, offering studio to 4-bedroom apartments (plus Royal Suites) from AED 1,150,999. The payment plan is 20% on booking, 50% during construction and 30% on completion, with handover scheduled for Q1 2027. The development includes direct canal frontage and an artificial beach, along with a rooftop infinity pool, spa and co-working spaces.",
    },
    whyIRecommendMeta: { aiAssisted: true },
    officialSourceUrl: "https://www.binghatti.com/en/projects/binghatti-aquarise",
  }),
  draftProject({
    slug: "wraith",
    name: "Wraith",
    published: false,
    developerId: "binghatti",
    location: "Al Jaddaf",
    tier: "B",
    media: {
      cover: { url: "/images/projects/wraith/1.jpg", type: "render" },
      gallery: [
        { url: "/images/projects/wraith/2.jpg", type: "render" },
        { url: "/images/projects/wraith/3.jpg", type: "render" },
        { url: "/images/projects/wraith/4.jpg", type: "render" },
      ],
    },
    propertyTypes: ["studio", "1-bed", "2-bed", "3-bed"],
    startingPrice: { amount: 799999, currency: "AED" },
    paymentPlan: {
      fr: "50 % à la réservation au lancement des ventes, 50 % à la livraison.",
      en: "50% down payment at sales launch, 50% on handover.",
    },
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
      fr: "Une tour résidentielle à Al Jaddaf aux façades de verre cristallines, avec vue sur le Burj Khalifa et le Dubai Frame.",
      en: "A residential tower in Al Jaddaf with crystalline glass façades and views toward Burj Khalifa and Dubai Frame.",
    },
    whyIRecommend: {
      fr: "Wraith est une tour résidentielle à Al Jaddaf proposant des appartements du studio à 3 chambres à partir de 799 999 AED, avec 50 % à la réservation et les 50 % restants à la livraison, prévue au T4 2027. Le bâtiment se distingue par ses façades de verre cristallines et ses balcons en porte-à-faux offrant une vue sur le Burj Khalifa et le Dubai Frame. Il se trouve à quelques minutes de la station de métro Al Jaddaf et de Dubai Healthcare City.",
      en: "Wraith is a residential tower in Al Jaddaf offering studio to 3-bedroom apartments from AED 799,999, with a 50% down payment and the remaining 50% due on handover, scheduled for Q4 2027. The building features crystalline glass façades and cantilevered balconies with views toward Burj Khalifa and Dubai Frame. It is a short distance from Al Jaddaf Metro Station and Dubai Healthcare City.",
    },
    whyIRecommendMeta: { aiAssisted: true },
    officialSourceUrl: "https://www.binghatti.com/en/projects/binghatti-wraith",
  }),

  // Tier C — Imtiaz
  draftProject({
    slug: "the-archive",
    name: "The Archive",
    published: false,
    developerId: "imtiaz",
    location: "DLRC",
    tier: "C",
    media: {
      cover: { url: "/images/projects/the-archive/1.jpg", type: "render" },
      gallery: [
        { url: "/images/projects/the-archive/2.jpg", type: "render" },
        { url: "/images/projects/the-archive/3.jpg", type: "render" },
        { url: "/images/projects/the-archive/4.jpg", type: "render" },
      ],
    },
    propertyTypes: ["studio", "1-bed", "2-bed", "3-bed"],
    startingPrice: { amount: 666000, currency: "AED" },
    paymentPlan: {
      fr: "50 % durant la construction, 50 % à la livraison.",
      en: "50% during construction, 50% on handover.",
    },
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
      fr: "Un développement résidentiel de 17 étages au sein du Dubai Land Residence Complex (DLRC), conçu autour d'un concept de bibliothèque avec une véritable bibliothèque sur deux niveaux.",
      en: "A 17-floor residential development within Dubai Land Residence Complex (DLRC), built around a library concept with a working two-storey library.",
    },
    whyIRecommend: {
      fr: "The Archive est un développement résidentiel de 17 étages dans le Dubai Land Residence Complex (DLRC), conçu autour d'un concept de bibliothèque avec une véritable bibliothèque sur deux niveaux. Il propose des appartements entièrement meublés, du studio à 3 chambres, à partir de 666 000 AED, avec un plan de paiement 50/50 (50 % durant la construction, 50 % à la livraison) et une livraison prévue au T3 2028. Les unités incluent des équipements de cuisine BOSCH et la domotique ; les équipements communs comprennent un lounge avec point d'eau, un mini-golf et un salon de lecture dédié.",
      en: "The Archive is a 17-floor residential development in Dubai Land Residence Complex (DLRC), built around a library concept with a working two-storey library. It offers studio to 3-bedroom, fully furnished apartments from AED 666,000, with a 50/50 payment plan (50% during construction, 50% on handover) and handover scheduled for Q3 2028. Units include BOSCH kitchen appliances and smart home technology; amenities include a water-feature lounge, mini golf and a dedicated reading lounge.",
    },
    whyIRecommendMeta: { aiAssisted: true },
    officialSourceUrl: "https://imtiaz.ae/property/the-archive-by-imtiaz",
  }),
  draftProject({
    slug: "enre-residence",
    name: "Enre Residence",
    published: false,
    developerId: "imtiaz",
    location: "Dubai South",
    tier: "C",
    media: {
      cover: { url: "/images/projects/enre-residence/1.jpg", type: "render" },
      gallery: [
        { url: "/images/projects/enre-residence/2.jpg", type: "render" },
        { url: "/images/projects/enre-residence/3.jpg", type: "render" },
        { url: "/images/projects/enre-residence/4.jpg", type: "render" },
        { url: "/images/projects/enre-residence/5.jpg", type: "render" },
        { url: "/images/projects/enre-residence/6.jpg", type: "render" },
      ],
    },
    propertyTypes: ["studio", "1-bed", "2-bed"],
    // startingPrice left pending — sources conflict (AED 673,000 vs AED 1,353,001)
    paymentPlan: {
      fr: "20 % à la réservation, 40 % durant la construction, 40 % à la livraison (sans intérêt).",
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
      fr: "Un immeuble résidentiel de 10 étages d'environ 170 unités à Dubai South, lancé sous le nom « Inara Residence » puis renommé « Enre Residence ». Décrit par le promoteur comme le lieu où « l'architecture contemporaine rencontre le rythme paisible de la nature ».",
      en: "A 10-storey residential building of ~170 units in Dubai South, launched as 'Inara Residence' and renamed 'Enre Residence.' Described by the developer as where 'contemporary architecture meets the quiet rhythm of nature.'",
    },
    whyIRecommend: {
      fr: "Enre Residence (lancé sous le nom « Inara Residence » avant d'être renommé) est un immeuble de 10 étages regroupant environ 170 appartements du studio à 2 chambres à Dubai South. Le plan de paiement est de 20 % à la réservation, 40 % durant la construction et 40 % à la livraison (sans intérêt), avec une livraison prévue au T1 2028. Les unités sont entièrement meublées et équipées de la domotique compatible Alexa. Le prix de départ n'est pas confirmé — les sources disponibles rapportent des chiffres contradictoires.",
      en: "Enre Residence (launched as 'Inara Residence' before being renamed) is a 10-storey building of approximately 170 studio to 2-bedroom apartments in Dubai South. The payment plan is 20% on booking, 40% during construction and 40% on handover (interest-free), with handover scheduled for Q1 2028. Units are fully furnished with Alexa-enabled smart home features. Starting price is not confirmed — available sources report conflicting figures.",
    },
    whyIRecommendMeta: { aiAssisted: true },
    officialSourceUrl: "https://imtiaz.ae/property/enre-residence-by-imtiaz",
  }),
  draftProject({
    slug: "raw-district-2",
    name: "Raw District II",
    published: false,
    developerId: "imtiaz",
    location: "Downtown Jebel Ali",
    tier: "C",
    media: {
      cover: { url: "/images/projects/raw-district-2/1.jpg", type: "render" },
      gallery: [
        { url: "/images/projects/raw-district-2/2.jpg", type: "render" },
        { url: "/images/projects/raw-district-2/3.jpg", type: "render" },
        { url: "/images/projects/raw-district-2/4.jpg", type: "render" },
        { url: "/images/projects/raw-district-2/5.jpg", type: "render" },
        { url: "/images/projects/raw-district-2/6.jpg", type: "render" },
      ],
    },
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
      fr: "Un développement à usage mixte sur Sheikh Zayed Road, à Downtown Jebel Ali, associant des appartements résidentiels entièrement meublés à des bureaux modulaires, des espaces de coworking et des commerces en rez-de-chaussée. Vendu en totalité dès le jour du lancement, selon les informations rapportées.",
      en: "A mixed-use development on Sheikh Zayed Road in Downtown Jebel Ali, pairing fully furnished residential apartments with modular offices, co-working space, and ground-floor retail. Reported sold out on launch day.",
    },
    whyIRecommend: {
      fr: "Raw District II est un développement à usage mixte sur Sheikh Zayed Road, à Downtown Jebel Ali, combinant des appartements résidentiels du studio à 3 chambres avec des espaces de bureaux et commerces, à partir de 666 000 AED. La livraison est prévue au T2 2029 ; le projet affiche une valeur totale de 1,5 milliard AED et aurait été vendu en totalité dès son lancement. Le plan de paiement n'est pas confirmé — les sources rapportent des structures différentes. Les équipements incluent une piscine familiale, une piscine d'hydrothérapie et des espaces de coworking.",
      en: "Raw District II is a mixed-use development on Sheikh Zayed Road in Downtown Jebel Ali, combining studio to 3-bedroom residential apartments with office and retail space, from AED 666,000. Handover is scheduled for Q2 2029; the project reports an AED 1.5 billion total value and was reported sold out on its launch day. The payment plan is not confirmed — sources report differing structures. Amenities include a family pool, hydrotherapy pool and co-working spaces.",
    },
    whyIRecommendMeta: { aiAssisted: true },
    officialSourceUrl: "https://imtiaz.ae/property/raw-district-ii-by-imtiaz",
  }),

  // Tier C — Object 1
  draftProject({
    slug: "elar1s-rise",
    name: "ELAR1S Rise",
    published: false,
    developerId: "object-1",
    location: "JVT",
    tier: "C",
    featured: true,
    media: {
      cover: { url: "/images/projects/elar1s-rise/1.jpg", type: "render" },
      gallery: [
        { url: "/images/projects/elar1s-rise/2.jpg", type: "render" },
        { url: "/images/projects/elar1s-rise/3.jpg", type: "render" },
      ],
    },
    propertyTypes: ["studio", "1-bed", "2-bed"],
    startingPrice: { amount: 1300000, currency: "AED" },
    paymentPlan: {
      fr: "20 % à la réservation, 50 % durant la construction, 30 % à la livraison.",
      en: "20% booking, 50% during construction, 30% on handover.",
    },
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
      fr: "Une tour résidentielle à Jumeirah Village Triangle (JVT), District 3, décrite par le promoteur comme captant « l'essence de l'air, de la lumière et de la vie ».",
      en: "A residential tower in Jumeirah Village Triangle (JVT), District 3, described by the developer as capturing 'the essence of air, light, and life.'",
    },
    whyIRecommend: {
      fr: "ELAR1S Rise est une tour résidentielle à Jumeirah Village Triangle (JVT), District 3, proposant des appartements du studio à 2 chambres avec balcons privés à partir de 1 300 000 AED. Le plan de paiement est de 20 % à la réservation, 50 % durant la construction et 30 % à la livraison, prévue au T3 2028. Les équipements incluent une piscine, une salle de sport, une salle de jeux pour enfants et un club-house.",
      en: "ELAR1S Rise is a residential tower in Jumeirah Village Triangle (JVT), District 3, offering studio to 2-bedroom apartments with private balconies from AED 1,300,000. The payment plan is 20% on booking, 50% during construction and 30% on handover, with handover scheduled for Q3 2028. Amenities include a swimming pool, gym, kids' playroom and clubhouse.",
    },
    whyIRecommendMeta: { aiAssisted: true },
    officialSourceUrl: "https://object-1.com/project/elar1s-rise/",
  }),
  draftProject({
    slug: "aurel1a-residence",
    name: "AUREL1A Residence",
    published: false,
    developerId: "object-1",
    location: "Dubai Sports City",
    tier: "C",
    media: {
      cover: { url: "/images/projects/aurel1a-residence/1.jpg", type: "render" },
      gallery: [
        { url: "/images/projects/aurel1a-residence/2.jpg", type: "render" },
      ],
    },
    propertyTypes: ["studio", "1-bed", "2-bed", "3-bed"],
    startingPrice: { amount: 598000, currency: "AED" },
    paymentPlan: {
      fr: "64 % durant la construction, 36 % à la livraison.",
      en: "64% during construction, 36% on handover.",
    },
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
      fr: "Un immeuble résidentiel dans la communauté bien établie de Dubai Sports City, proposant des appartements du studio à 3,5 chambres conçus pour un mode de vie actif et équilibré.",
      en: "A residential building in the established Dubai Sports City community offering studio to 3.5-bedroom apartments designed for an active, balanced lifestyle.",
    },
    whyIRecommend: {
      fr: "AUREL1A Residence est un immeuble résidentiel dans la communauté bien établie de Dubai Sports City, proposant des appartements du studio à 3,5 chambres à partir de 598 000 AED. Le plan de paiement est de 64 % durant la construction et 36 % à la livraison, prévue au T1 2028. Les équipements incluent une piscine, une piscine pour enfants, une salle de sport et un club-house.",
      en: "AUREL1A Residence is a residential building in the established Dubai Sports City community, offering studio to 3.5-bedroom apartments from AED 598,000. The payment plan is 64% during construction and 36% on handover, with handover scheduled for Q1 2028. Amenities include a swimming pool, kids' pool, gym and clubhouse.",
    },
    whyIRecommendMeta: { aiAssisted: true },
    officialSourceUrl: "https://object-1.com/project/aurel1a-residence/",
  }),

  // Tier C — Samana
  draftProject({
    slug: "samana-south-haven",
    name: "SAMANA South Haven",
    published: false,
    developerId: "samana",
    location: "Dubai South",
    tier: "C",
    media: {
      cover: { url: "/images/projects/samana-south-haven/1.jpg", type: "render" },
      gallery: [
        { url: "/images/projects/samana-south-haven/2.jpg", type: "render" },
        { url: "/images/projects/samana-south-haven/3.jpg", type: "render" },
        { url: "/images/projects/samana-south-haven/4.jpg", type: "render" },
        { url: "/images/projects/samana-south-haven/5.jpg", type: "render" },
        { url: "/images/projects/samana-south-haven/6.jpg", type: "render" },
      ],
    },
    propertyTypes: ["studio", "1-bed", "2-bed"],
    startingPrice: { amount: 599000, currency: "AED" },
    paymentPlan: {
      fr: "10 à 15 % à la réservation, puis 5 % au 4ᵉ mois, 10 % au 12ᵉ mois, puis des mensualités de 1 % (70 à 75 mois).",
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
      fr: "Un développement résidentiel de six étages regroupant 200 unités à Dubai Industrial City (Dubai South), misant sur des équipements inspirés du monde des resorts et une architecture moderne.",
      en: "A six-floor residential development of 200 units in Dubai Industrial City (Dubai South), emphasizing resort-inspired amenities and modern architecture.",
    },
    whyIRecommend: {
      fr: "SAMANA South Haven est un développement de six étages et 200 unités à Dubai Industrial City (Dubai South), proposant des appartements du studio à 2 chambres à partir de 599 000 AED. Le plan de paiement combine un acompte de 10 à 15 % avec des versements échelonnés (5 % au 4ᵉ mois, 10 % au 12ᵉ mois), suivis de mensualités de 1 % sur 70 à 75 mois ; la livraison est prévue au T2 2029. Il fait suite aux précédents projets SAMANA Hills South 1, 2 et 3 dans le même corridor. Les équipements incluent un sauna, un hammam, une piscine pour enfants et un cinéma en plein air.",
      en: "SAMANA South Haven is a six-floor, 200-unit development in Dubai Industrial City (Dubai South), offering studio to 2-bedroom apartments from AED 599,000. The payment plan combines a 10–15% down payment with staged instalments (5% at month 4, 10% at month 12) followed by 1% monthly payments over 70–75 months; handover is scheduled for Q2 2029. It follows the earlier SAMANA Hills South 1, 2 and 3 projects in the same corridor. Amenities include a sauna, steam room, kids' pool and outdoor cinema.",
    },
    whyIRecommendMeta: { aiAssisted: true },
    officialSourceUrl: "https://www.samanadevelopers.com/projects/samana-south-haven",
  }),
];
