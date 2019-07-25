import { endPointurl } from "../config.json";
import http from "./httpService";

const endpoint = `${endPointurl}/movies`;

async function getMovies() {
  const { data } = await http.get(endpoint);
  return data;
}

async function getMovie(id) {
  const { data } = await http.get(`${endpoint}/${id}`);
  return data;
}

async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return await http.put(`${endpoint}/${movie._id}`, body);
  }
  await http.post(endpoint, movie);
}

async function deleteMovie(id) {
  await http.delete(`${endpoint}/${id}`);
}

export { getMovies, getMovie, saveMovie, deleteMovie };
