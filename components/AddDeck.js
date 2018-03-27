import React, {Component} from 'react';
import {KeyboardAvoidingView, Keyboard, StyleSheet} from "react-native";
import {purple, white} from "../common/utils/colors";
import {Button, Card, FormInput, FormValidationMessage} from "react-native-elements";
import {createDeck} from "../common/utils/api";
import {withNavigation} from "react-navigation";

class AddDeck extends Component {
    state = {
        deckName: '',
        error: false
    };

    onDeckSubmit = () => {
        const {deckName} = this.state;
        createDeck(deckName).then(data => {
            this.props.navigation.navigate('DeckList');
            Keyboard.dismiss()
        })
    };

    render() {
        return (
            (
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <Card title="What is the title of your new deck?">

                        <FormInput
                            onChangeText={deckName => this.setState({deckName})}
                            value={this.state.deckName}
                        />
                        <FormValidationMessage>
                            {this.state.error ? 'This field is required' : ''}
                        </FormValidationMessage>
                        <Button
                            title="Create Deck"
                            raised
                            backgroundColor="rgb(72, 149, 236)"
                            onPress={this.onDeckSubmit}
                        />
                    </Card>
                </KeyboardAvoidingView>
            )
        );
    }
}

function mapStateToProps(state) {
    return {};
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    label: {
        marginBottom: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
        marginBottom: 20
    },
    button: {
        backgroundColor: purple,
        width: '100%',
        margin: 0,
    }
});

export default withNavigation(AddDeck);
