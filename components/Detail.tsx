import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface IDetails {
  heading: string;
  detail?: string;
  type?: "text" | "list";
  children?: React.ReactNode;
}

function Detail({
  heading = "",
  detail,
  type = "text",
  children = null,
}: IDetails) {
  return (
    <Box>
      <Text fontWeight="bold">{heading}</Text>
      {type === "text" ? <Text lineHeight={1.6}>{detail}</Text> : children}
    </Box>
  );
}
export default Detail;
