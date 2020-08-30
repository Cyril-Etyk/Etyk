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
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

import colors from "../../constants/colors";
import TicketItem from "../../components/TicketItem";
import TicketAdd from "../../components/TicketAdd";
import { userIdKey, userTokenKey } from "../../constants/keys.js";

export default function TicketScreen({ navigation }) {
  {
    /* Initialisation des States */
  }
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [ticketModal, setTicketModal] = useState(false);
  const [isDescending, setIsDescending] = useState(false);

  useEffect(() => {
    fetch("http://165.232.75.50:5000/api/tickets")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [isLoading]);

  const removeTicketHandler = (ticketId) => {
    setData((data) => {
      return data.filter((ticket) => ticket._id !== ticketId);
    });
  };

  const refreshHandler = () => {
    setLoading(true);
  };
  const logoHandler = (brand) => {
    let chosenLogo;
    if (brand.toLowerCase() === "etyk") {
      return require("../../Image/etyk.png");
    } else if (brand.toLowerCase() === "h&m") {
      return require("../../logos/HandM.jpg");
    } else if (brand.toLowerCase() === "zara") {
      return require("../../logos/zara.jpg");
    } else if (brand.toLowerCase() === "colruyt") {
      return require("../../logos/colruyt.jpg");
    } else if (brand.toLowerCase() === "timberland") {
      return require("../../logos/timberland.jpg");
    } else {
      return require("../../logos/NoLogo.png");
    }
  };

  const typeHandler = (type) => {
    if (type.toLowerCase() === "manuel") {
      return require("../../logos/manuel.png");
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
              brand: brand,
              price: price,
              date: date,
              note: note,
              type: "manuel",
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
    setLoading(true);
  };

  const cancelTicketAddHandler = () => {
    setTicketModal(false);
  };

  const sortByDateHandler = () => {
    let sortedTicket = [...data];
    if (isDescending) {
      sortedTicket.sort(function (a, b) {
        var dateA = parseInt(a.date),
          dateB = parseInt(b.date);
        if (dateA < dateB) return -1;
        if (dateA > dateB) console.log(dateA, dateB);
        return 1;
        return 0; //default return value (no sorting)
      });
      setData(sortedTicket);
      setIsDescending(false);
    } else {
      sortedTicket.sort(function (a, b) {
        var dateA = parseInt(a.date),
          dateB = parseInt(b.date);
        if (dateA < dateB) return 1;
        if (dateA > dateB) console.log(dateA, dateB);
        return -1;
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
        var priceA = parseInt(a.price),
          priceB = parseInt(b.price);
        return priceA - priceB;
      });
      setData(sortedTicket);
      setIsDescending(false);
    } else {
      sortedTicket.sort(function (a, b) {
        var priceA = parseInt(a.price),
          priceB = parseInt(b.price);
        return priceB - priceA;
      });
      setData(sortedTicket);
      setIsDescending(true);
    }
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

      <View style={styles.buttonContainer}>
        <Button
          title="Trier par Date"
          color="grey"
          onPress={sortByDateHandler}
        />
        <Button
          title="Trier par marque"
          color="darkblue"
          onPress={sortByBrandHandler}
        />
        <Button
          title="Trier par prix"
          color="darkgreen"
          onPress={sortByPriceHandler}
        />
      </View>
      <View style={styles.refresh}>
        <Button
          title="Refresh"
          type="outline"
          color={colors.primary}
          onPress={refreshHandler}
        />
      </View>

      <TicketAdd
        visible={ticketModal}
        onAddTicket={addTicketHandler}
        onCancel={cancelTicketAddHandler}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => item._id}
          renderItem={({ item }) => (
            <TicketItem
              id={item._id}
              onDelete={removeTicketHandler}
              logo={logoHandler(item.brand)}
              manuel={typeHandler(item.type)}
              title={
                item.brand.toUpperCase() +
                "  -  " +
                item.date.substring(0, 10) +
                "  -  " +
                parseFloat(item.price.replace(",", ".")).toFixed(2).replace(".", ",") +
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
    padding: 15,
    marginBottom: 5,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 2,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  refresh: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 2,
  },
});
