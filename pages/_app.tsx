import type { AppProps } from "next/app";
import { Provider } from "urql";
import { apiClient } from "../lib/api/apiClient";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={apiClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
