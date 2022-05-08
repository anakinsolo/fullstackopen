import React from 'react';

const BlogForm = ({ title, author, url, addNewBlog, onInputValueChange }) => {
  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={addNewBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input id="title" type="text" value={title} onChange={onInputValueChange} />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input id="author" type="text" value={author} onChange={onInputValueChange} />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input id="url" type="text" value={url} onChange={onInputValueChange} />
        </div>
        <div><button type="submit">Save</button></div>
      </form>
    </div>
  );
};

export default BlogForm;