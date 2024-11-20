const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Conexión a MongoDB (reemplaza la URL de conexión con la tuya)
const uri = 'mongodb+srv://rsanchelop2:hcHIvfDCjOyZGbfM@cluster0.7gvtz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((err) => console.log('Error de conexión:', err));

// Crear un modelo para los datos del formulario
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String
}));

// Middleware para manejar el cuerpo de las peticiones JSON
app.use(express.json());

// Servir archivos estáticos (si tienes archivos como imágenes o archivos de estilo)
app.use(express.static(path.join(__dirname, '/')));

// Ruta para recibir los datos del formulario y guardarlos en MongoDB
app.post('/saveData', (req, res) => {
  const { username, password } = req.body;

  // Guardar los datos del formulario en MongoDB
  const user = new User({ username, password });
  user.save()
    .then(() => res.json({ message: 'Datos guardados correctamente' }))
    .catch((err) => res.status(500).json({ error: 'Hubo un error al guardar los datos', details: err }));
});

// Ruta principal para servir tu página HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Asegúrate de que index.html esté en el mismo directorio que server.js
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
