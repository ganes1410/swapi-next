import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FilmsEdge, useFilmsListQuery } from "../../lib/generated/graphql";
import Loader from "../components/Loader";
import { MovieStackParamsList } from "../types";

type Props = NativeStackScreenProps<MovieStackParamsList, "MoviesList">;

function MovieItem({
  item,
  navigation,
}: {
  item: FilmsEdge["node"];
  navigation: Props["navigation"];
}) {
  return (
    <TouchableOpacity
      style={styles.movieItemContainer}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate("MovieDetails", { movieId: item?.id ?? "" })
      }
    >
      <View style={styles.movieTitleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item?.title}</Text>
        <Text style={{ fontSize: 12 }}>{item?.releaseDate}</Text>
      </View>
      <Text numberOfLines={3}>{item?.openingCrawl}</Text>
    </TouchableOpacity>
  );
}

function MoviesList({ navigation }: Props) {
  const [result] = useFilmsListQuery();

  return (
    <FlatList
      contentContainerStyle={styles.flatListContainer}
      data={result.data?.allFilms?.edges ?? []}
      renderItem={({ item }) => (
        <MovieItem item={item?.node} navigation={navigation} />
      )}
      keyExtractor={(item) => item?.node?.id as string}
      ListFooterComponent={
        <>
          {result.fetching ? (
            <Loader loadingText="Fetching Movie Details" />
          ) : null}
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  flatListContainer: { paddingHorizontal: 10, paddingVertical: 8 },
  movieItemContainer: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "lightgray",
    backgroundColor: "#fff",
    marginVertical: 6,
    flex: 1,
  },
  movieTitleContainer: {
    marginBottom: 8,
  },
});

export default MoviesList;
