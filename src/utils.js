import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetcher = (key) =>
  axios.get(`${API_URL}/${key}`).then((res) => res.data);
