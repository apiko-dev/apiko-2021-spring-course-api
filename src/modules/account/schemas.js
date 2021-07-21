import { s } from 'utils/schemaUtils';
import * as userSchemas from 'users/schemas';
import * as locationsSchemas from 'locations/schemas';

export const account = s.object(
  {
    ...userSchemas.user.properties,
    email: s.string(),
    phone: s.string(),
    ...locationsSchemas.optionalAddress.properties,
  },
  { title: 'Account' },
);

export const accountAndToken = s.object({
  token: s.string(),
  account,
});

export const EMAIL_REGEX = '\\S+@\\S+';
export const PASSWORD_REGEX =
  '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]';
export const PHONE_REGEX = '^(\\+)?([0-9]){10,14}$';
export const NAME_REGEX = '^[a-zA-Z\\s]+$';

export const emailField = s.string({
  pattern: EMAIL_REGEX,
  description: 'Should contain `@`',
});

export const passwordField = s.string({
  minLength: 8,
  maxLength: 35,
  pattern: PASSWORD_REGEX,
  description: 'Should contain at least 1 letter, 1 special symbol, 1 number',
});

export const nameField = s.string({
  pattern: NAME_REGEX,
  description: 'Only letters. Cannot have special characters and numbers',
});

export const phoneField = s.string({
  pattern: PHONE_REGEX,
  description:
    'Should contain 10-14 numbers, can have optional `+` at the beginning ',
});
