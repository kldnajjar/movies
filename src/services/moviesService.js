import { apiURL } from "../config.json";
import http from "./httpService";

const apiEndPoint = `${apiURL}/movies`;

async function getMovies() {
  const { data } = await http.get(apiEndPoint);
  return data;
}

async function getMovie(id) {
  const { data } = await http.get(`${apiEndPoint}/${id}`);
  return data;
}

async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return await http.put(`${apiEndPoint}/${movie._id}`, body);
  }
  await http.post(apiEndPoint, movie);
}

async function deleteMovie(id) {
  await http.delete(`${apiEndPoint}/${id}`);
}

export { getMovies, getMovie, saveMovie, deleteMovie };
