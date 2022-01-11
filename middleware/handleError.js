const { GeneralError, ForbiddenError } = require('../utilities/error');

const handleErrors = (err, req, res, next) => {
  if (err instanceof ForbiddenError) {
    return res.status(err.getCode()).json({
      status: 'error',
      message: err.message,
    });
  }
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: err.message,
  });
};

module.exports = handleErrors;
