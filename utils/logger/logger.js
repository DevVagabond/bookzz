const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');
const sanitizer = require('node-sanitizer');
const {
  env, serviceName, sanitizedFields,
} = require('../../config/vars');

const {
  combine,
  colorize,
  simple,
} = winston.format;

const options = {
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
    prettyPrint: true,
    format: combine(
      colorize(),
      simple(),
    ),
  },
};

const transports = [
  new winston.transports.Console(options.console),
  new WinstonCloudWatch({
    logGroupName: serviceName,
    logStreamName: `${process.env.NODE_ENV}-${process.env.POD_NAME}`,
    createLogGroup: true,
    createLogStream: true,
    handleExceptions: true,
    jsonMessage: true,
    awsRegion: process.env.AWS_DEFAULT_REGION,
  }),
];

// instantiate a new Winston Logger with the settings defined above
const logger = winston.loggers.add(env, {
  transports,
});

// create a stream object with a 'write' function that will be used by `loggerMiddleware`
logger.stream = {
  write: (req) => {
    logger.info(`${req.method} request to ${req.url}`, {
      body: sanitizer(req.body, sanitizedFields),
      query: sanitizer(req.query, sanitizedFields),
    });
  },
};

logger.streamError = {
  write: (req) => {
    logger.error(`${req.method} request to ${req.url}`, {
      body: sanitizer(req.body, sanitizedFields),
      query: sanitizer(req.query, sanitizedFields),
    });
  },
};

/**
 * Debug Log
 * @param {String} message    Info message
 * @param {Object} logData       Info data
 */
const debug = (message, logData) => {
  logger.info(message, logData);
};

/**
 * Warn Log
 * @param {String} message       Error message
 * @param {Object} logData       Error data
 */
const warn = (message, logData) => {
  logger.error(message, logData);
};

/**
 * Info Log
 * @param {String} message    Info message
 * @param {Object} logData       Info data
 */
const info = (message, logData) => {
  logger.info(message, logData);
};

/**
 * Error Log
 * @param {String} message       Error message
 * @param {Object} logData       Error data
 */
const error = (message, logData) => {
  logger.error(message, logData);
};

/**
 * Capture Error
 * @param {String} title        Error's title
 * @param {Object} error        Error's data
 * @param {String} methodName   Method's name
 */
const captureError = (title, err, methodName) => {
  const logData = {
    serviceName,
    methodName,
    error: err.message,
  };
  if (err.stack) {
    logData.stack = err.stack;
  }
  logger.error(title, logData);
};

module.exports = {
  logger,
  info,
  debug,
  warn,
  error,
  captureError,
};
