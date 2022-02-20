import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { FilmsEdge, useFilmsListQuery } from "../../lib/generated/graphql";
import Card from "../components/Card";
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
    <Card
      onPress={() =>
        navigation.navigate("MovieDetails", { movieId: item?.id ?? "" })
      }
    >
      <View style={styles.movieTitleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item?.title}</Text>
        <Text style={{ fontSize: 12 }}>{item?.releaseDate}</Text>
      </View>
      <Text numberOfLines={3}>{item?.openingCrawl}</Text>
    </Card>
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
  movieTitleContainer: {
    marginBottom: 8,
  },
});

export default MoviesList;
