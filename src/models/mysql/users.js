module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: { type: DataTypes.STRING(100), allowNull: false },
    lastname: { type: DataTypes.STRING(100), allowNull: true },
    email: { type: DataTypes.STRING(100), allowNull: true },
    password: { type: DataTypes.TEXT, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING(100), allowNull: true },
    phone: { type: DataTypes.STRING(20), allowNull: true },
    role: { type: DataTypes.STRING(12), allowNull: true },
    status: { type: DataTypes.STRING(12), allowNull: true },
    avatar: { type: DataTypes.STRING(100), allowNull: true }
  });

  return users;
};