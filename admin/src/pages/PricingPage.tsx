import { useEffect, useState, type FormEvent } from 'react';
import { api, ApiError, type PriceList } from '../api';
import { useAuth } from '../AuthContext';

export default function PricingPage() {
  const { admin } = useAuth();
  const [prices, setPrices] = useState<PriceList[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    validFrom: new Date().toISOString().slice(0, 10),
    prixSemaineCabine: '35',
    prixPassageEntretien: '25',
    prixLivraisonForfait: '75',
    remiseSocietePct: '0.10',
    tvaPct: '0.21',
  });

  function load() {
    api.get<PriceList[]>('/admin/pricing').then(setPrices);
  }

  useEffect(load, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await api.post('/admin/pricing', {
        validFrom: form.validFrom,
        prixSemaineCabine: Number(form.prixSemaineCabine),
        prixPassageEntretien: Number(form.prixPassageEntretien),
        prixLivraisonForfait: Number(form.prixLivraisonForfait),
        remiseSocietePct: Number(form.remiseSocietePct),
        tvaPct: Number(form.tvaPct),
      });
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erreur inconnue.');
    }
  }

  return (
    <div>
      <h1>Tarifs</h1>

      <div className="card table-scroll">
        <table className="data-table responsive-table">
          <thead>
            <tr>
              <th>Valide du</th>
              <th>Valide jusqu'au</th>
              <th>Semaine/cabine</th>
              <th>Passage entretien</th>
              <th>Livraison</th>
              <th>Remise societe</th>
              <th>TVA</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((p) => (
              <tr key={p.id}>
                <td data-label="Valide du">{p.validFrom.slice(0, 10)}</td>
                <td data-label="Valide jusqu'au">{p.validUntil?.slice(0, 10) ?? '—'}</td>
                <td data-label="Semaine/cabine">{p.prixSemaineCabine} €</td>
                <td data-label="Passage entretien">{p.prixPassageEntretien} €</td>
                <td data-label="Livraison">{p.prixLivraisonForfait} €</td>
                <td data-label="Remise societe">{Number(p.remiseSocietePct) * 100}%</td>
                <td data-label="TVA">{Number(p.tvaPct) * 100}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Nouvelle grille tarifaire {admin?.role !== 'admin' && <span className="muted">(reserve au role admin)</span>}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid">
            <div className="field">
              <label>Valide a partir du</label>
              <input type="date" value={form.validFrom} onChange={(e) => setForm({ ...form, validFrom: e.target.value })} />
            </div>
            <div className="field">
              <label>Prix / semaine / cabine (€)</label>
              <input type="number" step="0.01" value={form.prixSemaineCabine} onChange={(e) => setForm({ ...form, prixSemaineCabine: e.target.value })} />
            </div>
            <div className="field">
              <label>Prix / passage d'entretien (€)</label>
              <input type="number" step="0.01" value={form.prixPassageEntretien} onChange={(e) => setForm({ ...form, prixPassageEntretien: e.target.value })} />
            </div>
            <div className="field">
              <label>Livraison + enlevement forfait (€)</label>
              <input type="number" step="0.01" value={form.prixLivraisonForfait} onChange={(e) => setForm({ ...form, prixLivraisonForfait: e.target.value })} />
            </div>
            <div className="field">
              <label>Remise societe (ex: 0.10 = 10%)</label>
              <input type="number" step="0.01" value={form.remiseSocietePct} onChange={(e) => setForm({ ...form, remiseSocietePct: e.target.value })} />
            </div>
            <div className="field">
              <label>TVA (ex: 0.21 = 21%)</label>
              <input type="number" step="0.01" value={form.tvaPct} onChange={(e) => setForm({ ...form, tvaPct: e.target.value })} />
            </div>
          </div>
          {error && <p className="error-text">{error}</p>}
          <button className="btn" type="submit">
            Enregistrer la nouvelle grille
          </button>
        </form>
      </div>
    </div>
  );
}
