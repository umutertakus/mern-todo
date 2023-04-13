import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../utils/api";
import { useGlobal } from "../context/GlobalContext";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ITodos } from "../types/interfaces";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "react-toastify";
import { changeMongoIds } from "../utils/helpers.js";

const Container = styled.div`
  width: 600px;
`;

const AddInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding-top: 8px;
`;

const AddInput = styled.input`
  height: 50px;
  width: calc(65% - 30px);
  border-radius: 8px;
  outline: none;
  border: 1px solid lightgray;
  padding: 0px 15px;
  font-size: 24px;
  &:focus {
    outline: 1px solid whitesmoke;
    box-shadow: 5px 5px 10px rgba(186, 191, 222, 0.2);
  }
`;

const TasksContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding-top: 16px;
`;

interface IButtonProps {
  bgColor: string;
  isDisabled?: boolean;
  height?: string;
}

const Button = styled.button<IButtonProps>`
  height: ${(props) => props.height || "50px"};
  flex: 1;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => props.bgColor};
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    opacity: ${(props) => (props.isDisabled ? 1 : 0.9)};
  }
  &:active {
    opacity: ${(props) => (props.isDisabled ? 1 : 0.7)};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

const TodoInput = styled.input`
  height: 30px;
  width: calc(85% - 30px);
  border-radius: 8px;
  outline: none;
  border: 1px solid lightgray;
  padding: 0px 15px;
  font-size: 16px;
  &:focus {
    outline: 1px solid black;
    box-shadow: 5px 5px 10px rgba(186, 191, 222, 0.2);
  }
`;

interface Props {
  selectedTab: number;
}

const TaskList: FC<Props> = ({ selectedTab }) => {
  const { userId } = useGlobal();
  const [animationParent] = useAutoAnimate();
  const { showToast } = useToast();

  const [todos, setTodos] = useState<ITodos[]>([]);
  const [currentTodo, setCurrentTodo] = useState<string>("");

  const getFilteredTodos = (updatedTodos: any): void => {
    if (selectedTab === 1) {
      setTodos(updatedTodos);
    } else if (selectedTab === 2) {
      const filteredTodos = updatedTodos.filter(
        (todo: any) => todo.completed === false
      );
      setTodos(filteredTodos);
    } else {
      const filteredTodos = updatedTodos.filter(
        (todo: any) => todo.completed === true
      );
      setTodos(filteredTodos);
    }
  };

  const fetchTodos = async (): Promise<void> => {
    try {
      const response = await api.get(`/todo/getTodos/${userId}`);
      const updatedTodos = changeMongoIds(response.data, "todoId");
      getFilteredTodos(updatedTodos);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async (): Promise<void> => {
    if (currentTodo !== "") {
      try {
        const requestBody = {
          content: currentTodo,
          completed: false,
          owner: userId,
        };
        const response = await api.post("/todo/addTodo", requestBody);
        const updatedTodo: any = changeMongoIds(response.data, "todoId");
        setTodos((prev) => [...prev, ...updatedTodo]);
        setCurrentTodo("");
      } catch (err) {
        console.error(err);
      }
    } else {
      showToast("Task field cannot be empty.", "error");
    }
  };

  const updateTodo = async (index: number): Promise<void> => {
    if (todos[index].content !== "") {
      try {
        const requestBody = {
          todoId: todos[index].todoId,
          content: todos[index].content,
          completed: todos[index].completed,
        };
        const response = await api.put("/todo/updateTodo", requestBody);
        const updatedTodo: any = changeMongoIds(response.data, "todoId");
        const newTodos = todos;
        newTodos[index] = updatedTodo[0];
        getFilteredTodos(newTodos);
        showToast("Task updated successfully.", "success");
      } catch (err) {
        console.error(err);
      }
    } else {
      showToast("Task field cannot be empty.", "error");
    }
  };

  const handleCurrentTodoChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setCurrentTodo(event.target.value);
  };

  const clearCurrentTodo = (): void => {
    setCurrentTodo("");
  };

  const handleTodoChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const newTodos = [...todos];
    newTodos[index].content = event.target.value;
    setTodos(newTodos);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (event.key === "Enter") {
      updateTodo(index);
    }
  };

  const deleteTodo = async (todoId: string): Promise<void> => {
    try {
      const response = await api.delete(`/todo/deleteTodo/${todoId}`);
      setTodos((prev) => prev.filter((todo) => todo.todoId !== response.data));
      showToast("Task deleted successfully.", "success");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [selectedTab]);

  return (
    <Container ref={animationParent}>
      <AddInputContainer>
        <AddInput value={currentTodo} onChange={handleCurrentTodoChange} />
        <Button bgColor="#6d6f05" onClick={addTodo}>
          Add
        </Button>
        <Button bgColor="#d31111" onClick={clearCurrentTodo}>
          Clear
        </Button>
      </AddInputContainer>
      {todos.map((todo: ITodos, index: number) => (
        <TasksContainer>
          <TodoInput
            key={todo.todoId}
            value={todo.content}
            onChange={(event) => handleTodoChange(event, index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          />
          <Button
            bgColor="#d31111"
            height="30px"
            onClick={() => deleteTodo(todo.todoId)}
          >
            Delete
          </Button>
        </TasksContainer>
      ))}
      <ToastContainer />
    </Container>
  );
};

export default TaskList;
