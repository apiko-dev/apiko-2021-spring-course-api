import { createRouteErrors, errors } from 'errors';

export const getCategory = createRouteErrors({
  404: [errors.NOT_FOUND],
});

export const getCategoryProducts = createRouteErrors({
  400: [errors.INVALID_CATEGORY],
});
