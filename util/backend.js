import AsyncStorage from "@react-native-async-storage/async-storage";

export async function fetchTodosFromBackend() {
  try {
    const jsonValue = await AsyncStorage.getItem("todos");
    const todos = jsonValue ? JSON.parse(jsonValue) : [];
    return todos;
  } catch (error) {
    console.log("Failed to fetch todos.", error);
    return [];
  }
}

export async function addTodoToBackend(title, description) {
  try {
    const id = new Date().toString() + Math.random().toString();
    const todo = { id, title, description, isChecked: false };
    const existingTodos = await fetchTodosFromBackend();
    const updatedTodos = [...existingTodos, todo];
    const jsonValue = JSON.stringify(updatedTodos);
    await AsyncStorage.setItem("todos", jsonValue);
    return todo;
  } catch (error) {
    console.log("Error adding todo.", error);
  }
}

export async function deleteTodoFromBackend(id) {
  try {
    const todos = await fetchTodosFromBackend();
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    const jsonValue = JSON.stringify(updatedTodos);
    await AsyncStorage.setItem("todos", jsonValue);
  } catch (error) {
    console.log("Error deleting todo.", error);
  }
}

export async function updateTodoInBackend(id, title, description) {
  try {
    const todos = await fetchTodosFromBackend();
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title, description } : todo
    );
    const jsonValue = JSON.stringify(updatedTodos);
    await AsyncStorage.setItem("todos", jsonValue);
  } catch (error) {
    console.log("Error deleting todo.", error);
  }
}

export async function toggleIsCheckedBackend(id) {
  try {
    const todos = await fetchTodosFromBackend();
    const updatedTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
    );
    const jsonValue = JSON.stringify(updatedTodo);
    await AsyncStorage.setItem("todos", jsonValue);
  } catch (error) {
    console.log("Error toggling isChecked.", error);
  }
}
