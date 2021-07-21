import * as commonSchemas from 'common/schemas';
import * as locationSchemas from 'locations/schemas';
import { s } from 'utils/schemaUtils';
import * as schemas from './schemas';
import * as errors from './routesErrors';

export const getAccount = {
  tags: ['account'],
  response: {
    200: schemas.account,
    ...errors.getAccount.s,
  },
  ...commonSchemas.bearerAuth,
  description: 'Get user account',
};

export const updateAccount = {
  tags: ['account'],
  body: s.object(
    {
      fullName: schemas.nameField,
      email: schemas.emailField,
      phone: schemas.phoneField,
      ...locationSchemas.address.properties,
    },
    { required: ['fullName', 'email', 'phone'] },
  ),
  response: {
    200: schemas.account,
    ...errors.updateAccount.s,
  },
  ...commonSchemas.bearerAuth,
  description: 'Update user account',
};

export const changePassword = {
  tags: ['account'],
  body: {
    type: 'object',
    properties: {
      oldPassword: s.string(),
      password: schemas.passwordField,
    },
    required: ['oldPassword', 'password'],
  },
  response: {
    200: commonSchemas.success,
    ...errors.changePassword.s,
  },
  ...commonSchemas.bearerAuth,
  description: 'Change user password',
};
