import http from "./httpService";

const apiEndPoint = `/genres`;

async function getGenres() {
  const { data } = await http.get(apiEndPoint);
  return data;
}

export { getGenres };
