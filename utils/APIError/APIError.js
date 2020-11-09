const httpStatus = require('http-status');
const Class = require('es-class');
const appErrorCode = require('./ErrorCode');

/**
 * Wrap Error
 * @param {String} errCode        Code
 * @param {String} errTitle       Title
 * @param {String} errDesc        Description
 * @param {String} errDebugDesc   Debug Description
 * @param {Object} errAttributes  Attributes
 */
const generateError = (errCode, errTitle, errDesc, errDebugDesc, errAttributes) => {
  const result = {
    errorCode: errCode,
    errorTitle: errTitle,
    errorDescription: errDesc,
    errorDebugDescription: errDebugDesc,
    errorAttributes: errAttributes,
  };
  return result;
};

/**
 * @extends Error
 */
const ExtendableError = Class({
  extends: Error,
  constructor: function ({  // eslint-disable-line
    message, errors, route, status, isPublic, stack,
  }) {
    this.super(message);
    this.name = this.constructor.name;
    this.message = message || 'Oops! Something is wrong';
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.route = route;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = stack;
  },
});

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({
    message,
    errors,
    route = 'default',
    stack,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
  }) {
    super({
      message, errors, route, status, isPublic, stack,
    });
  }

  static notFound() {
    return APIError.withCode('NOT_FOUND', httpStatus.NOT_FOUND);
  }

  static forbidden() {
    return APIError.withCode('FORBIDDEN', httpStatus.FORBIDDEN);
  }

  static unauthorized() {
    return APIError.withCode('UNAUTHORIZED', httpStatus.UNAUTHORIZED);
  }

  static withCode(code, status, errorAttibutes) {
    const errorCode = code && appErrorCode[code] ? code : 'UNSPECIFIED';
    // eslint-disable-next-line no-underscore-dangle
    const _error = appErrorCode[errorCode];
    const errAttributes = errorAttibutes || {};
    if (errorCode === 'UNSPECIFIED') {
      errAttributes.missingCode = code;
    }
    const errors = [
      generateError(errorCode, _error.errTitle, _error.errDesc, _error.errDebugDesc, errAttributes),
    ];
    return {
      message: _error.errTitle,
      status: status || 400,
      errors,
    };
  }
}

module.exports = {
  APIError,
  generateError,
};
