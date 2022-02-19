import { Container } from "@chakra-ui/react";
import React from "react";
import SwapiTabs from "../SwapiTabs";

interface IMainPageLayout {
  children: React.ReactNode;
  shouldShowTabs?: boolean;
}

function MainPageLayout({ children, shouldShowTabs = true }: IMainPageLayout) {
  return (
    <Container maxW="container.lg" my="20">
      {shouldShowTabs ? <SwapiTabs /> : null}
      {children}
    </Container>
  );
}

export default MainPageLayout;
