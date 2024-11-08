import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import { Card } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { addXp, removeXp } from "../reducers/user";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showTempText, setShowTempText] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLiked(false); // Réinitialiser les tâches
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const toggleSubMenu = () => {
    setIsVisible(!isVisible);
  };
  const handlePress = (_id) => {
    handleLike();
    handleCounter(_id);
  };
  const token = useSelector((state) => state.user.value.token);

  const handleCounter = (_id) => {
    if (!isLiked) {
      console.log("Sending taskId:", _id);
      const URL_BACKEND = "https://carby-backend.vercel.app";
      const counter = 1;
      fetch(`${URL_BACKEND}/users/tasks/counter/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ counter, _id }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          dispatch(addXp(75));
        })
        .catch((error) => {
          console.error("Error updating counter:", error);
        });
    } else {
      const URL_BACKEND = "https://carby-backend.vercel.app";
      const counter = -1;
      fetch(`${URL_BACKEND}/users/tasks/counter/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ counter, _id }),
      })
        .then((response) => {
          dispatch(removeXp(75));
          return response.json();
        })

        .catch((error) => {
          console.error("Error updating counter:", error);
        });
    }
  };

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setShowTempText(false);
    } else {
      setIsLiked(true);
      setShowTempText(true);
      setTimeout(() => {
        setShowTempText(false);
      }, 3000);
    }

    // 3 secondes

    // Démarrer l'animation
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLiked(false); // Réinitialiser les tâches
    }, 50000);

    return () => clearInterval(interval);
  }, []);

  let iconStyle = isLiked ? { color: "#ffbd00" } : { color: "#fefee3" };
  let titleStyle = isLiked
    ? {
        fontSize: 18,
        color: "#ffbd00",
        fontWeight: "bold",
        fontFamily: "Comfortaa",
        paddingLeft: 10,
      }
    : {
        fontSize: 18,
        color: "#fefee3",
        fontWeight: "bold",
        fontFamily: "Comfortaa",
        paddingLeft: 10,
      };

  const animatedStyle = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };

  return (
    <Card key={task.name} style={styles.card}>
      <TouchableOpacity onPress={toggleSubMenu}>
        <View style={styles.cardHeader}>
          <View style={styles.titlecontainer}>
            <Text style={titleStyle}>{task.taskId.title}</Text>
          </View>
          <View style={styles.iconecontainer}>
            <Animated.View style={animatedStyle}>
              <Icon
                style={iconStyle}
                name="check-circle"
                size={40}
                onPress={() => handlePress(task._id)}
              />
            </Animated.View>
          </View>
        </View>
      </TouchableOpacity>
      {showTempText && (
        <View style={styles.tempTextContainer}>
          <Text style={styles.tempText}>+75xp</Text>
        </View>
      )}
      {isVisible && (
        <View style={styles.subMenu}>
          <Text style={styles.subMenuItem}>{task.taskId.description}</Text>
          <Image source={{ uri: task.taskId.img }} style={styles.image} />
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 330,
    margin: 10,
    borderRadius: 20,

    position: "sticky",
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 7,
    },
    elevation: 5,
  },
  cardHeader: {
    padding: 25,
    height: 80,
    backgroundColor: "#2c6e49",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 10,
    display: "flex",
    flexDirection: "row",

    alignItems: "center",
    padding: 10,
  },

  titlecontainer: {
    width: "60%",
  },

  iconecontainer: {
    flexDirection: "row",
    justifyContent: "center",

    width: "40%",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fefee3",
    fontFamily: "Comfortaa",
    paddingLeft: 10,
  },
  cardIcon: {
    marginLeft: 20,
  },
  subMenu: {
    padding: 15,
    backgroundColor: "#fefee3",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  subMenuItem: {
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: "Comfortaa",
  },
  image: {
    width: "100%",
    height: 220,
    marginBottom: 10,
  },
  tempTextContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",

    transform: [{ translateX: 20 }, { translateY: -60 }, { rotate: "350deg" }],
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    borderRadius: 10,
  },
  tempText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Comfortaa",
  },
  titlestyle: {
    fontFamily: "Comfortaa",
  },
});

export default Task;
