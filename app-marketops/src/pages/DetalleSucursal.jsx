import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';

export default function DetalleSucursal({ sucursales, setSucursales }) {
  const { slug } = useParams();

  // Estados locales para controlar el modal y sus validaciones
  const [equipoAEditar, setEquipoAEditar] = useState(null);
  const [nuevoEstadoPending, setNuevoEstadoPending] = useState('');
  const [motivoTexto, setMotivoTexto] = useState('');
  const [errorMotivo, setErrorMotivo] = useState('');

  const sucursal = sucursales.find((item) => item.slug === slug);
  if (!sucursal) return <Navigate to="/dashboard" replace />;

  const tieneFallas = sucursal.failures.length > 0;

  // Función de actualización de estado global de la aplicación
  const cambiarEstadoEquipo = (idEquipo, nuevoEstado, motivoIngresado) => {
    setSucursales((sucursalesActuales) => {
      return sucursalesActuales.map((item) => {
        if (item.slug !== slug) return item;

        const fallaAnterior = item.failures.find((falla) => falla.id === idEquipo);
        const working = item.working.filter((id) => id !== idEquipo);
        const failures = item.failures.filter((falla) => falla.id !== idEquipo);
        const outOfService = (item.outOfService ?? []).filter((id) => id !== idEquipo);

        if (nuevoEstado === 'funcionando') {
          working.push(idEquipo);
        }

        if (nuevoEstado === 'fallando') {
          failures.push({
            id: idEquipo,
            description: motivoIngresado || fallaAnterior?.description || 'Falla registrada por técnico'
          });
        }

        if (nuevoEstado === 'fuera de servicio') {
          outOfService.push(idEquipo);
        }

        return {
          ...item,
          working,
          failures,
          outOfService
        };
      });
    });
  };

  // Intercepta la selección para solicitar el motivo previo al cambio
  const solicitarCambioEstado = (idEquipo, estadoSeleccionado) => {
    if (!estadoSeleccionado) return;
    setEquipoAEditar(idEquipo);
    setNuevoEstadoPending(estadoSeleccionado);
    setMotivoTexto('');
    setErrorMotivo('');
  };

  // Validación y confirmación del formulario dentro del modal
  const confirmarCambioConMotivo = () => {
    if (!motivoTexto.trim()) {
      setErrorMotivo('El motivo del cambio de estado es obligatorio.');
      return;
    }

    cambiarEstadoEquipo(equipoAEditar, nuevoEstadoPending, motivoTexto);
    setEquipoAEditar(null);
    setNuevoEstadoPending('');
    setMotivoTexto('');
    setErrorMotivo('');
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
          <span className={`estado estado-grande ${tieneFallas ? 'falla' : 'ok'}`}>
            {tieneFallas ? `${sucursal.failures.length} ${sucursal.failures.length === 1 ? 'falla' : 'fallas'}` : 'Todos operativos'}
          </span>
        </section>

        <section className="detail-stats">
          <div className="detail-stat">
            <span className="stat-number">{sucursal.working.length}</span>
            <span>Equipos funcionando</span>
          </div>
          <div className="detail-stat">
            <span className="stat-number">{sucursal.failures.length}</span>
            <span>Equipos con fallas</span>
          </div>
        </section>

        {/* Sección: Equipos Funcionando */}
        <section className="detail-section">
          <h2>Equipos funcionando</h2>
          {sucursal.working.length > 0 ? (
            <ul className="detail-equipment-list">
              {sucursal.working.map((id) => (
                <li key={id}>
                  <span className="status-dot ok-dot" />
                  <span>Equipo {id}</span>
                  <select
                    value="funcionando"
                    aria-label={`Estado del equipo ${id}`}
                    onChange={(event) => solicitarCambioEstado(id, event.target.value)}
                  >
                    <option value="funcionando">Funcionando</option>
                    <option value="fallando">Reportar falla</option>
                    <option value="fuera de servicio">Fuera de servicio</option>
                  </select>
                  <strong>Operativo</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay equipos operativos registrados.</p>
          )}
        </section>

        {/* Sección: Equipos con Fallas */}
        <section className="detail-section">
          <h2>Equipos con fallas</h2>
          {sucursal.failures.length > 0 ? (
            <ul className="detail-equipment-list">
              {sucursal.failures.map((equipo) => (
                <li key={equipo.id}>
                  <span className="status-dot fail-dot" />
                  <span className="equipment-id">
                    Equipo {equipo.id}
                    <small>{equipo.description}</small>
                  </span>
                  <select
                    value="fallando"
                    aria-label={`Estado del equipo ${equipo.id}`}
                    onChange={(event) => solicitarCambioEstado(equipo.id, event.target.value)}
                  >
                    <option value="funcionando">Funcionando</option>
                    <option value="fallando">Fallando</option>
                    <option value="fuera de servicio">Fuera de servicio</option>
                  </select>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">✓</span>
              <div>
                <strong>Sin fallas reportadas</strong>
                <p>Esta sucursal no tiene equipos con fallas en los datos de demostración.</p>
              </div>
            </div>
          )}
        </section>

        {/* Sección: Equipos Fuera de Servicio */}
        <section className="detail-section">
          <h2>Equipos fuera de servicio</h2>
          {(sucursal.outOfService ?? []).length > 0 ? (
            <ul className="detail-equipment-list">
              {(sucursal.outOfService ?? []).map((id) => (
                <li key={id}>
                  <span className="status-dot fail-dot" />
                  <span className="equipment-id">Equipo {id}</span>
                  <select
                    value="fuera de servicio"
                    aria-label={`Estado del equipo ${id}`}
                    onChange={(event) => solicitarCambioEstado(id, event.target.value)}
                  >
                    <option value="funcionando">Funcionando</option>
                    <option value="fallando">Fallando</option>
                    <option value="fuera de servicio">Fuera de servicio</option>
                  </select>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay equipos fuera de servicio.</p>
          )}
        </section>
      </main>

      {/* Ventana modal de confirmación con clases CSS asociadas */}
      {equipoAEditar !== null && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Confirmar cambio de estado</h3>
            <p>
              Vas a cambiar el estado del equipo <strong>{equipoAEditar}</strong> a{' '}
              <strong className="highlight-danger">{nuevoEstadoPending}</strong>.
            </p>

            <div className="form-group">
              <label>
                Motivo del cambio <span>*</span>
              </label>
              <textarea
                rows="3"
                placeholder="Escribe el motivo obligatoriamente..."
                value={motivoTexto}
                onChange={(e) => {
                  setMotivoTexto(e.target.value);
                  setErrorMotivo('');
                }}
              />
              {errorMotivo && <p className="error-text">{errorMotivo}</p>}
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setEquipoAEditar(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={confirmarCambioConMotivo}
              >
                Guardar Cambio
              </button>
            </div>
          </div>
        </div>
      )}

      <footer>MarketOps · Datos de demostración</footer>
    </>
  );
}