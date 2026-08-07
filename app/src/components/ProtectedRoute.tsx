import { type ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getSession, isStaff, onAuthStateChange } from '../lib/auth';

type Status = 'checking' | 'authorized' | 'unauthorized';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Status>('checking');

  useEffect(() => {
    let active = true;

    async function check(email: string | undefined) {
      if (!email) {
        if (active) setStatus('unauthorized');
        return;
      }
      const staff = await isStaff(email);
      if (active) setStatus(staff ? 'authorized' : 'unauthorized');
    }

    getSession().then((session) => check(session?.user.email));
    const unsubscribe = onAuthStateChange((session) => check(session?.user.email));

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  if (status === 'checking') return <p style={{ padding: 'var(--space-6)' }}>Checking session…</p>;
  if (status === 'unauthorized') return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}
