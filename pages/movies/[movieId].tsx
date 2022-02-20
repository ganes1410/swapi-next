import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AppLoader from "../../components/AppLoader";
import Detail from "../../components/Detail";
import DetailCard from "../../components/DetailCard";
import MainPageLayout from "../../components/layouts/MainPageLayout";
import { useFilmDetailsQuery } from "../../lib/generated/graphql";

function MovieDetails() {
  const router = useRouter();
  const { movieId } = router.query;
  const [result] = useFilmDetailsQuery({
    variables: { id: movieId as string },
  });

  const filmDetails = result?.data?.film;

  return (
    <MainPageLayout
      shouldShowTabs={false}
      pageTitle={result.data?.film?.title ?? ""}
    >
      <DetailCard>
        {result.fetching ? (
          <AppLoader loadingText="Fetching Movie Details" />
        ) : (
          <Flex direction="column" gap={3}>
            <Text fontSize="3xl" fontWeight="bold" align="center" mb="3">
              {filmDetails?.title}
            </Text>

            <Detail heading="Director" detail={filmDetails?.director ?? ""} />
            <Detail
              heading="Release Date"
              detail={filmDetails?.releaseDate ?? ""}
            />

            <Detail
              heading="Opening"
              detail={filmDetails?.openingCrawl ?? ""}
            />

            <Detail heading="Characters" type="list">
              <Flex flexWrap="wrap" columnGap={4} rowGap={1}>
                {filmDetails?.characterConnection?.edges?.map((character) => (
                  <Text key={character?.node?.id}>{character?.node?.name}</Text>
                ))}
              </Flex>
            </Detail>

            <Detail heading="Species" type="list">
              <Flex flexWrap="wrap" columnGap={4} rowGap={1}>
                {filmDetails?.speciesConnection?.edges?.map((species) => (
                  <Text key={species?.node?.id}>{species?.node?.name}</Text>
                ))}
              </Flex>
            </Detail>

            <Detail heading="Planets" type="list">
              <Flex flexWrap="wrap" columnGap={4} rowGap={1}>
                {filmDetails?.planetConnection?.edges?.map((planet) => (
                  <Text key={planet?.node?.id}>{planet?.node?.name}</Text>
                ))}
              </Flex>
            </Detail>

            <Detail heading="Starships" type="list">
              <Flex flexWrap="wrap" columnGap={4} rowGap={1}>
                {filmDetails?.starshipConnection?.edges?.map((starShip) => (
                  <Text key={starShip?.node?.id}>{starShip?.node?.name}</Text>
                ))}
              </Flex>
            </Detail>
          </Flex>
        )}
      </DetailCard>
    </MainPageLayout>
  );
}

export default MovieDetails;
