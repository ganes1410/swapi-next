import { Box, Flex, Text } from "@chakra-ui/react";
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
  return (
    <Flex direction={direction} gap={1}>
      <Text fontWeight="bold">{heading}</Text>
      {type === "text" ? <Text lineHeight={1.6}>{detail}</Text> : children}
    </Flex>
  );
}
export default Detail;
