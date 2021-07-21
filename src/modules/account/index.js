import { requiredAuth } from 'auth/helpers';
import * as schemas from './routesSchemas';
import * as handlers from './routesHandlers';

/**
 * Account endpoints
 *
 * @param {import('fastify').FastifyInstance} fastify
 */

async function routes(fastify) {
  fastify.get(
    '/account',
    { schema: schemas.getAccount, onRequest: requiredAuth },
    handlers.getAccount,
  );

  fastify.put(
    '/account',
    { schema: schemas.updateAccount, onRequest: requiredAuth },
    handlers.updateAccount,
  );

  fastify.put(
    '/account/password',
    { schema: schemas.changePassword, onRequest: requiredAuth },
    handlers.changePassword,
  );
}

export default routes;
