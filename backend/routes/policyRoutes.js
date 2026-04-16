const { issuePolicy, getPolicyDetails } = require('../controllers/policyController');

async function policyRoutes(fastify, options) {
  fastify.post('/issue', issuePolicy);
  fastify.get('/:policyId', getPolicyDetails);
}

module.exports = policyRoutes;
