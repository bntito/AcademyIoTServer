const { Sequelize, Op } = require('sequelize');
const db = require('../../config/mysql/configDB');
const enrollments = db.enrollments;

/* Conseguir registros */
const getEnrollments = async (req, res) => {
  try {
    await enrollments.findAll().then((dataApi) => {
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
    const existItem = await enrollments.findOne({ where: { id: req.params.id } });
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
  const existItem = await enrollments.findByPk(req.params.id);
  if (!existItem) {
    res.status(400).json({ message: "El ID indicado no está registrado" });
    return;
  }
  try {
    await enrollments.destroy({ where: { id: req.params.id } });
    res
    .status(200).json({ message: "Registro eliminado exitosamente" });
  } catch (error) {
    res
    .status(500).json({ message: error.message });
  }
};

/* Agregar registro */
const addEnrollment = async (req, res) => {
  const existItem = await enrollments.findOne({
    where: {
      [Op.and]: [
        { course: req.body.course },
        { student: req.body.student }
      ]
    }
  });
  if (existItem) {
    return res
    .status(400)
    .json({
      message: "El Estudiante ya está registrado en este Curso"
    });
  };
  const newEnrollment = {
    course: req.body.course,
    professor: req.body.professor,
    student: req.body.student,
    shift: req.body.shift,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  };
  try {
    const register = await enrollments.create(newEnrollment);
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
  const id = parseInt(req.params.id);
  const existItem = await enrollments.findOne({ where: { id: id } });
  if (!existItem) {
    return res.status(404).json({ message: "El registro no fue encontrado"});
  }
  try {
    if (existItem.student == req.body.student) {
      const existItem = await enrollments.findOne({
        where: {
          [Op.and]: [
            { course: req.body.course },
            { student: req.body.student }
          ]
        }
      });
      if (existItem) {
        return res.status(400).json({ message: "El Estudiante ya está registrado en este Curso"});
      }
    }
    const updatedEnrollment = {
      course: req.body.course,
      professor: req.body.professor,
      student: req.body.student,
      shift: req.body.shift,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    };
    const updatedItem = await existItem.update(updatedEnrollment);
    res.json({
      dataApi: updatedItem,
      message: "El registro fue Actualizado"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 

module.exports = {
  getEnrollments,
  getEnrollment,
  delEnrollment,
  addEnrollment,
  updateEnrollment
};