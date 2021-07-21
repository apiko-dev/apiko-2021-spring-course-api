import * as accountSchemas from 'account/schemas';
import { s } from 'utils/schemaUtils';
import * as errors from './routesErrors';

export const login = {
  tags: ['auth'],
  body: s.object(
    {
      email: accountSchemas.emailField,
      password: s.string(),
    },
    {
      required: ['email', 'password'],
    },
  ),
  response: {
    200: accountSchemas.accountAndToken,
    ...errors.login.s,
  },
  description: 'Login user',
};

export const register = {
  tags: ['auth'],
  body: s.object(
    {
      fullName: accountSchemas.nameField,
      email: accountSchemas.emailField,
      password: accountSchemas.passwordField,
      phone: accountSchemas.phoneField,
    },
    {
      required: ['fullName', 'email', 'password', 'phone'],
    },
  ),
  response: {
    200: accountSchemas.accountAndToken,
    ...errors.register.s,
  },
  description: 'Register new user',
};
