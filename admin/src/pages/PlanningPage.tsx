import { useEffect, useState } from 'react';
import { api } from '../api';

interface WeekOrder {
  id: string;
  reference: string;
  dateDebut: string;
  dateFin: string;
  adresseVille: string;
  customer: { nom: string; telephone: string };
}

interface WeekVisit {
  id: string;
  datePlanifiee: string;
  statut: string;
  technicien: string | null;
  order: { reference: string; adresseVille: string; customer: { nom: string } };
}

interface WeekData {
  livraisons: WeekOrder[];
  enlevements: WeekOrder[];
  entretiens: WeekVisit[];
}

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7; // lundi = 0
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function toInputDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export default function PlanningPage() {
  const [from, setFrom] = useState(toInputDate(startOfWeek(new Date())));
  const [to, setTo] = useState(() => {
    const d = startOfWeek(new Date());
    d.setDate(d.getDate() + 6);
    return toInputDate(d);
  });
  const [data, setData] = useState<WeekData | null>(null);

  function load() {
    api.get<WeekData>(`/admin/planning/week?from=${from}&to=${to}`).then(setData);
  }

  useEffect(load, [from, to]);

  async function assign(visitId: string) {
    const technicien = prompt('Nom du technicien assigne ?');
    if (!technicien) return;
    await api.patch(`/admin/planning/visits/${visitId}/assign`, { technicien });
    load();
  }

  async function markDone(visitId: string) {
    await api.patch(`/admin/planning/visits/${visitId}/done`, {});
    load();
  }

  return (
    <div>
      <h1>Planning</h1>
      <div className="toolbar">
        <label>
          Du <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </label>
        <label>
          Au <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </label>
      </div>

      {!data ? (
        <p className="muted">Chargement...</p>
      ) : (
        <>
          <div className="card">
            <h2>Livraisons ({data.livraisons.length})</h2>
            <ul>
              {data.livraisons.map((o) => (
                <li key={o.id}>
                  {o.dateDebut.slice(0, 10)} — {o.reference} — {o.customer.nom} ({o.adresseVille}, {o.customer.telephone})
                </li>
              ))}
              {data.livraisons.length === 0 && <li className="muted">Aucune.</li>}
            </ul>
          </div>

          <div className="card">
            <h2>Enlevements ({data.enlevements.length})</h2>
            <ul>
              {data.enlevements.map((o) => (
                <li key={o.id}>
                  {o.dateFin.slice(0, 10)} — {o.reference} — {o.customer.nom} ({o.adresseVille}, {o.customer.telephone})
                </li>
              ))}
              {data.enlevements.length === 0 && <li className="muted">Aucun.</li>}
            </ul>
          </div>

          <div className="card">
            <h2>Entretiens ({data.entretiens.length})</h2>
            <ul style={{ padding: 0, listStyle: 'none' }}>
              {data.entretiens.map((v) => (
                <li
                  key={v.id}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 8,
                    paddingBottom: 8,
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <span>
                    {v.datePlanifiee.slice(0, 10)} — {v.order.reference} — {v.order.customer.nom} ({v.order.adresseVille}) —{' '}
                    <span className="badge">{v.statut}</span> {v.technicien ? `— ${v.technicien}` : ''}
                  </span>
                  <button className="btn secondary" style={{ padding: '6px 10px', fontSize: 13 }} onClick={() => assign(v.id)}>
                    Assigner
                  </button>
                  {v.statut !== 'effectue' && (
                    <button className="btn secondary" style={{ padding: '6px 10px', fontSize: 13 }} onClick={() => markDone(v.id)}>
                      Marquer effectue
                    </button>
                  )}
                </li>
              ))}
              {data.entretiens.length === 0 && <li className="muted">Aucun.</li>}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
