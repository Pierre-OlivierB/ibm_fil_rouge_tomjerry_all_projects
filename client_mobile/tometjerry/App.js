import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";

const PlaceholderImage = require("./assets/logo.png");
const ImageBg = require("./assets/farm.png");

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={ImageBg} style={styles.bgImage}>
        <LinearGradient
          style={styles.bgLinear}
          colors={["rgba(198, 207, 236,0.7)", "rgba(255, 236, 179,0.3)"]}
        >
          <View style={styles.textContainer}>
            <Text style={styles.textPart}>
              Bienvenue sur l'app de Tom Et Jerry
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <ImageViewer placeholderImageSource={PlaceholderImage} />
          </View>
          <View style={styles.footerContainer}>
            <Button theme="primary" label="Choose" />
            <Button label="use" />
          </View>
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
