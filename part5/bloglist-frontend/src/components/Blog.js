import React, { useState } from 'react';
import BlogService from '../services/BlogService';

const Blog = ({ blog }) => {
  const [likes, setLikes] = useState(blog.likes);
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

  const updateLikes = async () => {
    try {
      const updatedBlog = await BlogService.put(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: likes + 1
      });

      setLikes(updatedBlog.likes);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBlog = async () => {
    try {
      console.log('asdada');
      await BlogService.deleteById(blog.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='blog'>
      <h3>{blog.title}</h3><button onClick={setFormVisibility}>view</button>
      <div style={getBlogVisibility(false)}>
        <div> Author: {blog.author} </div>
        <div> URL: {blog.url} </div>
        <div> Likes: {likes} <button onClick={updateLikes}>like this book</button></div>
        <button onClick={deleteBlog}>Delete</button>
      </div>
    </div>
  );
};

export default Blog;