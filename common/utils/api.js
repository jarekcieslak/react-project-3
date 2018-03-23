import {AsyncStorage} from 'react-native';
import {allDecksError, allDecksReceived, allDecksStart} from "../../actions/actions";

export const DECKS_STORAGE_KEY = 'QuizApp:Decks';


// getDecks: return all of the decks along with their titles, questions, and answers.
export const getDecks = () => dispatch => {
  dispatch(allDecksStart());
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data && data) {
        dispatch(allDecksReceived(data));
        return data
      }
    })
    .catch(error => {
      dispatch(allDecksError());
      console.warn('Error while getting decks data. ', error)
    })
}

// getDeck: take in a single id argument and return the deck associated with that id.
export function getDeck(id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then(data => data[id])
    .catch(error => console.warn('Error while getting deck data. ', error))
}


// createDeck: take in a single id argument and return the deck associated with that id.
export function createDeck(deckTitle) {
  return getDecks()
    .then(data => {
      const deckId = Date.now();
      let newDeck = {
        id: deckId,
        title: deckTitle
      };
      data[deckId] = newDeck;
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        .catch(error => console.warn('Error while saving data. ', error))
      return deckId;
    });

}

// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export function addCardToDeck(deckId, card) {
  return getDecks()
    .then(data => {
      const deck = data[deckId];
      if (deck) {
        deck.cards = [...deck.cards, card];
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
          .catch(error => console.warn('Error while adding card to the given deck. ', error))
      } else {
        console.warn('Deck with given ID does not exist');
      }
    });
}


export function setDummyData() {
  const dummyData = {
    '1521650068035': {
      id: '1521650068035',
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    '1521650068036': {
      id: '1521650068036',
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  };

  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData));

  return dummyData;
}

