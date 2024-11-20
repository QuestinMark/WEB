const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para manejar el cuerpo de las peticiones JSON
app.use(express.json());

// Ruta para recibir los datos del formulario
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
