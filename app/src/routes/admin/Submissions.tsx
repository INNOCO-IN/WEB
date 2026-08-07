import { useEffect, useState } from 'react';
import { Table } from '../../components/Table';
import { listSubmissions, setSubmissionStatus } from '../../lib/services/submissions';
import type { Submission, SubmissionStatus } from '../../lib/database.types';

export function Submissions() {
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  function refresh() {
    listSubmissions()
      .then(setRows)
      .finally(() => setLoading(false));
  }

  useEffect(refresh, []);

  async function updateStatus(id: string, status: SubmissionStatus) {
    await setSubmissionStatus(id, status);
    refresh();
  }

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1 style={{ font: 'var(--text-heading-2)', marginBottom: 'var(--space-5)' }}>
        Connect submissions
      </h1>
      <Table
        rows={rows}
        rowKey={(r) => r.id}
        emptyMessage="No submissions yet."
        columns={[
          { header: 'When', render: (r) => new Date(r.created_at).toLocaleString() },
          { header: 'Name', render: (r) => r.name },
          { header: 'Email', render: (r) => r.email },
          { header: 'Brings', render: (r) => r.brings ?? '—' },
          { header: 'Message', render: (r) => r.message ?? '—' },
          {
            header: 'Status',
            render: (r) => (
              <select
                value={r.status}
                onChange={(e) => updateStatus(r.id, e.target.value as SubmissionStatus)}
              >
                <option value="new">new</option>
                <option value="contacted">contacted</option>
                <option value="archived">archived</option>
              </select>
            ),
          },
        ]}
      />
    </div>
  );
}
