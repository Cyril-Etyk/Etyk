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
  FlatList,
} from "react-native";
import colors from "../constants/colors";
import Ticket from "../components/Ticket";

const SearchPane = (props) => {
  const data = props.data;
  const [dataToFilter, setDataToFilter] = useState(data);

  const showTicketInfoModal = (ticketId) => {
    props.onCancel(ticketId);
  };

  const filterTicketHandler = (filterText) => {
    setDataToFilter((dataToFilter) => {
      return data.filter(
        (ticket) =>
          ticket.brand.toUpperCase().includes(filterText.toUpperCase()) |
          ticket.totalPrice.replace(".",",").includes(filterText) |
          ticket.date.includes(filterText) |
          ticket.note.toUpperCase().includes(filterText.toUpperCase())
      );
    });
  };

  const logoHandler = (brand) => {
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

  const typeHandler = (type) => {
    if (type.toLowerCase() === "manuel") {
      return require("../Image/manuel.png");
    } else {
      return;
    }
  };

  return (
    <Modal visible={props.visible} animationType="fade">
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={styles.screen}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={filterTicketHandler}
              placeholder="Timberland |  22€ |  2021-01-01 " //exemple@abc.com
              placeholderTextColor="grey"
              maxLength={23}
              blurOnSubmit={false}
              autoCapitalize="characters"
            />
            <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5}>
              <Image source={require("../Image/Search.png")} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={dataToFilter}
            keyExtractor={(item, index) => item._id}
            renderItem={({ item }) => (
              <Ticket
                id={item._id}
                onShow={showTicketInfoModal}
                logo={logoHandler(item.brand)}
                manuel={typeHandler(item.type)}
                title={
                  item.date.substring(8, 10) +
                  item.date.substring(4, 7) +
                  "-" +
                  item.date.substring(0, 4) +
                  "     " +
                  parseFloat(item.totalPrice.replace(",", "."))
                    .toFixed(2)
                    .replace(".", ",") +
                  "€"
                }
              />
            )}
          />

          <View style={styles.button}>
            <Button
              title="Retour"
              color={colors.primary}
              onPress={props.onReturn}
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
  inputStyle: {
    color: "black",
    borderWidth: 1,
    borderColor: "black",
    fontWeight: "bold",
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 15,
  },
  button: {
    margin: 25,
    justifyContent: "space-between",
  },
  searchBar: {
    flexDirection: "row",
    margin: 5,
    marginTop: 25,
  },
  buttonStyle: {
    padding: 5,
    marginLeft: 5,
  },
});

export default SearchPane;
