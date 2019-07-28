import jwtDecode from "jwt-decode";

import http from "./httpService";

const apiEndPoint = `/auth`;
const tokenKey = "token";

http.setToken(getToken());

export async function login(user) {
  const data = {
    email: user.username,
    password: user.password
  };
  const { data: token } = await http.post(apiEndPoint, data);
  setToken(token);
}

function setToken(token) {
  localStorage.setItem(tokenKey, token);
}

export function getCurrentUser() {
  try {
    const token = getToken();
    return jwtDecode(token);
  } catch (err) {
    return null;
  }
}

export function getToken() {
  return localStorage.getItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export default {
  login,
  setToken,
  logout,
  getCurrentUser,
  getToken
};
