import React, {Component} from 'react';
import {blue} from "../common/utils/colors";
import {StyleSheet, Text, View} from "react-native";
import {Button, Card} from "react-native-elements";
import {withNavigation} from "react-navigation";

class DeckQuizCompleted extends Component {

  getCorrectQuestionsRatio = (questions, answers) => {
    let correctQuestions = 0;
    answers.forEach((answer, index) => {
      if (questions[index].correctAnswer === answer) {
        correctQuestions++;
      }
    })
    return Math.floor(correctQuestions / questions.length * 100);
  };

  goToHome = () => {
    this.props.navigation.navigate('DeckList');
  }

  render() {
    const {questions, answers} = this.props;

    return (
      <View style={styles.container}>
        <Card>
          <Text style={styles.bigText}>Quiz completed!</Text>
          <Text>Correct answers: {this.getCorrectQuestionsRatio(questions, answers)}%</Text>
          <Button
            buttonStyle={styles.button}
            title="Go to quiz list"
            backgroundColor={blue}
            onPress={() => this.goToHome()}
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
