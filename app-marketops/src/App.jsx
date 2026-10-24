import { useState } from 'react';
import { sucursales as datosIniciales } from './data/sucursales.js';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DetalleSucursal from './pages/DetalleSucursal.jsx';

export default function App() {
  const [sucursales, setSucursales] = useState(datosIniciales);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard rol="Técnico" 
      sucursales={sucursales} />} />
      <Route path="/admin" element={<Dashboard rol="Administrador" 
      sucursales={sucursales} />} />
      <Route path="/sucursal/:slug" element={<DetalleSucursal 
        sucursales={sucursales} 
        setSucursales={setSucursales}
      />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
