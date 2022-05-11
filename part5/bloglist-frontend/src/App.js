import { useEffect, useState } from 'react';
import BlogForm from './components/BlogForm';
import Login from './components/Login';
import Logout from './components/Logout';
import Mypage from './components/Mypage';
import ErrorMessage from './components/ErrorMessage';
import SuccessMessage from './components/SuccessMessage';
import BlogService from './services/BlogService';
import LoginService from './services/LoginService';
import Togglable from './components/Togglable';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [sucMsg, setSucMsg] = useState('');

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

  const onInputValueChange = (event) => {
    const input = event.target;
    const value = input.value;
    switch (input.id) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'title':
        setTitle(value);
        break;
      case 'author':
        setAuthor(value);
        break;
      case 'url':
        setUrl(value);
        break;
    }
  };

  const login = async (event) => {
    event.preventDefault();
    if (!isLoggedin) {
      try {
        const res = await LoginService.login({
          username: username,
          password: password
        });

        window.localStorage.setItem('auth', JSON.stringify(res.token));
        window.localStorage.setItem('name', JSON.stringify(res.name));
        setIsLoggedIn(true);
        setName(res.name);
        cleanLoginForm();
        BlogService.setToken(res.token);
        addSuccessMessage('Blog Added');
      } catch (err) {
        addErrorMessage(err.message);
      }
    }
  };

  const cleanLoginForm = () => {
    setUsername('');
    setPassword('');
  };

  const logout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('auth');
    setIsLoggedIn(false);
  };

  const addNewBlog = async (event) => {
    event.preventDefault();
    try {
      await BlogService.post({
        title: title,
        author: author,
        url: url
      });
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
          <Mypage name={name} blogservice={BlogService} logout={logout} />
        </div>
        <Togglable>
          <BlogForm title={title} author={author} url={url} addNewBlog={addNewBlog} onInputValueChange={onInputValueChange} />
        </Togglable>
      </div>
    );
  }

  return (
    <div className="App">
      {errMsg && <ErrorMessage msg={errMsg} />}
      {sucMsg && <SuccessMessage msg={sucMsg} />}
      <div>
        <Login onButtonClick={login} username={username} password={password} onInputValueChange={onInputValueChange} />
      </div>
    </div>
  );
}

export default App;
