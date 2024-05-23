const { Sequelize } = require('sequelize');
const db = require('../../config/mysql/configDB');
const contacts = db.contacts;

/* Conseguir registros */
const getContacts = async (req, res) => {
  try {
    await contacts.findAll().then((dataApi) => {
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
const getContact = async (req, res) => {
  try {
    const existItem = await contacts.findOne({ where: { id: req.params.id } });
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
const delContact = async (req, res) => {
  const existItem = await contacts.findByPk(req.params.id);
  if (!existItem) {
    res.status(400).json({ message: "El ID indicado no está registrado" });
    return;
  }
  try {
    await contacts.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Registro eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Agregar registro */
const addContact = async (req, res) => {
  // const existItem = await contacts.findOne({ where: { dni: req.body.dni } });
  // if (existItem) {
  //   return res
  //     .status(400)
  //     .json({
  //       message: "El DNI indicado ya está registrado"
  //     });
  // }
  const newContact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    email: req.body.email,
    city: req.body.city,
    message: req.body.message
  };
  try {
    const register = await contacts.create(newContact);
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
const updateContact = async (req, res) => {
  const id = parseInt(req.params.id);
  await contacts.findOne({ where: { id: req.params.id } })
    .then((item) => {
      if (item) {
        let existContact = {
          dni: req.body.dni,
          name: req.body.name,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
          address: req.body.address,
          birthday: req.body.birthday,
          city: req.body.city,
          phone: req.body.phone,
          condition: req.body.condition
        };
        const item_data = item.update(existContact).then(function () {
          res.json({
            dataApi: item_data,
            message: "El registro fue Actualizado"
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

module.exports = {
  getContacts,
  getContact,
  delContact,
  addContact,
  updateContact
};