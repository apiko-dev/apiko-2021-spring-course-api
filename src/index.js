if (process.env.NODE_ENV === 'development') {
  /* eslint-disable global-require */
  require('dotenv').config();
  /* eslint-enable global-require */
}

require('@babel/register');
require('./main');
