import client from "./client";

export const loginApi = async (username: string, password: string) => {
  const res = await client.post('/auth/login', { username, password });
  return res.data; // { name, token }
};
