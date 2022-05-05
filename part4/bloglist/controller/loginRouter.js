const router = require('express').Router();
const bcrypt = require('bcrypt');
const UserModel = require('../model/user');
const jwt = require('jsonwebtoken');

router.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await UserModel.findOne({ username });
  const isPasswordCorrect = user === null ? false : await bcrypt.compare(password, user.password);
  if (!(user && isPasswordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    });
  }

  const tokenData = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(tokenData, process.env.SECRET, {expiresIn: '1d'});

  response.status(200).json({ token, username: user.username, name: user.name });
});

module.exports = router;