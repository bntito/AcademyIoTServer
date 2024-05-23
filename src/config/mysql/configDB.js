const dbConfig = require('./config.js');
const { Sequelize, DataTypes } = require("sequelize");

let DB_DATABASE = dbConfig.database;
let DB_USER = dbConfig.user;
let DB_PASSWORD = dbConfig.password;
let DB_HOST = dbConfig.host;
let DB_PORT = dbConfig.port;
let DB_DIALECT = dbConfig.dialect;

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
  }
});

sequelize.authenticate().then(() => {
  console.log('Conectado a la base de datos MySQL');
})
.catch((err) => {
  console.log('Error de conexión a la base de datos;', err);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.courses = require('../../models/mysql/courses.js')(sequelize, DataTypes);
db.professors = require('../../models/mysql/professors.js')(sequelize, DataTypes);
db.students = require('../../models/mysql/students.js')(sequelize, DataTypes);
db.enrollments = require('../../models/mysql/enrollments.js')(sequelize, DataTypes);
db.contacts = require('../../models/mysql/contacts.js')(sequelize, DataTypes);
db.users = require('../../models/mysql/users.js')(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos inicializada');
});

module.exports = db;