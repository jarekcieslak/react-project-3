import React, {Component} from 'react';
import {blue} from "../common/utils/colors";
import {StyleSheet, Text, View} from "react-native";
import {Button, Card} from "react-native-elements";
import {NavigationActions, withNavigation} from "react-navigation";

class DeckQuizCompleted extends Component {

  getCorrectQuestionsRatio = (answers) => {
    if (answers && answers.length) {
      let correctQuestions = answers.reduce((acc, item) => acc + item, 0);
      return Math.floor(correctQuestions / answers.length * 100);
    } else return 0
  };

  restartQuiz = () => {
    const {deckId} = this.props;
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'DeckQuiz'}, {deckId}),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  goBackToTheDeck = () => {
    const {deckId, deckTitle} = this.props;
    this.props.navigation.navigate('DeckDetails', {deckId, deckTitle});
  }

  render() {
    const {answers} = this.props;

    return (
      <View style={styles.container}>
        <Card>
          <Text style={styles.bigText}>Quiz completed!</Text>
          <Text>Correct answers: {this.getCorrectQuestionsRatio(answers)}%</Text>
          <Button
            buttonStyle={styles.button}
            title="Back to deck"
            backgroundColor={blue}
            onPress={() => this.goBackToTheDeck()}
          />
          <Button
            buttonStyle={styles.button}
            title="Restart quiz"
            onPress={() => this.restartQuiz()}
          />

        </Card>
      </View>
    )
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  bigText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  button: {
    marginTop: 50
  },
});


export default withNavigation(DeckQuizCompleted);
