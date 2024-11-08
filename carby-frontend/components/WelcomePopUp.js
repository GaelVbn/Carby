import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import React, { useRef, useEffect, useDebugValue, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
const WelcomePopUp = ({ isVisible, onClose }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContent}>
        <Text style={styles.human}>Welcome Human! </Text>
        <Text style={styles.title}>
          Tu retrouveras ici l'ensemble des statistiques de ton Carby: niveau,
          expérience et badges en cours d'obtentions.
        </Text>
        <Text style={styles.text}>
          Consulte l'onglet : "
          <View style={styles.iconcaontainer}>
            <Icon style={styles.icon} name="check-circle" size={40} />
          </View>
          " chaque jour afin de valider tes objectifs et ainsi monter en niveau
          et débloquer tes premiers cosmétiques pour Carby!
        </Text>
        <TouchableOpacity style={styles.btn} title="Close" onPress={onClose}>
          <Text style={styles.textbtn}>Let's go ! </Text>
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
    fontFamily: "Comfortaa",
  },
  title: {
    color: "#FEFEE3",
    marginBottom: 20,
    fontSize: 20,
    fontFamily: "Comfortaa",
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
    fontFamily: "Comfortaa",
  },
  iconcontainer: {},
  icon: {
    color: "white",
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default WelcomePopUp;
