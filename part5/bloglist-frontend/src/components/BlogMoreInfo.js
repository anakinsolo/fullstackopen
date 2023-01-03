import React from 'react';

const BlogMoreInfo = ({ url, likes, updateLikes }) => {
  return(
    <div className='more-info-container'>
      <div className='info-container-child'> {url} </div>
      <div className='info-container-child'> {likes} <button onClick={updateLikes}>Like this book</button></div>
    </div>
  );
};

export default BlogMoreInfo;