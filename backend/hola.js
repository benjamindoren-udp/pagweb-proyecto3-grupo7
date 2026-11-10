
fetch('http://127.0.0.1:3000/api/hola')
  .then(res => res.json())
  .then(dato => {
    console.log(dato);
  });