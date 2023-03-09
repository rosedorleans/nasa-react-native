import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Image } from "react-native";
import axios from "axios";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "@expo/vector-icons/Ionicons";

const Stack = createStackNavigator();

function HomeScreen() {
  let [response, setResponse] = useState();

  React.useEffect(() => {
    axios.get("https://api.nasa.gov/planetary/apod", {
        params: {
          api_key: "QanO544xGGLPtndgU0a68zZEs83Xy70yLBQS886O",
        },
      })
      .then(function (response) {
        console.log(response.data);
        const url = response.data.url;
        console.log(url);
        setResponse(url);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <View>
      <Image
        style={{ width: "100%", height: 200 }}
        source={{ uri: response }}
      />
    </View>
  ); 
}

function ListScreen() {
  return (
    <View style={styles.container}>
      <Text>Liste</Text>
    </View>
  );
}

function Nasa() {
  return (
    <Tab.Navigator
    // screenOptions={({ route }) => ({
    // 	tabBarIcon: ({ focused, color, size }) => {
    // 		let iconName;

    // 		if (route.name === 'Home') {
    // 			iconName = focused
    // 				? 'ios-information-circle'
    // 				: 'ios-information-circle-outline';
    // 		} else if (route.name === 'Liste') {
    // 			iconName = focused ? 'ios-list' : 'ios-list-outline';
    // 		}

    // 		return <Ionicons name={iconName} size={size} color={color} />;
    // 	},
    // 	tabBarActiveTintColor: 'tomato',
    // 	tabBarInactiveTintColor: 'gray',
    // })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen name="Liste" component={ListScreen} />
    </Tab.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Nasa"
          component={Nasa}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffcccc",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  title: {
    fontSize: 35,
    color: "#fff",
  },
  button: {
    padding: 10,
    marginVertical: 15,
    backgroundColor: "#0645AD",
  },
  buttonText: {
    color: "#fff",
  },
});
