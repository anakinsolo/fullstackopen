import React, { useState } from 'react';
import BlogService from '../services/BlogService';

const BlogForm = ({ blogs, setBlogs, addSuccessMessage, addErrorMessage }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [likes, setLikes] = useState('');

  const addNewBlog = async (event) => {
    event.preventDefault();
    try {
      const data = {
        title: title,
        author: author,
        url: url,
        likes: likes
      };
      console.log(likes);
      console.log(data);
      const newBlog = await BlogService.post(data);
      setBlogs(blogs.concat(newBlog));
      addSuccessMessage('Blog Added');
    } catch (err) {
      addErrorMessage(err.message);
    }
    cleanBlogForm();
  };

  const cleanBlogForm = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
    setLikes('');
  };

  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={addNewBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input id="title" type="text" value={title} onChange={(event) => {setTitle(event.target.value);}} />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input id="author" type="text" value={author} onChange={(event) => {setAuthor(event.target.value);}} />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input id="url" type="text" value={url} onChange={(event) => {setUrl(event.target.value);}} />
        </div>
        <div>
          <label htmlFor="url">Likes:</label>
          <input id="likes" type="text" value={likes} onChange={(event) => {setLikes(event.target.value);}} />
        </div>
        <div><button type="submit">Save</button></div>
      </form>
    </div>
  );
};

export default BlogForm;