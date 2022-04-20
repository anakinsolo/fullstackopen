import axios from "axios";

const BASE_URL = 'http://localhost:3001/persons';

const post = (data) => {
  let request = axios.post(BASE_URL, data);
  return request.then(res => res.data);
}

const put = (id, data) => {
  let request = axios.get(`${BASE_URL}/${id}`, data);
  return request.then(res => res.data);
}

const get = (id) => {
  let request = axios.get(`${BASE_URL}/${id}`);
  return request.then(response => response.data);
}

const getAll = () => {
  let request = axios.get(BASE_URL);
  return request.then(response => response.data);
}

const deleteById = (id) => {
  let request = axios.delete(`${BASE_URL}/${id}`);
  return request.then(res => res.data);
}

export default { post, put, get, getAll, deleteById };