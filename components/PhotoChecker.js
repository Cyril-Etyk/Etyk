import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import colors from "../constants/colors";
import Ticket from "../components/Ticket";
import * as FileSystem from "expo-file-system";

const PhotoChecker = (props) => {
  const data = props.data;
  const uri = props.uri;

  const showTicketInfoModal = (ticketId) => {
    props.onCancel(ticketId);
  };

  const filterTicketHandler = (filterText) => {
    setDataToFilter((dataToFilter) => {
      return data.filter(
        (ticket) =>
          ticket.brand.toUpperCase().includes(filterText.toUpperCase()) |
          ticket.price.includes(filterText) |
          ticket.date.includes(filterText) |
          ticket.note.toUpperCase().includes(filterText.toUpperCase())
      );
    });
  };

  return (
    <Modal visible={props.visible} animationType="fade">
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={styles.screen}>
          <Image style={styles.image} source={require("../Image/photo.png")} />

          <View style={styles.button}>
            <Button
              title="Retour"
              color={colors.primary}
              onPress={props.onCancel}
              style={styles.button}
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#f2f2ef",
  },
  button: {
    margin: 25,
    justifyContent: "space-between",
  },
  buttonStyle: {
    padding: 5,
    marginLeft: 5,
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default PhotoChecker;
