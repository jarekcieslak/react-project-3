import React from 'react';
import {Text, View} from "react-native";

const DeckItem = (props) => {

  return (
    <View>
      <Text>{props.deck.id} - {props.deck.title}</Text>
    </View>
  );
};

export default DeckItem;
