const express = require('express');
const { issuePolicy, getPolicyDetails } = require('../controllers/policyController');
const router = express.Router();

router.post('/issue', issuePolicy);
router.get('/:policyId', getPolicyDetails);

module.exports = router;
