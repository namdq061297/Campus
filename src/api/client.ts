import axios from 'axios';

const client = axios.create({
  baseURL: 'https://your-api.com/api',
  timeout: 10000,
});

client.interceptors.request.use(
  async (config) => config,
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export const loginApi = async (username: string, password: string) => {
  const res = await client.post('/auth/login', { username, password });
  return res.data; // { name, token }
};

export default client;
