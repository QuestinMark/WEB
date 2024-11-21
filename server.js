const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Crear la aplicación Express
const app = express();

// Configurar el middleware para procesar datos JSON
app.use(bodyParser.json());

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'bdxq5zbr7jkgwebsbf5cr.mysql.svc.cluster.local', // Cambia esta URL por la de tu base de datos MySQL en Render
    user: 'tu_usuario', // Cambia por tu usuario
    password: 'tu_contraseña', // Cambia por tu contraseña
    database: 'nombre_de_base_de_datos', // Cambia por el nombre de tu base de datos
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

// Arrancar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
