import React from 'react';
import {Bar, StyleSheet, View} from 'react-native';
import {purple} from "./common/utils/colors";
import RootReducer from "./reducers/RootReducer";
import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {QuizStatusBar} from "./common/StatusBar";
import {MainNavigator} from "./common/MainNavigator";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunk)));

export default class App extends React.Component {

    componentDidMount() {
        console.log('Loaded');
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <QuizStatusBar backgroundColor={purple} barStyle="light-content"/>
                    <MainNavigator/>
                </View>
            </Provider>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
