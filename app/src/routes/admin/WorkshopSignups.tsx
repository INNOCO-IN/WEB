import { useEffect, useState } from 'react';
import { Table } from '../../components/Table';
import { listWorkshopRegistrations } from '../../lib/services/workshops';
import type { WorkshopRegistration } from '../../lib/database.types';

export function WorkshopSignups() {
  const [rows, setRows] = useState<WorkshopRegistration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listWorkshopRegistrations()
      .then(setRows)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1 style={{ font: 'var(--text-heading-2)', marginBottom: 'var(--space-5)' }}>
        Workshop signups
      </h1>
      <Table
        rows={rows}
        rowKey={(r) => r.id}
        emptyMessage="No workshop interest yet."
        columns={[
          { header: 'When', render: (r) => new Date(r.created_at).toLocaleString() },
          { header: 'Workshop', render: (r) => r.workshop_slug ?? '—' },
          { header: 'Name', render: (r) => r.name },
          { header: 'Email', render: (r) => r.email },
          { header: 'Org', render: (r) => r.org ?? '—' },
          { header: 'Message', render: (r) => r.message ?? '—' },
          { header: 'Status', render: (r) => r.status },
        ]}
      />
    </div>
  );
}
