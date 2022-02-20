import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import AppLoader from "../../components/AppLoader";
import Card from "../../components/Card";
import Detail from "../../components/Detail";
import MainPageLayout from "../../components/layouts/MainPageLayout";
import { usePeopleListQuery } from "../../lib/generated/graphql";

function PersonList() {
  const [result] = usePeopleListQuery();

  return (
    <MainPageLayout>
      {result.fetching ? (
        <AppLoader loadingText="Fetching Movies " />
      ) : (
        <SimpleGrid columns={[1, 2, 4]} gap={4}>
          {result.data?.allPeople?.edges?.map((people) => (
            <Card key={people?.node?.id} to={`/persons/${people?.node?.id}`}>
              <Text fontSize="larger" fontWeight="bold">
                {people?.node?.name}
              </Text>
              <Box mt="2" fontSize="small">
                <Detail
                  heading="Birth Year"
                  detail={people?.node?.birthYear ?? ""}
                  direction="row"
                />
                <Detail
                  heading="Gender"
                  detail={people?.node?.gender ?? ""}
                  direction="row"
                />
                <Detail
                  heading="Height"
                  detail={people?.node?.height ?? ""}
                  direction="row"
                />
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </MainPageLayout>
  );
}

export default PersonList;
