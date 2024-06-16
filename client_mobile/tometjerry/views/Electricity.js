import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import DataElec from "../assets/data_elec.json";
import ElecSell from "../components/ElecSell";

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
    data: {
      width: 300,
      fontSize: 50,
      color: "#406abf",
      textAlign: "center",
      fontWeight: "bold",
    },
    textElec: {
      flex: 2,
    },
  });
  //   console.log(route);
  // !------------------------------------
  // *get elec vente
  // console.log(DataElec);
  const elecsell = DataElec.elec[0].data;

  return (
    <View style={styles.textContainer}>
      <View style={styles.bgLinear}>
        <Text style={styles.textPart}>Marché électricité - France</Text>
      </View>
      {/* !--------------------- */}
      {/* !--------Mettre les chiffres ici actuel------- */}
      {/* !--------------------- */}
      <View style={styles.textContainer}>
        <Text style={styles.data}>{elecsell} KWH</Text>
      </View>
      <View style={styles.textElec}>
        <ElecSell navigation={navigation} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Production" navigation={navigation} />
      </View>
    </View>
  );
}
export default Electricity;
