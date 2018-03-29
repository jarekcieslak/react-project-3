import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import Error from "../common/error/Error";
import Loading from "../common/loading/Loading";
import {Button, Card} from "react-native-elements";
import {gray, green, red} from "../common/utils/colors";
import DeckQuizCompleted from "./DeckQuizCompleted";
import {clearLocalNotification, setLocalNotification} from "../common/Notifications";

class DeckQuiz extends Component {


  state = {
    currentQuestionNo: 0,
    currentQuestion: {},
    quizCompleted: false,
    answers: [],
    answerVisible: false
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
        currentQuestion: this.getQuestion(newQuestionNo),
        answerVisible: false
      });
    } else {
      this.setState({
        currentQuestion: {},
        quizCompleted: true,
        answerVisible: false
      })
    }
  };

  showAnswer = () => {
    this.setState({
      answerVisible: true
    })
  }

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

        {!this.state.answerVisible && <Button
          buttonStyle={styles.button}
          title="Show answer"
          onPress={() => this.showAnswer()}
        />}

        {this.state.answerVisible && <Text style={styles.answerText}>{this.state.currentQuestion.answer}</Text>}

      </Card>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.button}
          title="I was right."
          backgroundColor={green}
          onPress={() => this.getNextQuestion(true)}
        />
        <Button
          buttonStyle={styles.button}
          title="I was wrong."
          backgroundColor={red}
          onPress={() => this.getNextQuestion(false)}
        />
      </View>
    </View>)

  quizCompleted = () => {
    const {deck} = this.props;
    const {answers} = this.state;

    // Clear local notification
    clearLocalNotification().then(setLocalNotification)

    return (<DeckQuizCompleted deckId={deck.id} deckTitle={deck.title} answers={answers}></DeckQuizCompleted>)
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
