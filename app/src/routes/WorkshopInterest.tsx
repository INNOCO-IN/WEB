import { useEffect, useState, type FormEvent } from 'react';
import { Field } from '../components/Field';
import { Input, Textarea } from '../components/Input';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { listActiveWorkshops, insertWorkshopRegistration } from '../lib/services/workshops';
import type { Workshop } from '../lib/database.types';

type Status = 'idle' | 'submitting' | 'done' | 'error';

export function WorkshopInterest() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listActiveWorkshops()
      .then(setWorkshops)
      .catch(() => setWorkshops([]));
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Spam honeypot — mirrors the pattern already used on the legacy forms.
    if (data.get('_hp')) return;

    setStatus('submitting');
    setError(null);
    try {
      const workshopId = data.get('workshop_id') as string;
      const workshop = workshops.find((w) => w.id === workshopId);
      await insertWorkshopRegistration({
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        org: String(data.get('org') ?? '') || undefined,
        message: String(data.get('message') ?? '') || undefined,
        workshop_id: workshop?.id,
        workshop_slug: workshop?.slug,
        source_page: 'app/workshops/interest',
      });
      setStatus('done');
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <section style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--space-9) var(--content-side-padding)' }}>
        <h1 style={{ font: 'var(--text-heading-1)' }}>Thanks — we've got it.</h1>
        <p style={{ font: 'var(--text-body-lg)', color: 'var(--text-muted)', marginTop: 'var(--space-3)' }}>
          We'll be in touch about the workshop soon.
        </p>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--space-9) var(--content-side-padding)' }}>
      <h1 style={{ font: 'var(--text-heading-1)', marginBottom: 'var(--space-3)' }}>
        Bring a workshop to your community.
      </h1>
      <p style={{ font: 'var(--text-body-lg)', color: 'var(--text-muted)', marginBottom: 'var(--space-7)' }}>
        Tell us which one you're interested in and we'll reach out with next steps.
      </p>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
      >
        <input
          type="text"
          name="_hp"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
        />
        <Field label="Workshop" htmlFor="workshop_id">
          <Select id="workshop_id" name="workshop_id" required defaultValue="">
            <option value="" disabled>
              Choose a workshop
            </option>
            {workshops.map((w) => (
              <option key={w.id} value={w.id}>
                {w.title}
              </option>
            ))}
            <option value="other">Something else</option>
          </Select>
        </Field>
        <Field label="Name" htmlFor="name">
          <Input id="name" name="name" type="text" placeholder="Your name" required />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </Field>
        <Field label="Organization (optional)" htmlFor="org">
          <Input id="org" name="org" type="text" placeholder="School, collective, company…" />
        </Field>
        <Field label="Message (optional)" htmlFor="message">
          <Textarea id="message" name="message" rows={4} placeholder="Anything else we should know?" />
        </Field>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
          <Button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send interest'}
          </Button>
          {error && <span style={{ color: 'var(--color-red)', font: 'var(--text-caption)' }}>{error}</span>}
        </div>
      </form>
    </section>
  );
}
