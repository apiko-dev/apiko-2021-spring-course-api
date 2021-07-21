import { s } from 'utils/schemaUtils';

export const success = s.object(
  {
    success: s.boolean({ default: true }),
  },
  { title: 'Success' },
);

export const error = (errorCodes, metaProps) => {
  let metaDefinition;

  if (metaProps) {
    metaDefinition = {
      meta: s.maybeNull(s.object(metaProps)),
    };
  }

  return s.object(
    {
      error: s.string({ enum: errorCodes }),
      status: s.number(),
      ...metaDefinition,
    },
    {
      title: 'Error',
      'x-response-description': 'Error',
    },
  );
};

export const limit = s.number({ default: 20 });

export const paginationSeek = s.object({
  afterId: s.number({
    description: 'Item `id` from which will fetch next items',
  }),
  limit,
});

export const paginationOffset = s.object({
  offset: s.number({ default: 0 }),
  limit,
});

export const bearerAuth = {
  security: [{ bearerAuth: [] }],
};

export const optionalAuth = {
  security: [{}, { bearerAuth: [] }],
};

export const idInParam = s.object({
  id: s.number(),
});

export const createdAt = {
  createdAt: s.string(),
};

export const updatedAt = {
  updatedAt: s.string(),
};

export const timestamps = {
  ...createdAt,
  ...updatedAt,
};
