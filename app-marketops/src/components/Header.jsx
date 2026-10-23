import { Link } from 'react-router-dom';

export default function Header({ title = 'MarketOps', subtitle = 'Plataforma de soporte técnico', backTo = '/' }) {
  return (
    <header className="app-header">
      <div>
        <h1>{title}</h1>
        <span className="fecha">{subtitle}</span>
      </div>
      <Link to={backTo} className="header-link">← {backTo === '/' ? 'Volver al inicio de sesión' : 'Volver al panel'}</Link>
    </header>
  );
}
