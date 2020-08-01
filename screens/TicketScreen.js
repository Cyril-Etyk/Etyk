import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import Header from "../components/Header";
import TicketCard from "../components/TicketCard";
import colors from "../constants/colors";

export default function TicketScreen({ navigation }) {
  const [enteredTicket, setEnteredTicket] = useState("");

  return (
    <View style={styles.screen}>
      <TicketCard style={styles.inputContainer}>
        <Text>Logo</Text>
        <Text>28/07/2020</Text>
        <Text>H&M</Text>
        <Text>65€</Text>
      </TicketCard>
      <TicketCard style={styles.inputContainer}>
        <Text>Logo</Text>
        <Text>28/07/2020</Text>
        <Text>H&M</Text>
        <Text>65€</Text>
      </TicketCard>
      <View style={styles.button}>
        <Button
          title="Ajouter un ticket"
          color={colors.primary}
          onPress={() => navigation.navigate("Ajouter un ticket")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  inputContainer: {
    width: "95%",
    marginHorizontal: "2.5%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  button: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
    margin: 10,
  },
});
