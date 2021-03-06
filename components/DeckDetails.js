import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {deleteDeck, getDeck} from "../common/utils/api";
import {Button, Card} from "react-native-elements";
import {blue, orange} from "../common/utils/colors";
import Error from "../common/error/Error";
import Loading from "../common/loading/Loading";
import {NavigationActions} from "react-navigation";

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
    this.props.dispatch(deleteDeck(deckId));
    this.goToHome();
  };

  onDeckStart = () => {
    const deckId = this.props.navigation.state.params.deckId;
    this.props.navigation.navigate('DeckQuiz', {deckId})
  }

  onDeckAddQuestion = () => {
    const deckId = this.props.navigation.state.params.deckId;
    this.props.navigation.navigate('DeckAddQuestion', {deckId})
  }

  goToHome = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Home'}),
      ],
    });
    this.props.navigation.dispatch(resetAction);

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
          <View style={{height: 20}}></View>
          <Button
            disabled={deck.questions && deck.questions.length === 0}
            buttonStyle={styles.button}
            title="Start quiz"
            backgroundColor={blue}
            onPress={this.onDeckStart}
            iconRight={{name: 'play-arrow'}}
          />
          <Button
            buttonStyle={styles.button}
            title="Add question"
            backgroundColor={orange}
            iconRight={{name: 'edit'}}
            onPress={this.onDeckAddQuestion}
          />
          <Button
            buttonStyle={styles.button}
            title="Delete deck"
            onPress={this.onDeckDelete}
            iconRight={{name: 'delete-forever'}}
          />
          <Button
            buttonStyle={styles.button}
            title="List af all decks"
            onPress={this.goToHome}
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
    marginTop: 10
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
