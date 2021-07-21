import { createRouteErrors, errors } from 'errors';

export const getProductById = createRouteErrors({
  404: [errors.NOT_FOUND],
});

export const addToFavorites = createRouteErrors({
  403: [[errors.NOT_FOUND_FAVORITE_PRODUCT_OWNER, errors.UNAUTHORIZED]],
  404: [[errors.NOT_FOUND_FAVORITE_PRODUCT, errors.NOT_FOUND]],

  409: [errors.PRODUCT_ALREADY_FAVORITE],
});

export const deleteFavorite = createRouteErrors({
  404: [errors.NOT_FOUND],
});
