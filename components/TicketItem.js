import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TicketItem = (props) => {
  return (
    <View style={styles.listItem}>
      <Text>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    elevation: 5,
    padding: 15,
    borderRadius: 10,
    width: "95%",
    alignItems: "center",
  },
});

export default TicketItem;
