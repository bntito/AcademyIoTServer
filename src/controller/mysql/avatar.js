const { Sequelize } = require('sequelize');

const userAvatar = async (req, res) => {
  let filePath = '';
  if (req.file) {
    filePath = `/avatar/user/${req.file.filename}`;
  }
  res.send({
    status: "200",
    message: "Avatar agregado",
    urlAvatar: filePath
  });
};

module.exports = {
  userAvatar
};