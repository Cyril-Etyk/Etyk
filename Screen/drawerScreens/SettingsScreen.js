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
} from "react-native";
import colors from "../../constants/colors";
import AsyncStorage from "@react-native-community/async-storage";
import { userName, userIdKey } from "../../constants/keys.js";

const SettingsScreen = () => {
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
  validatePassword = (password) => {
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
        console.log("Mot de passe changé");
      } else {
        console.log("Changement Échoué");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  setPassword("");
  setNewPassword("");
  setConfirmNewPassword("");
};

//Change name of User, with validation and modal handler
const modalNameHandler = (changeName) => {
  setNewName(changeName.replace(/[^a-zA-Z ]/g, ""));
};

const changeNameHandler = () => {
  const validateName = (name) => {
    var re = /^[a-zA-Z]{1,}$/;
    return re.test(name);
  };
  if (!validateName(newName)) {
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
        setIsChangePasswordSuccess(true);
        console.log("Mot de passe changé");
      } else {
        console.log("Changement Échoué");
      }
    })
    .then((json) => setName(newName))
    .then((json) => {})
    .catch((error) => {
      AsyncStorage.setItem(userName, newName);
    });
  setNameModal(false);
  setNewName("");
};

const cancelNameHandler = () => {
  setNewName("");
  setNameModal(false);
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
        source={require("../Image/success.png")}
        style={{ height: 150, resizeMode: "contain", alignSelf: "center" }}
      />
      <Text style={styles.successTextStyle}>Mot de passe changé</Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={() => props.navigation.navigate("SettingsScreen")}
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
        source={require("../Image/success.png")}
        style={{ height: 150, resizeMode: "contain", alignSelf: "center" }}
      />
      <Text style={styles.successTextStyle}>Mot de passe changé</Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={() => props.navigation.navigate("SettingsScreen")}
      >
        <Text style={styles.buttonTextStyle}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
}
//Page design
return (
  <View style={styles.screen}>
    <View style={styles.changeButton}>
      {isLoading ? <Text style={styles.firstSubText}>Nom : {name}</Text> : null}
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
            ref={(ref) => {
              this._passwordinput = ref;
            }}
            onSubmitEditing={() =>
              this._repeatpassword && this._repeatpassword.focus()
            }
          />
          <TextInput
            placeholder="Nouveau mot de passe"
            style={styles.input}
            autoCorrect={false}
            maxLength={30}
            onChangeText={(UserPassword) => setNewPassword(UserPassword)}
            secureTextEntry={true}
            ref={(ref) => {
              this._repeatpassword = ref;
            }}
            onSubmitEditing={() =>
              this._confirmrepeatpassword && this._confirmrepeatpassword.focus()
            }
          />
          <TextInput
            placeholder="Confirmer le nouveau mot de passe"
            style={styles.input}
            autoCorrect={false}
            maxLength={30}
            onChangeText={(UserPassword) => setConfirmNewPassword(UserPassword)}
            secureTextEntry={true}
            ref={(ref) => {
              this._confirmrepeatpassword = ref;
            }}
          />
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

    <View style={styles.changeButton}>
      <Text style={styles.subText}>Mot de passe</Text>
      <Button title="Changer" color={colors.accent} style={styles.subButton} />
    </View>
  </View>
);

//Styling
const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "center" },
  firstSubText: { fontSize: 18, marginBottom: 10 },
  subText: {
    fontSize: 18,
    marginTop: 25,
    marginHorizontal: 25,
    marginBottom: 10,
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
});
export default SettingsScreen;
