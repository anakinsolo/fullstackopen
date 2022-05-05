const logger = require('./logger');
const jwt = require('jsonwebtoken');

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

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    });
  }

  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    });
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (!authorization) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    req.token = token;
  }

  next();
};

const userExtractor = (req, res, next) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  req.user = decodedToken.id;

  next();
};

module.exports = { requestLogger, errorHandler, tokenExtractor, userExtractor };