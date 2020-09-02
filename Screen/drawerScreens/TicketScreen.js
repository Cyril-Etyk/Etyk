import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

import colors from "../../constants/colors";
import Ticket from "../../components/Ticket";
import TicketAdd from "../../components/TicketAdd";
import TicketInfo from "../../components/TicketInfo";
import { userIdKey, userTokenKey } from "../../constants/keys.js";

export default function TicketScreen({ navigation }) {
  {
    /* Initialisation des States */
  }
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [singeTicketData, setSingleTicketData] = useState("");
  const [ticketModal, setTicketModal] = useState(false);
  const [ticketInfoModal, setTicketInfoModal] = useState(false);
  const [isDescending, setIsDescending] = useState(false);

  useEffect(() => {
    try {
      AsyncStorage.getItem(userIdKey).then((userIdKey) => {
        fetch("http://165.232.75.50:5000/api/tickets/" + userIdKey)
          .then((response) => response.json())
          .then((json) => setData(json.reverse()))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      });
    } catch (e) {
      console.log(e);
    }
  }, [isLoading]);

  const removeTicketHandler = (toDelete) => {
    let toFetch = "http://165.232.75.50:5000/api/tickets/" + toDelete;
    fetch(toFetch, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: toDelete,
      }),
    })
      .then((response) => response.json())
      .then((json) => {})
      .catch((error) => {
        console.error(error);
      });
    setTicketInfoModal(false);
    setLoading(true);
  };

  const showTicketInfoModal = (ticketId) => {
    setSingleTicketData((singeTicketData) => {
      return data.filter((ticket) => ticket._id == ticketId);
    });
    setTicketInfoModal(true);
  };

  const refreshHandler = () => {
    setIsDescending(false);
    setLoading(true);
  };

  const logoHandler = (brand) => {
    let logo = brand.toLowerCase().replace(/\s/g, "");
    if (logo === "etyk") {
      return require("../../Image/etyk.png");
    } else if (logo === "h&m") {
      return require("../../logos/hetm.jpg");
    } else if (logo === "zara") {
      return require("../../logos/zara.jpg");
    } else if (logo === "colruyt") {
      return require("../../logos/colruyt.jpg");
    } else if (logo === "timberland") {
      return require("../../logos/timberland.jpg");
    } else {
      return require("../../logos/nologo.png");
    }
  };

  const typeHandler = (type) => {
    if (type.toLowerCase() === "manuel") {
      return require("../../Image/manuel.png");
    } else {
      return;
    }
  };

  const addTicketHandler = (brand, price, date, note) => {
    if (brand.length <= 0 || price.length <= 0) {
      return;
    }
    try {
      AsyncStorage.getItem(userIdKey)
        .then((userIdKey) => {
          fetch("http://165.232.75.50:5000/api/tickets", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: userIdKey,
              brand: brand.replace(/\s/g, ""),
              price: price,
              date: date,
              note: note,
              type: "Manuel",
            }),
          })
            .then((response) => response.json())
            .then((json) => {})
            .catch((error) => {
              console.error(error);
            });
        })
        .done();
    } catch (error) {}
    setTicketModal(false);
    sortByDateHandler();
    setLoading(true);
  };

  const cancelTicketAddHandler = () => {
    setTicketModal(false);
    setTicketInfoModal(false);
    setLoading(true);
  };

  const sortByDateHandler = () => {
    let sortedTicket = [...data];
    if (isDescending) {
      sortedTicket.sort(function (a, b) {
        var dateA = a.date,
          dateB = b.date;
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return 0; //default return value (no sorting)
      });
      setData(sortedTicket);
      setIsDescending(false);
    } else {
      sortedTicket.sort(function (a, b) {
        var dateA = a.date,
          dateB = b.date;
        if (dateA < dateB) return 1;
        if (dateA > dateB) return -1;
        return 0; //default return value (no sorting)
      });
      setData(sortedTicket);
      setIsDescending(true);
    }
  };

  const sortByBrandHandler = () => {
    let sortedTicket = [...data];
    if (isDescending) {
      sortedTicket.sort(function (a, b) {
        var brandA = a.brand.toLowerCase(),
          brandB = b.brand.toLowerCase();
        if (brandA < brandB) return -1;
        if (brandA > brandB) return 1;
        return 0;
      });
      setData(sortedTicket);
      setIsDescending(false);
    } else {
      sortedTicket.sort(function (a, b) {
        var brandA = a.brand.toLowerCase(),
          brandB = b.brand.toLowerCase();
        if (brandA < brandB) return 1;
        if (brandA > brandB) return -1;
        return;
      });
      setData(sortedTicket);
      setIsDescending(true);
    }
  };

  const sortByPriceHandler = () => {
    let sortedTicket = [...data];
    if (isDescending) {
      sortedTicket.sort(function (a, b) {
        var priceA = parseFloat(a.price.replace(",", ".")),
          priceB = parseFloat(b.price.replace(",", "."));
        return priceA - priceB;
      });
      setData(sortedTicket);
      setIsDescending(false);
    } else {
      sortedTicket.sort(function (a, b) {
        var priceA = parseFloat(a.price.replace(",", ".")),
          priceB = parseFloat(b.price.replace(",", "."));
        return priceB - priceA;
      });
      setData(sortedTicket);
      setIsDescending(true);
    }
  };

  const etykCardHandler = () => {
    global.currentScreenIndex = "CardScreen";
    navigation.navigate("CardScreen");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.button}>
        <Button
          title="Ajouter un ticket"
          color={colors.primary}
          onPress={() => setTicketModal(true)}
        />
      </View>
      <View style={styles.buttonEtyk}>
        <Button
          title="Carte ETYK"
          color={colors.focus}
          onPress={etykCardHandler}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Tri par Date" color="grey" onPress={sortByDateHandler} />
        <Button
          title="Tri par enseigne"
          color="darkblue"
          onPress={sortByBrandHandler}
        />
        <Button
          title="Tri par prix"
          color="darkgreen"
          onPress={sortByPriceHandler}
        />
      </View>
      <View style={styles.refresh}>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={refreshHandler}
        >
          <Image source={require("../../Image/refresh.png")} />
        </TouchableOpacity>
      </View>

      <TicketAdd
        visible={ticketModal}
        onAddTicket={addTicketHandler}
        onCancel={cancelTicketAddHandler}
      />

      {ticketInfoModal ? (
        <TicketInfo
          visible={true}
          data={singeTicketData}
          onCancel={cancelTicketAddHandler}
          onDelete={removeTicketHandler}
        />
      ) : null}

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => item._id}
          renderItem={({ item }) => (
            <Ticket
              id={item._id}
              onShow={showTicketInfoModal}
              logo={logoHandler(item.brand)}
              manuel={typeHandler(item.type)}
              title={
                item.brand.toUpperCase() +
                "  -  " +
                item.date.substring(0, 10) +
                "  -  " +
                parseFloat(item.price.replace(",", "."))
                  .toFixed(2)
                  .replace(".", ",") +
                "€"
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  button: {
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 2,
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 10,
  },
  refresh: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 2,
  },
  buttonEtyk: {
    padding: 5,
    marginBottom: 5,
    alignItems: "center",
  },
});
