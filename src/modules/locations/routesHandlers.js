import { createHandler } from 'utils/createHandler';
import * as handlers from './handlers';

export const getCountries = createHandler(async (req, res) => {
  const countries = await handlers.getCountries();

  res.send(countries);
});
