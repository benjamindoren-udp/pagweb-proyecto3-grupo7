fetch('http://127.0.0.1:3000/api/sucursales')
  .then(async res => {
    const dato = await res.json();
    if (!res.ok) throw new Error(dato.error || `Error HTTP: ${res.status}`);
    return dato;
  })
  .then(dato => {
    console.log(dato);
  })
  .catch(err => console.error('Error en fetch:', err));