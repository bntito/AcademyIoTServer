const express = require('express');
const router = express.Router();

const {
  getEnrollments,
  getEnrollment,
  delEnrollment,
  addEnrollment,
  updateEnrollment
} = require('../../controller/mongo/enrollments');

router.get('/enrollments', getEnrollments);
router.get('/enrollment/:id', getEnrollment);
router.delete('/enrollment/:id', delEnrollment);
router.post('/enrollment', addEnrollment);
router.put('/enrollment/:id', updateEnrollment);

module.exports = router;