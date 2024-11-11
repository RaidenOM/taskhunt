import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TodoContext } from "../../store/todo-context";

export default function TodoListItem({ title, id, isChecked }) {
  const navigation = useNavigation();
  const { toggleIsChecked } = useContext(TodoContext);

  return (
    <View style={styles.outerContainer}>
      <Pressable
        android_ripple={{ color: "#d3d3d3" }} // Ripple effect for Android
        style={({ pressed }) => [
          styles.container,
          pressed ? styles.pressed : null, // Change style on press
        ]}
        onPress={() => {
          navigation.navigate("ManageTodos", { id });
        }}
      >
        <Text style={[styles.title, isChecked && styles.ticked]}>{title}</Text>
        <Pressable
          android_ripple={{ color: "#ccc" }}
          onPress={() => {
            toggleIsChecked(id);
          }}
        >
          <View
            style={[styles.checkBox, isChecked && { backgroundColor: "green" }]}
          >
            {isChecked && <Ionicons name="checkmark" color="white" size={25} />}
          </View>
        </Pressable>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    overflow: "hidden", // Ensure ripple stays within bounds
    borderRadius: 12, // Rounded corners
    marginVertical: 8, // Space between items
  },
  container: {
    backgroundColor: "#ffffff", // White background for the item
    padding: 16, // Padding inside the container
    elevation: 4, // Shadow effect on Android
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.5, // Decrease opacity when pressed
  },
  title: {
    fontSize: 18, // Larger font size
    fontWeight: "bold", // Bold text
    color: "#333", // Dark text color
  },
  checkBox: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  ticked: {
    textDecorationLine: "line-through",
    color: "#a6a4a4",
  },
});
