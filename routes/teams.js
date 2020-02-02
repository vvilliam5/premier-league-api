const express = require('express');
const router = express.Router();
const db = require('../models/teams');
const adminAuth = require('../auth/verifyAdmin');
const bothAuth = require('../auth/verifyBoth');

/* GET fixture page. */
//get all teams
router.get('/', bothAuth, db.getTeams);
//get teams by id
router.get('/:id', bothAuth, db.getTeamsById)
//create new team
router.post('/', adminAuth, db.createTeam)
//update team
router.put('/:id', adminAuth, db.updateTeam)
//delete a team
router.delete('/:id', adminAuth, db.deleteTeam)

module.exports = router;