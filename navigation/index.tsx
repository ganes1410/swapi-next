/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import MovieDetails from "../screens/MovieDetails";
import MoviesList from "../screens/MoviesList";
import NotFoundScreen from "../screens/NotFoundScreen";
import PeopleDetails from "../screens/PeopleDetails";
import PeopleList from "../screens/PeopleList";
import {
  MovieStackParamsList,
  PeopleStackParamsList,
  RootStackParamList,
  RootTabParamList,
} from "../types";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const MoviesStack = createNativeStackNavigator<MovieStackParamsList>();
const PersonsStack = createNativeStackNavigator<PeopleStackParamsList>();

function MovieNavigator() {
  return (
    <MoviesStack.Navigator>
      <MoviesStack.Screen
        name="MoviesList"
        component={MoviesList}
        options={{ title: "Movies" }}
      />

      <MoviesStack.Screen name="MovieDetails" component={MovieDetails} />
    </MoviesStack.Navigator>
  );
}

function PersonNavigator() {
  return (
    <PersonsStack.Navigator>
      <PersonsStack.Screen
        name="PeopleList"
        component={PeopleList}
        options={{ title: "Movies" }}
      />

      <PersonsStack.Screen name="PeopleDetails" component={PeopleDetails} />
    </PersonsStack.Navigator>
  );
}

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Movies"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Movies"
        component={MovieNavigator}
        options={() => ({
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="file-movie-o" color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="People"
        component={PersonNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons
              size={25}
              name="people"
              color={color}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={25} style={{ marginBottom: -3 }} {...props} />;
}
