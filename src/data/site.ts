// =====================================================================
// Farnham Senior Health Advisors — Site Data (single source of truth)
// =====================================================================
// Anything marked  ⚠️ CONFIRM  must be verified with the client before launch.
// Most live in BUSINESS, AGENT, and DISCLAIMERS below.
// =====================================================================

export const BUSINESS = {
  // Confirmed by the client 30 Sep 2026: legal name as registered with NYS is
  // "Farnham Senior Health Advisors, Inc." — he purposely omits the "Inc."
  // everywhere display-facing. Use `name` for display, `legalName` ONLY for
  // schema (Organization / LocalBusiness name + legalName) and the legal pages
  // (privacy, terms, disclosures).
  name: 'Farnham Senior Health Advisors',
  legalName: 'Farnham Senior Health Advisors, Inc.',
  shortName: 'Farnham Senior Health',
  tagline: 'Clear, no-pressure Medicare guidance for New York and Connecticut',

  phone: '(845) 399-2719',
  phoneClean: '8453992719',

  // ⚠️ CONFIRM — replace personal Gmail with a domain email once the domain is live
  email: 'jimfarnham1000@gmail.com',

  // ----- OFFICE ADDRESS: PENDING (service-area business, address hidden) -----
  // Jim never meets in person (phone + Zoom only), so Google Business Profile
  // is set up as a service-area business with the address hidden. Google still
  // needs a real verification address from Jim. Until `addressConfirmed` is
  // true NO street address and NO map pin is shown or put in schema; the site
  // says only what is true today. The build guard fails a PUBLISH=1 build while
  // this is false (scripts/guard.mjs). Never invent a street address here.
  addressConfirmed: false,
  address: {
    street: '', // set with addressConfirmed once Jim supplies the verification address
    city: 'New Paltz',
    state: 'NY',
    zip: '12561',
    full: '',
  },
  // Only emitted in schema when addressConfirmed is true (drop a pin at the exact address first).
  geo: {
    latitude: 0,
    longitude: 0,
  },

  // Mailing address (from client docs) — used ONLY in legal/privacy "contact"
  // text. This is a P.O. Box and must NOT be used as the storefront/map address.
  mailingAddress: 'P.O. Box 85, New Paltz, NY 12561',

  owner: 'James W. Farnham',
  // PENDING: farnhamseniorhealth.com is a placeholder name. Checked 20 Nov 2026:
  // it is NOT registered (RDAP 404, NXDOMAIN) and nobody holds it. Set
  // `domainConfirmed` to true only after the domain is registered under CRST's
  // delegate access and the same value is in astro.config.mjs `site`.
  domainConfirmed: false,
  domain: 'farnhamseniorhealth.com',
  url: 'https://farnhamseniorhealth.com',

  // NY producer license number: confirmed by Jim (round 3, p11: NYS number only).
  nyLicense: 'LA-799338',

  hours: 'By appointment — phone and Zoom screen-share consultations',

  stats: {
    yearsInsurance: '30+',
    yearsMedicare: '13',
  },
} as const;

