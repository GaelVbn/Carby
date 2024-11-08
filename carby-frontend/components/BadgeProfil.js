import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Card,
} from "react-native";
import * as Progress from "react-native-progress";
import { useSelector, useDispatch } from "react-redux";

const BadgeProfil = ({ title, img }) => {
  return (
    <View style={styles.badgeContainer}>
      <Image source={{ uri: img }} style={styles.imageStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    padding: 10,
    margin: 10,

    borderRadius: 10,
    alignItems: "center",
    width: 80,
    height: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 7,
    },
    elevation: 5,
  },
  imageStyle: {
    width: 150,
    height: 120,
    marginTop: 0,
  },
  badgeImageColor: {
    width: 180,
    height: 120,
    marginTop: 10,
  },
  badgeImageBW: {
    width: 180,
    height: 120,
    marginTop: 10,
    opacity: 0.3, // Appliquer une couleur grise pour simuler un effet noir et blanc
  },

  badgeTitle: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Comfortaa",
    color: "#FEFEE3",
  },
  badgeCategory: {
    fontSize: 14,
    color: "#6c757d",
  },
  Xpcontainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5, // Utilisé pour Android
    backgroundColor: "white", // Nécessaire pour les ombres sur iOS
    borderRadius: 10, // Doit correspondre au borderRadius du Progress Bar pour cohérence
    padding: 2,
    bottom: "5%",
    position: "absolute",
  },
});

export default BadgeProfil;
