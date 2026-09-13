export default function ExportPage() {
  return (
    <div>
      <h1>Export comptabilite</h1>
      <div className="card">
        <p className="muted">Les fichiers sont generes a la demande, au format CSV (separateur point-virgule).</p>
        <div className="toolbar">
          <a className="btn" href="/api/admin/export/orders.csv">
            Telecharger les commandes (CSV)
          </a>
          <a className="btn secondary" href="/api/admin/export/invoices.csv">
            Telecharger les factures (CSV)
          </a>
        </div>
      </div>
    </div>
  );
}
