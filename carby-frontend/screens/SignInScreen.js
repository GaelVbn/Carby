import React from "react";
import {
  View,
  TextInput,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
export default function SignInScreen({ navigation }) {
  const URL_BACKEND = "https://carby-backend.vercel.app";
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true);
      return;
    }

    fetch(`${URL_BACKEND}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(
            login({
              token: data.token,
              username: data.username,
              xp: data.xp,
              lvl: data.lvl,
              _id: data._id,
            })
          );
          navigation.navigate("TabNavigator", { screen: "Carby" });
        } else {
          setUserError(true);
        }
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container2}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
      >
        <ImageBackground
          source={require("../assets/SignIn.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.titleContainer}>
            <View style={styles.logoContainer}>
              <Text style={styles.title}>CARBY</Text>
            </View>
          </View>

          <View style={styles.inputsContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
                onChangeText={(value) => setEmail(value)}
                value={email}
              />
              {emailError && (
                <Text style={styles.error}>Invalid email address</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => setPassword(value)}
                value={password}
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.btn1Flex}>
            <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
              <Text style={styles.btnText}>Connexion </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.btn2Flex}>
            <TouchableOpacity
              style={styles.btn2}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.btnText2}>Je m'inscris</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C6E49",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    top: "-35%",
    left: "-35%",
  },
  title: {
    fontSize: 24,
    fontFamily: "Comfortaa",

    fontWeight: "bold",
    color: "#2C6E49",
  },
  inputContainer: {
    justifyContent: "center",
    width: "100%",
  },
  container2: {
    flex: 5,
    justifyContent: "center",
    width: "100%",
  },
  inputsContainer: {
    marginTop: "0%",
    width: "70%",
  },
  inputWrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    fontFamily: "Comfortaa",
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 10,
    color: "#FEFEE3",
  },
  input: {
    height: 35,
    width: "100%",
    marginBottom: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#FEFEE3",
  },
  btn1Flex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "white",
    width: "100%",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4C956C",
    width: "40%",
    height: "60%",
    marginBottom: "5%",
    marginTop: "10%",
    borderRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  btnText: {
    color: "#FEFEE3",
    fontSize: 16,
    fontFamily: "Comfortaa",
    fontWeight: "bold",
  },
  btn2Flex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: 'grey',
    width: "100%",
  },
  btn2: {
    marginBottom: "10%",
    marginLeft: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText2: {
    color: "#FEFEE3",
    fontSize: 12,
    fontFamily: "Comfortaa",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  error: {
    marginTop: 10,
    color: "red",
  },
});
