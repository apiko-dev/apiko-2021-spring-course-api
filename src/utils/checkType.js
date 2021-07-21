export const isObject = (val) =>
  val !== null && typeof val === 'object' && Array.isArray(val) === false;

export const isSqlTemplate = (val) => isObject(val) && val._isSqlTemplate;
