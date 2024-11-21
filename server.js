const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser'); // Para parsear el cuerpo de las solicitudes

const app = express();
const port = process.env.PORT || 3000;

// Conectar a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'bdxq5zbr7ykgewbsf6cr-mysql.services.clever-cloud.com',
    user: 'tu_usuario',
    password: 'tu_contraseña',
    database: 'mysql_577c61cb-e0d1-4300-94a0-d8f1362b580f'
});

connection.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

// Middleware para poder leer datos JSON del cuerpo de la solicitud
app.use(bodyParser.json());

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

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
