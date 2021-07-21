import { handleErrors } from 'errors';
import { success } from 'common/responses';
import passwords from 'services/passwords';
import { createHandler } from 'utils/createHandler';
import { isValidCountry } from 'modules/locations/handlers';
import * as errors from './routesErrors';
import * as db from './db';

export const getAccount = createHandler(async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await db.getAccount({ id: userId });

    if (!user) {
      throw errors.getAccount.e.NOT_FOUND();
    }

    res.send(user);
  } catch (error) {
    handleErrors({ res, error, routeErrors: errors.getAccount.e });
  }
});

export const updateAccount = createHandler(async (req, res) => {
  const { userId } = req.user;
  const { fullName, email, phone, country, city, address } = req.body;

  if (country && !isValidCountry(country)) {
    throw errors.updateAccount.e.INVALID_COUNTRY();
  }

  try {
    const updated = await db.updateAccount({
      userId,
      fullName,
      phone,
      email,
      country,
      city,
      address,
    });

    if (!updated) {
      throw errors.updateAccount.e.NOT_FOUND();
    }

    const account = await db.getAccount({ id: userId });

    res.send(account);
  } catch (error) {
    handleErrors({ res, error, routeErrors: errors.updateAccount.e });
  }
});

export const changePassword = createHandler(async (req, res) => {
  const { userId } = req.user;
  const { oldPassword, password } = req.body;

  try {
    const account = await db.getAccount({ id: userId });
    if (!account) {
      throw errors.changePassword.e.NOT_FOUND();
    }

    const passwordMatches = await passwords.compare(
      oldPassword,
      account.passwordHash.toString('utf-8'),
    );
    if (!passwordMatches) {
      throw errors.changePassword.e.WRONG_PASSWORD();
    }

    const passwordHash = await passwords.hash(password);

    await db.updatePassword({
      userId,
      passwordHash,
    });

    res.send(success);
  } catch (error) {
    handleErrors({ res, error, routeErrors: errors.updateAccount.e });
  }
});
