const express = require('express');
const router = express.Router();
const db = require('../models/teams');

/* GET fixture page. */
router.get('/', db.getTeams);
router.get('/:id', db.getTeamsById)
router.post('/', db.createTeam)
router.put('/:id', db.updateTeam)
router.delete('/:id', db.deleteTeam)

module.exports = router;