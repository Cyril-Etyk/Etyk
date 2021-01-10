import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import colors from "../constants/colors";
import PhotoChecker from "../components/PhotoChecker";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const TicketInfo = (props) => {
  //DATA PREPARATION
  const data = props.data[0];
  const [manualTicket, setManualTicket] = useState(false);

  useEffect(() => {
    addressHandler();
    if (data.type == "Manuel") {
      setManualTicket(true);
    } else {
      setManualTicket(false);
    }
  }, []);

  const brand = data.brand.toUpperCase();
  const price = data.price;
  const priceHt =
    parseFloat(price.replace(",", ".")).toFixed(2).replace(".", ",") + "€";
  const priceT = parseFloat(price.replace(",", ".")) * 1.21;
  const priceTTC = parseFloat(priceT).toFixed(2).replace(".", ",") + "€";
  const date = data.date.substring(0, 10) + "  " + data.date.substring(11, 19);
  const note = data.note;
  const type = data.type;

  const [adres, setAdres] = useState("");
  const addressHandler = () => {
    const address = brand.toLowerCase().replace(/\s/g, "");
    if (address === "etyk") {
      setAdres("Rue des Pirouettes 24,\n 1050 Ixelles");
    } else if (address === "h&m") {
      setAdres("Rue Neuve 17/21,\n 1000 Bruxelles");
    } else if (address === "zara") {
      setAdres("Avenue de la T. d'Or 25/29,\n 1000 Bruxelles");
    } else if (address === "colruyt") {
      setAdres("Avenue des A. Combattants 42,\n 1140 Evere");
    } else if (address === "timberland") {
      setAdres("Rue du M. Aux Herbes 20,\n 1000 Bruxelles");
    } else {
      setAdres("Pas encore partenaire de ETYK");
    }
  };

  const logoHandler = () => {
    let logo = brand.toLowerCase().replace(/\s/g, "");
    if (logo === "etyk") {
      return require("../Image/etyk.png");
    } else if (logo === "h&m") {
      return require("../logos/hetm.jpg");
    } else if (logo === "zara") {
      return require("../logos/zara.jpg");
    } else if (logo === "colruyt") {
      return require("../logos/colruyt.jpg");
    } else if (logo === "timberland") {
      return require("../logos/timberland.jpg");
    } else {
      return require("../logos/nologo.png");
    }
  };

  //CAMERA & PHOTO CONTROL
  const [isVerifyingPhoto, setIsVerifyingPhoto] = useState(true);
  const [photoTitle, setPhotoTitle] = useState("");
  const [takePhoto, setTakePhoto] = useState(false);
  const [photoModal, setPhotoModal] = useState(false);
  const [photoURI, setPhotoURI] = useState("1");

  useEffect(() => {
    try {
      fetch("http://165.232.75.50:5000/api/photo/verifyPhoto", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // send our base64 string as POST request
        body: JSON.stringify({
          _id: data._id,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //Hide Loader
          setIsVerifyingPhoto(false);
          // If server response message same as Data Matched
          if (responseJson.status == 0) {
            setPhotoURI(responseJson.photo);
            setPhotoTitle("Voir photo");
            setTakePhoto(false);
          } else {
            setPhotoTitle("Ajouter photo");
            setTakePhoto(true);
          }
        })
        .catch((error) => {
          //Hide Loader
          setIsVerifyingPhoto(false);
          console.error(error);
        });
      [isVerifyingPhoto];
    } catch (e) {
      console.log(e);
    }
  });

  const askForPermission = async () => {
    const permissionResult = await Permissions.askAsync(Permissions.CAMERA);
    if (permissionResult.status !== "granted") {
      Alert.alert("no permissions to access camera!", [{ text: "ok" }]);
      return false;
    }
    return true;
  };

  const takeImage = async () => {
    if (!takePhoto) {
      setPhotoModal(true);
    } else {
      const hasPermission = await askForPermission();
      if (!hasPermission) {
        return;
      } else {
        // launch the camera with the following settings
        let image = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3, 3],
          quality: 1,
          base64: true,
        });
        // make sure a image was taken:
        if (!image.cancelled) {
          fetch("http://165.232.75.50:5000/api/photo/post", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            // send our base64 string as POST request
            body: JSON.stringify({
              user_id: data.user_id,
              id: data._id,
              photo: image.base64,
            }),
          })
            .then((response) => response.json())
            .then((responseJson) => {
              // If server response message same as Data Matched
              if (responseJson.status == 1) {
                console.log("Photo Encodée");
                setPhotoTitle("Voir photo");
                setTakePhoto(false);
              } else {
                console.log("Erreur pour encoder la photo");
                setPhotoTitle("Ajouter photo");
                setTakePhoto(true);
              }
            })
            .catch((error) => {
              //Hide Loader
              console.error(error);
            });
        }
      }
    }
  };

  //DELETE AND RETURN FUNCTIONS
  const deleteButtonHandler = () => {
    Alert.alert(
      "Supprimer",
      "Êtes vous sûr de vouloir supprimer?",
      [
        {
          text: "Annuler",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Confirmer",
          onPress: () => {
            props.onDelete(data._id);
            setIsVerifyingPhoto(true);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const returnHandler = () => {
    props.onCancel();
    setIsVerifyingPhoto(true);
  };

  const cancelPhotoHandler = () => {
    setPhotoModal(false);
  };
  const removePhotoHandler = () => {};

  //PAGE DESIGN
  return (
    <Modal visible={props.visible} animationType="slide">
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={styles.screen}>
          <Image
            source={logoHandler()}
            style={{ resizeMode: "contain", margin: 30, borderWidth: 1 }}
          />
          {isVerifyingPhoto ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.containerPhoto}>
              <Button
                title={photoTitle}
                onPress={takeImage}
                color={colors.accent}
              />
            </View>
          )}
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Enseigne: </Text>
              <Text style={styles.textInfo}>{brand}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Adresse: </Text>
              <Text onLoad={addressHandler} style={styles.textInfo}>
                {adres}
              </Text>
            </View>
          </View>
          <View style={styles.articleContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>T-shirt homme M: </Text>
              <Text style={styles.textInfo}>12€/u</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Quantité: </Text>
              <Text style={styles.textInfo}>3</Text>
            </View>
            <View style={styles.articleContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Chausettes Sport: </Text>
                <Text style={styles.textInfo}>1,16€/u</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Quantité: </Text>
                <Text style={styles.textInfo}>3</Text>
              </View>
            </View>
            <View style={styles.articleContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Promotion : </Text>
                <Text style={styles.textInfo}>-5€</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Prix HT: </Text>
                <Text style={styles.textInfo}>{priceHt}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Prix TTC: </Text>
                <Text style={styles.textInfo}>{priceTTC}</Text>
              </View>
            </View>
          </View>

          {photoModal ? (
            <PhotoChecker
              visible={true}
              data={data}
              uri={photoURI}
              onCancel={cancelPhotoHandler}
              onDelete={removePhotoHandler}
            />
          ) : null}
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Date d'émission: </Text>
              <Text style={styles.textInfo}>{date}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>N° de transaction: </Text>
              <Text style={styles.textInfo}>xyz3323dfdf11</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Type de ticket: </Text>
              <Text style={styles.textInfo}>{type}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Note: </Text>
              <Text style={styles.textInfo}>{note}</Text>
            </View>
          </View>
          {isVerifyingPhoto ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.button}>
              <Button
                title="Retour"
                color={colors.primary}
                onPress={returnHandler}
                style={styles.button}
              />
            </View>
          )}
          {manualTicket ? (
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={deleteButtonHandler}
              >
                <Image source={require("../Image/bin.png")} />
              </TouchableOpacity>
            </View>
          ) : null}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

//STYLE
const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textContainer: {
    padding: 2,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  text: {
    fontWeight: "bold",
  },
  textInfo: {
    fontWeight: "bold",
    color: "blue",
  },
  button: {
    marginTop: 20,
    justifyContent: "space-between",
  },
  articleContainer: {
    marginVertical: 7,
    alignItems: "flex-start",
  },
  container: {
    marginVertical: 7,
    alignItems: "flex-start",
  },
  containerPhoto: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
});

export default TicketInfo;
