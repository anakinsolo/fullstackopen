import React, { useEffect, useState } from 'react';
import Blog from './Blog';

const Mypage = ({ name, blogservice }) => {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogservice.getAll();
      setBlogs(blogs);
    };
    getBlogs();
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      <div>
        Hello {name}
      </div>
      <div>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    </div>
  );
};

export default Mypage;