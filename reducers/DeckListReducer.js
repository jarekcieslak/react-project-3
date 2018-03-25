import {DECKS_LOAD_ERROR, DECKS_LOAD_START, DECKS_LOAD_SUCCESS} from "../actions/actions";

const initialState = {
  data: null,
  status: null
};

export default function deckListReducer(state = initialState, action) {
  switch (action.type) {
    case DECKS_LOAD_START:
      return {
        ...state,
        status: 'loading'
      };
    case DECKS_LOAD_SUCCESS:
      return {
        ...state,
        status: 'ok',
        data: action.data
      };
    case DECKS_LOAD_ERROR:
      return {
        status: 'error',
        data: null
      };

    default:
      return state;
  }
}
