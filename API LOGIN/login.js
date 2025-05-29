// Importaciones
const express = require('express');
const cors = require('cors');
const path = require('path');
const CryptoJS = require('crypto-js');
const mysql = require('mysql2'); // Usamos mysql2

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'login'
});

connection.connect(error => {
  if (error) {
    console.error('Error de conexión:', error);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Rutas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/registro', (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  const sql = 'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)';
  connection.query(sql, [nombre, correo, contrasena], (error, results) => {
    if (error) {
      console.error('Error al registrar:', error);
      res.status(500).send('Error al registrar');
      return;
    }
    res.send('Usuario registrado con éxito');
  });
});

app.post('/login', (req, res) => {
  const { correo, contrasena } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?';
  connection.query(sql, [correo, contrasena], (error, results) => {
    if (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).send('Error al iniciar sesión');
      return;
    }
    if (results.length > 0) {
      res.send('Inicio de sesión exitoso');
    } else {
      res.status(401).send('Correo o contraseña incorrectos');
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
