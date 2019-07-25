import { apiURL } from "../config.json";
import http from "./httpService";

const apiendpoint = `${apiURL}/movies`;

async function getMovies() {
  const { data } = await http.get(apiendpoint);
  return data;
}

async function getMovie(id) {
  const { data } = await http.get(`${apiendpoint}/${id}`);
  return data;
}

async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return await http.put(`${apiendpoint}/${movie._id}`, body);
  }
  await http.post(apiendpoint, movie);
}

async function deleteMovie(id) {
  await http.delete(`${apiendpoint}/${id}`);
}

export { getMovies, getMovie, saveMovie, deleteMovie };
