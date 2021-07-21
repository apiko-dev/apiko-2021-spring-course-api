import { createRouteErrors, errors } from 'errors';

export const register = createRouteErrors({
  409: [errors.EMAIL_ALREADY_USED],
});

export const login = createRouteErrors({
  401: [errors.INCORRECT_EMAIL_OR_PASSWORD],
});
