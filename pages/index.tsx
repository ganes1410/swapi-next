import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Swapi</title>
        <meta name="description" content="An App built with swapi api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
