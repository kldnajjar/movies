import { endpoint, moviesRoute } from "../config.json";
import http from "./httpService";

async function getMovies() {
  const { data } = await http.get(`${endpoint}${moviesRoute}`);
  return data;
}

async function getMovie(id) {
  const { data } = await http.get(`${endpoint}${moviesRoute}/${id}`);
  return data;
}

async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return await http.put(`${endpoint}${moviesRoute}/${movie._id}`, body);
  }
  await http.post(`${endpoint}${moviesRoute}`, movie);
}

async function deleteMovie(id) {
  await http.delete(`${endpoint}${moviesRoute}/${id}`);
}

export { getMovies, getMovie, saveMovie, deleteMovie };
