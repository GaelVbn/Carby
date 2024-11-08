import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView, Card } from "react-native";
import { images } from "../assets/badges";
import { useSelector, useDispatch } from "react-redux";
import Badge from "../components/Badge";

export default function BadgesScreen() {
  const [progressData, setProgressData] = useState([]);
  const [badges, setBadges] = useState([]);
  const user = useSelector((state) => state.user.value);
  const token = user.token;
  const xp = user.xp;
  console.log("data:", user);
  useEffect(() => {
    const URL_BACKEND = "https://carby-backend.vercel.app";

    fetch(`${URL_BACKEND}/badges`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBadges(data.badges);
      });
  }, []);

  useEffect(() => {
    const URL_BACKEND = "https://carby-backend.vercel.app";
    fetch(`${URL_BACKEND}/users/tasks/${token}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          const extractedData = data.tasks.map((task) => ({
            title: task.taskId.title,
            counter: task.counter,
          }));

          setProgressData(extractedData);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [xp]);

  const getProgressForCategory = (category) => {
    const progressItem = progressData.find((item) => item.title === category);
    return progressItem ? progressItem.counter : 0;
  };

  const BadgesComponents = badges.map((badge) => (
    <Badge
      key={badge._id}
      title={badge.title}
      img={badge.img}
      category={badge.category}
      xp={getProgressForCategory(badge.category)}
      maxXp={badge.maxCounter}
    />
  ));

  return (
    <View style={styles.global}>
      <View style={styles.globalContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Badges</Text>
        </View>
        <View style={styles.badgesContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false} // Masquer la barre de défilement verticale
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {BadgesComponents}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  global: {
    backgroundColor: "#4c956c",
    flex: 1,
  },
  globalContainer: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4c956c",
  },

  headerContainer: {
    flex: 0.8,
    backgroundColor: "#2c6e49",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    marginTop: 25,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Comfortaa",
    fontSize: 20,
  },
  badgesContainer: {
    flex: 5,
    backgroundColor: "#4c956c",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    marginBottom: 100,
  },
  scrollContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  badgeContainer: {
    width: "28%",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    //backgroundColor: "green",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "6.5%",
    //backgroundColor: "violet",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  badgeTitle: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
});
