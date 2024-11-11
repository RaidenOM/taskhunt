import React, { useState, useEffect } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { TodoContext } from "../../store/todo-context";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../ui/CustomButton";

export default function TodoForm({ isEditing, id }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { todos, addTodo, updateTodo, deleteTodo } = useContext(TodoContext);
  const navigation = useNavigation();

  // Load todo data for editing
  useEffect(() => {
    if (isEditing && id) {
      const todo = todos.find((todo) => todo.id === id);
      if (todo) {
        setTitle(todo.title);
        setDescription(todo.description);
      }
    }
  }, [isEditing, id, todos]);

  const confirmHandler = () => {
    if (title.trim()) {
      if (isEditing) {
        updateTodo(id, title, description);
      } else {
        addTodo(title, description);
      }
      navigation.goBack();
    }
  };

  const deleteHandler = () => {
    deleteTodo(id);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter todo title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#888" // Placeholder color
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter todo description"
          value={description}
          onChangeText={setDescription}
          placeholderTextColor="#888" // Placeholder color
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Cancel"
          onPress={cancelHandler}
          style={[styles.cancelButton, styles.button]}
        />
        <CustomButton
          title={isEditing ? "Update" : "Add"}
          onPress={confirmHandler}
          style={styles.button}
        />
        {isEditing && (
          <CustomButton
            title="Delete"
            onPress={deleteHandler}
            style={[styles.deleteButton, styles.button]}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff", // White background for contrast
    borderRadius: 12, // More rounded corners for a modern look
    elevation: 4, // Slightly stronger shadow effect
    marginVertical: 16, // Space above and below the form
    borderWidth: 1, // Border width for a defined edge
    borderColor: "#e0e0e0", // Light gray border color
  },
  inputContainer: {
    marginBottom: 16, // Space between input fields
  },
  label: {
    fontSize: 16, // Font size for labels
    color: "#333", // Dark gray color for the label text
    marginBottom: 4, // Space between label and input field
  },
  input: {
    height: 50, // Increased height for better touch target
    borderColor: "#ccc", // Border color for inputs
    borderWidth: 1, // Border width for inputs
    borderRadius: 8, // Rounded corners for inputs
    paddingHorizontal: 16, // Padding inside the inputs
    fontSize: 16, // Increased font size for readability
    backgroundColor: "white",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d", // Red background for delete button
  },
  cancelButton: {
    backgroundColor: "#737373", // Gray background for cancel button
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Space between buttons
    marginTop: 16, // Space above buttons
  },
  button: {
    minWidth: 90, // Minimum width for buttons
  },
});
