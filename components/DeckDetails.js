import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {deleteDeck, getDeck} from "../common/utils/api";
import {Button, Card} from "react-native-elements";
import {blue, orange} from "../common/utils/colors";
import Error from "../common/error/Error";
import Loading from "../common/loading/Loading";

class DeckDetails extends Component {

  static navigationOptions = ({navigation}) => {
    const {deckTitle} = navigation.state.params;

    return {
      title: `${deckTitle}`
    }
  }

  componentDidMount() {
    const {deckId} = this.props.navigation.state.params;
    this.props.dispatch(getDeck(deckId))
  }

  onDeckDelete = () => {
    const deckId = this.props.navigation.state.params.deckId;
    deleteDeck(deckId);
    this.goToHome();
  }

  onDeckStart = () => {
    const deckId = this.props.navigation.state.params.deckId;
    this.props.navigation.navigate('DeckQuiz', {deckId})
  }

  onDeckEdit = () => {

  }

  goToHome = () => {
    this.props.navigation.navigate('DeckList');
  }

  render() {
    const {status, deck} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {status === 'error' && <Error></Error>}
        {status === 'loading' && <Loading></Loading>}
        {status === 'ok' && (<View>
          <Card style={styles.titleContainer}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text>This quiz contains {deck.questions.length} questions.</Text>
          </Card>
          <View style={{height:20}}></View>
          <Button
            buttonStyle={styles.button}
            title="Start quiz"
            backgroundColor={blue}
            onPress={this.onDeckStart}
            iconRight={{name: 'play-arrow'}}
          />
          <Button
            buttonStyle={styles.button}
            title="Edit quiz"
            backgroundColor={orange}
            iconRight={{name: 'edit'}}
            onPress={this.onDeckEdit}
          />
          <Button
            buttonStyle={styles.button}
            title="Delete deck"
            onPress={this.onDeckDelete}
            iconRight={{name: 'delete-forever'}}
          /></View>)}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  const deck = state.details;
  return {
    deck: deck.data,
    status: deck.status
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    marginBottom: 30,
    marginTop:10
  },
  title: {
    fontSize: 25, fontWeight: 'bold'
  },
  button: {
    marginBottom: 20
  }
})

export default connect(
  mapStateToProps,
)(DeckDetails);
