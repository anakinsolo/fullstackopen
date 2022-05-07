import axios from 'axios';

const BASE_URL = 'http://localhost:3003/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = newToken;
};

const getToken = () => {
  return `bearer ${token}`;
};

const post = async (data) => {
  const config = {
    headers: { Authorization: getToken() },
  };

  let res = await axios.post(BASE_URL, data, config);
  return res.data;
};

const put = async (id, data) => {
  let res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

const get = async (id) => {
  let res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

const getAll = async () => {
  let res = await axios.get(BASE_URL);
  return res.data;
};

const deleteById = (id) => {
  let res = axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};

export default { post, put, get, getAll, deleteById, setToken, getToken };