// Checks Jim Farnham's own wording (revision rounds 1-5) against the built site (dist/).
// Matching ignores case, spacing and punctuation, so document-conversion artefacts do not matter.
// Run after `npm run build`: node scripts/verify-jim.mjs
import fs from 'node:fs';
import path from 'node:path';

const norm = (s) => s.toLowerCase().replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'").replace(/[^a-z0-9$+]/g, '');
const text = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ');
const page = (p) => {
  const f = path.join('dist', p === '/' ? 'index.html' : p.slice(1) + '/index.html');
  return fs.existsSync(f) ? norm(text(fs.readFileSync(f, 'utf8'))) : null;
};
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const site = walk('dist').filter((f) => f.endsWith('.html')).map((f) => norm(text(fs.readFileSync(f, 'utf8')))).join(' ');

const HOME = '/', SA = '/service-areas', HD = '/services/high-deductible-medicare-supplement', WORTH = '/high-deductible-plan-g-worth-it',
  VS = '/high-deductible-plan-g-vs-plan-g', SW = '/switch-high-deductible-plan-g-to-plan-g', MG = '/services/medicare-supplement',
  MVM = '/medicare-advantage-vs-medigap', PEN = '/medicare-part-d-late-enrollment-penalty', IEP = '/medicare-initial-enrollment-period',
  BASICS = '/medicare-basics', PARTD = '/services/prescription-drug-plans', RES = '/resources', EV = '/events', DENTAL = '/services/dental-vision-hearing',
  FAQ = '/faq', R2 = '/medicare-supplement/when-can-you-change-your-medigap-plan', MA = '/services/medicare-advantage', FIRST = '/your-first-medicare-decisions';

