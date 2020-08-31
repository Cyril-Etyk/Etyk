//Import React
import React from "react";

//Import all required component
import { View, Text, Button, StyleSheet } from "react-native";
import colors from "../../constants/colors";

const SettingsScreen = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.changeButton}>
        <Text style={styles.firstSubText}>Nom : Cyril Wastchenko</Text>
        <Button
          title="Changer"
          color={colors.accent}
          style={styles.subButton}
        />
      </View>
      <View style={styles.changeButton}>
        <Text style={styles.subText}>Mot de passe</Text>
        <Button
          title="Changer"
          color={colors.accent}
          style={styles.subButton}
        />
      </View>
    </View>
  );
};

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
});
export default SettingsScreen;
