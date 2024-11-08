import React, { useState } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import SkinsPopUp from "./SkinsPopUp";

const Skins = () => {
  const [equipment, setEquipment] = useState([]);

  const handleSelectEquipment = (item) => {
    setEquipment([...equipment, item]);
    setModalVisible(false);
  };

  const handleRemoveEquipment = (item) => {
    setEquipment(equipment.filter((equip) => equip !== item));
  };

  return (
    <View style={styles.container}>
      <View style={styles.characterContainer}>
        {equipment.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleRemoveEquipment(item)}
          >
            <Image source={item} style={styles.equipment} />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.btn}
        title="Equip"
        onPress={() => setModalVisible(true)}
      >
        <Text>SKINS</Text>
      </TouchableOpacity>

      <SkinsPopUp
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleSelectEquipment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  characterContainer: {
    position: "relative",
    width: 200,
    height: 400,
  },
  character: {
    width: "100%",
    height: "100%",
  },
  equipment: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  btn: {
    position: "absolute",
  },
});

export default Skins;
