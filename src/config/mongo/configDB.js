const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '../../.env')
});

// Variables de entorno para la configuración de la base de datos MongoDB
const dbmongo_host = process.env.DB_MONGO_HOST;
const dbmongo_db = process.env.DB_DATABASE;

// Construye la URL de conexión a MongoDB
const mongo_url = `mongodb://${dbmongo_host}/${dbmongo_db}`;

// Conecta a MongoDB usando mongoose
mongoose
.connect(mongo_url, {})
.then((db) => console.log('Conexión exitosa a la BD Mongoose'))
.catch((err) => console.log('Error de conexión db', err));