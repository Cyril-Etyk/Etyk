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
} from "react-native";
import colors from "../constants/colors";

const TicketInfo = (props) => {
  const data = props.data[0];
  const [manualTicket, setManualTicket] = useState(false);

  useEffect(() => {
    addressHandler();
    if (data.type == "Manuel") {
      setManualTicket(true);
    } else {
      setManualTicket(false);
    }
  }, []);

  const brand = data.brand.toUpperCase();
  const price = data.price;
  const priceHt =
    parseFloat(price.replace(",", ".")).toFixed(2).replace(".", ",") + "€";
  const priceT = parseFloat(price.replace(",", ".")) * 1.21;
  const priceTTC = parseFloat(priceT).toFixed(2).replace(".", ",") + "€";

  const date = data.date.substring(0, 10) + "  " + data.date.substring(11, 19);
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

  const [adres, setAdres] = useState("");
  const addressHandler = () => {
    const address = brand.toLowerCase().replace(/\s/g, "");
    if (address === "etyk") {
      setAdres("Rue des Pirouettes 24, 1050 Ixelles");
    } else if (address === "h&m") {
      setAdres("Rue Neuve 17/21, 1000 Bruxelles");
    } else if (address === "zara") {
      setAdres("Avenue de la Toison d'Or 25/29, 1000 Bruxelles");
    } else if (address === "colruyt") {
      setAdres("Avenue des Anciens Combattants 42, 1140 Evere");
    } else if (address === "timberland") {
      setAdres("Rue du Marché Aux Herbes 20, 1000 Bruxelles");
    } else {
      setAdres("Pas encore partenaire d'ETYK");
    }
  };

  const logoHandler = () => {
    let logo = brand.toLowerCase().replace(/\s/g, "");
    if (logo === "etyk") {
      return require("../Image/etyk.png");
    } else if (logo === "h&m") {
      return require("../logos/hetm.jpg");
    } else if (logo === "zara") {
      return require("../logos/zara.jpg");
    } else if (logo === "colruyt") {
      return require("../logos/colruyt.jpg");
    } else if (logo === "timberland") {
      return require("../logos/timberland.jpg");
    } else {
      return require("../logos/nologo.png");
    }
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={styles.screen}>
          <Image
            source={logoHandler()}
            style={{ resizeMode: "contain", margin: 30 }}
          />

          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Enseigne: </Text>
              <Text style={styles.textInfo}>{brand}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Adresse: </Text>
              <Text onLoad={addressHandler} style={styles.textInfo}>
                {adres}
              </Text>
            </View>
          </View>
          <View style={styles.articleContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>T-shirt homme M: </Text>
              <Text style={styles.textInfo}>12€/u</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Quantité: </Text>
              <Text style={styles.textInfo}>3</Text>
            </View>
            <View style={styles.articleContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Chausettes Sport: </Text>
                <Text style={styles.textInfo}>1,16€/u</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Quantité: </Text>
                <Text style={styles.textInfo}>3</Text>
              </View>
            </View>
            <View style={styles.articleContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Promotion : </Text>
                <Text style={styles.textInfo}>-5€</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Prix HT: </Text>
                <Text style={styles.textInfo}>{priceHt}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Prix TTC: </Text>
                <Text style={styles.textInfo}>{priceTTC}</Text>
              </View>
            </View>
          </View>

                  <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Date d'émission: </Text>
            <Text style={styles.textInfo}>{date}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>N° de transaction: </Text>
            <Text style={styles.textInfo}>xyz3323dfdf11</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Type de ticket: </Text>
            <Text style={styles.textInfo}>{type}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Note: </Text>
            <Text style={styles.textInfo}>{note}</Text>
          </View>
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
    padding: 2,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  text: {
    fontWeight: "bold",
  },
  textInfo: {
    fontWeight: "bold",
    color: "blue",
  },
  button: {
    marginTop: 20,
    justifyContent: "space-between",
  },
  articleContainer: {
    marginVertical: 7,
    alignItems: "flex-start",
  },
  container: {
    marginVertical: 7,
    alignItems: "flex-start",
  },
});

export default TicketInfo;
