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

export default function TicketScreen({ navigation }) {
  const [newTicket, setNewTicket] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addTicketHandler = ( brand, price) => {
    let chosenLogo;
    if (
      brand.length <= 0 ||
      price.length <= 0
    ) {
      return;
    }
    if (brand === 'Etyk' || brand === 'etyk'){
      chosenLogo = require('../logos/Etyk.jpg');
    } else if (brand === 'H&M' || brand === 'h&m') {
      chosenLogo = require('../logos/HandM.jpg');
    } else {
      chosenLogo = require('../logos/NoLogo.png');
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

  const date = new Date().toLocaleDateString();

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
  button: {
    padding: 15,
    marginBottom: 5,
    alignItems: "center",
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
