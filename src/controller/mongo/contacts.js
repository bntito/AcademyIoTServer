const contacts = require('../../models/mongo/contacts');

/* Conseguir registros */
const getContacts = async (req, res) => {
  try {
    await contacts.find().then((dataApi) => {
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
    const existItem = await contacts.findOne({ id: req.params.id });
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
  const existItem = await contacts.findOne({ _id: req.params.id });
  if (!existItem) {
    res.status(400).json({ message: "El ID indicado no está registrado" });
    return;
  }
  try {
    await contacts.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Registro eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Agregar registro */
const addContact = async (req, res) => {
  const contact = new contacts ({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    email: req.body.email,
    city: req.body.city,
    message: req.body.message
  });
  try {
    const register = await contact.save();
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
  const id = (req.params.id);
  try {
    const item = await contacts.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        email: req.body.email,
        city: req.body.city,
        message: req.body.message
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

module.exports = {
  getContacts,
  getContact,
  delContact,
  addContact,
  updateContact
};