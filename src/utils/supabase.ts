import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Some features may not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to fetch all teachings
export async function getAllTeachings() {
  const { data, error } = await supabase
    .from('teachings')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching teachings:', error);
    return [];
  }

  return data || [];
}

// Helper function to fetch teachings by religion
export async function getTeachingsByReligion(religion: string) {
  const { data, error } = await supabase
    .from('teachings')
    .select('*')
    .eq('religion', religion)
    .order('published_at', { ascending: false });

  if (error) {
    console.error(`Error fetching ${religion} teachings:`, error);
    return [];
  }

  return data || [];
}

// Helper function to fetch a single teaching by slug
export async function getTeachingBySlug(slug: string) {
  const { data, error } = await supabase
    .from('teachings')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching teaching ${slug}:`, error);
    return null;
  }

  return data;
}

// Helper function to increment view count
export async function incrementViewCount(teachingId: string) {
  const { error } = await supabase.rpc('increment_view_count', {
    teaching_id: teachingId
  });

  if (error) {
    console.error('Error incrementing view count:', error);
  }
}

// Helper function to fetch social posts
export async function getRecentSocialPosts(limit = 20) {
  const { data, error } = await supabase
    .from('social_posts')
    .select('*')
    .order('posted_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching social posts:', error);
    return [];
  }

  return data || [];
}

// Helper function to fetch thought leaders
export async function getThoughtLeaders() {
  const { data, error } = await supabase
    .from('thought_leaders')
    .select('*')
    .order('credibility_score', { ascending: false });

  if (error) {
    console.error('Error fetching thought leaders:', error);
    return [];
  }

  return data || [];
}
