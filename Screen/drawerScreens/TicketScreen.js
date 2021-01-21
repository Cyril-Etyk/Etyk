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
import SearchPane from "../../components/SearchPane";
import { userIdKey, userTokenKey } from "../../constants/keys.js";
import CryptoJS from "react-native-crypto-js";

export default function TicketScreen({ navigation }) {
  //Initialisation des variables
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [singeTicketData, setSingleTicketData] = useState("");
  const [ticketModal, setTicketModal] = useState(false);
  const [ticketInfoModal, setTicketInfoModal] = useState(false);
  const [isDescending, setIsDescending] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [hasTicket, setHasTicket] = useState(false);

  //Récupération des tickets du client concerné
  useEffect(() => {
    try {
      AsyncStorage.getItem(userIdKey).then((userIdKey) => {
        let cryptedKey = CryptoJS.AES.encrypt(
          userIdKey,
          "ikeugafoauiydfagogygyugouy§87585"
        ).toString();
        fetch("https://etyk.be/api/tickets/find", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: cryptedKey,
          }),
        })
          .then((response) => response.json())
          .then((json) =>
            CryptoJS.AES.decrypt(json, "ikeugafoauiydfagogygyugouy§87585")
          )
          .then((json) => JSON.parse(json.toString(CryptoJS.enc.Utf8)))
          .then((json) => setData(json.reverse()))
          .then((json) => noTicketHandler(data))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      });
    } catch (e) {
      console.log(e);
    }
  }, [isLoading]);

  //Préparation des données d'un ticket avant affichage sur la page
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

  //Gestion de l'affichage des MODAL
  const showTicketInfoModal = (ticketId) => {
    setSingleTicketData((singeTicketData) => {
      return data.filter((ticket) => ticket._id == ticketId);
    });
    setTicketInfoModal(true);
  };

  const showSearchModal = (data) => {
    setSearchModal(true);
  };

  const cancelTicketAddHandler = () => {
    setTicketModal(false);
    setTicketInfoModal(false);
    setSearchModal(false);
    setLoading(true);
  };

  const cancelSearchHandler = (ticketId) => {
    setSingleTicketData((singeTicketData) => {
      return data.filter((ticket) => ticket._id == ticketId);
    });
    setSearchModal(false);
    setTicketInfoModal(true);
  };

  //Gestion du refresh des tickets
  const refreshHandler = () => {
    setIsDescending(false);
    setLoading(true);
    setHasTicket(false);
  };

  //Créer un nouveau ticket MANUEL
  const noTicketHandler = (input) => {
    if (input === undefined || input.length == 0) {
      setHasTicket(true);
    } else {
      setHasTicket(false);
    }
  };
  const addTicketHandler = (
    brand,
    street,
    postalCode,
    region,
    telNr,
    articles,
    totalPrice,
    note,
    date
  ) => {
    try {
      AsyncStorage.getItem(userIdKey)
        .then((userIdKey) => {
          fetch("https://etyk.be/api/tickets", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: userIdKey,
              brand: brand.replace(/\s/g, ""),
              address: [street, postalCode, region],
              telNr: telNr,
              articles: articles,
              totalPrice: totalPrice,
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
    setLoading(true);
  };

  //Supprimer un ticket MANUEL
  const removeTicketHandler = (toDelete) => {
    let toFetch = "https://etyk.be/api/tickets/" + toDelete;
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

  //Modifier une note
  const updateNoteHandler = (toDelete, note) => {
    let toFetch = "https://etyk.be/api/tickets/" + toDelete;
    fetch(toFetch, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: toDelete,
        note: note,
      }),
    })
      .then((response) => response.json())
      .then((json) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  //Gestion du bouton CARTE ETYK
  const etykCardHandler = () => {
    global.currentScreenIndex = "CardScreen";
    navigation.navigate("CardScreen");
  };

  //Gestion des fonctions de tri des tickets
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
        var priceA = parseFloat(a.totalPrice),
          priceB = parseFloat(b.totalPrice);
        return priceA - priceB;
      });
      setData(sortedTicket);
      setIsDescending(false);
    } else {
      sortedTicket.sort(function (a, b) {
        var priceA = parseFloat(a.totalPrice),
          priceB = parseFloat(b.totalPrice);
        return priceB - priceA;
      });
      setData(sortedTicket);
      setIsDescending(true);
    }
  };

  //Design de l'écran
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
          color={colors.accent}
          onPress={etykCardHandler}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Trier Date"
          color="#1cbdac"
          onPress={sortByDateHandler}
        />
        <Button
          title="Trier enseigne"
          color="#10423d"
          onPress={sortByBrandHandler}
        />
        <Button
          title="trier prix"
          color="#24756d"
          onPress={sortByPriceHandler}
        />
        <TouchableOpacity
          style={styles.search}
          activeOpacity={0.5}
          onPress={showSearchModal}
        >
          <Image source={require("../../Image/Search.png")} />
        </TouchableOpacity>
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
          onPatch={updateNoteHandler}
        />
      ) : null}

      {searchModal ? (
        <SearchPane
          visible={true}
          data={data}
          onCancel={cancelSearchHandler}
          onReturn={cancelTicketAddHandler}
        />
      ) : null}
      {hasTicket ? (
        <View style={styles.noTicketBox}>
          <Text style={styles.noTicket}>Pas encore de ticket</Text>
        </View>
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
                item.date.substring(8, 10) +
                item.date.substring(4, 7) +
                "-" +
                item.date.substring(0, 4) +
                "     " +
                parseFloat(item.totalPrice).toFixed(2).replace(".", ",") +
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
    marginHorizontal: 5,
    padding: 2,
  },
  buttonEtyk: {
    padding: 5,
    marginBottom: 5,
    alignItems: "center",
  },
  noTicketBox: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50,
  },
  noTicket: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.accent,
  },
});
