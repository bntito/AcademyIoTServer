const bcrypt = require('bcrypt');
const { generateJWT, verifyJWT } = require('../../services/usual');
const { sendMail } = require('../../services/email');
const users = require('../../models/mongo/users');

/* Conseguir registros */
const getUsers = async (req, res) => {
  try {
    await users.find().then((dataApi) => {
      res.status(200).json({
        dataApi: dataApi,
        message: "Consulta exitosa" 
      });
      return;
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Conseguir registro por id */
const getUser = async (req, res) => {
  try {
    const existItem = await users.findOne({ _id: req.params.id });
    if (existItem) {
      res.status(200).json({
        dataApi: existItem,
        message: "Consulta exitosa"
      });
      return;
    }
    if (!existItem) {
      res.status(400).json({ message: "El ID indicado no está registrado" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Eliminar registro */
const delUser = async (req, res) => {
  const existItem = await users.findOne({ _id: req.params.id });
  if (!existItem) {
    res.status(400).json({ message: "El ID indicado no está registrado" });
    return;
  }
  try {
    await users.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Registro eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Agregar registro */
const addUser = async (req, res) => {
  const userExist = await users.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(400).json({
      status: '400',
      message: 'El email indicado ya está registrado'
    });
  }
  let passwordCrypt = '';
  if (req.body.password) {
    passwordCrypt = await bcrypt.hash(req.body.password, 10);
  }
  const user = new users({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: passwordCrypt,
    address: req.body.address,
    city: req.body.city,
    phone: req.body.phone,
    role: req.body.role,
    status: req.body.status
  });
  try {
    const register = await user.save();
    await sendMail({
      email: user.email,
      subject: `Bienvenido ${user.name} ${user.lastname}, ¡Te haz registrado con éxito!`,
      message: `¡Hola ${user.name}!,<br><br>` +
      `¡Es un placer darle la bienvenida a nuestra comunidad! 🌟<br>` +
      `Estamos emocionados de tenerte con nosotros y queremos agradecerte por unirte a nuestra plataforma.<br><br>` +
      `Nos comunicaremos a tu teléfono ${user.phone} o a tu correo eletrónico ${user.email}.<br><br>` +
      `Saludos cordiales,<br>El equipo de Academia IoT`
    });
    res.status(201).json({
      status: "201",
      dataApi: register,
      message: "El registro fue creado"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Actualizar registro */
const updateUser = async (req, res) => {
  console.log('no tamo llegando')
  const id = (req.params.id);
  try {
    const item = await users.findByIdAndUpdate(
      id, 
      {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        city: req.body.city,
        phone: req.body.phone,
        role: req.body.role,
        status: req.body.status
      },{
        new: true
      }
    );   
    res.json({
      dataApi: item,
      message: "El registro fue Actualizado"
    });  
  } catch (error) {
    res.status(500).json({ message: error.message });
  };
};

/* Login usuarios */
const loginUser = async (req, res) => {
  console.log('el body entrante es:', req.body)
  const user = await users.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      status: '400',
      message: 'El email indicado no está registrado'
    });
  }
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.status(400).json({
      status: '400',
      message: 'La contraseña es incorrecta'
    });
  } 
  else {
    const newRegister = {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      login: true,
      token: generateJWT(user)
    };
    console.log('Nuevo ingreso de usuario:', newRegister);
    return res.status(200).json({
      status: '200',
      dataApi: newRegister,
      message: `Login exitoso \n Bienvenido ${user.name} ${user.lastname}`
    });
  };
};

/* Cambio de contraseña */
const changePassword = async (req, res) => {
  if (req.body.token) {
    const payload = verifyJWT(req.body.token);
    if (!payload || payload.exp < Date.now()) {
      return res.status(401).json({
        status: '401',
        message: 'Token expirado'
      });
    }
    try {
      const user = await users.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({
          status: '400',
          message: 'El email indicado no está registrado'
        });
      }
      const match = await bcrypt.compare(req.body.oldPassword, user.password);
      if (!match) {
        return res.status(400).json({
          status: '400',
          message: 'La contraseña anterior es incorrecta'
        });
      }
      const newPasswordHash = await bcrypt.hash(req.body.newPassword, 10);
      user.password = newPasswordHash;
      await user.save();
      return res.status(200).json({
        status: '200',
        message: 'Contraseña actualizada exitosamente'
      });
    } catch (error) {
      return res.status(500).json({
        status: '500',
        message: 'Error interno del servidor'
      });
    }
  } else {
    return res.status(401).json({
      status: '401',
      message: 'No se proporcionó ningún Token'
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  delUser,
  addUser,
  updateUser,
  loginUser,
  changePassword
};