import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TicketScreen from "./screens/TicketScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.screen}>
      <Stack.Navigator>
        <Stack.Screen name="Mes tickets" component={TicketScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
