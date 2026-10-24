import { Link, Navigate, useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import {usuarios} from '../data/Usuarios.js';
export default function DetalleSucursal({sucursales,
  setSucursales, usuario}) {


  const { slug } = useParams();
  const sucursal = sucursales.find((item) => item.slug.toLowerCase() === slug.toLowerCase());
  if (!sucursal) return <Navigate to="/dashboard" replace />;
  if (!usuario) return <Navigate to="/" replace />;

  const rolUsuario = (usuario.rol || '').toLowerCase();
  const slugUsuario = (usuario.slug || '').toLowerCase();

  if ((rolUsuario === 'encargado' || rolUsuario === 'encargada') && slugUsuario && slugUsuario !== slug.toLowerCase()) {
    return <Navigate to="/dashboard" replace />;
  }

  const tieneFallas = sucursal.failures.length > 0;
  const cambiarEstadoEquipo=(idEquipo, nuevoEstado) => {
    setSucursales((sucursalesActuales) => {
      return sucursalesActuales.map((item) => {
        if(item.slug!==slug) return item;
        const fallaAnterior =item.failures.find((falla) => falla.id === idEquipo);
        const working=item.working.filter((id) => id !== idEquipo);
        const failures = item.failures.filter((falla) => falla.id !== idEquipo);
        const outOfService = (item.outOfService ?? []).filter((id) => id !== idEquipo);
        if(nuevoEstado==='funcionando') {
          working.push(idEquipo);
        }

        if(nuevoEstado==='fallando') {
          failures.push({
            id: idEquipo,
            description:
            fallaAnterior?.description ?? `Falla registrada por ${usuario.rol}`
          });
        }
        if(nuevoEstado==='fuera de servicio') {
          outOfService.push(idEquipo);
        }

        return {
          ...item,
          working,
          failures,
          outOfService
        };
      } );
    });
  };
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
            <ul className="detail-equipment-list">{sucursal.working.map((id) => 
            <li key={id}>
              <span className="status-dot ok-dot" />
              <span>Equipo {id}</span>
              <select
              value = "funcionando"
              aria-label={`Estado del equipo ${id}`}
              onChange={(event)=> cambiarEstadoEquipo(id, event.target.value)}
              >
              <option value="funcionando">Funcionando</option>
              <option value="fallando">Reportar falla</option>
              <option value="fuera de servicio">Fuera de servicio</option>
              </select>
              
              <strong>Operativo</strong></li>)}</ul>
          ) : <p>No hay equipos operativos registrados.</p>}
        </section>
        <section className="detail-section">
          <h2>Equipos con fallas</h2>
          {sucursal.failures.length > 0 ? (
            <ul className="detail-equipment-list">{sucursal.failures.map((equipo) => <li key={equipo.id}><span className="status-dot fail-dot" /><span className="equipment-id">Equipo {equipo.id}<small>{equipo.description}</small></span>
            
<select
  value="fallando"
  aria-label={`Estado del equipo ${equipo.id}`}
  onChange={(event) =>
    cambiarEstadoEquipo(equipo.id, event.target.value)
  }
>
  <option value="funcionando">Funcionando</option>
  <option value="fallando">Fallando</option>
  <option value="fuera de servicio">
    Fuera de servicio
  </option>
</select>
</li>)}</ul>
          ) : <div className="empty-state"><span className="empty-icon">✓</span><div><strong>Sin fallas reportadas</strong><p>Esta sucursal no tiene equipos con fallas en los datos de demostración.</p></div></div>}
        </section>
        <section className="detail-section">
  <h2>Equipos fuera de servicio</h2>

  {(sucursal.outOfService ?? []).length > 0 ? (
    <ul className="detail-equipment-list">
      {(sucursal.outOfService ?? []).map((id) => (
        <li key={id}>
          <span className="status-dot fail-dot" />

          <span className="equipment-id">
            Equipo {id}
          </span>

          <select
            value="fuera de servicio"
            aria-label={`Estado del equipo ${id}`}
            onChange={(event) =>
              cambiarEstadoEquipo(id, event.target.value)
            }
          >
            <option value="funcionando">
              Funcionando
            </option>

            <option value="fallando">
              Fallando
            </option>

            <option value="fuera de servicio">
              Fuera de servicio
            </option>
          </select>
        </li>
      ))}
    </ul>
  ) : (
    <p>No hay equipos fuera de servicio.</p>
  )}
</section>
      </main>
      <footer>MarketOps · Datos de demostración</footer>
    </>
  );
}
