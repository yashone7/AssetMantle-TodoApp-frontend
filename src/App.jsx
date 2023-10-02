import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { createTodo, deleteTodo, editTodo, fetchTodos } from "./actions";
import ModalContainer from "./Components/ModalContainer";
import Todo from "./Components/TodosContainer";
import useSWR from "swr";
import { fetcher } from "./utils";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useBearStore } from "./store/useBearStore";

function App() {
  const [todoForm, setTodoForm] = useState({
    id: "",
    task: "",
    description: "",
    isCompleted: false,
    isNew: true,
  });

  const navigate = useNavigate();
  const { setUser, user, getUser } = useAuthStore();

  // console.log(user);

  // console.log(getUser());

  // here we are going to implement a data fetching hook called SWR
  const {
    data: todos,
    error,
    isLoading,
    mutate,
  } = useSWR(["todos", user.token], fetcher);

  // const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const todos = await fetchTodos();
  //     setTodos(todos);
  //   }
  //   fetchData();
  //   console.log("ran");
  // }, []);

  // console.log(todos);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { task, description, isNew, isCompleted, id } = todoForm;

  const toast = useToast();

  const handleChange = (e) => {
    const value =
      e.target.id === "isCompleted" ? e.target.checked : e.target.value;

    // console.log(value, e.target.id);

    // console.log({ [e.target.id]: e.target.value });
    setTodoForm({ ...todoForm, [e.target.id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(todoForm);

    let res = null;

    if (isNew) {
      res = await createTodo({ task, description });
    } else {
      // edit todo
      console.log(todoForm);
      res = await editTodo({ task, description, isCompleted, id });
    }

    if (res) {
      toast({
        title: res?.message,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }

    mutate();

    setTodoForm({
      task: "",
      description: "",
      isNew: true,
    });
    setIsModalOpen(false);
  };

  const onDelete = async (e, id) => {
    deleteTodo(id);
    mutate();
  };

  const onEdit = (e, id) => {
    const todo = todos.find((el) => el._id === id);

    // console.log(todo);

    setTodoForm({
      task: todo.task,
      isCompleted: todo.isCompleted,
      description: todo.description,
      id: todo._id,
      isNew: false,
    });

    setIsModalOpen(true);
  };

  const handleLogout = () => {
    // localStorage.removeItem("user");
    setUser({});
    navigate("/", { replace: true });
  };

  if (isLoading) {
    return (
      <Box
        height={"100vh"}
        width={"100vw"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="green.500"
          size="xl"
        />
      </Box>
    );
  }

  if (error) {
    return "error";
  }

  return (
    <>
      <Box>
        <Button onClick={() => setIsModalOpen(true)}>Create Todo</Button>
      </Box>
      <Grid gridTemplateColumns={"1fr 1fr 1fr"}>
        {todos.length > 0
          ? todos.map((todo) => {
              return (
                <GridItem key={todo._id}>
                  <Todo
                    task={todo.task}
                    description={todo.description}
                    isCompleted={todo.isCompleted}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    id={todo._id}
                  />
                </GridItem>
              );
            })
          : "list empty"}
      </Grid>
      <Box>
        <ModalContainer
          isOpen={isModalOpen}
          handleChange={handleChange}
          task={task}
          isNew={isNew}
          description={description}
          handleSubmit={handleSubmit}
          isCompleted={isCompleted}
          handleClose={() => setIsModalOpen(false)}
        />
      </Box>
      <Box>
        <Button onClick={handleLogout}>logout</Button>
      </Box>
    </>
  );
}

export default App;
