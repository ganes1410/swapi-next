import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { isEmpty } from "lodash";
import React, { useLayoutEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { usePeopleDetailsQuery } from "../../lib/generated/graphql";
import Detail from "../components/Detail";
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

  const personDetails = result?.data?.person;

  return (
    <DetailsCard>
      <View style={{ flexDirection: "column" }}>
        <Detail heading="Birth Year" detail={personDetails?.birthYear ?? ""} />
        <Detail heading="Gender" detail={personDetails?.gender ?? ""} />
        <Detail
          heading="Species"
          detail={personDetails?.species?.name ?? "n/a"}
        />
        <Detail heading="Height" detail={personDetails?.height ?? ""} />
        <Detail
          heading="Home World"
          detail={personDetails?.homeworld?.name ?? ""}
        />

        <Detail heading="Movies" type="list">
          <View>
            {personDetails?.filmConnection?.edges?.map((film) => (
              <Text key={film?.node?.id} style={styles.listItemText}>
                * {film?.node?.title}
              </Text>
            ))}
          </View>
        </Detail>

        <Detail heading="Vehicles" type="list">
          <View>
            {!isEmpty(personDetails?.vehicleConnection?.edges) ? (
              personDetails?.vehicleConnection?.edges?.map((vehicle) => (
                <Text key={vehicle?.node?.id} style={styles.listItemText}>
                  * {vehicle?.node?.name}
                </Text>
              ))
            ) : (
              <Text>n/a</Text>
            )}
          </View>
        </Detail>

        <Detail heading="Starships" type="list">
          <View>
            {!isEmpty(personDetails?.starshipConnection?.edges) ? (
              personDetails?.starshipConnection?.edges?.map((startship) => (
                <Text key={startship?.node?.id} style={styles.listItemText}>
                  * {startship?.node?.name}
                </Text>
              ))
            ) : (
              <Text>n/a</Text>
            )}
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

export default PeopleDetails;
