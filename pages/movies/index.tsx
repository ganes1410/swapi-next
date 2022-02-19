import { Box, Text } from "@chakra-ui/react";
import MainPageLayout from "../../components/layouts/MainPageLayout";
import SwapiTabs from "../../components/SwapiTabs";
import { useFilmsListQuery } from "../../lib/generated/graphql";

function MoviesList() {
  const [result] = useFilmsListQuery();

  if (result.fetching) return <p>Loading</p>;
  if (result.error) return <p>Error</p>;

  return (
    <MainPageLayout>
      <Box>
        {result.data?.allFilms?.edges?.map((film) => (
          <Box key={film?.node?.id} mt="2">
            <p>{film?.node?.openingCrawl}</p>
          </Box>
        ))}
      </Box>
    </MainPageLayout>
  );
}

export default MoviesList;
