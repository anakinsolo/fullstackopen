const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../model/blog');

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

beforeEach(async () => {
  await Blog.deleteMany({});
  dummyData.forEach(async blogData => {
    let newBlog = new Blog(blogData);
    await newBlog.save();
  });
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

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  const contents = response.body.map(r => r.title);

  expect(response.body).toHaveLength(dummyData.length + 1);
  expect(contents).toContain('Heretics Of Dune');
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

  const returnedBlog = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/);

  const response = await api.get(`/api/blogs/${returnedBlog.body.id}`);

  expect(response.body.likes).toBe(0);
});

test('blog missing title and url', async () => {
  const newBlog = {
    'author': 'Frank Herbert',
  };

  await api.post('/api/blogs').send(newBlog).expect(400).expect('Content-Type', /application\/json/);
});

test('blog delete one', async () => {
  const res = await api.get('/api/blogs');
  const id = res.body[0].id;
  await api.delete(`/api/blogs/${id}`);

  const resAfterDelete = await api.get('/api/blogs');
  const result = resAfterDelete.body.filter(blog => blog.id === id);
  expect(result.length).toBe(0);
});

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