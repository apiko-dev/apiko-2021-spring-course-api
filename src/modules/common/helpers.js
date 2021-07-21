import fastJson from 'fast-json-stringify';
import errorCodes from 'errors/errorCodes';

const errorCodesSwapped = Object.entries(errorCodes).reduce(
  (acc, [key, value]) => {
    acc[value] = key;

    return acc;
  },
  {},
);

export function checkConstraints(name) {
  const errorName = errorCodesSwapped[name];

  return {
    [errorName]: errorName,
  };
}

export function getObjectBySchema(schema, object) {
  const json = fastJson(schema)(object);
  return JSON.parse(json);
}
