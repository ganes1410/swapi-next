import { Tabs, Tab, TabList } from "@chakra-ui/react";
import { useRouter } from "next/router";

const tabs = [
  { label: "Movies", key: "movies", index: 0 },
  { label: "People", key: "persons", index: 1 },
  { label: "Planets", key: "planets", index: 2 },
];

function SwapiTabs() {
  const router = useRouter();

  const currentIndex =
    tabs.findIndex((tabItem) => router.route.includes(tabItem.key)) ?? 0;

  return (
    <Tabs variant="soft-rounded" isFitted isManual index={currentIndex}>
      <TabList>
        {tabs.map((tab) => (
          <Tab
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
  );
}

export default SwapiTabs;
