import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const NAV_ITEMS = [
  { to: '/', label: 'Tableau de bord', end: true },
  { to: '/commandes', label: 'Commandes' },
  { to: '/planning', label: 'Planning' },
  { to: '/parc', label: 'Parc' },
  { to: '/devis', label: 'Devis' },
  { to: '/tarifs', label: 'Tarifs' },
  { to: '/export', label: 'Export' },
];

export default function Layout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/connexion');
  }

  return (
    <div>
      <header className="app-header">
        <span className="brand">WC Rent Belgium — Administration</span>
        <span className="who">
          {admin?.nom} ({admin?.role}){' '}
          <button className="btn secondary" style={{ marginLeft: 8, padding: '4px 10px' }} onClick={handleLogout}>
            Deconnexion
          </button>
        </span>
      </header>
      <nav className="app-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => (isActive ? 'active' : '')}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
