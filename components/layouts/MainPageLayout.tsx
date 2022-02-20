import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";
import SwapiTabs from "../SwapiTabs";
import Image from "next/image";
import Head from "next/head";

interface IMainPageLayout {
  children: React.ReactNode;
  shouldShowTabs?: boolean;
  pageTitle: string;
}

function MainPageLayout({
  children,
  shouldShowTabs = true,
  pageTitle = "",
}: IMainPageLayout) {
  return (
    <Container maxW="container.lg" mb="6">
      <Head>
        <title>{pageTitle ?? "Swapi"}</title>
      </Head>
      <Flex justifyContent="center" mb={["0", "4"]}>
        <Image
          src="https://www.freepnglogos.com/uploads/star-wars-logo-31.png"
          alt=""
          width="400"
          height="250"
          objectFit="contain"
        />
      </Flex>
      {shouldShowTabs ? <SwapiTabs /> : null}
      {children}
    </Container>
  );
}

export default MainPageLayout;
