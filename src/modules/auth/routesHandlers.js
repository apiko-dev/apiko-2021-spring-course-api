import * as userDb from 'users/db';
import * as accountDb from 'account/db';
import passwords from 'services/passwords';
import { handleErrors } from 'errors';
import * as errors from './routesErrors';
import { createToken } from './helpers';

export async function register(req, res) {
  const { password, fullName, email, phone } = req.body;

  try {
    const passwordHash = await passwords.hash(password);

    const newUser = await userDb.createUser({
      email,
      fullName,
      passwordHash,
      phone,
    });

    const token = await createToken({
      user: newUser,
      jwt: this.jwt,
    });

    res.send({ token, account: newUser });
  } catch (error) {
    handleErrors({ res, error, routeErrors: errors.register.e });
  }
}

export async function login(req, res) {
  const { password, email } = req.body;
  try {
    const user = await accountDb.findAccountByEmail({ email });

    if (!user) {
      throw errors.login.e.INCORRECT_EMAIL_OR_PASSWORD();
    }

    const passwordMatches = await passwords.compare(
      password,
      user.passwordHash.toString('utf-8'),
    );

    if (!passwordMatches) {
      throw errors.login.e.INCORRECT_EMAIL_OR_PASSWORD();
    }

    const token = await createToken({
      user,
      jwt: this.jwt,
    });

    res.send({ token, account: user });
  } catch (error) {
    handleErrors({ res, error, routeErrors: errors.login.e });
  }
}
