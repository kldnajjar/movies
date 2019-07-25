import { endPointurl } from "../config.json";
import http from "./httpService";

const endpoint = `${endPointurl}/genres`;

async function getGenres() {
  const { data } = await http.get(endpoint);
  return data;
}

async function getAllGenres() {
  const allCategories = { _id: 0, name: "All Generes" };
  const { data } = await http.get(endpoint);
  data.unshift(allCategories);
  return data;
}

export { getGenres, getAllGenres };