// [round, page, Jim's wording that must be on that page]
const present = [
  ['R1', HOME, 'My approach is to educate first — explain your options clearly and show you how to save money along the way.'],
  ['R1', HOME, 'compare it honestly against traditional Medigap, Medicare Advantage, and Part D'],
  ['R1', HOME, 'If a different path fits better for you, I’ll tell you that too.'],
  ['R1', HOME, 'Get a no-cost, no-obligation Medicare analysis and review'],
  ['R1', HOME, 'No pressure. No call centers. Just clear, practical guidance!'],
  ['R1', HOME, 'MS, MBA · 30+ years in insurance & financial services'],
  ['R1', HOME, 'These are Educational Events.'],
  ['R1', HOME, 'Offered online via Zoom webinar.'],
  ['R1', SA, 'I do a no-cost, individualized Medicare analysis, examining what specific coverages are most appropriate.'],
  ['R1', SA, 'While I make available Medigap, Part D Prescription Drug Plans, Medicare Advantage Plans and other add-on coverage, my specialty is High-Deductible Medicare Supplement Insurance.'],
  ['R1', SA, 'Let’s explore how and why those types of plans might make sense for you!'],
  ['R1', SA, 'Medigap Rules Are Different Depending on Where You Live'],
  ['R1', SA, 'Although Medigap policies are federally standardized, the rules governing when you can enroll—or change plans—vary from state to state.'],
  ['R1', SA, 'which Medigap plan is the best long-term choice'],
  ['R1', SA, 'Everyone receives the same protection during their one-time Medigap Open Enrollment Period, which begins when you are both age 65 or older and enrolled in Medicare Part B.'],
  ['R1', SA, 'They cannot impose waiting periods for pre-existing conditions.'],
  ['R1', SA, 'Residents of New York and Connecticut enjoy some of the strongest consumer protections in the country.'],
  ['R1', SA, 'New York and Connecticut each provide continuous guaranteed issue rights through year-round continuous open enrollment.'],
  ['R1', SA, 'That means that, at any time, you can change from one Medigap plan to another without being denied coverage because of your health or being charged more due to pre-existing medical conditions.'],
  ['R1', SA, 'You simply have greater flexibility if your healthcare needs change over time.'],
  ['R1', SA, 'In most other states, everyone receives the same important protection during their Medigap Open Enrollment Period.'],
  ['R1', SA, 'However, after that enrollment period ends, the rules are different.'],
  ['R1', SA, 'If you later decide to switch Medigap plans, insurance companies in most other states are generally allowed to review your health history through medical underwriting.'],
  ['R1', SA, 'Depending on your health, your application may be approved, declined, or offered under different terms.'],
  ['R1', SA, 'Your state’s Medigap rules can influence which plan makes the most sense—not just today, but years from now.'],
  ['R1', SA, 'some beneficiaries choose to purchase more comprehensive coverage initially because they may not be able to qualify for it later if their health changes'],
  ['R1', SA, 'It typically has a lower monthly premium, while still providing the protection of a Medigap policy after the annual deductible has been met.'],
  ['R1', SA, 'The ability—or inability—to switch plans later is one factor that should be considered when deciding whether a high-deductible or a standard Medigap plan is the better long-term fit.'],
  ['R1', SA, 'There is no single Medigap plan that is best for everyone.'],
  ['R1', SA, 'Understanding how your state’s rules affect your future options can help you make a more informed decision.'],
  ['R1', DENTAL, 'yet these are some of the most common everyday expenses in retirement'],
  ['R1', DENTAL, 'Stand-alone dental, vision, and hearing plans can help cover some of these shortfalls.'],
  ['R1', HD, 'High-Deductible Plan G is a Medicare Supplement (Medigap) plan with the same standardized benefits as regular Plan G, but with a lower monthly premium and a higher annual deductible'],
  ['R1', HD, 'When you use care, you cover the costs Original Medicare leaves behind — its deductibles, copays, and coinsurance — out of your own pocket.'],
  ['R1', HD, 'Once you reach it, the plan takes over, exactly like a standard supplement.'],
  ['R1', HD, 'your total annual out of pocket is your lower annual premium plus the $2,950 deductible'],
  ['R1', HD, 'You trade a lower monthly premium for a higher deductible.'],
  ['R1', HD, 'You only pay if you actually need care.'],
  ['R1', HD, 'Can be a lower total annual cost compared with Standard Plan G'],
  ['R1', HD, 'Lower out-of-pocket costs once Part B deductible is met'],
  ['R1', HD, 'Which plan is more appropriate? It depends on where you live, how much care you expect to use and how you prefer to manage cost.'],
  ['R1', HD, 'Can you switch out of a High-Deductible Plan later?'],
  ['R1', HD, 'Yes, however, where you live decides how easily.'],
  ['R1', HD, 'If you switch mid-year, be aware that your deductible would reset to zero.'],
  ['R1', HD, 'Is a High-Deductible Plan Worth it'],
  ['R1', WORTH, 'A lower monthly premium than standard Plan G, which frees up cash every month.'],
  ['R1', WORTH, 'Your exposure in any year is capped at the deductible plus your low premium.'],
  ['R1', WORTH, 'In a heavy-care year, the most you’d pay is your lower annual premium plus the $2,950 deductible.'],
  ['R1', WORTH, 'In a light-care year, you still pay the lower premium plus a lower amount for care.'],
  ['R1', WORTH, 'Because the deductible is fixed and there’s savings with the premium, even after paying the higher deductible, you’re still ahead financially.'],
  ['R1', WORTH, 'I’m glad to pull those for you at no cost.'],
  ['R1', VS, 'Standard Plan G has a higher monthly premium with lower deductible ($283 in 2026).'],
  ['R1', VS, 'Potential for lower total annual cost'],
  ['R1', VS, 'With standard Plan G you pay a higher premium every month and lesser when you use care.'],
  ['R1', VS, 'The right choice is whichever gives you the lower total annual cost for the way you actually use care'],
  ['R1', VS, 'you can move between standard and high-deductible Plan G any time of year with no health questions'],
  ['R1', SW, 'choosing a High-Deductible Plan G now doesn’t lock you in'],
  ['R1', SW, 'the six months after you turn 65 and are enrolled in Medicare Part B'],
  ['R1', SW, 'That makes the initial choice more consequential in those states.'],
  ['R1', SW, 'Don’t drop your current coverage until your new plan is approved and in force.'],
  ['R1', MG, 'A Medicare Supplement Insurance (Medigap) plan is private insurance that works alongside Original Medicare, helping to pay the deductibles, copays, and coinsurance Medicare leaves to you.'],
  ['R1', MG, 'You can use any provider nationwide that accepts Medicare, and there are no networks or referrals.'],
  ['R1', MG, 'leaves behind a number of deductibles, copays, and coinsurances'],
  ['R1', MG, 'The result: Fewer surprise bills and more predictable spending.'],
  ['R1', MG, 'Nationwide, everyone has a 6-month Medigap Open Enrollment Period that begins when you’re 65 or older and enrolled in Part B — during which, you can’t be turned down.'],
  ['R1', MVM, 'Medigap and Medicare Advantage are two different ways to fill the gaps in Original Medicare'],
  ['R1', MVM, 'Medigap pairs with Original Medicare to cover its out-of-pocket costs and lets you use any provider that accepts Medicare.'],
  ['R1', MVM, 'Let’s take a look'],
  ['R1', MVM, 'What’s the difference between Medigap and Medicare Advantage?'],
  ['R1', MVM, 'The simplest way to see it: Medigap supplements Original Medicare, while Medicare Advantage replaces how you get your Medicare benefits.'],
  ['R1', MVM, 'How Medigap (Medicare Supplement Insurance) works'],
  ['R1', MVM, 'How Medicare Advantage Plans (Part C) work'],
  ['R1', MVM, 'Most plans use a provider network, some require referrals, and can change their benefits, costs, and networks each year.'],
  ['R1', MVM, 'Medigap vs. Medicare Advantage, side by side'],
  ['R1', MVM, 'See any provider nationwide that accepts Medicare'],
  ['R1', MVM, 'Standardized benefits that remain stable from one year to the next'],
  ['R1', MVM, 'Often a lower monthly premium'],
  ['R1', MVM, 'Where High-Deductible Plan G fits in'],
  ['R1', MVM, 'keeps Medigap’s any-provider freedom at a lower premium, in exchange for a higher annual deductible'],
  ['R1', PEN, 'Creditable coverage is drug coverage that’s at least as good as a standard Part D plan'],
  ['R1', PEN, 'This is one of the easiest Medicare mistakes to make and one of the easiest to avoid. Here’s exactly how it works.'],
  ['R1', PEN, 'Enroll in a Part D plan when you’re first eligible, or keep coverage Medicare considers creditable.'],
  ['R1', PEN, 'As long as there’s not a gap of 63 days or more, there’s likely no penalty.'],
  ['R1', IEP, 'You can enroll in Medicare any time during that span.'],
  ['R1', BASICS, 'Part A — Hospital Insurance'],
  ['R1', BASICS, 'Part B — Medical Insurance'],
  ['R1', BASICS, 'Part D — Prescription Drug Coverage'],
  ['R1', BASICS, 'Want this explained in plain English?'],
  ['R1', PARTD, 'Even if you take few or no medications, a low-premium plan avoids that risk'],
  ['R1', FAQ, 'Do you only work in New York and Connecticut?'],
  ['R1', RES, 'These are the sites and resources that Jim sends to Medicare 101 attendees.'],
  ['R1', EV, 'This program will simplify the choices you need to make; help you make more well-informed decisions and explain what Medicare means for you! This is an educational event.'],
  ['R1', EV, 'Jim Farnham has taught Medicare 101 for numerous libraries, businesses, high schools, colleges, universities, and adult-education programs.'],
  // Round 2: the whole article
  ['R2', R2, 'your ability to change plans in the future can depend on the state where you live'],
  ['R2', R2, 'The important question is whether the insurance company is required to accept you.'],
  ['R2', R2, 'This is a one-time, six-month period that begins when you are age 65 or older and enrolled in Medicare Part B.'],
  ['R2', R2, 'Require you to pass medical underwriting to qualify for coverage.'],
  ['R2', R2, 'For example, someone may decide that a lower-premium Medigap option works well today but later determine that a different level of coverage is more appropriate.'],
  ['R2', R2, 'The situation can be different in states such as Florida, New Jersey, North Carolina, Pennsylvania, South Carolina and Tennessee.'],
  ['R2', R2, 'Being allowed to apply for another Medigap plan is not necessarily the same as being guaranteed the right to enroll in it.'],
  ['R2', R2, 'Once the annual high deductible has been satisfied, the policy provides the benefits associated with that Medigap plan for the remainder of the year.'],
  ['R2', R2, 'Neither approach is automatically more appropriate.'],
  ['R2', R2, 'But that does not mean that a High-Deductible Medigap plan is inappropriate in those states.'],
  ['R2', R2, 'If I want to change Medigap plans several years from now, what are the rules in my state?'],
  ['R2', R2, 'Medigap isn’t one-size-fits-all.'],
  ['R2', R2, 'Understanding both how the coverage works today and what options you may have tomorrow can help you make a more informed Medigap decision.'],
  // Round 3
  ['R3', '/contact', 'By completing this form, you agree that an authorized representative or licensed insurance agent may contact you by phone, text or email'],
  ['R3', '/contact', 'Please do not submit sensitive personal or health information'],
  ['R3', HOME, 'A non-government health insurance agent'],
  ['R3', HOME, 'Currently, I represent 5 different healthcare companies with 20+ plan options.'],
  ['R3', HOME, 'Your First Medicare Decisions and Beyond'],
  ['R3', HOME, 'Does Your Current Coverage Still Make Sense?'],
  ['R3', FIRST, 'Medigap Rules Are Different Depending on Where You Live'],
  ['R3', SA, 'Reviews by phone or Zoom screen-share'],
  // Round 4
  ['R4', EV, 'You must self-register in advance for this educational event.'],
  ['R4', EV, 'After registering, you will receive an attendance email containing information on joining the webinar.'],
  ['R4', EV, 'At the online registration page, please fill in your first name only and leave your last name blank.'],
  ['R4', EV, 'Please self-register, again, with your first name only, at one of the following:'],
  ['R4', EV, 'Wednesday, December 9, 2026'],
  ['R4', EV, 'Saturday, December 12, 2026'],
  // Round 5
  ['R5', HOME, 'Request a No-Cost Review'],
];

