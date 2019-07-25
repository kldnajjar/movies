import { endpoint, genresRoute } from "../config.json";
import http from "./httpService";

async function getGenres() {
  const { data } = await http.get(`${endpoint}${genresRoute}`);
  return data;
}

async function getAllGenres() {
  const allCategories = { _id: 0, name: "All Generes" };
  const { data } = await http.get(`${endpoint}${genresRoute}`);
  data.unshift(allCategories);
  return data;
}

export { getGenres, getAllGenres };
