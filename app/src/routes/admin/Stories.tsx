import { useEffect, useState } from 'react';
import { Table } from '../../components/Table';
import { listStories, setStoryStatus } from '../../lib/services/stories';
import type { Story, StoryStatus } from '../../lib/database.types';

export function Stories() {
  const [rows, setRows] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  function refresh() {
    listStories()
      .then(setRows)
      .finally(() => setLoading(false));
  }

  useEffect(refresh, []);

  async function updateStatus(id: string, status: StoryStatus) {
    await setStoryStatus(id, status);
    refresh();
  }

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1 style={{ font: 'var(--text-heading-2)', marginBottom: 'var(--space-5)' }}>Stories</h1>
      <Table
        rows={rows}
        rowKey={(r) => r.id}
        emptyMessage="No stories yet."
        columns={[
          { header: 'When', render: (r) => new Date(r.created_at).toLocaleString() },
          { header: 'By', render: (r) => r.credit_name || 'Anonymous' },
          {
            header: 'Story',
            render: (r) => <div style={{ maxWidth: 360 }}>{r.body}</div>,
          },
          { header: 'Format', render: (r) => (r.format ?? []).join(', ') || '—' },
          { header: 'Arc stage', render: (r) => r.arc_stage ?? '—' },
          {
            header: 'Attachment',
            render: (r) =>
              r.attachment_url ? (
                <a href={r.attachment_url} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              ) : (
                '—'
              ),
          },
          {
            header: 'Status',
            render: (r) => (
              <select value={r.status} onChange={(e) => updateStatus(r.id, e.target.value as StoryStatus)}>
                <option value="pending">pending</option>
                <option value="published">published</option>
                <option value="declined">declined</option>
              </select>
            ),
          },
        ]}
      />
    </div>
  );
}
