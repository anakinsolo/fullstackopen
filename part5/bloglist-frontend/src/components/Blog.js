import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [isVisible, setIsVisible] = useState(false);

  const setFormVisibility = () => {
    setIsVisible(!isVisible);
  };

  const getBlogVisibility = (revert) => {
    if (revert) {
      return { display: isVisible ? 'none' : '' };
    }

    return { display: isVisible ? '' : 'none' };
  };

  return (
    <div className='blog'>
      <h3>{blog.title}</h3><button onClick={setFormVisibility}>view</button>
      <div style={getBlogVisibility(false)}>
        <div> Author: {blog.author} </div>
        <div> URL: {blog.url} </div>
        <div> Likes: {blog.likes} </div>
      </div>
    </div>
  );
};

export default Blog;