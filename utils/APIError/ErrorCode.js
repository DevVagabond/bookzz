module.exports = {
  UNSPECIFIED: {
    errTitle: 'Error code not specified',
    errDesc: 'Please try again, if problem still persist, please contact web master',
    errDebugDesc: 'Error code not specified in the system',
  },
  UNKNOWN: {
    errTitle: 'Oops...something went wrong',
    errDesc: 'System is not responding properly',
    errDebugDesc: 'System is not able to handle the error gracefully',
  },
  EXTERNAL_SERVICE_TIMEOUT: {
    errTitle: 'External service getting timed out',
    errDesc: 'Please try again, if problem still persist, please contact web master',
    errDebugDesc: 'External Service not responding in stipulated time',
  },
  UNAUTHORIZED: {
    errTitle: 'Access Denied. Invalid Session Token',
    errDesc: 'This name already exist, please choose another name',
    errDebugDesc: 'Client with that name is already exist',
  },
  FORBIDDEN: {
    errTitle: 'Access Denied. Missing Authentication Token.',
    errDesc: 'Missing Authentication Token',
    errDebugDesc: 'Client with that name is already exist',
  },
  NOT_FOUND: {
    errTitle: 'Oops! Something is wrong',
    errDesc: 'The resource you are looking for does not exist!',
    errDebugDesc: 'Client with that name is already exist',
  },
  EXTERNAL_SERVICE_FAILURE: {
    errTitle: 'External service failure',
    errDesc: 'Please try again, if problem still persist, please contact web master',
    errDebugDesc: 'External Service not responding properly',
  },
  EXTERNAL_SERVICE_INVALID_REQUEST: {
    errTitle: 'Invalid request',
    errDesc: 'Please try again, if problem still persist, please contact web master',
    errDebugDesc: 'Something happened in setting up the request that triggered an Error',
  },
  EXTERNAL_SERVICE_INVALID_RESPONSE: {
    errTitle: 'Invalid response by external service',
    errDesc: 'Please try again, if problem still persist, please contact web master',
    errDebugDesc: 'External Service not responding properly',
  },
  // db error codes
  FEED_SERVICE_DOWN: {
    errTitle: 'The server is not responding',
    errDesc: 'Oops..seems something wrong while talking to feed service',
    errDebugDesc: 'Not able to process the request',
  },
  ERROR_DATABASE_CONNECTIVITY: {
    errTitle: 'Database Connection Error!',
    errDesc: 'Seems we are not able to connect Database',
    errDebugDesc: 'Maybe wrong database information is provided',
  },
  ARTICLE_NOT_FOUND: {
    errTitle: 'Article not found',
    errDesc: 'Seems the article which you are trying to find is not available',
    errDebugDesc: 'Invalid article ID',
  },
  BREAKING_NEWS_SERVICE_DOWN: {
    errTitle: 'The server is not responding',
    errDesc: 'Oops..seems something wrong while talking to breaking news service',
    errDebugDesc: 'Not able to process the request',
  },
};
