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
import DateTimePicker from '@react-native-community/datetimepicker';

const TicketInput = (props) => {
  {
    /* Mise à jour des données récupérées pour la création d'un nouveau ticket */
  }
  const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    const showDatepicker = () => {
      showMode('date');
    };

    const showTimepicker = () => {
      showMode('time');
    };
  const [enteredBrand, setEnteredBrand] = useState("");
  const [enteredDate, setEnteredDate] = useState(new Date());
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredTva, setEnteredTva] = useState("");
  const [showInput, setShowInput] = useState(styles.hiddenInput);
  const [toggleInput, setToggleInput] = useState("Plus d'\options");

  const brandInputHandler = (inputBrand) => {
    setEnteredBrand(inputBrand.replace(/[^a-zA-Z& ]/g, ""));
  };
  const priceInputHandler = (inputPrice) => {
    setEnteredPrice(inputPrice.replace(/[^0-9,]/g, ""));
  };
  const tvaInputHandler = (inputTva) => {
    setEnteredTva(inputTva.replace(/[^0-9,]/g, ""));
  };
  const dateInputHandler = (inputDate) => {
    setEnteredTva(inputDate);
  };

  const addTicketHandler = () => {
    if (enteredBrand.length <= 0 || enteredPrice.length <= 0) {
      return;
    }
    props.onAddTicket(enteredBrand, enteredPrice, date);
    setEnteredBrand("");
    setEnteredPrice("");
    setEnteredTva("");
    setDate(new Date(1598051730000));
  };

  const showMoreInputHandler = () => {
    if (toggleInput === "Plus d'\options") {
      setShowInput(styles.input);
      setToggleInput("Moins d'\options");
    } else {
      setShowInput(styles.hiddenInput);
      setToggleInput("Plus d'\options");
    }
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
            placeholder="Enseigne"
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
            maxLength={9}
            onChangeText={priceInputHandler}
            value={enteredPrice}
            keyboardType="number-pad"
          />
          <View style={styles.buttonContainer}>
          <Button onPress={showDatepicker} title="Date" color={colors.accent}/>
          <Button onPress={showTimepicker} title="Heure" color={colors.accent}/>
          </View>
          <TextInput
            placeholder="Prix TVA comprise"
            style={showInput}
            autoCorrect={false}
            maxLength={5}
            value={enteredTva}
            onChangeText={tvaInputHandler}
            keyboardType="number-pad"
          />
          <Button
            title={toggleInput}
            color={colors.white}
            style={styles.moreButton}
            onPress={showMoreInputHandler}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Annuler"
              color={colors.primary}
              onPress={props.onCancel}
            />
            <Button
              title="Ajouter"
              color={colors.accent}
              onPress={addTicketHandler}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
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

export default TicketInput;
