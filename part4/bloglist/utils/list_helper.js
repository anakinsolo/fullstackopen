// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  // ...
  return 1;
};

const totalLikes = (blogs) => {
  const sum = (acc, a) => {
    return acc + a.likes;
  };

  let total = blogs.reduce(sum, 0);
  return total;
};

module.exports = {
  dummy,
  totalLikes
};