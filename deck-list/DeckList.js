import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View} from "react-native";
import {getDecks, setDummyData} from "../utils/api";

class DeckList extends Component {
  componentDidMount() {
    setDummyData();
    this.props.dispatch(getDecks());
  }

  render() {
    return (
      <View>
        <Text>Deck List</Text>
        <Text>Status: {this.props.status}</Text>
        <Text>{JSON.stringify(this.props)}</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    decks: state.decks.data,
    status: state.decks.status
  }
}

export default connect(mapStateToProps)(DeckList);
