import { Pressable, StyleSheet, View, Text } from "react-native";

export default function CustomButton({ title, onPress, style }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "#ccc" }} // Ripple effect color
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.pressed : null, // Optional: Change style when pressed
          style,
        ]}
      >
        <Text style={styles.buttonText}>{title.toUpperCase()}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 8, // Space between buttons
    borderRadius: 8, // Rounded corners for the container
    overflow: "hidden", // Clip overflow to keep ripple inside
  },
  button: {
    paddingVertical: 12, // Increased vertical padding
    paddingHorizontal: 16, // Padding for horizontal space
    backgroundColor: "#03bafc", // Button color
    elevation: 2, // Shadow effect for Android
  },
  pressed: {
    opacity: 0.5, // Optional: change opacity on press
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold", // Bold text for emphasis
    fontSize: 16, // Increased font size for better readability
  },
});
