import type { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Layout from './Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import OrdersListPage from './pages/OrdersListPage';
import OrderDetailPage from './pages/OrderDetailPage';
import PlanningPage from './pages/PlanningPage';
import FleetPage from './pages/FleetPage';
import QuotesPage from './pages/QuotesPage';
import PricingPage from './pages/PricingPage';
import ExportPage from './pages/ExportPage';

function RequireAuth({ children }: { children: ReactElement }) {
  const { admin, loading } = useAuth();
  if (loading) return <p style={{ padding: 24 }}>Chargement...</p>;
  if (!admin) return <Navigate to="/connexion" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/connexion" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="commandes" element={<OrdersListPage />} />
        <Route path="commandes/:id" element={<OrderDetailPage />} />
        <Route path="planning" element={<PlanningPage />} />
        <Route path="parc" element={<FleetPage />} />
        <Route path="devis" element={<QuotesPage />} />
        <Route path="tarifs" element={<PricingPage />} />
        <Route path="export" element={<ExportPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
