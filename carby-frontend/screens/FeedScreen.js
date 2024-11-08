import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadTweets, addTweet } from "../reducers/tweets";

export default function FeedScreen() {
  const user = useSelector((state) => state.user.value);
  const [tweet, setNewTweet] = useState("");
  const tweetsData = useSelector((state) => state.tweets.value);
  const avatar = useSelector((state) => state.user.value.imgProfil);
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => !prevTimer); // Toggle timer value
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const URL_BACKEND = "https://carby-backend.vercel.app";

  useEffect(() => {
    if (!user.token) {
      return;
    }

    fetch(`${URL_BACKEND}/tweets/all/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        data.result && dispatch(loadTweets(data.tweets));
      });
  }, [timer]);

  const handlePostTweet = () => {
    fetch(`${URL_BACKEND}/tweets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token, content: tweet }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // Utilisez simplement le nom d'utilisateur de l'utilisateur connecté comme auteur du tweet
          const createdTweet = { ...data.tweet };
          dispatch(addTweet(createdTweet));
          setNewTweet("");
        }
      });
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Communauté</Text>
      </View>

      <View style={styles.containerG}>
        <TextInput
          style={styles.tweetInput}
          placeholder="Partage tes succès !"
          placeholderTextColor="#888"
          value={tweet}
          onChangeText={setNewTweet}
        />
        <TouchableOpacity style={styles.tweetButton} onPress={handlePostTweet}>
          <Text style={styles.tweetButtonText}>Poster</Text>
        </TouchableOpacity>

        <ScrollView style={styles.activitiesContainer}>
          {tweetsData.map((activity, index) => (
            <View key={index} style={styles.activityContainer}>
              <Image
                style={styles.activityImage}
                source={require("../assets/avatar1.png")}
              />
              <View style={styles.textContainer}>
                <Text style={styles.activityText}>@{activity.author}</Text>
                <Text style={styles.activityText}>{activity.content}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    top: 0,
    backgroundColor: "#2c6e49",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 500,
    position: "absolute",
    paddingBottom: 25,
    marginBottom: 40,
  },
  headerText: {
    marginTop: 50,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Comfortaa",
    fontSize: 20,
  },
  containerG: {
    flex: 1,
    backgroundColor: "#4c956c",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 100,
  },
  tweetInput: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: "10%",
    color: "#2c6e49",
  },
  tweetButton: {
    width: "100%",
    backgroundColor: "#2c6e49",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  tweetButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  activitiesContainer: {
    width: "100%",
    marginBottom: "30%",
  },
  activityContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  usernameText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
  },
  activityText: {
    color: "#2c6e49",
    fontSize: 16,
  },
  activityImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    backgroundColor: "#2c6e49",
  },
});
