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
  SafeAreaView,
} from "react-native";
import colors from "../constants/colors";
import DateTimePicker from "@react-native-community/datetimepicker";

const TicketAdd = (props) => {
  {
    /* Mise à jour des données récupérées pour la création d'un nouveau ticket */
  }
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  const [enteredBrand, setEnteredBrand] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredNote, setEnteredNote] = useState("");

  const brandInputHandler = (inputBrand) => {
    setEnteredBrand(inputBrand.replace(/[^a-zA-Z& ]/g, ""));
  };
  const priceInputHandler = (inputPrice) => {
    setEnteredPrice(inputPrice.replace(/[^0-9,]/g, ""));
  };
  const noteInputHandler = (inputNote) => {
    setEnteredNote(inputNote.replace(/[<>]/g, ""));
  };


  const addTicketHandler = () => {
    if (enteredBrand.length <= 0 || enteredPrice.length <= 0) {
      return;
    }
    props.onAddTicket(enteredBrand, enteredPrice, date, enteredNote);
    setEnteredBrand("");
    setEnteredPrice("");
    setEnteredNote("");
    setDate(new Date());
  };

  const cancelAddHandler = () => {
    props.onCancel();
    setEnteredBrand("");
    setEnteredPrice("");
    setEnteredNote("");
    setDate(new Date());
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={styles.screen}>
          <TextInput
            placeholder="Enseigne*"
            style={styles.input}
            autoCorrect={false}
            maxLength={10}
            onChangeText={brandInputHandler}
            value={enteredBrand}
          />
          <TextInput
            placeholder="Prix*"
            style={styles.input}
            autoCorrect={false}
            maxLength={9}
            onChangeText={priceInputHandler}
            value={enteredPrice}
            keyboardType="number-pad"
          />
          <TextInput
            placeholder="Note"
            style={styles.input}
            autoCorrect={false}
            maxLength={50}
            value={enteredNote}
            onChangeText={noteInputHandler}
          />
          <View style={styles.buttonContainer}>
            <Button
              onPress={showDatepicker}
              title="Date"
              color={colors.accent}
            />
            <Button
              onPress={showTimepicker}
              title="Heure"
              color={colors.accent}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Annuler"
              color={colors.primary}
              onPress={cancelAddHandler}
            />
            <Button
              title="Ajouter"
              color={colors.accent}
              onPress={addTicketHandler}
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          timeZoneOffsetInSeconds={7200}
          timeZoneOffsetInMinutes={120}
        />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: {
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
  hiddenInput: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    width: "70%",
    margin: 10,
    borderRadius: 5,
    opacity: 0,
    height: 0,
    width: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "45%",
    marginVertical: 10,
  },
  moreButton: {
    borderRadius: 100,
  },
});

export default TicketAdd;
