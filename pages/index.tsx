import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();

  //  Initially push to the movies page
  useEffect(() => {
    router.push("/movies");
  }, [router]);

  return null;
};

export default Home;
