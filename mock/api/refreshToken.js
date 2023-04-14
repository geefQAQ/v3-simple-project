const token = 'newToken';

// TODO: 本地存储token


const setLocalStorage = () => {
  return localStorage.setItem('token', token);
}

const getLocalStorage = () => {
  return localStorage.getItem('token', token);
}



export default {
  setLocalStorage,
  getLocalStorage
};