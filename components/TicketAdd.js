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
  const [brand, setBrand] = useState("");
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
      setTotalPrice(parseFloat(price1.replace(",",".")) * amount1);
      setArticles([article1, price1, amount1]);
      if (!validatePrice(price1)) {
        alert(
          "Le prix encodé pour le premier article ne doit contenir que 2 décimales"
        );
        return;
      }
      if (articles[0] !== undefined) {
        props.onAddTicket(brand, articles, totalPrice, note, date);
        setBrand("");
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
      setTotalPrice(parseFloat(price1.replace(",",".")) * amount1 + parseFloat(price2.replace(",",".")) * amount2);
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
        props.onAddTicket(brand, articles, totalPrice, note, date);
        setBrand("");
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
      setTotalPrice(parseFloat(price1.replace(",",".")) * amount1 + parseFloat(price2.replace(",",".")) * amount2 + parseFloat(price3.replace(",",".")) * amount3);
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
        props.onAddTicket(brand, articles, totalPrice, note, date);
      } else {
        return;
      }
    }
  };

  const addArticleHandler = () => {
    setShowArticle(true);
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
            style={styles.input}
            autoCorrect={false}
            maxLength={15}
            onChangeText={brandInputHandler}
            value={brand}
            autoCapitalize="characters"
          />
          <TextInput
            placeholder="Article 1"
            style={styles.input}
            autoCorrect={false}
            maxLength={15}
            onChangeText={article1Handler}
            value={article1}
            autoCapitalize="characters"
          />
          <View style={styles.articleContainer}>
            <TextInput
              placeholder="Prix"
              style={styles.input}
              autoCorrect={false}
              maxLength={10}
              onChangeText={price1Handler}
              value={price1}
              keyboardType="decimal-pad"
            />
            <TextInput
              placeholder="Nombre"
              style={styles.input}
              autoCorrect={false}
              maxLength={3}
              onChangeText={amount1Handler}
              value={amount1}
              keyboardType="numeric"
            />
          </View>
          <TextInput
            placeholder="Article 2"
            style={styles.input}
            autoCorrect={false}
            maxLength={15}
            onChangeText={article2Handler}
            value={article2}
          />
          <View style={styles.articleContainer}>
            <TextInput
              placeholder="Prix"
              style={styles.input}
              autoCorrect={false}
              maxLength={10}
              onChangeText={price2Handler}
              value={price2}
              keyboardType="decimal-pad"
            />
            <TextInput
              placeholder="Nombre"
              style={styles.input}
              autoCorrect={false}
              maxLength={3}
              onChangeText={amount2Handler}
              value={amount2}
              keyboardType="numeric"
            />
          </View>
          {showArticle ? (
            <TextInput
              placeholder="Article 3"
              style={styles.input}
              autoCorrect={false}
              maxLength={15}
              onChangeText={article3Handler}
              value={article3}
            />
          ) : null}
          {showArticle ? (
            <View style={styles.articleContainer}>
              <TextInput
                placeholder="Prix"
                style={styles.input}
                autoCorrect={false}
                maxLength={10}
                onChangeText={price3Handler}
                value={price3}
                keyboardType="decimal-pad"
              />
              <TextInput
                placeholder="Nombre"
                style={styles.input}
                autoCorrect={false}
                maxLength={3}
                onChangeText={amount3Handler}
                value={amount3}
                keyboardType="numeric"
              />
            </View>
          ) : null}
          <View style={styles.addArticle}>
            <Button
              title="Ajouter un article"
              color={colors.accent}
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
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  articleContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "45%",
  },
  addArticle: {
    marginVertical: 5,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 3,
    paddingHorizontal: 10,
    backgroundColor: "white",
    width: "65%",
    margin: 2,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "45%",
    marginVertical: 5,
  },
});

export default TicketAdd;
