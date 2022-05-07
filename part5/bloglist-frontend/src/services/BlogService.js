import axios from 'axios';

const BASE_URL = 'http://localhost:3003/api/blogs';

const post = async (data) => {
  let res = await axios.post(BASE_URL, data);
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

export default { post, put, get, getAll, deleteById };