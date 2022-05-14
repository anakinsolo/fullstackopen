import React from 'react';
import Blog from './Blog';

const Mypage = ({ name, blogs, setBlogs }) => {

  return (
    <div>
      <h2>Blogs</h2>
      <h3>
        Hello {name}
      </h3>
      <div>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />)}
      </div>
    </div>
  );
};

export default Mypage;