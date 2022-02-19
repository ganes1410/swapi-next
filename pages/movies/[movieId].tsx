import { Text } from "@chakra-ui/react";
import MainPageLayout from "../../components/layouts/MainPageLayout";

function MovieDetails() {
  return (
    <MainPageLayout shouldShowTabs={false}>
      <Text>Details Page</Text>
    </MainPageLayout>
  );
}

export default MovieDetails;
