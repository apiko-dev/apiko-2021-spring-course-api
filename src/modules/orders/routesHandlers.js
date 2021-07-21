import { createHandler } from 'utils/createHandler';
import { handleErrors } from 'errors';
import * as accountHandlers from 'account/handlers';
import * as productsDb from 'products/db';
import { isValidCountry } from 'modules/locations/handlers';
import * as errors from './routesErrors';
import * as db from './db';

export const createOrder = createHandler(async (req, res) => {
  const { userId } = req.user;
  const { items, shipment } = req.body;

  try {
    if (!isValidCountry(shipment.country)) {
      throw errors.createOrder.e.INVALID_COUNTRY();
    }

    const itemsIds = items.map((i) => i.productId);
    const products = await productsDb.getPlainProductsByIds({ ids: itemsIds });

    if (items.length > products.length) {
      const existsIds = products.map((p) => p.id);
      const notFoundIds = itemsIds.filter((i) => !existsIds.includes(i));

      throw errors.createOrder.e.NOT_FOUND_PRODUCTS({ notFoundIds });
    }

    const newOrder = await db.createOrder({
      userId,
      items,
      shipment,
    });

    const order = await db.getOrder({ id: newOrder.id, userId });

    accountHandlers.saveFirstAddress({ userId, address: shipment.address });

    res.send(order);
  } catch (error) {
    handleErrors({
      res,
      error,
      routeErrors: errors.createOrder.e,
    });
  }
});

export const getUserOrders = createHandler(async (req, res) => {
  const { userId } = req.user;
  const { limit, offset } = req.query;

  const orders = await db.getUserOrders({ userId, limit, offset });
  res.send(orders);
});

export const getOrder = createHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const order = await db.getOrder({ id, userId });

    if (!order) {
      throw errors.getOrder.e.NOT_FOUND();
    }

    res.send(order);
  } catch (error) {
    handleErrors({ res, error, routeErrors: errors.getOrder.e });
  }
});
