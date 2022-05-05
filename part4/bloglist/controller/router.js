const blogRouter = require('express').Router();
const Blog = require('../model/blog');
const UserModel = require('../model/user');

blogRouter.get('/', async (request, response) => {
  const result = await Blog.find({users: {_id: request.user}}).populate('users');

  response.json(result);
});

blogRouter.get('/:id', async (request, response) => {
  const result = await Blog.findById(request.params.id);

  response.json(result);
});


blogRouter.post('/', async (request, response, next) => {
  const data = request.body;

  const user = await UserModel.findById(request.user);
  
  const blog = new Blog({
    title: data.title,
    author: data.author,
    url: data.url,
    users: user._id
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
    const user = await UserModel.findById(request.user);
    const result = await Blog.findById(request.params.id);
    if (user.id === result.users.toString()) {
      result.delete();
      return response.status(200).send('deleted');
    }
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
