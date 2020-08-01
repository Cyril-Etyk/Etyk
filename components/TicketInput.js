import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";

import colors from "../constants/colors";

const TicketInput = (props) => {

  {
  /* Mise à jour des données récupérées pour la création d'un nouveau ticket */
}


  const [enteredLogo, setEnteredLogo] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredBrand, setEnteredBrand] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");

  const logoInputHandler = (enteredLogo) => {
    setEnteredLogo(enteredLogo);
  };
  const dateInputHandler = (enteredDate) => {
    setEnteredDate(enteredDate);
  };
  const brandInputHandler = (enteredBrand) => {
    setEnteredBrand(enteredBrand);
  };
  const priceInputHandler = (enteredPrice) => {
    setEnteredPrice(enteredPrice);
  };

  {
  /* Affichage des TextInput et du bouton pour créer un nouveau ticket */
}

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Logo"
        style={styles.input}
        onChangeText={logoInputHandler}
      />
      <TextInput
        placeholder="Date de l'achat"
        style={styles.input}
        onChangeText={dateInputHandler}
      />
      <TextInput
        placeholder="Marque"
        style={styles.input}
        onChangeText={brandInputHandler}
      />
      <TextInput
        placeholder="Prix"
        style={styles.input}
        onChangeText={priceInputHandler}
      />
      <View style={styles.button}>
        <Button
          title="Ajouter un ticket"
          color={colors.primary}
          onPress={props.onAddTicket.bind(
            this,
            enteredLogo,
            enteredDate,
            enteredBrand,
            enteredPrice
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    width: "70%",
    margin: 10,
  },
  button: {
    margin: 10,
    padding: 10,
  },
});

export default TicketInput;
