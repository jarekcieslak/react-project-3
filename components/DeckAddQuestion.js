import React, {Component} from 'react';
import {Keyboard, KeyboardAvoidingView, StyleSheet, Text} from "react-native";
import {green, purple, red} from "../common/utils/colors";
import {Button, Card, FormInput, FormValidationMessage} from "react-native-elements";
import {connect} from "react-redux";
import {addQuestionToDeck} from "../common/utils/api";
import {NavigationActions} from "react-navigation";

class DeckAddQuestion extends Component {
  state = {
    question: '',
    questionError: false,
    answer: '',
    answerError: false,
    correctAnswer: null
  }

  onQuestionSubmit = () => {
    const {id} = this.props;
    let questionError = false, answerError = false;

    // Check if we had errors
    if (!this.state.question) {
      questionError = true;
    }
    if (!this.state.answer) {
      answerError = true;
    }
    this.setState({questionError, answerError});

    // If there are no errors proceed with adding a question...
    if (!questionError && !answerError) {
      const question = {
        question: this.state.question,
        answer: this.state.answer,
        correctAnswer: this.state.correctAnswer
      };

      this.props.dispatch(addQuestionToDeck(id, question));
      this.props.navigation.dispatch(NavigationActions.back());
      Keyboard.dismiss();
    }
  };

  setAnswer = (answer) => {
    this.setState({
      correctAnswer: answer
    })
  };

  render() {
    const {title} = this.props;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Card title={`Adding question to ${title}`}>
          <Text>Question:</Text>
          <FormInput
            placeholder="Type your question."
            onChangeText={question => this.setState({question})}
            value={this.state.question}
          />

          <FormValidationMessage>
            {this.state.questionError ? 'This field is required' : ''}
          </FormValidationMessage>

          <Text>Answer:</Text>
          <FormInput
            placeholder="Type your answer."
            onChangeText={answer => this.setState({answer})}
            value={this.state.answer}
          />
          <FormValidationMessage>
            {this.state.answerError ? 'This field is required' : ''}
          </FormValidationMessage>

          <Text>The correct answer should be:</Text>

          <Button
            title="True"
            backgroundColor={this.state.correctAnswer === true ? green : ''}
            onPress={() => this.setAnswer(true)}
          />
          <Button
            title="False"
            backgroundColor={this.state.correctAnswer === false ? red : ''}
            onPress={() => this.setAnswer(false)}
          />


          <Button
            style={styles.submitButton}
            title="Add question"
            raised
            backgroundColor="rgb(72, 149, 236)"
            onPress={this.onQuestionSubmit}
          />
        </Card>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    marginBottom: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    marginBottom: 20
  },
  answerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1
  },
  button: {
    backgroundColor: purple,
    width: '100%',
    margin: 0,
  },
  submitButton: {
    marginTop: 50
  }
});

function mapStateToProps(state) {
  const deckTitle = state.details.data.title;
  const deckId = state.details.data.id;
  return {
    id: deckId,
    title: deckTitle
  }
}

export default connect(mapStateToProps)(DeckAddQuestion);
