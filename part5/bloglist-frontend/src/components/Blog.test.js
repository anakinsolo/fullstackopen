import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('Test render title and author', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test author',
    url: 'https://test_url',
    likes: 1
  };

  render(<Blog blog={blog} />);
  const title = screen.getByText('Test Blog');
  const author = screen.getByText('Test author');
  expect(title).toBeDefined();
  expect(author).toBeDefined();
});

test('Test render more info after user clicks', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test author',
    url: 'https://test_url',
    likes: 1
  };

  render(<Blog blog={blog} />);
  const user = userEvent.setup();
  const button = screen.getByText('Show details');
  await user.click(button);
  const url = screen.getByText('https://test_url');
  const likes = screen.getByText('1');
  expect(url).toBeDefined();
  expect(likes).toBeDefined();
});