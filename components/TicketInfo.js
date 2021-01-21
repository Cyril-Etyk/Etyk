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
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [noteIsChanged, setNoteIsChanged] = useState(false);
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
    hour +
    data.date.substring(13, 16);
  const note = data.note;
  const type = data.type;

  //Lancement de fonctions à l'ouverture de la page
  useEffect(() => {
    articleHandler();
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
  const address =
    data.address[0] + ",\n" + data.address[1] + " " + data.address[2];
  const dataTelNr = data.telNr;
  const telNr =
    dataTelNr.substring(0, 4) +
    "/" +
    dataTelNr.substring(4, 6) +
    "." +
    dataTelNr.substring(6, 8) +
    "." +
    dataTelNr.substring(8, 10);

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
      fetch("https://etyk.be/api/photo/verifyPhoto", {
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
          fetch("https://etyk.be/api/photo/post", {
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

  const changeNote = () => {
    props.onPatch(data._id, newNote);
    setNoteIsChanged(true);
    setShowNoteModal(false);
  };

  const showModal = () => {
    setShowNoteModal(true);
  };

  const returnNoteModal = () => {
    setShowNoteModal(false);
  };

  const noteInputHandler = (input) => {
    setNewNote(input.replace(/[<>&{}[]]/g, ""));
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
            setIsVerifyingPhoto(true);
            props.onDelete(data._id);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const returnHandler = () => {
    setIsVerifyingPhoto(true);
    setNoteIsChanged(false);
    props.onCancel();
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
          <View style={styles.etykLogo}>
            <Image source={logoHandler()} />
          </View>
          {isVerifyingPhoto ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.containerPhoto}>
              <Button
                title={photoTitle}
                onPress={takeImage}
                color={colors.accent}
              />
              <Button
                title="Modifier note"
                onPress={showModal}
                color={colors.focus}
              />
            </View>
          )}
          {showNoteModal ? (
            <Modal animationType="slide">
              <TouchableWithoutFeedback
                onPress={() => {
                  Keyboard.dismiss();
                }}
              >
                <View style={styles.inputArticle}>
                  <TextInput
                    placeholder="Nouvelle note"
                    style={styles.inputTop}
                    autoCorrect={false}
                    maxLength={30}
                    onChangeText={noteInputHandler}
                    value={newNote}
                  />
                  <View style={styles.buttonContainer}>
                    <Button
                      title="Annuler"
                      color={colors.primary}
                      onPress={returnNoteModal}
                    />
                    <Button
                      title="Changer"
                      color={colors.accent}
                      onPress={changeNote}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          ) : null}

          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Enseigne</Text>
              <Text style={styles.textInfo}>{brand}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Adresse</Text>
              <Text style={styles.textInfo}>{address}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Numéro de téléphone</Text>
              <Text style={styles.textInfo}>{telNr}</Text>
            </View>
          </View>
          <View style={styles.articleContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.articleTop}>{data.articles[0]}</Text>
              <Text style={styles.textInfoTop}>{data.articles[1]}€</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textBoldness}>Quantité</Text>
              <Text style={styles.textInfoBoldness}>{data.articles[2]}</Text>
            </View>
            {showArticle2 ? (
              <View>
                <View style={styles.textContainer}>
                  <Text style={styles.articleTop}>{data.articles[3]}</Text>
                  <Text style={styles.textInfoTop}>{data.articles[4]}€</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.textBoldness}>Quantité</Text>
                  <Text style={styles.textInfoBoldness}>{data.articles[5]}</Text>
                </View>
              </View>
            ) : null}
            {showArticle3 ? (
              <View>
                <View style={styles.textContainer}>
                  <Text style={styles.articleTop}>{data.articles[6]}</Text>
                  <Text style={styles.textInfoTop}>{data.articles[7]}€</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.textBoldness}>Quantité</Text>
                  <Text style={styles.textInfoBoldness}>{data.articles[8]}</Text>
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
              <Text style={styles.text}>Prix total</Text>
              <Text style={styles.textInfo}>{price}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Date d'émission</Text>
              <Text style={styles.textInfo}>{date}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textBoldness}>N° de transaction</Text>
              <Text style={styles.textInfoBoldness}>#1XDUZUIZ4842ZZD</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Type de ticket</Text>
              <Text style={styles.textInfo}>{type}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Note</Text>
              {!noteIsChanged ? (
                <Text style={styles.textInfo}>{note}</Text>
              ) : (
                <Text style={styles.textInfo}>{newNote}</Text>
              )}
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
    flex: 1,
  },
  etykLogo: {
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
  },
  container: {
    justifyContent: "flex-start",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    paddingVertical: 4,
    marginHorizontal: 10,
  },
  text: {
    fontWeight: "bold",
  },
  textInfo: {
    fontWeight: "bold",
    color: colors.focus,
    marginBottom: 5,
    textAlign: "right",
  },
  textInfoBoldness: {
    color: colors.primary,
    marginBottom: 5,
    textAlign: "right",
  },
  button: {
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  articleContainer: {
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 2,
  },
  articleTop: {
    marginTop: 7,
    fontWeight: "bold",
  },
  textInfoTop: {
    fontWeight: "bold",
    color: colors.focus,
    marginTop: 7,
    textAlign: "right",
  },
  containerPhoto: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    margin: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  inputArticle: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  inputTop: {
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 10,
    width: "50%",
    borderRadius: 5,
    margin: 1,
    marginBottom: 7,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "45%",
    marginVertical: 10,
  },
});

export default TicketInfo;
