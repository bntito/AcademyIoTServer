const express = require('express');
const router = express.Router();
const { isAuthenticated, isRole } = require('../../middleware/auth');

const {
  getStudents,
  getStudent,
  getStudentDni,
  delStudent,
  addStudent,
  updateStudent
} = require('../../controller/mongo/students');

router.get('/students', getStudents);
router.get('/student/:id', getStudent);
router.get('/student/dni/:dni', getStudentDni);
router.delete('/student/:id', isAuthenticated, isRole('isAdmin'), delStudent);
router.post('/student', isAuthenticated, isRole('isStudent'), addStudent);
router.put('/student/:id', isAuthenticated, isRole('isStudent'), updateStudent);

module.exports = router;