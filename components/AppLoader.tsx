import { Text, CircularProgress, Flex } from "@chakra-ui/react";

function AppLoader({ loadingText }: { loadingText?: string }) {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="200px"
    >
      <CircularProgress isIndeterminate color="green.300" mb="5" />

      <Text fontSize="md">{loadingText ?? "Loading"}</Text>
    </Flex>
  );
}

export default AppLoader;
