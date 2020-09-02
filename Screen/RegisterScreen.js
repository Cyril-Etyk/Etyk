//Import React and Hook we needed
import React, { useState } from "react";

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Loader from "./Components/loader";

import colors from "../constants/colors.js";


const RegisterScreen = (props) => {
  let [userName, setUserName] = useState("");
  let [userEmail, setUserEmail] = useState("");
  let [userPassword, setUserPassword] = useState("");
  let [userRepeatPassword, setUserRepeatPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState("");
  let [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const handleSubmitButton = () => {
    setErrortext("");
    validateEmail = (email) => {
      var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };
    validatePassword = (password) => {
      var re = /^.{8,}$/;
      return re.test(password);
    };
    validateName = (name) => {
      var re = /^[a-zA-Z]{1,}$/;
      return re.test(name);
    };
    if (!validateName(userName)) {
      alert("Veuillez encoder au minimum une lettre");
      return;
    }
    if (!validateEmail(userEmail)) {
      alert("Adresse mail non valide");
      return;
    }
    if (!validatePassword(userPassword)) {
      alert("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }
    if (!validatePassword(userRepeatPassword)) {
      alert("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }
    if (userPassword != userRepeatPassword) {
      alert("Les mots de passe ne sont pas identiques");
      return;
    }
    console.log(userName, userEmail, userPassword, userRepeatPassword);
    //Show Loader
    setLoading(true);

    fetch("http://165.232.75.50:5000/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        email: userEmail.toLowerCase(),
        password: userPassword,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status == 1) {
          setIsRegistrationSuccess(true);
          console.log("Inscription Réussie, veuillez vous connecter");
        } else {
          setErrortext("Inscription Échouée");
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
    setUserName("");
    setUserEmail("");
    setUserPassword("");
    setUserRepeatPassword("");
  };
  if (isRegistrationSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../Image/success.png")}
          style={{ height: 150, resizeMode: "contain", alignSelf: "center" }}
        />
        <Text style={styles.successTextStyle}>Inscription Réussie.</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate("LoginScreen")}
        >
          <Text style={styles.buttonTextStyle}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
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
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setUserName(UserName)}
              underlineColorAndroid="#FFFFFF"
              placeholder="Votre Nom"
              placeholderTextColor="#F6F6F7"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() =>
                this._emailinput && this._emailinput.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Votre adresse mail"
              placeholderTextColor="#F6F6F7"
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
              underlineColorAndroid="#F6F6F7"
              placeholder="Mot de passe"
              placeholderTextColor="#F6F6F7"
              ref={(ref) => {
                this._passwordinput = ref;
              }}
              onSubmitEditing={() =>
                this._repeatpassword && this._repeatpassword.focus()
              }
              blurOnSubmit={false}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserRepeatPassword) =>
                setUserRepeatPassword(UserRepeatPassword)
              }
              underlineColorAndroid="#FFFFFF"
              placeholder="Veuillez répeter le mot de passe"
              placeholderTextColor="#F6F6F7"
              ref={(ref) => {
                this._repeatpassword = ref;
              }}
              returnKeyType="next"
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
            onPress={handleSubmitButton}
          >
            <Text style={styles.buttonTextStyle}>S'INSCRIRE</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
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
    color: colors.accent,
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
    color: "white",
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  errorTextStyle: {
    color: "black",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  successTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 30,
  },
});
