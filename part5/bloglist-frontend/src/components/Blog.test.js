import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test author'
  };

  render(<Blog blog={blog} />);
  const title = screen.getByText('Test Blog');
  const author = screen.getByText('Test author');
  expect(title).toBeDefined();
  expect(author).toBeDefined();
});