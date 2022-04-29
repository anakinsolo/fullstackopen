const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is 0', () => {
    const blogs = [];
  
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });

  test('when list has only one blog, equal to the likes of that', () => {
    const blogs = [{'likes': 10}];
  
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(10);
  });

  test('of a bigger list is calculated right', () => {
    const blogs = [{'likes': 10}, {'likes': 20}];
  
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(30);
  });
});
