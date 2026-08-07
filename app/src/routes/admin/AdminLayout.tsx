import { NavLink, Outlet } from 'react-router-dom';
import { signOut } from '../../lib/auth';

const tabs = [
  { to: '/admin', label: 'Submissions', end: true },
  { to: '/admin/stories', label: 'Stories' },
  { to: '/admin/workshop-signups', label: 'Workshop signups' },
  { to: '/admin/workshops', label: 'Workshops' },
];

export function AdminLayout() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--content-side-padding)',
          borderBottom: 'var(--border-width-hairline) solid var(--border-default)',
        }}
      >
        <nav style={{ display: 'flex', gap: 'var(--space-5)' }}>
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              style={({ isActive }) => ({
                display: 'inline-block',
                padding: 'var(--space-4) 0',
                font: 'var(--text-nav)',
                color: isActive ? 'var(--color-teal)' : 'var(--text-primary)',
                textDecoration: 'none',
                borderBottom: isActive ? 'var(--border-width) solid var(--color-teal)' : 'none',
              })}
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => signOut()}
          style={{
            background: 'none',
            border: 'none',
            font: 'var(--text-nav)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          Sign out
        </button>
      </div>
      <div style={{ padding: 'var(--space-6) var(--content-side-padding)' }}>
        <Outlet />
      </div>
    </div>
  );
}
