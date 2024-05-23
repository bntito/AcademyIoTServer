const jwt = require('jsonwebtoken');
const { verifyJWT } = require('../services/usual');

exports.isAuthenticated = async (req, res, next) => {
  // console.log('body....', req.body)
  const token = req.body.token;
  if (!token) {
    return res
    .status(401)
    .json({
      status: '401',
      message: 'Debe loguearse para utilizar esta función'
    });
  } else {
    const payload = verifyJWT(token);
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

exports.isRole = (roles) => {
  const roleNames = {
    isAdmin: 'Administrador',
    isStudent: 'Estudiante',
    isTeacher: 'Profesor'
  };
  return (req, res, next) => {
    const user = jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
    const roleName = roleNames[user.role];
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