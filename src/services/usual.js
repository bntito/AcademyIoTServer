const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/** Generar ID **/
exports.generateId = () => {
  const random = Math.random().toString(32).substring(2);
  const date = Date.now().toString(32);
  return random + date;
};

/** Encriptar contraseña **/
exports.encrypt = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

/** Comparar contraseña encriptada **/
exports.compare = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

/** Generar token **/
exports.generateJWT = (user) => {
  const payload = {
    id: user.id,
    name: user.name + '' + user.lastname,
    email: user.email,
    role: user.role,
    exp: Date.now() + 1800 * 1000
  };
  const secret = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(payload, secret);
  return token;
};

/** Comparar token **/
exports.verifyJWT = (token) => {
  const secret = process.env.JWT_SECRET_KEY;
  const decoded = jwt.verify(token, secret); // op.1
  const decodedToken = jwt.decode(token, { complete: true});  // op.2
  if (Date.now() > decodedToken.payload.exp) {
    console.log('clave expirada!')
  }
  return decodedToken.payload;
};