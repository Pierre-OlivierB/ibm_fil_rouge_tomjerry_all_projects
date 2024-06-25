import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  ToastAndroid,
} from "react-native";

function Auth({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleConnect = async () => {
    try {
      const toSell = await fetch("http://192.168.1.111:3001/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          pass: pass,
        }),
      });
      const json = await toSell.json();
      if (json.Status === "Ok") {
        ToastAndroid.show(`Bonjour admin`, ToastAndroid.LONG);
        return navigation.navigate("Home");
      }
      ToastAndroid.show(
        `Le mail et/ou le mot de passe ne sont pas valide.`,
        ToastAndroid.LONG
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tile}>
        <Text style={styles.title}>Email :</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
          />
        </SafeAreaView>

        <Text style={styles.title}>Password :</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={setPass}
            value={pass}
          />
        </SafeAreaView>
      </View>
      <View style={styles.button}>
        <Button
          title="Connexion"
          color="hsl(0, 0%, 30%)"
          onPress={() => handleConnect()}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  blank: {
    flex: 1,
  },
  tile: {
    backgroundColor: "hsla(0, 0%, 90%,0.5)",
  },
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
});

export default Auth;
