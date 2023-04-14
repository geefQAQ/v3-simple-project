export const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, value);
}

export const getLocalStorage = (key) => {
  return localStorage.getItem(key);
}

export const clearLocalStorage = (key) => {
  return localStorage.removeItem(key);
}