import * as React from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

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
            }
  
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "orange",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Liste" component={ListScreen} />
      </Tab.Navigator>
    );
  }