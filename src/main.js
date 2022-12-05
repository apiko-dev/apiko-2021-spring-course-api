import 'core-js/stable';
import 'regenerator-runtime/runtime';

import fastify from 'fastify';
import fastifyOAS from 'fastify-swagger';
import fastifyCors from 'fastify-cors';
import fastifyJwt from 'fastify-jwt';

import * as logging from 'services/logging';
import modules from 'modules';
import configs from 'configs';
import swagger from './swagger';

// create server
const app = fastify({
  logger: logging.options,
  ajv: {
    customOptions: {
      coerceTypes: 'array',
    },
  },
})
  .register(fastifyCors, {
    origin: true,
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  })
  .register(fastifyJwt, {
    secret: configs.app.secret1,
  })
  .register(fastifyOAS, swagger)
  .register(modules);

// initialize logging
logging.init(app.log);

// Run the server!
const start = async () => {
  try {
    await app.listen(configs.port, '0.0.0.0');
  } catch (err) {
    logging.log().error(err);
    process.exit(1);
  }
};

start();
