import auth from 'auth';
import account from 'account';
import products from 'products';
import categories from 'categories';
import orders from 'orders';
import locations from 'locations';

/**
 * Registers all the handlers
 *
 * @param {import('fastify').FastifyInstance} fastify
 * @param {*} [options={}]
 */
async function registerModules(fastify, options = {}) {
  options.prefix = '/api';

  fastify.register(auth, options);
  fastify.register(account, options);
  fastify.register(categories, options);
  fastify.register(products, options);
  fastify.register(locations, options);
  fastify.register(orders, options);
}

export default registerModules;
