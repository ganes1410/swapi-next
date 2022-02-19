import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import AppLoader from "../../components/AppLoader";
import Card from "../../components/Card";
import MainPageLayout from "../../components/layouts/MainPageLayout";
import { useFilmsListQuery } from "../../lib/generated/graphql";

function MoviesList() {
  const [result] = useFilmsListQuery();

  if (result.error) return <p>Error</p>;

  return (
    <MainPageLayout>
      {result.fetching ? (
        <AppLoader loadingText="Fetching Movies " />
      ) : (
        <SimpleGrid columns={[1, 2]} gap={8}>
          {result.data?.allFilms?.edges?.map((film) => (
            <Card key={film?.node?.id} to={`/movies/${film?.node?.id}`}>
              <Box mb="4">
                <Text fontSize="larger" fontWeight="bold">
                  {film?.node?.title}
                </Text>
                <Text fontSize="xs">{film?.node?.releaseDate}</Text>
              </Box>
              <Text fontSize="sm" lineHeight={1.5}>
                {film?.node?.openingCrawl}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </MainPageLayout>
  );
}

export default MoviesList;
