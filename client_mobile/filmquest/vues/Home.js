import React from "react";
import { View } from "react-native";
import listeFilms from "../listeFilms.json";
import { FlatList } from "react-native";
import Vignette from "../composants/Vignette";

function Home({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={listeFilms}
        renderItem={({ item }) => (
          <Vignette navigation={navigation} film={item} />
        )}
      />
    </View>
  );
}
export default Home;
