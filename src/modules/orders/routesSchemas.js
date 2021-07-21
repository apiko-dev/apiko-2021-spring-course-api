import * as commonSchemas from 'common/schemas';
import * as locationSchemas from 'locations/schemas';
import { s } from 'utils/schemaUtils';
import * as schemas from './schemas';
import * as errors from './routesErrors';

export const getOrder = {
  params: commonSchemas.idInParam,
  tags: ['orders'],
  response: {
    200: schemas.order,
    ...errors.getOrder.s,
  },
  ...commonSchemas.bearerAuth,
  description: 'Get order by its id',
};

export const getUserOrders = {
  tags: ['orders'],
  query: commonSchemas.paginationOffset,
  response: {
    200: s.array(schemas.order),
  },
  ...commonSchemas.bearerAuth,
  description: 'Get orders',
};

export const createOrder = {
  tags: ['orders'],
  body: s.object(
    {
      items: s.array(
        s.object(
          {
            productId: s.number(),
            quantity: s.number({ default: 1 }),
          },
          { required: ['productId', 'quantity'] },
        ),
      ),
      shipment: s.object(
        {
          fullName: s.string(),
          phone: s.string(),
          ...locationSchemas.address.properties,
        },
        { required: ['fullName', 'phone', 'country', 'city', 'address'] },
      ),
    },
    {
      required: ['items', 'shipment'],
    },
  ),
  response: {
    200: schemas.order,
    ...errors.createOrder.s,
  },
  ...commonSchemas.bearerAuth,
  description: 'Create new order',
};
