import bcrypt from 'bcrypt';
import config from 'configs';

export const hashBcrypt = (text) =>
  bcrypt.hash(text, config.hash.bcrypt.saltRounds);

export const compareBcrypt = (text, hashText) => bcrypt.compare(text, hashText);

export const algorithms = {
  bcrypt: {
    hash: hashBcrypt,
    compare: compareBcrypt,
  },
};

function hash(cleartext, hashFuncName = config.hash.default) {
  if (hashFuncName in algorithms) {
    return algorithms[hashFuncName].hash(cleartext);
  }

  throw new Error(`Unknown hash function ${hashFuncName}`);
}

function compare(cleartext, hashText, hashFuncName = config.hash.default) {
  if (hashFuncName in algorithms) {
    return algorithms[hashFuncName].compare(cleartext, hashText);
  }

  throw new Error(`Unknown hash function ${hashFuncName}`);
}

export default {
  hash,
  compare,
};
