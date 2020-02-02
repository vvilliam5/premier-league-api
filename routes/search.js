const express = require('express');
const router = express.Router();
const db = require('../models/search');

//search fixtures
router.post('/fixtures', db.searchFixtures);
//search teams
router.post('/teams', db.searchTeams);

module.exports = router;