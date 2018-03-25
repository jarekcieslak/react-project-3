import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet} from "react-native";
import {deleteDeck} from "../common/utils/api";
import {Button, Icon} from "react-native-elements";
import {blue, gray, orange} from "../common/utils/colors";

class DeckDetails extends Component {

  static navigationOptions = ({navigation}) => {
    const {deckTitle} = navigation.state.params;

    return {
      title: `${deckTitle}`
    }
  }

  componentDidMount() {
  }

  onDeckDelete = () => {
    const deckId = this.props.navigation.state.params.deckId;
    deleteDeck(deckId);
    this.goToHome();
  }

  onDeckStart = () => {

  }

  onDeckEdit = () => {

  }

  goToHome = () => {
    this.props.navigation.navigate('DeckList');
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>

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
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    marginBottom: 20
  }
})

export default connect(
  mapStateToProps,
)(DeckDetails);
