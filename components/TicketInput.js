import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import colors from "../constants/colors";

const TicketInput = (props) => {
  {
    /* Mise à jour des données récupérées pour la création d'un nouveau ticket */
  }

  const [enteredBrand, setEnteredBrand] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");

  const brandInputHandler = (inputBrand) => {
    setEnteredBrand(inputBrand.replace(/[^a-zA-Z& ]/g, ""));
  };
  const priceInputHandler = (inputPrice) => {
    setEnteredPrice(inputPrice.replace(/[^0-9,€]/g, ""));
  };

  const addTicketHandler = () => {
    if (enteredBrand.length <= 0 || enteredPrice.length <= 0) {
      return;
    }
    props.onAddTicket(enteredBrand, enteredPrice);
    setEnteredBrand("");
    setEnteredPrice("");
  };

  {
    /* Affichage des TextInput et du bouton pour créer un nouveau ticket */
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Marque"
            style={styles.input}
            autoCorrect={false}
            maxLength={10}
            onChangeText={brandInputHandler}
            value={enteredBrand}
          />
          <TextInput
            placeholder="Prix"
            style={styles.input}
            autoCorrect={false}
            maxLength={8}
            onChangeText={priceInputHandler}
            value={enteredPrice}
            keyboardType="number-pad"
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Annuler"
              color={colors.primary}
              onPress={props.onCancel}
            />
            <Button
              title="Ajouter un ticket"
              color={colors.accent}
              onPress={addTicketHandler}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    width: "70%",
    margin: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginVertical: 20,
  },
});

export default TicketInput;
