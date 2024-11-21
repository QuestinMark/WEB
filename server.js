const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3000; // Esto usa el puerto proporcionado por Render, o 3000 en tu máquina local para pruebas

app.get('/', (req, res) => {
  res.send('Hola, Mundo!');
});

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'bdxq5zrby7kgewbsf6cr-mysql.services.clever-cloud.com',
  user: 'utl1v16ghyhyqewe',
  password: 'kNOonC1Us8o9r7MVGfio',
  database: 'bdxq5zrby7kgewbsf6cr'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

