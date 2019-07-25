import { apiURL } from "../config.json";
import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndPoint = `${apiURL}/auth`;
const tokenKey = "token";

export async function login(user) {
  const data = {
    email: user.username,
    password: user.password
  };
  const { data: token } = await http.post(apiEndPoint, data);
  loginWithJwt(token);
}

function loginWithJwt(token) {
  localStorage.setItem(tokenKey, token);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    return jwtDecode(token);
  } catch (err) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser
};
