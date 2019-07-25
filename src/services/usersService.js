import { apiURL } from "../config.json";
import http from "./httpService";

const apiEndPoint = `${apiURL}/users`;

export async function register(user) {
  const data = {
    email: user.username,
    password: user.password,
    name: user.name
  };

  return await http.post(apiEndPoint, data);
}
