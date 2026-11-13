import { useState , useEffect} from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DetalleSucursal from './pages/DetalleSucursal.jsx';


export default function App() {
  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/api/sucursales')
      .then(async (res) => {
        const dato = await res.json();
        if (!res.ok) throw new Error(dato.error || `Error HTTP: ${res.status}`);
        return dato;
      })
      .then((dato) => {
        console.log(dato);
        setSucursales(dato);
      })
      .catch((err) => console.error('Error en fetch:', err));
  }, []);
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
