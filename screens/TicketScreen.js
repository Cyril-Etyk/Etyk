import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
} from "react-native";

import colors from "../constants/colors";
import TicketItem from "../components/TicketItem";
import TicketInput from "../components/TicketInput";

{
  /* Fonction principale */
}

export default function TicketScreen({ navigation }) {
  {
    /* Initialisation des States */
  }

  const [newTicket, setNewTicket] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isDescending, setIsDescending] = useState(false);

  {
    /* Fonction permettant l'ajout d'un ticket à la liste des tickets */
  }

  const addTicketHandler = (brand, price) => {
    {
      /* Gestion du Logo et de la date du nouveau ticket */
    }
    let chosenLogo;
    const dateStart = new Date();
    const dateYear = dateStart.getFullYear();
    const dateMonth = dateStart.getMonth() + 1;
    const dateDay = dateStart.getDate();
    const dateHour = dateStart.getHours();
    const dateMinute = dateStart.getMinutes();
    const date =
      dateDay +
      "/" +
      dateMonth +
      "/" +
      dateYear +
      " - " +
      dateHour +
      ":" +
      dateMinute;

    if (brand.length <= 0 || price.length <= 0) {
      return;
    }
    if (brand.toLowerCase() === "etyk") {
      chosenLogo = require("../logos/Etyk.jpg");
    } else if (brand.toLowerCase() === "h&m") {
      chosenLogo = require("../logos/HandM.jpg");
    } else {
      chosenLogo = require("../logos/NoLogo.png");
    }

    {
      /* Ajout du ticket à la liste de tickets */
    }

    setNewTicket((currentTickets) => [
      ...currentTickets,
      {
        id: Math.random().toString(),
        logo: chosenLogo,
        date: date,
        brand: brand,
        price: price,
      },
    ]);
    setIsAddMode(false);
  };

  const removeTicketHandler = (ticketId) => {
    setNewTicket((currentTickets) => {
      return currentTickets.filter((ticket) => ticket.id !== ticketId);
    });
  };

  const cancelTicketAdditionHandler = () => {
    setIsAddMode(false);
  };

  const sortByDateHandler = () => {
    let sortedTicket = [...newTicket];
    if (isDescending) {
      sortedTicket.sort(function (a, b) {
        var dateA = a.date,
          dateB = b.date;
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
        var dateA = a.date,
          dateB = b.date;
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
        var priceA = a.price,
          priceB = b.price;
        return priceA - priceB;
      });
      setNewTicket(sortedTicket);
      setIsDescending(false);
    } else {
      sortedTicket.sort(function (a, b) {
        var priceA = a.price,
          priceB = b.price;
        return priceB - priceA;
      });
      setNewTicket(sortedTicket);
      setIsDescending(true);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.button}>
        <Button
          title="Ajouter un ticket"
          color={colors.primary}
          onPress={() => setIsAddMode(true)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Trier par Date"
          color="lightgrey"
          onPress={sortByDateHandler}
        />
        <Button
          title="Trier par marque"
          color="lightblue"
          onPress={sortByBrandHandler}
        />
        <Button
          title="Trier par prix"
          color="lightgreen"
          onPress={sortByPriceHandler}
        />
      </View>

      <TicketInput
        visible={isAddMode}
        onAddTicket={addTicketHandler}
        onCancel={cancelTicketAdditionHandler}
      />

      <View style={styles.screen}>
        <FlatList
          renderHeader={() => {}}
          keyExtractor={(item, index) => item.id}
          data={newTicket}
          renderItem={(itemData) => (
            <TicketItem
              id={itemData.item.id}
              onDelete={removeTicketHandler}
              logo={itemData.item.logo}
              title={
                itemData.item.brand +
                "  -  " +
                itemData.item.date +
                "  -  " +
                itemData.item.price +
                "€"
              }
            />
          )}
        />
      </View>
    </View>
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
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
});
