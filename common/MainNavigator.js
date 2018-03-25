import {StackNavigator, TabNavigator} from "react-navigation";
import {purple, white} from "./utils/colors";
import {Platform} from "react-native";
import DeckList from "../components/DeckList";
import AddDeck from "../components/AddDeck";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DeckDetails from "../components/DeckDetails";
import DeckQuiz from "../components/DeckQuiz";


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
    },
    DeckDetails: {
        screen: DeckDetails,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            }
        }
    },
    DeckQuiz: {
        screen: DeckQuiz,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            }
        }
    }
});
