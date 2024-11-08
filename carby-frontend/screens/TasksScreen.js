import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import Task from "../components/Task";
import { useSelector, useDispatch } from "react-redux";

export default function TasksScreen({ navigation }) {
  const URL_BACKEND = "https://carby-backend.vercel.app";
  const token = useSelector((state) => state.user.value.token);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${URL_BACKEND}/users/tasks/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Tasks for this user:", data.tasks);

        setTasks(data.tasks);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  console.log(tasks);
  const taskComponents = tasks.map((task) => (
    <Task key={task._id} task={task} isLikedInit={false} />
  ));
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Mes objectifs du jour !</Text>
      </View>
      <View style={styles.badgesContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false} // Masquer la barre de défilement verticale
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.container}>{taskComponents}</View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start", // Changer à "flex-start" pour s'assurer que le contenu commence au début
    alignItems: "center",
    backgroundColor: "#4c956c",
    paddingVertical: 0,
    paddingBottom: 120, // Ajouter du padding pour l'espacement
  },
  badgesContainer: {
    flex: 5,
    backgroundColor: "#4c956c",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 110,
  },
  titleContainer: {
    top: 0,
    backgroundColor: "#2c6e49",
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
    zIndex: 500,
    position: "absolute",
    paddingBottom: 25,
    marginBottom: 5,
  },
  title: {
    marginTop: 50,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Comfortaa",
  },

  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 0,
    marginTop: 120,
  },
});
