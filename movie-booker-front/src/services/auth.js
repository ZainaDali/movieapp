import { jwtDecode } from 'jwt-decode';


export const saveToken = (token) => {
  localStorage.setItem('jwt_token', token);
};

export const getToken = () => {
  return localStorage.getItem('jwt_token');
};

export const getUser = () => {
  const token = getToken();
  return token ? jwtDecode(token) : null;
};

export const logout = () => {
  localStorage.removeItem('jwt_token');
};
