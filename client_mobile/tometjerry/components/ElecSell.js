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

const ElecSell = ({ navigation }) => {
  const [text, onChangeText] = React.useState("");
  const showToast = () => {
    navigation.navigate("Home");
    ToastAndroid.show(`Vous avez vendu : ${text}`, ToastAndroid.LONG);
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
          keyboardType="numeric"
        />
      </SafeAreaView>
      <View>
        <Button
          title="Valider"
          color="hsl(0, 0%, 30%)"
          onPress={() => showToast()}
        />
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
