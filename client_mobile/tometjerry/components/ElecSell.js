import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  ToastAndroid,
} from "react-native";
import DataElec from "../assets/data_elec.json";
import isASell from "./controllers/isASell";

const ElecSell = ({ navigation }) => {
  // *récup prix du moment
  const elecsell = DataElec.elec[0].data;
  const [data, setData] = React.useState("");

  // *récup qttx à vendre
  const [text, onChangeText] = React.useState("");

  // *post qtt et prix associé
  const showToast = async () => {
    if (!isASell(text)) {
      return ToastAndroid.show(
        `La valeur renseignée n'est pas du bon format`,
        ToastAndroid.LONG
      );
    }

    try {
      const toSell = await fetch("http://192.168.1.111:3001/elecmoove", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qtx_elec: -text,
          price: elecsell,
        }),
      });
      const json = await toSell.json();
      console.log(json);
      navigation.navigate("Home");
      ToastAndroid.show(
        `Vous avez vendu : ${text}KWH pour ${elecsell}€/KWH `,
        ToastAndroid.LONG
      );
      return setData(json[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.tile}>
      <Text style={styles.title}>
        Combien d'électricité voulez-vous vendre ?
      </Text>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="00.00"
          maxLength={5}
          keyboardType="numeric"
        />
      </SafeAreaView>
      <View>
        <Button title="Valider" color="hsl(0, 0%, 30%)" onPress={showToast} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 25,
    backgroundColor: "hsl(0, 0%, 90%)",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "hsl(0, 0%, 90%)",
  },
  tile: {
    flex: 1,
    width: 400,
    backgroundColor: "hsl(0, 0%, 90%)",
  },
});

export default ElecSell;
