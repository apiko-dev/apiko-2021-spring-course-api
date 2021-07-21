import { s } from 'utils/schemaUtils';

export const category = s.object(
  {
    id: s.number(),
    name: s.string(),
  },
  { title: 'Category' },
);
