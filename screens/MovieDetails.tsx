import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useLayoutEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFilmDetailsQuery } from "../../lib/generated/graphql";
import Detail from "../components/Detail";
import DetailsCard from "../components/DetailsCard";
import Loader from "../components/Loader";
import { MovieStackParamsList } from "../types";

type Props = NativeStackScreenProps<MovieStackParamsList, "MovieDetails">;

function MovieDetails({ route, navigation }: Props) {
  const movieId = route.params?.movieId ?? "";
  const [result] = useFilmDetailsQuery({
    variables: { id: movieId as string },
  });

  useLayoutEffect(() => {
    navigation.setOptions({ title: result?.data?.film?.title ?? "" });
  }, [navigation, result?.data?.film?.title]);

  if (result.fetching) return <Loader loadingText="Fetching Movie Details" />;

  const filmDetails = result?.data?.film;

  return (
    <DetailsCard>
      <View style={{ flex: 1, marginBottom: 20 }}>
        <Detail heading="Director" detail={filmDetails?.director ?? ""} />
        <Detail
          heading="Release Date"
          detail={filmDetails?.releaseDate ?? ""}
        />

        <Detail heading="Opening" detail={filmDetails?.openingCrawl ?? ""} />

        <Detail heading="Characters" type="list">
          <View>
            {filmDetails?.characterConnection?.edges?.map((character) => (
              <Text key={character?.node?.id} style={styles.listItemText}>
                * {character?.node?.name}
              </Text>
            ))}
          </View>
        </Detail>

        <Detail heading="Species" type="list">
          <View>
            {filmDetails?.speciesConnection?.edges?.map((species) => (
              <Text key={species?.node?.id} style={styles.listItemText}>
                * {species?.node?.name}
              </Text>
            ))}
          </View>
        </Detail>

        <Detail heading="Planets" type="list">
          <View>
            {filmDetails?.planetConnection?.edges?.map((planet) => (
              <Text key={planet?.node?.id} style={styles.listItemText}>
                * {planet?.node?.name}
              </Text>
            ))}
          </View>
        </Detail>

        <Detail heading="Starships" type="list">
          <View>
            {filmDetails?.starshipConnection?.edges?.map((starShip) => (
              <Text key={starShip?.node?.id} style={styles.listItemText}>
                * {starShip?.node?.name}
              </Text>
            ))}
          </View>
        </Detail>
      </View>
    </DetailsCard>
  );
}

const styles = StyleSheet.create({
  listItemText: {
    fontSize: 15,
    marginBottom: 3,
  },
});

export default MovieDetails;
