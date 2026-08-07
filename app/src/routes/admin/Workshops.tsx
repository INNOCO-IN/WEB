import { useEffect, useState, type FormEvent } from 'react';
import { Table } from '../../components/Table';
import { Field } from '../../components/Field';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { listWorkshops, upsertWorkshop } from '../../lib/services/workshops';
import type { Workshop } from '../../lib/database.types';

export function Workshops() {
  const [rows, setRows] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function refresh() {
    listWorkshops()
      .then(setRows)
      .finally(() => setLoading(false));
  }

  useEffect(refresh, []);

  async function toggleActive(w: Workshop) {
    await upsertWorkshop({ id: w.id, slug: w.slug, title: w.title, active: !w.active, sort_order: w.sort_order });
    refresh();
  }

  async function handleAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setError(null);
    try {
      await upsertWorkshop({
        slug: String(data.get('slug') ?? ''),
        title: String(data.get('title') ?? ''),
      });
      form.reset();
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not add workshop.');
    }
  }

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1 style={{ font: 'var(--text-heading-2)', marginBottom: 'var(--space-5)' }}>Workshops</h1>
      <Table
        rows={rows}
        rowKey={(r) => r.id}
        emptyMessage="No workshops in the catalog yet."
        columns={[
          { header: 'Title', render: (r) => r.title },
          { header: 'Slug', render: (r) => r.slug },
          { header: 'Sort', render: (r) => r.sort_order },
          {
            header: 'Active',
            render: (r) => (
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input type="checkbox" checked={r.active} onChange={() => toggleActive(r)} />
                {r.active ? 'active' : 'hidden'}
              </label>
            ),
          },
        ]}
      />

      <h2 style={{ font: 'var(--text-heading-2)', margin: 'var(--space-8) 0 var(--space-4)' }}>
        Add a workshop
      </h2>
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div style={{ flex: '1 1 200px' }}>
          <Field label="Title" htmlFor="title">
            <Input id="title" name="title" type="text" placeholder="Workshop title" required />
          </Field>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <Field label="Slug" htmlFor="slug">
            <Input id="slug" name="slug" type="text" placeholder="workshop-slug" required />
          </Field>
        </div>
        <Button type="submit">Add</Button>
      </form>
      {error && <p style={{ color: 'var(--color-red)', font: 'var(--text-caption)', marginTop: 'var(--space-3)' }}>{error}</p>}
    </div>
  );
}
