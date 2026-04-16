const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');

// Register CORS
fastify.register(cors, {
  origin: true,
});

// Register routes
fastify.register(require('./routes/riderRoutes'), { prefix: '/api/riders' });
fastify.register(require('./routes/policyRoutes'), { prefix: '/api/policies' });
fastify.register(require('./routes/triggerRoutes'), { prefix: '/api/triggers' });

// Root route
fastify.get('/', async () => {
  return { message: 'GigShield Backend API' };
});

// Start server
const PORT = process.env.PORT || 5001;

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
