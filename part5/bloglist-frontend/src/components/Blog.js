import React, { useState } from 'react';
import BlogService from '../services/BlogService';
import { confirm } from 'react-confirm-box';
import PropTypes from 'prop-types';
import BlogSimpleInfo from './BlogSimpleInfo';
import BlogMoreInfo from './BlogMoreInfo';

const Blog = ({ blog, blogs, setBlogs }) => {
  const [likes, setLikes] = useState(blog.likes);
  const [isVisible, setIsVisible] = useState(false);

  const setFormVisibility = () => {
    setIsVisible(!isVisible);
  };

  const updateLikes = async () => {
    setLikes(likes + 1);
    try {
      await BlogService.put(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: likes + 1
      });
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
      <BlogSimpleInfo blog={blog} />
      <button onClick={setFormVisibility}>Show details</button>
      {isVisible && <BlogMoreInfo url={blog.url} likes={likes} updateLikes={updateLikes} />}
      <button onClick={deleteBlog}>Delete</button>
    </div>
  );
};

Blog.prototypes = {
  blog: PropTypes.object.isRequired
};

export default Blog;