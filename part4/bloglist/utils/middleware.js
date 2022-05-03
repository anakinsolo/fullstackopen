const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info(request.method, request.path, request.body);
  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  if (error.message.includes('E11000 duplicate key error collection')) {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = { requestLogger, errorHandler };