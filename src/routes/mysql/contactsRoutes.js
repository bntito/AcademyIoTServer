const express = require('express');
const router = express.Router();
const { isAuthenticated, isRole } = require('../../middleware/auth');

const {
  getContacts,
  getContact,
  delContact,
  addContact,
  updateContact
} = require('../../controller/mysql/contacts');

router.get('/contacts', getContacts);
router.get('/contact/:id', getContact);
router.delete('/contact/:id', isAuthenticated, isRole('isAdmin'), delContact);
router.post('/contact', addContact);
router.put('/contact/:id', isAuthenticated, isRole('isAdmin'), updateContact);

module.exports = router;