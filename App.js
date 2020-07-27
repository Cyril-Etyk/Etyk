import React from "react";
import { StyleSheet, Text, View } from "react-native";

import TicketCard from "./components/TicketCard";

export default function App() {
  return (
    <TicketCard style={styles.inputContainer}>
      <Text>Test</Text>
      <Text>Test</Text>
      <Text>Test</Text>
      <Text>Test</Text>
      <Text>Test</Text>
    </TicketCard>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "95%",
    maxWidth: "95%",
    marginHorizontal: "2.5%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "25%",
  },
});
