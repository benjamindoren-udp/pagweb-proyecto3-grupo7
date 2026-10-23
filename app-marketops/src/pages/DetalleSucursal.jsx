import { Link, Navigate, useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { sucursales } from '../data/sucursales.js';

export default function DetalleSucursal() {
  const { slug } = useParams();
  const sucursal = sucursales.find((item) => item.slug === slug);
  if (!sucursal) return <Navigate to="/dashboard" replace />;

  const tieneFallas = sucursal.failures.length > 0;
  return (
    <>
      <Header title={`Sucursal ${sucursal.id} — ${sucursal.name}`} subtitle="Detalle de equipos" backTo="/dashboard" />
      <main className="detail-main">
        <Link className="back-link" to="/dashboard">← Regresar a todas las sucursales</Link>
        <section className="detail-intro">
          <div>
            <p className="eyebrow">INFORMACIÓN DE SUCURSAL</p>
            <h2>{sucursal.name}</h2>
            <p>Revisa el estado de los equipos registrados en esta sucursal.</p>
          </div>
          <span className={`estado estado-grande ${tieneFallas ? 'falla' : 'ok'}`}>{tieneFallas ? `${sucursal.failures.length} ${sucursal.failures.length === 1 ? 'falla' : 'fallas'}` : 'Todos operativos'}</span>
        </section>
        <section className="detail-stats">
          <div className="detail-stat"><span className="stat-number">{sucursal.working.length}</span><span>Equipos funcionando</span></div>
          <div className="detail-stat"><span className="stat-number">{sucursal.failures.length}</span><span>Equipos con fallas</span></div>
        </section>
        <section className="detail-section">
          <h2>Equipos funcionando</h2>
          {sucursal.working.length > 0 ? (
            <ul className="detail-equipment-list">{sucursal.working.map((id) => <li key={id}><span className="status-dot ok-dot" /><span>Equipo {id}</span><strong>Operativo</strong></li>)}</ul>
          ) : <p>No hay equipos operativos registrados.</p>}
        </section>
        <section className="detail-section">
          <h2>Equipos con fallas</h2>
          {sucursal.failures.length > 0 ? (
            <ul className="detail-equipment-list">{sucursal.failures.map((equipo) => <li key={equipo.id}><span className="status-dot fail-dot" /><span className="equipment-id">Equipo {equipo.id}<small>{equipo.description}</small></span><strong className="failure-status">Requiere revisión</strong></li>)}</ul>
          ) : <div className="empty-state"><span className="empty-icon">✓</span><div><strong>Sin fallas reportadas</strong><p>Esta sucursal no tiene equipos con fallas en los datos de demostración.</p></div></div>}
        </section>
      </main>
      <footer>MarketOps · Datos de demostración</footer>
    </>
  );
}
