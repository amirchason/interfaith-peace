-- Interfaith Peace Website Database Schema
-- PostgreSQL / Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Core teachings table with full-text search
CREATE TABLE IF NOT EXISTS teachings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  religion VARCHAR(50) NOT NULL CHECK (religion IN ('christianity', 'islam', 'buddhism', 'hinduism', 'judaism', 'interfaith')),
  category VARCHAR(100) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  title VARCHAR(300) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  original_text TEXT,
  translation_version VARCHAR(200),
  source_text VARCHAR(200),
  difficulty_level VARCHAR(20) DEFAULT 'beginner' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  featured_image VARCHAR(500),
  published_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  favorite_count INTEGER DEFAULT 0,
  -- Full-text search vector
  search_vector TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(excerpt, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'C')
  ) STORED,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_teachings_religion ON teachings(religion);
CREATE INDEX IF NOT EXISTS idx_teachings_category ON teachings(category);
CREATE INDEX IF NOT EXISTS idx_teachings_slug ON teachings(slug);
CREATE INDEX IF NOT EXISTS idx_teachings_published ON teachings(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_teachings_search ON teachings USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS idx_teachings_difficulty ON teachings(difficulty_level);

-- Tags system
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);
CREATE INDEX IF NOT EXISTS idx_tags_usage ON tags(usage_count DESC);

-- Teaching-Tag junction table
CREATE TABLE IF NOT EXISTS teaching_tags (
  teaching_id UUID REFERENCES teachings(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (teaching_id, tag_id)
);

CREATE INDEX IF NOT EXISTS idx_teaching_tags_teaching ON teaching_tags(teaching_id);
CREATE INDEX IF NOT EXISTS idx_teaching_tags_tag ON teaching_tags(tag_id);

-- Categories table (hierarchical)
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  religion VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(religion, slug)
);

CREATE INDEX IF NOT EXISTS idx_categories_religion ON categories(religion);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);

-- Scraped content from social media
CREATE TABLE IF NOT EXISTS social_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform VARCHAR(50) NOT NULL CHECK (platform IN ('twitter', 'youtube', 'reddit', 'medium', 'substack')),
  external_id VARCHAR(255) UNIQUE NOT NULL,
  author_name VARCHAR(255),
  author_handle VARCHAR(255),
  content_excerpt TEXT,
  full_content_url TEXT NOT NULL,
  posted_at TIMESTAMPTZ,
  scraped_at TIMESTAMPTZ DEFAULT NOW(),
  engagement_score INTEGER DEFAULT 0,
  quality_score FLOAT CHECK (quality_score >= 0 AND quality_score <= 100),
  credibility_score FLOAT CHECK (credibility_score >= 0 AND credibility_score <= 100),
  content_hash VARCHAR(64) UNIQUE NOT NULL,
  tags TEXT[],
  media_urls TEXT[],
  is_verified_source BOOLEAN DEFAULT FALSE,
  raw_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_social_posts_platform ON social_posts(platform);
CREATE INDEX IF NOT EXISTS idx_social_posts_posted ON social_posts(posted_at DESC);
CREATE INDEX IF NOT EXISTS idx_social_posts_quality ON social_posts(quality_score DESC);
CREATE INDEX IF NOT EXISTS idx_social_posts_hash ON social_posts(content_hash);

-- Thought leaders database
CREATE TABLE IF NOT EXISTS thought_leaders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  platform VARCHAR(50) NOT NULL,
  handle VARCHAR(255),
  category VARCHAR(100) CHECK (category IN ('scientist', 'philosopher', 'artist', 'activist', 'interfaith-leader')),
  verification_status VARCHAR(50),
  credibility_score FLOAT DEFAULT 50 CHECK (credibility_score >= 0 AND credibility_score <= 100),
  bio TEXT,
  avatar_url VARCHAR(500),
  last_scraped_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(platform, handle)
);

CREATE INDEX IF NOT EXISTS idx_thought_leaders_platform ON thought_leaders(platform);
CREATE INDEX IF NOT EXISTS idx_thought_leaders_category ON thought_leaders(category);
CREATE INDEX IF NOT EXISTS idx_thought_leaders_credibility ON thought_leaders(credibility_score DESC);

-- Content sources for scraping
CREATE TABLE IF NOT EXISTS content_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  url VARCHAR(500) NOT NULL,
  platform VARCHAR(50) NOT NULL,
  scrape_frequency VARCHAR(20) DEFAULT 'weekly' CHECK (scrape_frequency IN ('hourly', 'daily', 'weekly', 'monthly')),
  last_scraped_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_content_sources_active ON content_sources(is_active);
CREATE INDEX IF NOT EXISTS idx_content_sources_last_scraped ON content_sources(last_scraped_at);

-- User engagement tracking (anonymous, for analytics)
CREATE TABLE IF NOT EXISTS engagement_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teaching_id UUID REFERENCES teachings(id) ON DELETE CASCADE,
  event_type VARCHAR(20) NOT NULL CHECK (event_type IN ('view', 'share', 'favorite')),
  session_id VARCHAR(100),
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_engagement_teaching ON engagement_events(teaching_id);
CREATE INDEX IF NOT EXISTS idx_engagement_type ON engagement_events(event_type);
CREATE INDEX IF NOT EXISTS idx_engagement_created ON engagement_events(created_at DESC);

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(teaching_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE teachings
  SET view_count = view_count + 1
  WHERE id = teaching_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update teaching updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_teachings_updated_at
  BEFORE UPDATE ON teachings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE teachings IS 'Core religious teachings from all 5 religions with full-text search';
COMMENT ON TABLE social_posts IS 'Aggregated content from social media platforms';
COMMENT ON TABLE thought_leaders IS 'Curated list of peace advocates, scientists, philosophers, and artists';
COMMENT ON TABLE engagement_events IS 'Anonymous user engagement tracking for analytics';
