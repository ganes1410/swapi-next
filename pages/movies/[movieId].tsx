import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AppLoader from "../../components/AppLoader";
import DetailCard from "../../components/DetailCard";
import MainPageLayout from "../../components/layouts/MainPageLayout";
import { useFilmDetailsQuery } from "../../lib/generated/graphql";

interface IDetails {
  heading: string;
  details?: string;
  type?: "text" | "list";
  children?: React.ReactNode;
}

function Details({
  heading = "",
  details,
  type = "text",
  children = null,
}: IDetails) {
  return (
    <Box>
      <Text fontWeight="bold">{heading}</Text>
      {type === "text" ? <Text lineHeight={1.6}>{details}</Text> : children}
    </Box>
  );
}

function MovieDetails() {
  const router = useRouter();
  const { movieId } = router.query;
  const [result] = useFilmDetailsQuery({
    variables: { id: movieId as string },
  });

  const filmDetails = result?.data?.film;

  return (
    <MainPageLayout shouldShowTabs={false}>
      <DetailCard>
        {result.fetching ? (
          <AppLoader loadingText="Fetching Movie Details" />
        ) : (
          <Flex direction="column" gap={3}>
            <Text fontSize="3xl" fontWeight="bold" align="center" mb="3">
              {filmDetails?.title}
            </Text>

            <Details heading="Director" details={filmDetails?.director ?? ""} />
            <Details
              heading="Release Date"
              details={filmDetails?.releaseDate ?? ""}
            />

            <Details
              heading="Opening"
              details={filmDetails?.openingCrawl ?? ""}
            />

            <Details heading="Characters" type="list">
              <Flex flexWrap="wrap" columnGap={4} rowGap={1}>
                {filmDetails?.characterConnection?.edges?.map((character) => (
                  <Text key={character?.node?.id}>{character?.node?.name}</Text>
                ))}
              </Flex>
            </Details>

            <Details heading="Species" type="list">
              <Flex flexWrap="wrap" columnGap={4} rowGap={1}>
                {filmDetails?.speciesConnection?.edges?.map((species) => (
                  <Text key={species?.node?.id}>{species?.node?.name}</Text>
                ))}
              </Flex>
            </Details>

            <Details heading="Planets" type="list">
              <Flex flexWrap="wrap" columnGap={4} rowGap={1}>
                {filmDetails?.planetConnection?.edges?.map((planet) => (
                  <Text key={planet?.node?.id}>{planet?.node?.name}</Text>
                ))}
              </Flex>
            </Details>

            <Details heading="Starships" type="list">
              <Flex flexWrap="wrap" columnGap={4} rowGap={1}>
                {filmDetails?.starshipConnection?.edges?.map((starShip) => (
                  <Text key={starShip?.node?.id}>{starShip?.node?.name}</Text>
                ))}
              </Flex>
            </Details>
          </Flex>
        )}
      </DetailCard>
    </MainPageLayout>
  );
}

export default MovieDetails;
