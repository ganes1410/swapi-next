import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

interface ICard {
  onPress: () => void;
  children: React.ReactNode;
}

function Card({ onPress, children }: ICard) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "lightgray",
    backgroundColor: "#fff",
    marginVertical: 6,
    flex: 1,
  },
});

export default Card;
