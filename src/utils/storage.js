// TODO: 本地存储token

export const setToken = (token) => {
  return localStorage.setItem('token', token);
}

export const getToken = () => {
  return localStorage.getItem('token');
}