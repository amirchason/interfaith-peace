// Core types for the Interfaith Peace Website

export type Religion = 'christianity' | 'islam' | 'buddhism' | 'hinduism' | 'judaism' | 'interfaith';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Scholar {
  name: string;
  affiliation: string;
  perspective: string;
}

export interface TeachingFrontmatter {
  title: string;
  religion: Religion;
  category: string;
  tags: string[];
  difficulty: DifficultyLevel;
  sourceText: string;
  translationVersion?: string;
  originalLanguage?: string;
  featuredImage: string;
  publishedDate: Date;
  updatedDate?: Date;
  excerpt?: string;
  scholars?: Scholar[];
}

export interface Teaching {
  id: string;
  slug: string;
  data: TeachingFrontmatter;
  body: string;
}

export interface SocialPost {
  id: string;
  platform: 'twitter' | 'youtube' | 'reddit' | 'medium' | 'substack';
  externalId: string;
  authorName: string;
  authorHandle: string;
  contentExcerpt: string;
  fullContentUrl: string;
  postedAt: Date;
  scrapedAt: Date;
  engagementScore: number;
  qualityScore?: number;
  credibilityScore?: number;
  contentHash: string;
  tags: string[];
  mediaUrls: string[];
  isVerifiedSource: boolean;
}

export interface ThoughtLeader {
  id: string;
  name: string;
  platform: string;
  handle: string;
  category: 'scientist' | 'philosopher' | 'artist' | 'activist' | 'interfaith-leader';
  verificationStatus: string;
  credibilityScore: number;
}

export interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  religion: Religion;
  slug: string;
  category: string;
  tags: string[];
  _formatted?: {
    title: string;
    excerpt: string;
  };
}

export interface PageMeta {
  title: string;
  description: string;
  religion?: Religion;
  canonicalURL?: string;
  ogImage?: string;
}
