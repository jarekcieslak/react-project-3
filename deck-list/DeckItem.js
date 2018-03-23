import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {Card} from "react-native-elements";


const DeckItem = (props) => {

  const howManyQuestions = (number) => {
    if (number === 1) {
      return 'question'
    } else {
      return 'questions'
    }
  };

  return (
    <TouchableOpacity>
      <Card titleStyle={{fontWeight: 'bold', textAlign: 'left', fontSize: 30}} title={props.deck.title}>
        <View>
          <Text>{props.deck.questions.length} {howManyQuestions(props.deck.questions.length)}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default DeckItem;
