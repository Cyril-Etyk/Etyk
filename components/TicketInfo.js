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
  //Initialisation des variables
  const data = props.data[0];
  const [manualTicket, setManualTicket] = useState(false);
  const [showArticle2, setShowArticle2] = useState(false);
  const [showArticle3, setShowArticle3] = useState(false);
  const brand = data.brand.toUpperCase();
  const price = parseFloat(data.totalPrice).toFixed(2).replace(".", ",") + "€";
  const hour = parseInt(data.date.substring(12, 13)) + 1;
  const date =
    data.date.substring(8, 10) +
    data.date.substring(4, 7) +
    "-" +
    data.date.substring(0, 4) +
    "  " +
    data.date.substring(11, 12) +
    hour +
    data.date.substring(13, 16);
  const note = data.note;
  const type = data.type;

  //Lancement de fonctions à l'ouverture de la page
  useEffect(() => {
    articleHandler();
    addressHandler();
    if (data.type == "Manuel") {
      setManualTicket(true);
    } else {
      setManualTicket(false);
    }
  }, []);

  //Gestion de l'affichage des articles 2 et 3
  const articleHandler = () => {
    if (data.articles[3] !== null) {
      setShowArticle2(true);
    } else {
      setShowArticle2(false);
    }
    if (data.articles[6] !== null) {
      setShowArticle3(true);
    } else {
      setShowArticle3(false);
    }
  };

  //Gestion de l'adresse d'une enseigne
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

  //Gestion de l'affichage des logos
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

  //Fonctions de controle et de gestion de la caméra pour la prise de photo
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
          setIsVerifyingPhoto(false);
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

//Fonctions de retour et de supression de ticket
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

//À compléter
  const removePhotoHandler = () => {};

//Design de la page
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
            style={{ resizeMode: "contain", margin: 15, borderWidth: 1 }}
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
              <Text style={styles.articleTop}>{data.articles[0]}: </Text>
              <Text style={styles.textInfoTop}>{data.articles[1]}€ /u</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Quantité: </Text>
              <Text style={styles.textInfo}>{data.articles[2]}</Text>
            </View>
            {showArticle2 ? (
              <View style={styles.articleContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.articleTop}>{data.articles[3]} : </Text>
                  <Text style={styles.textInfoTop}>{data.articles[4]}€ /u</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Quantité: </Text>
                  <Text style={styles.textInfo}>{data.articles[5]}</Text>
                </View>
              </View>
            ) : null}
            {showArticle3 ? (
              <View style={styles.articleContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.articleTop}>{data.articles[6]} : </Text>
                  <Text style={styles.textInfoTop}>{data.articles[7]}€ /u</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Quantité: </Text>
                  <Text style={styles.textInfo}>{data.articles[8]}</Text>
                </View>
              </View>
            ) : null}
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
              <Text style={styles.articleTop}>Prix total: </Text>
              <Text style={styles.textInfoTop}>{price}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Date d'émission: </Text>
              <Text style={styles.textInfo}>{date}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>N° de transaction: </Text>
              <Text style={styles.textInfo}>#1XDUZUIZ4842ZZD</Text>
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


//Style de la page
const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textContainer: {
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
    alignItems: "flex-start",
  },
  articleTop: {
    marginTop: 10,
    fontWeight: "bold",
  },
  textInfoTop: {
    fontWeight: "bold",
    color: "blue",
    marginTop: 10,
  },
  container: {
    alignItems: "flex-start",
  },
  containerPhoto: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
});

export default TicketInfo;
