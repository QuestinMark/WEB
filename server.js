const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Conexión a MongoDB (asegúrate de reemplazar el <your_connection_string> con tu cadena de conexión de MongoDB)
mongoose.connect('<your_connection_string>', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((err) => console.log('Error de conexión:', err));

// Crear un modelo para los datos del formulario
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String
}));

// Middleware para manejar el cuerpo de las peticiones JSON
app.use(express.json());

// Ruta para recibir los datos del formulario y guardarlos en MongoDB
app.post('/saveData', (req, res) => {
  const { username, password } = req.body;

  // Guardar los datos del formulario en MongoDB
  const user = new User({ username, password });
  user.save()
    .then(() => res.json({ message: 'Datos guardados correctamente' }))
    .catch((err) => res.status(500).json({ error: 'Hubo un error al guardar los datos', details: err }));
});

// Servir archivos estáticos y la página principal
app.use(express.static(path.join(__dirname, '/')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
