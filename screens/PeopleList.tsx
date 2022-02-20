import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import { PeopleEdge, usePeopleListQuery } from "../../lib/generated/graphql";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { PeopleStackParamsList } from "../types";

type Props = NativeStackScreenProps<PeopleStackParamsList, "PeopleList">;

function PeopleItem({
  navigation,
  item,
}: {
  navigation: Props["navigation"];
  item: PeopleEdge["node"];
}) {
  return (
    <Card
      onPress={() =>
        navigation.navigate("PeopleDetails", { peopleId: item?.id ?? "" })
      }
    >
      <View style={styles.movieTitleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item?.name}</Text>
        <Text style={{ fontSize: 12 }}>{item?.birthYear}</Text>
        <Text style={{ fontSize: 12 }}>{item?.gender}</Text>
        <Text style={{ fontSize: 12 }}>{item?.height}</Text>
      </View>
    </Card>
  );
}

function PeopleList({ navigation }: Props) {
  const [result] = usePeopleListQuery({ variables: { first: 12 } });

  return (
    <FlatList
      contentContainerStyle={styles.flatListContainer}
      data={result.data?.allPeople?.edges ?? []}
      renderItem={({ item }) => (
        <PeopleItem item={item?.node} navigation={navigation} />
      )}
      keyExtractor={(item) => item?.node?.id as string}
      ListFooterComponent={
        <>
          {result.fetching ? (
            <Loader loadingText="Fetching People List" />
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

export default PeopleList;
