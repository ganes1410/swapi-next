import { StyleSheet } from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useFilmsListQuery } from "../../lib/generated/graphql";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [result] = useFilmsListQuery();

  if (result.fetching) return <Text>Loading</Text>;
  return (
    <View style={styles.container}>
      {result.data?.allFilms?.edges?.map((film) => (
        <View key={film?.node?.id}>
          <Text>{film?.node?.id}</Text>
        </View>
      ))}
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
});
