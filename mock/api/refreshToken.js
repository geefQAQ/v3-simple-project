const token = 'newToken';

// TODO: 本地存储token


const setToken = () => {
  return localStorage.setItem('token', token);
}

const getToken = () => {
  return localStorage.getItem('token', token);
}



export default {
  setToken,
  getToken
};