import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import axios from "axios";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

function HomeScreen() {
  const baseUrl =
    "https://api.nasa.gov/planetary/apod?api_key=AvYWVei9BhfrRoU5yrLLfCacbmxVgZhmVXuG0nbJ";

  let [isLoading, setIsLoading] = useState(true);
  let [response, setResponse] = useState();

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }

    axios.get(`${baseUrl}`).then((response) => {
      setIsLoading(false);
      console.log(response.data);
      return <Text>Image du jour : 
				<img src={response.data.url} alt="" />
			</Text>;
    });
  };

  return <View style={styles.container}>{getContent()}</View>;
}

function ListeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Liste</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Liste" component={ListeScreen} />
      </Tab.Navigator>
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
