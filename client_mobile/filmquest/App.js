import Home from "./vues/Home";
import Details from "./vues/Details";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import backImage from "./assets/49408_arrow_back_icon.png";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer initialRouteName="Home">
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Bienvenue",
            headerStyle: {
              backgroundColor: "#63b2f2",
            },
          }}
        />

        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: "Détails du film",
            headerStyle: {
              backgroundColor: "#f2a463",
            },
            headerTitleStyle: { color: "black" },
            headerTitleAlign: "center",
            headerTintColor: "transparent",
            headerBackImageSource: backImage,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
