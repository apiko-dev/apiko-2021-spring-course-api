import dotenv from 'dotenv';

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

const host = process.env.HOST || 'localhost'; // 192.168.31.167
const port = process.env.PORT || 8090;
const protocol = isProd ? 'https' : 'http';

export default {
  host,
  port,
  protocol,
  url: `${protocol}://${host}${isProd ? '' : `:${port}`}`,

  app: {
    secret1: process.env.SECRET1 || 'LOCAL_SECRET_1',
    secret2: process.env.SECRET2 || 'LOCAL_SECRET_2',
  },

  hash: {
    default: 'bcrypt',

    bcrypt: {
      saltRounds: 10,
    },
  },

  db: {
    connectionString:
      process.env.DATABASE_URL || 'postgres://apiko:apiko@localhost:5452/apiko',
    connectionTimeoutMillis: 20000,
  },

  logging: {
    logData: isDev,
    prettyPrint: isDev,
    logToConsole: true,
    logToRemote: false,
  },
};
