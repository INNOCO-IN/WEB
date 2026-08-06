import { supabase, STORY_MEDIA_BUCKET } from '../supabase';
import type { Story, StoryInsert, StoryStatus } from '../database.types';

export async function insertStory(row: StoryInsert): Promise<void> {
  const { error } = await supabase.from('stories').insert(row);
  if (error) throw error;
}

export async function uploadStoryMedia(file: File): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'bin';
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(STORY_MEDIA_BUCKET).upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from(STORY_MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/** Staff-only for 'pending'/'declined' — gated by RLS, not this function. */
export async function listStories(status?: StoryStatus): Promise<Story[]> {
  let query = supabase.from('stories').select('*').order('created_at', { ascending: false });
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/** Staff-only — gated by RLS, not this function. */
export async function setStoryStatus(id: string, status: StoryStatus): Promise<void> {
  const { error } = await supabase.from('stories').update({ status }).eq('id', id);
  if (error) throw error;
}
