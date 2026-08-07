import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import { WorkshopInterest } from './routes/WorkshopInterest';
import { Login } from './routes/admin/Login';
import { AdminLayout } from './routes/admin/AdminLayout';
import { Submissions } from './routes/admin/Submissions';
import { Stories } from './routes/admin/Stories';
import { WorkshopSignups } from './routes/admin/WorkshopSignups';
import { Workshops } from './routes/admin/Workshops';

function Home() {
  return (
    <section style={{ padding: 'var(--space-9) var(--content-side-padding)' }}>
      <h1 style={{ font: 'var(--text-heading-1)' }}>IN — app</h1>
      <p style={{ font: 'var(--text-body-lg)', color: 'var(--text-muted)', marginTop: 'var(--space-3)' }}>
        Workshop intake and staff review tools for the IN site.
      </p>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workshops/interest" element={<WorkshopInterest />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Submissions />} />
          <Route path="stories" element={<Stories />} />
          <Route path="workshop-signups" element={<WorkshopSignups />} />
          <Route path="workshops" element={<Workshops />} />
        </Route>
      </Routes>
    </>
  );
}
