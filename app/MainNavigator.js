import {StackNavigator, TabNavigator} from "react-navigation";
import {purple, white} from "../common/utils/colors";
import {Platform} from "react-native";
import DeckList from "../deck-list/DeckList";
import AddDeck from "../deck/AddDeck";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";


export const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
    },
  },
  AddEntry: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add deck',
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

export const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  }
});
