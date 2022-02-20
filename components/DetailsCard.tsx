import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

interface IDetailsCard {
  children: React.ReactNode;
}

function DetailsCard({ children }: IDetailsCard) {
  return <ScrollView style={styles.container}>{children}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
});

export default DetailsCard;
