import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function createTodo({ task, description }) {
  try {
    // here we need to call the API to create a todo

    const body = JSON.stringify({ task, description });

    const { data } = await axios({
      method: "POST",
      url: `${API_URL}/todos`,
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
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
      url: `${API_URL}/todos`,
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

    const { data } = await axios({
      method: "PUT",
      url: `${API_URL}/todos/${id}`,
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteTodo(id) {
  try {
    const { data } = await axios.delete(`${API_URL}/todos/${id}`);

    return data;
  } catch (err) {
    console.log(err);
  }
}
