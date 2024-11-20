const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para servir archivos estáticos desde la carpeta 'scripts'
app.use(express.static(path.join(__dirname, 'scripts')));

// Ruta para servir el archivo index.html cuando se accede a la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'scripts', 'index.html'));
});

// Ruta para recibir los datos del formulario (si necesitas usarla)
app.post('/saveData', (req, res) => {
    const { username, password } = req.body;

    // Aquí puedes guardar los datos en una base de datos o hacer lo que necesites
    console.log(`Datos recibidos: ${username}, ${password}`);

    // Respuesta de éxito
    res.json({ message: 'Datos guardados correctamente' });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
