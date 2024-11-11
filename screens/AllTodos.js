import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TodoContext } from "../store/todo-context";
import { FlatList } from "react-native-gesture-handler";
import TodoListItem from "../components/todo/TodoListItem";

export default function AllTodos() {
  const { todos, fetchTodo } = useContext(TodoContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchTodo();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {todos.length === 0 ? (
        <View style={styles.noTodoInfoContainer}>
          <Text style={styles.noTodoInfoText}>
            No Todos! Add some by clicking the '+' icon
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.label}>Todos</Text>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <TodoListItem
                title={item.title}
                id={item.id}
                isChecked={item.isChecked}
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false} // Hide the vertical scroll indicator for cleaner look
            contentContainerStyle={styles.listContainer} // Add padding to the FlatList
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
    backgroundColor: "#034efc", // Deep blue background
  },
  label: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "white", // White color for contrast
    marginBottom: 20, // Space below the title
  },
  listContainer: {
    paddingBottom: 100, // Extra space at the bottom for scrolling
  },
  noTodoInfoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noTodoInfoText: {
    color: "white",
    fontWeight: "bold",
  },
});
