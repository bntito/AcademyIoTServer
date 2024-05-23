module.exports = (sequelize, DataTypes) => {
  const courses = sequelize.define('courses', {
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    cost: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    condition: { type: DataTypes.STRING(15), allowNull: true },
    duration: { type: DataTypes.INTEGER, allowNull: true },
    qualification: { type: DataTypes.INTEGER, allowNull: true },
    professors: { type: DataTypes.JSON, allowNull: true },
    urlImg: { type: DataTypes.STRING(100), allowNull: true },
    prominent: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  });

  return courses;
};