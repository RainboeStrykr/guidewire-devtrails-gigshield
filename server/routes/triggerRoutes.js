const express = require('express');
const { getTriggerAlerts, simulateTrigger } = require('../controllers/triggerController');
const router = express.Router();

router.get('/alerts', getTriggerAlerts);
router.post('/simulate', simulateTrigger);

module.exports = router;
