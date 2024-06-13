const express = require('express');
const router = express.Router();
const { isAuthenticated, isRole } = require('../../middleware/auth');

const multer = require('multer');
const path = require('path');

const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, '../../public/avatar/user'),
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split('.')[0];

    cb(null, filename + '-' + uniqueSuffix + '.png');
  }
});
const fileUpload = multer({
  storage: diskStorage
}).single('avatar');

const {
  getUsers,
  getUser,
  delUser,
  compareUser,
  addUser,
  signupUserEmail,
  signupCompleteFromEmail,
  signupUserGoogle,
  signupComplete,
  updateUser,
  loginUser,
  loginUserGoogle,
  changePassword
} = require('../../controller/mysql/users');

router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.delete('/user/:id', isAuthenticated, isRole('isAdmin'), delUser);
router.post('/users/:id', compareUser);
router.post('/user', addUser);
router.post('/user/signupemail', signupUserEmail);
router.post('/user/signupcompletfromemail', signupCompleteFromEmail);
router.post('/user/signupgoogle', signupUserGoogle);
router.post('/user/signupcomplete', signupComplete);
router.put('/user/:id', updateUser);
router.post('/user/login', loginUser);
router.post('/user/logingoogle', loginUserGoogle);
router.post('/user/changepassword', isAuthenticated, isRole('isAdmin'), changePassword);

const { userAvatar } = require('../../controller/mysql/avatar');

router.post('/avatar', fileUpload, userAvatar);

module.exports = router;