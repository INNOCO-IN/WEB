import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header
      style={{
        background: 'var(--color-teal)',
        color: 'var(--color-paper)',
        padding: 'var(--space-4) var(--content-side-padding)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Link
        to="/"
        style={{ color: 'inherit', textDecoration: 'none', font: 'var(--text-nav)' }}
      >
        IN
      </Link>
      <nav style={{ display: 'flex', gap: 'var(--space-5)' }}>
        <Link to="/workshops/interest" style={{ color: 'inherit', font: 'var(--text-nav)' }}>
          Workshop interest
        </Link>
        <Link to="/admin" style={{ color: 'inherit', font: 'var(--text-nav)' }}>
          Staff
        </Link>
      </nav>
    </header>
  );
}
