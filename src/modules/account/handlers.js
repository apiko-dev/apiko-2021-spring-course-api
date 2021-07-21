import { logError } from 'services/logging';
import * as db from './db';

export const saveFirstAddress = async ({ userId, country, city, address }) => {
  try {
    await db.saveFirstAddress({ userId, country, city, address });
  } catch (error) {
    logError('account saveFirstAddress failed', error, {
      userId,
      country,
      city,
      address,
    });
  }
};
