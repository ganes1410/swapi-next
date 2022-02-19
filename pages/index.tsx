import type { NextPage } from "next";
import Head from "next/head";
import { useFilmsListQuery } from "../lib/generated/graphql";

const Home: NextPage = () => {
  const [result] = useFilmsListQuery();

  if (result.fetching) return <p>Loading</p>;
  if (result.error) return <p>Error</p>;

  return (
    <div>
      <Head>
        <title>Swapi</title>
        <meta name="description" content="An App built with swapi api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {result.data?.allFilms?.edges?.map((film) => (
        <div key={film?.node?.id}>
          <p>{film?.node?.openingCrawl}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
