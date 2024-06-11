import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import ImageViewer from "../components/ImageViewer";
import Button from "../components/Button";

const PlaceholderImage = require("../assets/logo.png");

function Home({ route }) {
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
  return (
    <View style={styles.textContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.textPart}>Bienvenue sur l'app de Tom Et Jerry</Text>
      </View>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose" />
        <Button label="use" />
      </View>
    </View>
  );
}

export default Home;
