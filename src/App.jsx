import { useState, useEffect } from "react";
import { Box, Button, Grid, GridItem, useToast } from "@chakra-ui/react";
import { createTodo, deleteTodo, editTodo, fetchTodos } from "./actions";
import ModalContainer from "./Components/ModalContainer";
import Todo from "./Components/TodosContainer";

function App() {
  const [todoForm, setTodoForm] = useState({
    id: "",
    task: "",
    description: "",
    isCompleted: false,
    isNew: true,
  });

  const [todos, setTodos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const todos = await fetchTodos();
      setTodos(todos);
    }
    fetchData();
    console.log("ran");
  }, [isFetching]);

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
      setIsFetching(true);
    } else {
      // edit todo
      console.log(todoForm);
      res = await editTodo({ task, description, isCompleted, id });
      setIsFetching(true);
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

    setTodoForm({
      task: "",
      description: "",
      isNew: true,
    });
    setIsFetching(false);
    setIsModalOpen(false);
  };

  const onDelete = async (e, id) => {
    deleteTodo(id);

    setIsFetching(true);

    setTimeout(() => {
      setIsFetching(false);
    }, 300);
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
    </>
  );
}

export default App;
