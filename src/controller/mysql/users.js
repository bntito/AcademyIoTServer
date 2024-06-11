const { Sequelize } = require('sequelize');
const db = require('../../config/mysql/configDB');
const bcrypt = require('bcrypt');
const { generateJWT, verifyJWT } = require('../../services/usual');
const { sendMail } = require('../../services/email');
const { user, password } = require('../../config/mysql/config');
const users = db.users;

/* Conseguir registros */
const getUsers = async (req, res) => {
  try {
    await users.findAll().then((dataApi) => {
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
    const existItem = await users.findOne({ where: { id: req.params.id } });
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
  const existItem = await users.findByPk(req.params.id);
  if (!existItem) {
    res
    .status(400).json({ message: "El ID indicado no está registrado" });
    return;
  }
  try {
    await users.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Registro eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Comparar contraseña inidicada Estudiante */
const compareUser = async (req, res) => {
  const user = await users.findOne({ where: { id: req.params.id}})
  if (!user) {
    return res.status(400).json({
      status: '400',
      message: 'El usuario logeado no corresponde con la información indicada'
    });
  };
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.status(400).json({
      status: '400',
      message: 'La contraseña no coincide con el usuario logeado'
    });
  } else {
    return res.status(200).json({
      status: '200',
      message: 'Contraseña correcta'
    });
  };
};

/* Agregar registro */
const addUser = async (req, res) => {
  const user = await users.findOne({ where: { email: req.body.email } });
  if (user) {
    return res.status(400).json({
      status: '400',
      message: 'El email indicado ya está registrado'
    });
  };

  let passwordCrypt = '';
  if (req.body.password) {
    passwordCrypt = await bcrypt.hash(req.body.password, 10);
  }

  const newUsers = {
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: passwordCrypt,
    address: req.body.address,
    city: req.body.city,
    phone: req.body.phone,
    role: req.body.role,
    status: req.body.status
  };

  try {
    const register = await users.create(newUsers);
    // await sendMail({
    //   email: newUsers.email,
    //   subject: `Bienvenido ${newUsers.name} ${newUsers.lastname}, ¡Te haz registrado con éxito!`,
    //   message: `¡Hola ${newUsers.name}!,<br><br>` +
    //   `¡Es un placer darle la bienvenida a nuestra comunidad! 🌟<br>` +
    //   `Estamos emocionados de tenerte con nosotros y queremos agradecerte por unirte a nuestra plataforma.<br><br>` +
    //   `Nos comunicaremos a tu teléfono ${newUsers.phone} o a tu correo eletrónico ${newUsers.email}.<br><br>` +
    //   `Saludos cordiales,<br>El equipo de Academia IoT`
    // });
    res.status(201).json({
      status: "201",
      dataApi: register,
      message: "El registro fue creado"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Registrar con Email */
const signupUserEmail = async (req, res) => {
  const user = await users.findOne({ where: { email: req.body.email } });
  if (user) {
    return res.status(400).json({
      status: "400",
      message: "Cuenta de Correo Google ya registrada"
    });
  };

  let passwordCrypt = '';
  if (req.body.password) {
    passwordCrypt = await bcrypt.hash(req.body.password, 10);
  }

  const parcialUserRegister = {
    email: req.body.email,
    password: passwordCrypt
  };

  try {
    const register = await users.create(parcialUserRegister);
    res.status(201).json({
      status: "201",
      dataApi: register,
      message: "El registro parcial a sido creado"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Completar registro por Email */
const signupCompleteFromEmail = async (req, res) => {
  console.log(req.body)
  const userIncomplete = await users.findOne({ where: { email: req.body.email } });
  if (!userIncomplete) {
    return res.status(404).json({
      status: "404",
      message: "El email indicado no está pre registrado"
    });
  };

  const updateNewUser = {
    name: req.body.name,
    lastname: req.body.lastname,
    email: userIncomplete.email,
    password: userIncomplete.password,
    address: req.body.address,
    phone: req.body.phone,
    city: req.body.city,
    role: req.body.role,
    status: req.body.status,
    avatar: req.body.urlImageAvatar
  };

  try {
    const userUpdate = await userIncomplete.update(updateNewUser);
    res.status(200).json({
      dataApi: userUpdate,
      message: "El registro fue completado con éxito"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Registrar con Google */
const signupUserGoogle = async (req, res) => {
  const user = await users.findOne({ where: { email: req.body.emailGoogle } });
  if (user) {
    return res.status(400).json({
      status: "400",
      message: "Cuenta de Correo Google ya registrada"
    });
  };

  const parcialUserRegister = {
    name: req.body.nameGoogle,
    lastname: req.body.lastnameGoogle,
    email: req.body.emailGoogle,
    avatar: req.body.photoGoogle
  };

  try {
    const register = await users.create(parcialUserRegister);
    res.status(201).json({
      status: "201",
      dataApi: register,
      message: "El registro parcial a sido creado"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Completar Registro */
const signupComplete = async (req, res) => {
  const userIncomplete = await users.findOne({ where: { email: req.body.emailGoogle } });
  if (!userIncomplete) {
    return res.status(404).json({
      status: "404",
      message: "El email indicado no está pre registrado"
    });
  };

  let passwordCrypt = '';
  if (req.body.password) {
    passwordCrypt = await bcrypt.hash(req.body.password, 10);
  }

  const updateNewUser = {
    name: userIncomplete.name,
    lastname: userIncomplete.lastname,
    email: userIncomplete.email,
    password: passwordCrypt,
    address: req.body.address,
    phone: req.body.phone,
    city: req.body.city,
    role: req.body.role,
    status: req.body.status,
    avatar: userIncomplete.avatar
  };

  try {
    const userUpdate = await userIncomplete.update(updateNewUser);
    res.status(200).json({
      dataApi: userUpdate,
      message: "El registro fue completado con éxito"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Actualizar registro */
const updateUser = async (req, res) => {
  try {
    const existUsers = await users.findOne({ where: { id: req.params.id } });
    if (!existUsers) {
      return res.status(404).json({ message: "El ID indicado no está registrado"});
    }

    let passwordCrypt = '';
    if (req.body.password) {
      passwordCrypt = await bcrypt.hash(req.body.password, 10);
    }

    const updateUser = {
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: passwordCrypt,
      address: req.body.address,
      city: req.body.city,
      phone: req.body.phone,
      role: req.body.role,
      status: req.body.status
    };

    const itemData = await existUsers.update(updateUser);
    res.status(200).json({
      dataApi: itemData,
      message: "El registro fue Actualizado"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Login de usuarios */ 
const loginUser = async (req, res) => {
  const user = await users.findOne({ where: { email: req.body.email } });
  if (!user) {
    return res.status(400).json({
      status: '400',
      message: 'El email indicado no está registrado'
    });
  };
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.status(400).json({
      status: '400',
      message: 'La contraseña es incorrecta'
    });
  } else {
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

/* Login de usuarios con google */
const loginUserGoogle = async (req, res) => {
  const loginGoogleEmail = req.body.loginGoogleEmail;
  const user = await users.findOne({ where: { email: loginGoogleEmail } });
  if (!user) {
    return res.status(400).json({
      status: '400',
      message: 'Su cuenta de Google no está registrada'
    });
  } else {
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

/* Cambio de contraseña de usuarios */
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
      const user = await users.findOne({ where: { email: req.body.email } });
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
  compareUser,
  addUser,
  signupUserEmail,
  signupCompleteFromEmail,
  signupUserGoogle,
  signupComplete,
  updateUser,
  loginUser,
  loginUserGoogle,
  changePassword
};