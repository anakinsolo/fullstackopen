const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../model/blog');
const User = require('../model/user');

const dummyData = [
  {
    'title': 'Dune',
    'author': 'Frank Herbert',
    'url': 'https://www.adlibris.com/fi/kirja/dune-9780340960196',
    'likes': 105
  },
  {
    'title': 'Dune Messiah',
    'author': 'Frank Herbert',
    'url': 'https://www.adlibris.com/fi/kirja/dune-messiah-9781473655324',
    'likes': 100
  },
  {
    'title': 'God Emperor Of Dune',
    'author': 'Frank Herbert',
    'url': 'https://www.adlibris.com/fi/kirja/god-emperor-of-dune-9781473233805',
    'likes': 150
  }
];

beforeAll(async () => {
  await Blog.deleteMany({});
  dummyData.forEach(async blogData => {
    let newBlog = new Blog(blogData);
    await newBlog.save();
  });

  await User.deleteMany({});
  await api
    .post('/api/users')
    .send({
      name: 'User 1',
      username: 'user1',
      password: 'User@1'
    })
    .expect(201)
    .expect('Content-Type', /application\/json/);
});

const api = supertest(app);

test('blogs are returned as json', async () => {
  await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);
});

test('blogs have 3 items', async () => {
  const res = await api.get('/api/blogs');
  expect(res.body).toHaveLength(dummyData.length);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    'title': 'Heretics Of Dune',
    'author': 'Frank Herbert',
    'url': 'https://www.adlibris.com/fi/kirja/heretics-of-dune-9781473233799',
    'likes': 95
  };

  const loginRes = await api.post('/api/login')
    .send({
      name: 'User 1',
      username: 'user1',
      password: 'User@1'
    })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(loginRes.body.token).toBeDefined();

  await api
    .post('/api/blogs')
    .set('authorization', 'bearer ' + loginRes.body.token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(dummyData.length + 1);
});

test('authorized blog adding', async () => {
  const newBlog = {
    'title': 'Heretics Of Dune',
    'author': 'Frank Herbert',
    'url': 'https://www.adlibris.com/fi/kirja/heretics-of-dune-9781473233799',
    'likes': 95
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/);
});

test('blogs have ID attribute', async () => {
  const res = await api.get('/api/blogs');
  res.body.forEach(blog => {
    expect(blog.id).toBeDefined();
  });
});

test('blog missing like default to 0', async () => {
  const newBlog = {
    'title': 'Children Of Dune',
    'author': 'Frank Herbert',
    'url': 'https://www.adlibris.com/fi/kirja/children-of-dune-9781473233782',
  };

  const loginRes = await api.post('/api/login')
    .send({
      name: 'User 1',
      username: 'user1',
      password: 'User@1'
    })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(loginRes.body.token).toBeDefined();

  const returnedBlog = await api.post('/api/blogs')
    .set('authorization', 'bearer ' + loginRes.body.token)
    .send(newBlog).expect(201)
    .expect('Content-Type', /application\/json/);

  expect(returnedBlog.body.likes).toBe(0);
});

test('blog missing title and url', async () => {
  const newBlog = {
    'author': 'Frank Herbert',
  };

  const loginRes = await api.post('/api/login')
    .send({
      name: 'User 1',
      username: 'user1',
      password: 'User@1'
    })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(loginRes.body.token).toBeDefined();

  await api.post('/api/blogs')
    .send(newBlog)
    .set('authorization', 'bearer ' + loginRes.body.token)
    .expect(400)
    .expect('Content-Type', /application\/json/);
});

test('blog delete one', async () => {
  jest.setTimeout(5000);
  const loginRes = await api.post('/api/login')
    .send({
      name: 'User 1',
      username: 'user1',
      password: 'User@1'
    })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(loginRes.body.token).toBeDefined();

  const blog = await Blog.find({users: loginRes.body.id});

  const id = blog[0].id;
  
  const res = await api.delete(`/api/blogs/${id}`).set('authorization', 'bearer ' + loginRes.body.token).expect(200);
  expect(res.body.message).toBe('deleted');
}, 10000000);

test('blog update one', async () => {
  const res = await api.get('/api/blogs');
  const id = res.body[0].id;

  const updatedData = {
    'likes': 1000
  };

  const updatedBlog = await api.put(`/api/blogs/${id}`).send(updatedData).expect(200).expect('Content-Type', /application\/json/);

  expect(updatedBlog.body.likes).toBe(1000);
});

afterAll(() => {
  mongoose.connection.close();
});