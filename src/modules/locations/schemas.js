import { s } from 'utils/schemaUtils';

export const country = s.string();

export const address = s.object({
  country,
  city: s.string(),
  address: s.string(),
});

export const optionalAddress = s.object({
  country: s.maybeNull(s.string()),
  city: s.maybeNull(s.string()),
  address: s.maybeNull(s.string()),
});
