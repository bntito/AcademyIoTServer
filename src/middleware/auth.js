const jwt = require('jsonwebtoken');
const { verifyJWT } = require('../services/usual');

// Middleware para verificar si el usuario está autenticado
exports.isAuthenticated = async (req, res, next) => {
  // console.log('body....', req.body)
  const token = req.body.token;
  // Verifica si no hay token
  if (!token) {
    return res
    .status(401)
    .json({
      status: '401',
      message: 'Debe loguearse para utilizar esta función'
    });
  } else {
    // Verifica y decodifica el token
    const payload = verifyJWT(token);
    // Verifica si el token ha expirado
    if (payload.exp < Date.now()) {
      return res
      .status(401)
      .json({
        status: '401',
        message: 'Token expirado'
      });
    }
    await next();
  }
};

// Middleware para verificar el rol del usuario
exports.isRole = (roles) => {
  const roleNames = {
    isAdmin: 'Administrador',
    isStudent: 'Estudiante',
    isTeacher: 'Profesor'
  };
  return (req, res, next) => {
    // Verifica y decodifica el token
    const user = jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
    // Obtiene el nombre del rol del usuario
    const roleName = roleNames[user.role];
    // Verifica si el rol del usuario no está permitido
    if (!roles.includes(user.role)) {
      return res
        .status(401)
        .json({
          satatus: '401',
          message: `Como ${roleName} no puede acceder a este recurso!`
        })
    }
    next();
  };
};