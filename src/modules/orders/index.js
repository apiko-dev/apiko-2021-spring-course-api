import { requiredAuth } from 'auth/helpers';

import * as handlers from './routesHandlers';
import * as schemas from './routesSchemas';

/**
 * Orders endpoints
 *
 * @param {import('fastify').FastifyInstance} fastify
 */

async function routes(fastify) {
  fastify.get(
    '/orders',
    { schema: schemas.getUserOrders, onRequest: requiredAuth },
    handlers.getUserOrders,
  );

  fastify.post(
    '/orders',
    { schema: schemas.createOrder, onRequest: requiredAuth },
    handlers.createOrder,
  );

  fastify.get(
    '/orders/:id',
    { schema: schemas.getOrder, onRequest: requiredAuth },
    handlers.getOrder,
  );
}

export default routes;
