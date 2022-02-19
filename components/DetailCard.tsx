import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

function DetailCard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <Box borderWidth={0.5} borderRadius={10} p={["6", "8"]} position="relative">
      <Box
        cursor={"pointer"}
        onClick={router.back}
        position="absolute"
        top={[1, 5]}
        left={[3, 8]}
      >
        <Text fontSize="xl"> &#8592; back</Text>
      </Box>
      {children}
    </Box>
  );
}

export default DetailCard;
