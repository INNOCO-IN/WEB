import type { ReactNode } from 'react';

export const fieldStyle: React.CSSProperties = {
  width: '100%',
  font: 'var(--text-body-lg)',
  color: 'var(--text-primary)',
  background: 'var(--surface-page)',
  border: 'var(--border-width) solid var(--color-ink-12)',
  padding: '14px 16px',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  font: 'var(--text-label)',
  letterSpacing: 'var(--tracking-label)',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  marginBottom: 'var(--space-2)',
};

interface FieldProps {
  label: string;
  htmlFor?: string;
  children: ReactNode;
}

export function Field({ label, htmlFor, children }: FieldProps) {
  return (
    <div>
      <label style={labelStyle} htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
}
