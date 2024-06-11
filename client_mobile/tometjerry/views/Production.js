import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";

function Production({ route }) {
  const styles = StyleSheet.create({
    vignetteStyle: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#e5e5e9",
      borderRadius: 15,
      elevation: 8,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 20,
      paddingBottom: 10,
      marginTop: 6,
      marginBottom: 6,
      marginLeft: 16,
      marginRight: 16,
    },
  });
  //   console.log(route);

  return <View style={{ ...styles.vignetteStyle }}></View>;
}
export default Production;
