const httpStatus = require('http-status');
const { APIError } = require('../APIError');
const logger = require('../logger');

/**
 * Utitlity function to handle response
 * @param {Object} res                        Response object of express
 * @param {String} responseMessage            The response message which needs to send
 * @param {any} response                      The response object which needs to send
 * @param {Number} statusCode                 The status code of the request
 */
const OK = (res, responseMessage = 'OK', response = {}, status = httpStatus.OK) => {
  res.status(status);
  return res.json({
    responseCode: status,
    responseMessage,
    response,
  });
};

/**
 * Handle API Error
 * @param {Object} err            Error Object
 * @param {String} method         Method which invokes this handler
 * @param {String} service        Service which invokes this handler
 *
 * @return APIError object
 *
 * @public
 */
const handleApiError = (res, err, method, service) => {
  let errorObj;
  if (!err.response) {
    if (err.request) {
      if (err.code === 'ECONNABORTED') {
        errorObj = APIError.withCode('EXTERNAL_SERVICE_TIMEOUT', httpStatus.GATEWAY_TIMEOUT, { service, method, voilation: err.code });
      }
      errorObj = APIError.withCode('EXTERNAL_SERVICE_INVALID_RESPONSE', httpStatus.BAD_GATEWAY, { service, method, voilation: err.code });
    }
    errorObj = APIError.withCode('EXTERNAL_SERVICE_INVALID_REQUEST', httpStatus.INTERNAL_SERVER_ERROR, { service, method, voilation: err.message });
  }
  const errorStatus = err.status || 400;
  logger.error('API Error Response', { api_error: err });
  if (errorStatus === httpStatus.UNAUTHORIZED) {
    errorObj = APIError.withCode('UNAUTHORIZED', errorStatus, { service, method, voilation: errorStatus });
  }
  if (errorStatus === httpStatus.FORBIDDEN) {
    errorObj = APIError.withCode('FORBIDDEN', errorStatus, { service, method, voilation: errorStatus });
  }
  if (errorStatus === httpStatus.NOT_FOUND) {
    errorObj = APIError.withCode('NOT_FOUND', errorStatus, { service, method, voilation: errorStatus });
  }
  errorObj = APIError.withCode('EXTERNAL_SERVICE_FAILURE', errorStatus, { service, method, voilation: errorStatus });

  res.status(errorObj.status);
  res.json(errorObj);
};

module.exports = {
  OK,
  handleApiError,
};
