import { Link } from 'react-router-dom';

export default function SucursalCard({ sucursal }) {
  const tieneFallas = sucursal.failures.length > 0;
  return (
    <article className={`tarjeta-sucursal ${tieneFallas ? 'con-fallas' : ''}`}>
      <div className="cabecera">
        <h3>{sucursal.id}. {sucursal.name}</h3>
        <span className={`estado ${tieneFallas ? 'falla' : 'ok'}`}>
          {tieneFallas ? `${sucursal.failures.length} ${sucursal.failures.length === 1 ? 'falla' : 'fallas'}` : 'Sin fallas'}
        </span>
      </div>
      <p className="subtitulo">Equipos funcionando ({sucursal.working.length})</p>
      {sucursal.working.length > 0 && (
        <ul className="lista-equipo">
          <li>{sucursal.working.map((id) => <span className="etiqueta-equipo" key={id}>Id {id}</span>)}</li>
        </ul>
      )}
      <p className="subtitulo">Equipos con fallas ({sucursal.failures.length})</p>
      {sucursal.failures.length > 0 && (
        <ul className="lista-equipo lista-fallas">
          {sucursal.failures.map((equipo) => (
            <li key={equipo.id}>
              <span className="etiqueta-equipo roja">Id {equipo.id}</span>
              <span className="falla-descripcion">{equipo.description}</span>
            </li>
          ))}
        </ul>
      )}
      <Link className="ver-detalle" to={`/sucursal/${sucursal.slug}`}>Ver detalle →</Link>
    </article>
  );
}
