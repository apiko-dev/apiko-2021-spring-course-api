import { optionalAuth } from 'auth/helpers';
import * as schemas from './routesSchemas';
import * as handlers from './routesHandlers';

/**
 * Account endpoints
 *
 * @param {import('fastify').FastifyInstance} fastify
 */

async function routes(fastify) {
  fastify.get(
    '/categories',
    { schema: schemas.getCategories },
    handlers.getCategories,
  );

  fastify.get(
    '/categories/:id',
    { schema: schemas.getCategory },
    handlers.getCategory,
  );

  fastify.get(
    '/categories/:id/products',
    { schema: schemas.getCategoryProducts, onRequest: optionalAuth },
    handlers.getCategoryProducts,
  );
}

export default routes;
