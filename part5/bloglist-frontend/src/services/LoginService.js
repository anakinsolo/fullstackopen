import axios from 'axios';

const BASE_URL = 'http://localhost:3003/api/login';

const login = async (data) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

export default { login };