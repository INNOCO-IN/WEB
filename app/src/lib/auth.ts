import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';

export async function sendMagicLink(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${window.location.origin}/admin` },
  });
  if (error) throw error;
}

export async function getSession(): Promise<Session | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export function onAuthStateChange(callback: (session: Session | null) => void) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
  return () => data.subscription.unsubscribe();
}

/**
 * Client-side check only (defense in depth for routing/UI) — the actual
 * gate is the RLS policy on every staff-only table. Relies on a `staff_emails`
 * select policy scoped to the caller's own email (see schema.sql), so this
 * never exposes the full staff list.
 */
export async function isStaff(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('staff_emails')
    .select('email')
    .eq('email', email)
    .maybeSingle();
  if (error) throw error;
  return data !== null;
}
