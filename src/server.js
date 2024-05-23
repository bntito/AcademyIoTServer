const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 4040;
const morgan = require('morgan');
const path = require('path');

/* Configuración DB MySQL */
require('./config/mysql/configDB.js');
/* Configuración DB Mongo */
// require('./config/mongo/configDB.js');

app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Manejo de archivos */
app.use(express.static(path.join(__dirname, '/public')));
app.use('/images', express.static(path.join(__dirname, '/public')));
app.use('/uploads', express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + '/public/html/welcome.html');
});

/* Acceso rutas MySQL DB */
app.use('/api', require('./routes/mysql/coursesRoutes.js'));
app.use('/api', require('./routes/mysql/professorsRoutes.js'));
app.use('/api', require('./routes/mysql/studentsRoutes.js'));
app.use('/api', require('./routes/mysql/enrollmentsRoutes.js'));
app.use('/api', require('./routes/mysql/contactsRoutes.js'));
app.use('/api', require('./routes/mysql/usersRoutes.js'));

/* Acceso rutas Mongo DB */
// app.use('/api', require('./routes/mongo/usersRoutes.js'));
// app.use('/api', require('./routes/mongo/studentsRoutes.js'));
// app.use('/api', require('./routes/mongo/professorsRoutes.js'));
// app.use('/api', require('./routes/mongo/coursesRoutes.js'));
// app.use('/api', require('./routes/mongo/enrollmentsRoutes.js'));
// app.use('/api', require('./routes/mongo/contactsRoutes.js'));

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + '/public/html/404.html');
});

app.use('*', (req, res) => {
  console.log('Request Type:', req.method);
  console.log('Request URL:', req.originalUrl);
});

app.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`);
});