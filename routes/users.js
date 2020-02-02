const express = require('express');
const router = express.Router();
const db = require('../models/users');
const adminAuth = require('../auth/verifyAdmin');
const bothAuth = require('../auth/verifyBoth');

/* users page. */
//sign up - create a new user
router.post('/signup', db.createUser);
//get current lsit of users
router.get('/', adminAuth, db.getUsers);
//log in user
router.post('/login', db.userLogin);
//delete a user
router.delete('/:id', adminAuth, db.deleteUser)

module.exports = router;