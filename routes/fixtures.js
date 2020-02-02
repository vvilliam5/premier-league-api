const express = require('express');
const router = express.Router();
const db = require('../models/fixtures');
const adminAuth = require('../auth/verifyAdmin');
const bothAuth = require('../auth/verifyBoth');

/* GET fixture page. */
router.get('/', bothAuth, db.getFixtures);
router.get('/:id', bothAuth, db.getFixturesById)
router.post('/', adminAuth, db.createFixture)
router.put('/:id', adminAuth, db.updateFixture)
router.delete('/:id', adminAuth, db.deleteFixture)

module.exports = router;
