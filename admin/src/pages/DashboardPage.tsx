import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

interface DashboardData {
  aLivrerAujourdhui: Array<{ id: string; reference: string; adresseVille: string; customer: { nom: string } }>;
  aEnleverAujourdhui: Array<{ id: string; reference: string; adresseVille: string; customer: { nom: string } }>;
  entretiensPrevus: Array<{ id: string; order: { reference: string; adresseVille: string } }>;
  devisNonTraites: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<DashboardData>('/admin/dashboard')
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="muted">Chargement...</p>;
  if (!data) return <p className="error-text">Impossible de charger le tableau de bord.</p>;

  return (
    <div>
      <h1>Tableau de bord</h1>
      <div className="grid" style={{ marginBottom: 20 }}>
        <div className="stat-tile">
          <div className="value">{data.aLivrerAujourdhui.length}</div>
          <div className="muted">A livrer aujourd'hui</div>
        </div>
        <div className="stat-tile">
          <div className="value">{data.aEnleverAujourdhui.length}</div>
          <div className="muted">A enlever aujourd'hui</div>
        </div>
        <div className="stat-tile">
          <div className="value">{data.entretiensPrevus.length}</div>
          <div className="muted">Entretiens prevus</div>
        </div>
        <div className="stat-tile">
          <div className="value">{data.devisNonTraites}</div>
          <div className="muted">Devis non traites</div>
        </div>
      </div>

      <div className="card">
        <h2>A livrer aujourd'hui</h2>
        {data.aLivrerAujourdhui.length === 0 && <p className="muted">Rien a livrer aujourd'hui.</p>}
        <ul>
          {data.aLivrerAujourdhui.map((o) => (
            <li key={o.id}>
              <Link to={`/commandes/${o.id}`}>{o.reference}</Link> — {o.customer.nom} ({o.adresseVille})
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>A enlever aujourd'hui</h2>
        {data.aEnleverAujourdhui.length === 0 && <p className="muted">Rien a enlever aujourd'hui.</p>}
        <ul>
          {data.aEnleverAujourdhui.map((o) => (
            <li key={o.id}>
              <Link to={`/commandes/${o.id}`}>{o.reference}</Link> — {o.customer.nom} ({o.adresseVille})
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Entretiens prevus</h2>
        {data.entretiensPrevus.length === 0 && <p className="muted">Aucun entretien prevu aujourd'hui.</p>}
        <ul>
          {data.entretiensPrevus.map((v) => (
            <li key={v.id}>
              {v.order.reference} — {v.order.adresseVille}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
