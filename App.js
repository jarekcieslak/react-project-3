import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {TabNavigator} from "react-navigation";
import DeckList from "./deck-list/DeckList";
import AddDeck from "./deck/AddDeck";
import {purple, white} from "./utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RootReducer from "./reducers/RootReducer";
import {createStore} from "redux";
import {Provider} from "react-redux";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(RootReducer)}><Tabs></Tabs></Provider>
        );
    }
}


const Tabs = TabNavigator({
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
