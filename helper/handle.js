const { BAD_REQUEST, OK } = require('http-status-codes');

exports.handleError = (res, message) => {
  return res.status(BAD_REQUEST).json({
    requestAt: new Date().toISOString(),
    status: 'fail',
    ...message
  });
};

exports.handleSuccess = (res, data) => {
  return res.status(OK).json({
    requestAt: new Date().toISOString(),
    status: 'success',
    ...data
  });
};