// [round, page or '*' for the whole site, wording Jim asked to remove]
const absent = [
  ['R1', '*', 'in person by appointment'],
  ['R1', '*', 'Licensed Insurance Agent & Medicare Specialist'],
  ['R1', '*', 'licensed independent agent (NY license'],
  ['R1', HOME, 'the answer is yes'],
  ['R1', HD, 'Estimate your costs'],
  ['R1', HD, 'deductible, explained'],
  ['R1', HD, 'How to compare insurers'],
  ['R1', PEN, 'Here’s how the penalty works and how to stay clear of it.'],
  ['R1', PEN, 'cheap insurance against both future drug needs'],
  ['R1', PEN, 'Frequently asked questions'],
  ['R1', VS, 'Frequently asked questions'],
  ['R1', BASICS, 'Frequently asked questions'],
  ['R1', BASICS, 'How the pieces fit together'],
  ['R1', BASICS, 'what is Medicare Part A'],
  ['R1', MVM, 'Written by'],
  ['R1', PARTD, 'Source:'],
  ['R1', '*', '[NUMBER]'],
  ['R3', '*', 'In person'],
  ['R5', HD, 'Most people do not reach the full deductible every year'],
  ['R5', HD, 'generally healthy or comfortable with some financial risk'],
  ['R5', VS, 'A note on eligibility'],
  ['R5', MVM, 'Can you switch between Medigap and Medicare Advantage'],
  ['R5', PARTD, 'out-of-pocket cap'],
  ['5.1', '*', 'Plan N'],
  ['R4', EV, 'November 17, 2026'],
];

