import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import heroImage from '../assets/login-bg.jpeg';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function iniciarSesion(event) {
    event.preventDefault();
    // La autenticación real no está implementada: este acceso solo permite probar la maqueta.
    navigate('/dashboard');
  }

  return (
    <div className="login-page">
      <section className="login-brand" style={{ backgroundImage: `linear-gradient(rgba(37, 99, 235, .86), rgba(29, 78, 216, .90)), url(${heroImage})` }}>
        <div className="brand-content">
          <p className="brand-name">MarketOps</p>
          <div>
            <p className="eyebrow">PLATAFORMA DE SOPORTE</p>
            <h1>Bienvenido al portal</h1>
            <p className="brand-description">Monitoreo y control de equipos en nuestras sucursales.</p>
          </div>
          <small>© Proyecto grupo 7, 2026</small>
        </div>
      </section>

      <section className="login-panel">
        <form className="login-form" onSubmit={iniciarSesion}>
          <div className="login-heading">
            <p className="eyebrow">MARKETOPS</p>
            <h2>Iniciar sesión</h2>
            <p>Ingresa tus datos para continuar.</p>
          </div>
          <label htmlFor="usuario">Usuario</label>
          <input id="usuario" name="usuario" type="text" placeholder="Ingrese el usuario" autoComplete="username" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
          <label htmlFor="password">Contraseña</label>
          <input id="password" name="password" type="password" placeholder="Ingrese la contraseña" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="primary-button" type="submit">Ingresar</button>
          <p className="demo-note">Demo académica: el formulario no valida credenciales reales.</p>
          <div className="debug-links">
            <strong>Acceso de prueba</strong>
            <span>Para revisar las distintas pantallas:</span>
            <div>
              <Link to="/dashboard">Panel técnico</Link>
              <Link to="/admin">Panel administrador</Link>
              <Link to="/sucursal/maipu">Detalle de sucursal</Link>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
