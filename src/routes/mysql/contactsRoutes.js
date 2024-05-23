const express = require('express');
const router = express.Router();

const {
  getContacts,
  getContact,
  delContact,
  addContact,
  updateContact
} = require('../../controller/mysql/contacts');

router.get('/contacts', getContacts);
router.get('/contact/:id', getContact);
router.delete('/contact/:id', delContact);
router.post('/contact', addContact);
router.put('/contact/:id', updateContact);

module.exports = router;