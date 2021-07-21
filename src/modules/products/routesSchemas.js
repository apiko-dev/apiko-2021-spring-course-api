import * as commonSchemas from 'common/schemas';
import { s } from 'utils/schemaUtils';
import * as schemas from './schemas';
import * as errors from './routesErrors';

export const getProducts = {
  tags: ['products'],
  query: s.object({
    ...commonSchemas.paginationOffset.properties,
    sortBy: schemas.sortBy,
  }),
  response: {
    200: s.array(schemas.product),
  },
  ...commonSchemas.optionalAuth,
  description: 'Get products',
};

export const getProductById = {
  params: commonSchemas.idInParam,
  tags: ['products'],
  response: {
    200: schemas.product,
    ...errors.getProductById.s,
  },
  ...commonSchemas.optionalAuth,
  description: 'Get product by product id',
};

export const getProductsByIds = {
  tags: ['products'],
  query: s.object(
    {
      id: s.array(s.number()),
    },
    { required: ['id'] },
  ),
  response: {
    200: s.array(schemas.product),
  },
  ...commonSchemas.optionalAuth,
  description: 'Get multiple products by ids',
};

export const searchProducts = {
  tags: ['search'],
  query: s.object(
    {
      keywords: s.string({
        minLength: 3,
        maxLength: 50,
        description: 'Min - 3, Max - 50 characters',
      }),
      ...commonSchemas.paginationOffset.properties,
    },
    { required: ['keywords'] },
  ),
  response: {
    200: s.array(schemas.product),
  },
  ...commonSchemas.optionalAuth,
  description: 'Search products',
};

export const addToFavorites = {
  tags: ['favorite'],
  params: commonSchemas.idInParam,
  response: {
    200: commonSchemas.success,
    ...errors.addToFavorites.s,
  },
  ...commonSchemas.bearerAuth,
  description: 'Add product to favorites',
};

export const deleteFavorite = {
  tags: ['favorite'],
  params: commonSchemas.idInParam,
  response: {
    200: commonSchemas.success,
    ...errors.deleteFavorite.s,
  },
  ...commonSchemas.bearerAuth,
  description: 'Remove product from favorites',
};

export const getFavoriteProducts = {
  tags: ['favorite'],
  query: commonSchemas.paginationOffset,
  response: {
    200: s.array(schemas.product),
  },
  ...commonSchemas.bearerAuth,
  description: 'Get favorite products',
};

export const addMultipleToFavorites = {
  tags: ['favorite'],
  body: s.object(
    {
      ids: s.array(s.number()),
    },
    { required: ['ids'] },
  ),
  response: {
    200: s.array(s.number()),
  },
  ...commonSchemas.bearerAuth,
  description: `Add multiple products to favorites by ids.<br/>
  Returns array with successfully added product's ids`,
};
