import { optionalAuth, requiredAuth } from 'auth/helpers';

import * as handlers from './routesHandlers';
import * as schemas from './routesSchemas';

/**
 * Products endpoints
 *
 * @param {import('fastify').FastifyInstance} fastify
 */

async function routes(fastify) {
  fastify.get(
    '/products',
    { schema: schemas.getProducts, onRequest: optionalAuth },
    handlers.getProducts,
  );

  fastify.get(
    '/products/:id',
    { schema: schemas.getProductById, onRequest: optionalAuth },
    handlers.getProductById,
  );

  fastify.get(
    '/products/ids',
    { schema: schemas.getProductsByIds, onRequest: optionalAuth },
    handlers.getProductsByIds,
  );

  fastify.get(
    '/products/search',
    { schema: schemas.searchProducts, onRequest: optionalAuth },
    handlers.searchProducts,
  );

  fastify.post(
    '/products/:id/favorite',
    { schema: schemas.addToFavorites, onRequest: requiredAuth },
    handlers.addToFavorites,
  );

  fastify.delete(
    '/products/:id/favorite',
    { schema: schemas.deleteFavorite, onRequest: requiredAuth },
    handlers.deleteFavorite,
  );

  fastify.get(
    '/products/favorites',
    { schema: schemas.getFavoriteProducts, onRequest: requiredAuth },
    handlers.getFavoriteProducts,
  );

  fastify.post(
    '/products/favorites',
    { schema: schemas.addMultipleToFavorites, onRequest: requiredAuth },
    handlers.addMultipleToFavorites,
  );
}

export default routes;
