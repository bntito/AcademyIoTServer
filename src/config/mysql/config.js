/* ******************************************* */
/*    Configuración de acceso a mi db mysql    */
/* ******************************************* */
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '../../.env')
});
console.log('Ejcutando en:', process.env.NODE_ENV);

let port = '';
let host = '';
let user = '';
let password = '';
let database = '';

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

const typeDB = "mysql"
const dialect = typeDB;

const pool = {
  max: 30,
  min: 0,
};

module.exports = {
  port,
  host,
  user,
  password,
  database,
  dialect,
  pool
};