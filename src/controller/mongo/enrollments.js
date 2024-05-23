const enrollments = require('../../models/mongo/enrollments');

/* Conseguir registros */
const getEnrollments = async (req, res) => {
  try {
    await enrollments.find().then((dataApi) => {
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
const getEnrollment = async (req, res) => {
  try {
    const existItem = await enrollments.findOne({ _id: req.params.id });
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
const delEnrollment = async (req, res) => {
  const existItem = await enrollments.findOne({ _id: req.params.id });
  if (!existItem) {
    res.status(400).json({ message: "El ID indicado no está registrado" });
    return;
  }
  try {
    await enrollments.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Registro eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Agregar registro */
const addEnrollment = async (req, res) => {
  const existItem = await enrollments.findOne({ code: req.body.code });
  if (existItem) {
    return res.status(400).json({ message: "El código indicado ya está registrado" });
  }
  const enrollment = new enrollments ({
    course: req.body.course,
    professor: req.body.professor,
    student: req.body.student,
    shift: req.body.shift,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });
  try {
    const register = await enrollment.save();
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
const updateEnrollment = async (req, res) => {
  const id = (req.params.id);
  try {
    const item = await enrollments.findByIdAndUpdate(
      id,
      {
        course: req.body.course,
        professor: req.body.professor,
        student: req.body.student,
        shift: req.body.shift,
        startDate: req.body.startDate,
        endDate: req.body.endDate
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
  getEnrollments,
  getEnrollment,
  delEnrollment,
  addEnrollment,
  updateEnrollment
};