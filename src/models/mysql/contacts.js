module.exports = (sequelize, DataTypes) => {
  const contacts = sequelize.define('contacts', {
    name: { type: DataTypes.STRING(15), allowNull: false },
    email: { type: DataTypes.STRING(50), allowNull: true },
    phone: { type: DataTypes.STRING(15), allowNull: true },
    city: { type: DataTypes.STRING(15), allowNull: true },
    message: { type: DataTypes.TEXT, allowNull: true }
  });

  return contacts;
};
