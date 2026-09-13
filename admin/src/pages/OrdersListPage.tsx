import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, type OrderSummary } from '../api';

const STATUSES = [
  'brouillon',
  'en_attente_paiement',
  'payee',
  'planifiee',
  'livree',
  'en_cours',
  'a_enlever',
  'cloturee',
  'annulee',
  'remboursee',
];

export default function OrdersListPage() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [statut, setStatut] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const query = statut ? `?statut=${statut}` : '';
    api
      .get<OrderSummary[]>(`/admin/orders${query}`)
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [statut]);

  return (
    <div>
      <h1>Commandes</h1>
      <div className="toolbar">
        <select value={statut} onChange={(e) => setStatut(e.target.value)}>
          <option value="">Tous les statuts</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="muted">Chargement...</p>
      ) : (
        <div className="card table-scroll">
          <table className="data-table responsive-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Client</th>
                <th>Statut</th>
                <th>Debut</th>
                <th>Fin</th>
                <th>Cabines</th>
                <th>Province</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td data-label="Reference">
                    <Link to={`/commandes/${o.id}`}>{o.reference}</Link>
                  </td>
                  <td data-label="Client">{o.customer.nom}</td>
                  <td data-label="Statut">
                    <span className={`badge status-${o.status}`}>{o.status}</span>
                  </td>
                  <td data-label="Debut">{o.dateDebut.slice(0, 10)}</td>
                  <td data-label="Fin">{o.dateFin.slice(0, 10)}</td>
                  <td data-label="Cabines">{o.nbCabines}</td>
                  <td data-label="Province">{o.province}</td>
                  <td data-label="Total">{Number(o.montantTotal).toFixed(2)} €</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={8} className="muted">
                    Aucune commande.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
