import * as React from "react";
import { useEffect, useState } from "react";
import { 
  StyleSheet,
  View, 
  Text, 
} from "react-native";
import { Image } from "expo-image";
import axios from "axios";


export default function HomeScreen() {
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


const styles = StyleSheet.create({
  viewTitle: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
  },
});