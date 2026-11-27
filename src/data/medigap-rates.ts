// =====================================================================
// New York Medigap premium ranges, copied from the state's published tables.
// Source: New York State Department of Financial Services, "Medicare/Medigap Plans and Rates"
//   https://www.dfs.ny.gov/consumer_health_insurance/supplement_plans_rates/plans
// The tables show monthly premiums effective August 1, 2026, by insurer and region; the region is
// set by the first three digits of the ZIP code. Ranges below are the lowest and highest premium
// the state lists for that plan in that region across the insurers shown (Aetna, Bankers Conseco,
// EmblemHealth, Excellus, Globe Life, Highmark, Humana, Mutual of Omaha, UnitedHealthcare/AARP,
// depending on the plan and region). They are NOT Jim Farnham's quotes and not every insurer
// listed is one he represents. Read 27 Nov 2026 and checked by two separate parses of the page.
// Re-check and re-date whenever the state posts new tables (a January 2027 set is posted).
// =====================================================================
export const NY_RATES = {
  sourceName: 'New York State Department of Financial Services',
  sourceUrl: 'https://www.dfs.ny.gov/consumer_health_insurance/supplement_plans_rates/plans',
  effective: 'August 1, 2026',
  checked: 'November 27, 2026',
  checkedIso: '2026-11-27',
  ctSourceUrl: 'https://portal.ct.gov/cid/-/media/cid/1_lifehealth/medicare_supplement_insurance_rates.pdf',
  regions: {
    midHudson: {
      name: 'Mid-Hudson',
      zips: '124 to 127',
      planG: { min: 336.25, max: 666.6, insurers: 9 },
      hdG: { min: 60.25, max: 99.74, insurers: 5 },
    },
    westchester: {
      name: 'Westchester',
      zips: '105 to 109',
      planG: { min: 336.25, max: 840.28, insurers: 7 },
      hdG: { min: 60.25, max: 106.34, insurers: 4 },
    },
  },
} as const;

export const money = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
