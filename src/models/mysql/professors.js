module.exports = (sequelize, DataTypes) => {
  const professors = sequelize.define('professors', {
    dni: { type: DataTypes.STRING(12), allowNull: false },
    name: { type: DataTypes.STRING(100), allowNull: false },
    lastname: { type: DataTypes.STRING(100), allowNull: true },
    email: { type: DataTypes.STRING(100), allowNull: true },
    password: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: true },
    city: { type: DataTypes.STRING(100), allowNull: true },
    phone: { type: DataTypes.STRING(20), allowNull: true },
    condition: { type: DataTypes.STRING(12), allowNull: true },
  });

  return professors;
};