// =====================================================================
// AGENT — James W. Farnham (E-E-A-T anchor: drives Person schema + bylines)
// =====================================================================
export const AGENT = {
  name: 'James W. Farnham',
  shortName: 'Jim Farnham',
  credentials: 'MS, MBA',
  fullName: 'James W. Farnham, MS, MBA',
  title: 'Licensed Agent / Insurance Broker',
  tagline: 'A non-government health insurance agent',
  jobTitle: 'Independent Medicare Insurance Agent',
  // ⚠️ CONFIRM headshot file (client to supply); place at /public/images/jim-farnham.jpg
  photo: '/images/jim-farnham.jpg',
  phone: BUSINESS.phone,
  email: BUSINESS.email,

  bioShort:
    'Jim Farnham has spent 30+ years in insurance and financial services, the last 13 focused almost exclusively on Medicare. He teaches a no-cost “Medicare 101” class for libraries, schools, colleges, and adult-education programs across the region.',

  bioLong: [
    'James W. Farnham, MS, MBA, has spent more than 30 years in insurance and financial services, with the last 13 focused almost exclusively on Medicare. He has taught “Medicare 101” for libraries, schools, colleges, universities, businesses, learning centers, and adult and continuing-education programs throughout the region.',
    'Jim leads with education. His goal is to make sure you have the knowledge and confidence to make an informed decision about your coverage — not to push a product. He works with individuals one-on-one to compare real costs (not just premiums) and determine which coverage actually fits their situation, this year and years from now.',
    'His approach is personal. Clients have his cell phone and can reach him directly for updates, questions, and ongoing support — the opposite of a national call center or an online quote engine.',
  ],

  whyText:
    'I have always cared about people and put myself in positions where I could help them in a meaningful way. With no health insurance as a teenager, I incurred catastrophic medical bills. I don’t want that to happen to anyone.',

  education: [
    { degree: 'M.B.A., Finance & Information Systems', school: 'Pace University', year: '1985' },
    { degree: 'M.S., Social Administration', school: 'Columbia University', year: '1983' },
    { degree: 'B.A., Sociology', school: 'State University of New York at New Paltz', year: '1979' },
  ],

  // PENDING: this 8-state list comes from Jim's original documents (onboarding
  // adds Tennessee). In round 3 he said "focus first on NY and CT" and that the
  // "Also licensed in..." line needs his confirmed list, which has not arrived.
  // Pages that state it carry a pending marker; the PUBLISH=1 build fails until
  // `licensedStatesConfirmed` is true. Never add or drop a state without Jim.
  licensedStatesConfirmed: false,
  licensedStates: ['New York', 'Connecticut', 'New Jersey', 'Pennsylvania', 'North Carolina', 'South Carolina', 'Tennessee', 'Florida'],

  knowsAbout: [
    'Medicare',
    'High-Deductible Medicare Supplement Insurance (High-Deductible Plan G)',
    'Medicare Supplement Insurance (Medigap)',
    'Medicare Advantage',
    'Medicare Part D Prescription Drug Plans',
    'Dental, Vision, and Hearing Insurance',
    'Hospital Indemnity Insurance',
    'Medicare enrollment in New York and Connecticut',
  ],
} as const;

// =====================================================================
// SERVICES — Medicare product lines. HD Medigap is the flagship.
// =====================================================================
export const SERVICES = [
  {
    title: 'High-Deductible Medicare Supplement',
    slug: 'high-deductible-medicare-supplement',
    icon: 'shield',
    flagship: true,
    summary: 'Lower monthly premiums with the same standardized Medigap protection once your deductible is met. Our specialty.',
    description:
      'High-Deductible Plan G offers the same standardized benefits as regular Plan G, but with a lower monthly premium in exchange for a higher annual deductible ($2,950 in 2026). For many people — especially in New York and Connecticut — it is one of the most cost-effective ways to cover the gaps in Original Medicare.',
  },
  {
    title: 'Medicare Supplement (Medigap)',
    slug: 'medicare-supplement',
    icon: 'check-shield',
    summary: 'Standardized plans that pay the gaps Original Medicare leaves behind — predictable costs, any doctor that takes Medicare.',
    description:
      'Medicare Supplement (Medigap) plans help pay the deductibles, copayments, and coinsurance Original Medicare does not. Benefits are standardized by law, so the difference between insurers comes down to price and service.',
  },
  {
    title: 'Medicare Advantage',
    slug: 'medicare-advantage',
    icon: 'layers',
    summary: 'All-in-one plans from private insurers — often lower premiums, with networks and copays to weigh.',
    description:
      'Medicare Advantage (Part C) plans bundle hospital, medical, and usually drug coverage into one plan from a private insurer. Premiums are often lower, but coverage works through networks and copays. We help you compare the trade-offs honestly.',
  },
  {
    title: 'Prescription Drug Plans (Part D)',
    slug: 'prescription-drug-plans',
    icon: 'pill',
    summary: 'Stand-alone drug coverage. Plans vary widely — an annual review can save real money.',
    description:
      'Medicare Part D plans cover prescription medications. Cost and formularies vary widely from plan to plan, so reviewing your specific medications and pharmacies each year matters.',
  },
  {
    title: 'Dental, Vision & Hearing',
    slug: 'dental-vision-hearing',
    icon: 'eye',
    summary: 'Coverage for the everyday needs Original Medicare generally doesn’t include.',
    description:
      'Original Medicare generally does not cover routine dental, vision, or hearing care. Stand-alone plans can help fill those gaps based on what you actually use.',
  },
  {
    title: 'Hospital Indemnity',
    slug: 'hospital-indemnity',
    icon: 'building',
    summary: 'Cash benefits that help offset out-of-pocket costs from a hospital stay.',
    description:
      'Hospital Indemnity insurance pays a fixed cash benefit if you are hospitalized, which can help offset deductibles and other out-of-pocket costs — often paired with a Medicare Advantage or high-deductible strategy.',
  },
] as const;

