import { Container } from "@chakra-ui/react";
import React from "react";
import SwapiTabs from "../SwapiTabs";

interface IMainPageLayout {
  children: React.ReactNode;
}

function MainPageLayout({ children }: IMainPageLayout) {
  return (
    <Container maxW="container.lg" mt="20">
      <SwapiTabs />
      {children}
    </Container>
  );
}

export default MainPageLayout;
