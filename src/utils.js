import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetcher = ([key, token]) =>
  axios
    .get(`${API_URL}/api/${key}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
