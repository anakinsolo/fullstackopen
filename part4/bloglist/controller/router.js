const blogRouter = require('express').Router();
const Blog = require('../model/blog');
const UserModel = require('../model/user');

blogRouter.get('/', async (request, response) => {
  const result = await Blog.find({}).populate('users');

  response.json(result);
});

blogRouter.get('/:id', async (request, response) => {
  const result = await Blog.findById(request.params.id);

  response.json(result);
});


blogRouter.post('/', async (request, response, next) => {
  const data = request.body;

  const user = await UserModel.findOne({});
  
  const blog = new Blog({
    title: data.title,
    author: data.author,
    url: data.url,
    users: user.id
  });

  try {
    const result = await blog.save();
    user.blogs = user.blogs.concat(result.id);
    await user.save();
    response.status(201).json(result);
  } catch(err) {
    next(err);
  }
});

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const result = await Blog.findByIdAndDelete(request.params.id);

    response.status(200).json(result);
  } catch(err) {
    next(err);
  }
});

blogRouter.put('/:id', async (req, res, next) => {

  try {
    const result = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = blogRouter;
