import type { AppProps } from "next/app";
import { Provider } from "urql";
import { apiClient } from "../lib/api/apiClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={apiClient}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
