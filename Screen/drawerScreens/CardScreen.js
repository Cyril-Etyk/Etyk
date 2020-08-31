//Import React
import React, { useState, useEffect } from "react";

//Import all required component
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import colors from "../../constants/colors";
import { QRCode } from "react-native-custom-qr-codes-expo";
import { userIdKey, userTokenKey } from "../../constants/keys.js";

const CardScreen = () => {


  useEffect(() => {
    AsyncStorage.getItem(userIdKey).then((userIdKey) => {
      setUserId(userIdKey);
    });
  }, [userId]);

  const [userId, setUserId] = useState("5f4a4d384704118f5ab8se75");
  return (
    <View style={styles.screen}>
      <QRCode content={userId} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
export default CardScreen;
