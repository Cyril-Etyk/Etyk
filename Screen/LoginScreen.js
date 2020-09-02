//Import React and Hook we needed
import React, { useState } from "react";

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Loader from "./Components/loader";
import { userIdKey, userTokenKey, userName } from "../constants/keys.js";

import colors from "../constants/colors.js";

const LoginScreen = (props) => {
  let [userEmail, setUserEmail] = useState("");
  let [userPassword, setUserPassword] = useState("");
  let [userToken, setUserToken] = useState("");
  let [userIdentificator, setUserIdentificator] = useState("");
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState("");

  const handleSubmitPress = () => {
    setErrortext("");
    validateEmail = (email) => {
      var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };
    validatePassword = (password) => {
      var re = /^.{8,}$/;
      return re.test(password);
    };
    if (!validateEmail(userEmail)) {
      alert("Adresse mail non valide");
      return;
    }
    if (!userEmail) {
      alert("Veuillez compléter l'adresse Email");
      return;
    }
    if (!validatePassword(userPassword)) {
      alert("Le mot de passe doit contenir au moins 8 charactères");
      return;
    }
    if (!userPassword) {
      alert("Veuillez compléter le mot de passe");
      return;
    }
    setLoading(true);
    fetch("http://165.232.75.50:5000/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        // If server response message same as Data Matched
        if (responseJson.status == 1) {
          AsyncStorage.setItem(userIdKey, responseJson.user);
          AsyncStorage.setItem(userTokenKey, responseJson.token);
          AsyncStorage.setItem(userName, responseJson.name);
          props.navigation.navigate("DrawerNavigationRoutes");
        } else {
          setErrortext(responseJson.error);
          console.log(responseJson.error);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 100 }}>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../Image/etyk.png")}
                style={{
                  width: "50%",
                  height: 100,
                  resizeMode: "contain",
                  margin: 30,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Adresse Mail / Login" //exemple@abc.com
                placeholderTextColor="#F6F6F7"
                autoCapitalize="none"
                keyboardType="email-address"
                ref={(ref) => {
                  this._emailinput = ref;
                }}
                returnKeyType="next"
                onSubmitEditing={() =>
                  this._passwordinput && this._passwordinput.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Mot de passe" //12345
                placeholderTextColor="#F6F6F7"
                keyboardType="default"
                ref={(ref) => {
                  this._passwordinput = ref;
                }}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
              />
            </View>
            {errortext != "" ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}
            >
              <Text style={styles.buttonTextStyle}>Se connecter</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => props.navigation.navigate("RegisterScreen")}
            >
              Nouveau client? Inscrivez-vous ici
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: colors.accent,
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: colors.accent,
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  registerTextStyle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  errorTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});
