import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

import colors from "../constants/colors";

export default function AddTicketScreen({ navigation }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput placeholder="Logo" style={styles.input} />
      <TextInput placeholder="Date de l'achat" style={styles.input} />
      <TextInput placeholder="Marque" style={styles.input} />
      <TextInput placeholder="Prix" style={styles.input} />
      <View style={styles.button}>
      <Button
        title="Ajouter un ticket"
        color={colors.primary}

      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 40,
    justifyContent: "space-between",
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
  }
});
