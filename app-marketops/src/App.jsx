import { useState } from 'react';
import { usuarios } from './data/Usuarios.js';
import { sucursales as datosIniciales } from './data/sucursales.js';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DetalleSucursal from './pages/DetalleSucursal.jsx';

export default function App() {
  const [sucursales, setSucursales] = useState(datosIniciales);
  const [usuario, setUsuario] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Login setUsuario={setUsuario} usuarios={usuarios} />} />
      <Route
        path="/dashboard"
        element={<Dashboard usuario={usuario} sucursales={sucursales} />}
      />
      <Route
        path="/admin"
        element={<Dashboard rol="Administrador" usuario={usuario} sucursales={sucursales} />}
      />
      <Route
        path="/sucursal/:slug"
        element={
          <DetalleSucursal
            sucursales={sucursales}
            setSucursales={setSucursales}
            usuario={usuario}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
