const { BAD_REQUEST, OK } = require('http-status-codes');

exports.handleError = (res, error) => {
  return res.status(BAD_REQUEST).json(error);
};

exports.handleSuccess = (res, data) => {
  return res.status(OK).json(data);
};
