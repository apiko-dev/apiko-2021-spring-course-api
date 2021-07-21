import { s } from 'utils/schemaUtils';
import * as schemas from './schemas';

export const getCountries = {
  tags: ['locations'],
  response: {
    200: s.array(schemas.country),
  },
  description: 'Get countries',
};
