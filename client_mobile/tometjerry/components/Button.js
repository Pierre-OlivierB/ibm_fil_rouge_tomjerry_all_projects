import { StyleSheet, View, Pressable, Text, ToastAndroid } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

export default function Button({ label, theme, navigation }) {
  function ShowToast() {
    ToastAndroid.show("Tout marche nikel chrome", ToastAndroid.SHORT);
  }
  if (theme === "primary") {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#406abf" }]}
          onPress={() => navigation.navigate("Electricity")}
        >
          <FontAwesome
            name="bolt"
            size={25}
            color="#fff"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: "#fff" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Production")}
      >
        <FontAwesome6
          name="tractor"
          size={25}
          color="#fff"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#fa7e70",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
