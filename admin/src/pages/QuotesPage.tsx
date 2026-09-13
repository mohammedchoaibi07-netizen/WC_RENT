import { useEffect, useState } from 'react';
import { api, type QuoteRequest } from '../api';

const STATUSES = ['nouveau', 'en_cours', 'devis_envoye', 'gagne', 'perdu'];

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);

  function load() {
    api.get<QuoteRequest[]>('/admin/quotes').then(setQuotes);
  }

  useEffect(load, []);

  async function setStatus(id: string, statut: string) {
    await api.patch(`/admin/quotes/${id}/status`, { statut });
    load();
  }

  return (
    <div>
      <h1>Demandes de devis</h1>
      <div className="card table-scroll">
        <table className="data-table responsive-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Nom</th>
              <th>Contact</th>
              <th>Code postal</th>
              <th>Besoin</th>
              <th>Details</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q.id}>
                <td data-label="Date">{new Date(q.createdAt).toLocaleDateString('fr-BE')}</td>
                <td data-label="Nom">{q.nom}</td>
                <td data-label="Contact">
                  {q.telephone}
                  <br />
                  {q.email}
                </td>
                <td data-label="Code postal">{q.codePostal}</td>
                <td data-label="Besoin">{q.typeBesoin}</td>
                <td data-label="Details" style={{ whiteSpace: 'normal', maxWidth: 240 }}>
                  {q.details ?? '—'}
                </td>
                <td data-label="Statut">
                  <select value={q.statut} onChange={(e) => setStatus(q.id, e.target.value)}>
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {quotes.length === 0 && (
              <tr>
                <td colSpan={7} className="muted">
                  Aucune demande.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
