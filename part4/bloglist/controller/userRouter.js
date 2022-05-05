const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const UserModel = require('../model/user');

userRouter.get('/', async (request, response) => {
  const result = await UserModel.find({}).populate('blogs');

  response.json(result);
});

userRouter.get('/random', async (request, response) => {
  const result = await UserModel.findOne({});

  response.json(result);
});

userRouter.get('/:id', async (request, response) => {
  const result = await UserModel.findById(request.params.id);

  response.json(result);
});


userRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body;

  if (password.length < 3) {
    return response.status(400).json({ error: 'Password validation failed' });
  }

  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    return response.status(400).json({error: 'username must be unique'});
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new UserModel({ username, name, password: passwordHash });

  try {
    const result = await user.save();

    response.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

userRouter.delete('/:id', async (request, response, next) => {
  try {
    await UserModel.findByIdAndDelete(request.params.id);
    response.status(200).json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
});

userRouter.put('/:id', async (req, res, next) => {
  try {
    const result = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
