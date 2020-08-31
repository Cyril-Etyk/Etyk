//Import React
import React from 'react';

//Import Navigators
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

//Import External Screens
import TicketScreen from './drawerScreens/TicketScreen';
import SettingsScreen from './drawerScreens/SettingsScreen';
import CardScreen from './drawerScreens/CardScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';

import colors from '../constants/colors.js';

const FirstActivity_StackNavigator = createStackNavigator({
  First: {
    screen: TicketScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Mes Tickets',
      headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: "white",
    }),
  },
});

const SecondActivity_StackNavigator = createStackNavigator({
  First: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Mon Profil',
      headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: "white",
    }),
  },
});

const ThirdActivity_StackNavigator = createStackNavigator({
  First: {
    screen: CardScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Carte ETYK',
      headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: "white",
    }),
  },
});

const DrawerNavigatorRoutes = createDrawerNavigator(
  {
    TicketScreen: {
      screen: FirstActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Home Screen',
      },
    },
    SettingsScreen: {
      screen: SecondActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Setting Screen',
      },
    },
    CardScreen: {
      screen: ThirdActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Card Screen',
      },
    },
  },
  {
    contentComponent: CustomSidebarMenu,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
);
export default DrawerNavigatorRoutes;
