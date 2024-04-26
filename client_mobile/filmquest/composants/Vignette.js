import { View, Image, StyleSheet, Text, Button } from "react-native";

function Vignette(item) {
  const styles = StyleSheet.create({
    vignetteStyle: {
      height: 190,
      backgroundColor: "#e5e5e9",
      borderRadius: 15,
      elevation: 8,
      flexDirection: "row",
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 10,
      paddingBottom: 10,
      marginTop: 6,
      marginBottom: 6,
      marginLeft: 16,
      marginRight: 16,
    },
  });
  const Film = item.film;
  const navigation = item.navigation;

  return (
    <View style={{ ...styles.vignetteStyle }}>
      <View>
        <Image
          source={{ uri: Film.Poster }}
          resizeMode="contain"
          style={{ borderRadius: 15, height: "100%", width: 150 }}
        ></Image>
      </View>
      <View style={{ marginLeft: 12, flex: 1, justifyContent: "space-evenly" }}>
        <Text
          style={{
            fontSize: 14,
            color: "#000",
            fontWeight: "bold",
            textTransfrm: "capitalize",
            textAlign: "center",
          }}
        >
          {Film.Title} ({Film.Year})
        </Text>
        <Button
          style={{ marginTop: 12 }}
          onPress={() => navigation.navigate("Details", { id: Film.id })}
          title="Détails"
        />
      </View>
    </View>
  );
}

export default Vignette;
