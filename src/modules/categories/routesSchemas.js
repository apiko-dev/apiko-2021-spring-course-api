import * as commonSchemas from 'common/schemas';
import * as productSchemas from 'products/schemas';
import { s } from 'utils/schemaUtils';
import * as schemas from './schemas';
import * as errors from './routesErrors';

export const getCategories = {
  tags: ['categories'],
  response: {
    200: s.array(schemas.category),
  },
  description: 'Get categories',
};

export const getCategory = {
  tags: ['categories'],
  params: commonSchemas.idInParam,
  response: {
    200: schemas.category,
    ...errors.getCategory.s,
  },
  description: 'Get category',
};

export const getCategoryProducts = {
  tags: ['categories'],
  params: commonSchemas.idInParam,
  query: s.object({
    ...commonSchemas.paginationOffset.properties,
    sortBy: productSchemas.sortBy,
  }),
  response: {
    200: s.array(productSchemas.product),
    ...errors.getCategoryProducts.s,
  },
  ...commonSchemas.optionalAuth,
  description: 'Get products related to the specified category',
};
