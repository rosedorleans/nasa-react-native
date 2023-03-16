import * as React from "react";
import { useEffect, useState } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Modal,
  Alert,
  FlatList,
  ScrollView } from "react-native";
import { Image } from "expo-image";
import axios from "axios";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "@expo/vector-icons/Ionicons";

import Moment from 'moment';

const Stack = createStackNavigator();

function HomeScreen() {
    let [response, setResponse] = useState();

    React.useEffect(() => {
      axios
        .get("https://api.nasa.gov/planetary/apod", {
          params: {
            api_key: "Q2VIB5h55Hc5b3FchhcKqD1vgHJdDbFnfvfq7A0t",
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

  React.useEffect(() => {
    axios
      .get("https://api.nasa.gov/planetary/apod", {
        params: {
          api_key: "Q2VIB5h55Hc5b3FchhcKqD1vgHJdDbFnfvfq7A0t",
          start_date: "2023-02-01"
        },
      })
      .then(function (response) {

        let T_images = [];

        response.data.forEach(function (item) {
          T_images.push({
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
  let itemHeight = 500

  // modal
  const [modalVisible, setModalVisible] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(null);

  const onPress = (item) => {
    setActiveItem(item)
    console.log("activeItem", activeItem)
    setModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.viewTitle}>
        Images du jour :
      </Text>
      <SafeAreaView>
        <FlatList
          style={styles.flatList}
          data={response}
          renderItem={({item}) => 
            <View style={[styles.card, styles.shadowProp]}>
              <TouchableOpacity onPress={()=>onPress(item)}>
                <Text style={styles.photoDate}>{ Moment(item.date).format('D MMMM y') }</Text>
                <Text style={styles.photoTitle}>{item.title}</Text>
                <Image style={styles.photo} source={{ uri: item.url }}/>
              </TouchableOpacity>
            </View>}
          keyExtractor={(item, index) => `${item.date + index}`}
          getItemLayout={(data, index) => (
            {length: itemHeight, offset: itemHeight * index, index}
          )}

          onEndReachedThreshold={0.5}
          onEndReached={({ distanceFromEnd }) => {
              console.log(
                  "on end reached ",
                  distanceFromEnd
              );
              
          }}
          // progressViewOffset={1}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
            {activeItem && (          
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <Text style={styles.photoDate}>{ Moment(activeItem.date).format('D MMMM y') }</Text>
                <Text style={styles.photoTitle}>{activeItem.title}</Text>
                <Text style={styles.modalText}>{ activeItem.explanation }</Text>
                {console.log(activeItem)}
                <Image style={styles.modalPhoto} source={{ uri: activeItem.url }}/>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Fermer</Text>
                </Pressable>
              </View>
            </View>)}

        </Modal>
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
    backgroundColor: "#fff",
    paddingVertical: 20
  },
  flatList: {
    paddingHorizontal: 20,
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
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '80%',
    margin: 30,
  },
  shadowProp: {
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  photo: {
    height: 200,
    width: "100%",
  },
  photoDate: {
    fontSize: 17,
    textAlign: "center",
    marginVertical: 5,
  },
  photoTitle: {
    fontSize: 13,
    textAlign: "center",
    marginVertical: 5,
  },
  // modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 8,
    textAlign: 'center',
  },
  modalPhoto: {
    height: 400,
    width: 350,
    margin: 20
  },
});
