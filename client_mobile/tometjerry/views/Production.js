import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import Button from "../components/Button";

function Production({ navigation }) {
  const styles = StyleSheet.create({
    textContainer: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    bgLinear: {
      flex: 1,
    },
    footerContainer: {
      flex: 1,
      alignItems: "end",
      alignItems: "center",
      justifyContent: "center",
    },
    textPart: {
      width: 300,
      fontSize: 25,
      color: "#406abf",
      textAlign: "center",
      fontWeight: "bold",
    },
  });
  //   console.log(route);

  return (
    <View style={styles.textContainer}>
      <View style={styles.bgLinear}>
        <Text style={styles.textPart}>Chart Production</Text>
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose" navigation={navigation} />
      </View>
    </View>
  );
}
export default Production;
