import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";

import colors from "../../constants/colors";
import TicketItem from "../../components/TicketItem";
import TicketInput from "../../components/TicketInput";

export default function TicketScreen({ navigation }) {
  const [newTicket, setNewTicket] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
<<<<<<< Updated upstream:screens/TicketScreen.js
=======
  const [isDescending, setIsDescending] = useState(true);

  {
    /* Fonction permettant l'ajout d'un ticket à la liste des tickets */
  }
>>>>>>> Stashed changes:Screen/drawerScreens/TicketScreen.js

  const addTicketHandler = ( brand, price) => {
    let chosenLogo;
    if (
      brand.length <= 0 ||
      price.length <= 0
    ) {
      return;
    }
<<<<<<< Updated upstream:screens/TicketScreen.js
    if (brand === 'Etyk' || brand === 'etyk'){
      chosenLogo = require('../logos/Etyk.jpg');
    } else if (brand === 'H&M' || brand === 'h&m') {
      chosenLogo = require('../logos/HandM.jpg');
    } else {
      chosenLogo = require('../logos/NoLogo.png');
=======
    if (brand.toLowerCase() === "etyk") {
      chosenLogo = require("../../logos/Etyk.jpg");
    } else if (brand.toLowerCase() === "h&m") {
      chosenLogo = require("../../logos/HandM.jpg");
    } else {
      chosenLogo = require("../../logos/NoLogo.png");
    }

    {
      /* Ajout du ticket à la liste de tickets */
>>>>>>> Stashed changes:Screen/drawerScreens/TicketScreen.js
    }
    setNewTicket((currentTickets) => [
      ...currentTickets,
      {
        id: Math.random().toString(),
        logo: chosenLogo,
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

  const searchContacts = (value) => {
    const FilteredDates = newTicket.filter();
  };

<<<<<<< Updated upstream:screens/TicketScreen.js
  const date = new Date().toLocaleDateString();
=======
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
>>>>>>> Stashed changes:Screen/drawerScreens/TicketScreen.js

  return (
    <View style={styles.screen}>
    <View style={styles.addButtonContainer}>
      <TouchableOpacity
      activeOpacity={0.8}
        style={styles.addButton}
        onPress={() => setIsAddMode(true)}
      >
        <Text style={styles.addButtontext}>Ajouter un ticket</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Trier par Date" color="lightgrey" />
        <Button title="Trier par marque" color="lightblue" />
        <Button title="Trier par prix" color="lightgreen" />
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
                date +
                "20  -  " +
                itemData.item.brand +
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
  addButtonContainer:{
        alignItems: "center",
        justifyContent:'center',
        },
  addButton: {
    borderColor: "red",
    borderRadius: 100,
    backgroundColor: colors.primary,
    padding: 10,
    margin: 10,

    alignItems:'center',
  },
  addButtontext:{
    fontWeight:'bold',
    fontSize: 17,
    color: 'white'
  },
  searchBar: {
    backgroundColor: "white",
    height: 50,
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
});
