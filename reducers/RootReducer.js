import deckDetailsReducer from "../deck/DeckDetailsReducer";
import deckListReducer from "../deck-list/DeckListReducer";
import {combineReducers} from "redux";


export default combineReducers({
  decks: deckListReducer,
  details: deckDetailsReducer,
});
