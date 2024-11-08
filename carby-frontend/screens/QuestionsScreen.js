import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { determineProfile, generateTasks } from "../data/userProfile";
import { setProfile, setTasks } from "../reducers/user";

const URL_BACKEND = "https://carby-backend.vercel.app";
const questions = [
  {
    id: "q1",
    text: "Quelle quantité d’eau utilisez-vous pour votre bain/douche ? 🛀",
    answers: ["Economique", "Modérée", "Excessive"],
  },
  {
    id: "q2",
    text: "Combien de fois par semaine consommez-vous de la viande ? 🍖",
    answers: ["Jamais", "1-2 fois", "3-5 fois", "Plus de 5 fois"],
  },
  {
    id: "q3",
    text: "Utilisez-vous des sacs réutilisables pour vos courses ? 🛍️",
    answers: ["Toujours", "Souvent", "Rarement", "Jamais"],
  },
  {
    id: "q4",
    text: "Laissez vous les lumières allumées en sortant d'une pièce ?💡",
    answers: ["Toujours", "Souvent", "Rarement", "Jamais"],
  },
  {
    id: "q5",
    text: "Privilégiez-vous les produits locaux/de saison ? 🥒🥕👩‍🌾",
    answers: ["Toujours", "Souvent", "Rarement", "Jamais"],
  },
  {
    id: "q6",
    text: "Triez-vous les déchets à la maison (verre, emballage, papier)? ♻️",
    answers: ["Toujours", "Souvent", "Rarement", "Jamais"],
  },
  {
    id: "q7",
    text: "Parlez vous d'éco-responsabilité autour de vous? 🗣️",
    answers: ["Toujours", "Souvent", "Rarement", "Jamais"],
  },
];

const QuestionsScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.token);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions answered, submit answers
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const profile = determineProfile(answers);
    const tasks = await generateTasks(profile);
    console.log("tasks from questions screen:", tasks);

    const tasksId = tasks.map((e) => e._id);
    console.log("taskId===", tasksId);
    await fetch(`${URL_BACKEND}/users/initTasks/${token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tasksId }),
    })
      .then((data) => {
        console.log("Tasks update response:", data);
      })
      .catch((error) => {
        console.error("Error updating tasks:", error);
      });

    navigation.navigate("TabNavigator", { screen: "Carby" });
  };

  return (
    <ImageBackground
      source={require("../assets/questions.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{currentQuestion.text}</Text>
      </View>

      {currentQuestion.answers.map((response) => (
        <TouchableOpacity
          style={styles.btn}
          key={response}
          onPress={() => handleAnswer(response)}
        >
          <Text style={styles.btnText}>{response}</Text>
        </TouchableOpacity>
      ))}
    </ImageBackground>
  );
};

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
    marginTop: "90%",
    marginBottom: "5%",
  },
  text1: {
    fontSize: 25,
    color: "#fefee3",
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
    height: "7%",
  },
  btnText: {
    fontSize: 16,
    fontFamily: "Comfortaa",
    fontWeight: "bold",
    color: "#fefee3",
  },
  text2: {
    fontSize: 35,
    paddingTop: "5%",
    paddingBottom: "15%",
    fontFamily: "Comfortaa",
  },
  user: {
    color: "yellow",
  },
});

export default QuestionsScreen;
