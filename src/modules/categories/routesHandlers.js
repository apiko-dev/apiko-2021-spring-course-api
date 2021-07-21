import { handleErrors } from 'errors';
import { createHandler } from 'utils/createHandler';
import * as productsDb from 'products/db';
import * as errors from './routesErrors';
import * as db from './db';

export const getCategories = createHandler(async (req, res) => {
  const categories = await db.getCategories();

  res.send(categories);
});

export const getCategory = createHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const category = await db.getCategory({ id });

    if (!category) {
      throw errors.getCategory.e.NOT_FOUND();
    }

    res.send(category);
  } catch (error) {
    handleErrors({ res, error, routeErrors: errors.getCategory.e });
  }
});

export const getCategoryProducts = createHandler(async (req, res) => {
  const userId = req.user?.userId;
  const { id } = req.params;
  const { limit, offset, sortBy } = req.query;

  try {
    const category = await db.getCategory({ id });
    if (!category) {
      throw errors.getCategoryProducts.e.INVALID_CATEGORY();
    }

    const products = await productsDb.getProductsByCategory({
      userId,
      category,
      limit,
      offset,
      sortBy,
    });

    res.send(products);
  } catch (error) {
    handleErrors({ res, error, routeErrors: errors.getCategoryProducts.e });
  }
});
