import { supabase } from '../supabase';
import type { Workshop, WorkshopRegistration, WorkshopRegistrationInsert, WorkshopUpsert } from '../database.types';

export async function listActiveWorkshops(): Promise<Workshop[]> {
  const { data, error } = await supabase
    .from('workshops')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data;
}

export async function insertWorkshopRegistration(row: WorkshopRegistrationInsert): Promise<void> {
  const { error } = await supabase.from('workshop_registrations').insert(row);
  if (error) throw error;
}

/** Staff-only — gated by RLS, not this function. */
export async function listWorkshopRegistrations(): Promise<WorkshopRegistration[]> {
  const { data, error } = await supabase
    .from('workshop_registrations')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

/** Staff-only — gated by RLS, not this function. */
export async function listWorkshops(): Promise<Workshop[]> {
  const { data, error } = await supabase
    .from('workshops')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data;
}

/** Staff-only — gated by RLS, not this function. */
export async function upsertWorkshop(row: WorkshopUpsert): Promise<void> {
  const { error } = await supabase.from('workshops').upsert(row);
  if (error) throw error;
}
