import * as productSchemas from 'products/schemas';
import * as locationSchemas from 'locations/schemas';
import * as commonSchemas from 'common/schemas';
import { s } from 'utils/schemaUtils';

export const order = s.object(
  {
    id: s.number(),
    ownerId: s.number(),
    items: s.array(
      s.object({
        product: productSchemas.product,
        quantity: s.number(),
        orderedPrice: s.number(),
      }),
    ),
    shipment: s.object({
      fullName: s.string(),
      phone: s.string(),
      ...locationSchemas.address.properties,
    }),
    totalPrice: s.number(),

    ...commonSchemas.timestamps,
  },
  { title: 'Order' },
);
