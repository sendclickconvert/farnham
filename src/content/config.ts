import { defineCollection, z } from 'astro:content';

// Article frontmatter — mirrors the mothership pattern (FAQ / HowTo / ItemList
// schema generated from frontmatter), retargeted for Medicare topical pillars.
const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.date(),
  updatedDate: z.date(),
  author: z.string().default('James W. Farnham, MS, MBA'),
  authorTitle: z.string().default('Licensed Insurance Agent & Medicare Specialist'),
  authorLocation: z.string().default('New Paltz, NY'),
  primaryKeyword: z.string(),
  pillar: z.string(),
  schemaFAQ: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  schemaHowTo: z
    .object({
      name: z.string(),
      steps: z.array(z.object({ name: z.string(), text: z.string() })),
    })
    .optional(),
  schemaItemList: z.array(z.object({ name: z.string() })).optional(),
});

const highDeductibleArticles = defineCollection({ type: 'content', schema: articleSchema });
const medigapArticles = defineCollection({ type: 'content', schema: articleSchema });
const medicareAdvantageArticles = defineCollection({ type: 'content', schema: articleSchema });
const partDArticles = defineCollection({ type: 'content', schema: articleSchema });
const turning65Articles = defineCollection({ type: 'content', schema: articleSchema });
const medicareBasicsArticles = defineCollection({ type: 'content', schema: articleSchema });
const dentalVisionArticles = defineCollection({ type: 'content', schema: articleSchema });
const newYorkConnecticutArticles = defineCollection({ type: 'content', schema: articleSchema });

export const collections = {
  'high-deductible-articles': highDeductibleArticles,
  'medigap-articles': medigapArticles,
  'medicare-advantage-articles': medicareAdvantageArticles,
  'part-d-articles': partDArticles,
  'turning-65-articles': turning65Articles,
  'medicare-basics-articles': medicareBasicsArticles,
  'dental-vision-articles': dentalVisionArticles,
  'new-york-connecticut-articles': newYorkConnecticutArticles,
};
