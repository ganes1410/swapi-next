import React from "react";
import { View, StyleSheet } from "react-native";

interface IDetailsCard {
  children: React.ReactNode;
}

function DetailsCard({ children }: IDetailsCard) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "lightgray",
    backgroundColor: "#fff",
    flex: 1,
  },
});

export default DetailsCard;
