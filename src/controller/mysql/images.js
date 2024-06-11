const { Sequelize } = require('sequelize');

// Hacer tabla de imagenes
// const db = require('../../config/configDB');

const courseImg = async (req, res) => {
  let filePath = '';
  if (req.file) {
    filePath = `images/courses/${req.file.filename}`;
  }
  res.send({
    status: "200",
    message: "Imágen agregada",
    urlImg: filePath
  });
};

module.exports = {
  courseImg
};