// =====================================================================
// SERVICE AREAS — New York primary (+ Connecticut). Kept to a small set of
// genuinely-differentiated county pages on purpose: Medicare is YMYL, where
// thin programmatic town pages get penalized rather than rewarded.
// =====================================================================
export const COUNTIES = {
  ulster: {
    name: 'Ulster County',
    slug: 'ulster-county',
    anchor: 'New Paltz',
    description: 'Home base. Serving Medicare beneficiaries across Ulster County — New Paltz, Kingston, Saugerties, Woodstock, and beyond.',
  },
  dutchess: {
    name: 'Dutchess County',
    slug: 'dutchess-county',
    anchor: 'Poughkeepsie',
    description: 'Medicare guidance throughout Dutchess County, from Poughkeepsie and Beacon to Rhinebeck and Hyde Park.',
  },
  orange: {
    name: 'Orange County',
    slug: 'orange-county',
    anchor: 'Middletown',
    description: 'Serving Orange County Medicare beneficiaries from Middletown and Newburgh to Goshen and Warwick.',
  },
  westchester: {
    name: 'Westchester County',
    slug: 'westchester-county',
    anchor: 'White Plains',
    description: 'Medicare Supplement and related coverage guidance for Westchester County residents.',
  },
} as const;

// States with year-round, continuous, guaranteed-issue Medigap + community rating.
export const CONTINUOUS_ENROLLMENT_STATES = ['New York', 'Connecticut'] as const;

