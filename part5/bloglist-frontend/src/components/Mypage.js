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
      <h2>Blogs</h2>
      <h3>
        Hello {name}
      </h3>
      <div>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    </div>
  );
};

export default Mypage;