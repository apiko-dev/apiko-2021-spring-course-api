import pino from 'pino';
import { Writable } from 'stream';
import configs from 'configs';

const logStream = new Writable({
  write(chunk, encoding, callback) {
    if (configs.logging.logToConsole) {
      pino.destination(1).write(chunk);
    }

    if (configs.logging.logToRemote) {
      // write to some remote resource
      // fileStream.write(chunk);
    }

    callback();
  },
});

export const options = {
  level: 'info',
  prettyPrint: configs.logging.prettyPrint && {
    colorize: true,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  stream: logStream,
};

let rootLogger = null;

export const init = (loggerInstance) => {
  rootLogger = loggerInstance;
};

/**
 * Function which returns rootLogger logger instance
 * @returns {import('fastify').FastifyLoggerInstance} loggerInstance
 */
export const log = (request) => request?.log ?? rootLogger;

export const logInfo = (message, data, req) => {
  if (configs.logging.logData) {
    log(req).info({ data }, message);
  } else {
    log(req).info(message);
  }
};

export const logError = (message, err, data, req) => {
  if (configs.logging.logData) {
    log(req).error({ err, data }, message);
  } else {
    log(req).error({ err }, message);
  }
};
