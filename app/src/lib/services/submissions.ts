import { supabase } from '../supabase';
import type { Submission, SubmissionInsert, SubmissionStatus } from '../database.types';

export async function insertSubmission(row: SubmissionInsert): Promise<void> {
  const { error } = await supabase.from('submissions').insert(row);
  if (error) throw error;
}

/** Staff-only — gated by RLS, not this function. */
export async function listSubmissions(): Promise<Submission[]> {
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

/** Staff-only — gated by RLS, not this function. */
export async function setSubmissionStatus(id: string, status: SubmissionStatus): Promise<void> {
  const { error } = await supabase.from('submissions').update({ status }).eq('id', id);
  if (error) throw error;
}
