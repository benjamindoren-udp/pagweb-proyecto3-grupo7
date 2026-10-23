import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DetalleSucursal from './pages/DetalleSucursal.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard rol="Técnico" />} />
      <Route path="/admin" element={<Dashboard rol="Administrador" />} />
      <Route path="/sucursal/:slug" element={<DetalleSucursal />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
