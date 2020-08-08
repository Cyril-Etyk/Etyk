//Import React
import React from 'react';

//Import all required component
import { View, Text } from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
      <Text style={{ fontSize: 23, marginTop: 10 }}>Mes options</Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>
        Lorem ipsum
      </Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>Etyk, c'est CHIC</Text>
    </View>
  );
};
export default SettingsScreen;
