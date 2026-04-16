const { onboarding, getRiderProfile } = require('../controllers/riderController');

async function riderRoutes(fastify, options) {
  fastify.post('/onboarding', onboarding);
  fastify.get('/:id', getRiderProfile);
}

module.exports = riderRoutes;
