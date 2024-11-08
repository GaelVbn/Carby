import React, { useRef, useEffect, useDebugValue, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Text,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { ImageBackground } from "react-native";
import * as Progress from "react-native-progress";
import { useDispatch, useSelector } from "react-redux";
import {
  addLvl,
  removeXp,
  resetXp,
  removeLvl,
  resetPreviousXp,
} from "../reducers/user";
import Profil from "../components/Profile";
import WelcomePopUp from "../components/WelcomePopUp";
import SkinsPopUp from "../components/SkinsPopUp";

export default function CarbyScreen({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(true);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const dispatch = useDispatch();
  const moveAnim = useRef(new Animated.Value(0)).current; // Initial position
  const blinkAnim = useRef(new Animated.Value(1)).current; // Animation for blinking

  useEffect(() => {
    const moveAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: 1,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    );

    const blinkAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0,
          duration: 100,
          delay: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }),
      ])
    );

    moveAnimation.start();
    blinkAnimation.start();

    // Clean up animations on component unmount
    return () => {
      moveAnimation.stop();
      blinkAnimation.stop();
    };
  }, [moveAnim, blinkAnim]);

  const startLeft = 17; // Starting point for the first circle
  const endLeft = -4; // Ending point for the first circle

  const startLeftSecond = startLeft - 22; // Starting point for the second circle
  const endLeftSecond = endLeft - 30; // Ending point for the second circle

  const interpolatedLeftFirst = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [startLeft, endLeft],
  });

  const interpolatedLeftSecond = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [startLeftSecond, endLeftSecond],
  });
  const skins = useSelector((state) => state.user.value.skins);
  const skinsOptions = [
    { source: require("../assets/skins/audio.png"), index: 0 },
    { source: require("../assets/skins/casque.png"), index: 1 },
    { source: require("../assets/skins/cute.png"), index: 2 },
    { source: require("../assets/skins/echarpe.png"), index: 3 },
    { source: require("../assets/skins/fake.png"), index: 4 },
    { source: require("../assets/skins/sombrero.png"), index: 5 },
    { source: require("../assets/skins/lunette1.png"), index: 6 },
    { source: require("../assets/skins/lunette2.png"), index: 7 },
    { source: require("../assets/skins/ski.png"), index: 8 },
  ];
  const stylesArray = {
    0: styles.imageStyle1,
    1: styles.imageStyle2,
    2: styles.imageStyle3,
    3: styles.imageStyle4,
    4: styles.imageStyle5,
    5: styles.imageStyle6,
    6: styles.imageStyle7,
    7: styles.imageStyle8,
    8: styles.imageStyle9,
  };

  //map sur skins: Pour chaque skinIndex dans skins( si item 5 cliqué dans la modal skins contient son index ici 4 ), on recherche l'objet correspondant dans skinsOptions dont item.index correspond à skinIndex. Cela nous donne un tableau de résultats trouvés.

  const skinsChoice = skins
    .map((skinIndex) => skinsOptions.find((item) => item.index === skinIndex))

    .map((item) => (
      <Image
        key={item.index}
        source={item.source}
        style={stylesArray[item.index]}
      />
    ));
  //ici on vient extraire les indices des images sélectionnées de l'état skins, trouve les objets d'images correspondants dans skinsOptions et génère des composants Image avec les images et styles appropriés. Les composants Image générés sont ensuite stockés dans skinsChoice, pour être utilisés dans le rendu du composant.
  return (
    <ScrollView style={styles.scrollview}>
      <ImageBackground
        source={require("../assets/carbyfinal.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.circle,
              { left: interpolatedLeftFirst, opacity: blinkAnim },
            ]}
          >
            <View style={styles.circleblackright}></View>
          </Animated.View>

          <Animated.View
            style={[
              styles.circle1,
              { left: interpolatedLeftSecond, opacity: blinkAnim },
            ]}
          >
            <View style={styles.circleblackleft}></View>
          </Animated.View>
          <View style={styles.skincontainer}>{skinsChoice}</View>
        </View>
      </ImageBackground>
      <View style={styles.modalcontainer}>
        <WelcomePopUp isVisible={isModalVisible} onClose={toggleModal} />
      </View>
      <Profil />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: "#4C956C",
  },
  btnSkins: {
    zIndex: 10000,
    position: "absolute",
    top: "5%",
  },
  skins: {
    zIndex: 5000,
    position: "absolute",
  },
  modalcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 811,
  },
  circle: {
    width: 10,
    height: 20,
    borderRadius: 5, // Half of the width and height to make it a circle
    backgroundColor: "black",
    position: "absolute",
    top: "36%", // Adjust this value based on your requirements
    marginLeft: -33,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  circleblackleft: {
    width: 8,
    height: 8,
    borderRadius: 5, // Half of the width and height to make it a circle
    backgroundColor: "white",
    position: "absolute",
    top: 5, // Adjust this value based on your requirements
    marginLeft: 5,
    zIndex: 1000,
  },

  circle1: {
    width: 10,
    height: 20,
    borderRadius: 5, // Half of the width and height to make it a circle
    backgroundColor: "black",
    position: "absolute",
    top: "36%",
    marginLeft: 37,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    // Adjust this value based on your requirements
  },
  circleblackright: {
    width: 8,
    height: 8,
    borderRadius: 5, // Half of the width and height to make it a circle
    backgroundColor: "white",
    position: "absolute",
    top: 5, // Adjust this value based on your requirements
    marginLeft: 5,
    zIndex: 1000,
  },
  progresscontainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefee3",
    top: "25%",
    width: 250,
    height: 80,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  Xpcontainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5, // Utilisé pour Android
    backgroundColor: "white", // Nécessaire pour les ombres sur iOS
    borderRadius: 10, // Doit correspondre au borderRadius du Progress Bar pour cohérence
    padding: 2,
  },
  textxp: {
    fontFamily: "Helvetica",
    fontWeight: "bold",
  },
  image: {
    position: "absolute",

    width: 500, // Changez la largeur selon vos besoins
    height: 100, // Changez la hauteur selon vos besoins
    resizeMode: "contain",
    transform: [{ rotate: "340deg" }],
  },
  skincontainer: {
    height: "100%",
    width: "100%",
  },
  imageStyle1: {
    width: 230,
    height: 203,
    position: "absolute",
    top: "18%",
    right: "-32%",
  },
  imageStyle2: {
    width: 180,
    height: 180,
    position: "absolute",
    top: "20%",
    right: "-25%",
  },
  imageStyle3: {
    width: 120,
    height: 120,
    position: "absolute",
    top: "50%",
    right: "-16%",
  },
  imageStyle4: {
    width: 260,
    height: 260,

    position: "absolute",
    top: "50%",
    right: "-37%",
  },
  imageStyle5: {
    width: 120,
    height: 120,
    position: "absolute",
    top: "31%",
    right: "-16%",
  },
  imageStyle6: {
    width: 230,
    height: 230,
    position: "absolute",
    transform: [{ rotate: "19deg" }],
    top: "10%",
    right: "-33%",
  },
  imageStyle7: {
    width: 120,
    height: 60,
    position: "absolute",
    top: "34%",
    right: "-16%",
  },
  imageStyle8: {
    width: 190,
    height: 130,
    position: "absolute",
    top: "30%",
    right: "-25%",
  },
  imageStyle9: {
    width: 240,
    height: 240,
    position: "absolute",
    top: "15%",
    right: "-32%",
  },
});
