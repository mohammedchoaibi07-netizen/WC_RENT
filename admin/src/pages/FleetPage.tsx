import { useEffect, useState, type FormEvent } from 'react';
import { api, type Unit } from '../api';

const STATES = ['disponible', 'en_location', 'maintenance', 'hors_service'];

export default function FleetPage() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [newCode, setNewCode] = useState('');

  function load() {
    api.get<Unit[]>('/admin/fleet').then(setUnits);
  }

  useEffect(load, []);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!newCode) return;
    await api.post('/admin/fleet', { code: newCode });
    setNewCode('');
    load();
  }

  async function setState(id: string, etat: string) {
    await api.patch(`/admin/fleet/${id}/state`, { etat });
    load();
  }

  return (
    <div>
      <h1>Parc de cabines</h1>

      <form onSubmit={handleCreate} className="toolbar">
        <input placeholder="Code cabine (ex: CAB-016)" value={newCode} onChange={(e) => setNewCode(e.target.value)} />
        <button className="btn" type="submit">
          Ajouter une cabine
        </button>
      </form>

      <div className="card table-scroll">
        <table className="data-table responsive-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Etat</th>
              <th>Dernier controle</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {units.map((u) => (
              <tr key={u.id}>
                <td data-label="Code">{u.code}</td>
                <td data-label="Etat">
                  <span className="badge">{u.etat}</span>
                </td>
                <td data-label="Dernier controle">{u.dernierControle?.slice(0, 10) ?? '—'}</td>
                <td data-label="Notes">{u.notes ?? '—'}</td>
                <td data-label="Action">
                  <select value={u.etat} onChange={(e) => setState(u.id, e.target.value)}>
                    {STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
