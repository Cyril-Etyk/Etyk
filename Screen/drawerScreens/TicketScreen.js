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

import colors from "../../constants/colors";
import TicketItem from "../../components/TicketItem";
import TicketInput from "../../components/TicketInput";

export default function TicketScreen({ navigation }) {
  {
    /* Initialisation des States */
  }
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  const [newTicket, setNewTicket] = useState([]);
  const [ticketModal, setTicketModal] = useState(false);
  const [isDescending, setIsDescending] = useState(false);

  useEffect(() => {
    fetch("http://165.232.75.50:5000/api/tickets")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [data]);

  const removeTicketHandler = (ticketId) => {
    setNewTicket((data) => {
      return data.filter((ticket) => ticket._id !== ticketId);
    });
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

  const addTicketHandler = (brand, price, date) => {
    {
      /* Gestion du Logo et de la date du nouveau ticket */
    }

    const dateYear = date.getFullYear();
    const dateMonth = date.getMonth() + 1;
    const dateDay = date.getDate();
    const dateHour = date.getHours();
    const dateMinute = date.getMinutes();
    console.log(dateHour);
    const dateFinal = dateDay + "/" + dateMonth + "/" + dateYear;
    const heureFinal = dateHour + ":" + dateMinute;

    if (brand.length <= 0 || price.length <= 0) {
      return;
    }

    setNewTicket((currentTickets) => [
      ...currentTickets,
      {
        id: Math.random().toString(),
        date: dateFinal,
        hour: heureFinal,
        brand: brand.toUpperCase(),
        price: price,
      },
    ]);
    setTicketModal(false);
  };

  const cancelTicketAdditionHandler = () => {
    setTicketModal(false);
  };

  const sortByDateHandler = () => {
    let sortedTicket = [...newTicket];
    if (isDescending) {
      sortedTicket.sort(function (a, b) {
        var dateA = parseInt(a.date) + parseInt(a.hour),
          dateB = parseInt(b.date) + parseInt(b.hour);
        if (dateA < dateB)
          //sort string ascending
          return 1;
        if (dateA > dateB) return -1;
        return 0; //default return value (no sorting)
      });
      setNewTicket(sortedTicket);
      setIsDescending(false);
    } else {
      sortedTicket.sort(function (a, b) {
        var dateA = parseInt(a.date) + parseInt(a.hour),
          dateB = parseInt(b.date) + parseInt(b.hour);
        if (dateA < dateB)
          //sort string ascending
          return -1;
        if (dateA > dateB) return 1;
        return 0; //default return value (no sorting)
      });
      setNewTicket(sortedTicket);
      setIsDescending(true);
    }
  };

  const sortByBrandHandler = () => {
    let sortedTicket = [...newTicket];
    if (isDescending) {
      sortedTicket.sort(function (a, b) {
        var brandA = a.brand.toLowerCase(),
          brandB = b.brand.toLowerCase();
        if (brandA < brandB)
          //sort string ascending
          return -1;
        if (brandA > brandB) return 1;
        return 0; //default return value (no sorting)
      });
      setNewTicket(sortedTicket);
      setIsDescending(false);
    } else {
      sortedTicket.sort(function (a, b) {
        var brandA = a.brand.toLowerCase(),
          brandB = b.brand.toLowerCase();
        if (brandA < brandB)
          //sort string ascending
          return 1;
        if (brandA > brandB) return -1;
        return;
      });
      setNewTicket(sortedTicket);
      setIsDescending(true);
    }
  };

  const sortByPriceHandler = () => {
    let sortedTicket = [...newTicket];
    if (isDescending) {
      sortedTicket.sort(function (a, b) {
        var priceA = parseInt(a.price),
          priceB = parseInt(b.price);
        return priceA - priceB;
      });
      setNewTicket(sortedTicket);
      setIsDescending(false);
    } else {
      sortedTicket.sort(function (a, b) {
        var priceA = parseInt(a.price),
          priceB = parseInt(b.price);
        return priceB - priceA;
      });
      setNewTicket(sortedTicket);
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

      <TicketInput
        visible={ticketModal}
        onAddTicket={addTicketHandler}
        onCancel={cancelTicketAdditionHandler}
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
              title={
                item.brand.toUpperCase() +
                "  -  " +
                item.date.substring(0, 10) +
                "  -  " +
                item.price +
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
});
