import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text} from "react-native";

class AddDeck extends Component {
  render() {
    return (
      <Text>
        Deck item
      </Text>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default AddDeck;
