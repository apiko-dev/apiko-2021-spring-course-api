import * as commonSchemas from 'common/schemas';
import constraints from './constraints';
import errorCodes from './errorCodes';

// generate vars to easily search for constraints later
const [constraintsSwapped, constraintsCodes] = Object.entries(
  constraints,
).reduce(
  ([swapped, codes], [key, value]) => {
    swapped[value] = key;
    codes[key] = key;
    return [swapped, codes];
  },
  [{}, {}],
);

// use the const `errors` to create route errors
// use with the `createRouteErrors` function
export const errors = {
  ...errorCodes,
  ...constraintsCodes,
};

export function getConstraintName(value) {
  const name = constraintsSwapped[value];

  return name;
}

// helper functions to handle errors

export function ResError(error, status = 400, meta) {
  this.error = error;
  this.status = status;
  this.meta = meta;
}

export function isResError(e) {
  return e instanceof ResError;
}

export function checkConstraintErrors({ error, routeErrors }) {
  if (!error.constraint) return null;

  const constraintName = getConstraintName(error.constraint);

  const matchedRouteError = routeErrors[constraintName];
  if (!matchedRouteError) return null;

  return matchedRouteError();
}
export function handleResErrors({ res, error }) {
  if (isResError(error)) {
    res.status(error.status).send(error);
    return;
  }

  res.send(error);
}

// use the function `handleErrors` to handle errors in route's handlers
export function handleErrors({ res, error, routeErrors }) {
  const constraintError = checkConstraintErrors({ error, routeErrors });

  handleResErrors({ res, error: constraintError ?? error });
}

// helper functions to generate route errors schemas and objects

function populateResError(error, status) {
  return (meta) => new ResError(error, status, meta);
}

export function createErrorsSchemas(definitions) {
  const statusesSchemas = {};

  Object.entries(definitions).forEach(([status, errorsArr]) => {
    let metaSchema;
    const errorNames = errorsArr.map((err) => {
      if (Array.isArray(err)) {
        const [errorCode, showError, meta] = err;
        if (!metaSchema) metaSchema = meta;

        return showError ?? errorCode;
      }
      return err;
    });

    statusesSchemas[status] = commonSchemas.error(errorNames, metaSchema);
  });

  return statusesSchemas;
}

function createErrorsObjects(definitions) {
  const routeErrors = {};

  Object.entries(definitions).forEach(([status, errorsArr]) => {
    errorsArr.forEach((err) => {
      if (Array.isArray(err)) {
        const [errorCode, showError] = err;
        const showErrorCode = showError ?? errorCode;
        routeErrors[errorCode] = populateResError(showErrorCode, status);
      } else {
        routeErrors[err] = populateResError(err, status);
      }
    });
  });

  return routeErrors;
}

// use the function `createRouteErrors` to create error schemas and objects using error definitions
// `definitions` should use `errors` const declared at the top
export function createRouteErrors(definitions) {
  return {
    s: createErrorsSchemas(definitions),
    e: createErrorsObjects(definitions),
  };
}
