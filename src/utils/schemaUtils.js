export const s = {
  object: (properties = {}, keywords) => ({
    type: 'object',
    properties,
    ...keywords,
  }),
  array: (items) => ({
    type: 'array',
    items,
  }),
  maybeNull: (type) => ({
    ...type,
    nullable: true,
  }),
  number: (keywords) => ({ type: 'number', ...keywords }),
  string: (keywords) => ({ type: 'string', ...keywords }),
  boolean: (keywords) => ({ type: 'boolean', ...keywords }),
};
