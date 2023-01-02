import React from 'react';

const BlogMoreInfo = ({ blog, updateLikes }) => {
  return(
    <div className='more-info-container'>
      <div className='info-container-child'> {blog.url} </div>
      <div className='info-container-child'> {blog.likes} <button onClick={updateLikes}>Like this book</button></div>
    </div>
  );
};

export default BlogMoreInfo;