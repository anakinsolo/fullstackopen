const blogRouter = require('express').Router();
const Blog = require('../model/blog');

blogRouter.get('/', async (request, response) => {
  const result = await Blog.find({});

  response.json(result);
});

blogRouter.get('/:id', async (request, response) => {
  const result = await Blog.findById(request.params.id);

  response.json(result);
});


blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);

  try {
    const result = await blog.save();

    response.status(201).json(result);
  } catch(err) {
    next(err);
  }
});

module.exports = blogRouter;
