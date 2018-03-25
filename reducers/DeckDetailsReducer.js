import {DECK_LOAD_ERROR, DECK_LOAD_START, DECK_LOAD_SUCCESS} from "../actions/actions";

const initialState = {
    data: null,
    status: null
};

export default function deckDetailsReducer(state = initialState, action) {
    switch (action.type) {
        case DECK_LOAD_START:
            return {
                ...state,
                status: 'loading'
            };
        case DECK_LOAD_SUCCESS:
            return {
                ...state,
                status: 'ok',
                data: action.data
            };
        case DECK_LOAD_ERROR:
            return {
                status: 'error',
                data: null
            };

        default:
            return state;
    }
}
