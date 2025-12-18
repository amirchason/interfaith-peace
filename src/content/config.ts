import { defineCollection, z } from 'astro:content';

// Define the teachings collection schema
const teachingsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    religion: z.enum(['christianity', 'islam', 'buddhism', 'hinduism', 'judaism', 'interfaith']),
    category: z.string(),
    tags: z.array(z.string()),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    sourceText: z.string(),
    translationVersion: z.string().optional(),
    originalLanguage: z.string().optional(),
    featuredImage: z.string(),
    publishedDate: z.date(),
    updatedDate: z.date().optional(),
    excerpt: z.string(),
    scholars: z.array(z.object({
      name: z.string(),
      affiliation: z.string(),
      perspective: z.string()
    })).optional(),
    parallelTeachings: z.array(z.object({
      religion: z.enum(['christianity', 'islam', 'buddhism', 'hinduism', 'judaism']),
      teaching: z.string(),
      similarity: z.string(),
      difference: z.string().optional()
    })).optional()
  })
});

// Define the articles collection schema
const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    keywords: z.array(z.string()).optional(),
    targetKeyword: z.string().optional(),
    searchVolume: z.number().optional(),
    difficulty: z.string().optional(),
    featured: z.boolean().default(false),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    relatedArticles: z.array(z.string()).optional(),
  })
});

export const collections = {
  teachings: teachingsCollection,
  articles: articlesCollection
};
