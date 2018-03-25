import deckDetailsReducer from "./DeckDetailsReducer";
import deckListReducer from "./DeckListReducer";
import {combineReducers} from "redux";


export default combineReducers({
  decks: deckListReducer,
  details: deckDetailsReducer,
});
