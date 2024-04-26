import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import listeFilms from "../listeFilms.json";

function Details({ route }) {
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

  const theFilm = route.params.id;
  //   console.log(theFilm);
  //   console.log(listeFilms[theFilm]);
  const Film = listeFilms[theFilm - 1];
  //   console.log(Film.Ratings);
  return (
    <View style={{ ...styles.vignetteStyle }}>
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: Film.Poster }}
          style={{
            borderRadius: 4,
            marginRight: 10,
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        ></Image>
      </View>
      <View style={{ flex: 1, justifyContent: "space-evenly" }}>
        <Text
          style={{
            fontSize: 20,
            color: "#000",
            fontWeight: "bold",
            textTransfrm: "capitalize",
            alignSelf: "center",
          }}
        >
          {Film.Title} ({Film.Year})
        </Text>

        <Text
          style={{
            fontSize: 14,
            color: "#000",
            fontWeight: "bold",
            textTransfrm: "capitalize",
          }}
        >
          Résumé :
        </Text>
        <Text style={{ width: "100%" }}>{Film.Plot}</Text>

        <Text
          style={{
            fontSize: 14,
            color: "#000",
            fontWeight: "bold",
            textTransfrm: "capitalize",
          }}
        >
          Acteurs Principaux :
        </Text>
        <Text style={{ width: "100%" }}>{Film.Actors}</Text>

        <Text>
          <Text
            style={{
              fontSize: 14,
              color: "#000",
              fontWeight: "bold",
              textTransfrm: "capitalize",
            }}
          >
            Temps :
          </Text>
          <Text> {Film.Runtime}</Text>
        </Text>

        <Text
          style={{
            fontSize: 14,
            color: "#000",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          Notes :
        </Text>
        <Text style={{ width: "100%" }}>
          <FlatList
            data={Film.Ratings}
            renderItem={({ item }) => (
              <Text>
                {item.Source} : {item.Value}
              </Text>
            )}
          />
        </Text>
      </View>
    </View>
  );
}
export default Details;
