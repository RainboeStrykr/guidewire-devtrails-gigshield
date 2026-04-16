const express = require('express');
const { onboarding, getRiderProfile } = require('../controllers/riderController');
const router = express.Router();

router.post('/onboarding', onboarding);
router.get('/:id', getRiderProfile);

module.exports = router;
