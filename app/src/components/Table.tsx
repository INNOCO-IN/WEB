import type { ReactNode } from 'react';

interface Column<T> {
  header: string;
  render: (row: T) => ReactNode;
}

interface TableProps<T> {
  rows: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string;
  emptyMessage?: string;
}

export function Table<T>({ rows, columns, rowKey, emptyMessage = 'Nothing here yet.' }: TableProps<T>) {
  if (rows.length === 0) {
    return <p style={{ font: 'var(--text-body)', color: 'var(--text-muted)' }}>{emptyMessage}</p>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', font: 'var(--text-body)' }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.header}
                style={{
                  textAlign: 'left',
                  font: 'var(--text-label)',
                  letterSpacing: 'var(--tracking-label)',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  padding: 'var(--space-3) var(--space-3)',
                  borderBottom: 'var(--border-width) solid var(--border-default)',
                  whiteSpace: 'nowrap',
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((col) => (
                <td
                  key={col.header}
                  style={{
                    padding: 'var(--space-3)',
                    borderBottom: 'var(--border-width-hairline) solid var(--border-default)',
                    verticalAlign: 'top',
                  }}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
