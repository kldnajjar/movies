import { apiURL } from "../config.json";
import http from "./httpService";

const apiEndPoint = `${apiURL}/genres`;

async function getGenres() {
  const { data } = await http.get(apiEndPoint);
  return data;
}

export { getGenres };
