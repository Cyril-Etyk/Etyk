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
} from "react-native";
import colors from "../constants/colors";

const TicketInfo = (props) => {
  const data = props.data[0];
  const [manualTicket, setManualTicket] = useState(false);

  useEffect(() => {
    if (data.type == "Manuel") {
      setManualTicket(true);
    } else {
      setManualTicket(false);
    }
  }, []);

  const brand = data.brand.toUpperCase();
  const price =
    parseFloat(data.price.replace(",", ".")).toFixed(2).replace(".", ",") + "€";
  const date =
    data.date.substring(11, 19) + "  -  " + data.date.substring(0, 10);
  const note = data.note;

  const type = data.type;

  const deleteButtonHandler = () => {
    Alert.alert(
      "Supprimer",
      "Êtes vous sûr de vouloir supprimer?",
      [
        {
          text: "Annuler",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Confirmer",
          onPress: () => {
            props.onDelete(data._id);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={styles.screen}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Enseigne : </Text>
            <Text style={styles.textInfo}>{brand}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Prix : </Text>
            <Text style={styles.textInfo}>{price}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Date : </Text>
            <Text style={styles.textInfo}>{date}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Note : </Text>
            <Text style={styles.textInfo}>{note}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Type de ticket : </Text>
            <Text style={styles.textInfo}>{type}</Text>
          </View>

          <View style={styles.button}>
            <Button
              title="Retour"
              color={colors.primary}
              onPress={props.onCancel}
              style={styles.button}
            />
          </View>
          {manualTicket ? (
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={deleteButtonHandler}
              >
                <Image source={require("../Image/bin.png")} />
              </TouchableOpacity>
            </View>
          ) : null}
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
  },
  textContainer: {
    padding: 5,
    flexDirection: "row",
    width: "45%",
  },
  text: {
    padding: 3,
    marginVertical: 2,
    fontWeight: "bold",
  },
  textInfo: {
    padding: 3,
    marginVertical: 2,
    fontWeight: "bold",
    color: "blue",
  },
  button: {
    marginTop: 20,
    justifyContent: "space-between",
  },
});

export default TicketInfo;
