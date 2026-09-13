import { useEffect, useState, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { api, ApiError } from '../api';

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

interface OrderDetail {
  id: string;
  reference: string;
  status: string;
  clientType: string;
  dateDebut: string;
  dateFin: string;
  nbCabines: number;
  passagesParSemaine: number;
  adresseRue: string;
  adresseCp: string;
  adresseVille: string;
  province: string;
  montantLocation: string;
  montantRemise: string;
  montantEntretien: string;
  montantLivraison: string;
  montantHtva: string;
  montantTva: string;
  montantTotal: string;
  moyenPaiement: string | null;
  customer: { nom: string; email: string; telephone: string; societeNom: string | null };
  invoice: { numero: string } | null;
  serviceVisits: Array<{ id: string; datePlanifiee: string; statut: string; technicien: string | null }>;
  statusEvents: Array<{ id: string; from: string | null; to: string; auteur: string; note: string | null; createdAt: string }>;
}

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [note, setNote] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function load() {
    if (!id) return;
    api.get<OrderDetail>(`/admin/orders/${id}`).then((o) => {
      setOrder(o);
      setNewStatus(o.status);
    });
  }

  useEffect(load, [id]);

  async function handleStatusChange(e: FormEvent) {
    e.preventDefault();
    if (!id) return;
    setError(null);
    setMessage(null);
    try {
      await api.patch(`/admin/orders/${id}/status`, { to: newStatus, note: note || undefined });
      setMessage('Statut mis a jour.');
      setNote('');
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erreur inconnue.');
    }
  }

  async function handleAddNote(e: FormEvent) {
    e.preventDefault();
    if (!id || !note) return;
    setError(null);
    try {
      await api.post(`/admin/orders/${id}/notes`, { note });
      setMessage('Note ajoutee.');
      setNote('');
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erreur inconnue.');
    }
  }

  async function handleResend() {
    if (!id) return;
    setError(null);
    try {
      await api.post(`/admin/orders/${id}/resend-confirmation`);
      setMessage('Confirmation renvoyee.');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erreur inconnue.');
    }
  }

  async function handleRefund() {
    if (!id) return;
    if (!confirm('Confirmer le remboursement integral de cette commande ?')) return;
    setError(null);
    try {
      await api.post(`/admin/orders/${id}/refund`);
      setMessage('Remboursement effectue.');
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erreur inconnue.');
    }
  }

  if (!order) return <p className="muted">Chargement...</p>;

  return (
    <div>
      <h1>
        Commande {order.reference} <span className={`badge status-${order.status}`}>{order.status}</span>
      </h1>

      {message && <p style={{ color: 'var(--success)' }}>{message}</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="grid">
        <div className="card">
          <h2>Client</h2>
          <p>
            {order.customer.nom} {order.customer.societeNom ? `(${order.customer.societeNom})` : ''}
            <br />
            {order.customer.email} — {order.customer.telephone}
            <br />
            Type : {order.clientType}
          </p>
        </div>
        <div className="card">
          <h2>Livraison</h2>
          <p>
            {order.adresseRue}, {order.adresseCp} {order.adresseVille} ({order.province})
            <br />
            Du {order.dateDebut.slice(0, 10)} au {order.dateFin.slice(0, 10)}
            <br />
            {order.nbCabines} cabine(s), {order.passagesParSemaine} passage(s)/semaine
          </p>
        </div>
        <div className="card">
          <h2>Montants</h2>
          <p>
            Location : {order.montantLocation} €<br />
            Remise : -{order.montantRemise} €<br />
            Entretien : {order.montantEntretien} €<br />
            Livraison : {order.montantLivraison} €<br />
            <strong>Total TTC : {order.montantTotal} €</strong>
            <br />
            Paiement : {order.moyenPaiement ?? '—'}
            <br />
            Facture : {order.invoice?.numero ?? 'non emise'}
          </p>
        </div>
      </div>

      <div className="card">
        <h2>Changer le statut</h2>
        <form onSubmit={handleStatusChange} className="toolbar">
          <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input placeholder="Note (optionnel)" value={note} onChange={(e) => setNote(e.target.value)} style={{ flex: 1, minWidth: 160, padding: 8 }} />
          <button className="btn" type="submit">
            Appliquer
          </button>
        </form>
        <div className="toolbar">
          <button className="btn secondary" onClick={handleAddNote} type="button">
            Ajouter comme note seule
          </button>
          <button className="btn secondary" onClick={handleResend} type="button">
            Renvoyer la confirmation
          </button>
          <button className="btn danger" onClick={handleRefund} type="button">
            Rembourser
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Entretiens</h2>
        {order.serviceVisits.length === 0 && <p className="muted">Aucun passage programme.</p>}
        <ul>
          {order.serviceVisits.map((v) => (
            <li key={v.id}>
              {v.datePlanifiee.slice(0, 10)} — {v.statut} {v.technicien ? `(${v.technicien})` : ''}
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Historique</h2>
        <ul>
          {order.statusEvents.map((e) => (
            <li key={e.id}>
              {new Date(e.createdAt).toLocaleString('fr-BE')} — {e.from ?? '—'} → {e.to} ({e.auteur})
              {e.note ? ` — ${e.note}` : ''}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
