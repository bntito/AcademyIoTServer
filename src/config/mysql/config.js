/* ******************************************* */
/*    Configuración de acceso a mi db mysql    */
/* ******************************************* */
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '../../.env')
});
console.log('Ejcutando en:', process.env.NODE_ENV);

// Variables para la configuración de la base de datos
let port = '';
let host = '';
let user = '';
let password = '';
let database = '';

// Configuración de las variables según el entorno
if (process.env.NODE_ENV  === 'Desarrollo') {
  port = process.env.DB_PORT;
  host = process.env.DB_HOST;
  user = process.env.DB_USER;
  password = process.env.DB_PASSWORD;
  database = process.env.DB_DATABASE;
};
if (process.env.NODE_ENV  === 'Producción') {
  port = process.env.DB_PORT_PROD;
  host = process.env.DB_HOST_PROD;
  user = process.env.DB_USER_PROD;
  password = process.env.DB_PASSWORD_PROD;
  database = process.env.DB_DATABASE_PROD;
};

// Configuración del tipo de base de datos
const typeDB = "mysql"
const dialect = typeDB;

// Configuración del pool de conexiones
const pool = {
  max: 30,
  min: 0,
};

// Exporta la configuración para su uso en otros archivos
module.exports = {
  port,
  host,
  user,
  password,
  database,
  dialect,
  pool
};