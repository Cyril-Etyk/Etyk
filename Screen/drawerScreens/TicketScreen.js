import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
} from "react-native";

import colors from "../../constants/colors";
import TicketItem from "../../components/TicketItem";
import TicketInput from "../../components/TicketInput";

{
  /* Fonction principale */
}

export default function TicketScreen({ navigation }) {
  {
    /* Initialisation des States */
  }

  const [newTicket, setNewTicket] = useState([]);
  const [ticketModal, setTicketModal] = useState(false);
  const [isDescending, setIsDescending] = useState(false);

  {
    /* Fonction permettant l'ajout d'un ticket à la liste des tickets */
  }

  const addTicketHandler = (brand, price, date) => {
    {
      /* Gestion du Logo et de la date du nouveau ticket */
    }
    let chosenLogo;
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
    if (brand.toLowerCase() === "etyk") {
      chosenLogo = require("../../Image/etyk.png");
    } else if (brand.toLowerCase() === "h&m") {
      chosenLogo = require("../../logos/HandM.jpg");
    } else if (brand.toLowerCase() === "zara") {
      chosenLogo = require("../../logos/zara.jpg");
    } else if (brand.toLowerCase() === "colruyt") {
      chosenLogo = require("../../logos/colruyt.jpg");
    } else if (brand.toLowerCase() === "timberland") {
      chosenLogo = require("../../logos/timberland.jpg");
    } else {
      chosenLogo = require("../../logos/NoLogo.png");
    }

    {
      /* Ajout du ticket à la liste de tickets */
    }

    setNewTicket((currentTickets) => [
      ...currentTickets,
      {
        id: Math.random().toString(),
        logo: chosenLogo,
        date: dateFinal,
        hour: heureFinal,
        brand: brand.toUpperCase(),
        price: price,
      },
    ]);
    setTicketModal(false);
  };

  const removeTicketHandler = (ticketId) => {
    setNewTicket((currentTickets) => {
      return currentTickets.filter((ticket) => ticket.id !== ticketId);
    });
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

  const goForFetch = () => {
    fetch('http://http:localhost:5000/api/users/registration', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test123',
        email: 'abc@def.be',
        password: '123456'
      })
    });
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        console.log(responseJson);
      })
      //If response is not in json then in error
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });
  };
  return (
    <View style={styles.screen}>
      <View style={styles.button}>
        <Button
          title="Ajouter un ticket"
          color={colors.primary}
          onPress={() => setTicketModal(true)}
        />
      </View>
      <View style={styles.button}>
        <Button title="Fetch" color={colors.primary} onPress={goForFetch} />
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
                itemData.item.hour +
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
    padding: 2,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
});
