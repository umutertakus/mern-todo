import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../utils/api";
import { useGlobal } from "../context/GlobalContext";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ITodos } from "../types/interfaces";

const Container = styled.div`
  width: 600px;
`;

const Input = styled.input`
  height: 30px;
  width: calc(100% - 30px);
  border-radius: 8px;
  outline: none;
  border: 1px solid lightgray;
  padding: 0px 15px;
  margin-top: 16px;
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

  const [todos, setTodos] = useState<ITodos[]>([]);

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
      const updatedTodos: any = [];
      response.data.forEach((todo: any) => {
        const { _id, ...rest } = todo;
        updatedTodos.push({
          todoId: _id,
          ...rest,
        });
      });
      getFilteredTodos(updatedTodos);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [selectedTab]);

  return (
    <Container ref={animationParent}>
      {todos.map((todo: ITodos, index: number) => (
        <Input key={index} value={todo.content} />
      ))}
    </Container>
  );
};

export default TaskList;
