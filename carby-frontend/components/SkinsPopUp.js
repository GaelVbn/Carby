import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSkin, removeSkin } from "../reducers/user";

const skinsOptions = [
  { source: require("../assets/skins/audio.png") },
  { source: require("../assets/skins/casque.png") },
  { source: require("../assets/skins/cute.png") },
  { source: require("../assets/skins/echarpe.png") },
  { source: require("../assets/skins/fake.png") },
  { source: require("../assets/skins/sombrero.png") },
  { source: require("../assets/skins/lunette1.png") },
  { source: require("../assets/skins/lunette2.png") },
  { source: require("../assets/skins/ski.png") },
];
const SkinsPopUp = ({ isVisible, onClose }) => {
  const dispatch = useDispatch();
  const [skins, setSkins] = useState([]);

  //opérateur de décomposition [...]
  const handleSkins = (index) => {
    if (!skins.includes(index)) {
      const newSkins = [...skins, index];
      setSkins(newSkins);
      dispatch(addSkin(newSkins));
      //console.log(newSkins);
    } else {
      const newSkins = skins.filter((skinIndex) => skinIndex !== index);
      setSkins(newSkins);
      dispatch(removeSkin(newSkins));
    }
  };

  console.log(skins);
  const skinsChoice = skinsOptions.map((item, index) => (
    <TouchableOpacity key={index} onPress={() => handleSkins(index)}>
      <Image source={item.source} style={styles.image} />
    </TouchableOpacity>
  ));

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContent}>
        <Text style={styles.human}>Accesoires disponibles : </Text>
        <View style={styles.skinsContainer}>{skinsChoice}</View>
        <TouchableOpacity style={styles.btn} title="Close" onPress={onClose}>
          <Text style={styles.textbtn}>X</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "#2C6E49",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  equipmentOption: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    padding: 20,
    margin: 10,
  },

  human: {
    color: "#FFC9B9",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 30,
    fontFamily: "Comfortaa",
  },
  text: {
    color: "#FEFEE3",
    fontSize: 20,
  },
  title: {
    color: "#FEFEE3",
    marginBottom: 20,
    fontSize: 20,
  },
  btn: {
    backgroundColor: "#FFC9B9",
    padding: 13,
    marginTop: 40,
    borderRadius: 20,
  },
  textbtn: {
    color: "#2C6E49",
    fontSize: 20,
  },
  iconcontainer: {},
  icon: {
    color: "white",
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    margin: 5,
  },
  skinsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default SkinsPopUp;
