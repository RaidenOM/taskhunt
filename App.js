import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AllTodos from "./screens/AllTodos";
import ManageTodos from "./screens/ManageTodos";
import { TodoContextProvider } from "./store/todo-context";
import IconButton from "./components/ui/IconButton";

const Stack = createStackNavigator();

export default function App() {
  return (
    <TodoContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#002f9e" },
          }}
        >
          <Stack.Screen
            name="AllTodos"
            component={AllTodos}
            options={({ navigation }) => ({
              headerRight: ({ tintColor }) => (
                <IconButton
                  name="add"
                  size={24}
                  color={tintColor}
                  onPress={() => {
                    navigation.navigate("ManageTodos");
                  }}
                />
              ),
              title: "TaskHunt",
            })}
          />
          <Stack.Screen name="ManageTodos" component={ManageTodos} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="inverted" />
    </TodoContextProvider>
  );
}
