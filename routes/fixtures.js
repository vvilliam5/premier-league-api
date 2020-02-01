const express = require('express');
const router = express.Router();
const db = require('../models/fixtures');

/* GET fixture page. */
router.get('/', db.getFixtures);
router.get('/:id', db.getFixturesById)
router.post('/', db.createFixture)
router.put('/:id', db.updateFixture)
router.delete('/:id', db.deleteFixture)

module.exports = router;
