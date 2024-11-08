import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function SetupScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Welcome.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text1}>
            Félicitations<Text style={styles.user}>Name !</Text>{" "}
          </Text>
          <Text style={styles.text}>
            Tu as fais le premier pas vers un avenir plus écologique.
          </Text>
          <Text style={styles.text2}>
            Carby te propose d'intégrer les actions suivantes dans ton quotidien
          </Text>
        </View>

        <TouchableOpacity>
          <Text>Option1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Option2</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Option3</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
            <Text style={styles.btnText}>Ca me va!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
            <Text style={styles.btnText}>Je modifie</Text>
          </TouchableOpacity>
        </View>
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
  },
  text: {
    fontSize: "35px",
    padding: "2px",
    paddingTop: "5%",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
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
    fontFamily: "Helvetica",
    fontWeight: "bold",
  },
  text2: {
    fontSize: "35px",
    paddingTop: "5%",
    paddingBottom: "15%",
  },
  user: {
    color: "yellow",
  },
});
