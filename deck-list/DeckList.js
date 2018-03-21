import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View} from "react-native";
import {getDecks, setDummyData} from "../utils/api";
import DeckItem from "./DeckItem";

class DeckList extends Component {
  componentDidMount() {
    setDummyData();
    this.props.dispatch(getDecks());
  }

  render() {
    const {status, decks} = this.props;
    return (
      <View>
        <Text>Deck List</Text>
        <Text>Status: {status}</Text>
        {!!decks && decks.map(item => <DeckItem deck={item} />)}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    decks: !!state.decks.data ? Object.values(state.decks.data) : [],
    status: state.decks.status
  }
}

export default connect(mapStateToProps)(DeckList);
