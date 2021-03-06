import { useEffect, useState } from 'react';
import BlogForm from './components/BlogForm';
import Login from './components/Login';
import Logout from './components/Logout';
import Mypage from './components/Mypage';
import ErrorMessage from './components/ErrorMessage';
import SuccessMessage from './components/SuccessMessage';
import BlogService from './services/BlogService';
import Togglable from './components/Togglable';

function App() {
  const [name, setName] = useState('');
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [sucMsg, setSucMsg] = useState('');
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const data = window.localStorage.getItem('auth');
    if (data) {
      const token = JSON.parse(data);
      setIsLoggedIn(true);
      BlogService.setToken(token);
    }

    const storedName = window.localStorage.getItem('name');
    if (storedName) {
      setName(JSON.parse(storedName));
    }
  }, []);

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await BlogService.getAll();
      blogs.sort((a, b) => {
        if (a.likes > b.likes) {
          return 1;
        }

        if (a.likes < b.likes) {
          return -1;
        }

        if (a.likes === b.likes) {
          return 0;
        }
      });
      setBlogs(blogs);
    };
    getBlogs();
  }, []);



  const logout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('auth');
    setIsLoggedIn(false);
  };

  const addSuccessMessage = (msg) => {
    setSucMsg(msg);
    setTimeout(() => {
      setSucMsg(null);
    }, 5000);
  };

  const addErrorMessage = (msg) => {
    setErrMsg(msg);
    setTimeout(() => {
      setErrMsg(null);
    }, 5000);
  };

  if (isLoggedin) {
    return (
      <div className='App'>
        <div>
          <Logout logout={logout} />
        </div>
        {errMsg && <ErrorMessage msg={errMsg} />}
        {sucMsg && <SuccessMessage msg={sucMsg} />}
        <div>
          <Mypage name={name} blogs={blogs} setBlogs={setBlogs} />
        </div>
        <Togglable>
          <BlogForm blogs={blogs} setBlogs={setBlogs} addSuccessMessage={addSuccessMessage} addErrorMessage={addErrorMessage}/>
        </Togglable>
      </div>
    );
  }

  return (
    <div className="App">
      {errMsg && <ErrorMessage msg={errMsg} />}
      {sucMsg && <SuccessMessage msg={sucMsg} />}
      <div>
        <Login isLoggedin={isLoggedin} setIsLoggedIn={setIsLoggedIn} setName={setName} addSuccessMessage={addSuccessMessage} addErrorMessage={addErrorMessage} />
      </div>
    </div>
  );
}

export default App;
