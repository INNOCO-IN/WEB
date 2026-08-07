import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
}

export function Button({ variant = 'primary', style, ...props }: ButtonProps) {
  const base: React.CSSProperties = {
    font: 'var(--text-button)',
    letterSpacing: 'var(--tracking-button)',
    borderRadius: 'var(--radius-pill)',
    padding: '15px 34px',
    border: 'var(--border-width) solid transparent',
    cursor: 'pointer',
  };
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: 'var(--color-ink)', color: 'var(--color-paper)' },
    ghost: {
      background: 'transparent',
      color: 'var(--text-primary)',
      borderColor: 'var(--border-default)',
    },
  };
  return <button {...props} style={{ ...base, ...variants[variant], ...style }} />;
}
