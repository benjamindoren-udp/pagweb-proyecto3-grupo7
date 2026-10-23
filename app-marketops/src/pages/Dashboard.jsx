import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import SucursalCard from '../components/SucursalCard.jsx';
import { sucursales } from '../data/sucursales.js';

export default function Dashboard({ rol = 'Técnico' }) {
  const [filtro, setFiltro] = useState('todas');
  const sucursalesConFallas = sucursales.filter((s) => s.failures.length > 0);
  const totalFallas = sucursales.reduce((total, s) => total + s.failures.length, 0);
  const totalOperativos = sucursales.reduce((total, s) => total + s.working.length, 0);

  const sucursalesVisibles = useMemo(() => {
    if (filtro === 'fallas') return sucursales.filter((s) => s.failures.length > 0);
    if (filtro === 'ok') return sucursales.filter((s) => s.failures.length === 0);
    return sucursales;
  }, [filtro]);

  const fallasConsolidadas = sucursales.flatMap((s) => s.failures.map((f) => ({ ...f, branch: s })));

  return (
    <>
      <Header title="MarketOps — Dashboard de Equipos" subtitle={`Vista de ${rol.toLowerCase()} · Datos de demostración`} />
      <main>
        <div className="nota-ejemplo">
          <b>Maqueta académica:</b> se muestran datos de ejemplo del HTML original. El inicio de sesión y los datos aún no están conectados a un backend.
        </div>

        <h2>Resumen general</h2>
        <section className="resumen">
          <div className="tarjeta-resumen"><div className="valor">{sucursales.length}</div><div className="etiqueta">Sucursales monitoreadas</div></div>
          <div className="tarjeta-resumen alerta"><div className="valor">{sucursalesConFallas.length}</div><div className="etiqueta">Sucursales con fallas</div></div>
          <div className="tarjeta-resumen ok"><div className="valor">{sucursales.length - sucursalesConFallas.length}</div><div className="etiqueta">Sucursales sin fallas</div></div>
          <div className="tarjeta-resumen alerta"><div className="valor">{totalFallas}</div><div className="etiqueta">Equipos con fallas</div></div>
          <div className="tarjeta-resumen ok"><div className="valor">{totalOperativos}</div><div className="etiqueta">Equipos funcionando</div></div>
        </section>

        <h2>Equipos con fallas (consolidado)</h2>
        {fallasConsolidadas.length > 0 ? (
          <div className="table-scroll">
            <table className="fallas">
              <thead><tr><th>Sucursal</th><th>Equipo (ID)</th><th>Falla reportada</th></tr></thead>
              <tbody>{fallasConsolidadas.map((f) => <tr key={`${f.branch.slug}-${f.id}`}><td><Link to={`/sucursal/${f.branch.slug}`}>{f.branch.id}. {f.branch.name}</Link></td><td>{f.id}</td><td>{f.description}</td></tr>)}</tbody>
            </table>
          </div>
        ) : <p>No hay equipos con fallas reportadas.</p>}

        <div className="section-heading">
          <h2>Equipos por sucursal</h2>
          <span>{sucursalesVisibles.length} de {sucursales.length} sucursales</span>
        </div>
        <div className="filtros" aria-label="Filtrar sucursales">
          <button type="button" className={filtro === 'todas' ? 'activo' : ''} aria-pressed={filtro === 'todas'} onClick={() => setFiltro('todas')}>Todas ({sucursales.length})</button>
          <button type="button" className={filtro === 'fallas' ? 'activo' : ''} aria-pressed={filtro === 'fallas'} onClick={() => setFiltro('fallas')}>Con fallas ({sucursalesConFallas.length})</button>
          <button type="button" className={filtro === 'ok' ? 'activo' : ''} aria-pressed={filtro === 'ok'} onClick={() => setFiltro('ok')}>Sin fallas ({sucursales.length - sucursalesConFallas.length})</button>
        </div>
        <section className="sucursales" id="lista-sucursales">
          {sucursalesVisibles.map((sucursal) => <SucursalCard key={sucursal.slug} sucursal={sucursal} />)}
        </section>
      </main>
      <footer>MarketOps · Proyecto Grupo 7 · <Link to="/">Cerrar sesión de demostración</Link></footer>
    </>
  );
}
