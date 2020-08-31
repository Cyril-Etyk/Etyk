import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

{
  /* Gestion de l'affichage des nouveaux tickets */
}

const Ticket = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onDelete.bind(this, props.id)}
      style={{ ...styles.listItem, ...props.style }}
    >
      <View style={styles.textItem}>
        <Image style={styles.logo} source={props.logo} />

        <Text>{props.title}</Text>
        <Image style={styles.logo} source={props.manuel} />
      </View>
    </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 5,
    flexDirection: "row",
  },
  logo: {
    width: 45,
    height: 18,
    marginHorizontal: 20,
  },
  textItem: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
});

export default Ticket;
