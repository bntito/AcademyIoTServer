const express = require('express');
const router = express.Router();
const { isAuthenticated, isRole } = require('../../middleware/auth');
const multer = require('multer');
const path = require('path');
const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, '../../public/images/courses'),
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split('.')[0];

    cb(null, filename + '-' + uniqueSuffix + '.png');
  }
});
const fileUpload = multer({
  storage: diskStorage
}).single('name-field-file');

const {
  getCourses,
  getCourse,
  getCourseCode,
  delCourse,
  delTeacher,
  addCourse,
  updateCourse
} = require('../../controller/mysql/courses');

router.get('/courses', getCourses);
router.get('/course/:id', getCourse);
router.get('/course/code/:code', getCourseCode);
router.delete('/course/:id', isAuthenticated, isRole('isAdmin'), delCourse);
router.delete('/course/deleteteacher/:teacherid/course/:courseid', delTeacher);
router.post('/course', isAuthenticated, isRole('isAdmin'), addCourse);
router.put('/course/:id', isAuthenticated, isRole('isAdmin'), fileUpload, updateCourse);


const { courseImg } = require('../../controller/mysql/images');

router.post('/image', fileUpload, courseImg);

module.exports = router;