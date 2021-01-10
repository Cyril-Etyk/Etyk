//Import React
import React, { useState, useEffect } from "react";

//Import all required component
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from "react-native";
import colors from "../../constants/colors";
import AsyncStorage from "@react-native-community/async-storage";
import { userName, userIdKey } from "../../constants/keys.js";

const SettingsScreen = ({ navigation }) => {
  //Initialise states
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, isLoading] = useState(false);
  const [nameModal, setNameModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  let [isChangeNameSuccess, setIsChangeNameSuccess] = useState(false);
  let [isChangePasswordSuccess, setIsChangePasswordSuccess] = useState(false);
  const [pwModal, setPwModal] = useState(false);
  let [errortext, setErrortext] = useState("");

  //Call function on page load
  useEffect(() => {
    getUserName();
  }, []);

  //Get user's name and ID from AsyncStorage (set in Login)
  const getUserName = () => {
    AsyncStorage.getItem(userName).then((userName) => {
      setName(userName);
      isLoading(true);
    });
    AsyncStorage.getItem(userIdKey).then((userIdKey) => {
      setUserId(userIdKey);
    });
  };

  //Change password of User, with validation and modal handler
  const changePasswordHandler = () => {
    const validatePassword = (password) => {
      var re = /^.{8,}$/;
      return re.test(password);
    };
    if (!validatePassword(password)) {
      alert("Un mot de passe doit contenir au moins 8 caractères");
      return;
    }
    if (!validatePassword(newPassword)) {
      alert("Un mot de passe doit contenir au moins 8 caractères");
      return;
    }
    if (!validatePassword(confirmNewPassword)) {
      alert("Un mot de passe doit contenir au moins 8 caractères");
      return;
    }
    if (newPassword != confirmNewPassword) {
      alert("Les nouveaux mots de passe ne sont pas identiques");
      return;
    }
    try {
      fetch("http://165.232.75.50:5000/api/user/changePw", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          password: password,
          newPassword: newPassword,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status == 1) {
            setIsChangePasswordSuccess(true);
            setPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
            setPwModal(false);
          } else {
            setErrortext("Mot de passe actuel incorrect");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const cancelPasswordHandler = () => {
    setPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setPwModal(false);
    setErrortext("");
  };
  const showPasswordModal = () => {
    setPwModal(true);
  };
  //Change name of User, with validation and modal handler
  const modalNameHandler = (changeName) => {
    setNewName(changeName.replace(/[^a-zA-Z-éè ]/g, ""));
  };

  const changeNameHandler = () => {
    const validateName = (name) => {
      var re = /^[a-zA-Z -éèç]{1,}$/;
      return re.test(name);
    };
    if (!validateName(newName.replace(/\s/g, ""))) {
      alert("Veuillez encoder au minimum une lettre");
      return;
    }
    if (!newName) {
      alert("Veuillez encoder au minimum une lettre");
      return;
    }
    fetch("http://165.232.75.50:5000/api/user/changeName", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        name: newName,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == 1) {
          setIsChangeNameSuccess(true);
        } else {
          setErrortext("Changement Échoué");
        }
      })
      .then((json) => setName(newName))
      .then((json) => {
        AsyncStorage.setItem(userName, newName);
      })
      .catch((error) => {
        AsyncStorage.setItem(userName, newName);
      });
    setNameModal(false);
    setNewName("");
  };
  const cancelNameHandler = () => {
    setNewName("");
    setNameModal(false);
    setErrortext("");
  };

  const showNameModal = () => {
    setNameModal(true);
  };

  if (isChangePasswordSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../Image/success.png")}
          style={{ height: 150, resizeMode: "contain", alignSelf: "center" }}
        />
        <Text style={styles.successTextStyle}>Mot de passe changé</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => setIsChangePasswordSuccess(false)}
        >
          <Text style={styles.buttonTextStyle}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (isChangeNameSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../Image/success.png")}
          style={{ height: 150, resizeMode: "contain", alignSelf: "center" }}
        />
        <Text style={styles.successTextStyle}>Changement de nom réussi</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => setIsChangeNameSuccess(false)}
        >
          <Text style={styles.buttonTextStyle}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }
  //Page design
  return (
    <View style={styles.screen}>
    <Image
      source={require("../../Image/etyk.png")}
      style={{
        width: "50%",
        height: 100,
        resizeMode: "contain",
        margin: 40,
        marginTop: -50,
      }}
    />
      <View style={styles.changeButton}>

        {isLoading ? (
          <Text style={styles.firstSubText}>Nom : {name}</Text>
        ) : null}
        <Button
          title="Changer"
          color={colors.accent}
          style={styles.subButton}
          onPress={showNameModal}
        />
      </View>

      <Modal visible={nameModal} animationType="slide">
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <SafeAreaView style={styles.screen}>
            <TextInput
              placeholder="Nouveau nom"
              style={styles.input}
              autoCorrect={false}
              maxLength={30}
              onChangeText={modalNameHandler}
              value={newName}
            />
            {errortext != "" ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <View style={styles.buttonContainer}>
              <Button
                title="Annuler"
                color={colors.primary}
                onPress={cancelNameHandler}
              />
              <Button
                title="Changer"
                color={colors.accent}
                onPress={changeNameHandler}
              />
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={pwModal} animationType="slide">
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <SafeAreaView style={styles.screen}>
            <TextInput
              placeholder="Mot de passe actuel"
              style={styles.input}
              autoCorrect={false}
              maxLength={30}
              onChangeText={(UserPassword) => setPassword(UserPassword)}
              secureTextEntry={true}
            />
            <TextInput
              placeholder="Nouveau mot de passe"
              style={styles.input}
              autoCorrect={false}
              maxLength={30}
              onChangeText={(UserPassword) => setNewPassword(UserPassword)}
              secureTextEntry={true}
            />
            <TextInput
              placeholder="Confirmer le nouveau mot de passe"
              style={styles.input}
              autoCorrect={false}
              maxLength={30}
              onChangeText={(UserPassword) =>
                setConfirmNewPassword(UserPassword)
              }
              secureTextEntry={true}
            />
            {errortext != "" ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <View style={styles.buttonContainer}>
              <Button
                title="Annuler"
                color={colors.primary}
                onPress={cancelPasswordHandler}
              />
              <Button
                title="Changer"
                color={colors.accent}
                onPress={changePasswordHandler}
              />
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.changeButton}>
        <Text style={styles.subText}>Mot de passe</Text>
        <Button
          title="Changer"
          color={colors.accent}
          style={styles.subButton}
          onPress={showPasswordModal}
        />
      </View>
    </View>
  );
};
//Styling
const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "center" },
  firstSubText: {
    fontSize: 18,


    padding: 10,
    backgroundColor: "white",
    width: "70%",
    margin: 10,
  },
  subText: {
    fontSize: 18,
    marginTop: 25,
    marginHorizontal: 25,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "white",
    width: "70%",
    margin: 10,
  },
  changeButton: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    width: "70%",
    margin: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "45%",
    marginVertical: 10,
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
});
export default SettingsScreen;
