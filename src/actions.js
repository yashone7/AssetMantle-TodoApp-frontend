import axios from "axios";
import axiosInstance from "./api";

const API_URL = import.meta.env.VITE_API_URL;

export async function createTodo({ task, description }) {
  try {
    // here we need to call the API to create a todo

    // const token = JSON.parse(localStorage.getItem("user"))?.token;

    const body = JSON.stringify({ task, description });

    // const { data } = await axios({
    //   method: "POST",
    //   url: `${API_URL}/api/todos`,
    //   data: body,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    const { data } = await axiosInstance({
      method: "POST",
      url: `/api/todos`,
      data: body,
    });

    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchTodos() {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/api/todos`,
    });

    // console.log(data);

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function editTodo({ task, description, isCompleted, id }) {
  try {
    const body = JSON.stringify({ task, description, isCompleted });

    // const { data } = await axios({
    //   method: "PUT",
    //   url: `${API_URL}/api/todos/${id}`,
    //   data: body,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    const { data } = await axiosInstance({
      method: "PUT",
      url: `/api/todos/${id}`,
      data: body,
    });

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteTodo(id) {
  try {
    // const { data } = await axios.delete(`${API_URL}/api/todos/${id}`);
    const { data } = await axiosInstance.delete(`/api/todos/${id}`);

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function registerUser({ name, email, password }) {
  try {
    const body = JSON.stringify({ name, email, password });
    // const { data } = await axios({
    //   method: "POST",
    //   url: `${API_URL}/api/users/register`,
    //   data: body,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    const { data } = await axiosInstance({
      method: "POST",
      url: `/api/users/register`,
      data: body,
    });

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function loginUser({ email, password }) {
  try {
    const body = JSON.stringify({ email, password });
    // const { data } = await axios({
    //   method: "POST",
    //   url: `${API_URL}/api/users/login`,
    //   data: body,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    const { data } = await axiosInstance({
      method: "POST",
      url: `/api/users/login`,
      data: body,
    });

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function verifyToken(token) {
  try {
    return await axios.post(`${API_URL}/api/user/validateToken/${token}`); // this returns a http response object
  } catch (err) {
    console.log(err);
  }
}
