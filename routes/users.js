const express = require('express');
const router = express.Router();
const db = require('../models/users');

/* users page. */
//sign up - create a new user
router.post('/signup', db.createUser);
//get current lsit of users
router.get('/', db.getUsers);
//log in user
router.post('/login', db.userLogin);
// router.put('/:id', db.updateFixture)
router.delete('/:id', db.deleteUser)

module.exports = router;