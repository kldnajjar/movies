import { apiURL } from "../config.json";
import http from "./httpService";

const apiendpoint = `${apiURL}/genres`;

async function getGenres() {
  const { data } = await http.get(apiendpoint);
  return data;
}

async function getAllGenres() {
  const allCategories = { _id: 0, name: "All Generes" };
  const { data } = await http.get(apiendpoint);
  data.unshift(allCategories);
  return data;
}

export { getGenres, getAllGenres };
