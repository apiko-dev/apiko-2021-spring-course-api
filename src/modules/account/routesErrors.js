import { createRouteErrors, errors } from 'errors';

export const getAccount = createRouteErrors({
  404: [errors.NOT_FOUND],
});

export const updateAccount = createRouteErrors({
  404: [errors.NOT_FOUND],
  409: [errors.INVALID_COUNTRY],
});

export const changePassword = createRouteErrors({
  401: [errors.WRONG_PASSWORD],
  404: [errors.NOT_FOUND],
});
