const students = require('../../models/mongo/students');

/* Conseguir registros */
const getStudents = async (req, res) => {
  try {
    await students.find().then((dataApi) => {
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
const getStudent = async (req, res) => {
  try {
    const existItem = await students.findOne({ _id: req.params.id });
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
const getStudentDni = async (req, res) => {
  try {
    const existItem = await students.findOne({ dni: req.params.dni });
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
const delStudent = async (req, res) => {
  const existItem = await students.findOne({ _id: req.params.id });
  if (!existItem) {
    res.status(400).json({ message: "El ID indicado no está registrado" });
    return;
  }
  try {
    await students.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Registro eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Agregar registro */
const addStudent = async (req, res) => {
  const existItem = await students.findOne({ dni: req.body.dni });
  if (existItem) {
    return res.status(400).json({ message: "El DNI indicado ya está registrado" });
  }
  const student = new students ({
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
  });
  try {
    const register = await student.save();
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
const updateStudent = async (req, res) => {
  const id = (req.params.id);
  try {
    const item = await students.findByIdAndUpdate(
      id,
      {
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
  getStudents,
  getStudent,
  getStudentDni,
  delStudent,
  addStudent,
  updateStudent
};