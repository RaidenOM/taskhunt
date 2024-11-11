import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { TodoContext } from "../store/todo-context";
import TodoForm from "../components/todo/TodoForm";

export default function ManageTodos() {
  const navigation = useNavigation();
  const route = useRoute();

  const { todos } = useContext(TodoContext);
  const id = route.params ? route.params.id : undefined;

  // Update navigation title based on the todo being edited
  useLayoutEffect(() => {
    if (id) {
      const todo = todos.find((todo) => todo.id === id);
      if (todo) {
        navigation.setOptions({ title: todo.title });
      }
    }
  }, [id, todos, navigation]);

  return (
    <View style={styles.container}>
      {/* Directly include the TodoForm here */}
      {id ? (
        <TodoForm isEditing={true} id={id} />
      ) : (
        <TodoForm isEditing={false} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#034efc", // Light background for better contrast
    padding: 16, // Padding for the entire container
  },
});
