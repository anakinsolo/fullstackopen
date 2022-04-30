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

test('blogs have 2 items', async () => {
  const res = await api.get('/api/blogs');
  expect(res.body).toHaveLength(dummyData.length);
});

afterAll(() => {
  mongoose.connection.close();
});