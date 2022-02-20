import { Tabs, Tab, TabList, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

const tabs = [
  { label: "Movies", key: "movies", index: 0 },
  { label: "People", key: "persons", index: 1 },
];

function SwapiTabs() {
  const router = useRouter();

  const currentIndex =
    tabs.findIndex((tabItem) => router.route.includes(tabItem.key)) ?? 0;

  return (
    <Box mb="10">
      <Tabs variant="unstyled" isFitted isManual index={currentIndex} isLazy>
        <TabList>
          {tabs.map((tab) => (
            <Tab
              _selected={{
                color: "white",
                bgColor: "green.400",
                borderRadius: "50",
                fontWeight: "bold",
              }}
              fontSize="xl"
              key={tab.key}
              onClick={() => {
                router.push(tab.key);
              }}
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>
      </Tabs>
    </Box>
  );
}

export default SwapiTabs;
