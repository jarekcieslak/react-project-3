import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import Error from "../common/error/Error";
import Loading from "../common/loading/Loading";
import {Button, Card} from "react-native-elements";
import {gray, green, red} from "../common/utils/colors";
import DeckQuizCompleted from "./DeckQuizCompleted";

class DeckQuiz extends Component {


  state = {
    currentQuestionNo: 0,
    currentQuestion: {},
    quizCompleted: false,
    answers: []
  };

  componentDidMount() {
    this.setState({
      currentQuestion: this.getQuestion(0)
    });
  }


  getNextQuestion = (answer) => {
    const {currentQuestionNo, answers} = this.state;
    const maxQuestionNo = this.props.deck.questions.length;
    const newQuestionNo = currentQuestionNo + 1;
    answers[currentQuestionNo] = answer;
    if (newQuestionNo < maxQuestionNo) {
      this.setState({
        answers,
        currentQuestionNo: newQuestionNo,
        currentQuestion: this.getQuestion(newQuestionNo)
      });
    } else {
      this.setState({
        currentQuestion: {},
        quizCompleted: true
      })
    }
  };

  getQuestion = (index) => this.props.deck.questions[index];

  renderQuiz = (deck) => (
    <View>
      <Card>
        <Text>Question {(this.state.currentQuestionNo + 1)} out of {deck.questions.length}</Text>
      </Card>

      <Card style={{marginBottom: 30}}>
        <Text style={styles.bold}>Question:</Text>
        <Text style={styles.questionText}>{this.state.currentQuestion.question}</Text>
        <Text style={styles.bold}>Answer:</Text>
        <Text style={styles.answerText}>{this.state.currentQuestion.answer}</Text>
      </Card>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.button}
          title="That's true."
          backgroundColor={green}
          onPress={() => this.getNextQuestion(true)}
          iconRight={{name: 'play-arrow'}}
        />
        <Button
          buttonStyle={styles.button}
          title="It's false."
          backgroundColor={red}
          onPress={() => this.getNextQuestion(false)}
          iconRight={{name: 'delete-forever'}}
        />
      </View>
    </View>)

  quizCompleted = () => {
    const {deck} = this.props;
    const {answers} = this.state;
    return (<DeckQuizCompleted questions={deck.questions} answers={answers}></DeckQuizCompleted>)
  }


  render() {
    const {deck, status} = this.props;
    const {quizCompleted} = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {status === 'error' && <Error></Error>}
        {status === 'loading' && <Loading></Loading>}
        {status === 'ok' && !quizCompleted && this.renderQuiz(deck)}
        {status === 'ok' && quizCompleted && this.quizCompleted()}
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
    justifyContent: 'flex-start'
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'column'
  },
  button: {
    marginBottom: 10
  },
  bold: {
    fontWeight: 'bold',
    color: gray
  },
  questionText: {
    fontSize: 30,
    marginBottom: 10
  },
  answerText: {
    fontSize: 20,
    marginBottom: 10
  }
});

export default connect(
  mapStateToProps,
)(DeckQuiz);
