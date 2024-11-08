import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

export default function WelcomeScreen({ navigation }) {
  const username = useSelector((state) => state.user.value.username);
  const handleSubmit = () => {
    navigation.navigate("Questions");
  };
  console.log(username);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/welcomeF.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text1}>
            Salut <Text style={styles.user}>{username}</Text>
          </Text>
          <Text style={styles.text}>
            Carby a quelques questions à te poser afin de définir ensemble tes
            objectifs.
          </Text>
          <Text style={styles.text2}>Promis c'est rapide!</Text>
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
          <Text style={styles.btnText}>C'est parti !</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textContainer: {
    width: "80%",
    marginTop: "25%", // Adjust this value as needed
  },
  text1: {
    fontSize: "40px",
    color: "#FEFEE3",
    fontFamily: "Comfortaa",
  },
  text: {
    fontSize: "28px",
    padding: "2px",
    paddingTop: "5%",
    color: "#FEFEE3",
    fontFamily: "Comfortaa",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C6E49",
    marginBottom: "5%",
    borderRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 2,
    padding: "5%",
    width: "80%",
  },
  btnText: {
    padding: "50px",
    fontSize: 16,
    fontFamily: "Comfortaa",
    fontWeight: "bold",
    color: "#FEFEE3",
  },
  text2: {
    fontSize: "28px",
    paddingTop: "5%",
    paddingBottom: "10%",
    color: "#fefee3",
    fontFamily: "Comfortaa",
  },
  user: {
    color: "#ffc9b9",
  },
});
