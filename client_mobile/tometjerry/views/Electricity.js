import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";

function Electricity({ navigation }) {
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
        <Text style={styles.textPart}>Chart electricity</Text>
      </View>
      {/* !--------------------- */}
      {/* !--------Mettre les chiffres ici actuel------- */}
      {/* !--------------------- */}
      <View style={styles.footerContainer}>
        <Button label="use" navigation={navigation} />
      </View>
    </View>
  );
}
export default Electricity;
