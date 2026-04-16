const { getTriggerAlerts, simulateTrigger } = require('../controllers/triggerController');

async function triggerRoutes(fastify, options) {
  fastify.get('/alerts', getTriggerAlerts);
  fastify.post('/simulate', simulateTrigger);
}

module.exports = triggerRoutes;
