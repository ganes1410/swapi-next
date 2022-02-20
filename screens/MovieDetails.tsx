import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { useFilmDetailsQuery } from "../../lib/generated/graphql";
import Loader from "../components/Loader";
import { MovieStackParamsList } from "../types";

type Props = NativeStackScreenProps<MovieStackParamsList, "MovieDetails">;

function MovieDetails({ route, navigation }: Props) {
  const movieId = route.params?.movieId ?? "";
  const [result] = useFilmDetailsQuery({
    variables: { id: movieId as string },
  });

  useEffect(() => {
    navigation.setOptions({ title: result?.data?.film?.title ?? "" });
  }, [navigation, result?.data?.film?.title]);

  if (result.fetching) return <Loader loadingText="Fetching Movie Details" />;

  const filmDetails = result?.data?.film;

  return <Text>{filmDetails?.title}</Text>;
}

export default MovieDetails;
