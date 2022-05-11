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
      {blog.title} <button onClick={setFormVisibility}>view</button>
      <div style={getBlogVisibility(false)}>
        <div> {blog.author} </div>
        <div> {blog.url} </div>
        <div> {blog.likes} </div>
      </div>
    </div>
  );
};

export default Blog;