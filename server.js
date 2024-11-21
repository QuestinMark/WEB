const express = require('express');
const mysql = require('mysql2');

// Configuración del servidor
const app = express();
const port = 3000;

app.use(express.json()); // Para manejar JSON en las solicitudes

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'bdxq5zrby7kgewbsf6cr-mysql.services.clever-cloud.com',
  user: 'utl1v16ghyhyqewe',
  password: 'kNOonC1Us8o9r7MVGfio',
  database: 'bdxq5zrby7kgewbsf6cr',
  port: 3306,
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Ruta para manejar el formulario
app.post('/submit', (req, res) => {
  const { username, password } = req.body;

  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error al guardar los datos:', err);
      res.status(500).send('Error al guardar los datos');
    } else {
      console.log('Datos guardados correctamente:', result);
      res.status(200).send('Datos guardados correctamente');
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
