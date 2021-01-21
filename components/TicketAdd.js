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
  TouchableOpacity,
  Image,
} from "react-native";
import colors from "../constants/colors";
import DateTimePicker from "@react-native-community/datetimepicker";

const TicketAdd = (props) => {
  //Date and time picker functions
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

  //Other data handler functions
  const [showArticle, setShowArticle] = useState(false);
  const [showArticle3, setShowArticle3] = useState(false);
  const [brand, setBrand] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [region, setRegion] = useState("");
  const [telNr, setTelNr] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [note, setNote] = useState("");
  const [articles, setArticles] = useState([]);
  const [article1, setArticle1] = useState("");
  const [price1, setPrice1] = useState("");
  const [amount1, setAmount1] = useState("");
  const [article2, setArticle2] = useState("");
  const [price2, setPrice2] = useState("");
  const [amount2, setAmount2] = useState("");
  const [article3, setArticle3] = useState("");
  const [price3, setPrice3] = useState("");
  const [amount3, setAmount3] = useState("");

  const brandInputHandler = (input) => {
    setBrand(input.replace(/[^a-zA-Z& ]/g, ""));
  };
  const streetInputHandler = (input) => {
    setStreet(input.replace(/[^a-zA-Z& ^0-9]/g, ""));
  };
  const numberHandler = (input) => {
    setNumber(input.replace(/[^0-9]/g, ""));
  };
  const postalCodeInputHandler = (input) => {
    setPostalCode(input.replace(/[^0-9]/g, ""));
  };
  const regionInputHandler = (input) => {
    setRegion(input.replace(/[^a-zA-Z- ]/g, ""));
  };
  const telNrInputHandler = (input) => {
    setTelNr(input.replace(/[^0-9,]/g, ""));
  };
  const article1Handler = (input) => {
    setArticle1(input.replace(/[^a-zA-Z& ^0-9]/g, ""));
  };
  const price1Handler = (input) => {
    setPrice1(input.replace(/[^0-9,]/g, ""));
  };
  const amount1Handler = (input) => {
    setAmount1(input.replace(/[^0-9]/g, ""));
  };
  const article2Handler = (input) => {
    setArticle2(input.replace(/[^a-zA-Z& ^0-9]/g, ""));
  };
  const price2Handler = (input) => {
    setPrice2(input.replace(/[^0-9,]/g, ""));
  };
  const amount2Handler = (input) => {
    setAmount2(input.replace(/[^0-9]/g, ""));
  };
  const article3Handler = (input) => {
    setArticle3(input.replace(/[^a-zA-Z& ^0-9]/g, ""));
  };
  const price3Handler = (input) => {
    setPrice3(input.replace(/[^0-9,]/g, ""));
  };
  const amount3Handler = (input) => {
    setAmount3(input.replace(/[^0-9]/g, ""));
  };
  const noteInputHandler = (input) => {
    setNote(input.replace(/[<>]/g, ""));
  };

  const addTicketHandler = () => {
    const validatePrice = (price) => {
      var re = /^\d+(,\d{1,2})?$/;
      return re.test(price);
    };
    if (
      brand.length <= 0 ||
      street.length <= 0 ||
      number.length <= 0 ||
      postalCode.length <= 0 ||
      region.length <= 0 ||
      article1.length <= 0 ||
      price1.length <= 0 ||
      amount1.length <= 0
    ) {
      alert(
        "Veuillez au minimum compléter l'enseigne et les données d'un article"
      );
      return;
    }

    if (article2.length <= 0 && price2.length <= 0 && amount2.length <= 0) {
      setTotalPrice(parseFloat(price1.replace(",", ".")) * amount1);
      setArticles([article1, price1, amount1]);
      if (!validatePrice(price1)) {
        alert(
          "Le prix encodé pour le premier article ne doit contenir que 2 décimales"
        );
        return;
      }
      if (articles[0] !== undefined) {
        setStreet(street + " " + number);
        props.onAddTicket(
          brand,
          street,
          postalCode,
          region,
          telNr,
          articles,
          totalPrice,
          note,
          date
        );
        setBrand("");
        setStreet("");
        setPostalCode("");
        setRegion("");
        setTelNr("");
        setArticles([]);
        setArticle1("");
        setPrice1("");
        setAmount1("");
        setArticle2("");
        setPrice2("");
        setAmount2("");
        setArticle3("");
        setPrice3("");
        setAmount3("");
        setShowArticle(false);
        setNote("");
        setTotalPrice("");
        setDate(new Date());
      } else {
        return;
      }
    } else if (
      article2.length <= 0 ||
      price2.length <= 0 ||
      amount2.length <= 0
    ) {
      alert("L'article 2 n'est pas entièrement complété");
      return;
    } else if (
      article3.length <= 0 &&
      price3.length <= 0 &&
      amount3.length <= 0
    ) {
      setTotalPrice(
        parseFloat(price1.replace(",", ".")) * amount1 +
          parseFloat(price2.replace(",", ".")) * amount2
      );
      setArticles([article1, price1, amount1, article2, price2, amount2]);
      if (!validatePrice(price1)) {
        alert(
          "Le prix encodé pour le premier article ne doit contenir que 2 décimales"
        );
        return;
      }
      if (!validatePrice(price2)) {
        alert(
          "Le prix encodé pour le deuxième article ne doit contenir que 2 décimales"
        );
        return;
      }
      if (articles[0] !== undefined) {
        setStreet(street + " " + number);
        props.onAddTicket(
          brand,
          street,
          postalCode,
          region,
          telNr,
          articles,
          totalPrice,
          note,
          date
        );
        setBrand("");
        setStreet("");
        setPostalCode("");
        setRegion("");
        setTelNr("");
        setArticles([]);
        setArticle1("");
        setPrice1("");
        setAmount1("");
        setArticle2("");
        setPrice2("");
        setAmount2("");
        setArticle3("");
        setPrice3("");
        setAmount3("");
        setShowArticle(false);
        setNote("");
        setTotalPrice("");
        setDate(new Date());
      } else {
        return;
      }
    } else if (
      article3.length <= 0 ||
      price3.length <= 0 ||
      amount3.length <= 0
    ) {
      alert("L'article 3 n'est pas entièrement complété");
      return;
    } else {
      if (!validatePrice(price1)) {
        alert(
          "Le prix encodé pour le premier article ne doit contenir que 2 décimales"
        );
        return;
      }
      if (!validatePrice(price2)) {
        alert(
          "Le prix encodé pour le deuxième article ne doit contenir que 2 décimales"
        );
        return;
      }
      if (!validatePrice(price3)) {
        alert(
          "Le prix encodé pour le troisième article ne doit contenir que 2 décimales"
        );
        return;
      }
      setTotalPrice(
        parseFloat(price1.replace(",", ".")) * amount1 +
          parseFloat(price2.replace(",", ".")) * amount2 +
          parseFloat(price3.replace(",", ".")) * amount3
      );
      setArticles([
        article1,
        price1,
        amount1,
        article2,
        price2,
        amount2,
        article3,
        price3,
        amount3,
      ]);
      if (articles[0] !== undefined) {
        setStreet(street + " " + number);
        props.onAddTicket(
          brand,
          street,
          postalCode,
          region,
          telNr,
          articles,
          totalPrice,
          note,
          date
        );
        setBrand("");
        setStreet("");
        setPostalCode("");
        setRegion("");
        setTelNr("");
        setArticles([]);
        setArticle1("");
        setPrice1("");
        setAmount1("");
        setArticle2("");
        setPrice2("");
        setAmount2("");
        setArticle3("");
        setPrice3("");
        setAmount3("");
        setShowArticle(false);
        setNote("");
        setTotalPrice("");
        setDate(new Date());
      } else {
        return;
      }
    }
  };

  const addArticleHandler = () => {
    if (!showArticle) {
      setShowArticle(true);
    } else if (showArticle) {
      setShowArticle3(true);
    } else {
      return;
    }
  };
  const deleteArticle2Handler = () => {
    setShowArticle(false);
    setArticle2("");
    setPrice2("");
    setAmount2("");
  };

  const deleteArticle3Handler = () => {
    setShowArticle3(false);
    setArticle3("");
    setPrice3("");
    setAmount3("");
  };

  const cancelAddHandler = () => {
    props.onCancel();
    setBrand("");
    setArticle1("");
    setPrice1("");
    setAmount1("");
    setArticle2("");
    setPrice2("");
    setAmount2("");
    setArticle3("");
    setPrice3("");
    setAmount3("");
    setShowArticle(false);
    setNote("");
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
            placeholder="Enseigne"
            style={styles.inputBrand}
            autoCorrect={false}
            maxLength={15}
            onChangeText={brandInputHandler}
            value={brand}
            autoCapitalize="characters"
            ref={(ref) => {
              this._brand = ref;
            }}
            returnKeyType="next"
            onSubmitEditing={() => this._street && this._street.focus()}
            blurOnSubmit={false}
          />
          <View style={styles.articleContainer}>
            <TextInput
              placeholder="Rue"
              style={styles.input}
              autoCorrect={false}
              maxLength={20}
              onChangeText={streetInputHandler}
              value={street}
              autoCapitalize="characters"
              ref={(ref) => {
                this._street = ref;
              }}
              returnKeyType="next"
              onSubmitEditing={() => this._number && this._number.focus()}
              blurOnSubmit={false}
            />
            <TextInput
              placeholder="Numéro"
              style={styles.input}
              autoCorrect={false}
              maxLength={4}
              onChangeText={numberHandler}
              value={number}
              autoCapitalize="characters"
              ref={(ref) => {
                this._number = ref;
              }}
              returnKeyType="next"
              onSubmitEditing={() => this._cp && this._cp.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.articleContainer}>
            <TextInput
              placeholder="CP"
              style={styles.input}
              autoCorrect={false}
              maxLength={4}
              onChangeText={postalCodeInputHandler}
              value={postalCode}
              ref={(ref) => {
                this._cp = ref;
              }}
              returnKeyType="next"
              onSubmitEditing={() => this._region && this._region.focus()}
              blurOnSubmit={false}
            />
            <TextInput
              placeholder="Ville"
              style={styles.input}
              autoCorrect={false}
              maxLength={15}
              onChangeText={regionInputHandler}
              value={region}
              ref={(ref) => {
                this._region = ref;
              }}
              returnKeyType="next"
              onSubmitEditing={() => this._telnr && this._telnr.focus()}
              blurOnSubmit={false}
            />
          </View>
          <TextInput
            placeholder="Numéro de téléphone"
            style={styles.inputTelNr}
            autoCorrect={false}
            maxLength={10}
            onChangeText={telNrInputHandler}
            value={telNr}
            ref={(ref) => {
              this._telnr = ref;
            }}
            returnKeyType="next"
            onSubmitEditing={() => this._article1 && this._article1.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            placeholder="Article 1"
            style={styles.inputArticle}
            autoCorrect={false}
            maxLength={15}
            onChangeText={article1Handler}
            value={article1}
            autoCapitalize="characters"
            ref={(ref) => {
              this._article1 = ref;
            }}
            returnKeyType="next"
            onSubmitEditing={() => this._price1 && this._price1.focus()}
            blurOnSubmit={false}
          />
          <View style={styles.articleContainer}>
            <TextInput
              placeholder="Prix"
              style={styles.inputArticleTop}
              autoCorrect={false}
              maxLength={10}
              onChangeText={price1Handler}
              value={price1}
              keyboardType="decimal-pad"
              ref={(ref) => {
                this._price1 = ref;
              }}
              returnKeyType="next"
              onSubmitEditing={() => this._nombre1 && this._nombre1.focus()}
              blurOnSubmit={false}
            />
            <TextInput
              placeholder="Nombre"
              style={styles.inputArticleTop}
              autoCorrect={false}
              maxLength={3}
              onChangeText={amount1Handler}
              value={amount1}
              keyboardType="numeric"
              ref={(ref) => {
                this._nombre1 = ref;
              }}
              returnKeyType="next"
              onSubmitEditing={() => this._note && this._note.focus()}
              blurOnSubmit={false}
            />
          </View>
          {showArticle ? (
            <TextInput
              placeholder="Article 2"
              style={styles.inputArticle}
              autoCorrect={false}
              maxLength={15}
              onChangeText={article2Handler}
              value={article2}
            />
          ) : null}
          {showArticle ? (
            <View style={styles.articleButtonContainer}>
              <TextInput
                placeholder="Prix"
                style={styles.inputArticleTop}
                autoCorrect={false}
                maxLength={10}
                onChangeText={price2Handler}
                value={price2}
                keyboardType="decimal-pad"
              />
              <TextInput
                placeholder="Nombre"
                style={styles.inputArticleTop}
                autoCorrect={false}
                maxLength={3}
                onChangeText={amount2Handler}
                value={amount2}
                keyboardType="numeric"
              />
              {!showArticle3 ? (
                <View style={styles.deleteArticle}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={deleteArticle2Handler}
                  >
                    <Image source={require("../Image/bin.png")} />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          ) : null}
          {showArticle3 ? (
            <TextInput
              placeholder="Article 3"
              style={styles.inputArticle}
              autoCorrect={false}
              maxLength={15}
              onChangeText={article3Handler}
              value={article3}
            />
          ) : null}
          {showArticle3 ? (
            <View style={styles.articleButtonContainer}>
              <TextInput
                placeholder="Prix"
                style={styles.inputArticleTop}
                autoCorrect={false}
                maxLength={10}
                onChangeText={price3Handler}
                value={price3}
                keyboardType="decimal-pad"
              />
              <TextInput
                placeholder="Nombre"
                style={styles.inputArticleTop}
                autoCorrect={false}
                maxLength={3}
                onChangeText={amount3Handler}
                value={amount3}
                keyboardType="numeric"
              />
              <View style={styles.deleteArticle}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={deleteArticle3Handler}
                >
                  <Image source={require("../Image/bin.png")} />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          <View style={styles.addArticle}>
            <Button
              title="Ajouter article"
              color={colors.focus}
              onPress={addArticleHandler}
            />
          </View>
          <TextInput
            placeholder="Note"
            style={styles.input}
            autoCorrect={false}
            maxLength={25}
            onChangeText={noteInputHandler}
            value={note}
            ref={(ref) => {
              this._note = ref;
            }}
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
          />
          <View style={styles.buttonContainer}>
            <Button
              onPress={showDatepicker}
              title="Date"
              color={colors.focus}
            />
            <Button
              onPress={showTimepicker}
              title="Heure"
              color={colors.focus}
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
    justifyContent:"center",
    alignItems: "center",
    flex: 1,
  },
  articleContainer: {
    flexDirection: "row",
    width: "50%",
  },
  articleButtonContainer: {
    flexDirection: "row",
    width: "45%",
  },
  addArticle: {
    marginBottom: 7,
  },
  deleteArticle: {
    fontSize: 6,
    marginBottom: 7,
    margin: 1,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 5,
    width: "48%",
    borderRadius: 5,
    margin: 1,
  },
  inputBrand: {
    marginTop: 25,
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 5,
    width: "50%",
    borderRadius: 5,
    margin: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "45%",
    marginVertical: 5,
  },
  inputTop: {
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 10,
    width: "50%",
    borderRadius: 5,
    margin: 1,
    marginBottom: 7,
  },
  inputArticle: {
    marginTop: 5,
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 10,
    width: "40%",
    borderRadius: 5,
    margin: 1,
  },
  inputArticleTop: {
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 5,
    width: "45%",
    borderRadius: 5,
    margin: 1,
    marginBottom: 7,
  },
  inputTelNr: {
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 10,
    width: "50%",
    borderRadius: 5,
    margin: 1,
    marginBottom: 7,
  },
});

export default TicketAdd;
