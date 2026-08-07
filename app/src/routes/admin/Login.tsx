import { useState, type FormEvent } from 'react';
import { Field } from '../../components/Field';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { sendMagicLink } from '../../lib/auth';

export function Login() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get('email') ?? '');
    setStatus('sending');
    setError(null);
    try {
      await sendMagicLink(email);
      setStatus('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send the link.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <section style={{ maxWidth: 420, margin: '0 auto', padding: 'var(--space-9) var(--content-side-padding)' }}>
        <h1 style={{ font: 'var(--text-heading-2)' }}>Check your email</h1>
        <p style={{ font: 'var(--text-body)', color: 'var(--text-muted)', marginTop: 'var(--space-3)' }}>
          We sent a sign-in link. Open it on this device to continue.
        </p>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 420, margin: '0 auto', padding: 'var(--space-9) var(--content-side-padding)' }}>
      <h1 style={{ font: 'var(--text-heading-2)', marginBottom: 'var(--space-5)' }}>Staff sign in</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Field label="Email" htmlFor="email">
          <Input id="email" name="email" type="email" placeholder="you@yourorg.org" required />
        </Field>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send magic link'}
          </Button>
          {error && <span style={{ color: 'var(--color-red)', font: 'var(--text-caption)' }}>{error}</span>}
        </div>
      </form>
    </section>
  );
}
