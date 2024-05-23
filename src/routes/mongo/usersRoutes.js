const express = require('express');
const router = express.Router();
const { isAuthenticated, isRole } = require('../../middleware/auth');

const {
  getUsers,
  getUser,
  delUser,
  addUser,
  updateUser,
  loginUser,
  changePassword
} = require('../../controller/mongo/users');

router.get('/users', getUsers);
router.get('//:id', getUser);
router.delete('/user/:id', delUser);
router.post('/user', addUser);
router.put('/user/:id', isAuthenticated, isRole('isAdmin'), updateUser);
router.post('/user/login', loginUser);
router.post('/user/changepassword', isAuthenticated, isRole('isAdmin'), changePassword);

module.exports = router;