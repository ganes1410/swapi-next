import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

function Loader({ loadingText }: { loadingText: string }) {
  return (
    <View style={loaderStyles.loaderContainer}>
      <ActivityIndicator size="large" color="green" />
      <View style={loaderStyles.loaderSpacer} />
      <Text style={loaderStyles.loaderText}>{loadingText}</Text>
    </View>
  );
}

const loaderStyles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  loaderSpacer: { marginVertical: 2 },
  loaderText: { fontSize: 16 },
});

export default Loader;
