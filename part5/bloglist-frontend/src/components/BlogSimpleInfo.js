import React from 'react';

const BlogSimpleInfo = ({ blog }) => {
  return(
    <div className='info-container'>
      <div className='info-container-child'><h3>{blog.title}</h3></div>
      <div className='info-container-child'>-</div>
      <div className='info-container-child'> {blog.author} </div>
    </div>
  );
};

export default BlogSimpleInfo;