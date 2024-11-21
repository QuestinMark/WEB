// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Importar las librerías necesarias
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Para permitir el acceso desde diferentes orígenes

// Crear la aplicación Express
const app = express();

// Middleware para manejar datos JSON y permitir CORS
app.use(express.json());
app.use(cors());

// Crear la conexión a la base de datos usando las variables de entorno
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Ruta para recibir los datos del formulario
app.post('/saveData', (req, res) => {
  const { username, password } = req.body;

  // Asegurarte de que los datos no están vacíos
  if (!username || !password) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  // Consulta para insertar los datos en la tabla 'users'
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  connection.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error al insertar:', err);
      return res.status(500).json({ message: 'Error al guardar los datos' });
    }
    res.json({ message: 'Datos guardados correctamente' });
  });
});

// Ruta para verificar que el servidor esté funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Puerto que usará el servidor (se configura automáticamente en Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

