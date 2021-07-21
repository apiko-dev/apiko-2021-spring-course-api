import * as commonSchemas from 'common/schemas';
import { s } from 'utils/schemaUtils';

export const user = s.object(
  {
    id: { type: 'number' },
    fullName: { type: 'string' },
    ...commonSchemas.timestamps,
  },
  {
    title: 'User',
  },
);
