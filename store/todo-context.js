import { createContext, useEffect, useState } from "react";
import {
  addTodoToBackend,
  deleteTodoFromBackend,
  fetchTodosFromBackend,
  toggleIsCheckedBackend,
  updateTodoInBackend,
} from "../util/backend";
import LoadingOverlay from "../components/ui/LoadingOverlay";

export const TodoContext = createContext();

export function TodoContextProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchTodo() {
    const todos = await fetchTodosFromBackend();
    setTodos(todos.reverse());
    setLoading(false);
  }

  async function addTodo(title, description) {
    setLoading(true);
    await addTodoToBackend(title, description);
    setLoading(false);
  }

  async function deleteTodo(id) {
    setLoading(true);
    await deleteTodoFromBackend(id);
    setLoading(false);
  }

  async function updateTodo(id, title, description) {
    setLoading(true);
    await updateTodoInBackend(id, title, description);
    setLoading(false);
  }

  async function toggleIsChecked(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
    await toggleIsCheckedBackend(id);
  }

  if (loading) {
    return <LoadingOverlay style={{ backgroundColor: "#034efc" }} />;
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        updateTodo,
        fetchTodo,
        toggleIsChecked,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
