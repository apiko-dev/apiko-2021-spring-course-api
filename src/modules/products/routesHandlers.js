import { success } from 'common/responses';
import { createHandler } from 'utils/createHandler';
import { handleErrors } from 'errors';
import * as errors from './routesErrors';
import * as db from './db';

export const getProducts = createHandler(async (req, res) => {
  const userId = req.user?.userId;
  const { limit, offset, sortBy } = req.query;

  const products = await db.getProducts({ userId, limit, offset, sortBy });
  res.send(products);
});

export const getProductById = createHandler(async (req, res) => {
  const userId = req.user?.userId;
  const { id } = req.params;

  try {
    const product = await db.getProduct({ id, userId });

    if (!product) {
      throw errors.getProductById.e.NOT_FOUND();
    }

    res.send(product);
  } catch (error) {
    handleErrors({ res, error, routeErrors: errors.getProductById.e });
  }
});

export const addToFavorites = createHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    await db.addToFavorites({ id, userId });

    res.send(success);
  } catch (error) {
    handleErrors({ res, error, routeErrors: errors.addToFavorites.e });
  }
});

export const deleteFavorite = createHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const result = await db.deleteFavorite({ id, userId });

    if (!result) {
      throw errors.deleteFavorite.e.NOT_FOUND();
    }

    res.send(success);
  } catch (error) {
    handleErrors({ res, error, routeErrors: errors.deleteFavorite.e });
  }
});

export const getFavoriteProducts = createHandler(async (req, res) => {
  const { userId } = req.user;
  const { limit, offset } = req.query;

  const favorites = await db.getFavoriteProducts({ userId, limit, offset });

  res.send(favorites);
});

export const addMultipleToFavorites = createHandler(async (req, res) => {
  const { userId } = req.user;
  const { ids } = req.body;

  const favorites = await db.addMultipleToFavorites({ userId, ids });
  const productsIds = favorites.map((i) => i.productId);

  res.send(productsIds);
});

export const getProductsByIds = createHandler(async (req, res) => {
  const userId = req.user?.userId;
  const { id: ids } = req.query;

  const products = await db.getProductsByIds({ userId, ids });

  res.send(products);
});

export const searchProducts = createHandler(async (req, res) => {
  const userId = req.user?.userId;
  const { keywords, limit, offset } = req.query;

  const products = await db.searchProducts({
    userId,
    keywords,
    limit,
    offset,
  });

  res.send(products);
});
