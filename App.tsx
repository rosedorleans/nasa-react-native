import * as React from "react";
import { useEffect, useState } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView,
  FlatList,
  ScrollView } from "react-native";
import { Image } from "expo-image";
import axios from "axios";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "@expo/vector-icons/Ionicons";

const Stack = createStackNavigator();

function HomeScreen() {
    let [response, setResponse] = useState();

    React.useEffect(() => {
      axios
        .get("https://api.nasa.gov/planetary/apod", {
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
      <Text style={styles.viewTitle}>Image du jour :</Text>
      <Image
        style={{ height: 200, width: "100%" }}
        source={{ uri: response }}
      />
    </View>
  );
}

function ListScreen() {
  let [response, setResponse] = useState([]);
  const listUrl =
    "https://api.nasa.gov/planetary/apod?api_key=AvYWVei9BhfrRoU5yrLLfCacbmxVgZhmVXuG0nbJ&start_date=2023-02-15";

  React.useEffect(() => {
    axios
      .get(listUrl)
      .then(function (response) {

        let T_images = [];

        response.data.forEach(function (item) {
          T_images.push({
            id: item.id,
            url: item.url,
            title: item.title,
            explanation: item.explanation,
						date: item.date
          });
        });
        T_images = T_images.reverse();
        console.log(T_images);
        setResponse(T_images);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  
  console.log('item', response.length);

  return (
    <View style={styles.container}>
      <Text style={styles.viewTitle}>
        Images du jour {"\n"} (depuis le 15 février 2023) :
      </Text>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={response}
          renderItem={({item}) => 
            <View>
              <Text style={styles.photoTitle}>{item.title}</Text>
              <Text style={styles.photoExplanation}>{item.explanation}</Text>
              <Image style={styles.photo} source={{ uri: item.url }} key={item.id} />
            </View>}
          keyExtractor={item => item.id}/>
      </SafeAreaView>
    </View>
  );
}

function Nasa() {
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
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    color: "#fff",
  },
  title: {
    fontSize: 35,
    color: "#fff",
  },
  viewTitle: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
  },
  scrollView: {
    width: "100%",
    paddingHorizontal: 20,
  },
  photo: {
    height: 200,
    width: "100%",
    margin: 10,
  },
  photoTitle: {
    fontSize: 15,
    textAlign: "center",
    marginVertical: 5,
  },
  photoExplanation: {
    fontSize: 10,
    textAlign: "center",
    marginVertical: 5,
  },
});
