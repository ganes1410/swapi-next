import type { NextPage } from "next";
import Head from "next/head";
import { useFilmsListQuery } from "../lib/generated/graphql";
import { Box } from "@chakra-ui/react";

const Home: NextPage = () => {
  const [result] = useFilmsListQuery();

  if (result.fetching) return <p>Loading</p>;
  if (result.error) return <p>Error</p>;

  return (
    <Box>
      <Head>
        <title>Swapi</title>
        <meta name="description" content="An App built with swapi api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        {result.data?.allFilms?.edges?.map((film) => (
          <Box key={film?.node?.id} mt="2">
            <p>{film?.node?.openingCrawl}</p>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
