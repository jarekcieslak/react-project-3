import {AsyncStorage} from 'react-native';
import {
    allDecksError,
    allDecksReceived,
    allDecksStart,
    deckAddQuestion,
    deckLoadError,
    deckLoadStart,
    deckLoadSuccess
} from "../../actions/actions";

export const DECKS_STORAGE_KEY = 'QuizApp:Decks';


// getDecks: return all of the decks along with their titles, questions, and answers.
export const getDecks = () => dispatch => {
    dispatch(allDecksStart());
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(JSON.parse)
        .then(data => {
            if (!data) {
                AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({}))
            }
            return data
        })
        .then(data => {
            return new Promise(resolve => setTimeout(() => resolve(dispatch(dispatch(allDecksReceived(data)))), 200))
        })
        .catch(error => {
            dispatch(allDecksError());
            console.warn('Error while getting decks data. ', error)
        })
}

// getDeck: take in a single id argument and return the deck associated with that id.
export const getDeck = (id) => dispatch => {
    dispatch(deckLoadStart());
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(JSON.parse)
        .then(data => {
            dispatch(deckLoadSuccess(data[id]));
            return data[id]
        })
        .catch(error => {
            dispatch(deckLoadError());
            console.warn('Error while getting deck data. ', error)
        })
}


// createDeck: take in a single id argument and return the deck associated with that id.
export function createDeck(deckTitle) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(JSON.parse)
        .then(data => {
            const deckId = Date.now();
            let newDeck = {
                id: String(deckId),
                title: deckTitle,
                questions: []
            };
            data[deckId] = newDeck;
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
                .catch(error => console.warn('Error while saving data. ', error));
            return deckId;
        });
}

// deleteDeck: take in a single id argument and delete deck from the db
export const deleteDeck = (deckId) => dispatch => {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(JSON.parse)
        .then(data => {
            delete data[deckId];
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
            return data;
        })
        .catch(error => console.warn('Error while deleting data. ', error));
}


// addQuestionToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export const addQuestionToDeck = (deckId, question) => dispatch => {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(JSON.parse)
        .then(data => {
            const deck = data[deckId];
            if (deck) {
                deck.questions = [...deck.questions, question];
                AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
                dispatch(deckAddQuestion(deckId, question))
            } else {
                console.warn('Deck with given ID does not exist');
            }
        })
        .catch(error => console.warn('Error while adding card to the given deck. ', error));
}


export function setDummyData() {
    const dummyData = {
        '1521650068035': {
            id: '1521650068035',
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces',
                    correctAnswer: true
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event',
                    correctAnswer: true
                }
            ]
        },
        '1521650068036': {
            id: '1521650068036',
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.',
                    correctAnswer: true
                }
            ]
        }
    };

    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData));

    return dummyData;
}

