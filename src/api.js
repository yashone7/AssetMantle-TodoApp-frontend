import axios from "axios";

const authStore = JSON.parse(localStorage.getItem("auth-store"));

const token = authStore?.state?.user?.token;

const API_URL = import.meta.env.VITE_API_URL;

// Create an instance of Axios with default configuration
const axiosInstance = axios.create({
  baseURL: API_URL, // Replace with your API base URL
  headers: {
    Authorization: `Bearer ${token}`, // Set your access token here
    "Content-Type": "application/json", // You can add other headers as needed
  },
});

export default axiosInstance;
