import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {Card} from "react-native-elements";
import {withNavigation} from 'react-navigation'


const DeckListItem = (props) => {

    const howManyQuestions = (questions) => {
        let number = 0;
        if (questions && questions.length) {
            number = questions.length;
        }
        if (number === 1) {
            return `${number} question`
        } else {
            return `${number} questions`
        }
    };

    const onDeckSelect = () => {
        const deckId = props.deck.id;
        const deckTitle = props.deck.title;
        props.navigation.navigate('DeckDetails', {deckId, deckTitle});
    }

    return (
        <TouchableOpacity onPress={onDeckSelect}>
            <Card titleStyle={{fontWeight: 'bold', textAlign: 'left', fontSize: 30}} title={props.deck.title}>
                <View>
                    <Text>{howManyQuestions(props.deck.questions)}</Text>
                </View>
            </Card>
        </TouchableOpacity>
    );
};

export default withNavigation(DeckListItem);
