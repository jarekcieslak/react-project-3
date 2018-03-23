import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from "react-native";
import {getDecks, setDummyData} from "../common/utils/api";
import DeckItem from "./DeckItem";
import NoData from "../common/noData/NoData";
import Loading from "../common/loading/Loading";
import Error from "../common/error/Error";

class DeckList extends Component {
  componentDidMount() {
    setDummyData();
    this.props.dispatch(getDecks());
  }

  render() {
    const {status, decks} = this.props;
    return (
      <View style={styles.container}>
        {status === 'error' && <Error></Error>}
        {status === 'loading' && <Loading></Loading>}
        {status === 'ok' && !!decks && decks.length === 0 && <NoData></NoData>}
        {status === 'ok' && !!decks && decks.map(item => <DeckItem key={item.id} deck={item}/>)}
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default connect(mapStateToProps)(DeckList);
