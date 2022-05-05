const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../model/user');

const dummyData = [
  {
    name: 'User 1',
    username: 'user1',
    password: 'User@1'
  },
  {
    name: 'User 2',
    username: 'user2',
    password: 'User@2'
  },
  {
    name: 'User 3',
    username: 'user3',
    password: 'User@3'
  },
];

beforeAll(async () => {
  await User.deleteMany({});
  dummyData.forEach(async userData => {
    await api
      .post('/api/users')
      .send(userData)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });
});

const api = supertest(app);

test('user: get all', async () => {
  await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/);
});

test('user: create', async () => {
  const newUserData = {
    name: 'User 4',
    username: 'user4',
    password: 'User@4'
  };

  const returnedUser = await api
    .post('/api/users').send(newUserData)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(returnedUser.body.name).toBe(newUserData.name);
  expect(returnedUser.body.username).toBe(newUserData.username);
});

test('user: get one by ID', async () => {
  const res = await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/);
  const id = res.body[0].id;

  const returnedUser = await api.get(`/api/users/${id}`).expect(200).expect('Content-Type', /application\/json/);
  expect(returnedUser.body.id).toBe(id);
});

test('user: update name', async () => {
  const res = await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/);
  const id = res.body[0].id;

  const newData = {
    name: 'User New Name'
  };

  const updatedUser = await api.put(`/api/users/${id}`).send(newData).expect(200).expect('Content-Type', /application\/json/);
  expect(updatedUser.body.name).toBe(newData.name);
});

test('user: create short username', async () => {
  const newUserData = {
    name: 'User 4',
    username: 'us',
    password: 'User@4'
  };

  const returnedUser = await api
    .post('/api/users').send(newUserData)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  expect(returnedUser.body.error).toContain('User validation failed');
});

test('user: create not unique username', async () => {
  const newUserData = {
    name: 'User 4',
    username: 'user3',
    password: 'User@4'
  };

  const returnedUser = await api
    .post('/api/users').send(newUserData)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  expect(returnedUser.body.error).toContain('username must be unique');
});

test('user: create short password', async () => {
  const newUserData = {
    name: 'User 4',
    username: 'user4',
    password: 'Us'
  };

  const returnedUser = await api
    .post('/api/users').send(newUserData)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  expect(returnedUser.body.error).toContain('Password validation failed');
});

test('user: delete one by ID', async () => {
  const res = await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/);
  const id = res.body[0].id;

  await api.delete(`/api/users/${id}`).expect(200).expect({ message: 'User deleted' });
});

afterAll(() => {
  mongoose.connection.close();
});