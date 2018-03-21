import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View} from "react-native";

class DeckList extends Component {
  render() {
    return (
      <View>
        <Text>Deck List</Text>
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
