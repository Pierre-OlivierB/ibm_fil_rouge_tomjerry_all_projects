import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import ElecSell from "../components/ElecSell";

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
      color: "#fa7e70",
      textAlign: "center",
      fontWeight: "bold",
    },
    data: {
      width: 300,
      fontSize: 50,
      color: "#fa7e70",
      textAlign: "center",
      fontWeight: "bold",
    },
    textProd: {
      flex: 2,
    },
  });
  // !------------------------------------
  // *get elec prod
  const getData = async () => {
    try {
      const response = await fetch("http://192.168.1.111:3001/elecprod");
      const json = await response.json();
      return setData(json[0].qtx_production);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState("");

  return (
    <View style={styles.textContainer}>
      <View style={styles.bgLinear}>
        <Text style={styles.textPart}>Production Tom et Jerry</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.data}>{data} KWH</Text>
      </View>
      <View style={styles.textProd}>
        <ElecSell navigation={navigation} />
      </View>

      <View style={styles.footerContainer}>
        <Button theme="primary" label="Electricity" navigation={navigation} />
      </View>
    </View>
  );
}
export default Production;
