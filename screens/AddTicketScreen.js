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

export default function AddTicketScreen({ navigation }) {
  const [newTicket, setNewTicket] = useState([]);

  const addTicketHandler = (logo, date, brand, price) => {
    setNewTicket((currentTickets) => [
      ...currentTickets,
      {
        key: Math.random().toString(),
        logo: logo,
        date: date,
        brand: brand,
        price: price,
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <TicketInput onAddTicket={addTicketHandler} />
      <FlatList
        data={newTicket}
        renderItem={(itemData) => (
          <View style={styles.ticketList}>
            <TicketItem
              title={
                itemData.item.logo +
                "  -  " +
                itemData.item.date +
                "  -  " +
                itemData.item.brand +
                "  -  " +
                itemData.item.price
              }
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 25,
  },
  ticketList: {
    marginBottom: 35,
    alignItems: "center",
  },
});
