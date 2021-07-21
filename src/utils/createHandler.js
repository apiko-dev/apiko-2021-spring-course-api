/**
 * This callback defines route handler
 * @callback IRouteHandler
 * @param {import('fastify').FastifyRequest} request
 * @param {import('fastify').FastifyReply} response
 */

/**
 * Route handler factory
 * @param {IRouteHandler} handler - route handler
 */
export function createHandler(handler) {
  return handler;
}
