import { Box, SimpleGrid, Text, Spinner, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AppLoader from "../../components/AppLoader";
import Card from "../../components/Card";
import Detail from "../../components/Detail";
import MainPageLayout from "../../components/layouts/MainPageLayout";
import { uniqBy } from "lodash";
import { PeopleEdge, usePeopleListQuery } from "../../lib/generated/graphql";

function PersonList() {
  const [peopleList, setPeopleList] = useState<PeopleEdge[]>([]);
  const [endCursor, setEndCursor] = useState("");
  const [result, fetchPeople] = usePeopleListQuery({
    pause: true,
    variables: { first: 12, after: endCursor },
  });

  useEffect(() => {
    fetchPeople({ variables: { after: endCursor } });
  }, [endCursor, fetchPeople]);

  useEffect(() => {
    if (result && !result.fetching) {
      const peopleEdges = result.data?.allPeople?.edges as PeopleEdge[];
      if (peopleList?.length > 0) {
        const allPeople = [...peopleList, ...(peopleEdges ?? [])];
        const uniquePeople = uniqBy(allPeople, "node.name");

        setPeopleList(uniquePeople);
      } else {
        setPeopleList(peopleEdges);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <MainPageLayout pageTitle="People List">
      {result.fetching && (!peopleList || peopleList?.length === 0) ? (
        <AppLoader loadingText="Fetching People" />
      ) : (
        <SimpleGrid columns={[1, 2, 4]} gap={4}>
          {peopleList?.map((people) => (
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

      {/* Show more button */}
      {result.data?.allPeople?.pageInfo.hasNextPage && !result.fetching ? (
        <Text
          cursor="pointer"
          fontSize="md"
          textDecoration="underline"
          align="center"
          mt="3"
          onClick={() =>
            setEndCursor(result.data?.allPeople?.pageInfo.endCursor ?? "")
          }
        >
          Show More
        </Text>
      ) : null}

      {/* Show Spinnr when getting paginated data */}
      {result.fetching && peopleList?.length ? (
        <Flex alignItems="center" justifyContent="center" mt="4">
          <Spinner />
        </Flex>
      ) : null}
    </MainPageLayout>
  );
}

export default PersonList;
