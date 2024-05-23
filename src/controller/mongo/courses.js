const courses = require('../../models/mongo/courses');

/* Conseguir registros */
const getCourses = async (req, res) => {
  try {
    await courses.find().then((dataApi) => {
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
const getCourse = async (req, res) => {
  try {
    const existItem = await courses.findOne({ _id: req.params.id });
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
const getCourseCode = async (req, res) => {
  try {
    const existItem = await courses.findOne({ code: req.params.code });
    if (existItem) {
      res.status(200).json({
        dataApi: existItem,
        message: "Consulta exitosa"
      });
      return;
    }
    if (!existItem) {
      res.status(400).json({ message: "El código indicado no está registrado" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Eliminar registro */
const delCourse = async (req, res) => {
  const existItem = await courses.findOne({ _id: req.params.id });
  if (!existItem) {
    res.status(400).json({ message: "El ID indicado no está registrado" });
    return;
  }
  try {
    await courses.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Registro eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Agregar registro */
const addCourse = async (req, res) => {
  const existItem = await courses.findOne({ code: req.body.code });
  if (existItem) {
    return res.status(400).json({ message: "El código indicado ya está registrado" });
  }
  const course = new courses ({
    code: req.body.code,
    name: req.body.name,
    description: req.body.description,
    cost: req.body.cost,
    condition: req.body.condition,
    duration: req.body.duration,
    qualification: req.body.qualification,
    professors: req.body.professors,
    urlImg: req.body.urlImg
  });
  try {
    const register = await course.save(course);
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
  const id = (req.params.id);
  try {
    const item = await courses.findByIdAndUpdate(
      id,
      {
        code: req.body.code,
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        condition: req.body.condition,
        duration: req.body.duration,
        qualification: req.body.qualification,
        professors: req.body.professors,
        urlImg: req.body.urlImg
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
  getCourses,
  getCourse,
  getCourseCode,
  delCourse,
  addCourse,
  updateCourse
};