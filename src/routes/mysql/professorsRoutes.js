const express = require('express');
const router = express.Router();
const { isAuthenticated, isRole } = require('../../middleware/auth');

const {
  getProfessors,
  getProfessor,
  getProfessorDni,
  delProfessor,
  addProfessor,
  updateProfessor
} = require('../../controller/mysql/professors');

router.get('/professors', getProfessors);
router.get('/professor/:id', getProfessor);
router.get('/professor/dni/:dni', getProfessorDni);
router.delete('/professor/:id', isAuthenticated, isRole('isAdmin'), delProfessor);
router.post('/professor', isAuthenticated, isRole(['isAdmin', 'isTeacher']), addProfessor);
router.put('/professor/:id', isAuthenticated, isRole('isTeacher'), updateProfessor);

module.exports = router;