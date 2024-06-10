const express = require('express');
const router = express.Router();
const { isAuthenticated, isRole } = require('../../middleware/auth');

const {
  getUsers,
  getUser,
  delUser,
  compareUser,
  addUser,
  signupUserGoogle,
  signupComplete,
  updateUser,
  loginUser,
  loginUserGoogle,
  changePassword
} = require('../../controller/mysql/users');

router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.delete('/user/:id', delUser);
router.post('/users/:id', compareUser);
router.post('/user', addUser);
router.post('/user/signupgoogle', signupUserGoogle);
router.post('/user/signupcomplete', signupComplete);
router.put('/user/:id', updateUser);
router.post('/user/login', loginUser);
router.post('/user/logingoogle', loginUserGoogle);
router.post('/user/changepassword', isAuthenticated, isRole('isAdmin'), changePassword);

module.exports = router;