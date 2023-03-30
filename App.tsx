import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "@expo/vector-icons/Ionicons";

import HOMETSX from "./HomeScreen";
import LISTTSX from "./ListScreen";
import SEARCHTSX from "./SearchScreen";

const Stack = createStackNavigator();


function BasePage() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Liste") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "ios-search" : "ios-search-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HOMETSX} />
      <Tab.Screen name="Liste" component={LISTTSX} />
      <Tab.Screen name="Search" component={SEARCHTSX} />
    </Tab.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BasePage"
          component={BasePage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
