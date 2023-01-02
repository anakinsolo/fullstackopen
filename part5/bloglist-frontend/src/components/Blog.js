import React, { useState } from 'react';
import BlogService from '../services/BlogService';
import { confirm } from 'react-confirm-box';
import PropTypes from 'prop-types';

const Blog = ({ blog, blogs, setBlogs }) => {
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
    const result = await confirm('Are you sure you want to delete this blog?');
    if (result) {
      try {
        await BlogService.deleteById(blog.id);
        const filteredBlogs = blogs.filter((b) => b.id !== blog.id);
        setBlogs(filteredBlogs);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className='blog'>
      <h3>{blog.title}</h3><button onClick={setFormVisibility}>view</button>
      <div style={getBlogVisibility(false)}>
        <div> {blog.author} </div>
        <div> {blog.url} </div>
        <div> {likes} <button onClick={updateLikes}>like this book</button></div>
        <button onClick={deleteBlog}>Delete</button>
      </div>
    </div>
  );
};

Blog.prototypes = {
  blog: PropTypes.object.isRequired
};

export default Blog;