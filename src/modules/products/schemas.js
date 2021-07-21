import * as commonSchemas from 'common/schemas';
import { s } from 'utils/schemaUtils';
import * as categoriesSchemas from 'categories/schemas';
import { sortOptions } from './constants';

export const product = s.object(
  {
    id: s.number(),
    title: s.string(),
    price: s.number(),
    picture: s.string(),
    description: s.maybeNull(s.string()),
    category: categoriesSchemas.category,
    favorite: s.boolean({ default: false }),
    ...commonSchemas.timestamps,
  },
  {
    title: 'Product',
  },
);

export const sortBy = s.string({
  enum: Object.values(sortOptions),
  default: sortOptions.latest,
});
