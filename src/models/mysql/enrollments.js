module.exports = (sequelize, DataTypes) => {
  const enrollments = sequelize.define('enrollments', {
    course: { type: DataTypes.STRING(100), allowNull: false },
    professor: { type: DataTypes.STRING(100), allowNull: false },
    student: { type: DataTypes.STRING(100), allowNull: false },
    shift: { type: DataTypes.STRING(15), allowNull: true },
    condition: { type: DataTypes.STRING(15), allowNull: true },
    startDate: { type: DataTypes.TEXT, allowNull: true },
    endDate: { type: DataTypes.TEXT, allowNull: true }
  });

  return enrollments;
};