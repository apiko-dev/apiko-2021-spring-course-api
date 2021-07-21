import * as schemas from './routesSchemas';
import * as handlers from './routesHandlers';

/**
 * Account endpoints
 *
 * @param {import('fastify').FastifyInstance} fastify
 */

async function routes(fastify) {
  fastify.get(
    '/locations/countries',
    { schema: schemas.getCountries },
    handlers.getCountries,
  );
}

export default routes;
