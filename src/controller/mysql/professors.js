const { Sequelize } = require('sequelize');
const db = require('../../config/mysql/configDB');
const professors = db.professors;

/* Conseguir registros */
const getProfessors = async (req, res) => {
  try {
    await professors.findAll().then((dataApi) => {
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
const getProfessor = async (req, res) => {
  try {
    const existItem = await professors.findOne({ where: { id: req.params.id } });
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

/* Conseguir registro por DNI */
const getProfessorDni = async (req, res) => {
  try {
    const existItem = await professors.findOne({ where: { dni: req.params.dni } });
    if (existItem) {
      res.status(200).json({
        dataApi: existItem,
        message: "Consulta exitosa"
      });
      return;
    }
    if (!existItem) {
      res.status(400).json({ message: "El DNI indicado no está registrado" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Eliminar registro */
const delProfessor = async (req, res) => {
  console.log('el req es:', req.params)
  const existItem = await professors.findByPk(req.params.id);
  if (!existItem) {
    res.status(400).json({ message: "El ID indicado no está registrado" });
    return;
  }
  try {
    await professors.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Registro eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Agregar registro */
const addProfessor = async (req, res) => {
  const existItem = await professors.findOne({ where: { dni: req.body.dni } });
  if (existItem) {
    return res.status(400).json({ message: "El DNI indicado ya está registrado" });
  }
  
  const newProfessor = {
    dni: req.body.dni,
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    city: req.body.city,
    phone: req.body.phone,
    condition: req.body.condition
  };

  try {
    const register = await professors.create(newProfessor);
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
const updateProfessor = async (req, res) => {
  try {
    const existProfessor = await professors.findOne({ where: { id: req.params.id } });
    if (!existProfessor) {
      return res.status(404).json({ message: "El ID indicado no está registrado" });
    }

    const updateProfessor = {
      dni: req.body.dni,
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      city: req.body.city,
      phone: req.body.phone,
      condition: req.body.condition
    };
    
    const itemData = await existProfessor.update(updateProfessor);
    res.status(200).json({
      dataApi: itemData,
      message: "El registro fue Actualizado"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfessors,
  getProfessor,
  getProfessorDni,
  delProfessor,
  addProfessor,
  updateProfessor
};