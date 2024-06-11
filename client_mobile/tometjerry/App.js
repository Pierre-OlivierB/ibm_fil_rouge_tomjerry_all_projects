import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ImageBg = require("./assets/farm.png");

import Home from "./views/Home";
import Production from "./views/Production";
import Electricity from "./views/Electricity";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
// import backImage from "./assets/49408_arrow_back_icon.png";

export default function App() {
  const Stack = createNativeStackNavigator();

  // TODO :https://stackoverflow.com/questions/54599305/how-to-set-background-image-with-react-native-and-react-navigation

  return (
    <View style={styles.container}>
      <ImageBackground source={ImageBg} style={styles.bgImage}>
        <LinearGradient
          style={styles.bgLinear}
          colors={["rgba(198, 207, 236,0.7)", "rgba(255, 236, 179,0.3)"]}
        >
          <NavigationContainer
            initialRouteName="Home"
            theme={{
              ...DefaultTheme,
              colors: { ...DefaultTheme.colors, background: "transparent" },
            }}
          >
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
                name="Production"
                component={Production}
                options={{
                  title: "Production",
                }}
              />

              <Stack.Screen
                name="Electricity"
                component={Electricity}
                options={{
                  title: "Electricity",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "#406abf",
    flex: 1,
    backgroundColor: "#fff",
  },
  bgLinear: {
    flex: 1,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  textPart: {
    width: 300,
    fontSize: 25,
    color: "#406abf",
    textAlign: "center",
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 2,
    paddingTop: 58,
    justifyContent: "center",
    alignItems: "center",
  },
  footerContainer: {
    flex: 1,
    alignItems: "end",
    alignItems: "center",
    justifyContent: "center",
  },
  bgImage: {
    flex: 1,
    resizeMode: "stretch",
  },
});