let bad = 0;
for (const [r, p, s] of present) {
  const t = page(p);
  if (t === null) { console.log(`MISSING PAGE ${r} ${p}`); bad++; continue; }
  if (!t.includes(norm(s))) { console.log(`NOT ON PAGE  ${r} ${p}\n    "${s}"${site.includes(norm(s)) ? '   (found elsewhere on the site)' : ''}`); bad++; }
}
// "Must be gone" checks match the wording as written (case-insensitive, whole words), not the stripped form.
const spaced = (p) => {
  const files = p === '*' ? walk('dist').filter((f) => f.endsWith('.html')) : [path.join('dist', p.slice(1), 'index.html')];
  return files
    .filter((f) => fs.existsSync(f))
    .map((f) => text(fs.readFileSync(f, 'utf8')).replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/\s+/g, ' '))
    .join(' ');
};
const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
for (const [r, p, s] of absent) {
  const re = new RegExp('(?<![A-Za-z])' + esc(s).replace(/ /g, '\\s+') + '(?![A-Za-z])', 'i');
  if (re.test(spaced(p))) { console.log(`STILL THERE  ${r} ${p}\n    "${s}"`); bad++; }
}
console.log(`\n${present.length} "must be there" and ${absent.length} "must be gone" checks: ${bad} to review`);
