import { View, Text } from "react-native";
import React from "react";

interface IDetails {
  heading: string;
  detail?: string | number;
  type?: "text" | "list";
  children?: React.ReactNode;
  direction?: "row" | "column";
}

/**
 * Individual Detail Item
 */

function Detail({
  heading = "",
  detail,
  type = "text",
  children = null,
  direction = "column",
}: IDetails) {
  const isRow = direction === "row";
  return (
    <View
      style={{
        flexDirection: direction,
        marginBottom: 8,
        alignItems: isRow ? "center" : "flex-start",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: isRow ? 14 : 16 }}>
        {heading}
      </Text>
      <View style={{ marginVertical: 1, marginHorizontal: 2 }} />
      {type === "text" ? (
        <Text style={{ fontSize: isRow ? 13 : 15, lineHeight: 20 }}>
          {detail}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}
export default Detail;