// =====================================================================
// NAVIGATION
// =====================================================================
export const NAV_ITEMS = [
  {
    label: 'Medicare Plans',
    href: '/services',
    children: [
      { label: 'High-Deductible Medigap', href: '/services/high-deductible-medicare-supplement' },
      { label: 'Medicare Supplement Insurance (Medigap)', href: '/services/medicare-supplement' },
      { label: 'Prescription Drug Plans (Part D)', href: '/services/prescription-drug-plans' },
      { label: 'Medicare Advantage (Part C)', href: '/services/medicare-advantage' },
      { label: 'Dental, Vision & Hearing', href: '/services/dental-vision-hearing' },
      { label: 'Hospital Indemnity', href: '/services/hospital-indemnity' },
    ],
  },
  {
    label: 'Medicare Basics',
    href: '/medicare-basics',
  },
  {
    label: 'Service Areas',
    href: '/service-areas',
  },
  {
    label: 'Medicare 101',
    href: '/events',
  },
  {
    label: 'Resources',
    href: '/resources',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
] as const;

// =====================================================================
// KEY MEDICARE FIGURES — 2026 (grounded in CMS / Medicare.gov)
// Update each year. Sources: CMS F/G/J Deductible Announcement (Oct 2025),
// Medicare.gov plan-benefits comparison.
// =====================================================================
export const MEDICARE_2026 = {
  year: 2026,
  hdDeductible: '$2,950',     // HD Plan F/G annual deductible, CY2026 (CMS)
  partBDeductible: '$283',    // counts toward the HD deductible
  // Eligibility note: HD Plan F is only for those eligible before 1/1/2020.
  // Anyone newly eligible (turning 65 now) uses HD Plan G.
} as const;

// =====================================================================
// COMPLIANCE DISCLAIMERS (CMS / TPMO / state). Centralized so legal copy
// is edited in ONE place. Rendered via <Disclaimer /> and the Footer.
// =====================================================================
export const DISCLAIMERS = {
  // CMS-required TPMO disclaimer (numbered version).
  // Counts (5 companies / 20+ plan options) confirmed by the client on
  // 30 Sep 2026. These are compliance facts — update this string whenever
  // his carrier appointments change.
  tpmo:
    'If we do not offer every plan available in your area, any information we provide is limited to those plans we do offer in your area. Please contact Medicare.gov, 1-800-MEDICARE or your local State Health Insurance Program (SHIP) to get information on all of your options. Currently, I represent 5 different healthcare companies with 20+ plan options.',

  // Generic version — acceptable on anonymous landing pages where no ZIP is entered.
  tpmoGeneric:
    'We do not offer every plan available in your area. Any information we provide is limited to those plans we do offer in your area. Please contact Medicare.gov, 1-800-MEDICARE, or your local State Health Insurance Assistance Program (SHIP) to get information on all of your options.',

  noGovernment:
    'We are not affiliated with or endorsed by the federal government or the Medicare program. This is a proprietary website and is not associated, endorsed, or authorized by the Social Security Administration, the Department of Health and Human Services, or the Centers for Medicare & Medicaid Services.',

  educational:
    'The information on this website is for educational purposes only and is not a substitute for personalized advice. Plan availability depends on your location and eligibility. Potential savings are not guaranteed and vary based on plan selection, healthcare usage, and other factors.',

  solicitation: 'This is a solicitation for insurance.',

  compensation:
    'We may be compensated by insurance companies when you enroll in a plan. This compensation may vary by plan and carrier. It does not affect the cost of your coverage.',

  // Jim's contact-form consent paragraph, verbatim (round 3). Do not reword.
  tcpaConsent:
    'By completing this form, you agree that an authorized representative or licensed insurance agent may contact you by phone, text or email to answer your questions and provide additional information about Medicare Supplement Insurance, Part D and Medicare Advantage Plans. You are making no commitments and are under no obligations. You understand that the person who will be discussing plan options with you may be compensated based on your enrollment in a plan.',

  noPHI:
    'Please do not submit sensitive personal or health information (such as medical conditions, medications, or Medicare numbers) through this website. A licensed agent will gather any necessary information securely during a private consultation.',

  hdNotForEveryone:
    'High-Deductible Medigap plans are not suitable for everyone. These plans involve higher out-of-pocket costs before coverage begins. A licensed agent can help you compare this and other options based on your individual needs and financial situation.',
} as const;

// =====================================================================
// PENDING FACTS (demo-safe pattern)
// Render a statement that is true TODAY and drop an HTML comment marker the
// visitor never sees. scripts/guard.mjs greps dist for "<!--PENDING:" and warns
// on a demo build, fails when PUBLISH=1.
// =====================================================================
export const pendingMarker = (label: string) => `<!--PENDING: ${label}-->`;

// One switch for demo vs launch. Set PUBLISH=1 in the build environment only
// after Jim and his reviewers have approved in writing and the domain is live.
export const IS_PUBLISH = typeof process !== 'undefined' && process.env.PUBLISH === '1';
