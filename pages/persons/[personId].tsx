import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AppLoader from "../../components/AppLoader";
import Detail from "../../components/Detail";
import DetailCard from "../../components/DetailCard";
import MainPageLayout from "../../components/layouts/MainPageLayout";
import { usePeopleDetailsQuery } from "../../lib/generated/graphql";
import { isEmpty } from "lodash";

function PersonDetails() {
  const router = useRouter();
  const { personId } = router.query;
  const [result] = usePeopleDetailsQuery({
    variables: { id: personId as string },
  });

  const personDetails = result?.data?.person;

  return (
    <MainPageLayout shouldShowTabs={false}>
      <DetailCard>
        {result.fetching ? (
          <AppLoader loadingText="Fetching People Details" />
        ) : (
          <Flex direction="column" gap={2}>
            <Text fontSize="3xl" fontWeight="bold" align="center" mb="3">
              {personDetails?.name}
            </Text>
            <Flex
              gap={[2, 5]}
              alignSelf={["flex-start", "center"]}
              mb={["0", "3"]}
              direction={["column", "row"]}
            >
              <Detail
                heading="Birth Year"
                detail={personDetails?.birthYear ?? ""}
              />
              <Detail heading="Gender" detail={personDetails?.gender ?? ""} />
              <Detail
                heading="Species"
                detail={personDetails?.species?.name ?? "n/a"}
              />
              <Detail heading="Height" detail={personDetails?.height ?? ""} />
              <Detail
                heading="Home World"
                detail={personDetails?.homeworld?.name ?? ""}
              />
            </Flex>

            <Detail heading="Movies" type="list">
              <Flex flexWrap="wrap" columnGap={4} rowGap={1}>
                {personDetails?.filmConnection?.edges?.map((film) => (
                  <Text key={film?.node?.id}>{film?.node?.title}</Text>
                ))}
              </Flex>
            </Detail>

            <Detail heading="Vehicles" type="list">
              <Flex flexWrap="wrap" columnGap={4} rowGap={1}>
                {!isEmpty(personDetails?.vehicleConnection?.edges) ? (
                  personDetails?.vehicleConnection?.edges?.map((vehicle) => (
                    <Text key={vehicle?.node?.id}>{vehicle?.node?.name}</Text>
                  ))
                ) : (
                  <Text>n/a</Text>
                )}
              </Flex>
            </Detail>

            <Detail heading="Starships" type="list">
              <Flex flexWrap="wrap" columnGap={4} rowGap={1}>
                {!isEmpty(personDetails?.starshipConnection?.edges) ? (
                  personDetails?.starshipConnection?.edges?.map((startship) => (
                    <Text key={startship?.node?.id}>
                      {startship?.node?.name}
                    </Text>
                  ))
                ) : (
                  <Text>n/a</Text>
                )}
              </Flex>
            </Detail>
          </Flex>
        )}
      </DetailCard>
    </MainPageLayout>
  );
}

export default PersonDetails;
