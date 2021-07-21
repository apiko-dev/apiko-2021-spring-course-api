import { createRouteErrors, errors } from 'errors';
import { s } from 'utils/schemaUtils';

const notFoundIdsSchema = { notFoundIds: s.array(s.number()) };

export const createOrder = createRouteErrors({
  400: [[errors.NOT_FOUND_PRODUCTS, undefined, notFoundIdsSchema]],
  401: [[errors.NOT_FOUND_ORDER_OWNER, errors.UNAUTHORIZED]],
  409: [errors.INVALID_COUNTRY],
});

export const getOrder = createRouteErrors({
  404: [errors.NOT_FOUND],
});
