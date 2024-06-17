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
      const toSell = await fetch("http://10.0.0.2:3001/login", {
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
      // const toSell = await fetch("http://192.168.1.111:3001/elecprod");
      const json = await toSell.json();
      //   console.log(json);
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
    // axios.post("http://localhost:3001/login", { email, pass }).then((res) => {
    //   // console.log(document.cookie);
    //   // var myCookies = getCookies();
    //   // console.log(myCookies.tokenco);

    //   console.log(res.data);
    //   if (res.data.Status === "Ok") {
    //     ToastAndroid.show(`Bonjour admin`, ToastAndroid.LONG);
    //     return navigation.navigate("Home");;
    //   }
    //   ToastAndroid.show(`Le mail et/ou le mot de passe ne sont pas valide.`, ToastAndroid.LONG)

    // });
  };

  return (
    <View>
      <Text>Identification</Text>
      <View>
        <Text>Email :</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
          />
        </SafeAreaView>

        <Text>Password :</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={setPass}
            value={pass}
          />
        </SafeAreaView>
      </View>
      <Button
        title="Connexion"
        color="hsl(0, 0%, 30%)"
        onPress={() => handleConnect()}
      />
    </View>
  );
}
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

export default Auth;
