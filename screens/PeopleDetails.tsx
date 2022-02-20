import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useLayoutEffect } from "react";
import { Text } from "react-native";
import { usePeopleDetailsQuery } from "../../lib/generated/graphql";
import DetailsCard from "../components/DetailsCard";
import Loader from "../components/Loader";
import { PeopleStackParamsList } from "../types";

type Props = NativeStackScreenProps<PeopleStackParamsList, "PeopleDetails">;

function PeopleDetails({ route, navigation }: Props) {
  const peopleId = route.params?.peopleId ?? "";
  const [result] = usePeopleDetailsQuery({
    variables: { id: peopleId as string },
  });

  useLayoutEffect(() => {
    navigation.setOptions({ title: result?.data?.person?.name ?? "" });
  }, [navigation, result?.data?.person?.name]);

  if (result.fetching) return <Loader loadingText="Fetching People Details" />;

  return (
    <DetailsCard>
      <Text>{result.data?.person?.name}</Text>
    </DetailsCard>
  );
}

export default PeopleDetails;
