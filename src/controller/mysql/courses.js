const { Sequelize } = require('sequelize');
const db = require('../../config/mysql/configDB');
const courses = db.courses;

/* Conseguir registros */
const getCourses = async (req, res) => {
  try {
    await courses.findAll().then((dataApi) => {
      res.status(200).json({
        dataApi: dataApi,
        message: "Consulta exitosa" 
      });
      return;
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* Conseguir registro por id */
const getCourse = async (req, res) => {
  try {
    const existItem = await courses.findOne({ where: { id: req.params.id } });
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

/* Conseguir registro por Código */
const getCourseCode = async (req, res) => {
  try {
    const existItem = await courses.findOne({ where: { code: req.params.code } });
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
const delCourse = async (req, res) => {
  const existItem = await courses.findByPk(req.params.id);
  if (!existItem) {
    res.status(400).json({ message: "El ID indicado no está registrado" });
    return;
  }
  try {
    await courses.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Registro eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Eliminar profesor de curso */
const delTeacher = async (req, res) => {
  const courseId = req.params.courseid;
  const teacherId = req.params.teacherid;
  try {
    const course = await courses.findByPk(courseId);
  if (!course) {
    res.status(400).json({ message: "El curso indicado no está registrado" });
    return;
  }
  const professors = course.professors || [];
  const updatedProfessors = professors.filter(professor => professor.id !== parseInt(teacherId));
  if (professors.length === updatedProfessors.length) {
    res.status(400).json({ message: "El ID del profesor indicado no está registrado en este curso" });
    return;
  }
  await course.update({ professors: updatedProfessors });
  res.status(200).json({ message: "El profesor fue eliminado del curso exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Ocurrió un error al intentar eliminar al profesor del curso "});
    return;
  };
};

/* Agregar registro */
const addCourse = async (req, res) => {
  const existItem = await courses.findOne({ where: { code: req.body.code } });
  if (existItem) {
    return res.status(400).json({ message: "El código indicado ya está registrado" });
  }

  const newCourse = {
    code: req.body.code,
    name: req.body.name,
    description: req.body.description,
    cost: req.body.cost,
    condition: req.body.condition,
    duration: req.body.duration,
    qualification: req.body.qualification,
    professors: req.body.professors,
    urlImg: req.body.urlImg,
    prominent: req.body.prominent
  };
  
  try {
    const register = await courses.create(newCourse);
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
const updateCourse = async (req, res) => {
  try {
    const existCourse = await courses.findOne({ where: { id: req.params.id } });
    if (!existCourse) {
      return res.status(404).json({ message: "El ID indicado no está registrado" });
    }

    const updateCourse = {
      code: req.body.code,
      name: req.body.name,
      description: req.body.description,
      cost: req.body.cost,
      condition: req.body.condition,
      duration: req.body.duration,
      qualification: req.body.qualification,
      professors: req.body.professors,
      urlImg: req.body.urlImg,
      prominent: req.body.prominent
    };

    const itemData = await existCourse.update(updateCourse);
    res.status(200).json({
      dataApi: itemData,
      message: "El registro fue actualizado"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCourses,
  getCourse,
  getCourseCode,
  delCourse,
  delTeacher,
  addCourse,
  updateCourse
};